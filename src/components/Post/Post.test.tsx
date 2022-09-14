import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Timestamp } from "firebase/firestore";
import * as router from "react-router";
import { BrowserRouter } from "react-router-dom";
import * as ReduxHooks from "../../store/hooks";
import { Post } from "./Post";

describe("Testing Post", () => {
  const mockedSelector = jest.spyOn(ReduxHooks, "useAppSelector");
  const mockedUseNavigate = jest.spyOn(router, "useNavigate");

  beforeEach(() => {
    mockedSelector.mockReturnValue("test");
    mockedUseNavigate.mockImplementation(jest.fn());
  });
  test("should Post render", () => {
    render(
      <BrowserRouter>
        <Post
          id="1"
          createdAt={Timestamp.now()}
          isPreview={false}
          likes={["misha", "masha"]}
          postPhotoURL={"https://www.reviewofreligions.org/wp-content/uploads/2020/08/shutterstock_557126443-scaled.jpg"}
          text="Cosmos"
          uid="1"
          userName="Misha"
          data-testid="123"
          userPhotoURL="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1200px-User_icon-cp.svg.png"
        />
      </BrowserRouter>
    );

    const post = screen.getByTestId("postContainer");
    const username = screen.getByText(/Misha/i);
    expect(post).toBeInTheDocument();
    expect(username).toBeInTheDocument();
  });
});
