// API endpoints 

export const BASE_URL = "https://api.noroff.dev/api/v1/social/"

// Create account page
export const createAccountUrl = BASE_URL + "auth/register"
export const createAccountForm = document.querySelector("#create-account");
export const postMethod = "post";

// Login page
export const loginUserUrl = BASE_URL + "auth/login"


