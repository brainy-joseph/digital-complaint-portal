let homeCases = [
  { id: "JS-101", title: "Road damage near market", desc: "Our road near the weekly market has deep potholes.", category: "Roads", loc: "Kanker · CG", lang: "Gondi", status: "Open", assigned: false },
  { id: "JS-102", title: "Hostel Water Supply", desc: "Block C low pressure water issue for 3 days.", category: "University", loc: "NIT Campus", lang: "English", status: "Open", assigned: false },
  { id: "JS-103", title: "Pipeline Leakage Ward 4", desc: "Main drinking pipeline leaking near community hall.", category: "Water", loc: "Surguja", lang: "Hindi", status: "In Progress", assigned: true }
];

let activeCategory = "all";

function renderHomeBoard() {
  const container = document.getElementById("homeCaseContainer");
  const filtered = homeCases.filter(c => activeCategory === "all" || c.category === activeCategory);

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-demo">No issues in this category.</div>`;
    return;
  }

  container.innerHTML = filtered.map(c => `
    <div class="issue">
      <div class="issue-top">
        <b>${c.title}</b>
        <span class="tag">${c.category}</span>
      </div>
      <p>"${c.desc}"</p>
      <div class="meta-row">
        <div class="meta">${c.loc} <span>•</span> ${c.lang}</div>
        <button class="action-mini-btn ${c.assigned ? 'claimed' : ''}" onclick="toggleClaimCase('${c.id}')">
          ${c.assigned ? '✓ Claimed' : 'Pick Task'}
        </button>
      </div>
    </div>
  `).join('');

  document.getElementById("liveTag").textContent = `${filtered.length} Active Cases`;
}

function filterHomeBoard(cat, btn) {
  activeCategory = cat;
  document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderHomeBoard();
}

function toggleClaimCase(id) {
  const target = homeCases.find(c => c.id === id);
  if (target) {
    target.assigned = !target.assigned;
    target.status = target.assigned ? "Assigned" : "Open";
    renderHomeBoard();
  }
}

renderHomeBoard();
