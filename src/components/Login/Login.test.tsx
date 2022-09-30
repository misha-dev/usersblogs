import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as ReduxHooks from "../../store/hooks";

// eslint-disable-next-line jest/no-mocks-import
import { getAuth, signInWithEmailAndPassword } from "../../__mocks__/firebase/auth";

import { Login } from "./Login";

describe("Login", () => {
  const mockedDispatch = jest.spyOn(ReduxHooks, "useAppDispatch");
  beforeEach(() => {
    mockedDispatch.mockImplementation(jest.fn());
    getAuth.mockReturnValue("test");
    signInWithEmailAndPassword.mockReturnValue(
      new Promise((resolve) => {
        resolve({ user: { uid: 1 } });
      }),
    );
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

  it("should login user", () => {
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

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
