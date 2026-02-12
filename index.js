let editingBookId = null
let celebratedMilestones = {
    half: false,
    full: false
};


const headerText = document.getElementById('header-text')
const judgeText = document.getElementById('judge-text')


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
                <button class="btn edit-btn">Edit Book</button>
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
            displayBook()
        updateHeaderText('delete')
        }
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
    updateHeaderText()
}

function openModal(){
    editingBookId = null
    formHeader.innerHTML = "Add new book"
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
        closeModal();
    }
});
function closeModal() {
    modal.classList.remove('active');
    form.reset();
    editingBookId = null;
    submitBtn.textContent = "Add Book";
    formHeader.innerHTML = "Add new book";
}


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
        closeModal()
        submitBtn.textContent = "Add Book"
        formHeader.innerHTML = "Add new book"
    
})

function updateHeaderText(action) {
    const totalBooks = myLibrary.length;
    const readBooks = myLibrary.filter(b => b.read).length;
    const unreadBooks = totalBooks - readBooks;
   
    if(action === 'delete') {
        headerText.childNodes[0].textContent = "Hey!";
        judgeText.textContent = "Did you just delete a book?! 👀";
        animateJudge()
        setTimeout(() => {
        updateHeaderText();}, 3500);
        judgeText.classList.add('alert-shake');
        setTimeout(() => judgeText.classList.remove('alert-shake'), 500);
        return;
    }

    const percentage = totalBooks === 0 ? 0 : readBooks / totalBooks;


    if (percentage < 0.5) celebratedMilestones.half = false;
    if (percentage < 1) celebratedMilestones.full = false;

    if (totalBooks === 0) {
    headerText.childNodes[0].textContent = "WELCOME EMPTY NESTER";
    judgeText.textContent = "Your shelves are so clean it's scaring the pixels...👻";
    }

    else if (percentage >= 1 && !celebratedMilestones.full) {
    headerText.childNodes[0].textContent = "LEGENDARY READER!";
    judgeText.textContent = "You finished everything?! Respect. 📚🔥";
    animateJudge();
    startConfetti();
    celebratedMilestones.full = true;
    }

    else if (percentage >= 0.5 && !celebratedMilestones.    half) {
    headerText.childNodes[0].textContent = "HALFWAY HERO!";
    judgeText.textContent = "Look at you making progress 👏 Keep going!";
    animateJudge();
    startConfetti();
    celebratedMilestones.half = true;
    }
    else {
        headerText.childNodes[0].textContent = "Hi Hoarder";
        judgeText.textContent = "Are we going to read these books or just let the dust settle?.. 📚🕸️";
    }
}
function animateJudge() {
    judgeText.classList.remove('animate-span');
    void judgeText.offsetWidth; //
    judgeText.classList.add('animate-span');

    
    setTimeout(() => {
        judgeText.classList.remove('animate-span');
    }, 600); 
}


const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);


let confettiPieces = [];

function createConfetti() {
    confettiPieces = [];
    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            size: Math.random() * 6 + 4,
            speed: Math.random() * 6 + 4,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        p.y += p.speed;

        if (p.y > canvas.height) {
            p.y = -10;
        }
    });
}

function startConfetti() {
    createConfetti();
    let duration = 5000;
    let start = Date.now();

    function animate() {
        drawConfetti();
        if (Date.now() - start < duration) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}
displayBook()