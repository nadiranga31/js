document.addEventListener('DOMContentLoaded', function() {
const displaySummaryTableFromLocalStorage = () => {
    const summarytData = localStorage.getItem("summaryTable");
  
       if (summarytData) {
            const detail_stable = document.querySelector(".summary-table");
            detail_stable.innerHTML = summarytData;
        }
    };
  
    
    const handleFormSubmission = (event) => {
      event.preventDefault(); 

     const fullName = document.getElementById("fname").value;
      const mobileNumber = document.getElementById("code").value + document.getElementById("phone").value;
      const email = document.getElementById("email").value;
      const gender = document.getElementById("gender").value;
  
      document.getElementById("user-name").textContent = fullName;
      document.getElementById("user-mobile").textContent = mobileNumber;
      document.getElementById("user-email").textContent = email;
      document.getElementById("user-gender").textContent = gender;
  
      const userDetails = {
          fullName,
          mobileNumber,
          email,
          gender
      };
      console.log("User details saved:", userDetails);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
  
      const detail_stable = document.querySelector(".summary-table").innerHTML;
      localStorage.setItem("summaryTable", detail_stable);
      window.location.href = "Payment.html";

      alert("User data and summary table data are saved to local storage.");
  };
  
    const detailsForm = document.querySelector("form[action='details-form']");
    detailsForm.addEventListener("submit", handleFormSubmission);
  
    displaySummaryTableFromLocalStorage();
  });