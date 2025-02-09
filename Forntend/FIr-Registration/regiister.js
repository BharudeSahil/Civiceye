// FIR Form Submission
document
  .getElementById("fir-report-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    // Simulate FIR submission
    document.getElementById("fir-confirmation").style.display = "block";
    document.getElementById("fir-number").textContent = Math.floor(
      Math.random() * 1000000
    );
    document.getElementById("fir-status").textContent = "Under Review";
  });

// Download FIR Copy
document.getElementById("download-fir").addEventListener("click", function () {
  alert("FIR copy downloaded!");
});
