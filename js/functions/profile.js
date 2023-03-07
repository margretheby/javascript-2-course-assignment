import { profileUrl, profileParam, profilePostsUrl } from "../api/contants.js";
import { createHtmlForProfile } from "../functions/create-html.js"
import { profilePostsButton, postsContainer } from "../components/variables.js";

console.log(profilePostsUrl)
const token = localStorage.getItem("accessToken");


// fetch profile information
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
        displayPostsOnPage(posts);
        
    } catch (error) {
        console.log(error);
    }
}

// Create HTML for posts on profile
function displayPostsOnPage(post) {
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