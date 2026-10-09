import { Placeholder } from "@/components/layout/placeholder";
import { AgentConfigScreen } from "@/components/product/agent-config-screen";
import { AnalyticsScreen } from "@/components/product/analytics-screen";
import { CampaignScreen } from "@/components/product/campaign-screen";
import { KnowledgeScreen } from "@/components/product/knowledge-screen";
import { SimulationRunScreen } from "@/components/product/simulation-run-screen";
import { ToolsScreen } from "@/components/product/tools-screen";
import type { StageVisual } from "@/content/products";

/** Window position inside the painted backdrop (same as the home split panels). */
const WINDOW = "absolute inset-x-[7%] top-[9%] bottom-[12%] z-10";
const CHROME =
  "rounded-md border border-black/10 shadow-[0_20px_50px_-24px_oklch(0.25_0.03_150/0.55)]";

/** Renders a stage visual (recreated screen or placeholder) at the given position. */
export function StageScreen({
  visual,
  className = WINDOW,
  light = false,
}: {
  visual: StageVisual;
  className?: string;
  /** Use the light product-UI theme. */
  light?: boolean;
}) {
  const cls = `${className} ${CHROME}${light ? " ui-light" : ""}`;
  if (typeof visual === "object") {
    return (
      <Placeholder
        variant="frame"
        label={visual.placeholder}
        className={className}
      />
    );
  }
  switch (visual) {
    case "agent-config":
      return <AgentConfigScreen className={cls} />;
    case "knowledge":
      return <KnowledgeScreen className={cls} />;
    case "tools":
      return <ToolsScreen className={cls} />;
    case "analytics":
      return <AnalyticsScreen className={cls} />;
    case "simulation":
      return <SimulationRunScreen className={cls} />;
    case "campaign":
      return <CampaignScreen className={cls} />;
  }
}
