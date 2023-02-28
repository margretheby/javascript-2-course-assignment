import { postContainer, updateBody, updateMedia, updateTitle } from "../components/variables.js";

// for post
export function createHtml (post) {
    const { title, media, body, id, created, tags } = post;
    const { avatar, name } = post.author
    document.title = `${title} | SocialClub`
    if (post.media) {
        postContainer.innerHTML += `
            <div class="row d-flex justify-content-center my-5">
                <div class="col-xl-6 col-lg-10 col-md-12">
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
        postContainer.innerHTML += `
            <div class="row d-flex justify-content-center my-5">
                <div class="col-xl-6 col-lg-10 col-md-12">
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