const grid = document.querySelector("#grid");
const resizeButton = document.querySelector("#resize");

function createGrid(size) {
  grid.textContent = "";
  const total = size * size;

  for (let i = 0; i < total; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.flexBasis = `${100 / size}%`;

    square.addEventListener("mouseenter", () => {
      square.style.backgroundColor = "black";
    });

    grid.appendChild(square);
  }
}

resizeButton.addEventListener("click", () => {
  const input = prompt("Enter the number of squares per side (1-100):");

  if (input === null) return;

  const size = Number(input);
  if (!Number.isInteger(size) || size < 1 || size > 100) {
    alert("Please enter a whole number from 1 to 100.");
    return;
  }

  createGrid(size);
});

createGrid(16);
