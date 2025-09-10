fetch("assets/portfolio.json")
  .then(res => res.json())
  .then(data => {
    const portfolioGrid = document.getElementById("portfolio-grid");

    data.categories.forEach(category => {
      category.images.forEach(image => {
        const filePath = `${category.path}${image.file}`;
        const ext = image.file.split(".").pop().toLowerCase();

        const div = document.createElement("div");
        div.className = `portfolio-item ${category.class} bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition`;
        div.setAttribute("data-aos", "zoom-in");

        // If it's an image
        if (["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext)) {
          div.innerHTML = `
            <a href="${filePath}" data-lightbox="${category.class}" data-title="${image.title}">
              <img src="${filePath}" alt="${image.title}" class="w-full h-48 object-contain bg-gray-50 p-2">
            </a>
          `;
        }
        // If it's a PDF
        else if (ext === "pdf") {
          div.innerHTML = `
            <a href="${filePath}" target="_blank" data-title="${image.title}">
              <div class="flex flex-col items-center justify-center w-full h-48 border-2 border-red-500 bg-red-50 text-red-600 p-4 hover:bg-red-100 transition">
                <!-- PDF Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 2a2 2 0 00-2 2v16c0 1.1.9 2 2 2h12a2 
                    2 0 002-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/>
                  <text x="6" y="20" font-size="8" font-weight="bold" fill="red">PDF</text>
                </svg>
                <span class="text-sm font-semibold text-red-700">${image.title}</span>
              </div>
            </a>
          `;
        }

        portfolioGrid.appendChild(div);
      });
    });
  })
  .catch(err => console.error("Error loading portfolio:", err));
