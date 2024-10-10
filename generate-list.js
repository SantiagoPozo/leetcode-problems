// corona
const crown = `
<svg width="100" height="60" xmlns="http://www.w3.org/2000/svg">
<polygon
points="10,50 90,50 80,30 70,50 60,20 50,50 40,20 30,50 20,30"
fill="gold"
stroke="gold"
stroke-width="2"
/>
<rect
x="10"
y="50"
width="80"
height="40"
fill="gold"
stroke="gold"
stroke-width="2"
/>
</svg>`;

// Función para obtener la clase basada en el porcentaje
function getClassForPercentage(percentage) {
  if (percentage >= 80) return "green price";
  if (percentage >= 50) return "green";
  if (percentage <= 20) return "shit";
  return "";
}

// Función para obtener la clase de dificultad
function getDifficultyClass(difficulty) {
  switch (difficulty) {
    case "hard":
      return "red";
    case "easy":
      return "green";
    default:
      return "yellow";
  }
}

// Función para crear un botón con contenido y clases específicas
function createButton(content, classes = []) {
  const button = document.createElement("button");
  button.textContent = content.charAt(0).toUpperCase() + content.slice(1);
  button.classList.add(...classes);

  button.addEventListener("click", () => {
    const searchInput = document.getElementById("search");
    const currentValue = searchInput.value.toLowerCase();
    const buttonValue = content.toLowerCase();

    const formattedButtonValue = buttonValue.includes(" ")
      ? `"${buttonValue}"`
      : buttonValue;

    searchInput.value = currentValue.includes(formattedButtonValue)
      ? currentValue.replace(new RegExp(`${formattedButtonValue}`), "").trim()
      : `${currentValue} ${formattedButtonValue}`.trim();

    searchInput.dispatchEvent(
      new Event("input", { bubbles: true, cancelable: true })
    );
  });

  return button;
}

// Función para crear el encabezado del artículo
function createProblemHeader(problem) {
  const header = document.createElement("header");
  header.innerHTML = `
    <h3>${problem.title}</h3>
    <a href="${problem.leetcode_url}">
      <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" width="16" height="16" alt="LeetCode Icon" />
    </a>`;
  return header;
}

// Función para crear la cabecera con dificultad y temas
function createProblemCabecera(problem) {
  const difAndTopcis = document.createElement("div");
  difAndTopcis.className = "difficulty-and-topics";

  difAndTopcis.appendChild(
    createButton(problem.difficulty, [
      "difficulty",
      getDifficultyClass(problem.difficulty),
    ])
  );

  problem.topics.forEach((topic) => {
    difAndTopcis.appendChild(createButton(topic, ["topic"]));
  });

  return difAndTopcis;
}

// Función para crear un intento
function createSection(attempt, problems, problemIndex, attemptIndex) {
  const attemptArticle = document.createElement("article");
  attemptArticle.className = "attempt";

  const runtimeClass = getClassForPercentage(attempt.runtime.beats);
  const memoryClass = getClassForPercentage(attempt.memory.beats);

  attemptArticle.innerHTML = `
    <div class="aux">
      <div class="date">${attempt.date}</div>
      <div class="monkey"></div>
    </div>
    <div class="card runtime">
      <h4>Runtime</h4> 
      <div class="result">
        ${attempt.runtime.time}<span class="mini">ms</span>
        <span class="mini">Beats:</span>
        <span class="${runtimeClass}"> ${attempt.runtime.beats}%</span>
      </div>
      <div class="complexity">
        <code>${attempt.runtime.complexity}</code>
      </div>
    </div>
    <div class="card memory">
      <h4>Memory</h4>
      <div class="result">
        ${attempt.memory.space}<span class="mini">MB</span>
        <span class="mini">Beats: </span>
        <span class="${memoryClass}">${attempt.memory.beats}%</span>
      </div>
      <div class="complexity">
        <code> ${attempt.memory.complexity}</code>
      </div>
    </div>
  `;

  const deactivateAnyOtherAttempt = (attempt) => {
    otherActiveAttempts = document.querySelectorAll(".attempt.active");
    otherActiveAttempts.forEach((activeAttempt) => {
      if (activeAttempt !== attemptArticle) {
        activeAttempt.classList.remove("active");
        const bigBox = activeAttempt.nextElementSibling;
        bigBox.classList.remove("active");
        bigBox.innerHTML = "";
      }
    });
  };

  attemptArticle.querySelector(".monkey").addEventListener("click", (e) => {
    const attemptArticle = e.target.parentElement.parentElement;
    const bigBox = attemptArticle.nextElementSibling; // Usa nextElementSibling para obtener el bigBox

    if (
      document
        .getElementById("problems-container")
        .classList.contains("active") &&
      !attemptArticle.classList.contains("active")
    ) {
      deactivateAnyOtherAttempt(attemptArticle);
      setTimeout(activateAttempt, 400, attemptArticle, bigBox);
    } else if (
      document
        .getElementById("problems-container")
        .classList.contains("active") &&
      attemptArticle.classList.contains("active")
    ) {
      deactivateAttempt(attemptArticle, bigBox);
    } else {
      activateAttempt(attemptArticle, bigBox);
    }
    /*     if (attemptArticle.classList.contains("active")) {
    } else {
    } */
  });

  return attemptArticle;

  function activateAttempt(attemptArticle, bigBox) {
    attemptArticle.classList.add("active");
    bigBox.classList.add("active");
    document.getElementById("problems-container").classList.add("active");
    showCodeAndDescription(
      attemptArticle,
      problems,
      problemIndex,
      attemptIndex
    );
    // scroll until bigBox is at the top of the viewport
    bigBox.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function deactivateAttempt(attemptArticle, bigBox) {
  document.getElementById("problems-container").classList.remove("active");
  attemptArticle.classList.remove("active");
  bigBox.classList.remove("active");
  setTimeout(() => {
    bigBox.innerHTML = "";
  }, 1000);
}

// Función para mostrar el código y la descripción
function showCodeAndDescription(
  attemptArticle,
  problems,
  problemIndex,
  attemptIndex
) {
  const bigBox = attemptArticle.nextElementSibling; // Usar nextElementSibling para encontrar el bigBox

  const code = problems[problemIndex].attempts[attemptIndex].code;
  bigBox.innerHTML = `
    <button class="close-cross close-button">╳</button>
    <div id="description-container">${problems[problemIndex].description}</div>
    <div id="code-container-container">
      <code><pre id="code-container" class="language-javascript">${code}</pre></code>
    </div>
    <button class="close-word close-button">Close</button>
  `;

  // Añadir manejadores de eventos para los botones de cerrar
  bigBox.querySelectorAll(".close-cross, .close-word").forEach((button) => {
    button.addEventListener("click", () => {
      deactivateAttempt(attemptArticle, bigBox);
    });
  });

  // Resaltar el código recién agregado usando Prism
  Prism.highlightElement(bigBox.querySelector("#code-container"));
}

// Función para renderizar un problema
function renderProblem(problem, problems, problemIndex) {
  const section = document.createElement("section");

  section.appendChild(createProblemHeader(problem));
  section.appendChild(createProblemCabecera(problem));

  problem.attempts.forEach((attempt, attemptIndex) => {
    section.appendChild(
      createSection(attempt, problems, problemIndex, attemptIndex)
    );
    const bigBox = document.createElement("div");
    bigBox.className = "big-box";

    section.appendChild(bigBox);
  });

  return section;
}

// Función para renderizar los problemas
function renderProblems(problems) {
  const problemsContainer = document.getElementById("problems-container");
  problemsContainer.innerHTML = "";

  problems.forEach((problem, problemIndex) => {
    const problemElement = renderProblem(problem, problems, problemIndex);
    problemsContainer.appendChild(problemElement);
  });
  if (problems.length === 0) {
    problemsContainer.innerHTML = `
      <div class="no-results center"> 
        <p>No Results found 🙈</p>
        
        <button 
          id="clear-button-2" 
          onclick="clearSearch()">
            Clear Search
        </button>
      </div>`;
  }
}

// Función para limpiar el campo de búsqueda
function clearSearch() {
  const searchInput = document.getElementById("search");
  searchInput.value = "";
  searchInput.dispatchEvent(
    new Event("input", { bubbles: true, cancelable: true })
  );
}

// Función para obtener y renderizar problemas
async function fetchAndRenderProblems() {
  const response = await fetch("leetcode-problems.json");
  const problems = await response.json();
  renderProblems(problems);

  const searchInput = document.getElementById("search");

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();

    if (query.length > 0) {
      const terms = query
        .match(/"[^"]+"|\S+/g)
        .map((term) => term.replace(/"/g, ""));
      const filteredProblems = problems.filter((problem) => {
        return terms.every(
          (term) =>
            problem.title.toLowerCase().includes(term) ||
            problem.description.toLowerCase().includes(term) ||
            problem.topics.some((topic) =>
              topic.toLowerCase().includes(term)
            ) ||
            problem.difficulty.toLowerCase().includes(term)
        );
      });
      renderProblems(filteredProblems);
    } else {
      renderProblems(problems);
    }
  });

  document
    .getElementById("clear-search")
    .addEventListener("click", clearSearch);
}

// Ejecutar al cargar el documento
fetchAndRenderProblems();
