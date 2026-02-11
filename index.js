const modal = document.querySelector(".modal");
const openBtn = document.querySelector(".add-btn");

openBtn.addEventListener("click", () => {
    modal.classList.add("active");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});