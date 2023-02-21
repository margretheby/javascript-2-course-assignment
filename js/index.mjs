import { fetchPostsWithToken, setCreatePostListener, setUpdatePostListener, setLogOut } from "./components/functions.mjs"

fetchPostsWithToken();
setCreatePostListener();
setLogOut();

const token = localStorage.getItem("accessToken");
if (!token) {
    window.location.href = "login.html"
}