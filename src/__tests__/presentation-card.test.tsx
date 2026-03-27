import { render, screen } from "@testing-library/react";
import { PresentationCard } from "@/components/presentation-card";

describe("PresentationCard", () => {
  it("renders the section heading", () => {
    render(<PresentationCard />);
    expect(
      screen.getByRole("heading", { name: /formation bac pro ciel/i })
    ).toBeInTheDocument();
  });

  it("renders the description mentioning EY Fabernovel", () => {
    render(<PresentationCard />);
    expect(screen.getAllByText(/EY Fabernovel/)).toHaveLength(2);
  });

  it("renders the terminal widget with whoami command", () => {
    render(<PresentationCard />);
    expect(screen.getByText("whoami")).toBeInTheDocument();
  });

  it("has data-section attribute for GSAP targeting", () => {
    const { container } = render(<PresentationCard />);
    expect(
      container.querySelector("[data-section='card']")
    ).toBeInTheDocument();
  });

  it("renders card left and card right columns", () => {
    const { container } = render(<PresentationCard />);
    expect(container.querySelector("[data-col='left']")).toBeInTheDocument();
    expect(container.querySelector("[data-col='right']")).toBeInTheDocument();
  });
});
