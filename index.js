let editingBookId = null


const modal = document.querySelector(".modal");
const openBtn = document.querySelector(".add-btn");
const library = document.getElementById('library')
const form = document.getElementById('form')
const submitBtn = form.querySelector('button[type="submit"]');
const formHeader = document.getElementById('form-header')


const myLibrary = []

function Book(title,author,pages,read) {
    this.id = crypto.randomUUID()
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}
Book.prototype.toggleRead = function(){
    this.read = !this.read
}

function addBookToLibrary(title,author,pages,read) {
    const newBook = new Book(title,author,pages,read)
    myLibrary.push(newBook)
}

const displayBook = ()=>{
    library.innerHTML = ''
    myLibrary.forEach(book=>{
        const bookCard = document.createElement('div')
        bookCard.classList.add('book-card')
        bookCard.dataset.id = book.id
        bookCard.innerHTML = `
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
            <div class="crud-btns">
                <button class="btn read-btn">${!book.read ?'Read Book':'Unread'}</button>
                <button class="btn edit-btn" type="submit">Edit Book</button>
            </div>
            <button class="delete-btn">Delete Book</button>    
        `
        const readButton = bookCard.querySelector('.read-btn')
        readButton.addEventListener('click',() =>{
            book.toggleRead()
            displayBook()
        })
        const deleteButton = bookCard.querySelector('.delete-btn')
        deleteButton.addEventListener('click',()=>{
            const index = myLibrary.findIndex(b => b.id === book.id)
            if(index !== -1){myLibrary.splice(index, 1)
            displayBook()}
        })
        const editButton = bookCard.querySelector('.edit-btn')
        editButton.addEventListener('click',()=>{
            editingBookId = book.id
            

            document.getElementById('title').value = book.title
            document.getElementById('author').value = book.author
            document.getElementById('pages').value = book.pages
            document.getElementById('read-status').checked = book.read
            formHeader.innerHTML ="Update Book"
            submitBtn.textContent = "Update Book"
            modal.classList.add('active')
        })
        library.appendChild(bookCard)
    })
}

function openModal(){
    editingBookId = null
    submitBtn.textContent = "Add Book"
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

    if(editingBookId){
        const book = myLibrary.find(b=> b.id === editingBookId)

            if(book){book.title = bookTitle;
            book.author = bookAuthor;
            book.pages = bookPages;
            book.read = bookStatus;}

            editingBookId = null
    }

    else{
        addBookToLibrary(bookTitle,bookAuthor,bookPages,bookStatus)
    }
        displayBook()
        form.reset()
        modal.classList.remove('active')
        submitBtn.textContent = "Add Book"
    
})
