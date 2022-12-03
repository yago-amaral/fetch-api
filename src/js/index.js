import { url, getJSON, appendPosts } from "./util.js";

const loadingElement = document.querySelector(".loading");
const postContainer = document.querySelector(".post-container");

async function main() {
    const posts = await getJSON(url);

    loadingElement.classList.add("hide");
    appendPosts(posts, postContainer);
}

main();