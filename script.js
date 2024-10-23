function filterData(event) {
    event.preventDefault();
    
    // Get the start and end dates from the input fields
    var startdate = new Date(document.getElementById("startdate").value);
    var enddate = new Date(document.getElementById("enddate").value);
  
    // Get all rows from the table
    var tableRows = document.querySelectorAll("#pitchTable tbody tr");
  
    // Loop through the rows to check the date
    tableRows.forEach(row => {
        // Get the date from the row (assuming it's in the second column)
        var rowDate = new Date(row.cells[1].textContent);
  
        // Check if the row's date is within the range
        if (rowDate >= startdate && rowDate <= enddate) {
            row.style.display = ""; // Show the row
        } else {
            row.style.display = "none"; // Hide the row
        }
    });
  }
  
  
  async function fetchData() {
    const url = 'https://compute.samford.edu/zohauth/clients/datajson/1';
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        populateTable(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
  }
  
  function populateTable(data) {
    const tableBody = document.getElementById('pitchTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear any existing data
  
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="details.html?id=${item.PitchNo}">Pitch ${item.PitchNo}</a></td>
            <td>${item.Date || 'N/A'}</td>
            <td>${item.Time || 'N/A'}</td>
            <td>${item.Batter || 'N/A'}</td>
            <td>${item.Balls || 'N/A'}</td>
            <td>${item.Strikes || 'N/A'}</td>
            <td>${item.Outs || 'N/A'}</td>
            <td>${item.Pitchcall || 'N/A'}</td>
            <td>${item.Kobb || 'N/A'}</td>
            <td>${item.RelSpeed || 'N/A'}</td>
            <td>${item.SpinRate || 'N/A'}</td>
            <td>${item.SpinAxis || 'N/A'}</td>
        `;
        tableBody.appendChild(row);
    });
  }
  
  // Fetch data when the page loads
  window.onload = fetchData;
