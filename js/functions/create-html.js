import { postContainer, updateBody, updateMedia, updateTitle, profileContainer } from "../components/variables.js";

// for post
/**
 * This function accepts an object as an argument, and creates HTML to display the properties of the object. 
 * @param { object } post An object fetched from an API of posts.
 */
export function createHtmlForPost (post) {
    const { title, media, body, id, created, tags } = post;
    const { avatar, name } = post.author
    document.title = `${title} | SocialClub`
    if (post.media) {
        postContainer.innerHTML = `
            <div class="row d-flex justify-content-center my-5">
                <div class="col-xl-6 col-lg-10 col-md-12 mt-5">
                    <div class="border">
                        <div class="container m-0">
                            <div class="row d-flex align-items-center">
                                <div class="col-1 m-0 p-0">
                                    <img src="${avatar}" class="img-thumbnail">
                                </div>
                                <div class="col-11">
                                    <p class="pb-0 mb-0 username">${name}</p>
                                </div>
                            </div>
                            <div class="row">
                                <img src="${media}" alt="Image for the post: ${title}" class="p-0">
                            </div>
                            <div class="row">
                            <a href="specific-post.html?postID=${id}" class="nav-link ps-4"><h2 class="mt-2">${title}</h2></a>
                                <p class="mt-2 ps-4">${body}</p>
                                <p class="mt-2 ps-4">Posted: ${created}</p>
                                <p class="mt-0 ps-4">Tags: ${tags}</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    } else {
        postContainer.innerHTML = `
            <div class="row d-flex justify-content-center my-5">
                <div class="col-xl-6 col-lg-10 col-md-12 mt-5">
                    <div class="border">
                        <div class="container m-0">
                            <div class="row d-flex align-items-center">
                                <div class="col-1 m-0 p-0">
                                    <img src="${avatar}" class="img-thumbnail">
                                </div>
                                <div class="col-11">
                                    <p class="pb-0 mb-0 username">${name}</p>
                                </div>
                            </div>
                            <div class="row">
                            <a href="specific-post.html?postID=${id}" class="nav-link ps-4"><h2 class="mt-2">${title}</h2></a>
                                <p class="mt-2 ps-4">${body}</p>
                                <p class="mt-2 ps-4">Posted: ${created}</p>
                                <p class="mt-0 ps-4">Tags: ${tags}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }
  updateMedia.value = `${media}`;
  updateTitle.value = `${title}`;
  updateBody.value = `${body}`;
}

// for profile
/**
 * This function accepts an object as an argument, and creates HTML to display the properties of the object.
 * @param { object } profile An object of profile/user information fetched from an API of registered users.
 */
export function createHtmlForProfile (profile) {
    const { name, email, banner, avatar } = profile
    const { posts, followers, following } = profile._count;
    profileContainer.innerHTML = `
            <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 mt-2">
                <img src="${avatar}" alt="Profile picture of ${name}" class="img-fluid rounded">
            </div>
            <div class="col-xl-6 col-lg-6 col-md-4 col-sm-6">
                <div>
                    <h3 class="mt-2">${name}</h3></div>
                <div>
                    <p class="m-0">Posts: ${posts}</p>
                </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div>
                    <h3 class="mt-2">Connections</h3>
                </div>
                <div>
                    <p class="m-0">Followers: ${followers}</p>
                    <p class="m-0">Following: ${following}</p>
                </div>
            </div>`
}


