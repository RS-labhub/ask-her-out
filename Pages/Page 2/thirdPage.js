document.addEventListener("DOMContentLoaded", function () {
  // Function to show the clickable button and hide the loading button
  function showClickableButton() {
    // Show the clickable button
    document.getElementById("enable").style.display = "inline";

    // Hide the loading button
    document.getElementById("disable").style.display = "none";
  }

  // Function to navigate to the second page
  function navigateToSecondPage() {
    window.location.href = "../Page 3/forthPage.html";
  }

  // Call the showClickableButton function after 3 seconds
  setTimeout(showClickableButton, 3000);

  // Call the navigateToSecondPage function when the clickable button is clicked
  document
    .getElementById("enable")
    .addEventListener("click", navigateToSecondPage);
});