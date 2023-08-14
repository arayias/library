states = {
  books: [],
  isModalOpen: false,
};

addBookBtn = document.querySelector(".add-book-btn");
modalElement = document.querySelector(".book-modal");

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
