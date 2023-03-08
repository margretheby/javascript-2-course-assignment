import { fetchPostsWithToken, setCreatePostListener } from "./functions/index.js";
import { setLogOut } from "./functions/logout.js";

fetchPostsWithToken();
setCreatePostListener();
setLogOut();

const token = localStorage.getItem("accessToken");

if (!token) {
  window.location.href = "login.html";
}
