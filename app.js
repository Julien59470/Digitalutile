(() => {
  if (!document.querySelector('link[href="layout-v2.css"]')) {
    const layout = document.createElement('link');
    layout.rel = 'stylesheet';
    layout.href = 'layout-v2.css';
    document.head.appendChild(layout);
  }

  document.getElementById('siteHeader')?.remove();

  if (!document.getElementById('sidebarToggle')) {
    const toggle = document.createElement('button');
    toggle.className = 'sidebar-toggle';
    toggle.id = 'sidebarToggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Ouvrir la navigation');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span></span><span></span><span></span>';
    document.querySelector('.demo-bar')?.insertAdjacentElement('afterend', toggle);
  }

  const sideNav = document.getElementById('sideNav');
  if (sideNav && !sideNav.querySelector('.sidebar-head')) {
    sideNav.innerHTML = `
      <div class="sidebar-head">
        <a class="sidebar-brand" href="#" id="brandHome" aria-label="Digitalutile — accueil">
          <span class="brand-mark"><i></i><i></i><i></i></span>
          <span>Digitalutile</span>
        </a>
        <button class="sidebar-close" id="sidebarClose" type="button" aria-label="Fermer la navigation"><svg><use href="#i-close"></use></svg></button>
      </div>

      <div class="mode-switch sidebar-mode-switch" aria-label="Changer d'espace">
        <button class="active" data-mode="client">Espace client</button>
        <button data-mode="admin">Administration</button>
      </div>

      <div class="workspace-card" id="workspaceCard">
        <span class="workspace-logo" id="workspaceLogo">MB</span>
        <span><small id="workspaceEyebrow">Espace client</small><strong id="workspaceName">Maison Bernard</strong></span>
        <button type="button" id="workspaceAction" aria-label="Changer d'entreprise">⌄</button>
      </div>

      <div class="sidebar-context active" id="clientSidebar" data-sidebar-context="client">
        <div>
          <p class="side-label">Pilotage</p>
          <nav>
            <button class="side-link active" data-view-link="overview"><svg><use href="#i-home"></use></svg><span>Vue d’ensemble</span></button>
            <button class="side-link" data-view-link="leads"><svg><use href="#i-users"></use></svg><span>Demandes</span><em>12</em></button>
            <button class="side-link" data-view-link="campaigns"><svg><use href="#i-target"></use></svg><span>Campagnes</span></button>
            <button class="side-link" data-view-link="actions"><svg><use href="#i-tasks"></use></svg><span>Actions</span><em>3</em></button>
            <button class="side-link" data-view-link="documents"><svg><use href="#i-file"></use></svg><span>Documents</span></button>
          </nav>

          <p class="side-label">Compte</p>
          <nav>
            <button class="side-link" data-view-link="settings"><svg><use href="#i-settings"></use></svg><span>Paramètres</span></button>
          </nav>
        </div>

        <div class="expert-card sidebar-footer-card">
          <span class="expert-avatar">FR</span>
          <div><small>Votre expert dédié</small><strong>Frédéric Revignet</strong><p>Disponible aujourd’hui</p></div>
          <button type="button" id="contactExpert">Échanger</button>
        </div>
      </div>

      <div class="sidebar-context" id="adminSidebar" data-sidebar-context="admin">
        <div>
          <p class="side-label">Pilotage agence</p>
          <nav>
            <button class="side-link" data-view-link="admin"><svg><use href="#i-home"></use></svg><span>Vue générale</span></button>
            <button class="side-link" data-admin-target="adminClients"><svg><use href="#i-users"></use></svg><span>Clients</span><em>18</em></button>
            <button class="side-link" data-admin-target="adminCampaigns"><svg><use href="#i-target"></use></svg><span>Campagnes</span></button>
            <button class="side-link" data-admin-target="adminActions"><svg><use href="#i-tasks"></use></svg><span>Actions équipe</span><em>11</em></button>
            <button class="side-link" data-admin-target="adminIntegrations"><svg><use href="#i-settings"></use></svg><span>Intégrations</span></button>
          </nav>

          <p class="side-label">Administration</p>
          <nav>
            <button class="side-link" data-admin-action="team"><svg><use href="#i-users"></use></svg><span>Équipe & accès</span></button>
            <button class="side-link" data-admin-action="settings"><svg><use href="#i-settings"></use></svg><span>Réglages agence</span></button>
          </nav>
        </div>

        <div class="admin-session-card sidebar-footer-card">
          <span class="admin-session-avatar">FR</span>
          <div><small>Session administrateur</small><strong>Frédéric Revignet</strong><p>18 clients actifs</p></div>
          <button type="button" data-mode="client">Voir comme un client</button>
        </div>
      </div>`;
  }

  const adminView = document.querySelector('[data-view="admin"]');
  if (adminView) {
    adminView.id = 'adminOverview';
    const clients = adminView.querySelector('.admin-clients');
    const actions = adminView.querySelector('.admin-queue');
    if (clients) clients.id = 'adminClients';
    if (actions) actions.id = 'adminActions';

    if (!document.getElementById('adminCampaigns')) {
      adminView.insertAdjacentHTML('beforeend', `
        <section class="dashboard-grid admin-detail-grid">
          <article class="panel" id="adminCampaigns">
            <div class="panel-heading"><div><span class="panel-kicker">Campagnes actives</span><h2>Performance du portefeuille</h2><p>Lecture consolidée des budgets, leads et alertes.</p></div><span class="status-badge">24 campagnes</span></div>
            <div class="admin-campaign-list">
              <div><span class="client-logo violet">MB</span><p><strong>Maison Bernard — Urgence plomberie</strong><small>Google Ads · Dunkerque + 25 km</small></p><span><small>Budget</small><strong>1 240 €</strong></span><span><small>CPA</small><strong>18,20 €</strong></span><em class="campaign-health good">Stable</em></div>
              <div><span class="client-logo blue">SL</span><p><strong>Studio Laurent — Rénovation premium</strong><small>Google Ads · Métropole lilloise</small></p><span><small>Budget</small><strong>980 €</strong></span><span><small>CPA</small><strong>31,60 €</strong></span><em class="campaign-health warning">À optimiser</em></div>
              <div><span class="client-logo yellow">AR</span><p><strong>Atelier Ravel — Menuiserie sur mesure</strong><small>Google Ads · Côte d’Opale</small></p><span><small>Budget</small><strong>760 €</strong></span><span><small>CPA</small><strong>42,10 €</strong></span><em class="campaign-health critical">Suspendue</em></div>
            </div>
          </article>

          <article class="panel" id="adminIntegrations">
            <div class="panel-heading compact"><div><span class="panel-kicker">Connecteurs</span><h2>État des intégrations</h2></div><span class="status-badge">5/6 actives</span></div>
            <div class="integration-list">
              <div><span class="integration-dot connected"></span><p><strong>Google Ads</strong><small>Dernière synchronisation il y a 6 min</small></p><em>Connecté</em></div>
              <div><span class="integration-dot connected"></span><p><strong>Google Business Profile</strong><small>18 établissements synchronisés</small></p><em>Connecté</em></div>
              <div><span class="integration-dot connected"></span><p><strong>CRM & formulaires</strong><small>Webhooks opérationnels</small></p><em>Connecté</em></div>
              <div><span class="integration-dot pending"></span><p><strong>Notion</strong><small>Autorisation à renouveler</small></p><em class="warning-text">Action requise</em></div>
            </div>
            <button class="secondary-button full" data-admin-action="integrations">Gérer les connexions</button>
          </article>
        </section>`);
    }
  }
})();

const views = document.querySelectorAll('[data-view]');
const viewLinks = document.querySelectorAll('[data-view-link]');
const sideLinks = document.querySelectorAll('.side-link');
const modeButtons = document.querySelectorAll('[data-mode]');
const sidebarContexts = document.querySelectorAll('[data-sidebar-context]');
const sideNav = document.getElementById('sideNav');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarClose = document.getElementById('sidebarClose');
const workspaceLogo = document.getElementById('workspaceLogo');
const workspaceEyebrow = document.getElementById('workspaceEyebrow');
const workspaceName = document.getElementById('workspaceName');
const workspaceAction = document.getElementById('workspaceAction');
const toast = document.getElementById('toast');
let toastTimer;
let currentMode = 'client';

function showToast(title, message) {
  toast.querySelector('strong').textContent = title;
  toast.querySelector('p').textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function closeSidebar() {
  document.body.classList.remove('sidebar-open');
  sidebarToggle?.setAttribute('aria-expanded', 'false');
}

function switchView(name, options = {}) {
  const target = name === 'admin' ? 'admin' : name;
  views.forEach(view => view.classList.toggle('active', view.dataset.view === target));
  sideLinks.forEach(link => link.classList.toggle('active', link.dataset.viewLink === name));
  document.querySelectorAll('[data-admin-target]').forEach(link => link.classList.remove('active'));
  closeSidebar();
  if (!options.keepScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setMode(mode, notify = true) {
  currentMode = mode === 'admin' ? 'admin' : 'client';
  document.body.dataset.mode = currentMode;
  modeButtons.forEach(button => button.classList.toggle('active', button.dataset.mode === currentMode));
  sidebarContexts.forEach(context => context.classList.toggle('active', context.dataset.sidebarContext === currentMode));

  if (currentMode === 'admin') {
    workspaceLogo.textContent = 'DU';
    workspaceEyebrow.textContent = 'Administration';
    workspaceName.textContent = 'Digitalutile';
    workspaceAction.textContent = '18';
    workspaceAction.setAttribute('aria-label', '18 clients actifs');
    switchView('admin');
    if (notify) showToast('Vue administrateur activée', 'La sidebar affiche maintenant les outils de pilotage agence.');
  } else {
    workspaceLogo.textContent = 'MB';
    workspaceEyebrow.textContent = 'Espace client';
    workspaceName.textContent = 'Maison Bernard';
    workspaceAction.textContent = '⌄';
    workspaceAction.setAttribute('aria-label', "Changer d'entreprise");
    switchView('overview');
    if (notify) showToast('Vue client activée', 'La sidebar affiche les fonctionnalités accessibles au client.');
  }
}

viewLinks.forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  const name = link.dataset.viewLink;
  if (name === 'admin') currentMode = 'admin';
  switchView(name);
}));

modeButtons.forEach(button => button.addEventListener('click', () => setMode(button.dataset.mode)));

document.getElementById('brandHome')?.addEventListener('click', event => {
  event.preventDefault();
  switchView(currentMode === 'admin' ? 'admin' : 'overview');
});

sidebarToggle?.addEventListener('click', () => {
  const open = !document.body.classList.contains('sidebar-open');
  document.body.classList.toggle('sidebar-open', open);
  sidebarToggle.setAttribute('aria-expanded', String(open));
});
sidebarClose?.addEventListener('click', closeSidebar);

document.addEventListener('click', event => {
  if (document.body.classList.contains('sidebar-open') && !sideNav.contains(event.target) && !sidebarToggle.contains(event.target)) closeSidebar();
});

document.querySelectorAll('[data-admin-target]').forEach(button => button.addEventListener('click', () => {
  if (currentMode !== 'admin') setMode('admin', false);
  switchView('admin', { keepScroll: true });
  document.querySelectorAll('[data-admin-target]').forEach(item => item.classList.toggle('active', item === button));
  document.querySelector('[data-view-link="admin"]')?.classList.remove('active');
  requestAnimationFrame(() => document.getElementById(button.dataset.adminTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  closeSidebar();
}));

document.querySelectorAll('[data-admin-action]').forEach(button => button.addEventListener('click', () => {
  const messages = {
    team: ['Gestion des accès', 'La gestion des membres et permissions serait ouverte.'],
    settings: ['Réglages agence', 'Les préférences globales de Digitalutile seraient affichées.'],
    integrations: ['Connecteurs', 'Le panneau de gestion des intégrations serait ouvert.']
  };
  const [title, message] = messages[button.dataset.adminAction] || ['Administration', 'Cette fonctionnalité est simulée dans la maquette.'];
  showToast(title, message);
  closeSidebar();
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
    closeSidebar();
    document.body.classList.remove('drawer-open', 'modal-open');
  }
});

setMode('client', false);
