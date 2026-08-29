import { Check } from "lucide-react";
import { ORDER_STAGES, type Order } from "@/store/StoreProvider";
import { cn } from "@/lib/utils";

const STAGE_HOURS = [0, 2, 12, 30, 66, 96];

export function currentStageIndex(order: Order) {
  const hours = (Date.now() - new Date(order.placedAt).getTime()) / 3_600_000;
  let idx = 0;
  STAGE_HOURS.forEach((h, i) => {
    if (hours >= h) idx = i;
  });
  return idx;
}

export function OrderTimeline({ order }: { order: Order }) {
  const active = currentStageIndex(order);

  return (
    <ol className="mt-6 space-y-0">
      {ORDER_STAGES.map((stage, i) => {
        const done = i <= active;
        const eta = new Date(new Date(order.placedAt).getTime() + STAGE_HOURS[i] * 3_600_000);
        return (
          <li key={stage} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[10px]",
                  done
                    ? "border-gold bg-gold text-ink"
                    : "border-border bg-background text-muted-foreground",
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              {i < ORDER_STAGES.length - 1 && (
                <span className={cn("w-px flex-1", i < active ? "bg-gold" : "bg-border")} />
              )}
            </div>
            <div className={cn("pb-7", !done && "opacity-55")}>
              <p className="text-sm font-medium">{stage}</p>
              <p className="text-xs text-muted-foreground">
                {done
                  ? eta.toLocaleString("en-PK", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : `Expected ${eta.toLocaleDateString("en-PK", { day: "numeric", month: "short" })}`}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
