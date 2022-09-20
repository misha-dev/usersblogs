import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Authentication } from "./Authentication";

describe("Authentication", () => {
  beforeAll(() => {});

  it("should render", () => {
    render(
      <BrowserRouter>
        <Authentication />
      </BrowserRouter>
    );
    const loginButton = screen.getByText(/login/i);
    const registerButton = screen.getByText(/register/i);
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
});
