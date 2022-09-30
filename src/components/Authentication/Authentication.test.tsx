import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { BrowserRouter, Router } from "react-router-dom";

import { Authentication } from "./Authentication";

describe("Authentication", () => {
  beforeAll(() => {});

  it("should render", () => {
    render(<Authentication />, { wrapper: BrowserRouter });
    const loginButton = screen.getByText(/login/i);
    const registerButton = screen.getByText(/register/i);
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it("should navigate to login page", () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Authentication />
      </Router>,
    );
    const loginButton = screen.getByText(/login/i);
    userEvent.click(loginButton);
    expect(history.location.pathname).toBe("/usersblogs/login");
  });
  it("should navigate to register page", () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Authentication />
      </Router>,
    );
    const loginButton = screen.getByText(/register/i);
    userEvent.click(loginButton);
    expect(history.location.pathname).toBe("/usersblogs/register");
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
