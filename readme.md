# 🌓 Modernes Theme Button für Webseiten

Ein Theme-Button mit **Light**, **Dark**, **Sepia** – vollständig in reinem HTML/CSS/JS, ohne Frameworks.  
Unterstützt **automatische Erkennung der Systemeinstellung** (`prefers-color-scheme`) **und manuellen Toggle** mit persistenter Speicherung.

> ✅ **Features**
> - 🎨 Themes über `data-theme`-Attribut
> - 💾 Speicherung der Nutzerwahl in `localStorage`
> - 🌐 Respektiert System-Theme (wenn kein manuelles Theme gewählt)
> - 🎯 Farben in **OKLCH** (wahrnehmungslinear, moderner Standard)
> - 🔌 Leicht erweiterbar um neue Themes
> - ♿ Zugänglich (ausreichender Kontrast, sanfte Übergänge)

---

## 📁 Dateistruktur

```
.  
└── project/  
    ├── css/  
    │   └── style.css  
    ├── js/  
    │   └── theme_switcher.js  
    └── index.html
```

## 🎨 CSS: Theme-System mit OKLCH

Alle Farben werden **ausschließlich in OKLCH** definiert – dem modernen Farbraum des [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/).  
Vorteile:

- **Wahrnehmungslinear**: `L` (Lightness) entspricht menschlicher Helligkeitswahrnehmung → perfekt für Dark/Light-Themes.
- **Intuitive Steuerung**: `C` (Chroma = Sättigung), `H` (Hue = Farbton).
- **Zukunftssicher**: Standard in modernen Browsers (Chrome 111+, Firefox 111+, Safari 16.4+).

### 🔧 Struktur

```css
/* 1. Logische Variablen – IMMER gleich */
:root {
  --bg: var(--theme-bg);
  --text: var(--theme-text);
  --accent: var(--theme-accent);
  --card-bg: var(--theme-card-bg);
  --border: var(--theme-border);
}

/* 2. LIGHT THEME (Standard) */
:root {
  --theme-bg: oklch(100% 0 0);
  --theme-text: oklch(15% 0 0);
  --theme-accent: oklch(55% 0.25 250);
  --theme-card-bg: oklch(98% 0 0);
  --theme-border: oklch(90% 0 0);
}

/* 3. DARK THEME */
:root[data-theme="dark"] {
  --theme-bg: oklch(12% 0 0);
  --theme-text: oklch(96% 0 0);
  --theme-accent: oklch(70% 0.22 240);
  --theme-card-bg: oklch(16% 0 0);
  --theme-border: oklch(25% 0 0);
}

/* 4. SEPIA THEME */
:root[data-theme="sepia"] {
  --theme-bg: oklch(96% 0.03 70);
  --theme-text: oklch(30% 0.05 70);
  --theme-accent: oklch(60% 0.12 60);
  --theme-card-bg: oklch(99% 0.02 70);
  --theme-border: oklch(85% 0.04 70);
}

/* 5. MONOKAI THEME */
:root[data-theme="monokai"] {
  --theme-bg: oklch(14% 0.02 100);
  --theme-text: oklch(97% 0.01 100);
  --theme-accent: oklch(78% 0.24 140);
  --theme-card-bg: oklch(20% 0.03 100);
  --theme-border: oklch(30% 0.04 100);
}

/* 6. AUTOMATISCHES DARK (nur wenn kein manuelles Theme gesetzt) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --theme-bg: oklch(12% 0 0);
    --theme-text: oklch(96% 0 0);
    --theme-accent: oklch(70% 0.22 240);
    --theme-card-bg: oklch(16% 0 0);
    --theme-border: oklch(25% 0 0);
  }
}

/* 7. GLOBALE STYLES – NUR logische Variablen nutzen! */
body {
  background-color: var(--bg);
  color: var(--text);
  transition: background-color 0.3s, color 0.3s;
}
```

> 💡 **Tipp**: Füge neue Themes einfach als neuen Block mit `:root[data-theme="mein-theme"]` hinzu.

---

## ⚙️ JavaScript: Theme-Toggle mit Persistenz

Der Toggle-Button wechselt zyklisch durch alle verfügbaren Themes und speichert die Wahl in `localStorage`.

### 📜 Beispiel-Code (`script.js`)

```js
// Verfügbare Themes – Reihenfolge = Toggle-Reihenfolge
const THEMES = ['light', 'dark', 'sepia', 'monokai'];

// DOM-Element
const toggleBtn = document.getElementById('theme-toggle');

// Aktuelles Theme ermitteln (LocalStorage > System > Light)
function getCurrentTheme() {
  const saved = localStorage.getItem('theme');
  if (saved && THEMES.includes(saved)) return saved;

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

// Theme anwenden
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateToggleIcon(theme);
}

// Toggle-Icon aktualisieren (optional)
function updateToggleIcon(theme) {
  const icons = {
    light: '☀️',
    dark: '🌙',
    sepia: '📜',
    // monokai: '💻' // beispiel für neues theme
  };
  toggleBtn.textContent = icons[theme] || '🌓';
}

// Initialisierung
const initialTheme = getCurrentTheme();
applyTheme(initialTheme);

// Toggle-Event
toggleBtn.addEventListener('click', () => {
  const currentIndex = THEMES.indexOf(localStorage.getItem('theme') || 'light');
  const nextIndex = (currentIndex + 1) % THEMES.length;
  applyTheme(THEMES[nextIndex]);
});
```

> 🛠️ Anpassungshinweis: Füge neue Themes zur **THEMES-Array** hinzu.  
> Passe **icons** an, um passende Emojis/SVGs zu nutzen.


## 🧪 Browser-Unterstützung

| FEATURES               | Browser-unterstützung                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| `prefers-color-scheme` | [Global >95%](https://caniuse.com/prefers-color-scheme)                                             |
| OKLCH                  | Chrome 111+, Firefox 111+, Safari 16.4+ ([caniuse](https://caniuse.com/mdn-css_types_color_oklch) ) |
| `localStorage`         | [Global >97%](https://caniuse.com/localstorage)                                                     |

> ⚠️ **Legacy-Browser?**  
> Falls nötig, füge einen Fallback mit `@supports` hinzu:

```css
:root { --theme-bg: #ffffff; }
@supports (color: oklch(0% 0 0)) {
	:root { --theme-bg: oklch(100% 0 0);
}
```

## 🧩 Erweiterbarkeit

### Neue Themes hinzufügen

1. Füge einen neuen CSS-Block hinzu:

```css
:root[data-theme="neon"] {
  --theme-bg: oklch(10% 0.2 300);
  /* ... */
}
```

2. Ergänze `"neon"` in der `THEMES`-Array in `script.js`.
3. (Optional) Füge ein Icon in `updateToggleIcon()` hinzu.

### Weitere Farbvariablen

Füge in allen Theme-Blöcken neue `--theme-*`-Variablen hinzu, z.B.:

```css
--theme-shadow: oklch(0% 0 0 / 0.2);
--theme-success: oklch(70% 0.2 140);
```

Und nutze sie logisch:

```css
:root { --shadow: var(--theme-shadow); }
.card { box-shadow: 0 4px 12px var(--shadow); }
```

