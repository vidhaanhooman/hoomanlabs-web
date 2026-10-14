import { CaretLeftIcon, CopyIcon, DownloadSimpleIcon, MagnifyingGlassIcon, PencilSimpleIcon, PlusIcon, RocketLaunchIcon, ArrowCounterClockwiseIcon, UploadSimpleIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"

/**
 * Live data tables, recreated from the console's table editor: a published
 * CSV of rules the agent reads mid-call, each row a set of conditions and
 * the instruction to follow. Fictional Halden Energy billing rules (sample
 * data only). Wide on purpose: it runs past the stage's right edge.
 */

const COLS = ["Id", "accountStatus", "balance", "dueState", "planType", "disputeOpen", "paymentPlan", "instruction"]

const ROWS: string[][] = [
  ["1", "active", "zero", "not checked", "any", "not checked", "not checked", "The account is fully paid. Thank the customer and confirm nothing is due."],
  ["2", "active", "due", "upcoming", "any", "FALSE", "not checked", "A bill is due soon. Share the amount and due date, and offer to take payment now."],
  ["3", "active", "due", "overdue", "any", "FALSE", "absent", "The bill is overdue. Offer payment now, or a plan of up to three monthly payments."],
  ["4", "active", "due", "overdue", "any", "FALSE", "present", "A payment plan is already in place. Confirm the next instalment date and amount."],
  ["5", "active", "due", "any", "any", "TRUE", "not checked", "A dispute is open. Read the dispute notice, then transfer to the billing team."],
  ["6", "suspended", "any", "any", "any", "not checked", "not checked", "The account is suspended. Do not take payment; transfer to the accounts team."],
  ["7", "closed", "credit", "not checked", "any", "not checked", "not checked", "The account is closed with a credit. Explain the refund timeline of 5 working days."],
  ["8", "active", "due", "overdue", "Green Fixed 12m", "FALSE", "absent", "Offer to move the customer to monthly billing on the same tariff."],
  ["9", "missing", "not checked", "not checked", "not checked", "not checked", "not checked", "The account can't be found. Ask for the account number again, then verify."],
]

const TF = (v: string) => v === "TRUE" || v === "FALSE"

export function TableEditorScreen({ className }: { className: string }) {
  return (
    <div aria-hidden className={cn("ui-dark flex flex-col overflow-hidden text-[12px] leading-[1.5]", className)}>
      {/* Header */}
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-(--ui-line) px-4">
        <CaretLeftIcon className="size-3.5 text-(--ui-muted)" />
        <span className="text-[13px]">billing_rules · billing_rules.csv</span>
        <PencilSimpleIcon className="size-3.5 text-(--ui-muted)" />
        <span className="ml-auto rounded-full bg-[oklch(0.74_0.16_150/0.18)] px-2 py-0.5 text-[11px] text-[oklch(0.8_0.12_150)]">Published</span>
        <span className="flex items-center gap-1 text-[11px] text-(--ui-muted)">
          <CopyIcon className="size-3" />
          TBL-7Q2HALDEN
        </span>
        <span className="flex items-center gap-1 text-(--ui-muted)">
          <ArrowCounterClockwiseIcon className="size-3.5" />
          Reset
        </span>
        <span className="text-(--ui-muted)">Save</span>
        <span className="flex items-center gap-1.5 rounded-md bg-(--ui-raised) px-2.5 py-1">
          <RocketLaunchIcon className="size-3.5" />
          Publish
        </span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="flex w-64 items-center gap-2 rounded-md bg-(--ui-panel) px-3 py-1.5 text-(--ui-muted)">
          <MagnifyingGlassIcon className="size-3.5" />
          Search rows
        </span>
        <span className="ml-auto flex items-center gap-1.5 rounded-md border border-(--ui-line) px-2.5 py-1">
          <DownloadSimpleIcon className="size-3.5" />
          Download CSV
        </span>
        <span className="flex items-center gap-1.5 rounded-md border border-(--ui-line) px-2.5 py-1">
          <UploadSimpleIcon className="size-3.5" />
          Upload CSV
        </span>
      </div>

      {/* Table */}
      <div className="mx-4 min-h-0 flex-1 overflow-hidden rounded-md border border-(--ui-line)">
        <table className="w-full min-w-[68rem] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-10" />
            <col className="w-28" />
            <col className="w-20" />
            <col className="w-24" />
            <col className="w-32" />
            <col className="w-24" />
            <col className="w-24" />
            <col />
          </colgroup>
          <thead>
            <tr className="bg-(--ui-panel) text-(--ui-muted)">
              {COLS.map((c) => (
                <th key={c} className="px-3 py-2.5 font-normal">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <tr key={r[0]} className={cn("border-t border-(--ui-line)", i === 2 && "bg-(--ui-raised)")}>
                {r.map((v, j) => (
                  <td
                    key={j}
                    className={cn(
                      "truncate px-3 py-2.5",
                      j === 0 && "text-(--ui-muted)",
                      j > 0 && j < 7 && (v === "not checked" ? "text-(--ui-muted)" : TF(v) ? "font-mono text-[11px]" : "")
                    )}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t border-(--ui-line) text-(--ui-muted)">
              <td colSpan={COLS.length} className="px-3 py-2.5">
                <span className="flex items-center gap-1.5">
                  <PlusIcon className="size-3.5" />
                  Add row
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
