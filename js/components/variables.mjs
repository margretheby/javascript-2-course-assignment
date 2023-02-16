// API endpoints 

export const BASE_URL = "https://api.noroff.dev/api/v1/social/"

// Create account page
export const createAccountUrl = BASE_URL + "auth/register"
export const createAccountForm = document.querySelector("#create-account");
export const postMethod = "post";

// Login page
export const loginUrl = BASE_URL + "auth/login"
export const loginForm = document.querySelector("#login-form");
export const loginError = document.querySelector(".login-error");

// Index page
export const postsUrl = BASE_URL + "posts";
export const postsContainer = document.querySelector(".post-container");



