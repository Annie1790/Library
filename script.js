const wineName = document.getElementById("name");
const winery = document.getElementById("winery");
const vintage = document.getElementById("vintage");
const region = document.getElementById("region");
const country = document.getElementById("country");
const addNew = document.getElementById("addNew");

let myLibrary = [];

class Library {
    constructor() {
        this.name = wineName;
        this.winery = winery;
        this.vintage = vintage;
        this.region = region;
        this.country = country;
    }

    get userInput() {
        //get inputbox.value
    }
}

function test(form) {
    let inputValue = form.name.value;
    console.log(`${inputValue} received`)
}
