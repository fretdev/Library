const modal = document.querySelector(".modal");
const openBtn = document.querySelector(".add-btn");
const library = document.getElementById('library')
const form = document.getElementById('form')

const myLibrary = []

function Book(title,author,pages,read) {
    this.id = crypto.randomUUID()
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title,author,pages,read) {
    const newBook = new Book(title,author,pages,read)
    myLibrary.push(newBook)
    console.log(myLibrary)
}

const displayBook = (myLibrary)=>{
    library.innerHTML = ''
    myLibrary.forEach(book=>{
        const bookCard = document.createElement('div')
        bookCard.classList.add('book-card')
        bookCard.innerHTML = `
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
        `
         library.appendChild(bookCard)
    })
}

function openModal(){
    const input = document.getElementById('title')
    modal.classList.add('active')
    input.focus()
}

openBtn.addEventListener("click", () => {
    modal.classList.add("active");
    openModal()
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const bookTitle = document.getElementById('title').value
    const bookAuthor = document.getElementById('author').value
    const bookPages = Number(document.getElementById('pages').value)
    const bookStatus = document.getElementById('read-status').checked

    addBookToLibrary(bookTitle,bookAuthor,bookPages,bookStatus)
    displayBook(myLibrary)
    form.reset()
    modal.classList.remove('active')
})
