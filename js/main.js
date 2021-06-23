$("#current-score").html(
  localStorage.getItem("currentScore")
    ? localStorage.getItem("currentScore")
    : localStorage.setItem("currentScore", "0")
);
$("#game-section").hide();

// Event Listener
$("#paper").click(function (e) {
  e.preventDefault();
  console.log("paper clicked");
  localStorage.setItem("selectedItem", "paper");
  performTask();
});
$("#scissors").click(function (e) {
  e.preventDefault();
  console.log("scissors clicked");
  localStorage.setItem("selectedItem", "scissors");
  performTask();
});
$("#rock").click(function (e) {
  e.preventDefault();
  console.log("rock clicked");
  localStorage.setItem("selectedItem", "rock");
  performTask();
});
$("#play-again-button").click(function (e) {
  e.preventDefault();
  hideGameSection();
  showSelectionSection();
  $(".inserted-element").remove();
});
$("#desktop-play-again-button").click(function (e) {
  e.preventDefault();
  hideGameSection();
  showSelectionSection();
  $(".inserted-element").remove();
});

// Functions

const performTask = () => {
  hideSelectionSection();
  showGameSection();
  insertSelectedElement({ player: "user", playerId: "#user-choice-headline" });
  insertSelectedElement({
    player: "computer",
    playerId: "#computer-choice-headline",
  });
  evalResult();
};
const evalResult = () => {
  console.log("evaluating result");
  const userSelectedElement = localStorage.getItem("userSelectedItem");
  const computerSelectedElement = localStorage.getItem("computerSelectedItem");
  if (userSelectedElement && computerSelectedElement) {
    console.log("final", userSelectedElement, computerSelectedElement);
    if (userSelectedElement === computerSelectedElement) {
      setResultHeadline("Draw");
    } else if (
      (userSelectedElement === "rock" &&
        computerSelectedElement === "scissors") ||
      (userSelectedElement === "paper" && computerSelectedElement === "rock") ||
      (userSelectedElement === "scissors" &&
        computerSelectedElement === "paper")
    ) {
      setResultHeadline("You Win");
      incrementCurrentScore();
    } else {
      setResultHeadline("You Lose");
      decrementCurrentScore();
    }
  }
  setCurrentScore(localStorage.getItem("currentScore"));
};
const incrementCurrentScore = () => {
  let currentScore = localStorage.getItem("currentScore");
  localStorage.setItem("currentScore", ++currentScore);
};
const decrementCurrentScore = () => {
  let currentScore = localStorage.getItem("currentScore");
  localStorage.setItem("currentScore", --currentScore);
};
const insertSelectedElement = ({ player, playerId }) => {
  let currentSelectedItem;
  let currentSelectedElement;
  if (player === "user") {
    currentSelectedItem = localStorage.getItem("selectedItem");
    switch (currentSelectedItem) {
      case "paper":
        console.log("paper case");
        currentSelectedElement = paperElement;
        break;
      case "rock":
        console.log("rock case");
        currentSelectedElement = rockElement;
        break;
      case "scissors":
        console.log("scissors case");
        currentSelectedElement = scissorElement;
        break;
      default:
        break;
    }
    localStorage.setItem("userSelectedItem", currentSelectedItem);
  } else if (player === "computer") {
    const elements = [paperElement, rockElement, scissorElement];
    const index = Math.floor(Math.random() * elements.length);
    currentSelectedElement = elements[index];
    switch (index) {
      case 0:
        currentSelectedItem = "paper";
        break;
      case 1:
        currentSelectedItem = "rock";
        break;
      case 2:
        currentSelectedItem = "scissors";
        break;
      default:
        break;
    }
    localStorage.setItem("computerSelectedItem", currentSelectedItem);
  }

  $(playerId).before(currentSelectedElement);
};
const setCurrentScore = (score) => {
  $("#current-score").html(score);
};
const setResultHeadline = (result) => {
  $("#result-headline").html(result);
  $("#desktop-result-headline").html(result);
};
const showGameSection = () => {
  $("#game-section").fadeIn(800);
};
const hideGameSection = () => {
  $("#game-section").hide();
};
const hideSelectionSection = () => {
  $("#selection-section").hide();
};
const showSelectionSection = () => {
  $("#selection-section").fadeIn(800);
};
