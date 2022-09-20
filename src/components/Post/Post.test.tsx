import { render, screen } from "@testing-library/react";
import { Timestamp } from "firebase/firestore";
import * as router from "react-router";
import { BrowserRouter } from "react-router-dom";
import * as ReduxHooks from "../../store/hooks";
import { Post } from "./Post";

describe("Post", () => {
  const mockedSelector = jest.spyOn(ReduxHooks, "useAppSelector");
  const mockedUseNavigate = jest.spyOn(router, "useNavigate");
  beforeEach(() => {
    mockedSelector.mockReturnValue("test");
    mockedUseNavigate.mockImplementation(jest.fn());
  });

  it("should Post render", () => {
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
          userPhotoURL="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1200px-User_icon-cp.svg.png"
        />
      </BrowserRouter>
    );

    const post = screen.getByTestId("postContainer");
    const username = screen.getByText(/Misha/i);
    const likes = screen.getByText(/2 likes/i);
    expect(post).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(likes).toBeInTheDocument();
  });

  it("should props render", () => {
    render(
      <BrowserRouter>
        <Post
          id="1"
          createdAt={Timestamp.now()}
          isPreview={false}
          likes={["misha", "masha"]}
          postPhotoURL="https://www.reviewofreligions.org/wp-content/uploads/2020/08/shutterstock_557126443-scaled.jpg"
          text="Cosmos"
          uid="1"
          userName="Misha"
          userPhotoURL="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1200px-User_icon-cp.svg.png"
        />
      </BrowserRouter>
    );

    const username = screen.getByText(/Misha/i);
    const likes = screen.getByText(/2 likes/i);
    const [userPhoto, postPhoto] = screen.getAllByRole("img");
    expect(username).toBeInTheDocument();
    expect(likes).toBeInTheDocument();
    expect(userPhoto).toHaveAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1200px-User_icon-cp.svg.png");
    expect(postPhoto).toHaveAttribute("src", "https://www.reviewofreligions.org/wp-content/uploads/2020/08/shutterstock_557126443-scaled.jpg");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
