# Gene Expression and Variant Explorer Web Application

## Overview

This web application provides interactive tools for exploring gene expression data and genetic variants. It features:

- A **Landing Page** with navigation and subscription form.
- An **Expression Viewer** to visualize gene expression levels across conditions.
- A **Variant Explorer** to browse and annotate genetic variants from VCF files.
- Dark mode toggle and responsive design for mobile and desktop.

The app is built with **vanilla JavaScript**, styled using **Tailwind CSS**, and uses **Chart.js** for data visualization.

---

## Features

### Landing Page

- Navigation menu (desktop and mobile).
- Call-to-action button to start exploring.
- Subscription form for updates.

### Expression Viewer

- Input gene symbol with autocomplete suggestions.
- Select conditions (Healthy, Cancer, Treated) to display expression data.
- Interactive bar chart showing expression levels.
- Responsive and accessible UI.

### Variant Explorer

- Upload VCF files (only `.vcf` accepted).
- Filter variants by impact (High, Moderate, Low, All).
- Paginated table displaying variant details.
- Sortable columns (Chromosome, Position).
- Annotate variants with modal popup.
- Remove selected file option.
- Responsive design and dark mode support.

---

## Technologies Used

- **Tailwind CSS** for utility-first styling.
- **Vanilla JavaScript** for DOM manipulation and interactivity.
- **Chart.js** for rendering expression bar charts.
- HTML5 and CSS3 for structure and styling.

---

## Setup and Usage

1. Clone or download the repository.

2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge).

3. Navigate through the sections using the menu or buttons.

4. In the Expression Viewer:
   - Enter a gene symbol (e.g., TP53, BRCA1).
   - Select conditions to view expression data.
   - Click "Update Chart" to refresh the visualization.

5. In the Variant Explorer:
   - Upload a `.vcf` file using the file input.
   - Use the "Remove File" button to clear the selection.
   - Filter variants by impact using the dropdown.
   - Click "Load Variants" to display mock variant data.
   - Sort columns by clicking on "Chromosome" or "Position" headers.
   - Click "Annotate" to view variant annotation details.

6. Toggle dark mode using the moon/sun icon in the header.

---

## File Structure

- `index.html` — Main HTML file with all sections.
- `js/app.js` — JavaScript logic for navigation, charts, variant table, and interactivity.
- `css/` — Tailwind CSS included via CDN or build (if applicable).
- `README.md` — This documentation file.

---

## Notes

- Variant loading currently uses mock data; integration with real VCF parsing can be added.
- Gene expression data is mocked for demonstration.
- The app is fully client-side and requires no backend.

---

## License

This project is open source and free to use under the MIT License.

---

## Contact

For questions or feedback, please contact me throught my email: Zubairbabadar6@gmail.com.

---

*Thank you for using the Gene Expression and Variant Explorer!*