import { createAccountForm, createAccountUrl, postMethod } from "./variables.mjs";

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


// Send the account to the API
export async function createAccount(profile) {
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