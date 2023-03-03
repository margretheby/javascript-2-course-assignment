import { loginUrl } from "../api/contants.js";
import { loginForm } from "../components/variables.js";

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
   * Logs in an account by sending an object of data to the login url, and saves an access token in localStorage 
   * @param { string } url login database url
   * @param { object } data from a form
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
  
      localStorage.setItem("accessToken", accessToken);
      if (accessToken) {
        window.location.href = "index.html";
      } 
    } catch (error) {
      console.log(error);
    }
  }