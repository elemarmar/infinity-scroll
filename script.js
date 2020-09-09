// DOM ELEMENTS
const elements = {
  imageContainer: document.getElementById('image-container'),
  loader: document.getElementById('loader'),
};

let photosArr = [];
let ready = false; // all pics loaded
let imagesLoaded = 0;
let totalImages = 0;
let isInitialLoad = true;

/*********
 * HELPERS
 */

// Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Update API URL
function updateAPIURLWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}&query=${query}`;
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    // Hide the Loader
    elements.loader.hidden = true;
  }
}

/***************
 * UNSPLASH API
 */

const apiKey = 'VVm7jT9quhW1_3g6v5GXhxzj2IW28dysBnw_Rrh1HXk';
let initialCount = 5;
const query = 'fox';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}&query=${query}`;

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArr = await response.json();
    displayPhotos();
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    console.log(error);
  }
}

function displayPhotos() {
  // Update Total Nº of Images
  totalImages += photosArr.length;
  photosArr.forEach((photo) => {
    // Create <a> that links to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Put <img> inside of <a> and place them inside imageContainer
    item.appendChild(img);
    elements.imageContainer.appendChild(item);

    // Image was loaded
    imageLoaded();
  });
}

/*********
 * EVENT LISTENERS
 */

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready === true
  ) {
    getPhotos();
    ready = false;
  }
});

// On Load
getPhotos();
