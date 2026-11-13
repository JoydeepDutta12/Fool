/* =========================================================
   TARGET 28 — JEE Progress Tracker
   Data persistence: localStorage (tasks/calendar/syllabus/pyqs)
                      + IndexedDB (pdf blobs)
   ========================================================= */

const LS = {
  examDate: 't28_exam_date',
  tasks: 't28_tasks',
  calendar: 't28_calendar',
  syllabus: 't28_syllabus_topics',
  pyqs: 't28_pyqs'
};

function todayStr(){ return fmtDate(new Date()); }
function fmtDate(d){ 
  const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), day=String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}
// localStorage stores small text values. JSON lets the app persist arrays and
// objects (tasks, logs, and progress) and rebuild them after the next visit.
function loadJSON(key, fallback){
  try{
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  }catch(e){
    return fallback;
  }
}
function saveJSON(key, value){
  try{
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }catch(e){
    toast('Could not save data in this browser');
    return false;
  }
}
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(()=>t.classList.remove('show'), 2200);
}

/* ---------- Welcome, remembered name, and spoken greeting ----------
   localStorage remembers the learner's name. SpeechSynthesis uses a
   voice installed in the browser, so no audio files are needed.
--------------------------------------------------------------------- */
const NAME_KEY = 't28_student_name';
const VOICE_KEY = 't28_voice_name';
const welcomeOverlay = document.getElementById('welcomeOverlay');
const welcomeTitle = document.getElementById('welcomeTitle');
const welcomeNameForm = document.getElementById('welcomeNameForm');
const welcomeNameInput = document.getElementById('welcomeName');
const app = document.querySelector('.app');
const voiceSelect = document.getElementById('voiceSelect');
let savedName = '';
let welcomeSpeechStarted = false;
let availableVoices = [];
try{ savedName = (localStorage.getItem(NAME_KEY) || '').trim(); }catch(e){}

function setDisplayedName(name){
  document.querySelectorAll('[data-student-name]').forEach(el=>{
    el.textContent = name ? ` · ${name}` : '';
  });
}

function speakWelcome(){
  if(!savedName || !('speechSynthesis' in window) || welcomeSpeechStarted) return;
  const greeting = new SpeechSynthesisUtterance(`Welcome, ${savedName}.`);
  greeting.lang = 'en-IN';
  greeting.rate = 0.96;
  greeting.pitch = 1;
  greeting.voice = getGreetingVoice();
  greeting.onstart = ()=>{ welcomeSpeechStarted = true; };
  greeting.onerror = ()=>{ welcomeSpeechStarted = false; };
  window.speechSynthesis.speak(greeting);
}

function getGreetingVoice(){
  const requestedName = voiceSelect.value;
  if(requestedName){
    return availableVoices.find(voice=>voice.name===requestedName) || null;
  }
  // Voice names are the only gender hint exposed consistently by browsers.
  const feminineHint = /female|samantha|ava|karen|moira|tessa|victoria|zira|susan|veena|aria|jenny|sonia|heera/i;
  return availableVoices.find(voice=>/^en(-|_)/i.test(voice.lang) && feminineHint.test(voice.name))
    || availableVoices.find(voice=>/^en(-|_)/i.test(voice.lang))
    || null;
}

function populateVoiceOptions(){
  if(!('speechSynthesis' in window)){
    voiceSelect.innerHTML = '<option value="">Voice not supported</option>';
    voiceSelect.disabled = true;
    return;
  }
  availableVoices = window.speechSynthesis.getVoices().filter(voice=>/^en(-|_)/i.test(voice.lang));
  const savedVoice = (()=>{ try{return localStorage.getItem(VOICE_KEY)||'';}catch(e){return '';} })();
  voiceSelect.replaceChildren(new Option('Auto · prefer feminine voice', ''));
  availableVoices.forEach(voice=>{
    const option = new Option(`${voice.name} (${voice.lang})`, voice.name);
    voiceSelect.add(option);
  });
  voiceSelect.value = availableVoices.some(voice=>voice.name===savedVoice) ? savedVoice : '';
}
populateVoiceOptions();
if('speechSynthesis' in window){
  window.speechSynthesis.addEventListener('voiceschanged', populateVoiceOptions);
}
voiceSelect.addEventListener('change', ()=>{
  try{ localStorage.setItem(VOICE_KEY, voiceSelect.value); }catch(e){ toast('Could not save voice preference'); }
});

// Keep a local-clock readout independent of the selected dashboard section.
function updateClock(){
  const now = new Date();
  const clock = document.getElementById('appClock');
  clock.dateTime = now.toISOString();
  clock.textContent = now.toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit', second:'2-digit'});
}
updateClock();
setInterval(updateClock, 1000);

const profileDialog = document.getElementById('profileDialog');
document.getElementById('changeNameBtn').addEventListener('click', ()=>{
  document.getElementById('profileName').value = savedName;
  profileDialog.showModal();
});
document.getElementById('profileForm').addEventListener('submit', event=>{
  if(event.submitter?.value !== 'save') return;
  event.preventDefault();
  const name = document.getElementById('profileName').value.trim();
  if(!name) return;
  savedName = name;
  try{ localStorage.setItem(NAME_KEY, savedName); }
  catch(e){ toast('Could not remember your name in this browser'); }
  setDisplayedName(savedName);
  profileDialog.close();
  renderDashboard();
});

setDisplayedName(savedName);
function showNamePrompt(){
  welcomeNameInput.value = savedName;
  welcomeNameForm.hidden = false;
  welcomeNameInput.focus();
}
function startWelcome(){
  if(savedName){
    speakWelcome();
    enterDashboard();
    return;
  }
  showNamePrompt();
}
function enterDashboard(){
  const removeOverlay = event=>{
    if(event.target!==welcomeOverlay || event.animationName!=='welcomeOut') return;
    welcomeOverlay.removeEventListener('animationend', removeOverlay);
    welcomeOverlay.remove();
  };
  const finishDashboardSlide = event=>{
    if(event.target!==app || event.animationName!=='dashboardSlideIn') return;
    app.removeEventListener('animationend', finishDashboardSlide);
    app.classList.remove('intro-entering');
  };
  welcomeOverlay.addEventListener('animationend', removeOverlay);
  app.addEventListener('animationend', finishDashboardSlide);
  welcomeOverlay.classList.add('leaving');
  app.classList.remove('intro-waiting');
  app.classList.add('intro-entering');
  app.removeAttribute('inert');
  app.removeAttribute('aria-hidden');
}
welcomeTitle.addEventListener('animationend', startWelcome, {once:true});
welcomeNameInput.addEventListener('input', ()=>welcomeNameInput.setCustomValidity(''));
welcomeNameForm.addEventListener('submit', event=>{
  event.preventDefault();
  const name = welcomeNameInput.value.trim();
  if(!name){
    welcomeNameInput.setCustomValidity('Please enter your name.');
    welcomeNameInput.reportValidity();
    return;
  }
  savedName = name;
  try{ localStorage.setItem(NAME_KEY, savedName); }
  catch(e){ toast('Could not remember your name in this browser'); }
  setDisplayedName(savedName);
  renderDashboard();
  speakWelcome();
  enterDashboard();
});

/* ---------- Navigation ---------- */
const tabs = ['dashboard','tasks','calendar','syllabus','pyqs','pdfs','revision'];
function showTab(tab){
  tabs.forEach(t=>{
    document.getElementById('tab-'+t).classList.toggle('active', t===tab);
  });
  document.querySelectorAll('.navlist button').forEach(b=>{
    b.classList.toggle('active', b.dataset.tab===tab);
  });
  document.getElementById('mobileNav').value = tab;
  if(tab==='dashboard') renderDashboard();
  if(tab==='calendar') renderCalendar();
  if(tab==='syllabus') renderSyllabus();
  if(tab==='pyqs') renderPyqs();
  if(tab==='pdfs') renderPdfs();
  if(tab==='revision') renderRevision();
}
document.querySelectorAll('.navlist button').forEach(b=>{
  b.addEventListener('click', ()=>showTab(b.dataset.tab));
});
document.getElementById('mobileNav').addEventListener('change', e=>showTab(e.target.value));

/* ---------- Exam countdown ---------- */
const examInput = document.getElementById('examDateInput');
function getExamDate(){
  return loadJSON(LS.examDate, '2028-01-15');
}
function setExamDate(v){ saveJSON(LS.examDate, v); }
examInput.value = getExamDate();
examInput.addEventListener('change', ()=>{
  setExamDate(examInput.value);
  renderDashboard();
});

function renderDashboard(){
  updateDashboardGreeting();
  const exam = new Date(getExamDate()+'T00:00:00');
  const now = new Date();
  now.setHours(0,0,0,0);
  const diff = Math.ceil((exam - now) / 86400000);
  document.getElementById('daysLeft').textContent = diff >= 0 ? diff : 0;
  document.getElementById('examDateDisplay').textContent = exam.toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'numeric'});

  // today's tasks
  const tasks = loadJSON(LS.tasks, {});
  const todays = tasks[todayStr()] || [];
  const done = todays.filter(t=>t.done).length;
  document.getElementById('stTasksToday').textContent = `${done}/${todays.length}`;
  const preview = document.getElementById('dashTaskPreview');
  preview.innerHTML = '';
  if(todays.length===0){
    preview.innerHTML = '<div class="empty">No tasks added for today yet.</div>';
  }else{
    todays.slice(0,5).forEach(t=>{
      const row = document.createElement('div');
      row.className = 'mini-task' + (t.done?' done':'');
      row.innerHTML = `<span class="task-check" style="width:16px;height:16px;${t.done?`background:var(--correct);border-color:var(--correct);`:''}"></span><span>${escapeHtml(t.text)}</span>`;
      preview.appendChild(row);
    });
  }

  // syllabus %
  ['physics','chemistry','maths'].forEach(subj=>{
    const pct = syllabusPct(subj);
    document.getElementById({physics:'stPhysics',chemistry:'stChem',maths:'stMaths'}[subj]).textContent = pct + '%';
  });

  // pyq total
  const pyqs = loadJSON(LS.pyqs, []);
  const totalAttempted = pyqs.reduce((s,p)=>s+(+p.attempted||0),0);
  document.getElementById('stPyqTotal').textContent = totalAttempted;

  // pdf total
  countPdfs().then(n=> document.getElementById('stPdfTotal').textContent = n);

  // week strip
  const cal = loadJSON(LS.calendar, {});
  const strip = document.getElementById('weekStrip');
  strip.innerHTML = '';
  for(let i=6;i>=0;i--){
    const d = new Date(); d.setDate(d.getDate()-i);
    const key = fmtDate(d);
    const entry = cal[key];
    const hrs = entry ? (+entry.hours||0) : 0;
    const color = hrs===0 ? 'var(--grid-line)' : hrs<3 ? 'var(--amber)' : hrs<6 ? 'var(--correct)' : 'var(--signal)';
    const col = document.createElement('div');
    col.style.cssText = 'flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;';
    col.innerHTML = `<div style="width:100%;height:38px;border-radius:6px;background:${color};opacity:${hrs===0?0.25:1};"></div><span style="font-size:10px;color:var(--text-muted);">${d.toLocaleDateString('en-IN',{weekday:'narrow'})}</span>`;
    strip.appendChild(col);
  }
}

/* The dashboard greeting follows the device's local time and updates live. */
function updateDashboardGreeting(){
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';
  const prompts = {
    Morning: 'What are we focusing on today?',
    Afternoon: 'How is today’s study going?',
    Evening: 'What progress can we wrap up today?'
  };
  const name = savedName || 'there';
  document.getElementById('dashboardGreeting').textContent = `Good ${timeOfDay} ${name},`;
  document.getElementById('dashboardMessage').textContent = prompts[timeOfDay];
}
// A page left open across a time change will still show the right greeting.
setInterval(updateDashboardGreeting, 60_000);

function escapeHtml(s){
  const d = document.createElement('div'); d.textContent = s; return d.innerHTML;
}

/* ---------- Daily Tasks ---------- */
const taskDateInput = document.getElementById('taskDateInput');
taskDateInput.value = todayStr();

function renderTasks(){
  const dateKey = taskDateInput.value;
  const tasks = loadJSON(LS.tasks, {});
  const list = tasks[dateKey] || [];
  const el = document.getElementById('taskList');
  el.innerHTML = '';
  if(list.length===0){
    el.innerHTML = '<div class="empty">No tasks for this day. Add one above to start the grind.</div>';
    return;
  }
  list.forEach(t=>{
    const row = document.createElement('div');
    row.className = 'task-item' + (t.done ? ' done' : '');
    row.innerHTML = `
      <button class="task-check" data-id="${t.id}"></button>
      <span class="txt">${escapeHtml(t.text)}</span>
      <button class="del" data-id="${t.id}">✕</button>`;
    el.appendChild(row);
  });
  el.querySelectorAll('.task-check').forEach(b=>b.addEventListener('click', ()=>toggleTask(dateKey,b.dataset.id)));
  el.querySelectorAll('.del').forEach(b=>b.addEventListener('click', ()=>deleteTask(dateKey,b.dataset.id)));
}
function toggleTask(dateKey,id){
  const tasks = loadJSON(LS.tasks, {});
  const list = tasks[dateKey] || [];
  const t = list.find(x=>x.id===id);
  if(t){ t.done = !t.done; tasks[dateKey]=list; saveJSON(LS.tasks, tasks); renderTasks(); }
}
function deleteTask(dateKey,id){
  const tasks = loadJSON(LS.tasks, {});
  tasks[dateKey] = (tasks[dateKey]||[]).filter(x=>x.id!==id);
  saveJSON(LS.tasks, tasks); renderTasks();
}
document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('newTaskInput').addEventListener('keydown', e=>{ if(e.key==='Enter') addTask(); });
function addTask(){
  const input = document.getElementById('newTaskInput');
  const text = input.value.trim();
  if(!text) return;
  const dateKey = taskDateInput.value;
  const tasks = loadJSON(LS.tasks, {});
  const list = tasks[dateKey] || [];
  list.push({ id: 't'+Date.now()+Math.random().toString(36).slice(2,6), text, done:false });
  tasks[dateKey] = list;
  saveJSON(LS.tasks, tasks);
  input.value = '';
  renderTasks();
}
taskDateInput.addEventListener('change', renderTasks);
document.getElementById('taskPrevDay').addEventListener('click', ()=>{
  const d = new Date(taskDateInput.value+'T00:00:00'); d.setDate(d.getDate()-1);
  taskDateInput.value = fmtDate(d); renderTasks();
});
document.getElementById('taskNextDay').addEventListener('click', ()=>{
  const d = new Date(taskDateInput.value+'T00:00:00'); d.setDate(d.getDate()+1);
  taskDateInput.value = fmtDate(d); renderTasks();
});
document.getElementById('taskTodayBtn').addEventListener('click', ()=>{
  taskDateInput.value = todayStr(); renderTasks();
});

/* ---------- Calendar ---------- */
let calViewDate = new Date();
const dowNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function renderCalendar(){
  const dowEl = document.getElementById('calDow');
  dowEl.innerHTML = dowNames.map(n=>`<div class="cal-dow">${n}</div>`).join('');

  const y = calViewDate.getFullYear(), m = calViewDate.getMonth();
  document.getElementById('calMonthLabel').textContent = calViewDate.toLocaleDateString('en-IN',{month:'long',year:'numeric'});

  const firstDay = new Date(y,m,1).getDay();
  const daysInMonth = new Date(y,m+1,0).getDate();
  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';
  const cal = loadJSON(LS.calendar, {});
  const tasks = loadJSON(LS.tasks, {});

  for(let i=0;i<firstDay;i++){
    const c = document.createElement('div'); c.className='cal-cell empty-cell'; grid.appendChild(c);
  }
  for(let d=1; d<=daysInMonth; d++){
    const dateObj = new Date(y,m,d);
    const key = fmtDate(dateObj);
    const entry = cal[key];
    const hrs = entry ? (+entry.hours||0) : 0;
    let color = 'var(--grid-line)';
    if(hrs>0 && hrs<3) color='var(--amber)';
    else if(hrs>=3 && hrs<6) color='var(--correct)';
    else if(hrs>=6) color='var(--signal)';
    const isToday = key===todayStr();
    const cell = document.createElement('div');
    cell.className = 'cal-cell' + (isToday?' today':'');
    cell.innerHTML = `<span class="d">${d}</span><span class="heat" style="background:${color};"></span>`;
    cell.addEventListener('click', ()=>openDayModal(key));
    grid.appendChild(cell);
  }
}
document.getElementById('calPrev').addEventListener('click', ()=>{ calViewDate.setMonth(calViewDate.getMonth()-1); renderCalendar(); });
document.getElementById('calNext').addEventListener('click', ()=>{ calViewDate.setMonth(calViewDate.getMonth()+1); renderCalendar(); });

let activeDayKey = null;
function openDayModal(key){
  activeDayKey = key;
  const cal = loadJSON(LS.calendar, {});
  const entry = cal[key] || {hours:'', notes:''};
  document.getElementById('dayModalTitle').textContent = new Date(key+'T00:00:00').toLocaleDateString('en-IN',{weekday:'long', day:'numeric', month:'long'});
  document.getElementById('dayHours').value = entry.hours || '';
  document.getElementById('dayNotes').value = entry.notes || '';
  document.getElementById('dayModalBackdrop').classList.add('open');
}
document.getElementById('dayModalCancel').addEventListener('click', ()=>{
  document.getElementById('dayModalBackdrop').classList.remove('open');
});
document.getElementById('dayModalSave').addEventListener('click', ()=>{
  const cal = loadJSON(LS.calendar, {});
  cal[activeDayKey] = {
    hours: document.getElementById('dayHours').value,
    notes: document.getElementById('dayNotes').value
  };
  saveJSON(LS.calendar, cal);
  document.getElementById('dayModalBackdrop').classList.remove('open');
  renderCalendar();
  toast('Day log saved');
});

/* ---------- Syllabus ---------- */
const SYLLABUS = window.JEE_SYLLABUS;
let activeSubject = 'physics';
document.querySelectorAll('.subject-tabs button').forEach(b=>{
  b.addEventListener('click', ()=>{
    activeSubject = b.dataset.subj;
    document.querySelectorAll('.subject-tabs button').forEach(x=>x.classList.toggle('active', x===b));
    renderSyllabus();
  });
});
function getSyllabusState(){ return loadJSON(LS.syllabus, {}); }
// Upgrade prior chapter-level checks into topic checks where chapter mapping is clear.
function migrateLegacySyllabus(){
  if(localStorage.getItem('t28_syllabus_topics_migrated')==='1') return;
  const old = loadJSON('t28_syllabus', {});
  // Each target is [new chapter index, topic indexes]; null means all topics.
  const chapterMap = {
    physics:{0:[[0]],1:[[1]],2:[[2]],3:[[3]],4:[[4]],5:[[5]],6:[[6]],7:[[7]],8:[[8]],9:[[9]],10:[[10]],11:[[11]],12:[[12]],13:[[13]],14:[[14]],15:[[15,[0,1]]],16:[[15,[2,3]]],17:[[16]],18:[[17]],19:[[18]],21:[[19]]},
    chemistry:{0:[[0]],1:[[1]],2:[[2]],4:[[3]],5:[[4]],6:[[5]],7:[[6]],8:[[7]],10:[[8]],14:[[9]],15:[[10]],16:[[11]],18:[[12],[13]],19:[[14]],20:[[15]],21:[[16,[0,1]]],22:[[16,[2,3]]],23:[[17]],24:[[18]]},
    maths:{0:[[0]],1:[[1]],2:[[2]],3:[[3]],4:[[4]],5:[[5]],7:[[6,[0,1]]],8:[[6,[2,3,4,5]]],9:[[7]],10:[[8]],11:[[9,[0,1]]],12:[[9,[2]]],13:[[9,[3]]],14:[[11]],15:[[10]],16:[[13]],17:[[12]]}
  };
  const state = getSyllabusState();
  Object.entries(chapterMap).forEach(([subject, mapping])=>{
    Object.entries(mapping).forEach(([oldIndex, targets])=>{
      if(!old[subject]?.[oldIndex]) return;
      targets.forEach(([newIndex, selectedTopics])=>{
        const topicIndexes = selectedTopics || SYLLABUS[subject][newIndex].topics.map((_, topicIndex)=>topicIndex);
        topicIndexes.forEach(topicIndex=>{
          state[subject] = state[subject] || {};
          state[subject][topicKey(newIndex, topicIndex)] = true;
        });
      });
    });
  });
  saveJSON(LS.syllabus, state);
  try{ localStorage.setItem('t28_syllabus_topics_migrated','1'); }catch(e){}
}
try{ migrateLegacySyllabus(); }catch(e){}
function topicKey(chapterIndex, topicIndex){ return `${chapterIndex}:${topicIndex}`; }
// Preserve checks made against the earlier four-item rotational checklist.
function migrateRotationalChecklist(){
  const flag = 't28_rotation_detail_migrated';
  if(localStorage.getItem(flag)==='1') return;
  const state = getSyllabusState();
  const oldToNew = {0:[0,1,2],1:[3,4,5],2:[6,7,8],3:[10,11]};
  Object.entries(oldToNew).forEach(([oldIndex, newIndexes])=>{
    if(!state.physics?.[topicKey(4,+oldIndex)]) return;
    newIndexes.forEach(topicIndex=>{ state.physics[topicKey(4,topicIndex)] = true; });
  });
  saveJSON(LS.syllabus, state);
  try{ localStorage.setItem(flag,'1'); }catch(e){}
}
try{ migrateRotationalChecklist(); }catch(e){}
function setTopicDone(subj, chapterIndex, topicIndex, done){
  const state = getSyllabusState();
  state[subj] = state[subj] || {};
  state[subj][topicKey(chapterIndex, topicIndex)] = done;
  saveJSON(LS.syllabus, state);
}
function chapterProgress(subj, chapterIndex){
  const chapter = SYLLABUS[subj][chapterIndex];
  const state = getSyllabusState()[subj] || {};
  const done = chapter.topics.filter((_, topicIndex)=>state[topicKey(chapterIndex, topicIndex)]).length;
  return {done, total:chapter.topics.length, percent:Math.round(done/chapter.topics.length*100)};
}
function syllabusPct(subj){
  const chapters = SYLLABUS[subj];
  const total = chapters.reduce((sum, chapter)=>sum+chapter.topics.length, 0);
  const done = chapters.reduce((sum, chapter, chapterIndex)=>sum+chapterProgress(subj, chapterIndex).done, 0);
  return total ? Math.round(done/total*100) : 0;
}
function renderSyllabus(keepOpenIndex=null){
  const chapters = SYLLABUS[activeSubject];
  const topicState = getSyllabusState()[activeSubject] || {};
  const allTopics = chapters.reduce((sum, chapter)=>sum+chapter.topics.length, 0);
  const doneTopics = chapters.reduce((sum, chapter, i)=>sum+chapterProgress(activeSubject, i).done, 0);
  const pct = allTopics ? Math.round(doneTopics/allTopics*100) : 0;
  const completeChapters = chapters.filter((_, i)=>chapterProgress(activeSubject, i).percent===100).length;
  document.getElementById('syllabusProgLabel').textContent = `${doneTopics} / ${allTopics} topics · ${completeChapters} / ${chapters.length} chapters complete`;
  document.getElementById('syllabusProgPct').textContent = pct+'%';
  const fill = document.getElementById('syllabusProgFill');
  fill.style.width = pct+'%';
  const colorMap = {physics:'var(--signal)', chemistry:'var(--correct)', maths:'var(--amber)'};
  fill.style.background = colorMap[activeSubject];

  const list = document.getElementById('chapterList');
  list.innerHTML = '';
  chapters.forEach((ch,i)=>{
    const progress = chapterProgress(activeSubject, i);
    const row = document.createElement('details');
    row.className = 'chapter-row';
    row.open = i===keepOpenIndex;
    row.innerHTML = `<summary class="chapter-summary">
      <span class="idx mono">${String(i+1).padStart(2,'0')}</span>
      <span class="chapter-title"><span class="name">${escapeHtml(ch.title)}</span></span>
      <span class="chapter-progress-wrap"><span class="chapter-progress-label">${progress.done}/${progress.total} topics · ${progress.percent}%</span><span class="chapter-mini-track"><span style="width:${progress.percent}%;background:${colorMap[activeSubject]};"></span></span></span>
      <span class="cat">${escapeHtml(ch.category)}</span>
      </summary>
      <div class="topic-list"></div>`;
    const topicList = row.querySelector('.topic-list');
    ch.topics.forEach((topic, topicIndex)=>{
      const checked = !!topicState[topicKey(i, topicIndex)];
      const item = document.createElement('label');
      item.className = `topic-item${checked?' done':''}`;
      item.innerHTML = `<input type="checkbox" ${checked?'checked':''}><span>${escapeHtml(topic.name)}</span>`;
      item.querySelector('input').addEventListener('change', event=>{
        setTopicDone(activeSubject, i, topicIndex, event.target.checked);
        renderSyllabus(i);
        renderDashboard();
      });
      topicList.appendChild(item);
    });
    list.appendChild(row);
  });
}

/* ---------- Revision cards ---------- */
const revisionSubject = document.getElementById('revisionSubject');
const revisionChapter = document.getElementById('revisionChapter');
const revisionTopic = document.getElementById('revisionTopic');
let revisionCardIndex = 0;
function renderRevisionChapters(){
  const chapters = SYLLABUS[revisionSubject.value];
  revisionChapter.innerHTML = chapters.map((chapter, i)=>`<option value="${i}">${escapeHtml(chapter.title)}</option>`).join('');
  renderRevisionTopics();
}
function renderRevisionTopics(){
  const chapter = SYLLABUS[revisionSubject.value][+revisionChapter.value || 0];
  revisionTopic.innerHTML = chapter.topics.map((topic, i)=>`<option value="${i}">${escapeHtml(topic.name)}</option>`).join('');
  revisionCardIndex = 0;
  renderRevisionCard();
}
function renderRevisionCard(){
  const chapter = SYLLABUS[revisionSubject.value][+revisionChapter.value || 0];
  const topicIndex = +revisionTopic.value || 0;
  const topic = chapter.topics[topicIndex];
  const cards = topic.cards;
  const card = cards[revisionCardIndex % cards.length];
  document.getElementById('flashcardCount').textContent = `${cards[revisionCardIndex].type} · ${chapter.title} · ${topic.name} · ${revisionCardIndex+1}/${cards.length}`;
  document.getElementById('flashcardQuestion').textContent = card.question;
  document.getElementById('flashcardAnswer').textContent = card.answer;
  document.getElementById('flashcardAnswer').hidden = true;
  document.getElementById('showAnswerBtn').textContent = 'Show answer';
  document.getElementById('nextCardBtn').textContent = cards.length < 2 ? 'Next topic' : 'Next card';
  document.getElementById('nextCardBtn').disabled = false;
}
function renderRevision(){ renderRevisionChapters(); }
revisionSubject.addEventListener('change', renderRevisionChapters);
revisionChapter.addEventListener('change', renderRevisionTopics);
revisionTopic.addEventListener('change', ()=>{ revisionCardIndex=0; renderRevisionCard(); });
document.getElementById('showAnswerBtn').addEventListener('click', ()=>{
  const answer = document.getElementById('flashcardAnswer');
  answer.hidden = !answer.hidden;
  document.getElementById('showAnswerBtn').textContent = answer.hidden ? 'Show answer' : 'Hide answer';
});
document.getElementById('nextCardBtn').addEventListener('click', ()=>{
  const chapter = SYLLABUS[revisionSubject.value][+revisionChapter.value || 0];
  const topicIndex = +revisionTopic.value || 0;
  const cards = chapter.topics[topicIndex].cards;
  revisionCardIndex = (revisionCardIndex+1) % cards.length;
  renderRevisionCard();
});
document.getElementById('previousCardBtn').addEventListener('click', ()=>{
  const chapter = SYLLABUS[revisionSubject.value][+revisionChapter.value || 0];
  const topicIndex = +revisionTopic.value || 0;
  const cards = chapter.topics[topicIndex].cards;
  revisionCardIndex = (revisionCardIndex-1+cards.length) % cards.length;
  renderRevisionCard();
});

/* ---------- PYQs ---------- */
document.getElementById('addPyqBtn').addEventListener('click', ()=>{
  const year = document.getElementById('pyqYear').value;
  const subject = document.getElementById('pyqSubject').value;
  const chapter = document.getElementById('pyqChapter').value.trim();
  const attempted = +document.getElementById('pyqAttempted').value || 0;
  const correct = +document.getElementById('pyqCorrect').value || 0;
  if(!year || attempted===0){ toast('Add a year and attempted count'); return; }
  const pyqs = loadJSON(LS.pyqs, []);
  pyqs.unshift({ id:'p'+Date.now(), date: todayStr(), year, subject, chapter, attempted, correct });
  saveJSON(LS.pyqs, pyqs);
  ['pyqYear','pyqChapter','pyqAttempted','pyqCorrect'].forEach(id=>document.getElementById(id).value='');
  renderPyqs();
  toast('PYQ session logged');
});
function deletePyq(id){
  const pyqs = loadJSON(LS.pyqs, []).filter(p=>p.id!==id);
  saveJSON(LS.pyqs, pyqs); renderPyqs();
}
function renderPyqs(){
  const pyqs = loadJSON(LS.pyqs, []);
  const body = document.getElementById('pyqTableBody');
  body.innerHTML = '';
  document.getElementById('pyqEmpty').style.display = pyqs.length ? 'none' : 'block';
  pyqs.forEach(p=>{
    const acc = p.attempted>0 ? Math.round((p.correct/p.attempted)*100) : 0;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="mono">${p.date}</td>
      <td class="mono">${escapeHtml(String(p.year))}</td>
      <td><span class="pill ${p.subject}">${p.subject}</span></td>
      <td>${escapeHtml(p.chapter||'—')}</td>
      <td class="mono">${p.attempted}</td>
      <td class="mono">${p.correct}</td>
      <td class="mono acc">${acc}%</td>
      <td><button class="del" style="background:none;border:none;color:var(--text-muted);">✕</button></td>`;
    tr.querySelector('.del').addEventListener('click', ()=>deletePyq(p.id));
    body.appendChild(tr);
  });
}

/* ---------- PDF Hub (IndexedDB) ----------
   IndexedDB is a browser database suited to larger binary files like PDFs;
   localStorage is kept for the smaller text-based progress records.
-------------------------------------------- */
let db;
const dbReady = new Promise((resolve)=>{
  const req = indexedDB.open('target28-pdfs', 1);
  req.onupgradeneeded = e=>{
    const d = e.target.result;
    if(!d.objectStoreNames.contains('pdfs')){
      d.createObjectStore('pdfs', {keyPath:'id'});
    }
  };
  req.onsuccess = e=>{ db = e.target.result; resolve(); };
  req.onerror = ()=> resolve();
});
function countPdfs(){
  return dbReady.then(()=> new Promise(res=>{
    if(!db) return res(0);
    const tx = db.transaction('pdfs','readonly');
    const store = tx.objectStore('pdfs');
    const req = store.count();
    req.onsuccess = ()=> res(req.result);
    req.onerror = ()=> res(0);
  }));
}
function getAllPdfs(){
  return dbReady.then(()=> new Promise(res=>{
    if(!db) return res([]);
    const tx = db.transaction('pdfs','readonly');
    const store = tx.objectStore('pdfs');
    const req = store.getAll();
    req.onsuccess = ()=> res(req.result.sort((a,b)=>b.added-a.added));
    req.onerror = ()=> res([]);
  }));
}
function addPdf(rec){
  return dbReady.then(()=> new Promise(res=>{
    const tx = db.transaction('pdfs','readwrite');
    tx.objectStore('pdfs').put(rec);
    tx.oncomplete = ()=> res();
  }));
}
function deletePdf(id){
  return dbReady.then(()=> new Promise(res=>{
    const tx = db.transaction('pdfs','readwrite');
    tx.objectStore('pdfs').delete(id);
    tx.oncomplete = ()=>{ res(); renderPdfs(); };
  }));
}

document.getElementById('pdfFileInput').addEventListener('change', async (e)=>{
  const files = Array.from(e.target.files);
  for(const f of files){
    const buf = await f.arrayBuffer();
    const blob = new Blob([buf], {type:'application/pdf'});
    await addPdf({
      id:'f'+Date.now()+Math.random().toString(36).slice(2,6),
      title:f.name.replace(/\.pdf$/i,''),
      subject:'general',
      size:f.size,
      added:Date.now(),
      blob
    });
  }
  e.target.value='';
  renderPdfs();
  toast(files.length+' PDF(s) added');
});

let pdfFilter = 'all';
document.getElementById('pdfFilter').addEventListener('click', e=>{
  if(e.target.tagName!=='BUTTON') return;
  pdfFilter = e.target.dataset.f;
  document.querySelectorAll('#pdfFilter button').forEach(b=>b.classList.toggle('active', b===e.target));
  renderPdfs();
});

async function renderPdfs(){
  const all = await getAllPdfs();
  const filtered = pdfFilter==='all' ? all : all.filter(p=>p.subject===pdfFilter);
  const el = document.getElementById('pdfList');
  el.innerHTML = '';
  document.getElementById('pdfEmpty').style.display = filtered.length ? 'none' : 'block';
  filtered.forEach(p=>{
    const url = URL.createObjectURL(p.blob);
    const card = document.createElement('div');
    card.className = 'pdf-card';
    const kb = (p.size/1024).toFixed(0);
    card.innerHTML = `
      <div class="top">
        <div class="icon">📄</div>
        <select class="subj-select" data-id="${p.id}" style="width:auto;font-size:11px;padding:4px 6px;">
          <option value="general" ${p.subject==='general'?'selected':''}>General</option>
          <option value="physics" ${p.subject==='physics'?'selected':''}>Physics</option>
          <option value="chemistry" ${p.subject==='chemistry'?'selected':''}>Chemistry</option>
          <option value="maths" ${p.subject==='maths'?'selected':''}>Maths</option>
        </select>
      </div>
      <h4>${escapeHtml(p.title)}</h4>
      <div class="meta">${kb} KB · ${new Date(p.added).toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}</div>
      <div class="actions">
        <a class="btn small ghost" href="${url}" target="_blank" rel="noopener">Open</a>
        <button class="btn small danger" data-del="${p.id}">Delete</button>
      </div>`;
    card.querySelector('.subj-select').addEventListener('change', async (ev)=>{
      p.subject = ev.target.value;
      await addPdf(p);
      renderPdfs();
    });
    card.querySelector('[data-del]').addEventListener('click', ()=>{
      if(confirm('Delete "'+p.title+'"?')) deletePdf(p.id);
    });
    el.appendChild(card);
  });
}

/* ---------- Export backup ---------- */
document.getElementById('exportBtn').addEventListener('click', ()=>{
  const backup = {
    studentName: savedName,
    examDate: getExamDate(),
    tasks: loadJSON(LS.tasks, {}),
    calendar: loadJSON(LS.calendar, {}),
    syllabus: loadJSON(LS.syllabus, {}),
    pyqs: loadJSON(LS.pyqs, []),
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(backup,null,2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'target28-backup-'+todayStr()+'.json';
  a.click();
  toast('Backup downloaded (note: PDFs are not included)');
});

/* ---------- Init ---------- */
renderDashboard();
renderTasks();
renderPyqs();

/* Register service worker for offline/installable use when served over http(s) */
if('serviceWorker' in navigator && (location.protocol==='https:' || location.hostname==='localhost')){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}
