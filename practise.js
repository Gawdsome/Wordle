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

  gWord = listOfWords[y].split("");
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
      if (word.length < 5) {
        letter = event.key.toUpperCase();
        document.querySelector(`#w${attempt}l${cursor}`).textContent = letter;
        cursor++;
        word.push(letter);
      }
    } else if (event.key == "Backspace") {
      if (word.length !== 0) {
        cursor--;
        document.querySelector(`#w${attempt}l${cursor}`).textContent = "";
        word.pop();
      }
    } else if (event.key == "Enter") {
      if (word.length == 5) {
        initiate();
      } else {
        document.querySelector("#para").textContent =
          "Please fill in all the slots";
      }
    }
  }
});

const nOfLetters = [];
var change = 0;
var cLetter = "";
var wordDef;

function initiate() {
  checkWord();
  const wait = setTimeout(greenYellow, 1000);
}

function checkWord() {
  fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word.join("")}`
  ).then(
    (response) => {
      console.log(response.json());
      wordDef = response;
      console.log(wordDef);
    },
    (response) => {
      console.error("err", response);
    }
  );
}

function greenYellow() {
  console.log(wordDef.ok);

  if (wordDef.ok) {
    for (let y = 0; y < 26; y++) {
      change = 0;
      cLetter = allLetters[y].toUpperCase();
      for (let a = 0; a < 5; a++) {
        if (cLetter.toUpperCase() == gWord[a]) {
          change++;
        }
      }
      if (gWord.includes(cLetter)) {
        nOfLetters.push(allLetters[y].toUpperCase(), change);
      }
    }
    console.log(nOfLetters);

    // establishes change

    const other = [];
    for (let x = 0; x < 5; x++) {
      if (nOfLetters.includes(word[x])) {
        if (word[x] == gWord[x]) {
          console.log("#w" + attempt + "l" + (x + 1));
          document.querySelector("#w" + attempt + "l" + (x + 1)).style =
            "background:green";
          nOfLetters[nOfLetters.indexOf(word[x]) + 1] -= 1;
          console.log(nOfLetters);
          other.push(x);
        } else {
          document.querySelector("#w" + attempt + "l" + (x + 1)).style =
            "background:gray";
        }
      }
    }
    console.log(other);
    for (let z = 0; z < 5; z++) {
      if (other.includes(z)) {
        console.log(other, "  gonna ignore this");
      } else if (
        gWord.includes(word[z]) &&
        nOfLetters[nOfLetters.indexOf(word[z]) + 1] > 0
      ) {
        document.querySelector("#w" + attempt + "l" + (z + 1)).style =
          "background:#C18F32";
        nOfLetters[nOfLetters.indexOf(word[z]) + 1] -= 1;
      } else {
        document.querySelector("#w" + attempt + "l" + (z + 1)).style =
          "background:gray";
      }
    }

    attempt++;
    state = "";
    if (attempt == 7) {
      state = "nt";
    }
    word = [];
    cursor = 1;
    console.log(attempt, state, word.length, cursor);
  } else {
    alert("please use a real word");
  }
}
// noOfCorrect = 0;
// if (word.length !== 5) {
//   document.querySelector(".para").style = "font-family:arial";
//   document.querySelector(".para").textContent =
//     "Please fill in all the slots before entering";
//   document.querySelector(".para").style =
//     'font-family: "Bungee Spice", sans-serif;';
// } else {
//   document.querySelector(".para").textContent = "";
//   attempt++;
//   for (let i = 0; i <= 4; i++) {
//     if (word[i] == gWord[i]) {
//       document.querySelector("#l" + (i + 1 + 5 * (attempt - 2))).style =
//         "background:green";
//       noOfCorrect++;
//     } else if (gWord.includes(word[i])) {
//       document.querySelector("#l" + (i + 1 + 5 * (attempt - 2))).style =
//         "background:#CB9D06;";
//     } else {
//     }
//   }
//   word = [];
//   cursor = 1;
//   if (noOfCorrect == 5) {
//     document.querySelector(".para").textContent =
//       "You have gotten it right!!";
//     document.querySelector("#score").textContent = "Score: " + score;
//     state = "nt";
//   } else {
//     noOfCorrect = 0;
//     score = 7 - attempt;
//     console.log(score);
//     document.querySelector("#score").textContent = "Score: " + score;
//   }
//   if (attempt == 7) {
//     state = "nt";
//     if (noOfCorrect !== 5) {
//       document.querySelector(
//         ".para"
//       ).textContent = `Hmmm..., you failed, the word was ${gWord.join(
//         ""
//       )}, better luck next time`;
//     }
//   }
// }

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

const karan = {
  fname: "Karan",
  lname: "Sharma",
  age: 14,
};
console.log(karan);
console.log(karan.fname);
