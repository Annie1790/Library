const addNewProduct = document.getElementById("addNewProduct");
const addCardNode = document.getElementById("addContainer")
const productImage = document.getElementsByClassName("card-img-top p-2");

let wineArray = [];

/*class Wine {
    constructor() {
        this.wineName = addNewProduct.name.value;
        this.winery = addNewProduct.winery.value;
        this.vintage = addNewProduct.vintage.value;
        this.region = addNewProduct.region.value;
        this.country = addNewProduct.country.value;
        this.picture = 
    }

    get data() {
        return {
            wineName, winery, vintage, region, country
        }
    }
}
*/

let getData = () => {
    const wineName = addNewProduct.name.value;
    const winery = addNewProduct.winery.value;
    const vintage = addNewProduct.vintage.value;
    const region = addNewProduct.region.value;
    const country = addNewProduct.country.value;

    return {
        wineName, winery, vintage, region, country
    }
}

let test = () => {
    this.data();
    console.log(this.data())
}

let createProductCard = () => {
    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.style = "width: 16rem;"


    let imgHold = document.createElement("img");
    imgHold.className = "card-img-top p-2";
    //imgSrc missing

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let title = document.createElement("h5");
    title.innerHTML = "hello";
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


addNewProduct.addEventListener("submit", function (e) {
    wineArray.push(getData())
    e.preventDefault();
    createProductCard();
})