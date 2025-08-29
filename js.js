const filtersData = [
    {
        id: "brand",
        title: "BRAND",
        options: ["Samsung", "Apple", "Realme","Oneplus","Vivo"]
    },
    {
        id: "price",
        title: "PRICE",
        options: ["Under ₹10,000", "₹10,000 - ₹20,000", "₹20,000 - ₹30,000","₹30,000 - ₹40,000","Above ₹40,000"]
    },
    {
        id: "customerRatings",
        title: "CUSTOMER RATINGS",
        options: ["4★ & above", "3★ & above", "2★ & above","1★ & above"]
    }
];

function renderFilters() {
    const container = document.getElementById("filters-container");
    filtersData.forEach(filter => {
        const section = document.createElement("div");
        section.className = "filter-section";
         section.innerHTML = `
      <div class="filter-header" onclick="toggleFilter('${filter.id}')">
        <span>${filter.title}</span>
        <span class="arrow" id="arrow-${filter.id}">&#9650;</span>
      </div>
      <div class="filter-content" id="${filter.id}">
        ${filter.options.map(opt => `
          <label><input type="checkbox"> ${opt}</label>
        `).join('')}
      </div>
    `;
    container.appendChild(section);
  });
}

renderFilters();

function toggleFilter(id) {
    const content = document.getElementById(id);
    const arrow = document.getElementById("arrow-" + id);
    if (content.style.display === "none") {
        content.style.display = "block";
        arrow.style.transform = "rotate(0deg)";
    }
    else {
        content.style.display = "none";
        arrow.style.transform = "rotate(180deg)";
    }
}


function searchFilter(input, id) {
    const searchValue = input.value.toLowerCase();
    const section = document.getElementById(id);
    const labels = section.querySelectorAll('label');
    labels.forEach(label => {
        const text = label.innerText.toLowerCase();
        label.style.display = text.includes(searchValue) ? 'block' : 'none';
    });
}




document.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        updateSelectedFilters();
    }
});

function updateSelectedFilters() {
    const selected = [];
    document.querySelectorAll('.filter-content input:checked').forEach(input => {
        selected.push(input.parentNode.textContent.trim());
    });

     const container = document.getElementById('selected-filters');
  container.innerHTML = selected.map(item => `
    <span class="selected-tag">${item} <button onclick="removeFilter('${item}')">x</button></span>
  `).join('');
}

function removeFilter(label) {
  document.querySelectorAll('.filter-content label').forEach(lbl => {
    if (lbl.textContent.trim() === label) {
      lbl.querySelector('input').checked = false;
    }
  });
  updateSelectedFilters();
}




function toggleFilter() {
    const content = document.getElementById("filterContent");
    const arrow = document.getElementById("arrow");

    if (content.classList.contains("hidden")) {
        content.classList.remove("hidden");
        arrow.textContent = "▲";
    } 
    else {
        content.classList.add("hidden"); 
        arrow.textContent = "▼";
    }
  }