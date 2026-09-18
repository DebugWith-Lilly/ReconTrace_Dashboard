// ==========================================
// RECONTRACE - CASES PAGE
// ==========================================


// ================= SEARCH =================

const caseSearch = document.getElementById("caseSearch");
const caseRows = document.querySelectorAll("#casesTableBody tr");

caseSearch.addEventListener("input", function () {

    const searchValue = this.value.toLowerCase().trim();

    caseRows.forEach(row => {

        const searchableText =
            row.getAttribute("data-search").toLowerCase();

        if (searchableText.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

});


// ================= FILTERS =================

const filterButtons = document.querySelectorAll(".case-filter");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        const selectedFilter =
            this.getAttribute("data-filter");

        caseRows.forEach(row => {

            const rowStatus =
                row.getAttribute("data-status");

            if (
                selectedFilter === "all" ||
                rowStatus === selectedFilter
            ) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

    });

});


// ================= VIEW CASE =================

function viewCase(caseID) {

    alert(
        "RECONTRACE CASE\n\n" +
        "Case ID: " + caseID +
        "\n\nCase details will open here."
    );

}


// ================= NEW CASE =================

const newCaseBtn = document.getElementById("newCaseBtn");

newCaseBtn.addEventListener("click", function () {

    alert(
        "NEW CASE\n\n" +
        "The case creation form will be connected here."
    );

});