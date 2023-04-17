import { postsUrl, filterParam } from "../api/contants.js";
import { 
    postsWithImagesButton, 
    postsWithoutImagesButton, 
    allPostsButton, 
    postsContainer, 
    searchForm, 
    createPostForm,
    profileNavLink,
    loggedInProfile,
    token
} from "../components/variables.js";

// profile link
profileNavLink.innerHTML = `<a href="profile.html?user=${loggedInProfile}" class="nav-link">Profile</a>`;

// API call to posts
/**
 * This function fetches posts from an API using an access token.
 * displayPostsOnPage(result) creates HTML to display the API data.
 * searchPosts(result) filteres posts based on input in a search form.
 * filterPosts(result) filteres posts based on query parameters.
 */
export async function fetchPostsWithToken() {
    try {
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
 * This function creates HTML to display multiple posts based on an object.
 * @param { array } post An array of object fetched from an API containing specific properties of posts.
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
/**
 * This function filteres posts based on query paramteres.
 * @param { array } post An array of objects fetched from an API
 */
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
  /**
   * This function display posts based on a value entered in an input field
   * @param { array } posts An array of objects fetched from an API
   * @returns { array } of objects (posts) containing the value of the input field in the title.
   */
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
  /**
   * This function creates HTML based on the result of an input field (search).
   * @param { array } posts An array of objects fetched from an API
   */
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
/**
 * This function contains an eventListener to create a post based on the input in the create post form.
 * @param { Class } formData Creates a key/value pair based on the data input in the create post form
 * @param { object } postInfo Turns the formData into an object
 */
export function setCreatePostListener() {
    createPostForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const createPostForm = event.target;
      const formData = new FormData(createPostForm);
      const postInfo = Object.fromEntries(formData.entries());
  
      createPost(postInfo);
    });
  }
  
  /**
   * This function accepts one arguments, an object, and sends this object to the API database.
   * @param { object } post information from a form
   */
  async function createPost(post) {
    try {
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
