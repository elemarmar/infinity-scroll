const elements = {
  imageContainer: document.getElementById('image-container'),
  loader: document.getElementById('loader'),
};

let photosArr = [];

// Helper Function  to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  console.log(photosArr);
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
  });
}

// Unsplash API
const apiKey = 'VVm7jT9quhW1_3g6v5GXhxzj2IW28dysBnw_Rrh1HXk';
const count = 30;
const query = 'fox';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}`;

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArr = await response.json();
    console.log(photosArr);
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('scroll', () => {
  console.log(window.innerHeight);
  console.log(window.scrollY);
  console.log(document.body.offsetHeight);

  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    getPhotos();
    console.log('load more');
  }
});
getPhotos();
