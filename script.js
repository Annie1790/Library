const addNewProduct = document.getElementById("addNewProduct");
const addCardNode = document.getElementById("addContainer")
const productImage = document.getElementsByClassName("card-img-top p-2");

class Wine {
    constructor(wineName,winery,vintage,region,country) {
        this.wineName = wineName;
        this.winery = winery;
        this.vintage = vintage;
        this.region = region;
        this.country = country
    }
}

let wineArray = [];
let valueOfFetch;

let showArrayItems = () => {
    if (wineArray.length > 0) {
        wineArray.forEach((item) => {
            createProductCard(item)
        })
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

let fetchGoogleImage = (wineImgSrc, wineName, wineVintage) => {
    fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCk9ieYVeOJzdx06_70PwBZywfOCgKVZ0o&cx=d669cff582af647b3&q=${wineName}%20${wineVintage}&searchType=image`,
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
}


let createProductCard = (wine) => {

    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.style = "width: 16rem;"


    let imgHold = document.createElement("img");
    imgHold.style.objectFit = "cover";
    imgHold.className = "card-img-top p-2";
    fetchGoogleImage(imgHold, wine.wineName, wine.vintage);

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let title = document.createElement("h5");
    title.innerHTML = wine.wineName;
    title.className = "card-title";

    let button = document.createElement("input");
    button.type = "button";
    button.className = "btn btn-primary";
    button.value = "Input";

    addCardNode.appendChild(cardDiv)
    cardDiv.appendChild(imgHold)
    cardDiv.appendChild(cardBody)
    cardBody.appendChild(title)
    cardBody.appendChild(button);
}



//API Key : AIzaSyCk9ieYVeOJzdx06_70PwBZywfOCgKVZ0o
//engine id/cx : d669cff582af647b3

window.addEventListener("load", function() {
    showArrayItems();
})

addNewProduct.addEventListener("submit", function (e) {
    e.preventDefault();
    wineArray.push(getDataFromForm());
    createProductCard(getDataFromForm());
})