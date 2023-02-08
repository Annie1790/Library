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
const deleteAllButton = document.getElementById("deleteButton");

let wineArray = [];
wineArray = JSON.parse(localStorage.getItem('wines')) || [];
//if value is null or undefined, it will use an empty array instead
//puts wineArray values onto local storage
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

let getDataFromForm = () => {
    const wineName = addNewProduct.name.value;
    const winery = addNewProduct.winery.value;
    const vintage = addNewProduct.vintage.value;
    const region = addNewProduct.region.value;
    const country = addNewProduct.country.value;

    return new Wine(wineName, winery, vintage, region, country)
}

deleteAllButton.addEventListener("click", function () {
    window.localStorage.clear();
    window.location.reload();
})

let removeEmptyContainer = () => {
    if (wineArray.length > 0) {
        emptyCard.style.display = "none";
    } else {
        emptyCard.style.display = "flex";
    }
}

let checkVintage = (vintage) => {
    const vintageRegex = /19\d{2}|20[01][0-9]|20[02][0-3]/;
    if (vintageRegex.test(vintage) === true) {
        return vintage;
    } else {
        console.log(vintage);

    }
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

    let button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-primary";
    button.innerHTML = "Details";
    button.setAttribute("data-bs-toggle", 'modal');
    button.setAttribute("data-bs-target", '#exampleModal')

    addCardNode.appendChild(cardDiv);
    cardDiv.appendChild(imgHold);
    cardDiv.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(button);

    button.addEventListener("click", function () {
        createModal(wine);
        getModalFunctions(wine);
    })
}

let createModal = (wine) => {
    let modalWrap = document.createElement("div");
    modalWrap.innerHTML =
        `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <h5>${wine.wineName}</h5>
        <h5>${wine.winery}</h5>
        <h5>${wine.vintage}</h5>
        <h5>${wine.region}</h5> 
        <h5>${wine.country}</h5>
        </div>
        <div class="modal-footer">
          <button type="button" id="deleteWine" class="btn btn-danger">Delete Wine</button>
        </div>
      </div>
    </div>
  </div>`;
    document.body.append(modalWrap);
}

let getModalFunctions = (data) => {
    const deleteWine = document.getElementById("deleteWine");
    deleteThisWineFunc(deleteWine, data)
}

let deleteThisWineFunc = (button, data) => {
    button.addEventListener("click", function () {
        let index = wineArray.indexOf(data);
        if (index > -1) {
            wineArray.splice(index, 1)
        };
        localStorage.setItem('wines', JSON.stringify(wineArray));
        window.location.reload();
    }
    )
}

let saveDataToLocalStorage = (data) => {
    wineArray = JSON.parse(localStorage.getItem('wines'));
    wineArray.push(data);
    localStorage.setItem('wines', JSON.stringify(wineArray));
}

//API Key : AIzaSyCk9ieYVeOJzdx06_70PwBZywfOCgKVZ0o
//engine id/cx : d669cff582af647b3

addNewProduct.addEventListener("submit", function (e) {
    if (!checkVintage(getDataFromForm().vintage)) {
        vintageValidation.classList.add("is-invalid")
        e.preventDefault()
        e.stopPropagation()
    } else {
        vintageValidation.classList.add('is-valid');
        saveDataToLocalStorage(getDataFromForm())
    }
})

window.addEventListener("load", function () {
    removeEmptyContainer();
    wineArray.forEach((item) => {
        createProductCard(item)
    })
})


