'use strict';

// ----------------------------------------------------------------------------
// 1. FONCTIONS UTILITAIRES & NAVIGATION GÉNÉRALE
// ----------------------------------------------------------------------------

// Fonction de bascule d'élément (active / non active)
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// --- BARRE LATÉRALE (Mobile) ---
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}


// --- FORMULAIRE DE CONTACT ---
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// --- NAVIGATION PRINCIPALE (MENU) ---
// (Version corrigée qui empêche le saut et aligne tout en haut)
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function (event) {
    // 1. Bloquer le saut automatique du navigateur
    event.preventDefault();

    const targetPageName = this.innerHTML.toLowerCase().trim();

    // Si on clique sur un lien du menu, on ferme la page détails projet si elle est ouverte
    const projectDetailSection = document.querySelector("[data-page='project-details']");
    if (projectDetailSection && projectDetailSection.classList.contains('active')) {
       projectDetailSection.classList.remove('active');
    }

    // Mise à jour des liens actifs
    navigationLinks.forEach(link => {
      link.classList.toggle('active', link === this);
    });

    // Mise à jour des pages visibles
    pages.forEach(page => {
      if (page.dataset.page === targetPageName) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });

    // Remonter tout en haut
    window.scrollTo(0, 0);
  });
}


// ----------------------------------------------------------------------------
// 2. GESTION DU PORTFOLIO (FILTRES)
// ----------------------------------------------------------------------------

const filterItems = document.querySelectorAll("[data-filter-item]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const detailDate = document.querySelector("[data-detail-date]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (filterItems[i].dataset.category === selectedValue) {
       filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// Clic sur le select (Mobile)
if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// Options du select
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if(selectValue) selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// Boutons de filtre (Desktop)
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if(selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    filterBtn.forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");
  });
}


// ----------------------------------------------------------------------------
// 3. DONNÉES DES PROJETS
// ----------------------------------------------------------------------------

const projectsData = [
  {
    id: "coreflow",
    title: "CoreFlow",
    date: "Décembre 2025 - Avril 2026",
    subtitle: "Web & Mobile Development",
    headerImage: "./assets/images/Coreflow.png",
    objective: "Concevoir et développer un portail intranet collaboratif moderne (Backend, Web et Mobile), avec une gestion centralisée des documents et des droits d'accès.",
    description: "CoreFlow est une application intranet collaborative développée avec une architecture découplée, s'appuyant sur Vue.js pour le front-end et Node.js/Express pour l'API back-end, reliée à une base de données MySQL. La sécurité globale de la plateforme est assurée par le standard JWT (JSON Web Token), garantissant l'authentification et le contrôle strict des accès aux ressources du serveur. Au sein de cet écosystème, le module de gestion documentaire permet la consultation, le filtrage dynamique par service et la gestion sécurisée des documents d'entreprise en fonction des habilitations de chaque utilisateur.",
    technologies: [
      "Vue.js", 
      "Node.js", 
      "MySQL", 
    ],
    gallery: [
      "./assets/images/Coreflow.png",
        "./assets/images/Coreflow_image2.png",
        "./assets/images/Capture d'écran 2026-04-22 083849.png",
        "./assets/images/Capture d'écran 2026-04-22 083917.png",
        "./assets/images/Capture d'écran 2026-04-22 083938.png",
        "./assets/images/Capture d'écran 2026-04-22 083953.png"
      /* N'hésite pas à ajouter d'autres images ici si tu as des captures mobiles ! */
    ],
    github: "https://github.com/WassilaTabibou/TonRepoCoreFlow", /* Remplace par ton vrai lien GitHub ! */
    download: "#" /* Si tu as un exécutable .apk ou un lien, tu peux le mettre ici */
  },
  {
    id: "champobligatoire",
    title: "Modèle de champ obligatoire",
    date: "Fevrier 2026 - Mars 2026",
    subtitle: "Projet Entreprise",
    headerImage: "./assets/images/Gallery_ChampObligatoire1.png",
    objective: "Améliorer l'Expérience Utilisateur (UX) et sécuriser la saisie des données en concevant un système de validation de formulaire en temps réel, via un composant dynamique et réutilisable.",
    description: "Développement d'un modèle de champ autonome en WEBDEV avec feedback visuel dynamique (adaptation CSS, icônes d'alerte). Mise en place d'une gestion d'état global du formulaire (via l'événement OnBlur) pour bloquer les soumissions erronées. Utilisation de la Programmation Orientée Objet (héritage, surcharge) pour adapter le composant à différents types de saisie (nom, email). Prise en charge de la maintenance corrective post-production suite à un ticket utilisateur : résolution d'un bug de saisie des noms composés par l'intégration d'une expression régulière (Regex) et optimisation des traitements côté client (JavaScript généré) pour éviter le rechargement des pages.",
    technologies: ["WEBDEV", "WLangage", "CSS"],
    gallery: [
      "./assets/images/Gallery_ChampObligatoire1.png",
      "./assets/images/Gallery_ChampObligatoire2.png",
      "./assets/images/Gallery_ChampObligatoire6.png",
      "./assets/images/Gallery_ChampObligatoire3.png",
      "./assets/images/Gallery_ChampObligatoire5.png",
      "./assets/images/Gallery_ChampObligatoire4.png"
    ],
    github: "https://github.com/votre-pseudo/finance",
    download: "#"
  },
  {
    id: "gamehub",
    title: "GameHub",
    subtitle: "Web Development",
    headerImage: "./assets/images/Gallery_gamehub1.png",
    objective: "Développer une plateforme web dynamique permettant aux utilisateurs de gérer leur propre collection de jeux vidéo favoris.",
    description: "Application web responsive dotée d'un système d'authentification et d'un catalogue interactif. Elle permet de rechercher des jeux et de gérer une liste de favoris en temps réel grâce à des requêtes asynchrones (AJAX), offrant une navigation fluide sans rechargement de page.",
    technologies: ["PHP", "MySQL", "JavaScript (Fetch API)", "Bootstrap 5", "HTML5/CSS3"],
    gallery: ["./assets/images/Gallery_gamehub1.png" , "./assets/images/Gallery_gamehub2.png"],
    github: "https://github.com/WassilaTabibou/Projet-GameHub",
    download: "#"
  },
  {
    id: "parametrage-xls",
    title: "Module de paramétrage d'envois xls",
    date: "2025 - 2026",
    subtitle: "Projet Entreprise",
    headerImage: "./assets/images/Capture d'écran 2026-02-03 101811.png",
    objective: "Fournir aux collaborateurs internes un outil permettant de configurer l'envoi automatisé de rapports clients (situation de commande, prix de revient). Le paramétrage inclut la sélection de l'entreprise cible, la définition des destinataires (jusqu'à 4 emails), le contenu du rapport (langue, inclusion de la facture, historique de jours) ainsi que sa planification précise (fréquence journalière/hebdomadaire/mensuelle et créneau horaire).",
    description: "Développement Full-Stack d'une fonctionnalité métier intégrée à un portail extranet existant, réalisé en méthode Agile. L'interface utilisateur repose sur la surcharge d'un modèle de page sous forme de liste, offrant les fonctionnalités complètes de gestion : ajout, modification, duplication et suppression des paramétrages. L'interaction principale s'effectue via l'ouverture d'une popup interactive, techniquement structurée en plusieurs plans, qui guide l'utilisateur étape par étape pour la sélection de l'entreprise, la configuration des paramètres du document et la planification des envois. Côté Back-End, des procédures stockées assurent la lecture et l'enregistrement sécurisé de ces configurations en base de données, garantissant une liaison fiable et performante avec l'interface de saisie.",
    technologies: ["WEBDEV", "WLangage", "Transact-SQL (T-SQL)", "Microsoft SQL Server"],
    gallery: [
      "./assets/images/unnamed.png",
      "./assets/images/Capture d'écran 2026-02-03 113034.png",
      "./assets/images/Capture d'écran 2025-10-06 111141.png",
      "./assets/images/Capture d'écran 2026-02-03 113046.png",
      "./assets/images/Capture d'écran 2026-02-03 112105.png",
      "./assets/images/Capture d'écran 2026-02-03 101811.png"
    ],
    github: "#",
    download: "#"
  },
  {
    id: "triexport",
    title: "Tri et exports Excel de blocs de télémétrie",
    subtitle: "Projet Entreprise",
    headerImage: "./assets/images/Gallery_TriExport3.png",
    objective: "Optimiser l'exploitation des données d'une page de télémétrie interne par l'ajout de fonctionnalités de tri visuel dynamique et la création d'un module d'export Excel sur-mesure, dans le cadre d'une maintenance évolutive.",
    description: "Intervention sur une architecture existante pour y intégrer un module d'export Excel horodaté, comprenant un post-traitement algorithmique en mémoire pour le formatage et le stylage dynamique des données. Implémentation de tris dynamiques asynchrones sur des zones répétées, incluant la modernisation de l'UI (intégration d'icônes vectorielles)",
    technologies: ["WEBDEV", "WLangage"],
    gallery: ["./assets/images/Gallery_TriExport3.png"
      , "./assets/images/Gallery_TriExport1.png"
      , "./assets/images/Gallery_TriExport2.png"
      , "./assets/images/Gallery_TriExport4.png"
    ],
    github: "#",
    download: "#"
  },
  {
    id: "piscine",
    title: "Piscine",
    subtitle: "Projet Ecole",
    headerImage: "./assets/images/gallery_GestionMateriel1.png",
    objective: "Développer une application pour gérer les emprunts de matériel et l'occupation des salles.",
    description: "Système complet de réservation permettant aux utilisateurs de vérifier la disponibilité des ressources, d'effectuer des réservations et de gérer leur profil. Interface responsive réalisée avec Bootstrap.",
    technologies: ["PHP", "MySQL", "HTML5", "Bootstrap 5", "JavaScript"],
    gallery: ["./assets/images/gallery_GestionMateriel4.png", "./assets/images/Gallery_GestionMateriel1.png", "./assets/images/Gallery_GestionMateriel2.png", "./assets/images/Gallery_GestionMateriel3.png"],
    github: "https://github.com/WassilaTabibou/Projet-Piscine",
    download: "#"
  },
];


// ----------------------------------------------------------------------------
// 4. GESTION PAGE DÉTAILS & LIGHTBOX
// ----------------------------------------------------------------------------

// Éléments Page Détails
const projectDetailsSection = document.querySelector("[data-page='project-details']");
const backBtn = document.querySelector("[data-back-to-projects-btn]");
const detailCover = document.querySelector("[data-detail-cover]");
const detailTitle = document.querySelector("[data-detail-title]");
const detailCategory = document.querySelector("[data-detail-category]");
const detailContent = document.querySelector("[data-detail-content]");
const detailGallery = document.querySelector("[data-detail-gallery]");
const detailGithub = document.querySelector("[data-detail-github]");
const detailDownload = document.querySelector("[data-detail-download]");

// Éléments Lightbox
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImg = document.querySelector("[data-lightbox-img]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const lightboxPrev = document.querySelector("[data-lightbox-prev]");
const lightboxNext = document.querySelector("[data-lightbox-next]");

// Variables de Navigation Lightbox
let currentGalleryImages = [];
let currentImageIndex = 0;

// --- FONCTIONS LIGHTBOX ---

const updateLightboxButtons = () => {
  if (!lightboxPrev || !lightboxNext) return;

  // Cacher flèche gauche si index = 0
  if (currentImageIndex === 0) {
    lightboxPrev.style.display = 'none';
  } else {
    lightboxPrev.style.display = 'flex';
  }

  // Cacher flèche droite si index = dernier
  if (currentImageIndex === currentGalleryImages.length - 1) {
    lightboxNext.style.display = 'none';
  } else {
    lightboxNext.style.display = 'flex';
  }
};

const updateLightboxImage = () => {
  if(lightboxImg && currentGalleryImages.length > 0) {
    lightboxImg.src = currentGalleryImages[currentImageIndex];
    updateLightboxButtons();
  }
};

const openLightbox = (index) => {
  currentImageIndex = index;
  updateLightboxImage();
  if(lightbox) lightbox.classList.add("active");
};

const closeLightbox = () => {
  if(lightbox) lightbox.classList.remove("active");
};

const nextImage = (e) => {
  if(e) e.stopPropagation();
  if (currentImageIndex < currentGalleryImages.length - 1) {
    currentImageIndex++;
    updateLightboxImage();
  }
};

const prevImage = (e) => {
  if(e) e.stopPropagation();
  if (currentImageIndex > 0) {
    currentImageIndex--;
    updateLightboxImage();
  }
};

// Écouteurs Lightbox
if(lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if(lightboxNext) lightboxNext.addEventListener("click", nextImage);
if(lightboxPrev) lightboxPrev.addEventListener("click", prevImage);


  
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });



// --- FONCTION PRINCIPALE PROJETS ---

const showProjectDetails = (projectId) => {
  const project = projectsData.find(p => p.id === projectId);
  
  if (!project) return console.error(`Projet introuvable : ${projectId}`);

  // Sauvegarde galerie
  currentGalleryImages = project.gallery;

  // Remplissage
  detailCover.src = project.headerImage;
  detailTitle.innerText = project.title;
  detailDate.innerHTML = project.date;
  detailCategory.innerText = project.subtitle;
  detailGithub.href = project.github;

  if(project.download && project.download !== '#') {
    detailDownload.href = project.download;
    detailDownload.style.display = 'flex';
  } else {
    detailDownload.style.display = 'none';
  }

  // Contenu HTML
  detailContent.innerHTML = `
    <section class="detail-section">
      <h4 class="h4 item-title">Objectif</h4>
      <p>${project.objective}</p>
    </section>
    <section class="detail-section">
      <h4 class="h4 item-title">Description</h4>
      <p>${project.description || "Pas de description détaillée."}</p>
    </section>
    <section class="detail-section">
      <h4 class="h4 item-title">Outils et Technologies</h4>
      <div class="tech-stack">
        ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
      </div>
    </section>
  `;

  // Galerie
  detailGallery.innerHTML = "";
  if(project.gallery && project.gallery.length > 0) {
    project.gallery.forEach((imgSrc, index) => {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = "Galerie projet";
      img.onclick = () => openLightbox(index);
      detailGallery.appendChild(img);
    });
  }

  // Navigation SPA
  const allPages = document.querySelectorAll("[data-page]");
  allPages.forEach(page => page.classList.remove("active"));
  
  // On s'assure que le lien Projets reste actif visuellement
  navigationLinks.forEach(link => {
    if(link.innerHTML.toLowerCase().trim() === 'projets') {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  if(projectDetailsSection) {
    projectDetailsSection.classList.add("active");
    window.scrollTo(0, 0);
  }
};

// Clic sur l'icône oeil
const projectTriggers = document.querySelectorAll("[data-project]");
projectTriggers.forEach(trigger => {
  trigger.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    const projectId = this.getAttribute("data-project");
    showProjectDetails(projectId);
  });
});

// Bouton Retour
if (backBtn) {
  backBtn.addEventListener("click", () => {
    if(projectDetailsSection) projectDetailsSection.classList.remove("active");
    
    // Réactiver la page Projets
    const projectsPage = document.querySelector("[data-page='projets']");
    if(projectsPage) projectsPage.classList.add("active");

    // Réactiver le lien du menu
    navigationLinks.forEach(link => {
        if(link.innerHTML.toLowerCase().trim() === 'projets') link.classList.add('active');
    });

    window.scrollTo(0, 0);
  });
};