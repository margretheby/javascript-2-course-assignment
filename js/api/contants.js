// API endpoint 
export const BASE_URL = "https://api.noroff.dev/api/v1/social/";

// ------------- Create account page
export const createAccountUrl = BASE_URL + "auth/register";

// ------------- Login page
export const loginUrl = BASE_URL + "auth/login"

// ------------- Index page
export const postsUrl = BASE_URL + "posts?_author=true";

// ------------- Specific post profile
export const profileUrl = BASE_URL + "profiles/";

// ------------- Creating URL Params
export const params = new URLSearchParams(window.location.search);
// for specific post
export const postID = params.get("postID");
export const postIdUrl = `${BASE_URL}posts/${postID}?_author=true`;
// for filter
export const filterParam = params.get("filter");
// for profile
export const profileParam = params.get("user");
export const profilePostsUrl = `${profileUrl}${profileParam}/posts?_author=true`