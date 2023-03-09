import { fetchPostsWithToken, setCreatePostListener } from "./functions/index.js";
import { setLogOut } from "./functions/logout.js";
import { token } from "./components/variables.js"

fetchPostsWithToken();
setCreatePostListener();
setLogOut();

if (!token) {
  window.location.href = "login.html";
}
