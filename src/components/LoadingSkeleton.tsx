"use client";

export default function LoadingSkeleton() {
  return (
    <>
      <div className="loading-bar" />
      <div className="main" style={{ opacity: 0.7 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="doc-section" style={{ marginBottom: 40 }}>
            <div className="skeleton-line" style={{ height: 24, width: `${30 + i * 12}%` }} />
            <div className="skeleton-line" style={{ height: 14, width: "95%" }} />
            <div className="skeleton-line" style={{ height: 14, width: "80%" }} />
            <div className="skeleton-line" style={{ height: 14, width: "65%", marginBottom: 20 }} />
            {i % 2 === 0 && (
              <div className="skeleton-line" style={{ height: 100, width: "100%", borderRadius: 4 }} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
