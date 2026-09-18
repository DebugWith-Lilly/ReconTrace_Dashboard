// ==========================================
// RECONTRACE - MAP PAGE
// ==========================================


// ==========================================
// ELEMENTS
// ==========================================

const mapSearch =
    document.getElementById("mapSearch");

const caseMarkers =
    document.querySelectorAll(".case-marker");

const caseItems =
    document.querySelectorAll(".map-case-item");

const caseLocationTabs =
    document.querySelectorAll(".case-location-tab");

const mapPopup =
    document.getElementById("mapPopup");

const closePopupBtn =
    document.getElementById("closePopupBtn");

const popupCase =
    document.getElementById("popupCase");

const popupLocation =
    document.getElementById("popupLocation");

const popupStatus =
    document.getElementById("popupStatus");

const popupViewBtn =
    document.getElementById("popupViewBtn");

const zoomInBtn =
    document.getElementById("zoomInBtn");

const zoomOutBtn =
    document.getElementById("zoomOutBtn");

const mockMap =
    document.getElementById("mockMap");

const caseLocationCount =
    document.getElementById("caseLocationCount");


// ==========================================
// CURRENT FILTER
// ==========================================

// all
// active
// completed
// processing

let currentFilter = "all";


// ==========================================
// SELECTED CASE
// ==========================================

let selectedCaseID = null;


// ==========================================
// STATUS DISPLAY NAMES
// ==========================================

function getStatusName(status) {

    if (status === "active") {
        return "In Progress";
    }

    if (status === "completed") {
        return "Completed";
    }

    if (status === "processing") {
        return "Processing";
    }

    return status || "Unknown";

}


// ==========================================
// SHOW CASE POPUP
// ==========================================

function showCasePopup(
    caseID,
    location,
    status
) {

    if (!mapPopup) return;

    popupCase.textContent = caseID;

    popupLocation.textContent = location;

    popupStatus.textContent =
        getStatusName(status);

    mapPopup.classList.add("show");

}


// ==========================================
// CLOSE CASE POPUP
// ==========================================

function closeCasePopup() {

    if (!mapPopup) return;

    mapPopup.classList.remove("show");

}


// ==========================================
// CLOSE BUTTON
// ==========================================

if (closePopupBtn) {

    closePopupBtn.addEventListener(
        "click",
        closeCasePopup
    );

}


// ==========================================
// UPDATE CASE COUNT
// ==========================================

function updateCaseCount() {

    if (!caseLocationCount) return;

    let visibleCases = 0;

    caseItems.forEach(item => {

        if (
            item.style.display !== "none"
        ) {

            visibleCases++;

        }

    });

    caseLocationCount.textContent =
        visibleCases;

}


// ==========================================
// CHECK SEARCH
// ==========================================

function matchesSearch(item) {

    if (!mapSearch) {
        return true;
    }

    const searchValue =
        mapSearch.value
            .toLowerCase()
            .trim();

    if (searchValue === "") {
        return true;
    }

    const searchableText =
        item.textContent
            .toLowerCase();

    return searchableText.includes(
        searchValue
    );

}


// ==========================================
// CHECK STATUS
// ==========================================

function matchesFilter(item) {

    if (currentFilter === "all") {
        return true;
    }

    const itemStatus =
        item
            .getAttribute("data-status")
            ?.toLowerCase();

    return itemStatus === currentFilter;

}


// ==========================================
// APPLY ALL FILTERS
// ==========================================

function applyFilters() {

    let visibleCases = 0;


    // ==========================================
    // FILTER CASE LIST
    // ==========================================

    caseItems.forEach(item => {

        const statusMatch =
            matchesFilter(item);

        const searchMatch =
            matchesSearch(item);


        if (
            statusMatch &&
            searchMatch
        ) {

            item.style.display = "";

            visibleCases++;

        } else {

            item.style.display = "none";

        }

    });


    // ==========================================
    // FILTER MAP MARKERS
    // ==========================================

    caseMarkers.forEach(marker => {

        const markerStatus =
            marker
                .getAttribute("data-status")
                ?.toLowerCase();

        const caseID =
            marker.getAttribute("data-case");


        // Find matching case item

        let matchingCase = null;

        caseItems.forEach(item => {

            if (
                item.getAttribute("data-case") ===
                caseID
            ) {

                matchingCase = item;

            }

        });


        let searchMatch = true;


        if (matchingCase) {

            searchMatch =
                matchesSearch(matchingCase);

        }


        const statusMatch =
            currentFilter === "all" ||
            markerStatus === currentFilter;


        if (
            statusMatch &&
            searchMatch
        ) {

            marker.style.display = "";

        } else {

            marker.style.display = "none";

        }

    });


    // ==========================================
    // UPDATE COUNT
    // ==========================================

    if (caseLocationCount) {

        caseLocationCount.textContent =
            visibleCases;

    }


    // ==========================================
    // CLOSE POPUP IF CASE DISAPPEARS
    // ==========================================

    if (
        mapPopup &&
        mapPopup.classList.contains("show")
    ) {

        const popupID =
            popupCase.textContent;

        const popupMarker =
            Array.from(caseMarkers).find(
                marker =>
                    marker.getAttribute(
                        "data-case"
                    ) === popupID
            );


        if (
            popupMarker &&
            popupMarker.style.display === "none"
        ) {

            closeCasePopup();

        }

    }

}


// ==========================================
// RIGHT-SIDE CASE LOCATION TABS
// ==========================================

caseLocationTabs.forEach(tab => {

    tab.addEventListener(
        "click",
        function() {


            // ==================================
            // GET SELECTED FILTER
            // ==================================

            currentFilter =
                this.getAttribute(
                    "data-filter"
                );


            // ==================================
            // UPDATE ACTIVE TAB
            // ==================================

            caseLocationTabs.forEach(button => {

                button.classList.remove(
                    "active"
                );

            });


            this.classList.add("active");


            // ==================================
            // CLEAR SELECTED CASE
            // ==================================

            selectedCaseID = null;

            caseItems.forEach(item => {

                item.classList.remove(
                    "selected"
                );

            });


            // ==================================
            // APPLY FILTER
            // ==================================

            applyFilters();

        }
    );

});


// ==========================================
// CLICK MAP MARKER
// ==========================================

caseMarkers.forEach(marker => {

    marker.addEventListener(
        "click",
        function() {


            // ==================================
            // GET CASE DATA
            // ==================================

            const caseID =
                this.getAttribute(
                    "data-case"
                );

            const location =
                this.getAttribute(
                    "data-location"
                );

            const status =
                this.getAttribute(
                    "data-status"
                );


            // ==================================
            // SAVE SELECTED CASE
            // ==================================

            selectedCaseID =
                caseID;


            // ==================================
            // SHOW POPUP
            // ==================================

            showCasePopup(
                caseID,
                location,
                status
            );


            // ==================================
            // HIGHLIGHT CASE IN LIST
            // ==================================

            caseItems.forEach(item => {

                item.classList.remove(
                    "selected"
                );


                if (
                    item.getAttribute(
                        "data-case"
                    ) === caseID
                ) {

                    item.classList.add(
                        "selected"
                    );

                }

            });

        }
    );

});


// ==========================================
// CLICK CASE FROM RIGHT PANEL
// ==========================================

caseItems.forEach(item => {

    item.addEventListener(
        "click",
        function() {


            // ==================================
            // GET CASE DATA
            // ==================================

            const caseID =
                this.getAttribute(
                    "data-case"
                );

            const location =
                this.getAttribute(
                    "data-location"
                );

            const status =
                this.getAttribute(
                    "data-status"
                );


            // ==================================
            // SAVE SELECTED CASE
            // ==================================

            selectedCaseID =
                caseID;


            // ==================================
            // HIGHLIGHT CASE
            // ==================================

            caseItems.forEach(caseItem => {

                caseItem.classList.remove(
                    "selected"
                );

            });


            this.classList.add(
                "selected"
            );


            // ==================================
            // SHOW POPUP
            // ==================================

            showCasePopup(
                caseID,
                location,
                status
            );


            // ==================================
            // FIND MARKER
            // ==================================

            const matchingMarker =
                Array.from(caseMarkers).find(
                    marker =>
                        marker.getAttribute(
                            "data-case"
                        ) === caseID
                );


            // ==================================
            // ANIMATE MARKER
            // ==================================

            if (matchingMarker) {

                matchingMarker.style.transform =
                    "translate(-50%, -50%) scale(1.4)";


                setTimeout(() => {

                    matchingMarker.style.transform =
                        "translate(-50%, -50%)";

                }, 500);

            }

        }
    );

});


// ==========================================
// VIEW CASE
// ==========================================

if (popupViewBtn) {

    popupViewBtn.addEventListener(
        "click",
        function() {

            const caseID =
                popupCase.textContent;


            alert(
                "RECONTRACE CASE\n\n" +
                "Opening investigation:\n\n" +
                caseID +
                "\n\n" +
                "The full case page will be connected here."
            );

        }
    );

}


// ==========================================
// SEARCH CASES
// ==========================================

if (mapSearch) {

    mapSearch.addEventListener(
        "input",
        function() {

            applyFilters();

        }
    );

}


// ==========================================
// MAP ZOOM
// ==========================================

let mapZoom = 1;


// ==========================================
// ZOOM IN
// ==========================================

if (zoomInBtn) {

    zoomInBtn.addEventListener(
        "click",
        function() {

            if (mapZoom < 1.6) {

                mapZoom += 0.1;

                mockMap.style.transform =
                    `scale(${mapZoom})`;

            }

        }
    );

}


// ==========================================
// ZOOM OUT
// ==========================================

if (zoomOutBtn) {

    zoomOutBtn.addEventListener(
        "click",
        function() {

            if (mapZoom > 1) {

                mapZoom -= 0.1;

                mockMap.style.transform =
                    `scale(${mapZoom})`;

            }

        }
    );

}


// ==========================================
// ESCAPE KEY
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeCasePopup();

        }

    }
);


// ==========================================
// INITIAL STATE
// ==========================================

applyFilters();


// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log(
    "RECONTRACE Map loaded successfully."
);

