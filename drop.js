// drop.js

document.addEventListener("DOMContentLoaded", function () {
  // Determine the current page
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "drop.html") {
    initializeDropPage();
  } else if (currentPage === "timetable.html") {
    initializeTimetablePage();
  }
});

function initializeDropPage() {
  const showTimetableButton = document.getElementById("show-timetable");

  if (showTimetableButton) {
    showTimetableButton.addEventListener("click", async function () {
      const group = document.getElementById("dropdown1").value;
      const subgroup = document.getElementById("dropdown2").value;

      try {
        const response = await fetch("data.json");
        const data = await response.json();
        // Store the necessary data in localStorage
        localStorage.setItem("group", group);
        localStorage.setItem("subgroup", subgroup);
        localStorage.setItem("timetableData", JSON.stringify(data));

        // Redirect to the timetable page
        window.location.href = "timetable.html";
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      }
    });
  }
}

function initializeTimetablePage() {
  // Retrieve the data from localStorage
  const group = localStorage.getItem("group");
  const subgroup = localStorage.getItem("subgroup");
  const data = JSON.parse(localStorage.getItem("timetableData"));

  // Call displayTimetable with the retrieved data
  displayTimetable(data, group, subgroup);
}

function displayTimetable(data, group, subgroup) {
  const timetableContainer = document.querySelector(".heading");
  timetableContainer.innerHTML = `
      <h2>${group} - ${subgroup} Timetable</h2>      
    `;

  const tbody = document.getElementById("timetable-body");

  const times = [
    "08:00 AM",
    "08:50 AM",
    "09:40 AM",
    "10:30 AM",
    "11:20 AM",
    "12:10 PM",
    "01:00 PM",
    "01:50 PM",
    "02:40 PM",
    "03:30 PM",
    "04:20 PM",
    "05:10 PM",
    "06:00 PM",
    "06:50 PM",
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  times.forEach((time, i) => {
    const row = document.createElement("tr");
    const timeCell = document.createElement("td");
    timeCell.textContent = time;
    row.appendChild(timeCell);

    days.forEach((day) => {
      const cell = document.createElement("td");
      const session = data[group][subgroup][day][i].Session;
      cell.textContent = session;
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });
}
