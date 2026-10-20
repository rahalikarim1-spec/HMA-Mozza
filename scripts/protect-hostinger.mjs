/**
 * OPTIONAL: adds HTTP basic auth to the static export for Apache/LiteSpeed hosting (Hostinger).
 * Run after the build:   DEMO_USER=client DEMO_PASSWORD='secret' HTPASSWD_PATH=/home/uXXXX/domains/example.com/public_html/.htpasswd node scripts/protect-hostinger.mjs
 * Or in one go:          npm run build:protected
 * Writes out/.htaccess and out/.htpasswd. Upload the CONTENTS of ./out (including the dotfiles) to public_html.
 * Without DEMO_USER / DEMO_PASSWORD it does nothing, so the normal build stays unprotected.
 */
import { createHash } from "node:crypto";
import { existsSync, writeFileSync } from "node:fs";

const { DEMO_USER, DEMO_PASSWORD, HTPASSWD_PATH } = process.env;
if (!DEMO_USER || !DEMO_PASSWORD) {
  console.log("protect-hostinger: DEMO_USER / DEMO_PASSWORD not set - skipping (site stays unprotected).");
  process.exit(0);
}
if (!HTPASSWD_PATH || !HTPASSWD_PATH.startsWith("/")) {
  console.error("protect-hostinger: set HTPASSWD_PATH to the ABSOLUTE server path of .htpasswd (e.g. /home/u123456789/domains/example.com/public_html/.htpasswd).");
  process.exit(1);
}
if (!existsSync("out")) {
  console.error("protect-hostinger: ./out not found - run `npm run build` first.");
  process.exit(1);
}
if (/[:\s]/.test(DEMO_USER)) {
  console.error("protect-hostinger: DEMO_USER must not contain ':' or whitespace.");
  process.exit(1);
}

// Apache htpasswd "{SHA}" format (base64 of SHA-1). Fine for a throw-away demo gate, not for real secrets.
const sha = "{SHA}" + createHash("sha1").update(DEMO_PASSWORD).digest("base64");
writeFileSync("out/.htpasswd", `${DEMO_USER}:${sha}\n`);
writeFileSync(
  "out/.htaccess",
  `AuthType Basic
AuthName "Private concept demo"
AuthUserFile ${HTPASSWD_PATH}
Require valid-user

# keep the .htpasswd itself unreachable
<Files ".htpasswd">
  Require all denied
</Files>

# clean URLs from the static export (/menu/ -> /menu/index.html)
DirectoryIndex index.html
ErrorDocument 404 /404.html
`,
);
console.log("protect-hostinger: wrote out/.htaccess and out/.htpasswd");
