import { logOut } from "../components/variables.js";

export function setLogOut() {
    logOut.addEventListener("click", (event) => {
      localStorage.clear();
    });
}