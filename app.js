const views = document.querySelectorAll('[data-view]');
const viewLinks = document.querySelectorAll('[data-view-link]');
const sideLinks = document.querySelectorAll('.side-link');
const topLinks = document.querySelectorAll('.top-nav-link');
const topNav = document.getElementById('topNav');
const navToggle = document.getElementById('navToggle');
const modeButtons = document.querySelectorAll('[data-mode]');
const toast = document.getElementById('toast');
let toastTimer;

function showToast(title, message) {
  toast.querySelector('strong').textContent = title;
  toast.querySelector('p').textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function switchView(name) {
  const target = name === 'admin' ? 'admin' : name;
  views.forEach(view => view.classList.toggle('active', view.dataset.view === target));
  sideLinks.forEach(link => link.classList.toggle('active', link.dataset.viewLink === name));
  topLinks.forEach(link => link.classList.toggle('active', link.dataset.viewLink === name));
  topNav.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

viewLinks.forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  switchView(link.dataset.viewLink);
}));

navToggle?.addEventListener('click', () => {
  const open = topNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('nav-open', open);
});

modeButtons.forEach(button => button.addEventListener('click', () => {
  modeButtons.forEach(item => item.classList.toggle('active', item === button));
  if (button.dataset.mode === 'admin') {
    switchView('admin');
    showToast('Vue administrateur activée', 'Le portefeuille clients est maintenant affiché.');
  } else {
    switchView('overview');
    showToast('Vue client activée', 'Retour à l’espace Maison Bernard.');
  }
}));

const periodData = {
  7: { leads: '19', calls: '12', roas: '4,6×', rank: '2,6', total: '19', label: 'demandes sur 7 jours' },
  30: { leads: '68', calls: '42', roas: '4,2×', rank: '2,8', total: '68', label: 'demandes sur 30 jours' },
  90: { leads: '194', calls: '118', roas: '3,9×', rank: '3,1', total: '194', label: 'demandes sur 90 jours' }
};

document.querySelectorAll('[data-period]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-period]').forEach(item => item.classList.toggle('active', item === button));
  const data = periodData[button.dataset.period];
  Object.entries(data).forEach(([key, value]) => {
    const element = document.querySelector(`[data-kpi="${key}"]`);
    if (element) element.textContent = value;
  });
  document.getElementById('chartTotal').textContent = data.total;
  document.getElementById('chartTotal').nextElementSibling.textContent = data.label;
  document.getElementById('lineChart').animate([{ opacity: .35, transform: 'translateY(5px)' }, { opacity: 1, transform: 'none' }], { duration: 360 });
}));

const drawer = document.getElementById('leadDrawer');
function openLeadDrawer(data) {
  const [name, need, source, date, status] = data.split('|');
  const initials = name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();
  document.getElementById('drawerInitials').textContent = initials;
  document.getElementById('drawerName').textContent = name;
  document.getElementById('drawerNeed').textContent = need;
  document.getElementById('drawerSource').textContent = source;
  document.getElementById('drawerDate').textContent = date;
  document.getElementById('drawerStatus').textContent = status;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('drawer-open');
}

document.querySelectorAll('[data-lead]').forEach(row => row.addEventListener('click', () => openLeadDrawer(row.dataset.lead)));
document.querySelectorAll('[data-close-drawer]').forEach(button => button.addEventListener('click', () => {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('drawer-open');
}));

document.getElementById('callLead')?.addEventListener('click', () => showToast('Appel simulé', 'Le numéro du contact serait ouvert sur mobile.'));
document.getElementById('qualifyLead')?.addEventListener('click', () => {
  document.getElementById('drawerStatus').textContent = 'Qualifié';
  showToast('Statut mis à jour', 'La demande est maintenant marquée comme qualifiée.');
});

const modal = document.getElementById('addLeadModal');
document.getElementById('addLeadButton')?.addEventListener('click', () => {
  modal.hidden = false;
  document.body.classList.add('modal-open');
});
document.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', () => {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}));
document.getElementById('saveLead')?.addEventListener('click', () => {
  const name = document.getElementById('newLeadName').value.trim();
  const need = document.getElementById('newLeadNeed').value.trim();
  if (!name || !need) {
    showToast('Informations manquantes', 'Renseignez au minimum le nom et le besoin.');
    return;
  }
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  showToast('Demande ajoutée', `${name} a été ajouté à la démonstration.`);
});

const leadSearch = document.getElementById('leadSearch');
leadSearch?.addEventListener('input', () => {
  const term = leadSearch.value.toLowerCase().trim();
  document.querySelectorAll('#leadsTable .table-row:not(.table-head)').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(term) ? 'grid' : 'none';
  });
});

[
  ['exportReport', 'Rapport préparé', 'Le rapport mensuel serait téléchargé au format PDF.'],
  ['contactExpert', 'Message ouvert', 'Une conversation avec Frédéric serait ouverte.'],
  ['joinMeeting', 'Rendez-vous consulté', 'Le détail du rendez-vous mensuel est prêt.'],
  ['askOptimization', 'Demande transmise', 'Votre expert recevrait la demande d’optimisation.'],
  ['validatePriorities', 'Priorités validées', 'Les trois priorités sont confirmées pour ce mois.'],
  ['saveSettings', 'Paramètres enregistrés', 'Les informations de l’entreprise ont été mises à jour.']
].forEach(([id, title, message]) => document.getElementById(id)?.addEventListener('click', () => showToast(title, message)));

document.querySelectorAll('[data-download]').forEach(button => button.addEventListener('click', () => showToast('Téléchargement simulé', `${button.dataset.download} serait téléchargé en PDF.`)));

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    modal.hidden = true;
    document.body.classList.remove('drawer-open', 'modal-open');
  }
});
