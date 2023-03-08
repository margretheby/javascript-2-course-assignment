import { logOut } from "../components/variables.js";

/**
 * This function uses an eventListener to clear localStorage, deleting the user information from localStorage, and therefore logs out the user.
 */
export function setLogOut() {
    logOut.addEventListener("click", (event) => {
      localStorage.clear();
    });
}