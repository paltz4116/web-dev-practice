const loadCommentsBtn = document.querySelector(`#load-comments`);
const commentsSection = document.querySelector(`#comments`);

function createCommentsList(comments) {
  const commentList = document.createElement(`ol`);

  for (const comment of comments) {
    const commentElement = document.createElement(`li`);
    commentElement.innerHTML = `
    <article class="comment-item">
        <h2>${comment.title}</h2>
        <p>${comment.text}</p>
    </article>
  `;

  commentList.appendChild(commentElement);
  }

  return commentList;
}

async function fetchCommentsForPost() {
  const postId = loadCommentsBtn.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json();

  const commentsList = createCommentsList(responseData);
  commentsSection.innerHTML = ``;
  commentsSection.appendChild(commentsList);
}

loadCommentsBtn.addEventListener(`click`, fetchCommentsForPost);
