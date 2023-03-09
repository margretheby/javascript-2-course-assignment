import { profileUrl, profileParam, profilePostsUrl } from "../api/contants.js";
import { createHtmlForProfile } from "../functions/create-html.js"
import { profilePostsButton, postsContainer, token } from "../components/variables.js";


// fetch profile information
/**
 * This function fetches the profile information of the logged in user from an API.
 * createHtmlForProfile(profile) uses the fetched information to create HTML and display profile information.
 */
export async function fetchProfileInfo () {
    try {
        const profileName = localStorage.getItem("profileName");
        const specificProfileUrl = profileUrl + profileName;
        const getProfile = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
    
        const response = await fetch(specificProfileUrl, getProfile);
        const profile = await response.json();

        createHtmlForProfile(profile);
    } catch(error) {
        console.log(error);
    }
}

// display profile's name on posts button
profilePostsButton.innerText = `${profileParam}'s posts`;

/**
* This function fetches the user's posts from an API.
* displayPostsOnPage(posts) uses the fetched information to create HTML and display the user's posts.
*/
export async function fetchProfilesPosts() {
    try {
        const getProfilePosts = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(profilePostsUrl, getProfilePosts);
        const posts = await response.json();
        displayPostsOnProfilePage(posts);
        
    } catch (error) {
        console.log(error);
    }
}

// Create HTML for posts on profile
/**
 * This function creates HTML to display a user's posts based on an object.
 * @param { array } post An array of object fetched from an API containing specific properties of posts.
 */
function displayPostsOnProfilePage(post) {
    for (let i = 0; i < post.length; i++) {
      if (post[i].media) {
        postsContainer.innerHTML += `
              <div class="row d-flex justify-content-center my-5">
                  <div class="col-xl-12 col-lg-10 col-md-12 p-0">
                      <div class="border p-0">
                          <div class="container m-0 pe-0">
                              <div class="row d-flex align-items-center">
                                  <div class="col-1 m-0 p-0">
                                      <img src="${post[i].author.avatar}" class="img-thumbnail">
                                  </div>
                                  <div class="col-11">
                                      <p class="pb-0 mb-0 username">${post[i].author.name}</p>
                                  </div>
                              <div class="row p-0">
                                  <img src="${post[i].media}" alt="Image for the post: ${post[i].title}" class="pe-0">
                              </div>
                              <div class="row">
                              <a href="specific-post.html?postID=${post[i].id}" class="nav-link ps-4"><h2 class="mt-2">${post[i].title}</h2></a>
                                  <p class="mt-2 ps-4">${post[i].body}</p>
                                  <p class="mt-2 ps-4">Posted: ${post[i].created}</p>
                                  <p class="mt-0 ps-4">Tags: ${post[i].tags}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>`;
      } else {
        postsContainer.innerHTML += `
              <div class="row d-flex justify-content-center my-5">
                  <div class="col-xl-12 col-lg-10 col-md-12 p-0">
                      <div class="border p-0">
                          <div class="container m-0 pe-0">
                              <div class="row d-flex align-items-center">
                                  <div class="col-1 m-0 p-0">
                                      <img src="${post[i].author.avatar}" class="img-thumbnail">
                                  </div>
                                  <div class="col-11">
                                      <p class="pb-0 mb-0 username">${post[i].author.name}</p>
                                  </div>
                              <div class="row">
                              <a href="specific-post.html?postID=${post[i].id}" class="nav-link ps-4"><h2 class="mt-2">${post[i].title}</h2></a>
                                  <p class="mt-2 ps-4">${post[i].body}</p>
                                  <p class="mt-2 ps-4">Posted: ${post[i].created}</p>
                                  <p class="mt-0 ps-4">Tags: ${post[i].tags}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>`;
      }
    }
}