const today = document.querySelector(".today");
dateTag = document.querySelector(".date");
prevnext_msymbol  = document.querySelectorAll(".figure span")
const time_slotSelect = document.getElementById("select-timeslot");
const pricingTable = {
    "Foreigner Adult": { normal: 10, peak: 13 },
    "Foreigner Child": { normal: 5, peak: 8 },
    "SL Adult": { normal: 4, peak: 6 },
    "SL Child": { normal: 2, peak: 3 },
    Infants: { normal: 0, peak: 0 }, // Infants are free
  };

let date = new Date();
curruntYear = date.getFullYear(),
curruntMonth = date.getMonth();

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const renderCalender = () =>{
    let firstday = new Date(curruntYear, curruntMonth, 1).getDay(),
    lastday = new Date(curruntYear, curruntMonth + 1, 0).getDate(),
    lastDay = new Date(curruntYear, curruntMonth, lastday).getDay(),
    last_Date_LastMonth = new Date(curruntYear, curruntMonth, 0).getDate();
    let liTag = "";

    for (let a = firstday; a > 0; a--) {
        liTag += `<li class="non-functioning">${last_Date_LastMonth - a + 1}</li>`;
        
    }

    for (let a = 1; a <= lastday; a++) {
        let isTday = a=== date.getDate() && curruntMonth === new Date().getMonth()
                      && curruntYear === new Date().getFullYear() ? "active" : "";  
        liTag += `<li class="${isTday}">${a}</li>`;
        
    }

    for (let a = lastDay; a < 6; a++) {
        liTag += `<li class="non-functioning">${a - lastDay + 1}</li>`;
        
    }

    today.innerText = `${month[curruntMonth]} ${curruntYear}`
    dateTag.innerHTML = liTag;

    prevnext_msymbol .forEach(symbol  => {
        symbol .addEventListener("click", () => {
            curruntMonth = symbol .id === "previous " ? curruntMonth - 1 : curruntMonth + 1;

            if (curruntMonth < 0 || curruntMonth > 11) {
                date = new Date(curruntYear, curruntMonth);
                curruntYear = date.getFullYear();
                curruntMonth = date.getMonth();
            } else{
                date = new Date();
            }
            renderCalender();
        })
    })

    const dCells = document.querySelectorAll(".date li");
    dCells.forEach((room ) => {
        room .addEventListener("click", () => {
            
            const sDate = room .innerText;
           
             document.getElementById("s-date").innerText = `${month[curruntMonth]} ${sDate}, ${curruntYear}`;
            
        });
    })

    time_slotSelect.addEventListener("change", () => {
        const selectedOptions = Array.from(time_slotSelect.selectedOptions);
        const sTimes = selectedOptions.map((option) => option.text);
        document.getElementById("s-time").innerText = sTimes.join(", ");
    });


    const bookingForm = document.getElementById("quantity");
    quantity.addEventListener("input", updateSummaryTable);
};

const updateSummaryTable = () => {
  
  const slAdultsStore  = document.querySelector('.tiket p:contains("SL Adults") + input');
  const slChildStore = document.querySelector('.tiket p:contains("SL Child") + input');
  const foreignAdultsStore = document.querySelector('.tiket p:contains("Foreign Adults") + input');
  const foreignChildStore = document.querySelector('.tiket p:contains("Foreign Child") + input');
  const infantsStore = document.querySelector('.tiket p:contains("Infants") + input');
  
  const selectedOptions = Array.from(time_slotSelect.selectedOptions);
  const sTimes = selectedOptions.map((option) => option.text);

 
  const totalSadults = slAdultsStore.value * slaPrice;
  const totalSchild = slChildStore.value * slcPrice;
  const totalFadults = foreignAdultsStore.value * foreignaPrice;
  const totalFchild = foreignChildStore.value * foreigncPrice;
  const slaPrice = 4; 
  const slcPrice = 2; 
  const foreignaPrice = 10; 
  const foreigncPrice = 5; 
  const totalInfants = 0; 

  const totalPayable = totalSadults + totalSchild + totalFadults + totalFchild + totalInfants;

  
  document.getElementById("s-date").innerText = "Selected Date"; 
  document.getElementById("s-time").innerText = sTimes.join(", ");
  document.querySelector(".row:nth-child(1) td:nth-child(2)").innerText = `$${totalSadults}`;
  document.querySelector(".row:nth-child(2) td:nth-child(2)").innerText = `$${totalSchild}`;
  document.querySelector("tr:nth-child(3) td:nth-child(2)").innerText = `$${totalFadults}`;
  document.querySelector(".row:nth-child(4) td:nth-child(2)").innerText = `$${totalFchild}`;
  document.querySelector(".row:nth-child(5) td:nth-child(2)").innerText = `$${totalInfants}`;
  document.querySelector("tfoot tr td:nth-child(2)").innerText = `$${totalPayable}`;
}

renderCalender();

document.addEventListener('DOMContentLoaded', function () {
    const tickets = {
        'SL Adult': 0,
        'SL Child': 0,
        'Foreign Adult': 0,
        'Foreign Child': 0,
        'Infant': 0
    };

  function updateSummaryRow(input, row) {
      const enteredValue = parseInt(input.value);
      const ticketTyperoom  = row.querySelector('td:first-child');
      const ticketType = ticketTyperoom .getAttribute('ticket-type');
      const normalPrice = parseFloat(row.getAttribute('normal-price'));
      const peakPrice = parseFloat(row.getAttribute('peak-price'));

      let totalPrice;
      if (ticketType === 'Infant') {
          totalPrice = 0; 
      } else {
          totalPrice = enteredValue * (isPeakHour() ? peakPrice : normalPrice);
      }

      row.querySelector('td:last-child').textContent = totalPrice > 0 ? '$' + totalPrice.toFixed(2) : 'FREE';
      tickets[ticketType] = totalPrice;

      const totalPayableroom  = document.querySelector('tfoot td:last-child');
      const totalPayable = Object.values(tickets).reduce((acc, curr) => acc + curr, 0);
      totalPayableroom .textContent = '$' + totalPayable.toFixed(2);
      
  
      if (ticketType === 'Infant') {
          row.querySelector('td:last-child').textContent = 'FREE';
      } else {
          const totalPrice = enteredValue * (isPeakHour() ? peakPrice : normalPrice);
          row.querySelector('td:last-child').textContent = '$' + totalPrice.toFixed(2);
      }

      if (ticketType.toLowerCase().includes('child')) {
          if (enteredValue > 1) {
              ticketTyperoom .textContent = enteredValue + ' ' + ticketType + 'ren';
          } else {
              ticketTyperoom .textContent = enteredValue + ' ' + ticketType;
          }
      } else {
          if (enteredValue > 1) {
              ticketTyperoom .textContent = enteredValue + ' ' + ticketType + 's';
          } else {
              ticketTyperoom .textContent = enteredValue + ' ' + ticketType;
          }
      }

      if (enteredValue > 0) {
          row.classList.remove('row');
      } else {
          row.classList.add('row');
      }
  }

  function initializeSummaryRow(inputId, rowId, ticketType, normalPrice, peakPrice) {
    const input = document.getElementById(inputId);
    const row = document.getElementById(rowId);
    input.addEventListener('input', () => updateSummaryRow(input, row));
    row.querySelector('td:first-child').setAttribute('ticket-type', ticketType);
    row.setAttribute('normal-price', normalPrice);
    row.setAttribute('peak-price', peakPrice);
}

  function isPeakHour() {
      const stimeslot = document.getElementById('select-timeslot').value;
      return stimeslot.includes('Peak');
  }

    initializeSummaryRow('sl-adults-store', 'sladult', 'SL Adult', 4, 6);
    initializeSummaryRow('sl-child-Store', 'slchild', 'SL Child', 2, 3);
    initializeSummaryRow('foreign-adults-Store', 'foreignadult', 'Foreign Adult', 10, 13);
    initializeSummaryRow('foreign-child-Store', 'foreignchild', 'Foreign Child', 5, 8);
    initializeSummaryRow('infant-Store', 'infant', 'Infant', 0, 0);

  // update the summary table and save to local storage
  const updateSummaryTable = () => {
    const summaryTable = document.querySelector(".summary-table").innerHTML;
    localStorage.setItem("summaryTable", summaryTable);

    alert("Data saved to  browser's local Storage");
     window.location.href = "Details.html";
  };

  // Event listener 
  const submitButton = document.querySelector(".submit-btn");
    submitButton.addEventListener("click", (event) => {
        event.preventDefault(); 

      // Update the summary table first before saving to local storage
      updateSummaryTable();
  });
});