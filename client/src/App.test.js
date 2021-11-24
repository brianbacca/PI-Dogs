import { render, screen } from "@testing-library/react";
import App from "./App";
import LandingPage from "./components/LandigPage/LandingPage";

describe("LandingPage", () => {
  it("must display a title", () => {
    render(<LandingPage />);
    expect(screen.queryAllByText(/welcome/i)).toBeInTheDocument();
  });
});
