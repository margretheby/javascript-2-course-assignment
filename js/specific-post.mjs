import { fetchSpecificPost, setUpdatePostListener } from "./components/functions.mjs";
import { postIdUrl, deletePostButton, postID } from "./components/variables.mjs";

fetchSpecificPost(postIdUrl);

// DELETE POST 

deletePostButton.addEventListener("click", (event) => {
    event.preventDefault();
    deletePost();
    window.location.href = "index.html"
});

async function deletePost() {
    try {
        const token = localStorage.getItem("accessToken");
        const postData = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(postIdUrl, postData)
        const result = await response.json();
    } catch (error) {
        console.log(error);
    }
}

