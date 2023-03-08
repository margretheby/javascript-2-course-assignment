import {
  fetchSpecificPost,
  setUpdatePostListener
} from "./functions/specific-post.js";
import { postID, postIdUrl } from "./api/contants.js";
import {
  deletePostButton,
  postContainer
} from "./components/variables.js";
import { setLogOut } from "./functions/logout.js";

fetchSpecificPost(postIdUrl);
setUpdatePostListener();
setLogOut();

// DELETE POST
/**
 * EventListener to activate the deletePost() function
 */
deletePostButton.addEventListener("click", (event) => {
  deletePost();
});

/**
 * This function fetches a post's url, and sends information to delete the data attached to the post.
 */
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
