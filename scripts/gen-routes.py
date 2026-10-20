#!/usr/bin/env python3
"""Generates the thin route files for en (/), th (/th/) and ar (/ar/) from one spec list.
Run:  python3 scripts/gen-routes.py     (idempotent; overwrites generated route files)
Each spec: (route_path, module, component, metadata_fn, extra) where route_path may contain one [param].
 - param pages need `params_const` (an exported array of {param: value} from src/lib/params.ts) and `as_fn` (value -> typed or notFound()).
"""
import os, json
ROOT = os.path.join(os.path.dirname(__file__), '..', 'src', 'app')
GROUPS = {'en': ('(en)', ''), 'th': ('(th)', 'th'), 'ar': ('(ar)', 'ar')}
SPECS = json.load(open(os.path.join(os.path.dirname(__file__), 'routes.json')))

def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, 'w').write(text)

for spec in SPECS:
    for lang, (grp, prefix) in GROUPS.items():
        base = os.path.join(ROOT, grp, prefix) if prefix else os.path.join(ROOT, grp)
        parts = [p for p in spec['path'].split('/') if p]
        target = os.path.join(base, *parts, 'page.tsx')
        comp, mod = spec['component'], spec['module']
        meta = spec.get('metadata')
        param = spec.get('param')
        if not param:
            body = f'import {{ {comp}{", " + meta if meta else ""} }} from "{mod}";\n\n'
            if meta: body += f'export const metadata = {meta}("{lang}"{spec.get("metaArgs","")});\n'
            body += f'export default function Page() {{\n  return <{comp} lang="{lang}"{spec.get("props","")} />;\n}}\n'
        else:
            body = f'import {{ {comp}{", " + meta if meta else ""} }} from "{mod}";\nimport {{ {spec["as_fn"]}, {spec["params_const"]} }} from "{spec["params_mod"]}";\n\n'
            body += f'type Props = {{ params: Promise<{{ {param}: string }}> }};\n\nexport const dynamicParams = false;\nexport function generateStaticParams() {{\n  return {spec["params_const"]};\n}}\n'
            if meta:
                body += f'export async function generateMetadata({{ params }}: Props) {{\n  return {meta}("{lang}", {spec["as_fn"]}((await params).{param}));\n}}\n'
            body += f'export default async function Page({{ params }}: Props) {{\n  return <{comp} lang="{lang}" {spec["prop_name"]}={{{spec["as_fn"]}((await params).{param})}} />;\n}}\n'
        write(target, body)
print('generated', len(SPECS) * 3, 'route files')
