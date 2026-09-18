// =========================================
// RECONTRACE - GLOBAL THEME
// =========================================

const savedTheme = localStorage.getItem("recontraceTheme") || "dark";

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
}