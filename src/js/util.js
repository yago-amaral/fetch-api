export const url = "https://jsonplaceholder.typicode.com/posts";

/**
 * Adiciona um post a postContainerDiv
 * @param {object} post
 * @param {HTMLDivElement} postContainerDiv
 */
export function appendPost(post, postContainerDiv) {
    const newPostDiv = document.createElement("div");
    const postTitle = document.createElement("h2");
    const postBody = document.createElement("p");
    const postLink = document.createElement("a");

    postTitle.textContent = post.title;
    postBody.textContent = post.body;
    postLink.textContent = "Ler post";
    postLink.setAttribute("href", `post.html?id=${post.id}`);

    newPostDiv.append(postTitle, postBody, postLink);
    postContainerDiv.append(newPostDiv);
}

/**
 * Adiciona um ou mais posts a postContainerDiv
 * @param {object[]} posts
 * @param {HTMLDivElement} postContainerDiv
 */
export function appendPosts(posts, postContainerDiv) {
    posts.forEach(post => appendPost(post, postContainerDiv));
}

/**
 * Pega dados da API
 * @param {string} url
 * @return {Promise<Array>}
 */
export async function getJSON(url) {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    return data;
}

/**
 * Cria uma div de comentário
 * @param {object} comment 
 */
export function createComment(comment) {
    const commentDiv = document.createElement("div");
    const emailElement = document.createElement("h3");
    const commentBody = document.createElement("p");

    emailElement.textContent = comment.email;
    commentBody.textContent = comment.body;

    commentDiv.append(emailElement, commentBody);

    return commentDiv;
}


/**
 * Envia um comentário para a API pelo método POST
 * @param {string} commentJSON 
 * @param {number} postId 
 */
export async function postComment(commentJSON, postId) {
    const response = await fetch(`${url}/${postId}/comments`, {
        method: "POST",
        body: commentJSON,
        headers: {
            "Content-type": "application/json"
        }
    });

    const data = await response.json();
}
