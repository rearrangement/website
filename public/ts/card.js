// Animation from https://www.youtube.com/watch?v=Z-3tPXf9a7M by Kevin Powell

const card = document.querySelector(".card");

document.addEventListener("mousemove", (event) => {
  rotateElement(event, card);
});

function rotateElement(event, element) {
  // Get mouse position
  const x = event.clientX;
  const y = event.clientY;
  
  // Find the center of the page
  const middleX = window.innerWidth / 2;
  const middleY = window.innerHeight / 2;

  // Get mouse offset from center
  const offsetX = ((x - middleX) / middleX) * 35;
  const offsetY = ((y - middleY) / middleY) * 35;

  element.style.setProperty("--rotateX", -1 * offsetY + "deg");
  element.style.setProperty("--rotateY", offsetX + "deg");
}