// Book Class : Represents a book

class Book {
    constructor(title,author,pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
}
// UI Class : Handle UI tasks

class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>Read<span> </span><input type="checkbox" class="read"></input></td>
        <td>${book.pages}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
            UI.showAlert('Book Removed', 'success')
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className =  `alert alert-${className}`
        div.appendChild(document.createTextNode(message))

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        //Vanish in 3 seconds

        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 2000);


    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
    }
}
// Store Class : Handles storage
class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(pages) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.pages === pages) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
// Event : Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event : Add a book

document.querySelector('#book-form').addEventListener('submit', (evt) => {


    // Prevent Default Submit

    evt.preventDefault();

    // Get form values;

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;

    //Validation
    if(title === '' || author === '' || pages === '') {
        UI.showAlert('Please fill in all fields', 'danger')
    }

    else {
        const book = new Book(title, author,pages);

        // Add Book to List

        UI.addBookToList(book);

        //Add Book to store
        Store.addBook(book);

        //show success message
        UI.showAlert('Book Added', 'success')
        UI.clearFields();
    }
    
    //Instantiate book


})
// Event : Remove a book

document.querySelector('#book-list').addEventListener('click', (evt) => {
    
    UI.deleteBook(evt.target);

    Store.removeBook(evt.target.parentElement.previousElementSibling.textContent)
})



