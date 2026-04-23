// Search function available on all pages
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");

  if (!form || !input) return; // do nothing

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim().toLowerCase();

    if (query) {
      // Determine if we are already in the pages folder
      const isSubfolder = window.location.pathname.includes('/pages/');
      const target = isSubfolder ? 'collection.html' : 'pages/collection.html';
      window.location.href = `${target}?search=${encodeURIComponent(query)}`;
    }
  });
});
