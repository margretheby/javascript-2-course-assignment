import { createAccountForm, createAccountUrl, loginForm, loginUrl, loginError } from "./variables.mjs";

// CREATE ACCOUNT PAGE
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

// LOGIN PAGE
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

function resultOfLogin (result) {
    if (result) {
        loginForm = (action = "/profile.html");
    } else {
        loginError.style.display = "Block";
    }
}

