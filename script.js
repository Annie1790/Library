const addNewProduct = document.getElementById("addNewProduct");
const addCardNode = document.getElementById("addContainer")
const productImage = document.getElementsByClassName("card-img-top p-2");

let wineArray = [];

let getDataFromForm = () => {
    const wineName = addNewProduct.name.value;
    const winery = addNewProduct.winery.value;
    const vintage = addNewProduct.vintage.value;
    const region = addNewProduct.region.value;
    const country = addNewProduct.country.value;

    return {
        wineName, winery, vintage, region, country
    }
}

let createProductCard = () => {
    getDataFromForm();

    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.style = "width: 16rem;"


    let imgHold = document.createElement("img");
    imgHold.className = "card-img-top p-2";
    //imgSrc missing

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let title = document.createElement("h5");
    title.innerHTML = getDataFromForm().wineName;
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

let fetchGoogleImage = () => {
    fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCk9ieYVeOJzdx06_70PwBZywfOCgKVZ0o&cx=d669cff582af647b3&q=szepsyhttps://www.googleapis.com/customsearch/v1?key=AIzaSyCk9ieYVeOJzdx06_70PwBZywfOCgKVZ0o&cx=d669cff582af647b3&q=${getDataFromForm().wineName}&searchType=image`,
        {
            mode: "cors",
            headers: {
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json()
        .then((value) => console.log(value)))
}

let getImgSrc = () => {

}

//API Key : AIzaSyCk9ieYVeOJzdx06_70PwBZywfOCgKVZ0o
//engine id/cx : d669cff582af647b3


addNewProduct.addEventListener("submit", function (e) {
    wineArray.push(getDataFromForm())
    e.preventDefault();
    createProductCard();
})