const loadCommentsBtn = document.querySelector(`#load-comments`);
const commentsSection = document.querySelector(`#comments`);
const commentsForm = document.querySelector(`#comments-form form`);
const commentTitle = document.querySelector(`#title`);
const commentText = document.querySelector(`#text`);

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

  if (response && response.length > 0) {
    const commentsList = createCommentsList(responseData);
    commentsSection.innerHTML = ``;
    commentsSection.appendChild(commentsList);
  } else {
    commentsSection.firstElementChild.textContent = `We could not find any commnets.`;
  }
}

async function saveComment(event) {
  event.preventDefault();
  const postId = commentsForm.dataset.postid;

  const enteredTitle = commentTitle.value;
  const enteredText = commentText.value;

  const comment = { title: enteredTitle, text: enteredText };

  const response = await fetch(`/posts/${postId}/comments`, {
    method: `POST`,
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": `application/json`,
    },
  });

  fetchCommentsForPost();
}

loadCommentsBtn.addEventListener(`click`, fetchCommentsForPost);
commentsForm.addEventListener(`submit`, saveComment);
