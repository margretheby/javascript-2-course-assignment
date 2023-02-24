import {
  fetchSpecificPost,
  setUpdatePostListener,
} from "./components/functions.js";
import {
  postIdUrl,
  deletePostButton,
  postID,
  postContainer,
} from "./components/variables.js";

fetchSpecificPost(postIdUrl);
setUpdatePostListener();

// DELETE POST

deletePostButton.addEventListener("click", (event) => {
  deletePost();
});

async function deletePost() {
  try {
    const token = localStorage.getItem("accessToken");
    const postData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(postIdUrl, postData);
    const result = await response.json();
  } catch (error) {
    console.log(error);
  }
}
