import { setLoginAccount } from "./components/functions.js";

setLoginAccount();
const token = localStorage.getItem("accessToken");

if (token) {
  window.location.href = "index.html";
}
