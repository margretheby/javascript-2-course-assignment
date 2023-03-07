import { postsUrl, filterParam } from "../api/contants.js";
import { 
    postsWithImagesButton, 
    postsWithoutImagesButton, 
    allPostsButton, 
    postsContainer, 
    searchForm, 
    createPostForm,
    profileNavLink,
    loggedInProfile
} from "../components/variables.js";

// profile link
profileNavLink.innerHTML = `<a href="profile.html?user=${loggedInProfile}" class="nav-link">Profile</a>`;

// API call to posts
export async function fetchPostsWithToken() {
    try {
      const token = localStorage.getItem("accessToken");
      const getPosts = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await fetch(postsUrl, getPosts);
      const result = await response.json();
  
      displayPostsOnPage(result);
      searchPosts(result);
      filterPosts(result);
    } catch (error) {
      console.log(error);
    }
  }

// function to display posts
/**
 * Display posts on page
 * @param {object} post
 * @returns {object} displays all posts
 */
 function displayPostsOnPage(post) {
    for (let i = 0; i < post.length; i++) {
      if (post[i].media) {
        postsContainer.innerHTML += `
              <div class="row d-flex justify-content-center my-5">
                  <div class="col-xl-6 col-lg-10 col-md-12 p-0">
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
                  <div class="col-xl-6 col-lg-10 col-md-12 p-0">
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


// Filter posts
function filterPosts (post) {
    postsWithImagesButton.innerHTML = `<a href="index.html?filter=posts_img" class="btn btn-primary me-1">Posts with images</a>`;
    postsWithoutImagesButton.innerHTML = `<a href="index.html?filter=no_img" class="btn btn-primary me-1">Posts without images</a>`;
    allPostsButton.innerHTML = `<a href="index.html" class="btn btn-primary me-1">Most recent posts</a>`;
    
    if (filterParam === "posts_img") {
      postsContainer.innerHTML = "";
      for (let i = 0; i < post.length; i++) {
        if (post[i].media) {
        postsContainer.innerHTML += `
            <div class="row d-flex justify-content-center my-5">
            <div class="col-xl-6 col-lg-10 col-md-12 p-0">
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
        </div>`
        }
      }
    }
    if (filterParam === "no_img") {
      postsContainer.innerHTML = "";
      for (let i = 0; i < post.length; i++) {
        if (!post[i].media) {
        postsContainer.innerHTML += `
            <div class="row d-flex justify-content-center my-5">
            <div class="col-xl-6 col-lg-10 col-md-12 p-0">
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
        </div>`
        }
      }
    }
  }
  
  // Search posts function
  function searchPosts(posts) {
    searchForm.onkeyup = function (event) {
      const searchValue = event.target.value.trim().toLowerCase();
      const filteredSearch = posts.filter(function (posts) {
        if (posts.title.toLowerCase().includes(searchValue)) {
          return true;
        }
      });
      displaySearchResult(filteredSearch);
    };
  }
  
  // Display the search
  function displaySearchResult(posts) {
    postsContainer.innerHTML = "";
    posts.forEach(function (post) {
      const { title, media, body, id, created, tags } = post;
      const { avatar, name } = post.author
      if (post.media) {
        postsContainer.innerHTML += `
              <div class="row d-flex justify-content-center my-5">
                  <div class="col-xl-6 col-lg-10 col-md-12 p-0">
                      <div class="border p-0">
                          <div class="container m-0 pe-0">
                              <div class="row d-flex align-items-center">
                                  <div class="col-1 m-0 p-0">
                                      <img src="${avatar}" class="img-thumbnail">
                                  </div>
                                  <div class="col-11">
                                      <p class="pb-0 mb-0 username">${name}</p>
                                  </div>
                              <div class="row p-0">
                                  <img src="${media}" alt="Image for the post: ${title}" class="pe-0">
                              </div>
                              <div class="row">
                              <a href="specific-post.html?postID=${id}" class="nav-link ps-4"><h2 class="mt-2">${title}</h2></a>
                                  <p class="mt-2 ps-4">${body}</p>
                                  <p class="mt-2 ps-4">Posted: ${created}</p>
                                  <p class="mt-0 ps-4">Tags: ${tags}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>`;
      } else {
        postsContainer.innerHTML += `
              <div class="row d-flex justify-content-center my-5">
                  <div class="col-xl-6 col-lg-10 col-md-12 p-0">
                      <div class="border p-0">
                          <div class="container m-0 pe-0">
                              <div class="row d-flex align-items-center">
                                  <div class="col-1 m-0 p-0">
                                      <img src="${avatar}" class="img-thumbnail">
                                  </div>
                                  <div class="col-11">
                                      <p class="pb-0 mb-0 username">${name}</p>
                                  </div>
                              <div class="row">
                              <a href="specific-post.html?postID=${post.id}" class="nav-link ps-4"><h2 class="mt-2">${title}</h2></a>
                                  <p class="mt-2 ps-4">${body}</p>
                                  <p class="mt-2 ps-4">Posted: ${created}</p>
                                  <p class="mt-0 ps-4">Tags: ${tags}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>`;
      }
    });
  }

// Create post function
export function setCreatePostListener() {
    createPostForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const createPostForm = event.target;
      const formData = new FormData(createPostForm);
      const postInfo = Object.fromEntries(formData.entries());
  
      createPost(postInfo);
    });
  }
  
  async function createPost(post) {
    try {
      const token = localStorage.getItem("accessToken");
      const postData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
      };
      const response = await fetch(postsUrl, postData);
      const result = await response.json();
      window.location.href = "index.html";
    } catch (error) {
      console.log(error);
    }
  }
