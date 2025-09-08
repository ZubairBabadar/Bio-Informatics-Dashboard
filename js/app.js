document.addEventListener('DOMContentLoaded', () => {
  // Section Navigation
  const sections = ['landing', 'expression', 'variant'];
  function showSection(sectionId) {
    sections.forEach(sec => {
      document.getElementById(sec + '-section').classList.add('hidden');
    });
    document.getElementById(sectionId + '-section').classList.remove('hidden');
  }
  document.getElementById('nav-home').addEventListener('click', () => showSection('landing'));
  document.getElementById('nav-expression').addEventListener('click', () => showSection('expression'));
  document.getElementById('nav-variant').addEventListener('click', () => showSection('variant'));
  document.getElementById('nav-about').addEventListener('click', () => showSection('landing'));
  // Mobile nav
  document.getElementById('nav-home-mobile').addEventListener('click', () => { showSection('landing'); document.getElementById('mobile-menu').classList.add('hidden'); });
  document.getElementById('nav-expression-mobile').addEventListener('click', () => { showSection('expression'); document.getElementById('mobile-menu').classList.add('hidden'); });
  document.getElementById('nav-variant-mobile').addEventListener('click', () => { showSection('variant'); document.getElementById('mobile-menu').classList.add('hidden'); });
  document.getElementById('nav-about-mobile').addEventListener('click', () => { showSection('landing'); document.getElementById('mobile-menu').classList.add('hidden'); });
  document.getElementById('cta-start').addEventListener('click', () => showSection('expression'));

  // Mobile menu toggle
  document.getElementById('mobile-menu-button').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
  });

  // Dark mode toggle
  const htmlRoot = document.getElementById('html-root');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  darkModeToggle.addEventListener('click', () => {
    htmlRoot.classList.toggle('dark');
    document.getElementById('dark-icon').classList.toggle('hidden');
    document.getElementById('light-icon').classList.toggle('hidden');
  });

  document.addEventListener("DOMContentLoaded", () => {
  const htmlRoot = document.getElementById("html-root");
  const toggleBtn = document.getElementById("dark-mode-toggle");
  const darkIcon = document.getElementById("dark-icon");
  const lightIcon = document.getElementById("light-icon");

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    htmlRoot.classList.add("dark");
    darkIcon.classList.add("hidden");
    lightIcon.classList.remove("hidden");
  }

  toggleBtn.addEventListener("click", () => {
    htmlRoot.classList.toggle("dark");

    if (htmlRoot.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      darkIcon.classList.add("hidden");
      lightIcon.classList.remove("hidden");
    } else {
      localStorage.setItem("theme", "light");
      lightIcon.classList.add("hidden");
      darkIcon.classList.remove("hidden");
    }
  });
});


  // Subscribe form
  document.getElementById('subscribe-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    e.target.reset();
  });

  // Expression Viewer Functionality
  const geneExpressionData = {
    TP53: [2.5, 4.2, 3.8],
    BRCA1: [3.1, 2.8, 4.0],
    EGFR: [1.5, 3.3, 2.2],
    MYC: [4.5, 3.9, 5.1]
  };
  let expressionChart = new Chart(document.getElementById('expression-chart'), {
    type: 'bar',
    data: {
      labels: ['Healthy', 'Cancer', 'Treated'],
      datasets: [{
        label: 'Gene Expression',
        data: geneExpressionData['TP53'],
        backgroundColor: ['rgba(99, 132, 255, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)'],
        borderColor: ['rgba(99, 132, 255, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  const geneInput = document.getElementById('gene-input');

  // Update gene suggestions
  geneInput.addEventListener('input', () => {
    const suggestions = document.getElementById('gene-suggestions');
    const value = geneInput.value.toLowerCase();
    const mockGenes = Object.keys(geneExpressionData);
    const filtered = mockGenes.filter(g => g.toLowerCase().includes(value));
    if (filtered.length > 0 && value) {
      suggestions.innerHTML = filtered.map(g => `<div class="p-1 hover:bg-indigo-100 dark:hover:bg-indigo-800 cursor-pointer">${g}</div>`).join('');
      suggestions.classList.remove('hidden');
      Array.from(suggestions.children).forEach(child => {
        child.addEventListener('click', () => {
          geneInput.value = child.textContent;
          suggestions.classList.add('hidden');
          updateExpressionChart(); // Update chart on selection
        });
      });
    } else {
      suggestions.classList.add('hidden');
    }
  });

  // Condition checkboxes
  const conditionCheckboxes = document.querySelectorAll('#expression-section input[type="checkbox"]');
  function updateExpressionChart() {
    const selectedConditions = Array.from(conditionCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    const gene = geneInput.value.toUpperCase();
    if (!geneExpressionData[gene]) {
      alert(`No expression data found for gene: ${gene}. Please enter a valid gene.`);
      return;
    }

    // Map conditions to indices
    const conditionMap = { healthy: 0, cancer: 1, treated: 2 };
    const data = selectedConditions.map(cond => geneExpressionData[gene][conditionMap[cond]]);
    const labels = selectedConditions.map(c => c.charAt(0).toUpperCase() + c.slice(1));

    expressionChart.data.labels = labels;
    expressionChart.data.datasets[0].data = data;
    expressionChart.update();
  }

  // Attach event listeners for checkboxes and button
  conditionCheckboxes.forEach(cb => cb.addEventListener('change', updateExpressionChart));
  document.getElementById('update-chart').addEventListener('click', updateExpressionChart);

  // Variant Explorer Functionality
  let variantData = [
    { chr: '1', pos: 123456, ref: 'A', alt: 'G', impact: 'High', gene: 'TP53' },
    { chr: '2', pos: 789012, ref: 'C', alt: 'T', impact: 'Moderate', gene: 'BRCA1' },
    { chr: '3', pos: 345678, ref: 'G', alt: 'A', impact: 'Low', gene: 'EGFR' }
  ];
  let filteredData = variantData;
  let currentPage = 1;
  const rowsPerPage = 5;

  function renderTable() {
    const tbody = document.getElementById('variant-body');
    tbody.innerHTML = '';
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = filteredData.slice(start, end);
    pageData.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="p-2 border border-gray-300 dark:border-gray-600">${row.chr}</td>
        <td class="p-2 border border-gray-300 dark:border-gray-600">${row.pos}</td>
        <td class="p-2 border border-gray-300 dark:border-gray-600">${row.ref}</td>
        <td class="p-2 border border-gray-300 dark:border-gray-600">${row.alt}</td>
        <td class="p-2 border border-gray-300 dark:border-gray-600">${row.impact}</td>
        <td class="p-2 border border-gray-300 dark:border-gray-600">${row.gene}</td>
        <td class="p-2 border border-gray-300 dark:border-gray-600"><button class="annotate-btn bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-2 rounded">Annotate</button></td>
      `;
      tbody.appendChild(tr);
    });
    document.querySelectorAll('.annotate-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('modal').classList.remove('hidden');
        document.getElementById('modal-content').textContent = 'This variant has been annotated with functional impact and pathogenicity scores.';
      });
    });
  }

  function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      btn.classList.add('px-3', 'py-1', 'border', 'border-gray-300', 'dark:border-gray-600', 'rounded', 'hover:bg-indigo-100', 'dark:hover:bg-indigo-800');
      if (i === currentPage) btn.classList.add('bg-indigo-600', 'text-white');
      btn.addEventListener('click', () => {
        currentPage = i;
        renderTable();
        renderPagination();
      });
      pagination.appendChild(btn);
    }
  }

  // File input and remove file button
  const vcfFileInput = document.getElementById('vcf-file');
  const removeFileBtn = document.getElementById('remove-file');

  removeFileBtn.addEventListener('click', () => {
    vcfFileInput.value = ''; // Clear selected file
  });

  document.getElementById('load-variants').addEventListener('click', () => {
    const file = vcfFileInput.files[0];
    if (!file) {
      alert('Please select a VCF file before loading variants.');
      return;
    }
    if (!file.name.toLowerCase().endsWith('.vcf')) {
      alert('Invalid file type. Please select a VCF file.');
      return;
    }
    alert('Variants loaded (mock data).');
    renderTable();
    renderPagination();
  });

  document.getElementById('impact-filter').addEventListener('change', (e) => {
    const filter = e.target.value;
    filteredData = filter === 'All' ? variantData : variantData.filter(v => v.impact === filter);
    currentPage = 1;
    renderTable();
    renderPagination();
  });

  document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
  });

  renderTable();
  renderPagination();

  // Add sorting event listeners to headers (only first two columns)
  const headers = document.querySelectorAll('#variant-table thead th');
  headers.forEach((th, index) => {
    if (index >= 2) return; // Only first two columns sortable
    th.style.cursor = 'pointer';
    th.addEventListener('click', () => {
      sortTable(index);
    });
  });
});

// Expose sortTable globally for inline calls if any remain
window.sortTable = function(column) {
  const tbody = document.getElementById('variant-body');
  const rows = Array.from(tbody.rows);
  const asc = tbody.getAttribute('data-sort-asc') === 'true';
  rows.sort((a, b) => {
    const aValue = a.cells[column].textContent.trim();
    const bValue = b.cells[column].textContent.trim();
    if (!isNaN(aValue) && !isNaN(bValue)) {
      return asc ? aValue - bValue : bValue - aValue;
    }
    return asc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
  });
  rows.forEach(row => tbody.appendChild(row));
  tbody.setAttribute('data-sort-asc', !asc);
};