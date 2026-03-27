import { render, screen } from "@testing-library/react";
import { HeroSection } from "@/components/hero-section";

// jsdom doesn't implement matchMedia; provide a stub
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock("gsap", () => {
  const mock = jest.requireActual("../__mocks__/gsap").default;
  return { __esModule: true, default: mock, gsap: mock };
});
jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: jest.requireActual("../__mocks__/gsap").ScrollTrigger,
}));

describe("HeroSection", () => {
  it("renders the top badge", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Bac Pro CIEL/i)).toBeInTheDocument();
  });

  it("renders the company tagline", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Stage @ EY Fabernovel/)).toBeInTheDocument();
  });

  it("renders the name in green gradient", () => {
    render(<HeroSection />);
    expect(screen.getByText("Eden Tisba")).toBeInTheDocument();
  });

  it("renders all 4 tech badges", () => {
    render(<HeroSection />);
    expect(screen.getByText("HTML")).toBeInTheDocument();
    expect(screen.getByText("CSS")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Cybersécurité")).toBeInTheDocument();
  });

  it("renders the scroll indicator", () => {
    render(<HeroSection />);
    expect(screen.getByText(/scroll/i)).toBeInTheDocument();
  });

  it("has data-section attribute for GSAP targeting", () => {
    const { container } = render(<HeroSection />);
    expect(
      container.querySelector("[data-section='hero']")
    ).toBeInTheDocument();
  });
});
