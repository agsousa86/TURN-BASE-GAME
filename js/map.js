
let map = document.getElementById("mapgen");

function createMap(numberGrids) {
    for (let i = 0; i < numberGrids; i++) {
      let gridDiv = document.createElement("div");
      gridDiv.id = i;
      gridDiv.classList.add("grid");
      map.appendChild(gridDiv)
    }
}
createMap(100);
