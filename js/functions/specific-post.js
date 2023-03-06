import { createHtmlForPost } from "./create-html.js";
import { postIdUrl } from "../api/contants.js";
import { profileUrl } from "../api/contants.js";
import { authButtonsContainer } from "../components/variables.js";

// Update post function
export function setUpdatePostListener() {
    const updatePostForm = document.querySelector(".edit-post-form");
    updatePostForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const updatePostForm = event.target;
      const formData = new FormData(updatePostForm);
      const updatedPostInfo = Object.fromEntries(formData.entries());
  
      updatePost(updatedPostInfo);
    });
  }
  
  async function updatePost(post) {
    try {
      const token = localStorage.getItem("accessToken");
      const postData = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
      };
      const response = await fetch(postIdUrl, postData);
      const result = await response.json();
      
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  
  // Fetch and display a specific post
  export async function fetchSpecificPost() {
    try {
      const token = localStorage.getItem("accessToken");
      const postData = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(postIdUrl, postData);
      const post = await response.json();

      createHtmlForPost(post);
      isProfileLinkedToPost(post);

    } catch (error) {
      console.log(error);
    }
  }

// connect profile to post
export function isProfileLinkedToPost (post) {
  const profileName = localStorage.getItem("profileName");
  const postAuthor = post.author.name;

  if (profileName === postAuthor) {
    authButtonsContainer.style.display = "block";
  } else {
    authButtonsContainer.style.display = "none";
  }

}
