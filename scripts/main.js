// Plot Generator

const masterminds = ["Professor Moriarty", "Dr. Fu Manchu", "Arsene Lupin", "Irene Adler", "The Shadow"];
const verbs = ["steal", "forge", "smuggle", "kidnap", "blackmail"];
const objects = ["the Crown Jewels", "a secret formula", "a priceless painting", "a famous scientist", "a member of parliament"];

function generatePlot() {
  const mastermind = masterminds[Math.floor(Math.random() * masterminds.length)];
  const verb = verbs[Math.floor(Math.random() * verbs.length)];
  const object = objects[Math.floor(Math.random() * objects.length)];

  return {
    mastermind,
    verb,
    object,
    fullPlot: `A reliable source tells us that ${mastermind} plans to ${verb} ${object}.`
  };
}

let currentPlot, discoveredClues, searchesRemaining, availableClues;

function initGame() {
  // Generate a new plot
  currentPlot = generatePlot();
  const plotElement = document.getElementById("plot");
  plotElement.textContent = currentPlot.fullPlot;

  // Generate clues for the plot
  availableClues = generateClues();
  discoveredClues = [];
  displayClues();

  // Reset searches
  searchesRemaining = 5;
  const searchesRemainingElement = document.getElementById("searches-remaining");
  searchesRemainingElement.textContent = searchesRemaining;

  // Enable search button
  const searchButton = document.getElementById("search-button");
  searchButton.disabled = false;
  searchButton.textContent = "Search for Clues";
}

// Clue System
const clues = [
  { type: "mastermind", text: "A witness saw a tall man in a dark coat near the scene." },
  { type: "mastermind", text: "The calling card of a notorious criminal was found." },
  { type: "verb", text: "We have reports of someone asking about security systems." },
  { type: "verb", text: "A large, unmarked van was seen in the area." },
  { type: "object", text: "An anonymous tip mentioned a specific high-value item." },
  { type: "object", text: "The target has received a vague threat." }
];

function generateClues() {
  const plotClues = clues.filter(clue => clue.type === "mastermind" || clue.type === "verb" || clue.type === "object");
  return plotClues.sort(() => 0.5 - Math.random()).slice(0, 3);
}

function displayClues() {
  const clueListElement = document.getElementById("clue-list");
  clueListElement.innerHTML = "";
  discoveredClues.forEach(clue => {
    const listItem = document.createElement("li");
    listItem.textContent = clue.text;
    clueListElement.appendChild(listItem);
  });
}

// Minigame
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
  if (searchesRemaining > 0) {
    searchesRemaining--;
    const searchesRemainingElement = document.getElementById("searches-remaining");
    searchesRemainingElement.textContent = searchesRemaining;

    if (availableClues.length > 0) {
      const newClue = availableClues.pop();
      discoveredClues.push(newClue);
      displayClues();
    }

    if (searchesRemaining === 0) {
      searchButton.disabled = true;
      searchButton.textContent = "No Searches Remaining";
    }
  }
});

// Arrest Mechanic
const arrestButton = document.getElementById("arrest-button");
const arrestInput = document.getElementById("arrest-input");

arrestButton.addEventListener("click", () => {
  const guess = arrestInput.value;
  if (guess.toLowerCase() === currentPlot.mastermind.toLowerCase()) {
    alert("Congratulations! You've caught the mastermind and foiled the plot!");
  } else {
    alert(`Sorry, the correct mastermind was ${currentPlot.mastermind}. Better luck next time!`);
  }
  arrestInput.value = "";
  initGame();
});

// Initialize the game
initGame();
