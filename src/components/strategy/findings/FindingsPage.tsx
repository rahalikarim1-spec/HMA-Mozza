import type { GrowthData } from "./types";
import NavBar from "./NavBar";
import Hero from "./Hero";
import Summary from "./Summary";
import Explorer from "./Explorer";
import Charts from "./Charts";
import Journey from "./Journey";
import Options from "./Options";
import Foundation from "./Foundation";
import Roadmap from "./Roadmap";
import Cta from "./Cta";

/** Growth Risks & Structural Gaps: server composition of the sections. Interactive parts are client components. */
export default function FindingsPage({ d }: { d: GrowthData }) {
  return (
    <div className="strategy-growth">
      <NavBar back={d.ui.back} label={d.ui.navLabel} />
      <Hero d={d} />
      <Summary d={d} />
      <Explorer d={d} />
      <Charts d={d} />
      <Journey d={d} />
      <Options d={d} />
      <Foundation d={d} />
      <Roadmap d={d} />
      <Cta d={d} />
    </div>
  );
}
