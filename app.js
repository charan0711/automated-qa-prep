// State
let currentPage = 'home';
let fcCards = [], fcIndex = 0, fcFlipped = false;
let quizQuestions = [], quizIndex = 0, quizScore = 0, quizCount = 10, quizTopic = 'all', quizAnswered = false;
let progress = JSON.parse(localStorage.getItem('qa_progress') || '{}');

// Navigation
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  const navBtn = document.querySelector('[data-page="' + page + '"]');
  if (navBtn) navBtn.classList.add('active');
  currentPage = page;
  if (page === 'study') renderStudy();
  if (page === 'flashcards') initFlashcards();
  if (page === 'quiz') initQuiz();
  if (page === 'progress') renderProgress();
  window.scrollTo(0, 0);
}

// STUDY
function renderStudy() {
  document.getElementById('foundation-topics').innerHTML = TOPICS.foundation.map(t => topicItem(t)).join('');
  document.getElementById('tools-topics').innerHTML = TOPICS.tools.map(t => topicItem(t)).join('');
  document.getElementById('advanced-topics').innerHTML = TOPICS.advanced.map(t => topicItem(t)).join('');
}

function topicItem(t) {
  const done = progress[t.id] ? '✅' : '›';
  const doneClass = progress[t.id] ? 'topic-done' : 'topic-arrow';
  return `<div class="topic-item" onclick="openTopic('${t.id}')">
    <div class="topic-item-left">
      <span class="topic-name">${t.icon} ${t.name}</span>
      <span class="topic-meta">${t.desc}</span>
    </div>
    <span class="${doneClass}">${done}</span>
  </div>`;
}

function openTopic(id) {
  const allTopics = [...TOPICS.foundation, ...TOPICS.tools, ...TOPICS.advanced];
  const topic = allTopics.find(t => t.id === id);
  const content = TOPIC_CONTENT[id];
  if (!content) return;
  document.getElementById('topic-title').textContent = topic.icon + ' ' + topic.name;
  document.getElementById('topic-content').innerHTML = renderTopicContent(content);
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-topic').classList.add('active');
  progress[id] = true;
  localStorage.setItem('qa_progress', JSON.stringify(progress));
  window.scrollTo(0, 0);
}

function renderTopicContent(content) {
  return content.sections.map(s => {
    let html = `<div class="content-section"><h3>${s.heading}</h3><p>${s.body}</p>`;
    if (s.terms) {
      html += s.terms.map(t => `<div class="key-term"><strong>${t.term}</strong><span>${t.def}</span></div>`).join('');
    }
    if (s.code) html += `<div class="code-block"><pre>${s.code}</pre></div>`;
    if (s.tip) html += `<div class="tip-box"><p>💡 ${s.tip}</p></div>`;
    if (s.warn) html += `<div class="warn-box"><p>⚠️ ${s.warn}</p></div>`;
    html += '</div>';
    return html;
  }).join('');
}

// FLASHCARDS
function initFlashcards() {
  const sel = document.getElementById('fc-topic-select');
  sel.innerHTML = '<option value="all">All Topics</option>';
  [...TOPICS.foundation, ...TOPICS.tools, ...TOPICS.advanced].forEach(t => {
    sel.innerHTML += `<option value="${t.id}">${t.icon} ${t.name}</option>`;
  });
  loadFlashcards();
}

function loadFlashcards() {
  const topic = document.getElementById('fc-topic-select').value;
  fcCards = topic === 'all' ? [...FLASHCARDS] : FLASHCARDS.filter(c => c.topic === topic);
  fcCards = shuffle(fcCards);
  fcIndex = 0; fcFlipped = false;
  showCard();
}

function showCard() {
  if (!fcCards.length) return;
  const card = fcCards[fcIndex];
  document.getElementById('fc-front').textContent = card.q;
  document.getElementById('fc-back').textContent = card.a;
  document.getElementById('fc-current').textContent = fcIndex + 1;
  document.getElementById('fc-total').textContent = fcCards.length;
  document.getElementById('flashcard').classList.remove('flipped');
  fcFlipped = false;
}

function flipCard() { fcFlipped = !fcFlipped; document.getElementById('flashcard').classList.toggle('flipped', fcFlipped); }
function nextCard() { fcIndex = (fcIndex + 1) % fcCards.length; showCard(); }
function prevCard() { fcIndex = (fcIndex - 1 + fcCards.length) % fcCards.length; showCard(); }

// QUIZ
function initQuiz() {
  document.getElementById('quiz-setup').style.display = 'block';
  document.getElementById('quiz-active').style.display = 'none';
  document.getElementById('quiz-results').style.display = 'none';
  const sel = document.getElementById('quiz-topic-select');
  sel.innerHTML = '<option value="all">All Topics (Mixed)</option>';
  [...TOPICS.foundation, ...TOPICS.tools, ...TOPICS.advanced].forEach(t => {
    sel.innerHTML += `<option value="${t.id}">${t.icon} ${t.name}</option>`;
  });
}

function setQCount(n, btn) {
  quizCount = n;
  document.querySelectorAll('.q-count-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function startQuiz() {
  quizTopic = document.getElementById('quiz-topic-select').value;
  let pool = quizTopic === 'all' ? [...QUIZ_QUESTIONS] : QUIZ_QUESTIONS.filter(q => q.topic === quizTopic);
  pool = shuffle(pool);
  quizQuestions = pool.slice(0, Math.min(quizCount, pool.length));
  quizIndex = 0; quizScore = 0;
  document.getElementById('quiz-setup').style.display = 'none';
  document.getElementById('quiz-active').style.display = 'block';
  showQuestion();
}

function showQuestion() {
  const q = quizQuestions[quizIndex];
  document.getElementById('quiz-progress-fill').style.width = ((quizIndex / quizQuestions.length) * 100) + '%';
  document.getElementById('quiz-qnum').textContent = `Question ${quizIndex + 1} of ${quizQuestions.length}`;
  document.getElementById('quiz-question').textContent = q.q;
  document.getElementById('quiz-options-list').innerHTML = q.options.map((opt, i) =>
    `<button class="quiz-option" onclick="selectAnswer(${i})">${opt}</button>`
  ).join('');
  document.getElementById('quiz-feedback').style.display = 'none';
  document.getElementById('next-q-btn').style.display = 'none';
  quizAnswered = false;
}

function selectAnswer(idx) {
  if (quizAnswered) return;
  quizAnswered = true;
  const q = quizQuestions[quizIndex];
  const opts = document.querySelectorAll('.quiz-option');
  opts.forEach(o => o.style.pointerEvents = 'none');
  opts[idx].classList.add(idx === q.answer ? 'correct' : 'wrong');
  if (idx !== q.answer) opts[q.answer].classList.add('correct');
  const fb = document.getElementById('quiz-feedback');
  if (idx === q.answer) {
    quizScore++;
    fb.className = 'quiz-feedback correct';
    fb.innerHTML = '✅ Correct! ' + q.explanation;
  } else {
    fb.className = 'quiz-feedback wrong';
    fb.innerHTML = '❌ ' + q.explanation;
  }
  fb.style.display = 'block';
  document.getElementById('next-q-btn').style.display = 'block';
}

function nextQuestion() { quizIndex++; quizIndex >= quizQuestions.length ? showResults() : showQuestion(); }

function showResults() {
  document.getElementById('quiz-active').style.display = 'none';
  document.getElementById('quiz-results').style.display = 'block';
  const pct = Math.round((quizScore / quizQuestions.length) * 100);
  document.getElementById('results-score').textContent = pct + '%';
  document.getElementById('results-label').textContent = pct >= 70 ? '🎉 Great Job!' : '📚 Keep Practicing';
  document.getElementById('results-detail').textContent = `${quizScore} of ${quizQuestions.length} correct`;
  document.getElementById('results-score').style.color = pct >= 70 ? '#48bb78' : '#e53e3e';
  let stats = JSON.parse(localStorage.getItem('qa_quiz_stats') || '{"total":0,"correct":0,"sessions":0}');
  stats.total += quizQuestions.length; stats.correct += quizScore; stats.sessions++;
  localStorage.setItem('qa_quiz_stats', JSON.stringify(stats));
}

function retakeQuiz() { quizIndex = 0; quizScore = 0; quizQuestions = shuffle(quizQuestions); document.getElementById('quiz-active').style.display = 'block'; document.getElementById('quiz-results').style.display = 'none'; showQuestion(); }

// PROGRESS
function renderProgress() {
  const stats = JSON.parse(localStorage.getItem('qa_quiz_stats') || '{"total":0,"correct":0,"sessions":0}');
  const allTopics = [...TOPICS.foundation, ...TOPICS.tools, ...TOPICS.advanced];
  const studied = allTopics.filter(t => progress[t.id]).length;
  const avgPct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  document.getElementById('progress-summary').innerHTML = `
    <div class="prog-stat"><div class="prog-stat-num">${studied}/${allTopics.length}</div><div class="prog-stat-label">Topics</div></div>
    <div class="prog-stat"><div class="prog-stat-num">${stats.sessions}</div><div class="prog-stat-label">Quizzes</div></div>
    <div class="prog-stat"><div class="prog-stat-num">${avgPct}%</div><div class="prog-stat-label">Avg Score</div></div>
  `;
  document.getElementById('progress-topics').innerHTML = allTopics.map(t => {
    const done = progress[t.id] ? 100 : 0;
    return `<div class="prog-topic"><span class="prog-topic-name">${t.icon} ${t.name}</span><div class="prog-topic-bar-wrap"><div class="prog-topic-bar" style="width:${done}%"></div></div></div>`;
  }).join('');
}

function resetProgress() { if (confirm('Reset all progress?')) { progress = {}; localStorage.removeItem('qa_progress'); localStorage.removeItem('qa_quiz_stats'); renderProgress(); } }

// PRINT PDF
function printFullGuide() {
  const allTopics = [...TOPICS.foundation, ...TOPICS.tools, ...TOPICS.advanced];
  let html = `<button class="print-close" onclick="closePrint()">✕ Close</button>`;
  html += `<button class="print-btn" onclick="window.print()">🖨️ Print</button>`;
  html += `<h1>Automated QA Complete Study Guide</h1>`;
  html += `<p><em>From Manual Tester → Automation Engineer</em></p>`;
  html += `<p style="color:#666">Generated: ${new Date().toLocaleDateString()}</p>`;
  html += `<h2>Table of Contents</h2><ol>`;
  allTopics.forEach(t => { html += `<li>${t.icon} ${t.name}</li>`; });
  html += `</ol>`;

  allTopics.forEach(t => {
    const content = TOPIC_CONTENT[t.id];
    if (!content) return;
    html += `<h2>${t.icon} ${t.name}</h2>`;
    content.sections.forEach(s => {
      html += `<h3>${s.heading}</h3><p>${s.body}</p>`;
      if (s.terms) s.terms.forEach(term => { html += `<div class="print-term"><strong>${term.term}:</strong> ${term.def}</div>`; });
      if (s.code) html += `<pre style="background:#f5f5f5;padding:10px;border-radius:4px;font-size:12px;overflow-x:auto">${s.code}</pre>`;
      if (s.tip) html += `<div class="print-tip">💡 ${s.tip}</div>`;
      if (s.warn) html += `<div class="print-warn">⚠️ ${s.warn}</div>`;
    });
  });

  html += `<h2>Quick Reference Flashcards</h2>`;
  FLASHCARDS.slice(0, 30).forEach(fc => {
    html += `<div class="print-term"><strong>Q: ${fc.q}</strong><br/>A: ${fc.a}</div>`;
  });

  document.getElementById('print-content').innerHTML = html;
  document.getElementById('print-modal').style.display = 'block';
}

function closePrint() { document.getElementById('print-modal').style.display = 'none'; }

function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

// Init
renderStudy();
