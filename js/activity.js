// =========================================
// RECONTRACE - ACTIVITY PAGE
// =========================================

const activitySearch = document.getElementById("activitySearch");
const activityTabs = document.querySelectorAll(".activity-tab");
const activityEvents = document.querySelectorAll(".activity-event");
const activityCount = document.getElementById("activityCount");
const noActivity = document.getElementById("noActivity");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");

let currentFilter = "all";


// =========================================
// APPLY FILTERS
// =========================================

function applyFilters() {

    const searchTerm = activitySearch.value
        .trim()
        .toLowerCase();

    let visibleCount = 0;

    activityEvents.forEach(event => {

        const category = event.dataset.category;
        const searchableText = event.dataset.search.toLowerCase();

        const matchesCategory =
            currentFilter === "all" ||
            category === currentFilter;

        const matchesSearch =
            searchTerm === "" ||
            searchableText.includes(searchTerm);

        if (matchesCategory && matchesSearch) {

            event.classList.remove("hidden");
            visibleCount++;

        } else {

            event.classList.add("hidden");

        }

    });


    // Update count
    activityCount.textContent =
        `${visibleCount} ${visibleCount === 1 ? "event" : "events"}`;


    // Show / hide empty state
    if (visibleCount === 0) {

        noActivity.classList.add("visible");

    } else {

        noActivity.classList.remove("visible");

    }

}


// =========================================
// TAB FILTERING
// =========================================

activityTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        activityTabs.forEach(item => {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        currentFilter = tab.dataset.filter;

        applyFilters();

    });

});


// =========================================
// SEARCH
// =========================================

activitySearch.addEventListener("input", () => {

    applyFilters();

});


// =========================================
// CLEAR FILTERS
// =========================================

clearFiltersBtn.addEventListener("click", () => {

    activitySearch.value = "";

    currentFilter = "all";

    activityTabs.forEach(tab => {

        tab.classList.remove("active");

    });

    document
        .querySelector('.activity-tab[data-filter="all"]')
        .classList.add("active");

    applyFilters();

});


// =========================================
// INITIAL LOAD
// =========================================

applyFilters();

console.log("RECONTRACE Activity loaded successfully.");