import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import * as ReduxHooks from "../../store/hooks";
import { AddPost } from "./AddPost";

describe("AddPost", () => {
  const mockedAppSelector = jest.spyOn(ReduxHooks, "useAppSelector");
  beforeEach(() => {
    mockedAppSelector.mockReturnValue("test");
  });
  it("should render", () => {
    render(<AddPost />, { wrapper: BrowserRouter });
    const postButton = screen.getByText(/post/i);
    expect(postButton).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
