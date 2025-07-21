document.addEventListener("DOMContentLoaded", () => {
  const userFilter = document.getElementById("userFilter");
  const userSelect = document.getElementById("userSelect");
  const searchBtn = document.getElementById("searchBtn");
  const resultsDiv = document.getElementById("results");
  const addBookForm = document.getElementById("addBookForm");
  const importBtn = document.getElementById("importXmlBtn");
  const importStatus = document.getElementById("importStatus");

  // Load users into both dropdowns
  fetch("get-users.php")
    .then((res) => res.json())
    .then((users) => {
      const defaultFilterOption = new Option("All Users", "");
      userFilter.appendChild(defaultFilterOption);

      users.forEach((user) => {
        const option1 = new Option(user.username, user.id);
        const option2 = new Option(user.username, user.id);
        userFilter.appendChild(option1);
        userSelect.appendChild(option2);
      });
    });

  // Search books
  searchBtn.addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.trim();
    const genre = document.getElementById("genreFilter").value;
    const userId = userFilter.value;

    const params = new URLSearchParams({ query, genre, user_id: userId });
    fetch("search-books.php?" + params.toString())
      .then((res) => res.json())
      .then(displayResults)
      .catch(() => showMessage("Error fetching books."));
  });

  // Add book form handler
  addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addBookForm);

    fetch("add-book.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then(() => {
        addBookForm.reset();
        searchBtn.click();
      })
      .catch(() => alert("Failed to add book."));
  });

  // Delete a book
  function deleteBook(id) {
    fetch("delete-book.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then(() => searchBtn.click());
  }

  // Display books in formatted layout
  function displayResults(books) {
    resultsDiv.innerHTML = "";
    if (!books.length) return showMessage("No books found.");

    books.forEach((book) => {
      const bookDiv = document.createElement("div");
      bookDiv.className = "book";

      const title = document.createElement("p");
      title.innerHTML = `<span class="book-title">${book.title}</span> by ${book.author}`;
      bookDiv.appendChild(title);

      const details = document.createElement("p");
      details.textContent = `Genre: ${book.genre}, Year: ${book.year}`;
      bookDiv.appendChild(details);

      const user = document.createElement("p");
      user.textContent = `Added by: ${book.user}`;
      bookDiv.appendChild(user);

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.onclick = () => deleteBook(book.id);
      bookDiv.appendChild(delBtn);

      resultsDiv.appendChild(bookDiv);
    });
  }

  // Display message when no books or error
  function showMessage(msg) {
    resultsDiv.innerHTML = `<p class="message">${msg}</p>`;
  }

  // Import books from XML
  importBtn.addEventListener("click", () => {
    fetch("load-books-from-xml.php")
      .then((res) => res.text())
      .then(() => {
        importStatus.textContent = "Books imported successfully!";
        importStatus.style.color = "green";
        searchBtn.click(); // Refresh results
      })
      .catch(() => {
        importStatus.textContent = "Failed to import books.";
        importStatus.style.color = "red";
      });
  });

  // Initial load
  searchBtn.click();
});
