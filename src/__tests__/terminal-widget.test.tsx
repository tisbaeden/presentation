import { render, screen } from "@testing-library/react";
import { TerminalWidget } from "@/components/terminal-widget";

const defaultLines = [
  { command: "whoami", output: "Eden Tisba · Bac Pro CIEL" },
  { command: "stage --info", output: "EY Fabernovel" },
  { command: "skills --list", output: "HTML · CSS · JS" },
  { command: "status", output: "✓ Stage validé" },
];

describe("TerminalWidget", () => {
  it("renders the terminal title bar", () => {
    render(<TerminalWidget lines={defaultLines} title="eden@ey-fabernovel" />);
    expect(screen.getByText("terminal — eden@ey-fabernovel")).toBeInTheDocument();
  });

  it("renders all command lines", () => {
    render(<TerminalWidget lines={defaultLines} title="eden@ey-fabernovel" />);
    expect(screen.getByText("whoami")).toBeInTheDocument();
    expect(screen.getByText("stage --info")).toBeInTheDocument();
    expect(screen.getByText("skills --list")).toBeInTheDocument();
    expect(screen.getByText("status")).toBeInTheDocument();
  });

  it("renders all output lines", () => {
    render(<TerminalWidget lines={defaultLines} title="eden@ey-fabernovel" />);
    expect(screen.getByText("Eden Tisba · Bac Pro CIEL")).toBeInTheDocument();
    expect(screen.getByText("EY Fabernovel")).toBeInTheDocument();
  });

  it("renders macOS traffic-light dots", () => {
    const { container } = render(
      <TerminalWidget lines={defaultLines} title="eden@ey-fabernovel" />
    );
    const dots = container.querySelectorAll("[data-testid='traffic-dot']");
    expect(dots).toHaveLength(3);
  });

  it("renders a blinking cursor on the last line", () => {
    const { container } = render(
      <TerminalWidget lines={defaultLines} title="eden@ey-fabernovel" />
    );
    expect(container.querySelector("[data-testid='cursor']")).toBeInTheDocument();
  });
});
