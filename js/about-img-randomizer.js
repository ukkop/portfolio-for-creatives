function randomImage(element) {
  const el = element.children[0];
  // 	Array of Image classes
  const imageClasses = [
    [
      "img-version-1",
      "img-version-2",
      "img-version-3",
      "img-version-4",
      "img-version-5",
    ],
  ];

  // 	getting an array of images for each letter based on the id of the anchor element clicked
  let randomImageClasses;
  const elementID = element.getAttribute("id");
  if (elementID === "img-1") {
    randomImageClasses = imageClasses[0];
  } else {
    randomImageClasses = imageClasses[1];
  }
  // 	get the number of images
  const numberOfImages = randomImageClasses.length;
  // 	choose a random image that is not bigger than the number of images
  const randomImage = Math.floor(Math.random() * numberOfImages);
  // choose another image in case the random image is the current
  const anotherImage =
    numberOfImages == randomImage + 1 ? randomImage - 1 : randomImage + 1;
  // if the random image is the current image then choose another, else choose the random image
  const chosenImage =
    el.className === randomImageClasses[randomImage]
      ? randomImageClasses[anotherImage]
      : randomImageClasses[randomImage];
  el.className = chosenImage;
}
