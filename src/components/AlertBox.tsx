import type { InfoAlert } from "@/lib/types";

const icons: Record<string, string> = {
  info: "ℹ️",
  warning: "⚠️",
  danger: "🚫",
};

export default function AlertBox({ alert }: { alert: InfoAlert }) {
  return (
    <div className={`alert ${alert.type}`}>
      <span className="alert-icon">{icons[alert.type] || "ℹ️"}</span>
      {alert.content}
    </div>
  );
}
