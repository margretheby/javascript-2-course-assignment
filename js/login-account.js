import { setLoginAccount } from "./functions/login.js";

setLoginAccount();
const token = localStorage.getItem("accessToken");

if (token) {
  window.location.href = "index.html";
}
