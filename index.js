let myLibrary = [];

function Book(title, author, year, pages, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = Boolean(read);
    this.addBookToLibrary = function() {
        myLibrary.push(this);
        
        const libraryContainer = document.getElementById("library-container");
        libraryContainer.style.display = "flex";
        libraryContainer.style.gap = "20px";

        const div = document.createElement("div");
        div.style.height = "200px";
        div.style.width = "200px";
        div.style.border = "1px solid black";
        div.style.display = "flex";
        div.style.justifyContent = "center";
        div.style.alignItems = "center";
        div.style.cursor = "pointer";

        for (let i = myLibrary.length - 1; i < myLibrary.length; i++) {
            const h2 = document.createElement("h2");
            h2.innerHTML = myLibrary[i].title + "";
            div.appendChild(h2);
            libraryContainer.appendChild(div);

            const infoDiv = document.createElement("div");
            infoDiv.style.height = "300px";
            infoDiv.style.width = "300px";
            infoDiv.style.border = "1px solid black";
            const p_Title = document.createElement("p");
            p_Title.innerHTML = "Title: " + this.title + "";
            const p_Author = document.createElement("p");
            p_Author.innerHTML = "Author: " + this.author + "";
            const p_Year = document.createElement("p");
            p_Year.innerHTML = "Year: " + this.year + "";
            const p_Pages = document.createElement("p");
            p_Pages.innerHTML = "Total Pages: " + this.pages + "";
            const p_Status = document.createElement("p");
            p_Status.style.display = "flex";
            p_Status.innerHTML = "Status: <div id='slider-container'><div id='slider'></div><span id='option1'>Read</span><span id='option2'>Unread</span></div>"
        
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Delete Book";
            deleteBtn.addEventListener("click", function() {
                delete myLibrary[i];
                div.remove();
                infoDiv.remove();
            }, false);

            infoDiv.appendChild(p_Title);
            infoDiv.appendChild(p_Author);
            infoDiv.appendChild(p_Year);
            infoDiv.appendChild(p_Pages);
            infoDiv.appendChild(p_Status);
            infoDiv.appendChild(deleteBtn);

            div.addEventListener("click", bookInfo, false);
        
            function bookInfo() {
                div.style.display = "none";
                libraryContainer.appendChild(infoDiv);
                const sliderContainer = document.querySelector("#slider-container");
                const slider = document.querySelector("#slider");   
                sliderContainer.addEventListener("click", function() {
                   
                    if (myLibrary[i].read == Boolean(true)) {
                        slider.style.left = "0";
                        slider.style.right = "";
                        myLibrary[i].read = Boolean(false);
                        
                    } else if (myLibrary[i].read == Boolean(false)) {
                        slider.style.left = "";
                        slider.style.right = "0";
                        myLibrary[i].read = Boolean(true);
                    }
                });
                
                if (myLibrary[i].read == Boolean(true)) {
                    slider.style.right = "0";
                } else {
                    slider.style.left = "0";
                }
                
            }
        }
    }
};




const newBook = document.getElementById("new-book");
newBook.addEventListener("click", openForm, false);

function openForm() {
    newBook.removeEventListener("click", openForm, false);
    // form 
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    // title
    const titleLabel = document.createElement("label");
    titleLabel.innerHTML = "Title: ";
    titleLabel.setAttribute("for", "title");
    const title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("name", "title");
    title.setAttribute("id", "title");
    title.setAttribute("required", "");
    // author
    const authorLabel = document.createElement("label");
    authorLabel.setAttribute("for", "author");
    authorLabel.innerHTML= "Author: ";
    const author = document.createElement("input");
    author.setAttribute("type", "text");
    author.setAttribute("name", "author");
    author.setAttribute("id", "author");
    author.setAttribute("required", "");
    // year 
    const yearLabel = document.createElement("label");
    yearLabel.setAttribute("for", "year");
    yearLabel.innerHTML = "Year Published: ";
    const year = document.createElement("input");
    year.setAttribute("type", "number");
    year.setAttribute("name", "year");
    year.setAttribute("id", "year");
    year.setAttribute("min", "1800");
    year.setAttribute("max", "2100");
    year.setAttribute("step", "1");
    year.setAttribute("required", "");
    // pages
    const pagesLabel = document.createElement("label");
    pagesLabel.setAttribute("for", "pages");
    pagesLabel.innerHTML = "Number of Pages: "
    const pages = document.createElement("input");
    pages.setAttribute("type", "number");
    pages.setAttribute("name", "pages");
    pages.setAttribute("id", "pages");
    pages.setAttribute("min", "1");
    pages.setAttribute("step", "1");
    pages.setAttribute("required", "");
    // status
    const fieldset = document.createElement("fieldset");
    const statusLabel = document.createElement("label");
    statusLabel.setAttribute("for", "status");
    statusLabel.innerHTML = "Status: "
    const status1 = document.createElement("input");
    status1.setAttribute("type", "radio");
    status1.setAttribute("name", "status");
    status1.setAttribute("id", "status1");
    const status1Label = document.createElement("label");
    status1Label.setAttribute("for", "status1");
    status1Label.innerHTML = "Read";
    const status2 = document.createElement("input");
    status2.setAttribute("type", "radio");
    status2.setAttribute("name", "status");
    status2.setAttribute("id", "status2");
    const status2Label = document.createElement("label");
    status2Label.setAttribute("for", "status2");
    status2Label.innerHTML = "Not Read Yet";
    // submit 
    const submitBook = document.createElement("input");
    submitBook.setAttribute("type", "submit");
    // add title to form
    form.appendChild(titleLabel);
    form.appendChild(title);
    // add author to form
    form.appendChild(authorLabel);
    form.appendChild(author);
    // add year to form
    form.appendChild(yearLabel);
    form.appendChild(year);
    // add pages to form
    form.appendChild(pagesLabel);
    form.appendChild(pages);
    // add status to form + fieldset
    fieldset.appendChild(statusLabel);
    fieldset.appendChild(status1);
    fieldset.appendChild(status1Label);
    fieldset.appendChild(status2);
    fieldset.appendChild(status2Label);
    form.appendChild(fieldset);
    // add submit to form
    form.appendChild(submitBook);
    // add form to body
    document.getElementsByTagName("body")[0].appendChild(form);
    // submit EL 
    form.addEventListener("submit", function(e) {
        const titleValue = title.value;
        const authorValue = author.value;
        const yearValue = year.value;
        const pagesValue = pages.value;
        let readStatus;
        if (status1.checked) {
           readStatus = true;
        } else {
           readStatus = false;
        }
        const book = new Book(titleValue, authorValue,
            yearValue, pagesValue, readStatus);
        book.addBookToLibrary();
        title.value = "";
        author.value = "";
        year.value = "";
        pages.value = "";
        form.remove();
        e.preventDefault();
        newBook.addEventListener("click", openForm, false);
     });  
};

// create a slider btn that can easily change from
// read to not read instead of using EL 