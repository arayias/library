const addBookBtn = document.querySelector(".add-book-btn");
const modalElement = document.querySelector(".book-modal");
const bookGrid = document.querySelector(".book-grid");

const Book = function (title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.toggleRead = () => {
    this.isRead = !this.isRead;
  };
};

const states = {
  books: [
    new Book("The Hobbit", "J.R.R. Tolkien", 295, true),
    new Book("The Fellowship of the Ring", "J.R.R. Tolkien", 423, false),
  ],
  isModalOpen: false,
};

document.addEventListener("click", (e) => {
  if (states.isModalOpen && !e.target.classList.contains("book-modal")) {
    states.isModalOpen = false;
    modalElement.classList.toggle("hidden");
  }
});

addBookBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  states.isModalOpen = !states.isModalOpen;
  modalElement.classList.toggle("hidden");
});

const renderHTML = () => {
  bookGrid.innerHTML = "";
  states.books.forEach((book, index) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.innerHTML = `
              <div class="book__title">${book.title}</div>
              <div class="book__author">By ${book.author}</div>
              <div class="book__pages">${book.pages}</div>
              <button class="book-btn ${book.isRead ? "green" : "yellow"}">
                ${book.isRead ? "Read" : "Pending"}
              </button>
              <button class="book-btn red">Remove</button>
    `;
    bookGrid.appendChild(bookElement);
  });
};

renderHTML();
