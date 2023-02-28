// API endpoint 
export const BASE_URL = "https://api.noroff.dev/api/v1/social/";

// ------------- Create account page
export const createAccountUrl = BASE_URL + "auth/register";

// ------------- Login page
export const loginUrl = BASE_URL + "auth/login"

// ------------- Index page
export const postsUrl = BASE_URL + "posts?_author=true";

// Creating URL Params
export const params = new URLSearchParams(window.location.search);
export const postID = params.get("postID");
export const postIdUrl = `${BASE_URL}posts/${postID}?_author=true`;
export const filterParam = params.get("filter");