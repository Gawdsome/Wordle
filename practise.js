("use strict");
const listOfWords = [
  "APPLE",
  "BEACH",
  "BRAIN",
  "BREAD",
  "CHAIR",
  "WORLD",
  "SHANK",
  "CHORD",
  "GYPSY",
  "EQUIP",
  "CLICK",
  "CLOCK",
  "MANGO",
  "MUMMY",
  "THESE",
  "CATCH",
  "TACIT",
  "COYLY",
];

var gWord = [];

function getWord() {
  var y = Math.floor(Math.random() * (listOfWords.length - 0));
  console.log(y, listOfWords[y]);

  gWord = listOfWords[y].split("");
  console.log(gWord);
  console.log(gWord.join(""));
}
getWord();

var x = 0;
var change = "";
var word = [];
var cursor = 1;
var letter = "";
var attempt = 1;
var noOfCorrect = 0;
var state = "";
var highscore = 0;
var score = 6;

const allLetters = "abcdefghijklmnopqrstuvwxyz";
document.addEventListener("keydown", function (event) {
  if (state !== "nt") {
    if (allLetters.includes(event.key)) {
      if (word.length < 5 || word.length == 0) {
        letter = event.key.toUpperCase();
        document.querySelector(
          "#l" + (cursor + 5 * (attempt - 1))
        ).textContent = letter;
        cursor++;
        word.push(letter);
        console.log(word);
      }
    } else if (event.key == "Backspace") {
      if (word.length !== 0) {
        cursor--;
        document.querySelector(
          "#l" + (cursor + 5 * (attempt - 1))
        ).textContent = "";
        word.pop();
        console.log(word);
      }
    } else if (event.key == "Enter") {
      checkWord();
    }
  } else {
    console.log("game over");
  }
});

function checkWord() {
  noOfCorrect = 0;
  if (word.length !== 5) {
    document.querySelector(".para").style = "font-family:arial";
    document.querySelector(".para").textContent =
      "Please fill in all the slots before entering";
    document.querySelector(".para").style =
      'font-family: "Bungee Spice", sans-serif;';
  } else {
    document.querySelector(".para").textContent = "";
    attempt++;
    for (let i = 0; i <= 4; i++) {
      if (word[i] == gWord[i]) {
        document.querySelector("#l" + (i + 1 + 5 * (attempt - 2))).style =
          "background:green";
        noOfCorrect++;
      } else if (gWord.includes(word[i])) {
        document.querySelector("#l" + (i + 1 + 5 * (attempt - 2))).style =
          "background:#CB9D06;";
      } else {
      }
    }
    word = [];
    cursor = 1;
    if (noOfCorrect == 5) {
      document.querySelector(".para").textContent =
        "You have gotten it right!!";
      document.querySelector("#score").textContent = "Score: " + score;
      state = "nt";
    } else {
      noOfCorrect = 0;
      score = 7 - attempt;
      console.log(score);
      document.querySelector("#score").textContent = "Score: " + score;
    }
    if (attempt == 7) {
      state = "nt";
      if (noOfCorrect !== 5) {
        document.querySelector(
          ".para"
        ).textContent = `Hmmm..., you failed, the word was ${gWord.join(
          ""
        )}, better luck next time`;
      }
    }
  }
}
var elements = "";
function newAttempt() {
  getWord();
  elements = document.querySelectorAll(".box");
  console.log(elements);
  // document.querySelectorAll(".box").style = "background:red";
  elements.forEach((element) => {
    element.style = "background:#3f3f3f";
    element.textContent = "";
  });

  if (score > highscore && noOfCorrect == 5) {
    document.querySelector("#hScore").textContent = "Highscore : " + score;
    console.log(`${score} > ${highscore}`);
  }
  document.querySelector(".para").textContent = "";
  x = 0;
  change = "";
  word = [];
  cursor = 1;
  letter = "";
  attempt = 1;
  noOfCorrect = 0;
  state = "";
  score = 6;
  document.querySelector("#score").textContent = "Score: " + score;
}
