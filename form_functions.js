/*let fetchGoogleImage = (wineImgSrc, wineName, winery, wineVintage) => {
    fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCk9ieYVeOJzdx06_70PwBZywfOCgKVZ0o&cx=d669cff582af647b3&q=${wineName}%20${winery}%20${wineVintage}&searchType=image`,
        {
            mode: "cors",
            headers: {
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json()
            .then((value) => {
                wineImgSrc.src = value.items[0].link;
            }))
}*/

const addNewProduct = document.getElementById("addNewProduct");
const addCardNode = document.getElementById("addContainer")
const productImage = document.getElementsByClassName("card-img-top p-2");
const emptyCard = document.getElementById("emptyCard");
const vintageValidation = document.getElementById("vintage");

let wineArray = [];
wineArray = JSON.parse(localStorage.getItem('wines')) || []; 
//null or undefined, akkor a jobboldali erteket fogja hasznalni, "default value"
//belerakja amit betoltott a wine arraybe
localStorage.setItem('wines', JSON.stringify(wineArray));

class Wine {
    constructor(wineName, winery, vintage, region, country) {
        this.wineName = wineName;
        this.winery = winery;
        this.vintage = vintage;
        this.region = region;
        this.country = country
    }
}

//sessionStorage => maintains while the browser is open
//localStorage => maintains continues to store data 

let removeEmptyContainer = () => {
    if (wineArray.length > 0) {
        emptyCard.style.display = "none";
    } else {
        emptyCard.style.display = "flex";
    }
}

let checkRegex = (vintage) => {
    const vintageRegex = /19\d{2}|20[01][0-9]|20[02][0-3]/;
    if (vintageRegex.test(vintage) === true) {
        console.log("Valid");
        return vintage;
    } else {
        console.log(vintage)
        console.log("Invalid");

    }
}

let getDataFromForm = () => {
    const wineName = addNewProduct.name.value;
    const winery = addNewProduct.winery.value;
    const vintage = addNewProduct.vintage.value;
    const region = addNewProduct.region.value;
    const country = addNewProduct.country.value;

    return new Wine(wineName, winery, vintage, region, country)
}

let fetchImage = async (wineImgSrc, wineName, winery, wineVintage) => {
    try {
        const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCk9ieYVeOJzdx06_70PwBZywfOCgKVZ0o&cx=d669cff582af647b3&q=${wineName}%20${winery}%20${wineVintage}&searchType=image`,
            {
                mode: "cors",
                headers: {
                    'Accept': 'application/json'
                }
            })
        if (response.ok) {
            const jsonData = await response.json();
            console.log(jsonData)
            if (jsonData) {
                wineImgSrc.src = jsonData.items[0].link
            }
        }
    }
    catch (error) {
        console.error(error)
    }
}

let createProductCard = (wine) => {

    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.style = "width: 16rem;"


    let imgHold = document.createElement("img");
    imgHold.style.objectFit = "cover";
    imgHold.className = "card-img-top p-2";
    imgHold.style.width = "256px";
    imgHold.style.height = "256px"
    fetchImage(imgHold, wine.wineName, wine.winery, wine.vintage);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let title = document.createElement("h5");
    title.innerHTML = wine.wineName;
    title.className = "card-title";

    let button = document.createElement("input");
    button.type = "button";
    button.className = "btn btn-primary";
    button.value = "Details";

    addCardNode.appendChild(cardDiv);
    cardDiv.appendChild(imgHold);
    cardDiv.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(button);
}

let createModal = () => {
    //will create modal for each card
}

let saveDataToLocalStorage = (data) => {
    wineArray = JSON.parse(localStorage.getItem('wines'));
    wineArray.push(data);
    alert(wineArray);
    localStorage.setItem('wines', JSON.stringify(wineArray));
}

//API Key : AIzaSyCk9ieYVeOJzdx06_70PwBZywfOCgKVZ0o
//engine id/cx : d669cff582af647b3

addNewProduct.addEventListener("submit", function (e) {
    if (!checkRegex(getDataFromForm().vintage)) {
        vintageValidation.classList.add("is-invalid")
        e.preventDefault()
        e.stopPropagation()
    } else {
        vintageValidation.classList.add('is-valid');
        saveDataToLocalStorage(getDataFromForm())
    }
})
console.log(wineArray)

window.addEventListener("load", function() {
    removeEmptyContainer();
    wineArray.forEach((item) => {
        createProductCard(item)
    })
})


