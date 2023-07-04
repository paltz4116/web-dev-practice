const loadCommentsBtn = document.querySelector(`#load-comments`);

async function fetchCommentsForPost(event) {
    const postId = loadCommentsBtn.dataset.postid;
    const response = await fetch(`/posts/${postId}/comments`);
    const responseData = await response.json();

    console.log(responseData);
}

loadCommentsBtn.addEventListener(`click`, fetchCommentsForPost);
