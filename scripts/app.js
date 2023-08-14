const addBookBtn = document.querySelector(".add-book-btn");
const modalElement = document.querySelector(".book-modal");
const bookGrid = document.querySelector(".book-grid");
const form = document.querySelector("#add-book-form");

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
  if (states.isModalOpen && !modalElement.contains(e.target)) {
    states.isModalOpen = false;
    modalElement.classList.toggle("hidden");
  }
});

addBookBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  states.isModalOpen = !states.isModalOpen;
  modalElement.classList.toggle("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  states.books.push(
    new Book(
      data.get("title"),
      data.get("author"),
      data.get("pages"),
      data.get("isRead") === "on" ? true : false
    )
  );
  renderHTML();
  states.isModalOpen = false;
  modalElement.classList.toggle("hidden");
});

const renderHTML = () => {
  console.log(states.books);
  bookGrid.innerHTML = "";
  states.books.forEach((book, index) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.innerHTML = `
              <div class="book__title">${book.title}</div>
              <div class="book__author">By ${book.author}</div>
              <div class="book__pages">${book.pages}</div>
              <button book='${index}' class="book-btn ${
      book.isRead ? "green" : "yellow"
    }">
                ${book.isRead ? "Read" : "Pending"}
              </button>
              <button book='${index}' class="book-btn red">Remove</button>
    `;
    bookGrid.appendChild(bookElement);
  });

  bookGrid.querySelectorAll(".book-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      index = parseInt(btn.getAttribute("book"));
      if (e.target.classList.contains("green")) {
        states.books[index].toggleRead();
        e.target.classList.remove("green");
        e.target.classList.add("yellow");
        e.target.innerHTML = "Pending";
      } else if (e.target.classList.contains("yellow")) {
        states.books[index].toggleRead();
        e.target.classList.remove("yellow");
        e.target.classList.add("green");
        e.target.innerHTML = "Read";
      } else if (e.target.classList.contains("red")) {
        states.books.splice(index, 1);
        renderHTML();
      }
    });
  });
};

renderHTML();
