let myLibrary = [];

function Book(title, author, year, pages, read, image) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = Boolean(read);
    this.image = image;
    this.addBookToLibrary = function() {
        myLibrary.push(this);
        
        const container = document.getElementById("container");

        const divContainer = document.createElement("div");
        divContainer.style.width = "auto";
        divContainer.style.height = "auto";
        divContainer.style.background = "none";

        const div = document.createElement("div");
        div.style.height = "200px";
        div.style.width = "200px";
        div.style.display = "flex";
        div.style.justifyContent = "center";
        div.style.alignItems = "center";
        div.style.cursor = "pointer";
        div.style.borderRadius = "30px";
        div.style.boxShadow = "black 0px 4px 13px -4px";
        div.className = "book";

        const infoDiv = document.createElement("div");
        infoDiv.className = "book-info";
        infoDiv.style.height = "375px";
        infoDiv.style.width = "335px";
        infoDiv.style.display = "flex";
        infoDiv.style.flexDirection = "column";
        infoDiv.style.alignItems = "flex-start";
        infoDiv.style.justifyContent = "space-between";
        infoDiv.style.padding = "35px 25px";
        infoDiv.style.borderRadius = "30px";
        infoDiv.style.fontSize = "18px";
        infoDiv.style.boxShadow = "black 0px 4px 12px -7px";
        infoDiv.style.position = "relative";

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
        p_Status.style.alignItems = "center";
        p_Status.innerHTML = "Status: ";

        const sliderContainer = document.createElement("div");
        sliderContainer.className = "slider-container";
        sliderContainer.style.marginLeft = "10px";
        sliderContainer.style.borderRadius = "20px";
        sliderContainer.style.padding = "5px";
        sliderContainer.style.position = "relative";
        sliderContainer.style.cursor = "pointer";
        sliderContainer.style.wordSpacing = "0.8rem";
        sliderContainer.style.width = "145px";
        sliderContainer.style.backgroundColor = "rgb(68 175 255)";
        sliderContainer.innerHTML = "<span>Read</span> <span>Unread</span>";

        const slider = document.createElement("div");
        slider.className = "slider"
        slider.style.backgroundColor = "rgb(143 220 255)";
        slider.style.borderRadius = "20px";
        slider.style.width = "50%";
        slider.style.height = "100%";
        slider.style.position = "absolute";
        slider.style.top = "0";
        if (this.read == Boolean(true)) {
            slider.style.right = "0";
        } else {
            slider.style.left = "0";
        }

        for (let i = myLibrary.length - 1; i < myLibrary.length; i++) {
            if (myLibrary[i].image) {
                const img = document.createElement("img");
                img.setAttribute("src", myLibrary[i].image);
                img.style.height = "200px";
                img.style.width = "200px";
                img.style.borderRadius = "20px";
                div.appendChild(img);
            } else {
                const h2 = document.createElement("h2");
                h2.innerHTML = myLibrary[i].title + "";
                div.appendChild(h2);
            }

            divContainer.appendChild(div);
            container.appendChild(divContainer);
        
            const deleteBtn = document.createElement("button");
            deleteBtn.style.border = "1px solid rgb(199 104 92)";
            deleteBtn.style.backgroundColor = "rgb(219, 126, 148)";
            deleteBtn.style.color = "white";
            deleteBtn.style.borderRadius = "20px";
            deleteBtn.style.padding = "7px 10px";
            deleteBtn.style.cursor = "pointer";
            deleteBtn.style.position = "relative";
            deleteBtn.style.top = "5px";
            deleteBtn.style.width = "100%";
            deleteBtn.innerHTML = "Delete Book";
            deleteBtn.addEventListener("click", function() {
                delete myLibrary[i];
                div.remove();
                infoDiv.remove();
                divContainer.remove();
            }, false);

            const closeBtn = document.createElement("button");
            closeBtn.innerHTML = "X";
            closeBtn.style.cursor = "pointer";
            closeBtn.style.backgroundColor = "rgb(105, 191, 255)";
            closeBtn.style.fontSize = "12px";
            closeBtn.style.color = "white";
            closeBtn.style.position = "absolute";
            closeBtn.style.top = "19px";
            closeBtn.style.right = "26px";
            closeBtn.style.border = "none";
            closeBtn.innerHTML = "Close";
            closeBtn.addEventListener("click", function() {
                infoDiv.style.display = "none";
                div.style.display = "flex";
            });


            sliderContainer.appendChild(slider);
            p_Status.appendChild(sliderContainer);

            infoDiv.appendChild(p_Title);
            infoDiv.appendChild(p_Author);
            infoDiv.appendChild(p_Year);
            infoDiv.appendChild(p_Pages);
            infoDiv.appendChild(p_Status);
            infoDiv.appendChild(deleteBtn);
            infoDiv.appendChild(closeBtn);

            sliderContainer.addEventListener('click', function() {
                if (myLibrary[i].read == Boolean(true)) {
                    console.log(myLibrary[i].read);
                    slider.style.right = "";
                    slider.style.left = "0";
                    myLibrary[i].read = Boolean(false);
                    
                } else if (myLibrary[i].read == Boolean(false)) {
                    console.log(myLibrary[i].read);
                    slider.style.left = "";
                    slider.style.right = "0";
                    myLibrary[i].read = Boolean(true);
                }
            });

            div.addEventListener("click", bookInfo, false);

            function bookInfo() {
                div.style.display = "none";
                divContainer.appendChild(infoDiv);
                infoDiv.style.display = "flex";
                
            };

        };

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
    statusLabel.setAttribute("id", "choices");
    statusLabel.innerHTML = "Status: "
    // status1 div
    const status1Div = document.createElement("div");
    status1Div.className = "inactive";
    // status1 div children
    const status1 = document.createElement("input");
    status1.setAttribute("type", "radio");
    status1.setAttribute("name", "status");
    status1.setAttribute("id", "status1");
    status1.setAttribute("required", "");
    status1.style.cursor = "pointer";
    const status1Label = document.createElement("label");
    status1Label.setAttribute("for", "status1");
    status1Label.innerHTML = "Read";
    status1Div.appendChild(status1);
    status1Div.appendChild(status1Label);
    // status2 div 
    const status2Div = document.createElement("div");
    status2Div.className = "inactive";
    // status 2 div children
    const status2 = document.createElement("input");
    status2.setAttribute("type", "radio");
    status2.setAttribute("name", "status");
    status2.setAttribute("id", "status2");
    status2.style.cursor = "pointer";
    const status2Label = document.createElement("label");
    status2Label.setAttribute("for", "status2");
    status2Label.innerHTML = "Not Read Yet";
    status2Div.appendChild(status2);
    status2Div.appendChild(status2Label);
    // upload img 
    const image = document.createElement("input");
    image.setAttribute("type", "file");
    image.setAttribute("name", "file");
    image.setAttribute("id", "myFile");
    let imageSource;
    image.addEventListener('change', (event) => {
        const imageFile = event.target.files[0];

        if (imageFile) {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.addEventListener('load', () => {
                imageSource = reader.result;
            })
        }
    });
    const imageLabel = document.createElement("label");
    imageLabel.setAttribute("for", "myFile");
    imageLabel.innerHTML = "Upload Book Cover: ";
    // submit 
    const submitBook = document.createElement("input");
    submitBook.setAttribute("type", "submit");
    submitBook.className = "submit";
    submitBook.style.cursor = "pointer";
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
    fieldset.appendChild(status1Div);
    fieldset.appendChild(status2Div);
    form.appendChild(fieldset);
    // add img to form
    form.appendChild(imageLabel);
    form.appendChild(image);
    // add submit to form
    form.appendChild(submitBook);
    // css
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.width = "300px";
    form.style.height = "505px";
    form.style.position = "fixed";
    form.style.bottom = "80px";
    form.style.right = "50px";
    form.style.backgroundColor = "#69bfff";
    form.style.padding = "25px";
    form.style.color = "#48D1CC";
    form.style.borderRadius = "20px";
    form.style.overflow = "hidden";
    
    // add form to body
    document.getElementsByTagName("body")[0].appendChild(form);

    // radio btns active state
    status1.addEventListener("click", function() {
        status1Div.classList.remove("inactive");
        status1Div.classList.add("active");
        status2Div.classList.add("inactive");
        status2Div.classList.remove("active");
    });

    status2.addEventListener("click", function() {
        status2Div.classList.remove("inactive");
        status2Div.classList.add("active");
        status1Div.classList.add("inactive");
        status1Div.classList.remove("active");
    });

    // submit EL 
    form.addEventListener("submit", function(e) {
        const titleValue = title.value;
        const authorValue = author.value;
        const yearValue = year.value;
        const pagesValue = pages.value;
        console.log(imageSource);
        let readStatus;
        if (status1.checked) {
           readStatus = true;
        } else {
           readStatus = false;
        }
        const book = new Book(titleValue, authorValue,
            yearValue, pagesValue, readStatus, imageSource);
        book.addBookToLibrary();
        title.value = "";
        author.value = "";
        year.value = "";
        pages.value = "";
        image.value = "";
        form.remove();
        e.preventDefault();
        newBook.addEventListener("click", openForm, false);
     });  
};
