"use client";

export interface TerminalLine {
  command: string;
  output: string;
}

interface TerminalWidgetProps {
  lines: TerminalLine[];
  title: string;
}

export function TerminalWidget({ lines, title }: TerminalWidgetProps) {
  return (
    <div
      className="rounded-[14px] overflow-hidden border"
      style={{
        background: "#050A0E",
        borderColor: "rgba(16,185,129,0.15)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.03)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-1.5 px-4 py-2.5 border-b"
        style={{ background: "#0A1020", borderColor: "rgba(16,185,129,0.08)" }}
      >
        {(["#EF4444", "#F59E0B", "#10B981"] as const).map((color) => (
          <div
            key={color}
            data-testid="traffic-dot"
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: color }}
          />
        ))}
        <span
          className="ml-2 font-mono text-[11px]"
          style={{ color: "#475569" }}
        >
          terminal — {title}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 font-mono text-[13px] leading-[1.9]">
        {lines.map((line, i) => {
          const isLast = i === lines.length - 1;
          return (
            <div key={i}>
              <div>
                <span style={{ color: "#34D399" }}>$</span>{" "}
                <span style={{ color: "#6EE7B7" }}>{line.command}</span>
              </div>
              <div style={{ color: "#64748B", paddingLeft: "1rem" }}>
                <strong style={{ color: "#94A3B8" }}>{line.output}</strong>
                {isLast && (
                  <span
                    data-testid="cursor"
                    className="inline-block w-1.5 h-[14px] ml-1 align-middle animate-pulse"
                    style={{ background: "#10B981" }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
