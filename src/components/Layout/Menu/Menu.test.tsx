import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import * as ReduxHooks from "../../../store/hooks";
// eslint-disable-next-line jest/no-mocks-import
import { useAuthState } from "../../../__mocks__/react-firebase-hooks/auth";
import { Menu } from "./Menu";

describe("Menu", () => {
  const mockedSelector = jest.spyOn(ReduxHooks, "useAppSelector");
  const mockedDispatch = jest.spyOn(ReduxHooks, "useAppDispatch");
  beforeEach(() => {
    mockedSelector.mockReturnValue("test");
    mockedDispatch.mockImplementation(jest.fn());
    useAuthState.mockReturnValue([true]);
  });
  it("should render", () => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );
    const menu = screen.getByRole("navigation");
    expect(menu).toBeInTheDocument();
  });

  it("should AddPost button render", () => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );
    const buttonAddPost = screen.getByText(/add post/i);
    expect(buttonAddPost).toBeInTheDocument();
  });

  it("should logout button render", () => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );

    const logoutButton = screen.getByText(/Logout/i);
    const userInterface = screen.getByRole("img");
    expect(logoutButton.classList.contains("hide")).toBe(true);
    userEvent.click(userInterface);
    expect(logoutButton.classList.contains("hide")).toBe(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
