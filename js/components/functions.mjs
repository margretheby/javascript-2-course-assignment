import { createAccountForm, createAccountUrl, loginForm, loginUrl, loginError, postsUrl, postsContainer } from "./variables.mjs";

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
        console.log(result);
        const accessToken = result.accessToken;
        console.log(accessToken);

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
                <div class="col-xl-6 col-lg-10 col-md-12">
                    <div class="border">
                        <div class="container m-0">
                            <div class="row d-flex align-items-center">
                                <div class="col-1 m-0 p-0">
                                    <p>[img]</p>
                                </div>
                                <div class="col-10">
                                    <p class="pb-0 mb-0">USERNAME</p>
                                </div>
                                <div class="col-1">
                                    <h4 class="mb-0 mt-1"><i class="fa-regular fa-heart"></i></h4>
                                </div>
                            </div>
                            <div class="row">
                                <img src="${post[i].media}" alt="Image for the post: ${post[i].title}" class="p-0">
                            </div>
                            <div class="row">
                                <h2 class="mt-2">${post[i].title}</h2>
                                <p class="mt-2">${post[i].body}</p>
                                <p class="mt-2">Posted: ${post[i].created}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        } else {
            postsContainer.innerHTML += `
            <div class="row d-flex justify-content-center my-5">
                <div class="col-xl-6 col-lg-10 col-md-12">
                    <div class="border">
                        <div class="container m-0">
                            <div class="row d-flex align-items-center">
                                <div class="col-1 m-0 p-0">
                                    <p>[img]</p>
                                </div>
                                <div class="col-10">
                                    <p class="pb-0 mb-0">USERNAME</p>
                                </div>
                                <div class="col-1">
                                    <h4 class="mb-0 mt-1"><i class="fa-regular fa-heart"></i></h4>
                                </div>
                            </div>
                            <div class="row">
                                <h2 class="mt-2">${post[i].title}</h2>
                                <p class="mt-2">${post[i].body}</p>
                                <p class="mt-2">Posted: ${post[i].created}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }

    }
}

