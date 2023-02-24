import {
  fetchPostsWithToken,
  setCreatePostListener,
  setLogOut,
} from "./components/functions.js";

fetchPostsWithToken();
setCreatePostListener();
setLogOut();

const token = localStorage.getItem("accessToken");
if (!token) {
  window.location.href = "login.html";
}
