// body
const body = document.querySelector('body');

// container
const containerDiv = document.getElementById("container");

// form container

const formContainer = document.createElement('div');

// form 
const form = document.createElement("form");

// add-first-book div
const fbDiv = document.createElement("div");

// main button class
class Button {
    constructor(id, text, height, width) {
        this.id = id;
        this.text = text;
        this.height = height;
        this.width = width;
    }

    createEle() {
        const btn = document.createElement('button');
        btn.id = this.id;
        if(this.text) {
            btn.textContent = this.text || '';
        }
        btn.style.height = this.height;
        btn.style.width = this.width;
        btn.style.cursor = "pointer";
        return btn;
    }
}

class submit extends Button {
    constructor(id, text, height, width) {
        super(id, text, height, width);
    }

    design() {
        const submitBtn = this.createEle();
        submitBtn.setAttribute('type', 'submit');
        submitBtn.style.margin = "30px auto";
        submitBtn.style.border = "2px solid white";
        submitBtn.style.borderRadius = "20px";
        submitBtn.style.position = "absolute";
        submitBtn.style.left = "50px";
        submitBtn.style.bottom = "0";
        form.appendChild(submitBtn);
    }
}

class addBook extends Button {
    constructor(id, text, height, width) {
        super(id, text, height, width);
    }

    design() {
        const addBtn = this.createEle();
        // using cssText will override styles created in main Button class
        addBtn.style.border = "5px dashed white";
        addBtn.style.borderRadius = "35px";
        addBtn.style.fontSize = "2rem";
        addBtn.style.margin = "auto";
        fbDiv.appendChild(addBtn);
        addBtn.addEventListener("click", function() {
            if(form.id) {
                formContainer.style.display = "flex";
                containerDiv.style.display = "none";
            } else {
                openForm();
            }
        });
    }
}


const newBook = new addBook("addBook", "+", "60px", "60px");

class Book {
    constructor(title, author, year, genre, pages, description, read) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.genre = genre;
        this.pages = pages;
        this.description = description;
        this.read = read;
    }

    createEle() {
        const book = document.createElement("div");
        const content = `
        <h3 style="font-size: 1.5rem;">${this.title}</h3>
        <br>
        <p>Author: ${this.author}</p>
        <p>Year: ${this.year}</p>
        <p>Genre: ${this.genre}</p>
        <p>Pages: ${this.pages}</p>
        <p>Description: ${this.description}</p>
        <p>Read: ${this.read}</p>
        `;
        book.innerHTML = content;
        containerDiv.appendChild(book);
    }


};

function openForm() {
    // submitForm button
    const submitForm = new submit("submitForm", "Submit", "40px", "75px");
    submitForm.design();
    // create form container + h2
    formContainer.style.cssText = "display: flex; flex-direction: column; justify-content: space-evenly; align-items: flex-start; margin: auto; min-height: 600px; width: 600px; padding: 20px 50px 80px 50px; border: 1px solid #373333; border-radius: 20px; position: relative";
    const h2 = document.createElement('h2');
    h2.textContent = "Enter Book Information";
    containerDiv.style.display = "none";
    formContainer.appendChild(h2);

        form.id = "bookForm";
        form.style.cssText = "display: grid; grid-template-columns: 1fr 2fr; grid-gap: 15px; width: 100%";  
        // form-details
        const formFields = [
        {label: 'Title', type: 'text', id: 'title', name: 'title', required: true},
        {label: 'Author', type: 'text', id: 'author', name: 'author', required: true},
        {label: 'Year Published', type: 'number', id: 'year', name: 'year', min: 0, required: true},
        {label: 'Genre', type: 'select', id: 'genre', name: 'genre', options: ['Select Genre', 'Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Romance', 'Horror', 'Other'], required: true},
        {label: 'Number of Pages', type: 'number', id: 'pages', name: 'pages', min: 0, required: true},
        {label: 'Description', type: 'textarea', id:'description', name: 'description', rows: 4},
        {label: 'Read?', type: 'select', id: 'read', name: 'read', options: ['Select Progress', 'Fully Read', 'Partially Read', 'Not Read Yet']}
        ];
    
        // loop through formFields to create elements for bookForm
        formFields.forEach(field => {
            const label = document.createElement("label");
            label.textContent = field.label + ':';
            label.setAttribute = ('for', field.id);
            label.style.marginTop = "15px";
    
            let input;
            if (field.type === 'select') {
                input = document.createElement("select");
                field.options.forEach(option => {
                    const optionElem = document.createElement('option');
                    optionElem.textContent = option;
                    input.appendChild(optionElem);
                });
            } else if (field.type === 'textarea') {
                input = document.createElement('textarea');
                input.rows = field.rows || 4;
            } else {
                input = document.createElement("input");
                if (field.required) {
                    input.setAttribute('required', '');
                }
                if (field.type === 'number') {
                    input.setAttribute('min', field.min || '');
                }
            } input.style.cssText = "margin-top: 5px; border: 1px solid white; padding: 2px; border-radius: 5px";

            input.setAttribute('type', field.type);
            input.setAttribute('id', field.id);
            input.setAttribute('name', field.name);
    
            form.appendChild(label);
            form.appendChild(input);
    
        });

        form.addEventListener("submit", function(event) {
            event.preventDefault(); // prevent default form submission

            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const year = document.getElementById('year').value;
            const genre = document.getElementById('genre').value;
            const pages = document.getElementById('pages').value;
            const description = document.getElementById('description').value;
            const read = document.getElementById('read').value;

            const book = new Book(title, author, year, genre, pages, description, read);
            book.createEle();

            formContainer.style.display = "none";
            containerDiv.style.cssText = "display: flex; gap: 50px; margin: 70px 50px 0px 50px; justify-content: flex-start; flex-direction: row; flex-wrap: wrap; align-items: center; margin-top: 70px; align-content: flex-start";
            fbDiv.style.width = "max-content";
            fbDiv.style.order = "2";
            const eleToRemove = document.querySelector('.add-here');
            if (eleToRemove) {
                eleToRemove.remove();
            }

            form.reset();
        })

        formContainer.appendChild(form);

    body.appendChild(formContainer);
}


function firstBook() {
    const fbText = document.createElement("p");
    fbText.classList.add('add-here');
    containerDiv.appendChild(fbDiv);
    fbDiv.appendChild(fbText);
    containerDiv.style.cssText = "display: flex; justify-content: center; align-items: center";
    fbText.innerHTML = "Add Book Here";
    fbText.style.margin = "auto";
    fbDiv.style.cssText = "padding: 10px; text-align: center; width: 345px; display: flex; justify-content: space-between; font-size: 2rem; align-items: center";
    newBook.design();
}

firstBook();

/* to-do 
- description affecting div width
*/