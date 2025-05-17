let notesData = {};

fetch('data/notes.json')
  .then(res => res.json())
  .then(data => notesData = data)
  .catch(err => console.error('Failed to load notes:', err));

function loadSubject(subject) {
  document.getElementById('subject-title').textContent = subject;
  const topics = notesData[subject] || [];

  const list = document.getElementById('topic-list');
  list.innerHTML = '';
  topics.forEach(topic => {
    const li = document.createElement('li');
    li.textContent = topic.title;
    li.onclick = () => showNote(topic.content);
    list.appendChild(li);
  });

  document.getElementById('note-content').textContent = 'Select a topic to view notes.';
}

function showNote(content) {
  document.getElementById('note-content').textContent = content;
}
