const gsap = {
  registerPlugin: jest.fn(),
  set: jest.fn(),
  to: jest.fn(),
  fromTo: jest.fn(),
  timeline: jest.fn(() => ({
    to: jest.fn().mockReturnThis(),
    fromTo: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    delay: jest.fn().mockReturnThis(),
  })),
  context: jest.fn((fn: () => void) => {
    fn();
    return { revert: jest.fn() };
  }),
  matchMedia: jest.fn(),
};

export const ScrollTrigger = { create: jest.fn(), refresh: jest.fn() };
export default gsap;
