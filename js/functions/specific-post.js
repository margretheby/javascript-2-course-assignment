import { createHtml } from "./create-html.js";
import { postIdUrl } from "../api/contants.js";

// Update post function
export function setUpdatePostListener() {
    const updatePostForm = document.querySelector(".edit-post-form");
    const deletePostButton = document.querySelector("#btn-delete");
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
     createHtml(post);
    } catch (error) {
      console.log(error);
    }
  }