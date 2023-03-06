import { profileUrl } from "../api/contants.js";
import { createHtmlForProfile } from "../functions/create-html.js"


// fetch profile information
export async function fetchProfileInfo () {
    try {
        const token = localStorage.getItem("accessToken");
        const profileName = localStorage.getItem("profileName");
        const specificProfileUrl = profileUrl + profileName;
        const getProfile = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
    
        const response = await fetch(specificProfileUrl, getProfile);
        const profile = await response.json();
        console.log(profile);
        createHtmlForProfile(profile);
    } catch(error) {
        console.log(error);
    }
}