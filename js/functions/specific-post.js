import { createHtmlForPost } from "./create-html.js";
import { postIdUrl } from "../api/contants.js";
import { profileUrl } from "../api/contants.js";
import { authButtonsContainer, token, postContainer } from "../components/variables.js";

// Update post function
/**
 * This function contains an eventListener to update a post based on the input in the update post form.
 * @param { Class } formData Creates a key/value pair based on the data input in the update post form
 * @param { object } updatedPostInfo Turns the formData into an object
 */
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

  /**
* This function sends the updated input to an API, and reloads the page to display the update.
* @param { object } post an object of information from a form
*/
  async function updatePost(post) {
    try {
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
/**
* This function fetches a specific post from an API.
* @function createHtmlForPost creates HTML to display the post on the page.
* @function isProfileLinkedToPost checks if the post is created by the logged in user, to decide if they can update or delete post
*/
  export async function fetchSpecificPost() {
    try {
      if(postIdUrl === "https://api.noroff.dev/api/v1/social/posts/null?_author=true") {
        postContainer.innerHTML = `<div class="mt-5 pt-5">
                                      <p>You're post was deleted. You will be sent back to the posts page.</p> 
                                  </div>`
        authButtonsContainer.style.display = "none";

        setTimeout(relocateToIndexPage, 5000)
      };

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

  // Relocate to index page
  function relocateToIndexPage() {
    window.location.href = "index.html";
  }

// connect profile to post
/**
 * This function checks if the author of a post is the same as the logged in user.
 * @param { object } post 
 */
export function isProfileLinkedToPost (post) {
  const profileName = localStorage.getItem("profileName");
  const postAuthor = post.author.name;

  if (profileName === postAuthor) {
    authButtonsContainer.style.display = "block";
  } else {
    authButtonsContainer.style.display = "none";
  }

}
