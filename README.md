# Portfolio — HTML, CSS, Vanilla JavaScript

Prosty, statyczny projekt portfolio skierowany do agencji szukających podwykonawcy.

## Struktura

```text
krzysztof-portfolio/
├── index.html
├── work.html
├── about.html
├── contact.html
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   ├── content.js
    │   └── main.js
    └── images/
```

## Najważniejsze miejsca do edycji

### Treść i tłumaczenia

Edytuj:

```text
assets/js/content.js
```

W tym pliku znajdują się:

- wszystkie teksty angielskie, norweskie i polskie;
- dane projektów;
- technologie;
- linki do wersji live i GitHub;
- ścieżki do grafik projektów.

### Kolory, odstępy i styl

Edytuj zmienne na początku:

```text
assets/css/styles.css
```

Najważniejsze zmienne:

```css
--accent
--page-bg
--surface
--surface-muted
--text
--text-muted
--border
--container
```

### Zdjęcia

Podmień:

```text
assets/images/profile-home-placeholder.svg
assets/images/profile-about-placeholder.svg
```

Najlepiej użyć plików:

```text
profile-home.webp
profile-about.webp
```

Po zmianie nazw popraw ścieżki w:

```text
index.html
about.html
```

Efekt rozmytych krawędzi jest realizowany w CSS przez `mask-image`.

### Linki

Zmień:

```text
hello@yourdomain.no
linkedin.com/in/your-profile
github.com/your-profile
```

Linki do projektów znajdują się w `assets/js/content.js`.

## Uruchomienie

Projekt można otworzyć bezpośrednio przez `index.html`.

Dla poprawnego testowania zalecany jest lokalny serwer, np. rozszerzenie Live Server w VS Code.

## Formularz

Formularz otwiera lokalny program pocztowy przez `mailto:`.

Aby wysyłać wiadomości bezpośrednio z witryny, później można podłączyć:

- Formspree;
- Netlify Forms;
- własny endpoint;
- Supabase Edge Function.

## Dodawanie nowego projektu

W `assets/js/content.js` skopiuj jeden obiekt z tablicy `projects` i zmień:

- `id`;
- `number`;
- `year`;
- `image`;
- `stack`;
- `links`;
- teksty `en`, `no` i `pl`.

Karta projektu pojawi się automatycznie na stronie `work.html`.
