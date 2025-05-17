let notesData = {};

fetch('data/notes.json')
  .then(res => res.json())
  .then(data => notesData = data)
  .catch(err => {
    console.error('Error loading notes:', err);
    document.getElementById('note-content').textContent = 'Failed to load notes.';
  });

function loadSubject(subject) {
  const title = document.getElementById('subject-title');
  const container = document.getElementById('topic-container');
  const noteContent = document.getElementById('note-content');

  title.textContent = subject;
  noteContent.classList.add('hidden');
  container.innerHTML = '';

  const topics = notesData[subject] || [];

  topics.forEach(topic => {
    const div = document.createElement('div');
    div.className = 'topic-item';
    div.textContent = topic.title;
    div.onclick = () => {
      container.innerHTML = '';
      noteContent.classList.remove('hidden');
      noteContent.textContent = topic.content;
    };
    container.appendChild(div);
  });
}
