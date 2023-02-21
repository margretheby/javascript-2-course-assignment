import { setLoginAccount } from "./components/functions.mjs"

setLoginAccount();
const token = localStorage.getItem("accessToken");

if (token) {
    window.location.href = "index.html"
}