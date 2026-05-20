'use strict';

const themeToggle = document.querySelector('#themeToggle');
const languageButtons = document.querySelectorAll('[data-language]');
const serviceTabs = document.querySelectorAll('[data-service-tab]');
const servicePanels = document.querySelectorAll('[data-service-panel]');
const serviceDetails = document.querySelector('#serviceDetails');

const getSavedValue = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const saveValue = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // The site still works if a file-based browser blocks local storage.
  }
};

const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      process: 'Process',
      results: 'Results',
      faq: 'FAQ',
      book: 'Book online',
    },
    page: {
      '.nav__dropdown-link[href="#auto-detailing-services"]':
        'Auto Detailing Services',
      '.nav__dropdown-link[href="#ceramic-coatings"]': 'Ceramic Coatings',
      '.nav__dropdown-link[href="#paint-correction"]': 'Paint Correction',
      '.hero .eyebrow': 'Mobile auto detailing and paint restoration',
      '.hero h1': 'Premium detailing at your driveway.',
      '.hero__text':
        'We bring professional detailing, paint correction, ceramic coating, and odor treatment to your home with the tools and products needed for a clean, glossy, protected finish.',
      '.hero__actions a[href="#quote"]': 'Get a Quote',
      '.hero__actions a[href="#services"]': 'View services',
      '#services .section__heading .eyebrow': 'Services',
      '#services .section__heading h2':
        'Everything your vehicle needs to look its best.',
      '.packages .eyebrow': 'Popular packages',
      '.packages h2': 'Choose the level that fits your vehicle.',
      '.process .eyebrow': 'Process',
      '.process h2': 'A simple mobile detailing process.',
      '.gallery .eyebrow': 'Results',
      '.gallery h2': 'Clean details. Sharp gloss. Protected surfaces.',
      '#quote .eyebrow': 'Get a quote',
      '#quote h2': 'Request pricing for your vehicle.',
    },
    theme: {
      day: 'Day',
      night: 'Night',
      dayLabel: 'Switch to day mode',
      nightLabel: 'Switch to night mode',
    },
    services: {
      'auto-detailing': {
        title: 'Auto Detailing',
        text: 'Exterior wash, decontamination, gloss boost, trim care, wheels, tires, and a clean finish from bumper to bumper.',
      },
      'interior-detailing': {
        title: 'Interior Detailing',
        text: 'Vacuuming, steam cleaning, stain treatment, leather care, vents, plastics, glass, and all touch points refreshed.',
      },
      'paint-correction': {
        title: 'Paint Correction',
        text: 'Machine polishing to reduce swirl marks, oxidation, haze, and light scratches while restoring clarity and depth.',
      },
      'ceramic-coating': {
        title: 'Ceramic Coating',
        text: 'High-gloss ceramic protection for paint with easier washing, strong water beading, and lasting shine.',
      },
      'glass-coating': {
        title: 'Glass Coating',
        text: 'Hydrophobic glass treatment to improve visibility in wet weather and help keep exterior glass cleaner.',
      },
      'interior-ceramic': {
        title: 'Interior Ceramic Coating',
        text: 'Protection for leather, fabric, plastics, and high-contact surfaces against spills, staining, and daily use.',
      },
      'wheel-coating': {
        title: 'Wheel Coating',
        text: 'Ceramic protection for wheels to help resist brake dust, road grime, and harsh cleaning cycles.',
      },
      'ozone-treatment': {
        title: 'Ozone Treatment',
        text: 'Odor treatment for smoke, food, pets, and stubborn cabin smells after a proper interior cleaning.',
      },
      maintenance: {
        title: 'Maintenance Programs',
        text: 'Scheduled upkeep for clients who want consistent results without waiting until the vehicle needs a full reset.',
      },
    },
    panels: {
      'auto-detailing': `
        <div class="service-panel__intro">
          <p class="eyebrow">Auto detailing services</p>
          <h3>Exterior, interior, and complete mobile detailing.</h3>
          <p>Choose the level that fits your vehicle. Each option can be adjusted after we see the size, condition, stains, pet hair, paint condition, and protection you want.</p>
        </div>
        <div class="service-offers">
          <article class="service-offer">
            <span>From $125</span>
            <h4>Exterior Detailing</h4>
            <ul>
              <li>Hand wash and foam bath</li>
              <li>Bug and tar removal</li>
              <li>Wheels and tires cleaned</li>
              <li>Iron particle removal</li>
              <li>Clay bar treatment</li>
              <li>Streak-free glass</li>
              <li>Protective wax or sealant</li>
            </ul>
            <a class="button" href="#quote">Start Your Quote</a>
          </article>
          <article class="service-offer">
            <span>From $185</span>
            <h4>Full Interior & Exterior</h4>
            <ul>
              <li>Basic in and out detailing</li>
              <li>Inside and out deep cleaning</li>
              <li>Interior shampoo</li>
              <li>Wash and wax</li>
              <li>Door jamb cleaning</li>
              <li>Glass, trim, wheels, and tires</li>
              <li>Upgrade to paint correction or coating</li>
            </ul>
            <a class="button" href="#quote">Start Your Quote</a>
          </article>
          <article class="service-offer">
            <span>From $145</span>
            <h4>Interior Detailing</h4>
            <ul>
              <li>Detailed vacuum and wipe down</li>
              <li>Trash removal</li>
              <li>Carpet and upholstery shampoo</li>
              <li>Hot water extraction</li>
              <li>Steam cleaning</li>
              <li>Odor removal and ozone treatment</li>
              <li>Leather conditioning and stain removal</li>
            </ul>
            <a class="button" href="#quote">Start Your Quote</a>
          </article>
        </div>
        <div class="service-copy">
          <h4>Exterior Detailing Services</h4>
          <p>Our exterior detailing starts with a careful hand wash using premium shampoos. We clean curves, trim, wheels, glass, and hard-to-reach areas so the vehicle is free from dirt, grime, and road contamination.</p>
          <h4>Clay Bar Treatment</h4>
          <p>Clay treatment removes bonded contaminants from the paint so the surface feels smooth and is ready for wax, sealant, polishing, or ceramic protection.</p>
          <h4>Wheel and Tire Detailing</h4>
          <p>Wheels, tires, and visible wheel faces are cleaned and dressed for a complete, finished look.</p>
        </div>
      `,
      'interior-detailing': `
        <div class="service-panel__intro">
          <p class="eyebrow">Interior detailing services</p>
          <h3>Deep-clean every surface you touch.</h3>
          <p>Interior mobile detailing is a careful reset for seats, carpet, mats, plastics, vents, glass, leather, and high-contact areas.</p>
        </div>
        <div class="service-copy service-copy--columns">
          <div><h4>Preserves Resale Value</h4><p>A well-maintained interior can help protect the value and appearance of your vehicle.</p></div>
          <div><h4>Enhances Comfort</h4><p>A clean cabin makes every drive feel better for you and your passengers.</p></div>
          <div><h4>Protects Surfaces</h4><p>Regular cleaning helps reduce premature wear on fabric, leather, plastics, and touch points.</p></div>
          <div><h4>Improves Air Quality</h4><p>Removing dust, dirt, allergens, and odor sources supports a fresher cabin.</p></div>
        </div>
        <a class="button" href="#quote">Start Your Quote</a>
      `,
      'paint-correction': `
        <div class="service-panel__intro">
          <p class="eyebrow">Paint correction</p>
          <h3>Restore clarity, gloss, and depth.</h3>
          <p>Paint correction uses machine polishing to reduce swirl marks, oxidation, haze, water spotting, and lighter scratches.</p>
        </div>
        <div class="service-copy service-copy--columns">
          <div><h4>Paint Inspection</h4><p>We inspect the finish before choosing the polishing plan.</p></div>
          <div><h4>Test Spot</h4><p>A test area helps confirm the safest path to better gloss.</p></div>
          <div><h4>Polish and Refine</h4><p>The surface is corrected and refined to bring back clarity.</p></div>
          <div><h4>Protect the Finish</h4><p>Add sealant or ceramic coating after correction to protect the result.</p></div>
        </div>
        <a class="button" href="#quote">Start Your Quote</a>
      `,
      'ceramic-coating': `
        <div class="service-panel__intro">
          <p class="eyebrow">Ceramic coating</p>
          <h3>Glossy protection with easier washing.</h3>
          <p>Ceramic coating adds slickness, shine, water beading, and a stronger protective layer after proper surface preparation.</p>
        </div>
        <div class="service-copy service-copy--columns">
          <div><h4>Surface Prep</h4><p>Wash, decontamination, and paint prep before application.</p></div>
          <div><h4>Paint Protection</h4><p>Helps protect against grime, UV exposure, and road film.</p></div>
          <div><h4>Hydrophobic Finish</h4><p>Water beads strongly and the vehicle is easier to maintain.</p></div>
          <div><h4>Maintenance Guidance</h4><p>We explain how to wash and maintain the coating properly.</p></div>
        </div>
        <a class="button" href="#quote">Start Your Quote</a>
      `,
      'glass-coating':
        '<div class="service-panel__intro"><p class="eyebrow">Glass coating</p><h3>Clearer glass in wet weather.</h3><p>Hydrophobic glass treatment helps water move off exterior glass faster and makes bugs, grime, and road film easier to clean.</p></div><a class="button" href="#quote">Start Your Quote</a>',
      'interior-ceramic':
        '<div class="service-panel__intro"><p class="eyebrow">Interior ceramic coating</p><h3>Protect seats, fabric, leather, and daily touch points.</h3><p>Interior protection helps resist staining, spills, dye transfer, and daily wear after the interior has been cleaned properly.</p></div><a class="button" href="#quote">Start Your Quote</a>',
      'wheel-coating':
        '<div class="service-panel__intro"><p class="eyebrow">Wheel coating</p><h3>Protection for wheels that see brake dust and road grime.</h3><p>Wheel coating adds a slick ceramic layer that makes routine cleaning easier and helps resist heavy contamination.</p></div><a class="button" href="#quote">Start Your Quote</a>',
      'ozone-treatment':
        '<div class="service-panel__intro"><p class="eyebrow">Ozone treatment</p><h3>Help reduce stubborn cabin odors.</h3><p>Ozone treatment is best after interior cleaning removes the source of odor. It can help with smoke, pet, food, mildew, and stubborn smells trapped in the cabin.</p></div><a class="button" href="#quote">Start Your Quote</a>',
      maintenance:
        '<div class="service-panel__intro"><p class="eyebrow">Maintenance programs</p><h3>Keep the vehicle clean before it needs a full reset.</h3><p>Maintenance plans are built for clients who want steady results: regular exterior washing, light interior refreshes, glass, wheels, tires, trim, and protection top-ups when needed.</p></div><a class="button" href="#quote">Start Your Quote</a>',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      process: 'Processus',
      results: 'Résultats',
      faq: 'FAQ',
      book: 'Réserver',
    },
    page: {
      '.nav__dropdown-link[href="#auto-detailing-services"]':
        'Services de detailing auto',
      '.nav__dropdown-link[href="#ceramic-coatings"]': 'Revêtements céramiques',
      '.nav__dropdown-link[href="#paint-correction"]': 'Correction de peinture',
      '.hero .eyebrow': 'Detailing auto mobile et restauration de peinture',
      '.hero h1': 'Detailing premium directement à votre entrée.',
      '.hero__text':
        'Nous apportons detailing professionnel, correction de peinture, revêtement céramique et traitement des odeurs à domicile avec les outils nécessaires pour une finition propre, brillante et protégée.',
      '.hero__actions a[href="#quote"]': 'Demander un prix',
      '.hero__actions a[href="#services"]': 'Voir les services',
      '#services .section__heading .eyebrow': 'Services',
      '#services .section__heading h2':
        'Tout ce qu’il faut pour que votre véhicule soit à son meilleur.',
      '.packages .eyebrow': 'Forfaits populaires',
      '.packages h2': 'Choisissez le niveau adapté à votre véhicule.',
      '.process .eyebrow': 'Processus',
      '.process h2': 'Un processus simple de detailing mobile.',
      '.gallery .eyebrow': 'Résultats',
      '.gallery h2': 'Détails propres. Brillance nette. Surfaces protégées.',
      '#quote .eyebrow': 'Demander un prix',
      '#quote h2': 'Demandez un prix pour votre véhicule.',
    },
    theme: {
      day: 'Jour',
      night: 'Nuit',
      dayLabel: 'Passer au mode jour',
      nightLabel: 'Passer au mode nuit',
    },
    services: {
      'auto-detailing': {
        title: 'Detailing auto',
        text: 'Lavage extérieur, décontamination, brillance, plastiques, roues, pneus et finition propre de pare-chocs à pare-chocs.',
      },
      'interior-detailing': {
        title: 'Detailing intérieur',
        text: 'Aspirateur, vapeur, traitement des taches, cuir, aérateurs, plastiques, vitres et zones de contact rafraîchis.',
      },
      'paint-correction': {
        title: 'Correction de peinture',
        text: 'Polissage machine pour réduire les tourbillons, l’oxydation, le voile et les fines rayures tout en restaurant la profondeur.',
      },
      'ceramic-coating': {
        title: 'Revêtement céramique',
        text: 'Protection céramique brillante pour la peinture, lavage plus facile, forte perle d’eau et éclat durable.',
      },
      'glass-coating': {
        title: 'Protection vitres',
        text: 'Traitement hydrophobe des vitres pour améliorer la visibilité sous la pluie et garder le verre plus propre.',
      },
      'interior-ceramic': {
        title: 'Protection céramique intérieure',
        text: 'Protection du cuir, tissu, plastiques et surfaces utilisées souvent contre les liquides, taches et l’usage quotidien.',
      },
      'wheel-coating': {
        title: 'Protection des roues',
        text: 'Protection céramique des roues contre la poussière de frein, la saleté de route et les lavages fréquents.',
      },
      'ozone-treatment': {
        title: 'Traitement à l’ozone',
        text: 'Traitement des odeurs de fumée, nourriture, animaux et odeurs tenaces après un nettoyage intérieur adapté.',
      },
      maintenance: {
        title: 'Programmes d’entretien',
        text: 'Entretien planifié pour garder un résultat constant sans attendre que le véhicule ait besoin d’une remise à neuf complète.',
      },
    },
    panels: {
      'auto-detailing': `
        <div class="service-panel__intro">
          <p class="eyebrow">Services de detailing auto</p>
          <h3>Extérieur, intérieur et detailing mobile complet.</h3>
          <p>Choisissez le niveau adapté à votre véhicule. Chaque option peut être ajustée selon la taille, l’état, les taches, les poils d’animaux, l’état de la peinture et la protection souhaitée.</p>
        </div>
        <div class="service-offers">
          <article class="service-offer">
            <span>À partir de 125 $</span>
            <h4>Detailing extérieur</h4>
            <ul>
              <li>Lavage à la main et bain de mousse</li>
              <li>Retrait des insectes et du goudron</li>
              <li>Nettoyage des roues et pneus</li>
              <li>Retrait des particules de fer</li>
              <li>Traitement à la clay bar</li>
              <li>Vitres sans traces</li>
              <li>Cire ou scellant protecteur</li>
            </ul>
            <a class="button" href="#quote">Demander un prix</a>
          </article>
          <article class="service-offer">
            <span>À partir de 185 $</span>
            <h4>Intérieur et extérieur complet</h4>
            <ul>
              <li>Detailing intérieur et extérieur de base</li>
              <li>Nettoyage profond complet</li>
              <li>Shampoing intérieur</li>
              <li>Lavage et cire</li>
              <li>Nettoyage des contours de portes</li>
              <li>Vitres, plastiques, roues et pneus</li>
              <li>Option correction ou céramique</li>
            </ul>
            <a class="button" href="#quote">Demander un prix</a>
          </article>
          <article class="service-offer">
            <span>À partir de 145 $</span>
            <h4>Detailing intérieur</h4>
            <ul>
              <li>Aspirateur détaillé et essuyage</li>
              <li>Retrait des déchets</li>
              <li>Shampoing tapis et tissus</li>
              <li>Extraction à eau chaude</li>
              <li>Nettoyage vapeur</li>
              <li>Odeur et traitement à l’ozone</li>
              <li>Conditionnement du cuir et taches</li>
            </ul>
            <a class="button" href="#quote">Demander un prix</a>
          </article>
        </div>
        <div class="service-copy">
          <h4>Services de detailing extérieur</h4>
          <p>Le detailing extérieur commence par un lavage à la main avec des shampoings de qualité. Nous nettoyons les courbes, plastiques, roues, vitres et zones difficiles afin de retirer la saleté, le film routier et les contaminants.</p>
          <h4>Traitement clay bar</h4>
          <p>La clay bar retire les contaminants collés à la peinture pour créer une surface lisse, prête pour la cire, le scellant, le polissage ou la protection céramique.</p>
          <h4>Roues et pneus</h4>
          <p>Les roues, pneus et faces visibles sont nettoyés et finis pour donner un look complet et propre.</p>
        </div>
      `,
      'interior-detailing':
        '<div class="service-panel__intro"><p class="eyebrow">Services de detailing intérieur</p><h3>Nettoyage profond de chaque surface.</h3><p>Le detailing intérieur mobile remet à neuf sièges, tapis, plastiques, aérateurs, vitres, cuir et zones de contact.</p></div><div class="service-copy service-copy--columns"><div><h4>Valeur de revente</h4><p>Un intérieur bien entretenu aide à protéger la valeur et l’apparence du véhicule.</p></div><div><h4>Confort</h4><p>Un habitacle propre rend chaque trajet plus agréable.</p></div><div><h4>Protection des surfaces</h4><p>Le nettoyage régulier réduit l’usure prématurée des matériaux.</p></div><div><h4>Qualité de l’air</h4><p>Retirer poussière, saleté et sources d’odeurs aide à garder un habitacle plus frais.</p></div></div><a class="button" href="#quote">Demander un prix</a>',
      'paint-correction':
        '<div class="service-panel__intro"><p class="eyebrow">Correction de peinture</p><h3>Retrouvez clarté, brillance et profondeur.</h3><p>La correction de peinture utilise le polissage machine pour réduire tourbillons, oxydation, voile, taches d’eau et fines rayures.</p></div><div class="service-copy service-copy--columns"><div><h4>Inspection</h4><p>Nous inspectons la finition avant de choisir le plan de polissage.</p></div><div><h4>Zone test</h4><p>Un test confirme la méthode la plus sûre pour plus de brillance.</p></div><div><h4>Polissage</h4><p>La surface est corrigée et raffinée pour retrouver sa clarté.</p></div><div><h4>Protection</h4><p>Ajoutez un scellant ou une céramique après la correction.</p></div></div><a class="button" href="#quote">Demander un prix</a>',
      'ceramic-coating':
        '<div class="service-panel__intro"><p class="eyebrow">Revêtement céramique</p><h3>Protection brillante et lavage plus facile.</h3><p>La céramique ajoute glissance, brillance, effet hydrophobe et protection après une préparation correcte de la surface.</p></div><div class="service-copy service-copy--columns"><div><h4>Préparation</h4><p>Lavage, décontamination et préparation avant application.</p></div><div><h4>Protection peinture</h4><p>Aide contre la saleté, les UV et le film routier.</p></div><div><h4>Finition hydrophobe</h4><p>L’eau perle fortement et l’entretien devient plus facile.</p></div><div><h4>Conseils d’entretien</h4><p>Nous expliquons comment laver et maintenir la protection.</p></div></div><a class="button" href="#quote">Demander un prix</a>',
      'glass-coating':
        '<div class="service-panel__intro"><p class="eyebrow">Protection vitres</p><h3>Des vitres plus claires sous la pluie.</h3><p>Le traitement hydrophobe aide l’eau à quitter le verre plus vite et facilite le nettoyage des insectes, saletés et film routier.</p></div><a class="button" href="#quote">Demander un prix</a>',
      'interior-ceramic':
        '<div class="service-panel__intro"><p class="eyebrow">Protection céramique intérieure</p><h3>Protégez sièges, tissus, cuir et surfaces touchées.</h3><p>La protection intérieure aide à résister aux taches, liquides, transfert de couleur et usure quotidienne après un bon nettoyage.</p></div><a class="button" href="#quote">Demander un prix</a>',
      'wheel-coating':
        '<div class="service-panel__intro"><p class="eyebrow">Protection des roues</p><h3>Pour les roues exposées à la poussière de frein.</h3><p>La protection céramique ajoute une couche lisse qui facilite le nettoyage régulier et aide contre la contamination lourde.</p></div><a class="button" href="#quote">Demander un prix</a>',
      'ozone-treatment':
        '<div class="service-panel__intro"><p class="eyebrow">Traitement à l’ozone</p><h3>Aide à réduire les odeurs tenaces.</h3><p>Le traitement à l’ozone fonctionne mieux après le nettoyage intérieur. Il peut aider avec fumée, animaux, nourriture, humidité et odeurs persistantes.</p></div><a class="button" href="#quote">Demander un prix</a>',
      maintenance:
        '<div class="service-panel__intro"><p class="eyebrow">Programmes d’entretien</p><h3>Gardez le véhicule propre avant une remise à neuf complète.</h3><p>Les plans d’entretien incluent lavage extérieur régulier, rafraîchissement intérieur léger, vitres, roues, pneus, plastiques et protection selon le besoin.</p></div><a class="button" href="#quote">Demander un prix</a>',
    },
  },
};

const getLanguage = () => getSavedValue('siteLanguage', 'en');

const applyTheme = (theme) => {
  if (!themeToggle) {
    return;
  }

  const language = getLanguage();
  const isNight = theme === 'night';
  const themeText = translations[language].theme;

  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute(
    'aria-label',
    isNight ? themeText.dayLabel : themeText.nightLabel,
  );
};

const setText = (selector, text) => {
  const element = document.querySelector(selector);

  if (element) {
    element.textContent = text;
  }
};

const renderServiceTabs = (language) => {
  serviceTabs.forEach((tab) => {
    const key = tab.dataset.serviceTab;
    const service = translations[language].services[key];

    tab.querySelector('h3').textContent = service.title;
    tab.querySelector('.service__text').textContent = service.text;
  });
};

const renderServicePanels = (language) => {
  servicePanels.forEach((panel) => {
    const key = panel.dataset.servicePanel;

    panel.innerHTML = translations[language].panels[key];
  });
};

const applyLanguage = (language) => {
  const selectedLanguage = translations[language] ? language : 'en';

  document.documentElement.lang = selectedLanguage;
  saveValue('siteLanguage', selectedLanguage);

  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === selectedLanguage;

    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  setText(
    '.nav__standard-link[href="#top"]',
    translations[selectedLanguage].nav.home,
  );
  setText(
    '.nav__link span:first-child',
    translations[selectedLanguage].nav.services,
  );
  setText(
    '.nav__standard-link[href="#process"]',
    translations[selectedLanguage].nav.process,
  );
  setText(
    '.nav__standard-link[href="#gallery"]',
    translations[selectedLanguage].nav.results,
  );
  setText(
    '.nav__standard-link[href="#faq"]',
    translations[selectedLanguage].nav.faq,
  );
  setText('.nav__button', translations[selectedLanguage].nav.book);
  Object.entries(translations[selectedLanguage].page).forEach(
    ([selector, text]) => {
      setText(selector, text);
    },
  );
  renderServiceTabs(selectedLanguage);
  renderServicePanels(selectedLanguage);
  applyTheme(getSavedValue('siteTheme', 'day'));
};

const showServicePanel = (key, shouldScroll = true) => {
  serviceTabs.forEach((tab) => {
    const isActive = tab.dataset.serviceTab === key;

    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  servicePanels.forEach((panel) => {
    const isActive = panel.dataset.servicePanel === key;

    panel.classList.toggle('is-active', isActive);
    panel.hidden = !isActive;
  });

  if (shouldScroll && serviceDetails) {
    serviceDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

applyLanguage(getLanguage());
showServicePanel('auto-detailing', false);

themeToggle?.addEventListener('click', () => {
  const nextTheme =
    document.documentElement.dataset.theme === 'night' ? 'day' : 'night';

  saveValue('siteTheme', nextTheme);
  applyTheme(nextTheme);
});

languageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const activeTab =
      document.querySelector('[data-service-tab].is-active')?.dataset
        .serviceTab || 'auto-detailing';

    applyLanguage(button.dataset.language);
    showServicePanel(activeTab, false);
  });
});

serviceTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    showServicePanel(tab.dataset.serviceTab);
  });
});
