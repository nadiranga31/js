document.addEventListener('DOMContentLoaded', function() {
const summarytData = localStorage.getItem("summaryTable");

  if (summarytData) {
      const table = document.querySelector(".sum");
      table.innerHTML = summarytData;
  } else {
      const table = document.querySelector(".sum");
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

  const paymentForm = document.getElementById('paymentForm');
  const button = document.getElementById('button');
  const totalPayables = document.getElementById('totalPayables');

  const requiredInputs = paymentForm.querySelectorAll('input[required], select[required]');

  function togglebutton() {
      const allFilled = Array.from(requiredInputs).every(input => input.value.trim() !== '');
      button.disabled = !allFilled;
  }

  requiredInputs.forEach(input => {
      input.addEventListener('input', togglebutton);
  });

    const totalPayablesValue = totalPayables.textContent;
    button.textContent = `PAY ${totalPayablesValue}`;

    button.addEventListener("click", function() {
      
    const summarytData = localStorage.getItem("summaryTable");
    window.location.href = `Confirmation.html?summaryTable=${encodeURIComponent(summarytData)}`;

      
  });

  
});