let notesData = {};
let currentSubject = "";
let filteredTopics = [];

fetch('data/notes.json')
  .then(res => res.json())
  .then(data => notesData = data)
  .catch(err => {
    console.error('Error loading notes:', err);
    document.getElementById('note-content').textContent = 'Failed to load notes.';
  });

function loadSubject(subject) {
  currentSubject = subject;
  const title = document.getElementById('subject-title');
  const container = document.getElementById('topic-container');
  const noteContent = document.getElementById('note-content');
  const searchBox = document.getElementById('search-box');

  title.textContent = subject;
  noteContent.classList.add('hidden');
  searchBox.classList.remove('hidden');
  container.innerHTML = '';

  filteredTopics = notesData[subject] || [];

  renderTopics();
}

function renderTopics() {
  const container = document.getElementById('topic-container');
  container.innerHTML = '';

  filteredTopics.forEach(topic => {
    const div = document.createElement('div');
    div.className = 'topic-item';
    div.textContent = topic.title;
    div.onclick = () => {
      container.innerHTML = '';
      document.getElementById('note-content').classList.remove('hidden');
      document.getElementById('note-content').textContent = topic.content;
      document.getElementById('search-box').classList.add('hidden');
    };
    container.appendChild(div);
  });

  if (filteredTopics.length === 0) {
    container.innerHTML = "<p>No topics found.</p>";
  }
}

function filterTopics() {
  const input = document.getElementById('search-input').value.toLowerCase();
  const allTopics = notesData[currentSubject] || [];
  filteredTopics = allTopics.filter(topic =>
    topic.title.toLowerCase().includes(input)
  );
  renderTopics();
}
