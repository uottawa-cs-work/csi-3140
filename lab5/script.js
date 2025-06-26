const blogPosts = [
  {
    title: "Understanding the DOM",
    author: "Hesam Nasiri",
    date: new Date("2025-06-15"),
    content: "The Document Object Model (DOM) is a programming interface for web documents. It represents the page as nodes and objects..."
  },
  {
    title: "JavaScript Event Handling",
    author: "John Smith",
    date: new Date("2025-06-16"),
    content: "Event handling is the cornerstone of interactive web pages. It involves listening for actions—like clicks or keypresses—and responding to them..."
  }
];

function displayPosts() {
  const container = document.getElementById('postsContainer');
  container.innerHTML = '';

  blogPosts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    const titleEl = document.createElement('h3');
    titleEl.textContent = post.title;
    titleEl.addEventListener('click', () => {
      alert(`This page says\n\n${post.content}`);
    });

    const meta = document.createElement('small');
    meta.textContent = `By ${post.author} on ${post.date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}`;

    const preview = document.createElement('p');
    preview.textContent = post.content.slice(0, 100) + (post.content.length > 100 ? '...' : '');

    postDiv.appendChild(titleEl);
    postDiv.appendChild(meta);
    postDiv.appendChild(preview);
    container.appendChild(postDiv);
  });
}

function handleAddPost(event) {
  event.preventDefault();

  const title = document.getElementById('titleInput').value.trim();
  const author = document.getElementById('authorInput').value.trim();
  const content = document.getElementById('contentInput').value.trim();

  if (title && author && content) {
    const newPost = {
      title,
      author,
      date: new Date(),
      content
    };

    blogPosts.unshift(newPost);
    displayPosts();
    document.getElementById('postForm').reset();
  }
}

document.getElementById('postForm').addEventListener('submit', handleAddPost);

displayPosts();