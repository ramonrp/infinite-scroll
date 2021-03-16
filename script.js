//Elements constants
const loader = document.querySelector("#loader");
const imgContainer = document.querySelector("#image-container");

//UnsSplashAPI
const accessKey = "ldHQhyN6gv7OygTa7QzH76fbrHnidhxtkaRBE78kY-M";
const count = 30;
const endpoint = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}&`;

function removeLoader() {
    loader.style.display = "none";
}

//Check if images are loaded
const totalImages = count;
let imgLoaded = 0;
let ready = false;
let firstTimeLoading = true;

function afterLoadImg() {
    imgLoaded++;
    if (imgLoaded == totalImages) {
        ready = true;
        removeLoader();
        console.log(ready);
    }
}

function displayPictures(arrayPhotos) {
    for (let photo of arrayPhotos) {
        const anchor = document.createElement("a");
        anchor.href = photo.links.html;
        anchor.target = "_blank";
        const img = document.createElement("img");
        img.src = photo.urls.regular;
        img.alt = photo.alt_description;
        img.title = photo.alt_description;
        img.addEventListener("load", afterLoadImg)
        anchor.append(img);
        imgContainer.append(anchor);
    }
}


async function getPicturesFromUnsplashAPI() {
    try {
        const resp = await fetch(endpoint);
        const arrayPhotos = await resp.json();
        console.log(arrayPhotos);
        displayPictures(arrayPhotos)
    }
    catch (error) {
        console.log(error);
    }
}

//Check we are near bottom and load more images;
function infiniteScroll(e) {
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    let { clientHeight, scrollTop } = document.documentElement;

    if (window.pageYOffset + document.documentElement.clientWidth >= scrollHeight - 1000 && ready) {
        imgLoaded = 0;
        ready = false
        getPicturesFromUnsplashAPI();
    }
}

window.addEventListener("scroll", infiniteScroll);


//onLoad
getPicturesFromUnsplashAPI();

