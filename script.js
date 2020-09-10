// DOM ELEMENTS
const elements = {
  imageContainer: document.getElementById('image-container'),
  loader: document.getElementById('loader'),
  queryInput: document.getElementById('query'),
};

let photosArr = [];
let ready = false; // all pics loaded
let imagesLoaded = 0;
let totalImages = 0;
// In phone first load is 5 pics, otherwise 15
const initialCount = window.innerWidth > 500 ? 15 : 5;
const regularCount = 30;
let isFirstLoad = true;

/*********
 * HELPERS
 */

// Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    isFirstLoad = false;
    ready = true;

    // Hide the Loader
    elements.loader.hidden = true;
  }
}

/***************
 * UNSPLASH API
 */

const apiKey = 'VVm7jT9quhW1_3g6v5GXhxzj2IW28dysBnw_Rrh1HXk';

async function getPhotos(query = 'nature') {
  let count;

  if (isFirstLoad) {
    count = initialCount;
  } else {
    count = regularCount;
  }

  const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}`;

  try {
    const response = await fetch(apiUrl);
    photosArr = await response.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

function displayPhotos() {
  // Reset number of images loaded
  imagesLoaded = 0;
  // Update Total Nº of Images
  totalImages = photosArr.length;
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
      alt: photo.alt_description || 'unknown',
      title: photo.alt_description || 'unknown',
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

elements.queryInput.addEventListener('keypress', (ev) => {
  if (ev.keyCode === 13) {
    elements.loader.hidden = false;
    query = elements.queryInput.value;
    totalImages = 0;
    elements.imageContainer.innerHTML = '';
    getPhotos(query);
  }
});

// On Load
getPhotos();
