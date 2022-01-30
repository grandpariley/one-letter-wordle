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
    } else if (
      event.target == document.getElementById("share") ||
      event.target == document.getElementById("share-icon")
    ) {
      navigator.clipboard.writeText(getBoardStateEmojis());
      document.getElementById("copied-alert-modal").style.display = "flex"
      setTimeout(function () {
        document.getElementById("copied-alert-modal").style.display = "none"
      }, 10 * 1000);
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
  } else if (round === 5) {
    wrongGuess(event.target.id);
    lost();
  } else {
    wrongGuess(event.target.id);
  }
  round += 1;
}

function win() {
  document.getElementById("tile" + round).classList.add("tile-correct");
  document.getElementById(superSecretAnswer).classList.add("correct-key");
  document.getElementById("modal-body").innerHTML =
    document.getElementById("winner-modal-body").innerHTML +
    document.getElementById("leaderboard-modal-body").innerHTML;
  document.getElementById("generic-modal").style.display = "flex";
  winner = true;
}

function wrongGuess(guess) {
  document.getElementById(guess).classList.add("disabled-key");
  document.getElementById("tile" + round).classList.add("tile-wrong");
}

function lost() {
  document.getElementById("modal-body").innerHTML =
    document.getElementById("loser-modal-body").innerHTML +
    document.getElementById("leaderboard-modal-body").innerHTML;
  document.getElementById("generic-modal").style.display = "flex";
}

function getSuperSecretAnswer() {
  var possibleAnswers = ["i", "a"];
  return possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
}

function getBoardStateEmojis() {
  var boardState = "";
  for (var i = 1; i <= round - 1; i++) {
    if (document.getElementById("tile" + i).classList.contains("tile-wrong")) {
      boardState = boardState.concat("\n:black_large_square:");
    } else if (
      document.getElementById("tile" + i).classList.contains("tile-correct")
    ) {
      boardState = boardState.concat("\n:green_square:");
    }
  }
  return "One letter wordle #1 ".concat(round - 1, "/5\n", boardState);
}
