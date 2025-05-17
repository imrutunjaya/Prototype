document.addEventListener("DOMContentLoaded", function () {
  const topicContainer = document.getElementById("topic-container");
  const noteContent = document.getElementById("note-content");
  const searchInput = document.getElementById("search-input");

  fetch("notes.json")
    .then((response) => response.json())
    .then((data) => {
      topicContainer.innerHTML = "";
      if (data && data.notes && data.notes.length) {
        data.notes.forEach((note, index) => {
          const div = document.createElement("div");
          div.className = "topic-item";
          div.textContent = `${index + 1}. ${note.title}`;
          div.addEventListener("click", () => {
            noteContent.classList.remove("hidden");
            noteContent.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
          });
          topicContainer.appendChild(div);
        });
      } else {
        topicContainer.innerHTML = "<p>No notes available.</p>";
      }
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
      topicContainer.innerHTML = "<p>Failed to load notes.</p>";
    });

  searchInput.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();
    const topicItems = document.querySelectorAll(".topic-item");
    topicItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(searchValue) ? "block" : "none";
    });
  });

  // Navigation buttons
  document.getElementById("advanced-btn").addEventListener("click", () => {
    window.location.href = "https://imrutunjaya.github.io/Prototype3/";
  });

  document.getElementById("annotation-btn").addEventListener("click", () => {
    window.location.href = "https://imrutunjaya.github.io/notes/";
  });
});
