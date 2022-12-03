import { url, getJSON, createComment, postComment } from "./util.js";

const urlSearchParams = new URLSearchParams(location.search);
const postId = urlSearchParams.get("id");

const postPageElement = document.querySelector("#post");
const postContainer = document.querySelector(".post-container");
const commentContainer = document.querySelector(".comment-container");
const loadingElement = document.querySelector(".loading");

const commentForm = document.querySelector(".comment-form");
const emailInput = document.querySelector("#email");
const commentBodyInput = document.querySelector("#comment-body");

async function main() {
    const post = await getJSON(`${url}/${postId}`);
    const comments = await getJSON(`${url}/${postId}/comments`);

    loadingElement.classList.add("hide");
    postPageElement.classList.remove("hide");

    const title = document.createElement("h1");
    const body = document.createElement("p");

    title.textContent = post.title;
    body.textContent = post.body;

    postContainer.append(title, body);

    const commentElements = comments.map(comment => createComment(comment));

    commentElements.forEach(comment => commentContainer.append(comment));

    commentForm.addEventListener("submit", formHandler);
}

function formHandler(event) {
    event.preventDefault();

    const comment = {
        email: emailInput.value,
        body: commentBodyInput.value
    };

    const commentJSON = JSON.stringify(comment);

    postComment(commentJSON, postId);
    commentContainer.append(createComment(comment));
}

main();
