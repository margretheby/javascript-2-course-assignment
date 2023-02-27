import {
  createAccountForm,
  createAccountUrl,
  createAccountMessage,
  loginForm,
  loginUrl,
  loginError,
  postsUrl,
  postsContainer,
  createPostForm,
  postContainer,
  params,
  postID,
  postIdUrl,
  searchForm,
  updateBody,
  updateMedia,
  updateTitle,
  deletePostButton,
  logOut,
} from "./variables.js";

// ------------------------- ALL PAGES
// Log out
export function setLogOut() {
  logOut.addEventListener("click", (event) => {
    localStorage.clear();
  });
}

// ------------------------- CREATE ACCOUNT PAGE
// Create account function
export function setCreateAccountListener() {
  createAccountForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const createAccountForm = event.target;
    const formData = new FormData(createAccountForm);
    const profile = Object.fromEntries(formData.entries());
    console.log(profile);

    createAccount(profile);
  });
}

// Send the registered account to the API
async function createAccount(profile) {
  try {
    const accountData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    };

    const response = await fetch(createAccountUrl, accountData);
    const result = await response.json();
    console.log(result);
    displayMessage(result);
  } catch (error) {
    console.log(error);
  }
}

// Display message for successfull registration of new account
function displayMessage(message) {
  if (message !== true) {
    createAccountMessage.innerHTML = `Yay! You're account has been registrered, <a href="login.html" class="link">please log in here.</a>`;
  } else {
    createAccountMessage.innerHTML = `Something went wrong. Please try again.`;
  }
}



// ------------------------- LOGIN PAGE
export function setLoginAccount() {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const loginForm = event.target;
    const formData = new FormData(loginForm);
    const loginInfo = Object.fromEntries(formData.entries());

    loginAccount(loginUrl, loginInfo);
  });
}
async function loginAccount(url, data) {
  try {
    const accountData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, accountData);
    const result = await response.json();
    const accessToken = result.accessToken;

    localStorage.setItem("accessToken", accessToken);
    if (accessToken) {
      window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error);
  }
}

// ------------------------- INDEX PAGE

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
    console.log(post);
    displaySpecificPost(post);
  } catch (error) {
    console.log(error);
  }
}

function displaySpecificPost(post) {
  const { title, media, body, id, created, tags } = post;
  const { avatar, name } = post.author
  document.title = `${title} | SocialClub`
  if (post.media) {
    postContainer.innerHTML += `
            <div class="row d-flex justify-content-center my-5">
                <div class="col-xl-6 col-lg-10 col-md-12">
                    <div class="border">
                        <div class="container m-0">
                            <div class="row d-flex align-items-center">
                                <div class="col-1 m-0 p-0">
                                    <img src="${avatar}" class="img-thumbnail">
                                </div>
                                <div class="col-11">
                                    <p class="pb-0 mb-0 username">${name}</p>
                                </div>
                            </div>
                            <div class="row">
                                <img src="${media}" alt="Image for the post: ${title}" class="p-0">
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
    postContainer.innerHTML += `
            <div class="row d-flex justify-content-center my-5">
                <div class="col-xl-6 col-lg-10 col-md-12">
                    <div class="border">
                        <div class="container m-0">
                            <div class="row d-flex align-items-center">
                                <div class="col-1 m-0 p-0">
                                    <img src="${avatar}" class="img-thumbnail">
                                </div>
                                <div class="col-11">
                                    <p class="pb-0 mb-0 username">${name}</p>
                                </div>
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
  }
  updateMedia.value = `${media}`;
  updateTitle.value = `${title}`;
  updateBody.value = `${body}`;
}
