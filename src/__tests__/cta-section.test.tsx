import { render, screen } from "@testing-library/react";
import { CTASection } from "@/components/cta-section";

describe("CTASection", () => {
  it("renders the heading", () => {
    render(<CTASection />);
    expect(
      screen.getByRole("heading", { name: /découvrir le rapport complet/i })
    ).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<CTASection />);
    expect(screen.getByText(/EY Fabernovel/)).toBeInTheDocument();
  });

  it("renders the CTA button", () => {
    render(<CTASection />);
    expect(
      screen.getByRole("button", { name: /voir le rapport/i })
    ).toBeInTheDocument();
  });

  it("has a data-section attribute for GSAP targeting", () => {
    const { container } = render(<CTASection />);
    expect(container.querySelector("[data-section='cta']")).toBeInTheDocument();
  });
});
