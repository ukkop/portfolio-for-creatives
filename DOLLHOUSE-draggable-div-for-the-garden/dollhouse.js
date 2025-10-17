// furniture

document.addEventListener("DOMContentLoaded", () => {
  const furnitureItems = document.querySelectorAll(".furniture-piece");
  const backgroundContainer = document.querySelector(".background-container");
  const backgroundImage = document.getElementById("background-image");
  let currentItem = null;
  let shiftX, shiftY;

  function getRandomPosition(max, offset) {
    return Math.floor(Math.random() * max) + offset;
  }

  // Position furniture pieces within the background image, crowding from the center
  furnitureItems.forEach((item) => {
    // Get the dimensions of the background image
    const bgRect = backgroundImage.getBoundingClientRect();
    const bgCenterX = bgRect.left + bgRect.width / 2;
    const bgCenterY = bgRect.top + bgRect.height / 2;

    // Randomize position within a radius around the center
    const randomOffsetX = getRandomPosition(
      bgRect.width * 0.4,
      -bgRect.width * 0.2
    );
    const randomOffsetY = getRandomPosition(
      bgRect.height * 0.4,
      -bgRect.height * 0.2
    );

    // Set initial position
    item.style.position = "absolute";
    item.style.left = `${bgCenterX + randomOffsetX - item.offsetWidth / 2}px`;
    item.style.top = `${bgCenterY + randomOffsetY - item.offsetHeight / 2}px`;

    // Double-click to flip
    item.addEventListener("dblclick", function () {
      item.classList.toggle("flipped");
    });

    // Drag functionality
    item.addEventListener("mousedown", dragStart);
    item.addEventListener("touchstart", dragStart);
    item.ondragstart = () => false;
  });

  function dragStart(event) {
    event.preventDefault();
    currentItem = event.target;

    // Bring the dragged item to the front
    currentItem.style.zIndex = 1000;

    const rect = currentItem.getBoundingClientRect();
    const scaleFactor = 0.35; // Match the CSS scale factor

    if (event.type === "mousedown") {
      shiftX = (event.clientX - rect.left) / scaleFactor;
      shiftY = (event.clientY - rect.top) / scaleFactor;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", stopDrag);
    } else if (event.type === "touchstart") {
      const touch = event.touches[0];
      shiftX = (touch.clientX - rect.left) / scaleFactor;
      shiftY = (touch.clientY - rect.top) / scaleFactor;
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", stopDrag);
    }
  }

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  function onTouchMove(event) {
    const touch = event.touches[0];
    moveAt(touch.clientX, touch.clientY);
  }

  function moveAt(clientX, clientY) {
    if (currentItem) {
      const scaleFactor = 0.35; // Match the CSS scale factor
      const newLeft = clientX - shiftX * scaleFactor;
      const newTop = clientY - shiftY * scaleFactor;

      currentItem.style.left = `${newLeft}px`;
      currentItem.style.top = `${newTop}px`;
    }
  }

  function stopDrag() {
    // Reset z-index when dragging stops
    if (currentItem) {
      currentItem.style.zIndex = "auto";
    }

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchend", stopDrag);
    currentItem = null;
  }
});

// explore
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");

  if (navbar) {
    navbar.addEventListener("click", function (event) {
      if (event.target.id === "explore") {
        event.preventDefault();
        console.log("Explore clicked");

        const randomPages = [
          "/abandoned",
          "/cave",
          "/abandoned",
          "/fisherman",
          "/island",
          "/noonbeach",
          "/isle",
          "/uptop",
          "/cave/c2",
          "/cave/d2",
          "/burger/left",
          "/pumba/atelier",
          "/pumba/eyes",
          "/dollmaker",
          "/pumba/stairs",
          "/pumba/costarica",
          "/pumba/drawer",
          "/mill/kitchen",
        ];

        const randomPage =
          randomPages[Math.floor(Math.random() * randomPages.length)];
        window.location.href = randomPage;
      }
    });
  }
});

// versions
document.addEventListener("DOMContentLoaded", () => {
  const backgroundImage = document.getElementById("background-image");

  if (!backgroundImage) {
    console.error("Background image element not found.");
    return;
  }

  const srcMatch = backgroundImage.src.match(
    /\/dollhouse\/([a-zA-Z]+)(\d*)\.png$/
  );
  const baseName = srcMatch ? srcMatch[1] : null;

  if (!baseName) {
    console.error("Base name could not be determined from the image source.");
    return;
  }
  console.log("Base name determined:", baseName);

  fetch("/bg.json")
    .then((response) => response.json())
    .then((data) => {
      const availableVersions = data[baseName];
      if (!availableVersions || availableVersions.length === 0) {
        console.warn(`No available versions found for base name: ${baseName}`);
        return;
      }

      const preloadedImages = availableVersions.map((version) => {
        const img = new Image();
        img.src = `/dollhouse/${baseName}${version}.png`;
        return img;
      });
      console.log("Images preloaded:", preloadedImages);

      const currentVersionMatch = backgroundImage.src.match(/(\d+)\.png$/);
      let currentVersion = currentVersionMatch
        ? parseInt(currentVersionMatch[1], 10)
        : availableVersions[0];
      let currentVersionIndex = availableVersions.indexOf(currentVersion);

      if (currentVersionIndex === -1) currentVersionIndex = 0;

      document.addEventListener("keydown", (event) => {
        if (!availableVersions) return;

        if (event.key === "ArrowLeft") {
          if (currentVersionIndex > 0) {
            currentVersionIndex--;
            updateBackgroundImage();
          }
        } else if (event.key === "ArrowRight") {
          if (currentVersionIndex < availableVersions.length - 1) {
            currentVersionIndex++;
            updateBackgroundImage();
          }
        }
      });

      function updateBackgroundImage() {
        const newVersion = availableVersions[currentVersionIndex];
        backgroundImage.src = `/dollhouse/${baseName}${newVersion}.png`;
        console.log(`Background image updated to: ${backgroundImage.src}`);
      }
    })
    .catch((error) =>
      console.error("Error loading background versions:", error)
    );
});
