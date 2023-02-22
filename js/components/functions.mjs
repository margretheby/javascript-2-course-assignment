import { createAccountForm, createAccountUrl, loginForm, loginUrl, loginError, postsUrl, postsContainer, createPostForm, postContainer, params, postID, postIdUrl, updateBody, updateMedia, updateTitle, deletePostButton, logOut } from "./variables.mjs";

// ------------------------- ALL PAGES
// Log out
export function setLogOut() {
    logOut.addEventListener("click", (event) => {
        localStorage.clear();
    })
}

// ------------------------- CREATE ACCOUNT PAGE
// Create account function
export function setCreateAccountListener() {
    createAccountForm.addEventListener("submit", (event) => {
        event.preventDefault()
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

        const response = await fetch(createAccountUrl, accountData)
        const result = await response.json()
        console.log(result)

    } catch(error) {
        console.log(error);
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
    })

}

async function loginAccount(url, data) {
    try {
        const accountData = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(url, accountData);
        const result = await response.json();
        const accessToken = result.accessToken;

        localStorage.setItem("accessToken", accessToken)
    } catch (error) {
        console.log(error);
    }
}

/* Not finished */
function resultOfLogin (result) {
    if (result) {
        loginForm = (action = "/profile.html");
    } else {
        loginError.style.display = "block";
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
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        };
        
        const response = await fetch(postsUrl, getPosts);
        const result = await response.json();
        console.log(result);

        displayPostsOnPage(result);
    } catch (error) {
        console.log(error)
    }
}
// function to display posts
function displayPostsOnPage(post) {
    for (let i = 0; i < post.length; i++) {
        if (post[i].media) {
            postsContainer.innerHTML += `
            <div class="row d-flex justify-content-center my-5">
                <div class="col-xl-6 col-lg-10 col-md-12 p-0">
                    <div class="border p-0">
                        <div class="container m-0 pe-0">
                            <div class="row d-flex align-items-center">
                                <div class="col-2 m-0 p-0">
                                    <p>[img]</p>
                                </div>
                                <div class="col-10">
                                    <p class="pb-0 mb-0">USERNAME</p>
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
                                <div class="col-2 m-0 p-0">
                                    <p>[img]</p>
                                </div>
                                <div class="col-10">
                                    <p class="pb-0 mb-0">USERNAME</p>
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

// Create post function

export function setCreatePostListener() {
    createPostForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const createPostForm = event.target;
        const formData = new FormData(createPostForm);
        const postInfo = Object.fromEntries(formData.entries());

        createPost(postInfo);

    })
} 

async function createPost(post) {
    try {
        const token = localStorage.getItem("accessToken")
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(post)
        }
        const response = await fetch(postsUrl, postData);
        const result = await response.json();
        window.location.href = "index.html";
    } catch(error) {
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
    })
} 

async function updatePost(post) {
    try {
        const token = localStorage.getItem("accessToken")
        const postData = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(post)
        }
        const response = await fetch(postIdUrl, postData)
        const result = await response.json();
        location.reload();
    } catch(error) {
        console.log(error);
    }
}

export async function fetchSpecificPost() {
    try {
        const token = localStorage.getItem("accessToken");
        const postData = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        }
        const response = await fetch(postIdUrl, postData);
        const post = await response.json();
        displaySpecificPost(post);
    } catch (error) {
        console.log(error);
    }
}

function displaySpecificPost(post) {
        if (post.media) {
            postContainer.innerHTML += `
            <div class="row d-flex justify-content-center my-5">
                <div class="col-xl-6 col-lg-10 col-md-12">
                    <div class="border">
                        <div class="container m-0">
                            <div class="row d-flex align-items-center">
                                <div class="col-2 m-0 p-0">
                                    <p>[img]</p>
                                </div>
                                <div class="col-10">
                                    <p class="pb-0 mb-0">USERNAME</p>
                                </div>
                            </div>
                            <div class="row">
                                <img src="${post.media}" alt="Image for the post: ${post.title}" class="p-0">
                            </div>
                            <div class="row">
                            <a href="specific-post.html?postID=${post.id}" class="nav-link ps-4"><h2 class="mt-2">${post.title}</h2></a>
                                <p class="mt-2 ps-4">${post.body}</p>
                                <p class="mt-2 ps-4">Posted: ${post.created}</p>
                                <p class="mt-0 ps-4">Tags: ${post.tags}</p>
                                
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
                                <div class="col-2 m-0 p-0">
                                    <p>[img]</p>
                                </div>
                                <div class="col-10">
                                    <p class="pb-0 mb-0">USERNAME</p>
                                </div>
                                <div class="col-12">
                                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#edit-post-${post.id}" aria-expanded="false" aria-controls="edit-post-${post.id}">Edit</button>
                                <div class="collapse" id="edit-post-${post.id}">
                                    <div class="container">
                                        <div class="row d-flex justify-content-end">
                                            <div class="col-10 mb-5">
                                                <form class="edit-post-form">
                                                    <label for="id">Post ID</label>
                                                    <textarea name="id" rows="1" class="form-control" disabled>${post.id}</textarea>
                                                    <label for="media" class="mt-3">Image URL</label>
                                                    <input type="url" name="media" id="update-media" class="form-control" placeholder="https://pics.com/image.jpg">
                                                    <label for="title" class="mt-3">Title</label>
                                                    <input type="text" name="title" id="update-title" class="form-control" value="${post.title}">
                                                    <label for="body" class="mt-3">Caption</label>
                                                    <textarea name="body" id="update-body" rows="4" class="form-control">${post.body}</textarea>
                                                    <button class="btn btn-primary mt-3">Update post</button>
                                                </form>
                                                <button class="btn btn-danger mt-3" id="btn-delete">Delete post</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>                               
                        </div>
                        </div>
                        </div>
                        <div class="row">
                                <a href="specific-post.html?postID=${post.id}" class="nav-link ps-4"><h2 class="mt-2">${post.title}</h2></a>
                                <p class="mt-2 ps-4">${post.body}</p>
                                <p class="mt-2 ps-4">Posted: ${post.created}</p>
                                <p class="mt-0 ps-4">Tags: ${post.tags}</p>                        
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
    updateMedia.value = `${post.media}`
    updateTitle.value = `${post.title}`
    updateBody.value = `${post.body}`
}

