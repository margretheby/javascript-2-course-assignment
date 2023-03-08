import { loginUrl } from "../api/contants.js";
import { loginForm } from "../components/variables.js";

/**
 * This function contains an eventListener to log in an account based on the input in the login form.
 * @param { Class } formData Creates a key/value pair based on the data input in the login form
 * @param { object } loginInfo Turns the formData into an object
 */
export function setLoginAccount() {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const loginForm = event.target;
      const formData = new FormData(loginForm);
      const loginInfo = Object.fromEntries(formData.entries());
  
      loginAccount(loginUrl, loginInfo);
    });
  }
  
  /**
   * This function accepts two arguments, an url and an object. It logs in an account by sending an object of data to the login url, and saves an access token in localStorage 
   * @param { string } url login database url
   * @param { object } data from a form
   * @returns { string } adds two strings to localStorage (access token and username)
   */
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
      const profileName = result.name;
  
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("profileName", profileName);
      if (accessToken) {
        window.location.href = "index.html";
      } 
    } catch (error) {
      console.log(error);
    }
  }