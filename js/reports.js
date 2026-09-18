// ==========================================
// RECONTRACE - REPORTS PAGE
// ==========================================


// ------------------------------------------
// SEARCH REPORTS
// ------------------------------------------

const reportSearch = document.getElementById("reportSearch");
const reportRows = document.querySelectorAll("#reportsTableBody tr");

if (reportSearch) {
    reportSearch.addEventListener("input", function () {

        const searchValue = this.value.toLowerCase().trim();

        reportRows.forEach(row => {

            const searchableText =
                row.getAttribute("data-search").toLowerCase();

            if (searchableText.includes(searchValue)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });
    });
}


// ------------------------------------------
// REPORT FILTERS
// ------------------------------------------

const reportFilters = document.querySelectorAll(".report-filter");

reportFilters.forEach(button => {

    button.addEventListener("click", function () {

        // Remove active from all buttons
        reportFilters.forEach(btn => {
            btn.classList.remove("active");
        });

        // Make clicked button active
        this.classList.add("active");

        const selectedFilter = this.getAttribute("data-filter");

        reportRows.forEach(row => {

            const reportStatus =
                row.getAttribute("data-status");

            if (
                selectedFilter === "all" ||
                reportStatus === selectedFilter
            ) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });
    });
});


// ------------------------------------------
// VIEW REPORT
// ------------------------------------------

const viewButtons = document.querySelectorAll(".report-view-btn");

viewButtons.forEach(button => {

    button.addEventListener("click", function () {

        const row = this.closest("tr");

        const reportID =
            row.querySelector(".report-id").textContent.trim();

        const caseID =
            row.querySelector(".report-case").textContent.trim();

        const caseName =
            row.querySelector(".report-case-name").textContent.trim();

        const reportType =
            row.querySelector("td:nth-child(3)").textContent.trim();

        const status =
            row.querySelector(".report-status").textContent.trim();

        alert(
            "RECONTRACE REPORT\n\n" +
            "Report ID: " + reportID + "\n" +
            "Case ID: " + caseID + "\n" +
            "Case: " + caseName + "\n" +
            "Report Type: " + reportType + "\n" +
            "Status: " + status + "\n\n" +
            "The full report viewer will open here."
        );

    });
});


// ------------------------------------------
// DOWNLOAD REPORT
// ------------------------------------------

const downloadButtons =
    document.querySelectorAll(".report-download-btn");

downloadButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Don't do anything if button is disabled
        if (this.disabled) {
            return;
        }

        const row = this.closest("tr");

        const reportID =
            row.querySelector(".report-id").textContent.trim();

        alert(
            "DOWNLOAD REPORT\n\n" +
            "Report: " + reportID + "\n\n" +
            "The secure PDF download will be connected to the backend here."
        );

    });
});


// ------------------------------------------
// GENERATE REPORT
// ------------------------------------------

const generateReportBtn =
    document.getElementById("generateReportBtn");

if (generateReportBtn) {

    generateReportBtn.addEventListener("click", function () {

        alert(
            "GENERATE REPORT\n\n" +
            "The report generation wizard will open here.\n\n" +
            "It will allow the investigator to select a case, " +
            "choose the report type and generate the final forensic report."
        );

    });
}


// ------------------------------------------
// PAGE LOADED
// ------------------------------------------

console.log("RECONTRACE Reports page loaded successfully.");