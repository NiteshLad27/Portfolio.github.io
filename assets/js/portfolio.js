<script>
AOS.init({ duration: 1200 });

// Load JSON & build portfolio
fetch("assets/portfolio.json")
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById("portfolio-grid");
    const filterContainer = document.querySelector(".flex.flex-wrap.justify-center.gap-4");

    // Dynamically create filter buttons
    const allBtn = document.createElement("button");
    allBtn.className = "filter-btn bg-purple-500 text-white px-5 py-2 rounded-full shadow hover:bg-purple-600 transition";
    allBtn.setAttribute("data-filter", "all");
    allBtn.textContent = "All";
    filterContainer.appendChild(allBtn);

    data.categories.forEach(cat => {
      // Create filter button
      const btn = document.createElement("button");
      btn.className = "filter-btn bg-gray-200 text-gray-700 px-5 py-2 rounded-full shadow hover:bg-purple-600 hover:text-white transition";
      btn.setAttribute("data-filter", cat.class);
      btn.textContent = cat.name;
      filterContainer.appendChild(btn);

      // Add portfolio items
      cat.images.forEach(img => {
        if (!img.file) return; // skip if file is missing

        const filePath = cat.path + img.file.trim();
        const ext = img.file.split(".").pop().toLowerCase();

        const div = document.createElement("div");
        div.className = `portfolio-item ${cat.class} bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition`;
        div.setAttribute("data-aos", "zoom-in");

        // Images
        if (["png","jpg","jpeg","webp","gif","svg"].includes(ext)) {
          div.innerHTML = `
            <a href="${filePath}" data-lightbox="${cat.class}" data-title="${img.title}">
              <img src="${filePath}" alt="${img.title}" class="w-full h-48 object-contain bg-gray-50 p-2">
            </a>`;
        }
        // PDFs
        else if (ext === "pdf") {
          div.innerHTML = `
            <a href="${filePath}" target="_blank" data-title="${img.title}">
              <div class="flex flex-col items-center justify-center w-full h-48 border-2 border-red-500 bg-red-50 text-red-600 p-4 hover:bg-red-100 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 2a2 2 0 00-2 2v16c0 1.1.9 2 2 2h12a2 2 0 002-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/>
                  <text x="6" y="20" font-size="8" font-weight="bold" fill="red">PDF</text>
                </svg>
                <span class="text-sm font-semibold text-red-700">${img.title}</span>
              </div>
            </a>`;
        }

        grid.appendChild(div);
      });
    });

    // Filter functionality
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");
        const items = document.querySelectorAll(".portfolio-item");

        // Active button styling
        buttons.forEach(b => b.classList.remove("bg-purple-500","text-white"));
        buttons.forEach(b => b.classList.add("bg-gray-200","text-gray-700"));
        btn.classList.add("bg-purple-500","text-white");
        btn.classList.remove("bg-gray-200","text-gray-700");

        // Show/hide items
        items.forEach(item => {
          if(filter === 'all' || item.classList.contains(filter)) {
            item.classList.remove("hidden");
          } else {
            item.classList.add("hidden");
          }
        });
      });
    });

    // Initialize Lightbox
    if(window.lightbox) {
      lightbox.option({ 'resizeDuration': 200, 'wrapAround': true });
    }
  })
  .catch(err => console.error("Error loading portfolio:", err));
</script>
