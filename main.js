window.onload = function () {
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
};
