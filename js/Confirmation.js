document.addEventListener('DOMContentLoaded', function() {
    const summarytData = localStorage.getItem("summaryTable");

    if (summarytData) {
        const table = document.querySelector(".table");
        table.innerHTML = summarytData;
    } else {
        const table = document.querySelector(".table");
        table.innerHTML = "<tr><td colspan='2'>No summary table data available.</td></tr>";
    }
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (userDetails) {
        document.getElementById("user-name").textContent = userDetails.fullName;
        document.getElementById("user-mobile").textContent = userDetails.mobileNumber;
        document.getElementById("user-email").textContent = userDetails.email;
        document.getElementById("user-gender").textContent = userDetails.gender;
    } else {
        console.log("User details not found in local storage.");
    }
});
  
