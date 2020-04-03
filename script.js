let myLibrary = [];


// Book class: Represents a Book

class Book {
    constructor (title, author, isRead){
    this.title = title;
    this.author = author;
    this.isRead = isRead;
    }
}

function addBookToLibrary(title, author, isRead) {
    myLibrary.push(new Book(title, author, isRead))
  }


// UI class: Handles UI Tasks

class UI {
    static displayBooks(){
        const storedBooks = [
            {
                title: 'Six Easy Pieces',
                author: 'Richard Feynman',
                isRead: 'No'
            },
            {
                title: 'Let My People Go Surfing',
                author: 'Yvon Chouinard',
                isRead: 'Yes'
            }
        ];

        const books = storedBooks
        books.forEach((book) => UI.addBookToList(book))

    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isRead}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;



        list.appendChild(row);
    }

    static deleteBook(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form)
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 4000)
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isRead').checked = false;
    }
}


// Event : Display Books

document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add a Book

document.querySelector('#book-form').addEventListener('submit', (e) => {

    //Prevent actual submit 

    e.preventDefault();

    // Get form values

    if (document.querySelector('#isRead').checked){
        document.querySelector('#isRead').value = 'Yes'
    } else {
        document.querySelector('#isRead').value = 'No'
    };

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isRead = document.querySelector('#isRead').value;

  
    
    
    // Validate

    if(title === '' || author === ''){
        UI.showAlert('Please fill in all fields', 'danger')
    } else {

    // Instatiate a book

    const book = new Book(title, author, isRead);

    // Add book to list

    UI.addBookToList(book);

    // Show success message

    UI.showAlert('Book Added', 'success')
    
    // Clear Fields

    UI.clearFields();
    }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {

    // Remove Book from UI 
    UI.deleteBook(e.target);

    // Show Successful delete message
    
    if (e.target.classList.contains('btn')){
        UI.showAlert('Book Removed', 'info')
    };
    

});