const toggleBtn = document.getElementById("theme-toggle");
const themes = ["light", "dark", "sepia"];
let currentThemeIndex = themes.indexOf(localStorage.getItem("theme")) || 0;

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateButtonLabel(theme);
}

function updateButtonLabel(theme) {
  const icons = {
    light: "☀️",
    dark: "🌙",
    sepia: "📜",
  };
  toggleBtn.textContent = icons[theme] || "🌓";
}

// Initiales Theme setzen
const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)",
).matches;

if (savedTheme) {
  applyTheme(savedTheme);
} else if (systemPrefersDark) {
  applyTheme("dark");
} else {
  applyTheme("light");
}

// Toggle durch Klicken
toggleBtn.addEventListener("click", () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  applyTheme(themes[currentThemeIndex]);
});
