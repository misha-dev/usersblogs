import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as ReduxHooks from "../../store/hooks";
import { Login } from "./Login";

describe("Login", () => {
  const mockedDispatch = jest.spyOn(ReduxHooks, "useAppDispatch");
  beforeEach(() => {
    mockedDispatch.mockImplementation(jest.fn());
  });
  it("should render", () => {
    render(<Login />);
    const form = screen.getByRole("form", {
      name: "loginForm",
    });
    expect(form).toBeInTheDocument();
  });

  it("should type in email and password field", () => {
    const testEmail = "misha@mail.ru";
    const testPassword = "misha";
    render(<Login />);
    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    userEvent.type(emailInput, testEmail);
    expect(emailInput).toHaveValue(testEmail);

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeInTheDocument();
    userEvent.type(passwordInput, testPassword);
    expect(passwordInput).toHaveValue(testPassword);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
