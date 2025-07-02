let movies = [];
let currentEditId = null;

const titleInput = document.getElementById("titleInput");
const genreSelect = document.getElementById("genreSelect");
const starRating = document.getElementById("starRating");
const addMovieBtn = document.getElementById("addMovieBtn");
const movieList = document.getElementById("movieList");
const genreFilter = document.getElementById("genreFilter");
const sortButtons = document.querySelectorAll("[data-sort]");

const editModal = document.getElementById("editModal");
const editTitle = document.getElementById("editTitle");
const editGenre = document.getElementById("editGenre");
const editStarRating = document.getElementById("editStarRating");
const saveEditBtn = document.getElementById("saveEditBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let addRating = 0;
let editRating = 0;

loadMovies();
renderMovies();
initStars(starRating, "add");
initStars(editStarRating, "edit");

function loadMovies() {
  const data = localStorage.getItem("movies");
  if (data) movies = JSON.parse(data);
}

function saveMovies() {
  localStorage.setItem("movies", JSON.stringify(movies));
}

function initStars(container, mode) {
  container.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.textContent = "★";
    star.dataset.value = i;
    star.dataset.mode = mode;
    container.appendChild(star);
  }
}

function resetStars(container, mode) {
  const rating = mode === "add" ? addRating : editRating;
  [...container.children].forEach((star, idx) => {
    star.classList.remove("hover");
    star.classList.toggle("selected", idx < rating);
  });
}

function highlightStars(rating, container) {
  [...container.children].forEach((star, idx) => {
    star.classList.toggle("hover", idx < rating);
  });
}

// Event delegation for star hover and click
document.addEventListener("mouseover", (e) => {
  if (e.target.closest(".stars span")) {
    const star = e.target;
    const container = star.parentElement;
    const rating = Number(star.dataset.value);
    highlightStars(rating, container);
  }
});

document.addEventListener("mouseout", (e) => {
  if (e.target.closest(".stars span")) {
    const star = e.target;
    const container = star.parentElement;
    const mode = star.dataset.mode;
    resetStars(container, mode);
  }
});

document.addEventListener("click", (e) => {
  const star = e.target.closest(".stars span");
  if (star) {
    const value = Number(star.dataset.value);
    const mode = star.dataset.mode;
    if (mode === "add") {
      addRating = value;
    } else if (mode === "edit") {
      editRating = value;
    }
    resetStars(star.parentElement, mode);
  }
});

// Add movie
addMovieBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const genre = genreSelect.value;

  if (!title) {
    alert("Please enter a title");
    return;
  }

  if (addRating === 0) {
    alert("Please enter a rating higher than 0");
    return;
  }

  movies.push({
    id: Date.now(),
    title,
    genre,
    rating: addRating,
    watched: false,
  });

  titleInput.value = "";
  addRating = 0;
  resetStars(starRating, "add");
  saveMovies();
  renderMovies();
});

// Render all movies
function renderMovies() {
  movieList.innerHTML = "";
  const genre = genreFilter.value;
  let filtered = [...movies];
  if (genre !== "All") filtered = filtered.filter((m) => m.genre === genre);

  filtered.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    if (movie.watched) card.classList.add("watched");

    card.innerHTML = `
      <h4>${movie.title}</h4>
      <div class="stars" data-mode="display">${"★".repeat(movie.rating)}</div>
      <div class="genre">${movie.genre}</div>
      <button data-action="edit" data-id="${movie.id}">✏️</button>
      <button data-action="toggle" data-id="${movie.id}">✔️</button>
      <button data-action="remove" data-id="${movie.id}">❌</button>
    `;
    movieList.appendChild(card);
  });
}

// Event delegation for movie card buttons
movieList.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;
  const movie = movies.find((m) => m.id === id);
  if (!movie) return;

  if (action === "edit") {
    currentEditId = id;
    editTitle.value = movie.title;
    editGenre.value = movie.genre;
    editRating = movie.rating;
    resetStars(editStarRating, "edit");
    editModal.classList.remove("hidden");
  } else if (action === "toggle") {
    movie.watched = !movie.watched;
    saveMovies();
    renderMovies();
  } else if (action === "remove") {
    movies = movies.filter((m) => m.id !== id);
    saveMovies();
    renderMovies();
  }
});

// Save edited movie
saveEditBtn.addEventListener("click", () => {
  const movie = movies.find((m) => m.id === currentEditId);
  movie.title = editTitle.value.trim();
  movie.genre = editGenre.value;
  movie.rating = editRating;
  saveMovies();
  renderMovies();
  editModal.classList.add("hidden");
});

cancelEditBtn.addEventListener("click", () => {
  editModal.classList.add("hidden");
});

// Filter by genre
genreFilter.addEventListener("change", renderMovies);

// Sort buttons
sortButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.sort;
    if (key === "title") {
      movies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (key === "rating") {
      movies.sort((a, b) => b.rating - a.rating);
    }
    renderMovies();
  });
});