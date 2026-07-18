const DIGITALUTILE_LOGO = 'https://www.digitalutile.net/assets/digitalutile-logo.png';

(() => {
  const ensureStylesheet = (href) => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  ensureStylesheet('layout-v2.css');
  ensureStylesheet('admin-pages.css');

  document.querySelectorAll('link[rel~="icon"]').forEach((link) => link.remove());
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/png';
  favicon.href = DIGITALUTILE_LOGO;
  document.head.appendChild(favicon);

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
  if (sideNav) {
    sideNav.innerHTML = `
      <div class="sidebar-head">
        <a class="sidebar-brand" href="#" id="brandHome" aria-label="Digitalutile — accueil">
          <img class="sidebar-brand-logo" src="${DIGITALUTILE_LOGO}" alt="Logo Digitalutile">
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

      <div class="sidebar-context active" data-sidebar-context="client">
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

      <div class="sidebar-context" data-sidebar-context="admin">
        <div>
          <p class="side-label">Pilotage agence</p>
          <nav>
            <button class="side-link" data-view-link="admin"><svg><use href="#i-home"></use></svg><span>Vue générale</span></button>
            <button class="side-link" data-view-link="admin-clients"><svg><use href="#i-users"></use></svg><span>Clients</span><em>18</em></button>
            <button class="side-link" data-view-link="admin-campaigns"><svg><use href="#i-target"></use></svg><span>Campagnes</span></button>
            <button class="side-link" data-view-link="admin-actions"><svg><use href="#i-tasks"></use></svg><span>Actions équipe</span><em>11</em></button>
            <button class="side-link" data-view-link="admin-integrations"><svg><use href="#i-settings"></use></svg><span>Intégrations</span></button>
          </nav>

          <p class="side-label">Administration</p>
          <nav>
            <button class="side-link" data-view-link="admin-team"><svg><use href="#i-users"></use></svg><span>Équipe & accès</span></button>
            <button class="side-link" data-view-link="admin-settings"><svg><use href="#i-settings"></use></svg><span>Réglages agence</span></button>
          </nav>
        </div>

        <div class="admin-session-card sidebar-footer-card">
          <img class="admin-session-logo" src="${DIGITALUTILE_LOGO}" alt="Logo Digitalutile">
          <div><small>Session administrateur</small><strong>Frédéric Revignet</strong><p>18 clients actifs</p></div>
          <button type="button" data-mode="client">Voir comme un client</button>
        </div>
      </div>`;
  }

  const contentArea = document.querySelector('.content-area');
  const adminOverview = document.querySelector('[data-view="admin"]');

  const addAdminView = (name, html) => {
    if (!contentArea || document.querySelector(`[data-view="${name}"]`)) return;
    const section = document.createElement('section');
    section.className = 'view admin-page';
    section.dataset.view = name;
    section.innerHTML = html;
    contentArea.appendChild(section);
  };

  const adminClientsMarkup = adminOverview?.querySelector('.admin-clients')?.outerHTML || '';
  const adminQueueMarkup = adminOverview?.querySelector('.admin-queue')?.outerHTML || '';

  addAdminView('admin-clients', `
    <div class="page-heading compact-heading">
      <div><span class="section-pill"><svg><use href="#i-users"></use></svg> Portefeuille clients</span><h1>Gérer les comptes <span>depuis une vue dédiée.</span></h1><p>Suivez l’état des comptes, leur score de visibilité et leurs performances.</p></div>
      <button class="dark-button" data-admin-demo="new-client"><svg><use href="#i-plus"></use></svg> Nouveau client</button>
    </div>
    <section class="kpi-grid three"><article class="kpi-card"><p>Clients actifs</p><strong>18</strong><small>+3 ce trimestre</small></article><article class="kpi-card"><p>Comptes à surveiller</p><strong>4</strong><small>score inférieur à 65</small></article><article class="kpi-card"><p>Demandes générées</p><strong>824</strong><small>sur les 30 derniers jours</small></article></section>
    <section class="panel admin-page-panel"><div class="table-toolbar"><label class="search-field"><svg><use href="#i-search"></use></svg><input id="adminClientSearch" type="search" placeholder="Rechercher un client..."></label><button class="secondary-button"><svg><use href="#i-filter"></use></svg> Filtres</button></div>${adminClientsMarkup}</section>`);

  addAdminView('admin-campaigns', `
    <div class="page-heading compact-heading"><div><span class="section-pill"><svg><use href="#i-target"></use></svg> Campagnes agence</span><h1>Piloter les campagnes <span>compte par compte.</span></h1><p>Budgets, coûts d’acquisition et alertes réunis dans une page dédiée.</p></div><button class="dark-button" data-admin-demo="new-campaign"><svg><use href="#i-plus"></use></svg> Nouvelle campagne</button></div>
    <section class="kpi-grid three"><article class="kpi-card"><p>Campagnes actives</p><strong>24</strong><small>sur 18 comptes</small></article><article class="kpi-card"><p>Budget mensuel piloté</p><strong>32 480 €</strong><small>82 % consommé</small></article><article class="kpi-card"><p>CPA moyen</p><strong>28,40 €</strong><small>-8 % sur 30 jours</small></article></section>
    <section class="panel admin-page-panel"><div class="panel-heading"><div><span class="panel-kicker">Performance consolidée</span><h2>Campagnes du portefeuille</h2><p>Lecture des budgets, résultats et points d’attention.</p></div><span class="status-badge">24 campagnes</span></div><div class="admin-campaign-list">
      <div><span class="client-logo violet">MB</span><p><strong>Maison Bernard — Urgence plomberie</strong><small>Google Ads · Dunkerque + 25 km</small></p><span><small>Budget</small><strong>1 240 €</strong></span><span><small>CPA</small><strong>18,20 €</strong></span><em class="campaign-health good">Stable</em></div>
      <div><span class="client-logo blue">SL</span><p><strong>Studio Laurent — Rénovation premium</strong><small>Google Ads · Métropole lilloise</small></p><span><small>Budget</small><strong>980 €</strong></span><span><small>CPA</small><strong>31,60 €</strong></span><em class="campaign-health warning">À optimiser</em></div>
      <div><span class="client-logo yellow">AR</span><p><strong>Atelier Ravel — Menuiserie sur mesure</strong><small>Google Ads · Côte d’Opale</small></p><span><small>Budget</small><strong>760 €</strong></span><span><small>CPA</small><strong>42,10 €</strong></span><em class="campaign-health critical">Suspendue</em></div>
      <div><span class="client-logo green">NC</span><p><strong>Nova Conseil — Prospects B2B</strong><small>Google Ads · France</small></p><span><small>Budget</small><strong>2 100 €</strong></span><span><small>CPA</small><strong>25,70 €</strong></span><em class="campaign-health good">Stable</em></div>
    </div></section>`);

  addAdminView('admin-actions', `
    <div class="page-heading compact-heading"><div><span class="section-pill"><svg><use href="#i-tasks"></use></svg> Actions équipe</span><h1>Organiser les actions <span>sans perdre les priorités.</span></h1><p>Une file dédiée pour répartir, suivre et valider le travail de l’équipe.</p></div><button class="dark-button" data-admin-demo="new-task"><svg><use href="#i-plus"></use></svg> Nouvelle action</button></div>
    <section class="kpi-grid three"><article class="kpi-card"><p>Actions ouvertes</p><strong>11</strong><small>4 prioritaires</small></article><article class="kpi-card"><p>Terminées cette semaine</p><strong>27</strong><small>92 % dans les délais</small></article><article class="kpi-card"><p>Charge équipe</p><strong>74%</strong><small>capacité disponible</small></article></section>
    <section class="dashboard-grid admin-work-grid"><article class="panel">${adminQueueMarkup}</article><article class="panel"><div class="panel-heading compact"><div><span class="panel-kicker">Répartition</span><h2>Charge par membre</h2></div></div><div class="team-load-list"><div><span class="team-avatar violet">FR</span><p><strong>Frédéric Revignet</strong><small>Google Ads & stratégie</small></p><span><b style="width:82%"></b></span><em>8 actions</em></div><div><span class="team-avatar blue">SM</span><p><strong>Sophie Martin</strong><small>SEO local & contenus</small></p><span><b style="width:64%"></b></span><em>6 actions</em></div><div><span class="team-avatar green">JL</span><p><strong>Jules Leroy</strong><small>Automatisations & tracking</small></p><span><b style="width:48%"></b></span><em>4 actions</em></div></div></article></section>`);

  addAdminView('admin-integrations', `
    <div class="page-heading compact-heading"><div><span class="section-pill"><svg><use href="#i-settings"></use></svg> Intégrations</span><h1>Contrôler chaque connexion <span>depuis un écran dédié.</span></h1><p>Vérifiez les synchronisations et intervenez rapidement en cas d’erreur.</p></div><button class="dark-button" data-admin-demo="add-integration"><svg><use href="#i-plus"></use></svg> Ajouter une connexion</button></div>
    <section class="kpi-grid three"><article class="kpi-card"><p>Connecteurs actifs</p><strong>5/6</strong><small>1 action requise</small></article><article class="kpi-card"><p>Dernière synchronisation</p><strong>6 min</strong><small>Google Ads</small></article><article class="kpi-card"><p>Établissements GBP</p><strong>18</strong><small>tous synchronisés</small></article></section>
    <section class="panel admin-page-panel"><div class="panel-heading compact"><div><span class="panel-kicker">Connecteurs</span><h2>État des intégrations</h2></div><span class="status-badge">5/6 actives</span></div><div class="integration-list integration-page-list"><div><span class="integration-dot connected"></span><p><strong>Google Ads</strong><small>Dernière synchronisation il y a 6 min</small></p><em>Connecté</em><button class="secondary-button">Configurer</button></div><div><span class="integration-dot connected"></span><p><strong>Google Business Profile</strong><small>18 établissements synchronisés</small></p><em>Connecté</em><button class="secondary-button">Configurer</button></div><div><span class="integration-dot connected"></span><p><strong>CRM & formulaires</strong><small>Webhooks opérationnels</small></p><em>Connecté</em><button class="secondary-button">Configurer</button></div><div><span class="integration-dot connected"></span><p><strong>Calendrier stratégique</strong><small>Notion synchronisé il y a 18 min</small></p><em>Connecté</em><button class="secondary-button">Configurer</button></div><div><span class="integration-dot pending"></span><p><strong>Export PDF automatisé</strong><small>Autorisation à renouveler</small></p><em class="warning-text">Action requise</em><button class="secondary-button">Reconnecter</button></div></div></section>`);

  addAdminView('admin-team', `
    <div class="page-heading compact-heading"><div><span class="section-pill"><svg><use href="#i-users"></use></svg> Équipe & accès</span><h1>Gérer les membres <span>et leurs permissions.</span></h1><p>Attribuez les comptes, rôles et niveaux d’accès depuis une page distincte.</p></div><button class="dark-button" data-admin-demo="invite-member"><svg><use href="#i-plus"></use></svg> Inviter un membre</button></div>
    <section class="panel admin-page-panel"><div class="panel-heading"><div><span class="panel-kicker">Membres actifs</span><h2>Équipe Digitalutile</h2></div><span class="status-badge">6 membres</span></div><div class="team-members-list"><div><span class="team-avatar violet">FR</span><p><strong>Frédéric Revignet</strong><small>frédéric@digitalutile.net</small></p><span><small>Rôle</small><strong>Administrateur</strong></span><span><small>Comptes</small><strong>Tous</strong></span><button class="secondary-button">Modifier</button></div><div><span class="team-avatar blue">SM</span><p><strong>Sophie Martin</strong><small>sophie@digitalutile.net</small></p><span><small>Rôle</small><strong>Responsable SEO</strong></span><span><small>Comptes</small><strong>9</strong></span><button class="secondary-button">Modifier</button></div><div><span class="team-avatar green">JL</span><p><strong>Jules Leroy</strong><small>jules@digitalutile.net</small></p><span><small>Rôle</small><strong>Technique</strong></span><span><small>Comptes</small><strong>12</strong></span><button class="secondary-button">Modifier</button></div></div></section>`);

  addAdminView('admin-settings', `
    <div class="page-heading compact-heading"><div><span class="section-pill"><svg><use href="#i-settings"></use></svg> Réglages agence</span><h1>Configurer l’espace <span>administrateur.</span></h1><p>Personnalisez les règles globales, notifications et paramètres de marque.</p></div></div>
    <section class="settings-grid"><article class="panel settings-card"><h2>Informations de l’agence</h2><div class="form-grid"><label>Nom de l’agence<input value="Digitalutile"></label><label>Adresse web<input value="digitalutile.net"></label><label>Email principal<input value="contact@digitalutile.net"></label><label>Téléphone<input value="+33 0 00 00 00 00"></label></div><button class="dark-button" data-admin-demo="save-admin-settings">Enregistrer les modifications</button></article><article class="panel settings-card"><h2>Notifications administrateur</h2><label class="toggle-row"><span><strong>Erreur de synchronisation</strong><small>Alerter immédiatement les administrateurs.</small></span><input type="checkbox" checked><i></i></label><label class="toggle-row"><span><strong>Budget presque consommé</strong><small>Prévenir à 85 % du budget mensuel.</small></span><input type="checkbox" checked><i></i></label><label class="toggle-row"><span><strong>Rapport agence</strong><small>Résumé consolidé chaque lundi.</small></span><input type="checkbox"><i></i></label></article></section>`);
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
  if (!toast) return;
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

function updateWorkspace(mode) {
  if (!workspaceLogo || !workspaceEyebrow || !workspaceName || !workspaceAction) return;
  if (mode === 'admin') {
    workspaceLogo.classList.add('official-workspace-logo');
    workspaceLogo.innerHTML = `<img src="${DIGITALUTILE_LOGO}" alt="">`;
    workspaceEyebrow.textContent = 'Administration';
    workspaceName.textContent = 'Digitalutile';
    workspaceAction.textContent = '18';
    workspaceAction.setAttribute('aria-label', '18 clients actifs');
  } else {
    workspaceLogo.classList.remove('official-workspace-logo');
    workspaceLogo.textContent = 'MB';
    workspaceEyebrow.textContent = 'Espace client';
    workspaceName.textContent = 'Maison Bernard';
    workspaceAction.textContent = '⌄';
    workspaceAction.setAttribute('aria-label', "Changer d'entreprise");
  }
}

function switchView(name) {
  views.forEach((view) => view.classList.toggle('active', view.dataset.view === name));
  sideLinks.forEach((link) => link.classList.toggle('active', link.dataset.viewLink === name));
  closeSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setMode(mode, notify = true, targetView = null) {
  currentMode = mode === 'admin' ? 'admin' : 'client';
  document.body.dataset.mode = currentMode;
  modeButtons.forEach((button) => button.classList.toggle('active', button.dataset.mode === currentMode));
  sidebarContexts.forEach((context) => context.classList.toggle('active', context.dataset.sidebarContext === currentMode));
  updateWorkspace(currentMode);
  switchView(targetView || (currentMode === 'admin' ? 'admin' : 'overview'));
  if (notify) {
    showToast(
      currentMode === 'admin' ? 'Vue administrateur activée' : 'Vue client activée',
      currentMode === 'admin' ? 'Les pages de pilotage agence sont maintenant accessibles.' : 'Les fonctionnalités du compte client sont affichées.'
    );
  }
}

viewLinks.forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  const name = link.dataset.viewLink;
  const targetMode = name.startsWith('admin') ? 'admin' : 'client';
  if (targetMode !== currentMode) setMode(targetMode, false, name);
  else switchView(name);
}));

modeButtons.forEach((button) => button.addEventListener('click', () => setMode(button.dataset.mode)));

document.getElementById('brandHome')?.addEventListener('click', (event) => {
  event.preventDefault();
  switchView(currentMode === 'admin' ? 'admin' : 'overview');
});

sidebarToggle?.addEventListener('click', () => {
  const open = !document.body.classList.contains('sidebar-open');
  document.body.classList.toggle('sidebar-open', open);
  sidebarToggle.setAttribute('aria-expanded', String(open));
});
sidebarClose?.addEventListener('click', closeSidebar);

document.addEventListener('click', (event) => {
  if (document.body.classList.contains('sidebar-open') && sideNav && !sideNav.contains(event.target) && !sidebarToggle?.contains(event.target)) closeSidebar();
});

const periodData = {
  7: { leads: '19', calls: '12', roas: '4,6×', rank: '2,6', total: '19', label: 'demandes sur 7 jours' },
  30: { leads: '68', calls: '42', roas: '4,2×', rank: '2,8', total: '68', label: 'demandes sur 30 jours' },
  90: { leads: '194', calls: '118', roas: '3,9×', rank: '3,1', total: '194', label: 'demandes sur 90 jours' }
};

document.querySelectorAll('[data-period]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-period]').forEach((item) => item.classList.toggle('active', item === button));
  const data = periodData[button.dataset.period];
  Object.entries(data).forEach(([key, value]) => {
    const element = document.querySelector(`[data-kpi="${key}"]`);
    if (element) element.textContent = value;
  });
  const chartTotal = document.getElementById('chartTotal');
  if (chartTotal) {
    chartTotal.textContent = data.total;
    if (chartTotal.nextElementSibling) chartTotal.nextElementSibling.textContent = data.label;
  }
  document.getElementById('lineChart')?.animate([{ opacity: .35, transform: 'translateY(5px)' }, { opacity: 1, transform: 'none' }], { duration: 360 });
}));

const drawer = document.getElementById('leadDrawer');
function openLeadDrawer(data) {
  if (!drawer || !data) return;
  const [name, need, source, date, status] = data.split('|');
  const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
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

document.querySelectorAll('[data-lead]').forEach((row) => row.addEventListener('click', () => openLeadDrawer(row.dataset.lead)));
document.querySelectorAll('[data-close-drawer]').forEach((button) => button.addEventListener('click', () => {
  drawer?.classList.remove('open');
  drawer?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('drawer-open');
}));

document.getElementById('callLead')?.addEventListener('click', () => showToast('Appel simulé', 'Le numéro du contact serait ouvert sur mobile.'));
document.getElementById('qualifyLead')?.addEventListener('click', () => {
  const status = document.getElementById('drawerStatus');
  if (status) status.textContent = 'Qualifié';
  showToast('Statut mis à jour', 'La demande est maintenant marquée comme qualifiée.');
});

const modal = document.getElementById('addLeadModal');
document.getElementById('addLeadButton')?.addEventListener('click', () => {
  if (!modal) return;
  modal.hidden = false;
  document.body.classList.add('modal-open');
});
document.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', () => {
  if (modal) modal.hidden = true;
  document.body.classList.remove('modal-open');
}));
document.getElementById('saveLead')?.addEventListener('click', () => {
  const name = document.getElementById('newLeadName')?.value.trim();
  const need = document.getElementById('newLeadNeed')?.value.trim();
  if (!name || !need) {
    showToast('Informations manquantes', 'Renseignez au minimum le nom et le besoin.');
    return;
  }
  if (modal) modal.hidden = true;
  document.body.classList.remove('modal-open');
  showToast('Demande ajoutée', `${name} a été ajouté à la démonstration.`);
});

const leadSearch = document.getElementById('leadSearch');
leadSearch?.addEventListener('input', () => {
  const term = leadSearch.value.toLowerCase().trim();
  document.querySelectorAll('#leadsTable .table-row:not(.table-head)').forEach((row) => {
    row.style.display = row.textContent.toLowerCase().includes(term) ? 'grid' : 'none';
  });
});

const adminClientSearch = document.getElementById('adminClientSearch');
adminClientSearch?.addEventListener('input', () => {
  const term = adminClientSearch.value.toLowerCase().trim();
  document.querySelectorAll('[data-view="admin-clients"] .admin-client-list > div').forEach((row) => {
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

document.querySelectorAll('[data-download]').forEach((button) => button.addEventListener('click', () => showToast('Téléchargement simulé', `${button.dataset.download} serait téléchargé en PDF.`)));
document.querySelectorAll('[data-admin-demo]').forEach((button) => button.addEventListener('click', () => showToast('Action administrateur', 'Cette action est simulée dans la maquette.')));
document.querySelectorAll('.integration-page-list button, .team-members-list button').forEach((button) => button.addEventListener('click', () => showToast('Panneau ouvert', 'Les réglages détaillés seraient affichés ici.')));
workspaceAction?.addEventListener('click', () => showToast(currentMode === 'admin' ? 'Portefeuille clients' : 'Sélection du compte', currentMode === 'admin' ? '18 comptes sont actuellement actifs.' : 'Le sélecteur d’entreprise serait ouvert.'));

window.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  drawer?.classList.remove('open');
  drawer?.setAttribute('aria-hidden', 'true');
  if (modal) modal.hidden = true;
  closeSidebar();
  document.body.classList.remove('drawer-open', 'modal-open');
});

setMode('client', false);