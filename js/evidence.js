// =========================================
// RECONTRACE - EVIDENCE PAGE
// =========================================


// =========================================
// SEARCH
// =========================================

const searchInput = document.getElementById("evidenceSearch");
const evidenceRows = document.querySelectorAll(".evidence-table tbody tr");

searchInput.addEventListener("input", function () {

    const searchValue = searchInput.value.toLowerCase();

    evidenceRows.forEach(function (row) {

        const rowText = row.textContent.toLowerCase();

        if (rowText.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

});


// =========================================
// FILTER BUTTONS
// =========================================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.textContent.trim();

        evidenceRows.forEach(function (row) {

            const source = row.querySelector(".source-badge");
            const status = row.querySelector(".status-badge");

            if (filter === "All Evidence") {

                row.style.display = "";

            } else if (filter === "AI Detected") {

                if (source && source.classList.contains("ai")) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }

            } else if (filter === "Manual") {

                if (source && source.classList.contains("manual")) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }

            } else if (filter === "Verified") {

                if (status && status.classList.contains("verified")) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }

            }

        });

    });

});


// =========================================
// VIEW EVIDENCE
// =========================================

const viewButtons = document.querySelectorAll(".view-btn");

viewButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const row = button.closest("tr");

        const evidenceID =
            row.querySelector(".evidence-name strong").textContent;

        const evidenceName =
            row.querySelector(".evidence-name span").textContent;

        const type =
            row.children[1].textContent.trim();

        const caseID =
            row.querySelector(".case-id").textContent.trim();

        const confidence =
            row.children[4].textContent.trim();

        const status =
            row.querySelector(".status-badge").textContent.trim();

        alert(
            "EVIDENCE DETAILS\n\n" +
            "Evidence ID: " + evidenceID + "\n" +
            "Evidence: " + evidenceName + "\n" +
            "Type: " + type + "\n" +
            "Case: " + caseID + "\n" +
            "AI Confidence: " + confidence + "\n" +
            "Status: " + status
        );

    });

});


// =========================================
// ADD EVIDENCE MODAL
// =========================================

const addEvidenceButton =
    document.querySelector(".add-evidence-btn");

const addEvidenceModal =
    document.getElementById("addEvidenceModal");

const closeEvidenceModal =
    document.getElementById("closeEvidenceModal");

const cancelEvidenceBtn =
    document.getElementById("cancelEvidenceBtn");


// OPEN MODAL

addEvidenceButton.addEventListener("click", function () {

    addEvidenceModal.classList.add("show");

});


// CLOSE MODAL

closeEvidenceModal.addEventListener("click", function () {

    addEvidenceModal.classList.remove("show");

});


// CANCEL BUTTON

cancelEvidenceBtn.addEventListener("click", function () {

    addEvidenceModal.classList.remove("show");

});


// CLOSE WHEN CLICKING OUTSIDE

addEvidenceModal.addEventListener("click", function (event) {

    if (event.target === addEvidenceModal) {

        addEvidenceModal.classList.remove("show");

    }

});


// =========================================
// ADD EVIDENCE TO TABLE
// =========================================

const addEvidenceForm =
    document.getElementById("addEvidenceForm");


addEvidenceForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get information from form

    const evidenceID =
        document.getElementById("newEvidenceID").value;

    const evidenceName =
        document.getElementById("newEvidenceName").value;

    const evidenceType =
        document.getElementById("newEvidenceType").value;

    const caseID =
        document.getElementById("newEvidenceCase").value;

    const source =
        document.getElementById("newEvidenceSource").value;

    const confidence =
        document.getElementById("newEvidenceConfidence").value;


    // Create new table row

    const tableBody =
        document.querySelector(".evidence-table tbody");

    const newRow =
        document.createElement("tr");


    // Decide source badge

    let sourceHTML;

    if (source === "ai") {

        sourceHTML =
            `<span class="source-badge ai">
                ✦ AI Detected
            </span>`;

    } else {

        sourceHTML =
            `<span class="source-badge manual">
                Manual
            </span>`;

    }


    // Create row

    newRow.innerHTML = `

        <td>

            <div class="evidence-name">

                <div class="evidence-thumbnail object">
                    ◇
                </div>

                <div>

                    <strong>${evidenceID}</strong>

                    <span>${evidenceName}</span>

                </div>

            </div>

        </td>


        <td>
            ${evidenceType}
        </td>


        <td>

            <span class="case-id">
                ${caseID}
            </span>

        </td>


        <td>
            ${sourceHTML}
        </td>


        <td>

            <strong>
                ${confidence ? confidence + "%" : "—"}
            </strong>

        </td>


        <td>

            <span class="status-badge pending">
                Pending
            </span>

        </td>


        <td>

            <button class="view-btn">
                View
            </button>

        </td>

    `;


    // Add row to table

    tableBody.prepend(newRow);


    // Close modal

    addEvidenceModal.classList.remove("show");


    // Clear form

    addEvidenceForm.reset();


    // Tell investigator it worked

    alert(
        "Evidence added successfully!\n\n" +
        evidenceID + " has been added to the investigation."
    );

});