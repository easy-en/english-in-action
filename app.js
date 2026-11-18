const items = window.MATERIALS || [];
const labels = {communication:'Communication', vocabulary:'Vocabulary', grammar:'Grammar', missions:'Real-Life Missions'};
const cards = document.getElementById('cards');
const search = document.getElementById('search');
const level = document.getElementById('level');
const category = document.getElementById('category');
const params = new URLSearchParams(location.search);
const initial = params.get('category');
if (initial && Object.hasOwn(labels, initial)) category.value = initial;
function safe(text){return String(text ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function render(){
  const q=search.value.toLowerCase().trim();
  const found=items.filter(x=>(!category.value||x.category===category.value)&&(!level.value||x.level===level.value)&&(!q||[x.title,x.description,x.level,...(x.tags||[])].join(' ').toLowerCase().includes(q)));
  cards.innerHTML=found.length?found.map(x=>`<article class="card"><div class="card-visual"><span class="pill">${safe(labels[x.category]||x.category)} · ${safe(x.level)}</span></div><div class="card-body"><span class="tag">${safe(x.type)}</span><h3>${safe(x.title)}</h3><p>${safe(x.description)}</p><div class="card-foot"><span class="tag">${safe((x.tags||[]).slice(0,2).join(' · '))}</span><a href="${encodeURI(x.link)}" target="_blank" rel="noopener noreferrer">Launch mission ↗</a></div></div></article>`).join(''):'<div class="empty">No materials match these filters yet. New missions are coming soon.</div>';
  document.getElementById('count').textContent=found.length+' '+(found.length===1?'mission':'missions');
}
[search,level,category].forEach(el=>el.addEventListener(el===search?'input':'change',render));
render();
