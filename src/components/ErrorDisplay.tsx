"use client";

export default function ErrorDisplay({
  error,
  onRetry,
}: {
  error: Error | null;
  onRetry: () => void;
}) {
  return (
    <div className="main" style={{ textAlign: "center", paddingTop: 80 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
      <h2 style={{ marginBottom: 8, borderBottom: "none" }}>Failed to load documentation</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>
        {error?.message || "Could not connect to Strapi. Is it running on port 1337?"}
      </p>
      <button
        onClick={onRetry}
        style={{
          padding: "10px 24px",
          background: "var(--brand-green)",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Retry
      </button>
    </div>
  );
}
