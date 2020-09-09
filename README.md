# Infinity Scroll

%PIC%



This app displays pictures from unsplash. It implements infinite scroll, which loads more pictures as the user scrolls down. The pictures are fetched from the [Unsplash API](https://unsplash.com/documentation).

It's also mobile responsive.



## Progress

The HTML will have three parts:

1. title

2. The loader that will have a hidden attribute by default

   ```html
   <div class="loader" id="loader" hidden>
     <img src="loader.svg" alt="loader" />
   </div>
   ```

3. The pictures

   ```html
   <div class="image-container" id="image-container">
     <img src="sourceUrl" alt="description">
   </div>
   ```

   



## Building a responsive Layout

A container for the image.

```css
.image-container {
  margin: 10px 30%;
}

.image-container img {
	margin-top: 5px;
  width: 100%;
}
```

- Using media queries to make it look good on mobile

- Adjust the title
- Adjust the image-container

Later: grid (many)





## Fetching data

Using Unsplash API 



Location `https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY` we need API KEY that we pass as a query when requesting.

Random photos related with foxes and count of 30 which is the max, instead of getting only one pic.

```js
// Unsplash API
const count = 30;
const apiKey= '';
const query = 'fox';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}`;
```



Async function to get fotos

```js
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await reponse.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
```



- Main color!
- urls.regular for image

Photo.alt_description

## Displaying the photos

WE save the information into a global array, then forEach we create the html elements for each element. 

Because we are setting many attributes, we create a helper function 

```js
// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}
```

Attributes is an object



```js
const elements = {
  imageContainer: document.getElementById('image-container'),
	loader: document.getElementById('loader'),
}

let photosArr = [];

function displayPhotos() {
  photosArr.forEach(photo => {
    
    // Create <a> that links to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    })
    
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    })
    
    // Put <img> inside <a> and place them inside imageContainer Element
    item.appendChild(img);
    elements.imageContainer.appendChild(item);
  })
}
```



----

Logo created with https://loading.io/

