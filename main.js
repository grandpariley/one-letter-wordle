window.onload = function () {
  // modal actions
  var modal = document.getElementById("generic-modal");
  var helpButton = document.getElementById("help-button");
  helpButton.onclick = function () {
    document.getElementById("modal-body").innerHTML =
      document.getElementById("help-modal-body").innerHTML;
    modal.style.display = "flex";
  };
  var leaderboardButton = document.getElementById("leaderboard-button");
  leaderboardButton.onclick = function () {
    document.getElementById("modal-body").innerHTML = document.getElementById(
      "leaderboard-modal-body"
    ).innerHTML;
    modal.style.display = "flex";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // game actions
  for (var i = 0; i < 26; i++) {
    var char = (i + 10).toString(36);
    key = document.getElementById(char);
    key.onclick = keyEventListener;
  }
};

var round = 1;
var winner = false;
var superSecretAnswer = getSuperSecretAnswer();

function keyEventListener(event) {
  if (round > 5 || winner) {
    return;
  }
  document.getElementById("tile" + round).innerHTML = event.target.id;
  if (document.getElementById("tile" + round).innerHTML === superSecretAnswer) {
    win();
  } else {
    wrongGuess(event.target.id);
  }
  round += 1;
  if (round === 5) {
    lost();
  }
}

function win() {
  document.getElementById("tile" + round).classList += " tile-correct";
  document.getElementById(superSecretAnswer).classList += " correct-key";
  document.getElementById("modal-body").innerHTML =
    document.getElementById("winner-modal-body").innerHTML +
    document.getElementById("leaderboard-modal-body").innerHTML;
  document.getElementById("generic-modal").style.display = "flex";
  winner = true;
}

function wrongGuess(guess) {
  document.getElementById(guess).classList += " disabled-key";
}

function lost() {
  console.log("you lost!");
}

function getSuperSecretAnswer() {
  var possibleAnswers = ["i", "a"];
  return possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
}
