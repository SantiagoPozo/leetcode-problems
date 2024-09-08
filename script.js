// Function to fetch JSON data and initialize the rendering process
async function fetchAndRenderProblems() {
  const response = await fetch("leetcode-problems.json");
  const problems = await response.json();
  renderProblems(problems);

  // Attach the search event listener
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    if (query.length >= 3) {
      const filteredProblems = problems.filter(
        (problem) =>
          problem.title.toLowerCase().includes(query) ||
          problem.description.toLowerCase().includes(query) ||
          problem.topics.some((topic) => topic.toLowerCase().includes(query)) ||
          problem.difficulty.toLowerCase().includes(query)
      );
      renderProblems(filteredProblems);
    } else {
      renderProblems(problems);
    }
  });
}

// Function to clear the aside content
const aside = document.querySelector("aside");
function clearAside() {
  aside.classList.remove("active");
  aside.innerHTML = ""; // Vaciar el contenido de aside
}

// Function to render problems into the HTML
function renderProblems(problems) {
  const container = document.getElementById("problems-container");
  container.innerHTML = ""; // Clear existing content

  if (problems.length === 0) {
    container.innerHTML =
      "<p>No problems found. (Ironically, this is a problem).</p>";
    return;
  }

  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Title</th>
        <th><img src="https://leetcode.com/favicon-16x16.png" alt="Leetcode Icon" /></th>
        <th>⌂</th>
        <th>👁</th>
        <th>Difficulty</th>
        <th>Runtime</th>
        <th>Memory</th>
        <th>Solved</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  container.appendChild(table);

  const tbody = table.querySelector("tbody");
  problems.forEach((problem, index) => {
    const row = document.createElement("tr");
    const difficultyClass = getDifficultyClass(problem.difficulty);
    const memoryPercentage = problem.memory.beats;
    const runtimePercentage = problem.runtime.beats;
    const rpr = Math.round(runtimePercentage, 0); // runtime percentage rounded
    const mpr = Math.round(memoryPercentage, 0); // memory percentage rounded

    row.innerHTML = `
      <td>${problem.title}
      </td><td>
      <a href="${problem.leetcode_url}" target="_blank">↑</a>
      </td><td>
      <a href="${problem.here_url}" target="_blank">→
      </td>
      <td class="toggle-cell closed"></td>
      <td><button class="difficulty-button ${difficultyClass}">${
      problem.difficulty
    }</button></td>
<td class="${getClassForPercentage(runtimePercentage)}">
  ${runtimePercentage < 10 ? "\u2003" + rpr : rpr}%
  <span class="tooltiptext">
    Percentage: ${runtimePercentage}% <br /> 
    Time: ${problem.runtime.time}ms <br /> 
    Complexity: ${problem.runtime.complexity}
  </span>
</td>

<td class="${getClassForPercentage(memoryPercentage)}">
  ${memoryPercentage < 10 ? "\u2003" + mpr : mpr}%
  <span class="tooltiptext">
    Space: ${problem.memory.space}MB <br />
    Complexity: ${problem.memory.complexity}<br />
    Percentage: ${memoryPercentage}%
  </span>
</td>


    <td class="date">${problem.solved}</td>    
    `;
    tbody.appendChild(row);
  });

  // Función para limpiar el campo de búsqueda
  function clearSearch() {
    const searchInput = document.getElementById("search");
    searchInput.value = ""; // Limpiar el contenido del campo de búsqueda

    // Crear un evento de entrada para activar el filtrado de problemas sin texto
    const inputEvent = new Event("input", {
      bubbles: true,
      cancelable: true,
    });

    // Disparar el evento de entrada para actualizar los resultados
    searchInput.dispatchEvent(inputEvent);
  }

  // Añadir event listener al botón de limpiar búsqueda
  document
    .getElementById("clear-search")
    .addEventListener("click", clearSearch);

  // Añadir event listener a cada botón de dificultad
  // Añadir event listener a cada botón de dificultad
  const difficultyButtons = document.querySelectorAll(".difficulty-button");

  difficultyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const searchInput = document.getElementById("search");
      const difficultyText = button.textContent.trim(); // Obtener el texto del botón y quitar espacios en blanco

      // Verificar si la dificultad ya está en el campo de búsqueda
      if (searchInput.value.includes(difficultyText)) {
        // Eliminar la dificultad del campo de búsqueda
        searchInput.value = searchInput.value
          .split(" ")
          .filter((word) => word !== difficultyText)
          .join(" ");

        // Disparar el evento de entrada si el contenido tiene más de 3 caracteres

        const inputEvent = new Event("input", {
          bubbles: true,
          cancelable: true,
        });
        searchInput.dispatchEvent(inputEvent);
      } else {
        // Añadir la dificultad al final del campo de búsqueda
        if (searchInput.value.length > 0) {
          searchInput.value += " "; // Añadir un espacio antes de la nueva palabra
        }
        searchInput.value += difficultyText; // Añadir la dificultad

        // Disparar el evento de entrada
        const inputEvent = new Event("input", {
          bubbles: true,
          cancelable: true,
        });
        searchInput.dispatchEvent(inputEvent);
      }
    });
  });

  // Añadir event listeners a las celdas con la clase 'toggle-cell'
  const toggleCells = document.querySelectorAll(".toggle-cell");

  toggleCells.forEach((cell, index) => {
    cell.addEventListener("click", function () {
      if (cell.classList.contains("closed")) {
        // Restablecer todas las celdas a 'closed'
        toggleCells.forEach((otherCell) => {
          otherCell.classList.remove("opened");
          otherCell.classList.add("closed");
        });
        cell.classList.remove("closed");
        cell.classList.add("opened");
        aside.classList.add("active");

        // Rellenar el aside con el título, descripción y código
        aside.innerHTML = `
          <div>
          <h3>${problems[index].title}</h3>
          <button id="close">×</button>
          </div>
          <code><pre id="code-container" class="language-javascript">${problems[index].code}</pre></code>
          <div id="description-container">${problems[index].description}</div>
        `;

        // Resaltar el código usando Prism.js
        const codeContainer = document.getElementById("code-container");
        Prism.highlightElement(codeContainer);

        // Añadir event listener al botón de cerrar
        document.getElementById("close").addEventListener("click", () => {
          clearAside();
          closeCell();
        });
      } else {
        // Cerrar la celda activa
        aside.classList.remove("active");
        cell.classList.remove("opened");
        cell.classList.add("closed");
        clearAside(); // Vaciar el aside
      }
    });
  });
}

function closeCell() {
  const toggleCells = document.querySelectorAll(".toggle-cell");
  toggleCells.forEach((cell, index) => {
    cell.classList.remove("opened");
    cell.classList.add("closed");
  });
}

// Function to get the class based on the percentage
function getClassForPercentage(percentage) {
  const shitLimit = 20; // Ejemplo de valor
  const limit = 50; // Ejemplo de valor
  const priceLimit = 80; // Ejemplo de valor

  let classes = "tooltip"; // Clase base

  if (percentage >= priceLimit) {
    classes += " green price";
  } else if (percentage > limit) {
    classes += " green";
  } else if (percentage <= shitLimit) {
    classes += " shit";
  }
  return classes.trim();
}

// Function to get the difficulty class based on the difficulty level
function getDifficultyClass(difficulty) {
  if (difficulty === "hard") {
    return "red";
  } else if (difficulty === "easy") {
    return "green";
  } else {
    return "yellow";
  }
}

// Initialize the process when the DOM is ready
document.addEventListener("DOMContentLoaded", fetchAndRenderProblems);
