import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import * as ReduxHooks from "../../../store/hooks";
// eslint-disable-next-line jest/no-mocks-import
import { useAuthState } from "../../../__mocks__/react-firebase-hooks";
import { Menu } from "./Menu";

describe("Menu", () => {
  const mockedSelector = jest.spyOn(ReduxHooks, "useAppSelector");
  const mockedDispatch = jest.spyOn(ReduxHooks, "useAppDispatch");
  beforeEach(() => {
    mockedSelector.mockReturnValue("test");
    mockedDispatch.mockImplementation(jest.fn());
    useAuthState.mockReturnValue("test");
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

  afterEach(() => {
    jest.resetAllMocks();
  });
});
