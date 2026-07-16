// ============================================================
//  GLOBAL FAN CONCIERGE — FIFA World Cup 2026
//  Frontend Logic & Offline Routing Engine
// ============================================================

const BACKEND_URL = '';

// ── Multi-Stadium Configuration Database ──────────────────
const STADIUM_CONFIGS = {
  metlife: {
    name: 'MetLife Stadium',
    city: 'East Rutherford, NJ',
    mapsQuery: 'MetLife+Stadium+East+Rutherford+NJ',
    // Primary spoken language for staff communication
    staffLang: 'en-US',
    staffLangName: 'English',
    staffLangFlag: '🇺🇸',
    gates: {
      'Bud Light Gate': { id: 'gate_budlight', name: 'Bud Light Gate (North)', section: 101, level: 100, x: 100, y: 15  },
      'Verizon Gate':   { id: 'gate_verizon',  name: 'Verizon Gate (East)',    section: 113, level: 100, x: 185, y: 100 },
      'Pepsi Gate':     { id: 'gate_pepsi',    name: 'Pepsi Gate (South)',     section: 125, level: 100, x: 100, y: 185 },
      'MetLife Gate':   { id: 'gate_metlife',  name: 'MetLife Gate (West)',    section: 137, level: 100, x: 15,  y: 100 }
    },
    facilities: [
      // ── Restrooms ──
      { id: 'restroom_108', category: 'bathroom', section: 108, level: 100,
        shortName: 'Family Restroom (108)',
        name: { en: 'Family Restroom (Sec 108)', es: 'Baño Familiar (Sec 108)', fr: 'Toilettes Familiales (Sec 108)', de: 'Familientoilette (Sekt 108)', pt: 'Banheiro Familiar (Sec 108)', ja: 'ファミリー トイレ (108)' } },
      { id: 'restroom_128', category: 'bathroom', section: 128, level: 100,
        shortName: 'Restroom (128)',
        name: { en: 'Restroom (Sec 128)', es: 'Baño (Sec 128)', fr: 'Toilettes (Sec 128)', de: 'Toilette (Sekt 128)', pt: 'Banheiro (Sec 128)', ja: 'トイレ (128)' } },
      { id: 'restroom_215', category: 'bathroom', section: 215, level: 200,
        shortName: 'Club Level Restroom (215)',
        name: { en: 'Club Level Restroom (Sec 215)', es: 'Baño Club (Sec 215)', fr: 'Toilettes Club (Sec 215)', de: 'Club-Toilette (Sekt 215)', pt: 'Banheiro Club (Sec 215)', ja: 'クラブ トイレ (215)' } },
      { id: 'restroom_330', category: 'bathroom', section: 330, level: 300,
        shortName: 'Upper Deck Restroom (330)',
        name: { en: 'Upper Deck Restroom (Sec 330)', es: 'Baño Superior (Sec 330)', fr: 'Toilettes Supérieures (Sec 330)', de: 'Oberrang-Toilette (Sekt 330)', pt: 'Banheiro Superior (Sec 330)', ja: 'アッパー トイレ (330)' } },

      // ── Food & Drink (real-world MetLife vendors) ──
      { id: 'fuku_117', category: 'food', section: 117, level: 100,
        shortName: 'Fuku Chicken',
        name: { en: 'Fuku Chicken', es: 'Fuku Chicken', fr: 'Fuku Chicken', de: 'Fuku Chicken', pt: 'Fuku Chicken', ja: 'フク チキン' } },
      { id: 'jersey_boardwalk_110', category: 'food', section: 110, level: 100,
        shortName: 'Jersey Boardwalk Sausage',
        name: { en: 'Jersey Boardwalk Sausage', es: 'Jersey Boardwalk Sausage', fr: 'Jersey Boardwalk Sausage', de: 'Jersey Boardwalk Sausage', pt: 'Jersey Boardwalk Sausage', ja: 'ジャージー ボードウォーク ソーセージ' } },
      { id: 'shahs_halal_314', category: 'food', section: 314, level: 300,
        shortName: "Shah's Halal",
        name: { en: "Shah's Halal", es: "Shah's Halal", fr: "Shah's Halal", de: "Shah's Halal", pt: "Shah's Halal", ja: "シャーズ ハラール" } },
      { id: 'tacos_raqueros_217', category: 'food', section: 217, level: 200,
        shortName: 'Tacos Raqueros',
        name: { en: 'Tacos Raqueros', es: 'Tacos Raqueros', fr: 'Tacos Raqueros', de: 'Tacos Raqueros', pt: 'Tacos Raqueros', ja: 'タコス ラケロス' } },
      { id: 'racetrack_bbq_125', category: 'food', section: 125, level: 100,
        shortName: 'Racetrack BBQ',
        name: { en: 'Racetrack BBQ', es: 'Racetrack BBQ', fr: 'Racetrack BBQ', de: 'Racetrack BBQ', pt: 'Racetrack BBQ', ja: 'レーストラック BBQ' } },
      { id: 'crescent_bagel_143', category: 'food', section: 143, level: 100,
        shortName: 'Crescent Bagels',
        name: { en: 'Crescent Bagels', es: 'Crescent Bagels', fr: 'Crescent Bagels', de: 'Crescent Bagels', pt: 'Crescent Bagels', ja: 'クレセント ベーグル' } },
      { id: 'stadium_brews_220', category: 'food', section: 220, level: 200,
        shortName: 'Stadium Brews Club',
        name: { en: 'Stadium Brews Club', es: 'Stadium Brews Club', fr: 'Stadium Brews Club', de: 'Stadium Brews Club', pt: 'Stadium Brews Club', ja: 'スタジアム ブリューズ クラブ' } },
      { id: 'dos_toros_305', category: 'food', section: 305, level: 300,
        shortName: 'Dos Toros Tacos',
        name: { en: 'Dos Toros Tacos', es: 'Dos Toros Tacos', fr: 'Dos Toros Tacos', de: 'Dos Toros Tacos', pt: 'Dos Toros Tacos', ja: 'ドス トロス タコス' } },

      // ── First Aid ──
      { id: 'firstaid_119', category: 'firstaid', section: 119, level: 100,
        shortName: 'First Aid Station (119)',
        name: { en: 'First Aid Station (Sec 119)', es: 'Primeros Auxilios (Sec 119)', fr: 'Poste de Secours (Sec 119)', de: 'Erste-Hilfe (Sekt 119)', pt: 'Primeiros Socorros (Sec 119)', ja: '救急ステーション (119)' } },
      { id: 'firstaid_326', category: 'firstaid', section: 326, level: 300,
        shortName: 'First Aid Station (326)',
        name: { en: 'First Aid Station (Sec 326)', es: 'Primeros Auxilios (Sec 326)', fr: 'Poste de Secours (Sec 326)', de: 'Erste-Hilfe (Sekt 326)', pt: 'Primeiros Socorros (Sec 326)', ja: '救急ステーション (326)' } },

      // ── Merch ──
      { id: 'merch_101', category: 'merch', section: 101, level: 100,
        shortName: 'FIFA Official Store',
        name: { en: 'FIFA Official Store', es: 'Tienda Oficial FIFA', fr: 'Boutique Officielle FIFA', de: 'FIFA Offizieller Fanshop', pt: 'Loja Oficial da FIFA', ja: 'FIFA 公式ストア' } },
      { id: 'merch_230', category: 'merch', section: 230, level: 200,
        shortName: 'FIFA Express Store',
        name: { en: 'FIFA Express Store', es: 'Tienda Exprés FIFA', fr: 'Boutique Express FIFA', de: 'FIFA Express-Shop', pt: 'Loja Expresso FIFA', ja: 'FIFA エクスプレスストア' } }
    ]
  },

  sofi: {
    name: 'SoFi Stadium',
    city: 'Inglewood, CA',
    mapsQuery: 'SoFi+Stadium+Inglewood+CA',
    staffLang: 'en-US',
    staffLangName: 'English',
    staffLangFlag: '🇺🇸',
    gates: {
      'Gate 1 (North)': { id: 'gate_1', name: 'Gate 1 – North', section: 101, level: 100, x: 100, y: 15  },
      'Gate 2 (East)':  { id: 'gate_2', name: 'Gate 2 – East',  section: 113, level: 100, x: 185, y: 100 },
      'Gate 3 (South)': { id: 'gate_3', name: 'Gate 3 – South', section: 125, level: 100, x: 100, y: 185 },
      'Gate 4 (West)':  { id: 'gate_4', name: 'Gate 4 – West',  section: 137, level: 100, x: 15,  y: 100 }
    },
    facilities: [
      { id: 'restroom_112', category: 'bathroom', section: 112, level: 100,
        shortName: 'Restroom Alpha',
        name: { en: 'Restroom Alpha', es: 'Baño Alfa', fr: 'Toilettes Alpha', de: 'Toilette Alpha', pt: 'Banheiro Alpha', ja: 'トイレ Alpha' } },
      { id: 'restroom_238', category: 'bathroom', section: 238, level: 200,
        shortName: 'Club Level Restroom',
        name: { en: 'Club Level Restroom', es: 'Baño de Club', fr: 'Toilettes Club', de: 'Club-Toilette', pt: 'Banheiro Club', ja: 'クラブ トイレ' } },
      { id: 'taco_110', category: 'food', section: 110, level: 100,
        shortName: 'SoFi Street Tacos',
        name: { en: 'SoFi Street Tacos', es: 'Tacos Callejeros SoFi', fr: 'SoFi Tacos de Rue', de: 'SoFi Street Tacos', pt: 'Tacos de Rua SoFi', ja: 'SoFi ストリートタコス' } },
      { id: 'burger_125', category: 'food', section: 125, level: 100,
        shortName: 'LA Smash Burgers',
        name: { en: 'LA Smash Burgers', es: 'LA Smash Burgers', fr: 'LA Smash Burgers', de: 'LA Smash Burgers', pt: 'LA Smash Burgers', ja: 'LA スマッシュバーガー' } },
      { id: 'firstaid_119', category: 'firstaid', section: 119, level: 100,
        shortName: 'First Aid Station',
        name: { en: 'First Aid Station', es: 'Primeros Auxilios', fr: 'Poste de Secours', de: 'Erste-Hilfe-Station', pt: 'Posto de Socorros', ja: '救急ステーション' } },
      { id: 'merch_101', category: 'merch', section: 101, level: 100,
        shortName: 'FIFA Official Store SoFi',
        name: { en: 'FIFA Official Store SoFi', es: 'Tienda Oficial FIFA SoFi', fr: 'Boutique Officielle FIFA SoFi', de: 'FIFA Offizieller Shop SoFi', pt: 'Loja Oficial FIFA SoFi', ja: 'FIFA 公式ストア SoFi' } }
    ]
  },

  azteca: {
    name: 'Estadio Azteca',
    city: 'Mexico City',
    mapsQuery: 'Estadio+Azteca+Mexico+City',
    staffLang: 'es-MX',
    staffLangName: 'Español',
    staffLangFlag: '🇲🇽',
    gates: {
      'Acceso A (Norte)': { id: 'gate_a', name: 'Acceso A – Norte', section: 101, level: 100, x: 100, y: 15  },
      'Acceso B (Este)':  { id: 'gate_b', name: 'Acceso B – Este',  section: 113, level: 100, x: 185, y: 100 },
      'Acceso C (Sur)':   { id: 'gate_c', name: 'Acceso C – Sur',   section: 125, level: 100, x: 100, y: 185 },
      'Acceso D (Oeste)': { id: 'gate_d', name: 'Acceso D – Oeste', section: 137, level: 100, x: 15,  y: 100 }
    },
    facilities: [
      { id: 'restroom_112', category: 'bathroom', section: 112, level: 100,
        shortName: 'Sanitarios Azteca',
        name: { en: 'Azteca Restrooms', es: 'Sanitarios Azteca', fr: 'Toilettes Aztèque', de: 'Azteken-Toilette', pt: 'Banheiros Azteca', ja: 'アステカ トイレ' } },
      { id: 'taco_110', category: 'food', section: 110, level: 100,
        shortName: 'Tacos Azteca',
        name: { en: 'Tacos Azteca', es: 'Tacos Azteca', fr: 'Tacos Aztèque', de: 'Tacos Azteka', pt: 'Tacos Azteca', ja: 'タコス アステカ' } },
      { id: 'firstaid_119', category: 'firstaid', section: 119, level: 100,
        shortName: 'Puesto de Primeros Auxilios',
        name: { en: 'First Aid Post', es: 'Puesto de Primeros Auxilios', fr: 'Poste de Premiers Secours', de: 'Erste-Hilfe-Posten', pt: 'Posto de Primeiros Auxilios', ja: '救急ポスト' } },
      { id: 'merch_101', category: 'merch', section: 101, level: 100,
        shortName: 'FIFA Tienda Oficial',
        name: { en: 'FIFA Official Store Azteca', es: 'FIFA Tienda Oficial Azteca', fr: 'Boutique Officielle FIFA Aztèque', de: 'FIFA Offizieller Shop Azteka', pt: 'Loja Oficial FIFA Azteca', ja: 'FIFA 公式ストア アステカ' } }
    ]
  }
};

// ── Active Stadium ─────────────────────────────────────────
let currentStadiumId = 'metlife';
let STADIUM_DATA = STADIUM_CONFIGS[currentStadiumId];

// ── Global State ───────────────────────────────────────────
let isBackendOnline        = false;
let isOfflineForced        = false;
let activeSpeakerUtterance = null;
let currentDirections      = [];
let currentLangCode        = 'en-US';
let selectedLangOverride   = 'auto';
// Snapshot of last offline render — used to re-render on lang change
let lastRenderState = null;

// ── DOM References ─────────────────────────────────────────
const stadiumSelect     = document.getElementById('stadium-select');
const langSelect        = document.getElementById('lang-select');
const connectionStatus  = document.getElementById('connection-status');
const statusText        = document.getElementById('status-text');
const startLevelInput   = document.getElementById('start-level-input');
const startSectionInput = document.getElementById('start-section-input');
const queryInput        = document.getElementById('query-input');
const searchBtn         = document.getElementById('search-btn');
const loadingCard       = document.getElementById('loading-card');
const resultsCard       = document.getElementById('results-card');
const destinationTitle  = document.getElementById('destination-title');
const detectedLang      = document.getElementById('detected-lang');
const directionsList    = document.getElementById('directions-list');
const speakBtn          = document.getElementById('speak-btn');
const footerConnection  = document.getElementById('footer-connection');
const googleMapsBtn     = document.getElementById('google-maps-btn');

// ============================================================
//  UI STRINGS — Complete static-text localisation dictionary
// ============================================================
const UI_STRINGS = {
  en: {
    appTitle:             'Fan Concierge',
    appSubtitle:          'FIFA World Cup 2026',
    modeGenAI:            'GenAI Mode',
    modeOffline:          'Offline Mode',
    sectionStadiumLocation: 'Stadium & Location',
    placeholderLevel:     'Level…',
    placeholderSection:   'Section or Gate…',
    placeholderQuery:     'Where is the nearest bathroom? / ¿Dónde está…?',
    badgeRestrooms:       'Restrooms',
    badgeFood:            'Food & Drinks',
    badgeMerch:           'FIFA Store',
    badgeFirstAid:        'First Aid',
    badgeGates:           'Gates',
    mapTitle:             'Interactive Stadium Map',
    legendStart:          'Start',
    legendDest:           'Destination',
    loadingText:          'Analysing request & plotting route…',
    mapsBtn:              'View in Google Maps',
    aiChatTitle:          'AI Stadium Concierge',
    aiChatSubtitle:       'Ask anything about the stadium — powered by Gemini',
    aiStatusReady:        'Ready',
    aiStatusThinking:     'Thinking…',
    aiStatusError:        'Error — tap to retry',
    aiWelcome:            'Hi! I\'m your AI Stadium Concierge. Ask me anything — food recommendations, gate directions, rules, accessibility, or anything else about your experience today.',
    aiPlaceholder:        'Ask the AI anything…',
    aiSendBtn:            'Ask AI',
    staffTitle:           'Talk to Staff',
    staffSubtitle:        'Tap a phrase — it plays aloud in the stadium\'s language so any worker can hear it.',
    staffTabEmergency:    '🆘 Emergency',
    staffTabNavigation:   '🗺️ Navigation',
    staffTabNeeds:        '🛎️ Needs',
    staffTabCourtesy:     '🤝 Courtesy',
    footerBrand:          'Global Fan Concierge',
    footerMode:           'Running in GenAI Mode with automatic offline fallback',
  },
  es: {
    appTitle:             'Fan Concierge',
    appSubtitle:          'Copa Mundial FIFA 2026',
    modeGenAI:            'Modo GenIA',
    modeOffline:          'Modo Sin Conexión',
    sectionStadiumLocation: 'Estadio y Ubicación',
    placeholderLevel:     'Nivel…',
    placeholderSection:   'Sección o Puerta…',
    placeholderQuery:     '¿Dónde está el baño más cercano?',
    badgeRestrooms:       'Baños',
    badgeFood:            'Comida y Bebidas',
    badgeMerch:           'Tienda FIFA',
    badgeFirstAid:        'Primeros Auxilios',
    badgeGates:           'Puertas',
    mapTitle:             'Mapa Interactivo del Estadio',
    legendStart:          'Inicio',
    legendDest:           'Destino',
    loadingText:          'Analizando solicitud y trazando ruta…',
    mapsBtn:              'Ver en Google Maps',
    aiChatTitle:          'Conserje de IA del Estadio',
    aiChatSubtitle:       'Pregunta cualquier cosa sobre el estadio — con Gemini',
    aiStatusReady:        'Listo',
    aiStatusThinking:     'Pensando…',
    aiStatusError:        'Error — toca para reintentar',
    aiWelcome:            '¡Hola! Soy tu conserje de IA. Pregunta cualquier cosa: comida, puertas, accesibilidad o lo que necesites hoy.',
    aiPlaceholder:        'Pregunta a la IA…',
    aiSendBtn:            'Preguntar',
    staffTitle:           'Hablar con el Personal',
    staffSubtitle:        'Toca una frase — se reproducirá en voz alta para que cualquier empleado pueda escucharla.',
    staffTabEmergency:    '🆘 Emergencia',
    staffTabNavigation:   '🗺️ Navegación',
    staffTabNeeds:        '🛎️ Necesidades',
    staffTabCourtesy:     '🤝 Cortesía',
    footerBrand:          'Conserje Global para Fans',
    footerMode:           'Ejecutando en Modo Desconectado con motor local activo',
  },
  fr: {
    appTitle:             'Fan Concierge',
    appSubtitle:          'Coupe du Monde FIFA 2026',
    modeGenAI:            'Mode GenAI',
    modeOffline:          'Mode Hors Ligne',
    sectionStadiumLocation: 'Stade & Emplacement',
    placeholderLevel:     'Niveau…',
    placeholderSection:   'Section ou Porte…',
    placeholderQuery:     'Où sont les toilettes les plus proches ?',
    badgeRestrooms:       'Toilettes',
    badgeFood:            'Nourriture & Boissons',
    badgeMerch:           'Boutique FIFA',
    badgeFirstAid:        'Premiers Secours',
    badgeGates:           'Entrées',
    mapTitle:             'Carte Interactive du Stade',
    legendStart:          'Départ',
    legendDest:           'Destination',
    loadingText:          'Analyse de la demande et calcul de l\'itinéraire…',
    mapsBtn:              'Voir sur Google Maps',
    aiChatTitle:          'Concierge IA du Stade',
    aiChatSubtitle:       'Posez toutes vos questions — propulsé par Gemini',
    aiStatusReady:        'Prêt',
    aiStatusThinking:     'Réflexion…',
    aiStatusError:        'Erreur — appuyez pour réessayer',
    aiWelcome:            'Bonjour ! Je suis votre concierge IA. Posez toutes vos questions sur la nourriture, les accès, l’accessibilité ou autre.',
    aiPlaceholder:        'Posez votre question…',
    aiSendBtn:            'Demander',
    staffTitle:           'Parler au Personnel',
    staffSubtitle:        'Appuyez sur une phrase — elle sera lue à haute voix pour que le personnel puisse l\'entendre.',
    staffTabEmergency:    '🆘 Urgence',
    staffTabNavigation:   '🗺️ Navigation',
    staffTabNeeds:        '🛎️ Besoins',
    staffTabCourtesy:     '🤝 Courtoisie',
    footerBrand:          'Conciergerie Mondiale pour Fans',
    footerMode:           'Fonctionnement hors ligne avec moteur local actif',
  },
  de: {
    appTitle:             'Fan Concierge',
    appSubtitle:          'FIFA Weltmeisterschaft 2026',
    modeGenAI:            'GenAI-Modus',
    modeOffline:          'Offline-Modus',
    sectionStadiumLocation: 'Stadion & Standort',
    placeholderLevel:     'Ebene…',
    placeholderSection:   'Sektion oder Eingang…',
    placeholderQuery:     'Wo ist die nächste Toilette?',
    badgeRestrooms:       'Toiletten',
    badgeFood:            'Essen & Getränke',
    badgeMerch:           'FIFA-Shop',
    badgeFirstAid:        'Erste Hilfe',
    badgeGates:           'Eingänge',
    mapTitle:             'Interaktive Stadionkarte',
    legendStart:          'Start',
    legendDest:           'Ziel',
    loadingText:          'Anfrage wird analysiert und Route wird berechnet…',
    mapsBtn:              'In Google Maps anzeigen',
    aiChatTitle:          'KI-Stadion-Concierge',
    aiChatSubtitle:       'Fragen Sie alles über das Stadion — powered by Gemini',
    aiStatusReady:        'Bereit',
    aiStatusThinking:     'Denkt nach…',
    aiStatusError:        'Fehler — tippen zum Wiederholen',
    aiWelcome:            'Hallo! Ich bin Ihr KI-Concierge. Stellen Sie alle Fragen zu Essen, Eingängen, Barrierefreiheit oder anderen Themen.',
    aiPlaceholder:        'Fragen Sie die KI…',
    aiSendBtn:            'Fragen',
    staffTitle:           'Mit Personal sprechen',
    staffSubtitle:        'Tippe auf einen Satz — er wird laut vorgelesen, damit das Personal ihn hören kann.',
    staffTabEmergency:    '🆘 Notfall',
    staffTabNavigation:   '🗺️ Navigation',
    staffTabNeeds:        '🛎️ Bedürfnisse',
    staffTabCourtesy:     '🤝 Höflichkeit',
    footerBrand:          'Globaler Fan-Concierge',
    footerMode:           'Offline-Modus mit lokalem Routing-Motor aktiv',
  },
  pt: {
    appTitle:             'Fan Concierge',
    appSubtitle:          'Copa do Mundo FIFA 2026',
    modeGenAI:            'Modo GenAI',
    modeOffline:          'Modo Offline',
    sectionStadiumLocation: 'Estádio & Localização',
    placeholderLevel:     'Nível…',
    placeholderSection:   'Seção ou Portão…',
    placeholderQuery:     'Onde fica o banheiro mais próximo?',
    badgeRestrooms:       'Banheiros',
    badgeFood:            'Comida & Bebidas',
    badgeMerch:           'Loja FIFA',
    badgeFirstAid:        'Primeiros Socorros',
    badgeGates:           'Portões',
    mapTitle:             'Mapa Interativo do Estádio',
    legendStart:          'Início',
    legendDest:           'Destino',
    loadingText:          'Analisando pedido e traçando rota…',
    mapsBtn:              'Ver no Google Maps',
    aiChatTitle:          'Concierge de IA do Estádio',
    aiChatSubtitle:       'Pergunte qualquer coisa — com tecnologia Gemini',
    aiStatusReady:        'Pronto',
    aiStatusThinking:     'Pensando…',
    aiStatusError:        'Erro — toque para tentar novamente',
    aiWelcome:            'Olá! Sou seu concierge de IA. Pergunte sobre comida, portões, acessibilidade ou qualquer coisa sobre sua experiência hoje.',
    aiPlaceholder:        'Pergunte à IA…',
    aiSendBtn:            'Perguntar',
    staffTitle:           'Falar com a Equipe',
    staffSubtitle:        'Toque numa frase — ela será lida em voz alta para qualquer funcionário ouvir.',
    staffTabEmergency:    '🆘 Emergência',
    staffTabNavigation:   '🗺️ Navegação',
    staffTabNeeds:        '🛎️ Necessidades',
    staffTabCourtesy:     '🤝 Cortesia',
    footerBrand:          'Concierge Global para Fãs',
    footerMode:           'Executando em Modo Offline com motor local ativo',
  },
  ja: {
    appTitle:             'ファン コンシェルジュ',
    appSubtitle:          'FIFA ワールドカップ 2026',
    modeGenAI:            'GenAI モード',
    modeOffline:          'オフライン モード',
    sectionStadiumLocation: 'スタジアム & 現在地',
    placeholderLevel:     'レベル…',
    placeholderSection:   'セクションまたはゲート…',
    placeholderQuery:     '最寄りのトイレはどこですか？',
    badgeRestrooms:       'トイレ',
    badgeFood:            'フード & ドリンク',
    badgeMerch:           'FIFA ショップ',
    badgeFirstAid:        '救急',
    badgeGates:           'ゲート',
    mapTitle:             'インタラクティブ スタジアム マップ',
    legendStart:          '出発',
    legendDest:           '目的地',
    loadingText:          'リクエストを分析してルートを計算中…',
    mapsBtn:              'Google マップで見る',
    aiChatTitle:          'AI スタジアム コンシェルジュ',
    aiChatSubtitle:       'スタジアムについて何でも質iいわせを — Gemini 搭載',
    aiStatusReady:        '準備完了',
    aiStatusThinking:     '考中…',
    aiStatusError:        'エラー — タップして再試行',
    aiWelcome:            'こんにちは！AIコンシェルジュです。食事、ゲート、アクセシビリティなど、何でもお気軽にどうぞ。',
    aiPlaceholder:        'AIに質問する…',
    aiSendBtn:            '質問する',
    staffTitle:           'スタッフに話しかける',
    staffSubtitle:        'フレーズをタップすると、スタジアムの言語で音声が再生され、スタッフに伝えることができます。',
    staffTabEmergency:    '🆘 緊急',
    staffTabNavigation:   '🗺️ ナビ',
    staffTabNeeds:        '🛎️ お願い',
    staffTabCourtesy:     '🤝 挨拶',
    footerBrand:          'グローバル ファン コンシェルジュ',
    footerMode:           'オフライン モードで実行中（ローカルルーティングエンジン使用）',
  }
};

// ── Apply UI Locale — updates all data-i18n elements ──────
function applyUILocale(lang) {
  const strings = UI_STRINGS[lang] || UI_STRINGS.en;

  // Text content nodes (data-i18n="key")
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (strings[key] !== undefined) el.textContent = strings[key];
  });

  // Placeholder attributes (data-i18n-placeholder="key")
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (strings[key] !== undefined) el.placeholder = strings[key];
  });

  // Update <html lang=""> attribute
  document.documentElement.lang = lang;
}

// ============================================================
//  STAFF PHRASES — Fan-to-Staff Translator Database
//  Each phrase has:
//    fan:    Text shown on the button (in the fan's selected UI lang)
//    spoken: Object of translations spoken aloud in the stadium's lang
// ============================================================
const STAFF_PHRASES = {
  emergency: [
    {
      icon: 'ph-siren',
      fan:  { en: 'I need emergency help!',    es: '¡Necesito ayuda de emergencia!', fr: 'J\'ai besoin d\'aide d\'urgence !', de: 'Ich brauche Notfallhilfe!',     pt: 'Preciso de ajuda de emergência!', ja: '緊急の助けが必要です！' },
      spoken: { en: 'Emergency! This person needs immediate help!', es: '¡Emergencia! ¡Esta persona necesita ayuda inmediata!', fr: 'Urgence ! Cette personne a besoin d\'aide immédiate !', de: 'Notfall! Diese Person braucht sofortige Hilfe!', pt: 'Emergência! Esta pessoa precisa de ajuda imediata!', ja: '緊急事態！この方は今すぐ助けが必要です！' }
    },
    {
      icon: 'ph-first-aid-kit',
      fan:  { en: 'Someone is injured.',       es: 'Alguien está herido.',           fr: 'Quelqu\'un est blessé.',          de: 'Jemand ist verletzt.',           pt: 'Alguém está machucado.',          ja: 'けがをした人がいます。' },
      spoken: { en: 'Someone is injured and needs medical attention.', es: 'Alguien está herido y necesita atención médica.', fr: 'Quelqu\'un est blessé et a besoin de soins médicaux.', de: 'Jemand ist verletzt und braucht medizinische Hilfe.', pt: 'Alguém está machucado e precisa de atenção médica.', ja: 'けがをした方がいます。医療処置が必要です。' }
    },
    {
      icon: 'ph-shield-check',
      fan:  { en: 'Please call security.',     es: 'Por favor, llame a seguridad.',  fr: 'Appelez la sécurité, s\'il vous plaît.', de: 'Bitte rufen Sie den Sicherheitsdienst.',  pt: 'Por favor, chame a segurança.',   ja: '警備員を呼んでください。' },
      spoken: { en: 'Please call security immediately.', es: 'Por favor, llame a seguridad inmediatamente.', fr: 'Appelez la sécurité immédiatement, s\'il vous plaît.', de: 'Bitte rufen Sie sofort den Sicherheitsdienst.', pt: 'Por favor, chame a segurança imediatamente.', ja: '今すぐ警備員を呼んでください。' }
    },
    {
      icon: 'ph-fire',
      fan:  { en: 'There is a fire!',          es: '¡Hay un incendio!',              fr: 'Il y a un incendie !',            de: 'Es gibt ein Feuer!',             pt: 'Há um incêndio!',                 ja: '火事です！' },
      spoken: { en: 'Fire! Please evacuate the area immediately!', es: '¡Incendio! ¡Por favor evacúen el área inmediatamente!', fr: 'Incendie ! Évacuez la zone immédiatement !', de: 'Feuer! Bitte sofort die Gegend evakuieren!', pt: 'Fogo! Por favor, evacue a área imediatamente!', ja: '火事です！今すぐこの場所を避難してください！' }
    },
    {
      icon: 'ph-baby',
      fan:  { en: 'I lost a child.',           es: 'Perdí a un niño.',               fr: 'J\'ai perdu un enfant.',          de: 'Ich habe ein Kind verloren.',    pt: 'Perdi uma criança.',              ja: '子どもとはぐれました。' },
      spoken: { en: 'A child is lost. Please help find them.', es: 'Un niño está perdido. Por favor, ayude a encontrarlo.', fr: 'Un enfant est perdu. Aidez à le retrouver, s\'il vous plaît.', de: 'Ein Kind ist verloren. Bitte helfen Sie es zu finden.', pt: 'Uma criança está perdida. Por favor, ajude a encontrá-la.', ja: '子どもがいなくなりました。見つけるのを手伝ってください。' }
    }
  ],
  navigation: [
    {
      icon: 'ph-toilet',
      fan:  { en: 'Where is the restroom?',    es: '¿Dónde está el baño?',          fr: 'Où sont les toilettes ?',         de: 'Wo ist die Toilette?',           pt: 'Onde fica o banheiro?',           ja: 'トイレはどこですか？' },
      spoken: { en: 'Where is the nearest restroom, please?', es: '¿Dónde está el baño más cercano, por favor?', fr: 'Où sont les toilettes les plus proches, s\'il vous plaît ?', de: 'Wo ist die nächste Toilette, bitte?', pt: 'Onde fica o banheiro mais próximo, por favor?', ja: '最寄りのトイレはどこですか？' }
    },
    {
      icon: 'ph-door',
      fan:  { en: 'Where is the main gate?',   es: '¿Dónde está la puerta principal?', fr: 'Où est l\'entrée principale ?', de: 'Wo ist der Haupteingang?',       pt: 'Onde fica o portão principal?',   ja: 'メインゲートはどこですか？' },
      spoken: { en: 'Where is the main gate, please?', es: '¿Dónde está la puerta principal, por favor?', fr: 'Où est l\'entrée principale, s\'il vous plaît ?', de: 'Wo ist der Haupteingang, bitte?', pt: 'Onde fica o portão principal, por favor?', ja: 'メインゲートはどこですか？' }
    },
    {
      icon: 'ph-armchair',
      fan:  { en: 'Please help me find my seat.', es: 'Ayúdame a encontrar mi asiento.', fr: 'Aidez-moi à trouver mon siège.', de: 'Helfen Sie mir meinen Platz zu finden.', pt: 'Por favor, me ajude a encontrar meu assento.', ja: '席を見つけるのを手伝ってください。' },
      spoken: { en: 'Please help this person find their seat.', es: 'Por favor, ayude a esta persona a encontrar su asiento.', fr: 'Aidez cette personne à trouver son siège, s\'il vous plaît.', de: 'Bitte helfen Sie dieser Person ihren Platz zu finden.', pt: 'Por favor, ajude esta pessoa a encontrar seu assento.', ja: 'この方の席を見つけるのを手伝ってください。' }
    },
    {
      icon: 'ph-car',
      fan:  { en: 'Where is the parking exit?', es: '¿Dónde está la salida del estacionamiento?', fr: 'Où est la sortie de parking ?', de: 'Wo ist der Parkausgang?',     pt: 'Onde fica a saída do estacionamento?', ja: '駐車場の出口はどこですか？' },
      spoken: { en: 'Where is the nearest parking exit?', es: '¿Dónde está la salida de estacionamiento más cercana?', fr: 'Où est la sortie de parking la plus proche ?', de: 'Wo ist der nächste Parkausgang?', pt: 'Onde fica a saída do estacionamento mais próxima?', ja: '最寄りの駐車場出口はどこですか？' }
    },
    {
      icon: 'ph-wheelchair',
      fan:  { en: 'I need wheelchair access.',  es: 'Necesito acceso para silla de ruedas.', fr: 'J\'ai besoin d\'un accès fauteuil roulant.', de: 'Ich brauche Rollstuhlzugang.', pt: 'Preciso de acesso para cadeira de rodas.', ja: '車いす対応の入口が必要です。' },
      spoken: { en: 'This person requires wheelchair-accessible access or seating.', es: 'Esta persona necesita acceso o asiento para silla de ruedas.', fr: 'Cette personne a besoin d\'un accès ou d\'une place accessible en fauteuil roulant.', de: 'Diese Person benötigt rollstuhlgerechten Zugang oder Sitzplatz.', pt: 'Esta pessoa precisa de acesso ou assento acessível para cadeira de rodas.', ja: 'この方は車いす対応の通路または席が必要です。' }
    }
  ],
  needs: [
    {
      icon: 'ph-drop',
      fan:  { en: 'I need water.',              es: 'Necesito agua.',                 fr: 'J\'ai besoin d\'eau.',            de: 'Ich brauche Wasser.',            pt: 'Preciso de água.',                ja: '水が必要です。' },
      spoken: { en: 'This person needs water, please.', es: 'Esta persona necesita agua, por favor.', fr: 'Cette personne a besoin d\'eau, s\'il vous plaît.', de: 'Diese Person braucht Wasser, bitte.', pt: 'Esta pessoa precisa de água, por favor.', ja: 'この方に水が必要です。お願いします。' }
    },
    {
      icon: 'ph-hamburger',
      fan:  { en: 'Where can I buy food?',      es: '¿Dónde puedo comprar comida?',  fr: 'Où puis-je acheter à manger ?',  de: 'Wo kann ich Essen kaufen?',      pt: 'Onde posso comprar comida?',      ja: '食べ物はどこで買えますか？' },
      spoken: { en: 'Where can I buy food nearby?', es: '¿Dónde puedo comprar comida cerca de aquí?', fr: 'Où puis-je acheter à manger à proximité ?', de: 'Wo kann ich hier in der Nähe Essen kaufen?', pt: 'Onde posso comprar comida perto daqui?', ja: '近くで食べ物を買えるのはどこですか？' }
    },
    {
      icon: 'ph-shopping-bag',
      fan:  { en: 'Where is the FIFA shop?',    es: '¿Dónde está la tienda FIFA?',   fr: 'Où est la boutique FIFA ?',      de: 'Wo ist der FIFA-Shop?',          pt: 'Onde fica a loja FIFA?',           ja: 'FIFA ショップはどこですか？' },
      spoken: { en: 'Where is the official FIFA merchandise shop?', es: '¿Dónde está la tienda oficial de FIFA?', fr: 'Où est la boutique officielle FIFA ?', de: 'Wo ist der offizielle FIFA-Fanshop?', pt: 'Onde fica a loja oficial de produtos da FIFA?', ja: 'FIFA の公式グッズショップはどこですか？' }
    },
    {
      icon: 'ph-wifi-high',
      fan:  { en: 'Is there free Wi-Fi here?',  es: '¿Hay Wi-Fi gratuito aquí?',     fr: 'Y a-t-il du Wi-Fi gratuit ici ?', de: 'Gibt es hier kostenloses WLAN?', pt: 'Tem Wi-Fi gratuito aqui?',        ja: '無料 Wi-Fi はありますか？' },
      spoken: { en: 'Is there free Wi-Fi available in this area?', es: '¿Hay Wi-Fi gratuito disponible en esta área?', fr: 'Y a-t-il du Wi-Fi gratuit disponible dans cette zone ?', de: 'Gibt es in diesem Bereich kostenloses WLAN?', pt: 'Tem Wi-Fi gratuito disponível nessa área?', ja: 'この場所に無料 Wi-Fi はありますか？' }
    },
    {
      icon: 'ph-pill',
      fan:  { en: 'I need medicine / pharmacy.', es: 'Necesito medicina / farmacia.', fr: 'J\'ai besoin d\'un médicament / pharmacie.', de: 'Ich brauche Medizin / Apotheke.', pt: 'Preciso de medicina / farmácia.', ja: '薬 / 薬局が必要です。' },
      spoken: { en: 'This person needs medicine or access to a pharmacy.', es: 'Esta persona necesita medicamentos o acceso a una farmacia.', fr: 'Cette personne a besoin de médicaments ou d\'une pharmacie.', de: 'Diese Person braucht Medikamente oder Zugang zu einer Apotheke.', pt: 'Esta pessoa precisa de medicamentos ou de uma farmácia.', ja: 'この方は薬または薬局が必要です。' }
    }
  ],
  courtesy: [
    {
      icon: 'ph-hands-praying',
      fan:  { en: 'Thank you very much!',       es: '¡Muchas gracias!',               fr: 'Merci beaucoup !',               de: 'Vielen Dank!',                   pt: 'Muito obrigado!',                 ja: 'どうもありがとうございます！' },
      spoken: { en: 'Thank you very much!', es: '¡Muchas gracias!', fr: 'Merci beaucoup !', de: 'Vielen Dank!', pt: 'Muito obrigado!', ja: 'どうもありがとうございます！' }
    },
    {
      icon: 'ph-smiley',
      fan:  { en: 'You are very helpful!',      es: '¡Eres de mucha ayuda!',          fr: 'Vous êtes très serviable !',     de: 'Sie sind sehr hilfsbereit!',     pt: 'Você é muito prestativo!',        ja: 'とても助かりました！' },
      spoken: { en: 'You are very helpful, thank you!', es: '¡Eres muy servicial, muchas gracias!', fr: 'Vous êtes très serviable, merci !', de: 'Sie sind sehr hilfsbereit, vielen Dank!', pt: 'Você é muito prestativo, muito obrigado!', ja: 'とても助かりました。ありがとうございます！' }
    },
    {
      icon: 'ph-question',
      fan:  { en: 'I don\'t understand.',        es: 'No entiendo.',                   fr: 'Je ne comprends pas.',           de: 'Ich verstehe nicht.',            pt: 'Não entendo.',                    ja: 'わかりません。' },
      spoken: { en: 'I\'m sorry, I don\'t understand. Could you help me?', es: 'Lo siento, no entiendo. ¿Puede ayudarme?', fr: 'Je suis désolé, je ne comprends pas. Pouvez-vous m\'aider ?', de: 'Entschuldigung, ich verstehe nicht. Können Sie mir helfen?', pt: 'Desculpe, não entendo. Pode me ajudar?', ja: 'すみません、わかりません。助けていただけますか？' }
    },
    {
      icon: 'ph-globe',
      fan:  { en: 'Do you speak English?',      es: '¿Habla inglés?',                 fr: 'Parlez-vous anglais ?',          de: 'Sprechen Sie Englisch?',         pt: 'Você fala inglês?',               ja: '英語は話せますか？' },
      spoken: { en: 'Do you speak English?', es: '¿Habla inglés?', fr: 'Parlez-vous anglais ?', de: 'Sprechen Sie Englisch?', pt: 'Você fala inglês?', ja: '英語は話せますか？' }
    },
    {
      icon: 'ph-camera',
      fan:  { en: 'Can you take a photo of us?', es: '¿Puede tomarnos una foto?',    fr: 'Pouvez-vous nous prendre en photo ?', de: 'Können Sie ein Foto von uns machen?', pt: 'Você pode tirar uma foto de nós?', ja: '写真を撮っていただけますか？' },
      spoken: { en: 'Could you please take a photo of us?', es: '¿Podría tomarnos una foto, por favor?', fr: 'Pourriez-vous nous prendre en photo, s\'il vous plaît ?', de: 'Könnten Sie bitte ein Foto von uns machen?', pt: 'Você poderia tirar uma foto de nós, por favor?', ja: '写真を撮っていただけますか？' }
    }
  ]
};

// ── Active staff phrase category ──────────────────────────
let activeStaffCat = 'emergency';

// ── Render Staff Phrases ───────────────────────────────────
function renderStaffPhrases(cat) {
  const container = document.getElementById('staff-phrases');
  if (!container) return;
  activeStaffCat = cat;

  const uiLang    = getEffectiveUILang();
  const phrases   = STAFF_PHRASES[cat] || [];
  const staffLang = STADIUM_DATA.staffLang;

  container.innerHTML = '';

  phrases.forEach(phrase => {
    const btn = document.createElement('button');
    btn.className = 'staff-phrase-btn';

    // Fan-facing label (in the fan's selected UI language)
    const fanText    = phrase.fan[uiLang] || phrase.fan.en;
    // Text to speak (in the stadium's primary language for staff to understand)
    const spokenText = phrase.spoken[staffLang.slice(0, 2)] || phrase.spoken.en;

    const staffColorMap = {
      emergency: '#EF4444',
      navigation: '#1E90FF',
      needs: '#FFB020',
      courtesy: '#FFFFFF'
    };
    const iconColor = staffColorMap[cat] || '#FFFFFF';

    btn.innerHTML = `
      <i class="ph ${phrase.icon} phrase-icon" style="font-size: 22px; color: ${iconColor};"></i>
      <div class="phrase-text-wrap">
        <span class="phrase-fan-text">${fanText}</span>
      </div>
      <span class="phrase-play-icon">
        <i class="ph-fill ph-speaker-high" style="font-size: 1.2rem;"></i>
      </span>`;

    btn.addEventListener('click', () => speakStaffPhrase(btn, spokenText, staffLang));
    container.appendChild(btn);
  });
}

// ── Speak a staff phrase via Web Speech API ────────────────
function speakStaffPhrase(btn, text, langCode) {
  if (!('speechSynthesis' in window)) {
    alert('Speech synthesis is not supported in your browser.');
    return;
  }
  // Cancel any previous playback
  window.speechSynthesis.cancel();

  // Visual feedback — mark the active button
  document.querySelectorAll('.staff-phrase-btn').forEach(b => b.classList.remove('playing'));
  btn.classList.add('playing');

  const utterance  = new SpeechSynthesisUtterance(text);
  utterance.lang   = langCode;
  utterance.rate   = 0.88;   // slightly slower for clarity in noisy stadiums
  utterance.volume = 1.0;

  // Pick best matching voice
  const voices = window.speechSynthesis.getVoices();
  const voice  = voices.find(v => v.lang === langCode)
              || voices.find(v => v.lang.startsWith(langCode.slice(0, 2)));
  if (voice) utterance.voice = voice;

  utterance.onend   = () => btn.classList.remove('playing');
  utterance.onerror = () => btn.classList.remove('playing');

  window.speechSynthesis.speak(utterance);
}

// ── Wire staff tab buttons ─────────────────────────────────
function initStaffTabs() {
  document.querySelectorAll('.staff-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.staff-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderStaffPhrases(tab.getAttribute('data-staff-cat'));
    });
  });
}

// ── Update the staff language badge ───────────────────────
function updateStaffLangBadge() {
  const flag = document.getElementById('staff-lang-flag');
  const name = document.getElementById('staff-lang-name');
  if (flag) flag.textContent = STADIUM_DATA.staffLangFlag;
  if (name) name.textContent = STADIUM_DATA.staffLangName;
}

// ── Get the effective UI language ─────────────────────────
// Returns the actual code to use for UI strings (falls back to 'en' for 'auto')
function getEffectiveUILang() {
  if (selectedLangOverride !== 'auto') return selectedLangOverride;
  return 'en'; // auto mode defaults UI to English
}

// ============================================================
//  MULTILINGUAL DIRECTIONS DICTIONARY
// ============================================================
const OFFLINE_DICTIONARY = {
  en: {
    langName: 'English',
    directionsTitle: 'Walking Directions',
    badgeLabel: 'English',
    start:         'Start at Section {start} (Level {level}).',
    startGate:     'Start at {gate} (Ground Level).',
    escalator:     'Head to the escalator near {gate} (Section {section}).',
    escalatorUp:   'Take the escalator up to Level {level}.',
    escalatorDown: 'Take the escalator down to Level {level}.',
    walkCirc:      'Walk {direction} past Section {sections} toward {target}.',
    arrive:        'Arrive at {target} (near Section {section}).',
    arriveLeft:    'Your destination is on the left.',
    arriveRight:   'Your destination is on the right.',
    clockwise:     'clockwise',
    counterClock:  'counter-clockwise'
  },
  es: {
    langName: 'Español',
    directionsTitle: 'Ruta de Navegación',
    badgeLabel: 'Español',
    start:         'Comience en la Sección {start} (Nivel {level}).',
    startGate:     'Comience en la {gate} (Nivel inferior).',
    escalator:     'Diríjase a la escalera mecánica cerca de {gate} (Sección {section}).',
    escalatorUp:   'Suba por la escalera mecánica al Nivel {level}.',
    escalatorDown: 'Baje por la escalera mecánica al Nivel {level}.',
    walkCirc:      'Camine en sentido {direction} pasando la Sección {sections} hacia {target}.',
    arrive:        'Llegue a {target} (cerca de la Sección {section}).',
    arriveLeft:    'Su destino estará a la izquierda.',
    arriveRight:   'Su destino estará a la derecha.',
    clockwise:     'horario',
    counterClock:  'antihorario'
  },
  fr: {
    langName: 'Français',
    directionsTitle: 'Itinéraire à Pied',
    badgeLabel: 'Français',
    start:         'Démarrez à la Section {start} (Niveau {level}).',
    startGate:     'Démarrez à la {gate} (Niveau rez-de-chaussée).',
    escalator:     'Dirigez-vous vers l\'escalator près de {gate} (Section {section}).',
    escalatorUp:   'Prenez l\'escalator jusqu\'au Niveau {level}.',
    escalatorDown: 'Descendez par l\'escalator jusqu\'au Niveau {level}.',
    walkCirc:      'Marchez dans le sens {direction} devant la Section {sections} vers {target}.',
    arrive:        'Arrivée à {target} (près de la Section {section}).',
    arriveLeft:    'Votre destination est sur la gauche.',
    arriveRight:   'Votre destination est sur la droite.',
    clockwise:     'des aiguilles d\'une montre',
    counterClock:  'inverse des aiguilles d\'une montre'
  },
  de: {
    langName: 'Deutsch',
    directionsTitle: 'Wegbeschreibung',
    badgeLabel: 'Deutsch',
    start:         'Starten Sie an Sektion {start} (Ebene {level}).',
    startGate:     'Starten Sie bei {gate} (Ebene Erdgeschoss).',
    escalator:     'Gehen Sie zur Rolltreppe nahe {gate} (Sektion {section}).',
    escalatorUp:   'Fahren Sie mit der Rolltreppe hoch auf Ebene {level}.',
    escalatorDown: 'Fahren Sie mit der Rolltreppe runter auf Ebene {level}.',
    walkCirc:      'Gehen Sie im {direction} an Sektion {sections} vorbei in Richtung {target}.',
    arrive:        'Ankunft bei {target} (nahe Sektion {section}).',
    arriveLeft:    'Ihr Ziel befindet sich auf der linken Seite.',
    arriveRight:   'Ihr Ziel befindet sich auf der rechten Seite.',
    clockwise:     'Uhrzeigersinn',
    counterClock:  'Gegenuhrzeigersinn'
  },
  pt: {
    langName: 'Português',
    directionsTitle: 'Direções a Pé',
    badgeLabel: 'Português',
    start:         'Comece na Seção {start} (Nível {level}).',
    startGate:     'Comece no {gate} (Nível térreo).',
    escalator:     'Vá até a escada rolante perto de {gate} (Seção {section}).',
    escalatorUp:   'Suba a escada rolante até o Nível {level}.',
    escalatorDown: 'Desça a escada rolante até o Nível {level}.',
    walkCirc:      'Caminhe no sentido {direction} passando pela Seção {sections} em direção a {target}.',
    arrive:        'Chegue a {target} (perto da Seção {section}).',
    arriveLeft:    'Seu destino estará à esquerda.',
    arriveRight:   'Seu destino estará à direita.',
    clockwise:     'horário',
    counterClock:  'anti-horário'
  },
  ja: {
    langName: '日本語',
    directionsTitle: '徒歩ルート',
    badgeLabel: '日本語',
    start:         'セクション {start}（レベル {level}）からスタートします。',
    startGate:     '{gate}（グラウンドレベル）からスタートします。',
    escalator:     '{gate}（セクション {section}）近くのエスカレーターへ向かいます。',
    escalatorUp:   'エスカレーターでレベル {level} へ上ります。',
    escalatorDown: 'エスカレーターでレベル {level} へ下ります。',
    walkCirc:      'セクション {sections} を{direction}に歩き、{target} へ向かいます。',
    arrive:        'セクション {section} 近くの {target} に到着します。',
    arriveLeft:    '目的地は左側にあります。',
    arriveRight:   '目的地は右側にあります。',
    clockwise:     '時計回り',
    counterClock:  '反時計回り'
  }
};

// ============================================================
//  COORDINATE MATH
// ============================================================
function sectionAngle(sectionBase) {
  const b = ((sectionBase - 1) % 48) + 1;
  return ((b - 13) / 48) * 2 * Math.PI;
}

function getStadiumCoords(sectionVal, levelNum) {
  if (STADIUM_DATA.gates[sectionVal]) {
    const g = STADIUM_DATA.gates[sectionVal];
    return { x: g.x, y: g.y };
  }
  const secNum = parseInt(String(sectionVal).replace(/\D/g, '')) || 101;
  const base   = ((secNum - 1) % 100) % 48 + 1;
  const angle  = sectionAngle(base);
  let r = 50;
  if (levelNum === 200) r = 65;
  if (levelNum === 300) r = 80;
  return { x: 100 + r * Math.cos(angle), y: 100 + r * Math.sin(angle) };
}

// ── DRAW STADIUM SVG ──────────────────────────────────────
function drawStadiumSVG() {
  const layoutGroup = document.getElementById('stadium-layout');
  layoutGroup.innerHTML = '';

  const TOTAL_SLICES = 12;
  const outerR = 85;
  const innerR = 35;

  for (let i = 0; i < TOTAL_SLICES; i++) {
    const secNum  = 101 + Math.round((i / TOTAL_SLICES) * 48);
    const textVal = secNum > 148 ? secNum - 48 : secNum;
    const base    = ((textVal - 1) % 100) % 48 + 1;

    const midAngle  = sectionAngle(base);
    const halfWedge = Math.PI / TOTAL_SLICES;
    const a0 = midAngle - halfWedge;
    const a1 = midAngle + halfWedge;

    const xi0 = 100 + innerR * Math.cos(a0), yi0 = 100 + innerR * Math.sin(a0);
    const xi1 = 100 + innerR * Math.cos(a1), yi1 = 100 + innerR * Math.sin(a1);
    const xo0 = 100 + outerR * Math.cos(a0), yo0 = 100 + outerR * Math.sin(a0);
    const xo1 = 100 + outerR * Math.cos(a1), yo1 = 100 + outerR * Math.sin(a1);

    const d = `M ${xi0} ${yi0} L ${xo0} ${yo0} A ${outerR} ${outerR} 0 0 1 ${xo1} ${yo1} L ${xi1} ${yi1} A ${innerR} ${innerR} 0 0 0 ${xi0} ${yi0} Z`;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('class', 'section-slice');
    path.setAttribute('data-section', textVal);
    path.setAttribute('fill', 'rgba(255,255,255,0.02)');
    path.setAttribute('stroke', 'rgba(255,255,255,0.05)');
    path.addEventListener('click', (e) => {
      const svg = document.getElementById('stadium-svg');
      let exactDest = null;
      if (svg) {
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
        exactDest = { x: svgP.x, y: svgP.y };
      }

      const startLoc   = getStartLocation();
      if (!startLoc) {
        // Set start location on first tap
        let nearestDist = Infinity;
        let nearestSec = 101;
        for (let s = 1; s <= 48; s++) {
          const sc = getStadiumCoords(100 + s, 100);
          const d = Math.sqrt((sc.x - exactDest.x) ** 2 + (sc.y - exactDest.y) ** 2);
          if (d < nearestDist) { nearestDist = d; nearestSec = 100 + s; }
        }
        updateUIStartLocation(nearestSec, 100);
        return;
      }
      
      let nearestDist = Infinity;
      let nearestQuery = '';

      // Check all facilities on current level
      STADIUM_DATA.facilities.filter(f => f.level === startLoc.level).forEach(f => {
        const fc = getStadiumCoords(f.section, f.level);
        const d = Math.sqrt((fc.x - exactDest.x) ** 2 + (fc.y - exactDest.y) ** 2);
        if (d < nearestDist) {
          nearestDist = d;
          nearestQuery = `${getCategoryLabel(f.category)}: ${f.shortName}`;
        }
      });

      // Check all sections on current level
      const baseLevel = startLoc.level;
      for (let s = 1; s <= 48; s++) {
        const secId = baseLevel + s;
        const sc = getStadiumCoords(secId, baseLevel);
        const d = Math.sqrt((sc.x - exactDest.x) ** 2 + (sc.y - exactDest.y) ** 2);
        if (d < nearestDist) {
          nearestDist = d;
          nearestQuery = `Go to Section ${secId}`;
        }
      }
      
      queryInput.value = nearestQuery;
      runOfflineEngine(queryInput.value, startLoc.section, startLoc.level, exactDest);
    });
    layoutGroup.appendChild(path);

    const labelR = 77;
    const lx = 100 + labelR * Math.cos(midAngle);
    const ly = 100 + labelR * Math.sin(midAngle);
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', lx);
    label.setAttribute('y', ly);
    label.setAttribute('class', 'section-label');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('dominant-baseline', 'central');
    label.textContent = textVal;
    layoutGroup.appendChild(label);
  }

  // ── Gate nodes ──
  Object.entries(STADIUM_DATA.gates).forEach(([gateName, gate]) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', gate.x);
    circle.setAttribute('cy', gate.y);
    circle.setAttribute('r', '6');
    circle.setAttribute('class', 'gate-node');
    circle.setAttribute('data-gate', gateName);
    circle.addEventListener('click', () => {
      queryInput.value = `Go to ${gateName}`;
      handleConciergeSearch();
    });
    layoutGroup.appendChild(circle);

    const dx  = gate.x - 100, dy = gate.y - 100;
    const mag = Math.sqrt(dx * dx + dy * dy) || 1;
    const ox  = gate.x + (dx / mag) * 10;
    const oy  = gate.y + (dy / mag) * 10;

    let shortLabel = gateName.slice(0, 1);
    if (gateName.startsWith('Bud'))     shortLabel = 'B';
    else if (gateName.startsWith('Ver')) shortLabel = 'V';
    else if (gateName.startsWith('Pep')) shortLabel = 'P';
    else if (gateName.startsWith('Met')) shortLabel = 'M';
    else if (gateName.match(/\d/))      shortLabel = gateName.match(/\d+/)[0];
    else if (gateName.startsWith('Acc')) shortLabel = gateName.split(' ')[1] ? gateName.split(' ')[1].slice(-1) : 'G';

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', ox);
    text.setAttribute('y', oy);
    text.setAttribute('class', 'gate-label');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'central');
    text.textContent = shortLabel;
    layoutGroup.appendChild(text);
  });

  // ── Facility icon nodes ──
  const currentLvl = getStartLocation().level;
  const currentLevelFacilities = STADIUM_DATA.facilities.filter(f => f.level === currentLvl);

  currentLevelFacilities.forEach(fac => {
    const coords = getStadiumCoords(fac.section, fac.level);
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'facility-node');
    g.setAttribute('id', `node_${fac.id}`);

    const colorMap = { bathroom: '#1E90FF', food: '#FFB020', firstaid: '#EF4444', merch: '#FFFFFF' };
    const phIconMap = { bathroom: 'ph-toilet', food: 'ph-hamburger', firstaid: 'ph-first-aid-kit', merch: 'ph-shopping-bag' };
    const color = colorMap[fac.category] || '#1E90FF';
    const phClass = phIconMap[fac.category] || 'ph-map-pin';

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', coords.x);
    circle.setAttribute('cy', coords.y);
    circle.setAttribute('r', '10');
    circle.setAttribute('fill', color);
    circle.setAttribute('stroke', 'none');
    g.appendChild(circle);

    const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    fo.setAttribute('x', coords.x - 10);
    fo.setAttribute('y', coords.y - 10);
    fo.setAttribute('width', 20);
    fo.setAttribute('height', 20);

    const i = document.createElement('i');
    i.className = `ph ${phClass}`;
    i.style.color = '#0A0A0C';
    i.style.fontSize = '14px';
    i.style.display = 'flex';
    i.style.justifyContent = 'center';
    i.style.alignItems = 'center';
    i.style.width = '100%';
    i.style.height = '100%';
    
    fo.appendChild(i);
    g.appendChild(fo);

    g.addEventListener('click', (e) => {
      // Highlight selection
      document.querySelectorAll('.facility-node circle').forEach(c => {
        c.setAttribute('stroke', 'none');
      });
      circle.setAttribute('stroke', '#FFFFFF');
      circle.setAttribute('stroke-width', '2');

      const svg = document.getElementById('stadium-svg');
      let exactDest = null;
      if (svg) {
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
        exactDest = { x: svgP.x, y: svgP.y };
      }

      // Open Search overlay
      const controlPanels = document.getElementById('control-panels');
      if (controlPanels) controlPanels.classList.remove('hidden');

      // Populate nearby amenities
      const nearbyContainer = document.getElementById('nearby-amenities-container');
      const nearbyList = document.getElementById('nearby-amenities-list');
      if (nearbyContainer && nearbyList) {
        nearbyContainer.classList.remove('hidden');
        nearbyList.innerHTML = '';
        
        const facBase = ((fac.section - 1) % 100) % 48 + 1;
        const nearby = STADIUM_DATA.facilities.filter(f => {
          if (f.id === fac.id || f.level !== fac.level) return false;
          const fBase = ((f.section - 1) % 100) % 48 + 1;
          const dist = Math.min(Math.abs(fBase - facBase), 48 - Math.abs(fBase - facBase));
          return dist <= 5;
        }).slice(0, 3);
        
        if (nearby.length === 0) {
          const li = document.createElement('li');
          li.textContent = 'No other amenities nearby.';
          nearbyList.appendChild(li);
        } else {
          nearby.forEach(nf => {
            const li = document.createElement('li');
            li.textContent = `• ${getCategoryLabel(nf.category)}: ${nf.shortName} (Sec ${nf.section})`;
            nearbyList.appendChild(li);
          });
        }
      }

      const catLabel = getCategoryLabel(fac.category);
      queryInput.value = `${catLabel}: ${fac.shortName}`;
      const loc = getStartLocation();
      runOfflineEngine(queryInput.value, loc.section, loc.level, exactDest);
    });

    layoutGroup.appendChild(g);
  });
}

// ── Category label helper ──────────────────────────────────
function getCategoryLabel(category) {
  const labels = { bathroom: 'Restroom', food: 'Vendor', firstaid: 'First Aid', merch: 'Store' };
  return labels[category] || 'Facility';
}

// ── Datalist helpers ───────────────────────────────────────
function populateSectionDatalist() {
  const datalist = document.getElementById('start-sections');
  if (!datalist) return;
  datalist.innerHTML = '';

  const lvl = startLevelInput.value;
  let levelNum = 100;
  if (lvl.includes('200')) levelNum = 200;
  else if (lvl.includes('300')) levelNum = 300;

  Object.keys(STADIUM_DATA.gates).forEach(g => {
    const opt = document.createElement('option');
    opt.value = g;
    datalist.appendChild(opt);
  });

  for (let s = levelNum + 1; s <= levelNum + 48; s++) {
    const opt = document.createElement('option');
    opt.value = `Section ${s}`;
    datalist.appendChild(opt);
  }
}

function setupSearchableInput() {
  const levelsDatalist = document.getElementById('start-levels');
  if (levelsDatalist) {
    levelsDatalist.innerHTML = '';
    ['100-Level (Lower)', '200-Level (Club)', '300-Level (Upper)'].forEach(lbl => {
      const opt = document.createElement('option');
      opt.value = lbl;
      levelsDatalist.appendChild(opt);
    });
  }
  populateSectionDatalist();
}

// ── Parse typed start location from inputs ─────────────────
function getStartLocation() {
  const lvlVal = startLevelInput.value;
  const secVal = startSectionInput.value.trim();

  if (!lvlVal || !secVal) return null;

  let levelNum = 100;
  if (lvlVal.includes('200')) levelNum = 200;
  else if (lvlVal.includes('300')) levelNum = 300;

  if (STADIUM_DATA.gates[secVal]) {
    return { section: secVal, level: 100 };
  }

  const secMatch = secVal.match(/(?:section\s*)?([123]\d{2})/i);
  if (secMatch) {
    const n = parseInt(secMatch[1]);
    return { section: n.toString(), level: Math.floor(n / 100) * 100 };
  }

  return { section: (levelNum + 1).toString(), level: levelNum };
}

function updateUIStartLocation(sectionVal, levelNum) {
  const map = { 100: '100-Level (Lower)', 200: '200-Level (Club)', 300: '300-Level (Upper)' };
  startLevelInput.value = map[levelNum] || '100-Level (Lower)';
  populateSectionDatalist();
  startSectionInput.value = String(sectionVal).startsWith('Gate') || STADIUM_DATA.gates[sectionVal]
    ? sectionVal
    : `Section ${sectionVal}`;
  triggerMapUpdate();
}

// ── Map pin update ──────────────────────────────────────────
function triggerMapUpdate() {
  const loc = getStartLocation();
  const startPin = document.getElementById('start-pin');
  if (loc) {
    const c = getStadiumCoords(loc.section, loc.level);
    startPin.setAttribute('cx', c.x);
    startPin.setAttribute('cy', c.y);
  } else {
    startPin.setAttribute('cx', '-20');
    startPin.setAttribute('cy', '-20');
  }
  drawStadiumSVG();
}

// ── Input event listeners ──────────────────────────────────
startLevelInput.addEventListener('input', () => {
  populateSectionDatalist();
  triggerMapUpdate();
});

startSectionInput.addEventListener('input', () => {
  const secVal = startSectionInput.value;
  const m = secVal.match(/(?:section\s*)?([123])\d{2}/i);
  if (m) {
    const labels = { '1': '100-Level (Lower)', '2': '200-Level (Club)', '3': '300-Level (Upper)' };
    if (labels[m[1]]) { startLevelInput.value = labels[m[1]]; populateSectionDatalist(); }
  }
  triggerMapUpdate();
});

// ── Route Drawing ──────────────────────────────────────────
function drawActiveRoute(startSec, startLvl, endSec, endLvl, exactDestCoords = null) {
  const endPin      = document.getElementById('end-pin');
  const activeRoute = document.getElementById('active-route');

  const endCoords = exactDestCoords || getStadiumCoords(endSec, endLvl);
  endPin.setAttribute('cx', endCoords.x);
  endPin.setAttribute('cy', endCoords.y);

  let pathStr = '';

  if (startLvl === endLvl) {
    pathStr = buildArcPath(startSec, endSec, startLvl);
  } else {
    const escGate  = findNearestGate(startSec);
    const gateData = STADIUM_DATA.gates[escGate];
    const gateEndC = getStadiumCoords(gateData.section, endLvl);

    const p1 = buildArcPath(startSec, gateData.section, startLvl);
    const p2 = `L ${gateEndC.x} ${gateEndC.y}`;
    const p3 = buildArcPath(gateData.section, endSec, endLvl, true);
    pathStr  = `${p1} ${p2} ${p3}`;
  }

  if (exactDestCoords) {
    pathStr += ` L ${exactDestCoords.x} ${exactDestCoords.y}`;
  }

  activeRoute.setAttribute('d', pathStr);
}

// ── SVG Arc Path (always shortest arc, stays inside bowl) ─
function buildArcPath(secStart, secEnd, level, skipMove = false) {
  const c1 = getStadiumCoords(secStart, level);
  const c2 = getStadiumCoords(secEnd,   level);

  let r = 50;
  if (level === 200) r = 65;
  if (level === 300) r = 80;

  const b1      = getBase(secStart);
  const b2      = getBase(secEnd);
  const rawDiff = ((b2 - b1) % 48 + 48) % 48;

  const sweep = rawDiff <= 24 ? 1 : 0;
  const large = 0; // always minor arc

  if (rawDiff === 0) {
    return skipMove ? '' : `M ${c1.x} ${c1.y}`;
  }

  const move = skipMove ? '' : `M ${c1.x} ${c1.y} `;
  return `${move}A ${r} ${r} 0 ${large} ${sweep} ${c2.x} ${c2.y}`;
}

function getBase(sectionVal) {
  if (STADIUM_DATA.gates[sectionVal]) {
    return getBase(STADIUM_DATA.gates[sectionVal].section);
  }
  const n = parseInt(String(sectionVal).replace(/\D/g, '')) || 101;
  return ((n - 1) % 100) % 48 + 1;
}

function getCircDistance(b1, b2) {
  const diff = Math.abs(b1 - b2);
  return Math.min(diff, 48 - diff);
}

function findNearestGate(sectionVal) {
  const base = getBase(sectionVal);
  let nearest = null, minDist = 9999;
  Object.entries(STADIUM_DATA.gates).forEach(([name, gate]) => {
    const d = getCircDistance(base, getBase(gate.section));
    if (d < minDist) { minDist = d; nearest = name; }
  });
  return nearest || Object.keys(STADIUM_DATA.gates)[0];
}

// ── Backend Status ─────────────────────────────────────────
async function checkBackendStatus() {
  try {
    const res  = await fetch(`${BACKEND_URL}/api/status`);
    const data = await res.json();
    isBackendOnline = data.status === 'online';
    updateStatusUI();
  } catch {
    isBackendOnline = false;
    updateStatusUI();
  }
}

function updateStatusUI() {
  const uiLang  = getEffectiveUILang();
  const strings = UI_STRINGS[uiLang] || UI_STRINGS.en;

  if (isBackendOnline && !isOfflineForced) {
    connectionStatus.className = 'status-badge online';
    statusText.textContent     = strings.modeGenAI;
    footerConnection.textContent = strings.footerMode;
  } else {
    connectionStatus.className = 'status-badge offline';
    statusText.textContent     = strings.modeOffline;
    footerConnection.textContent = strings.footerMode;
  }
}

connectionStatus.addEventListener('click', () => {
  isOfflineForced = !isOfflineForced;
  if (!isOfflineForced) checkBackendStatus();
  else { isBackendOnline = false; updateStatusUI(); }
});

// ── Category badge quick-search ────────────────────────────
document.querySelectorAll('.category-badge').forEach(badge => {
  badge.addEventListener('click', () => {
    const cat = badge.getAttribute('data-category');
    const texts = {
      bathroom: 'nearest restroom',
      food:     'nearest food concessions',
      merch:    'official FIFA store',
      firstaid: 'first aid medical help',
      gate:     'how do I get to the main gate?'
    };
    queryInput.value = texts[cat] || 'nearest restroom';
    handleConciergeSearch();
  });
});

// ── Language Selector — immediate re-render ────────────────
if (langSelect) {
  langSelect.addEventListener('change', () => {
    selectedLangOverride = langSelect.value;

    // 1. Apply full UI localisation
    const effectiveLang = getEffectiveUILang();
    applyUILocale(effectiveLang);

    // 2. Refresh staff tabs & phrases with new fan language
    document.querySelectorAll('[data-i18n]').forEach(el => {
      // Already handled by applyUILocale above
    });
    renderStaffPhrases(activeStaffCat);

    // 3. If directions are showing, re-render them in the new language
    if (lastRenderState && resultsCard.style.display !== 'none') {
      const { lang: _old, startSec, startLvl, destSec, destLvl, destName, fac } = lastRenderState;
      const newLang = resolveLanguage(queryInput.value || '');
      resolveAndRender(newLang, startSec, startLvl, destSec, destLvl, destName, fac);
    }

    // 4. Update dynamic status text
    updateStatusUI();
  });
}

// ── Main Search Handler ────────────────────────────────────
searchBtn.addEventListener('click', handleConciergeSearch);
queryInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleConciergeSearch(); });

async function handleConciergeSearch() {
  const query = queryInput.value.trim();
  if (!query) return;

  resultsCard.style.display = 'none';
  loadingCard.style.display = 'flex';
  stopSpeaking();

  const loc      = getStartLocation();
  const startSec = loc.section;
  const startLvl = loc.level;

  if (isBackendOnline && !isOfflineForced) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/directions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, start_location: `${startSec} (Level ${startLvl})` })
      });
      if (!res.ok) throw new Error('Backend error');
      const data = await res.json();

      if (data.status === 'offline_mode_recommended') {
        isBackendOnline = false; updateStatusUI();
        runOfflineEngine(query, startSec, startLvl);
        return;
      }
      renderGenAIResults(data);
    } catch {
      isBackendOnline = false; updateStatusUI();
      runOfflineEngine(query, startSec, startLvl);
    }
  } else {
    setTimeout(() => runOfflineEngine(query, startSec, startLvl), 500);
  }
}

// ── GenAI Result Renderer ──────────────────────────────────
function renderGenAIResults(data) {
  loadingCard.style.display = 'none';
  resultsCard.style.display = 'flex';

  destinationTitle.textContent = data.destination_matched || 'Destination Resolved';
  detectedLang.textContent     = `Detected: ${data.detected_language || 'Auto'}`;
  currentLangCode = getLangCode(data.detected_language);

  directionsList.innerHTML = '';
  currentDirections        = data.directions || [];

  currentDirections.forEach((step, idx) => {
    const cleanStep = String(step).replace(/^\s*\d+[\.)\]]\s*/, '');
    appendStep(cleanStep, idx + 1);
  });

  let endSec = 112, endLvl = 100;
  if (data.end_location_id) {
    const fac = STADIUM_DATA.facilities.find(f => f.id === data.end_location_id);
    if (fac) { endSec = fac.section; endLvl = fac.level; }
    else {
      const gate = Object.values(STADIUM_DATA.gates).find(g => g.id === data.end_location_id);
      if (gate) { endSec = gate.section; endLvl = gate.level; }
    }
  } else if (data.destination_matched) {
    const fac = STADIUM_DATA.facilities.find(f =>
      data.destination_matched.toLowerCase().includes(f.name.en.toLowerCase()));
    if (fac) { endSec = fac.section; endLvl = fac.level; }
  }

  const startLoc = getStartLocation();
  drawActiveRoute(startLoc.section, startLoc.level, endSec, endLvl);
}

function appendStep(text, num) {
  const li = document.createElement('li');
  li.className = 'direction-step';

  const badge = document.createElement('div');
  badge.className = 'step-number';
  badge.textContent = num;
  li.appendChild(badge);

  const span = document.createElement('div');
  span.className   = 'step-text';
  span.textContent = text;
  li.appendChild(span);

  directionsList.appendChild(li);
}

// ── Language resolution ────────────────────────────────────
function resolveLanguage(query) {
  if (selectedLangOverride !== 'auto') return selectedLangOverride;

  const norm = query.toLowerCase();
  if      (/\b(baño|dónde|cómo|hambre|cerveza|sección|primeros auxilios)\b/i.test(norm)) return 'es';
  else if (/\b(toilette|nourriture|manger|boutique|secours|médecin|faim|soif|bière|où)\b/.test(norm)) return 'fr';
  else if (/\b(essen|trinken|laden|tor|arzt|hilfe|hunger|durst|bier|wo)\b/.test(norm))   return 'de';
  else if (/\b(banheiro|loja|socorro|médico|fome|sede|cerveja|onde)\b/.test(norm))        return 'pt';
  else if (/(トイレ|お手洗い|フード|ご飯|ショップ|ゲート|門|救急|医者|お腹|ビール|どこ)/.test(norm)) return 'ja';

  return 'en';
}

// ── Offline Routing Engine ─────────────────────────────────
function runOfflineEngine(query, defaultStartSec, defaultStartLvl, exactDestCoords = null) {
  loadingCard.style.display = 'none';
  resultsCard.style.display = 'flex';

  const norm = query.toLowerCase();

  // A. Parse start location from query text
  let startSec = defaultStartSec;
  let startLvl = defaultStartLvl;

  const startPattern = /\b(?:from|desde|depuis|de|aus|starting\s+at)\s+(?:la\s+|el\s+|the\s+)?(?:section|sección|seção|sektion)?\s*([123]\d{2})\b/i;
  const startM = norm.match(startPattern);
  if (startM) {
    startSec = startM[1];
    startLvl = Math.floor(parseInt(startM[1]) / 100) * 100;
    updateUIStartLocation(startSec, startLvl);
  }

  // B. Language resolution
  const lang = resolveLanguage(query);
  const langCodes = { en: 'en-US', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', pt: 'pt-BR', ja: 'ja-JP' };
  currentLangCode = langCodes[lang];

  // C. Explicit destination section number?
  const destSecMatch = norm.match(/\b(?:section|sección|seção|sektion|go to)\s*([123]\d{2})\b/i)
                    || norm.match(/\b([123]\d{2})\b/);
  if (destSecMatch) {
    const secNum  = parseInt(destSecMatch[1]);
    const destLvl = Math.floor(secNum / 100) * 100;
    return resolveAndRender(lang, startSec, startLvl, secNum.toString(), destLvl, `Section ${secNum}`, null, exactDestCoords);
  }

  // D. Category detection
  let category = 'bathroom';
  if (/\b(food|drink|concession|eat|taco|tacos|burger|beer|chicken|bbq|bagel|hungry|thirsty|comida|hambre|sed|manger|faim|soif|essen|trinken|bier|fome|sede)\b/i.test(norm)
    || /(フード|ご飯|お腹|ビール)/.test(norm)) category = 'food';
  else if (/\b(aid|medical|doctor|nurse|hurt|sick|emergency|médico|urgencia|dolor|secours|médecin|arzt|hilfe|socorro)\b/i.test(norm)
    || /(救急|医者|痛い)/.test(norm)) category = 'firstaid';
  else if (/\b(shop|store|merch|tshirt|shirt|cap|buy|tienda|boutique|laden|kaufen|loja)\b/i.test(norm)
    || /(ショップ|店|買う)/.test(norm)) category = 'merch';
  else if (/\b(gate|puerta|porte|tor|porta)\b/i.test(norm)
    || /(ゲート|門)/.test(norm)) category = 'gate';

  // E. Gate resolution
  if (category === 'gate') {
    const gateKey = Object.keys(STADIUM_DATA.gates).find(gk => norm.includes(gk.toLowerCase()));
    if (gateKey) {
      const g = STADIUM_DATA.gates[gateKey];
      return resolveAndRender(lang, startSec, startLvl, g.section.toString(), g.level, gateKey, null, exactDestCoords);
    }
    let targetGate = null;
    if      (/\b(north|norte|nord)\b/i.test(norm)) targetGate = Object.keys(STADIUM_DATA.gates).find(k => /north|norte|nord|budlight|bud light|1/i.test(k));
    else if (/\b(east|este|ost)\b/i.test(norm))    targetGate = Object.keys(STADIUM_DATA.gates).find(k => /east|este|verizon|2/i.test(k));
    else if (/\b(south|sur|sud|süd)\b/i.test(norm))targetGate = Object.keys(STADIUM_DATA.gates).find(k => /south|sur|pepsi|3/i.test(k));
    else if (/\b(west|oeste|ouest)\b/i.test(norm)) targetGate = Object.keys(STADIUM_DATA.gates).find(k => /west|oeste|metlife|4/i.test(k));
    if (!targetGate) targetGate = Object.keys(STADIUM_DATA.gates)[0];
    const g = STADIUM_DATA.gates[targetGate];
    return resolveAndRender(lang, startSec, startLvl, g.section.toString(), g.level, targetGate, null, exactDestCoords);
  }

  // F. Facility matching
  let matchedFac = null;

  matchedFac = STADIUM_DATA.facilities.find(f =>
    f.shortName && norm.includes(f.shortName.toLowerCase())
  );

  if (!matchedFac) {
    if      (/\b(fuku|chicken)\b/i.test(norm))                     matchedFac = STADIUM_DATA.facilities.find(f => f.id.startsWith('fuku'));
    else if (/\b(shah|halal)\b/i.test(norm))                       matchedFac = STADIUM_DATA.facilities.find(f => f.id.startsWith('shahs'));
    else if (/\b(taco|tacos|raqueros|dos toros)\b/i.test(norm))    matchedFac = closestOf(STADIUM_DATA.facilities.filter(f => f.id.includes('taco') || f.id.includes('raqueros') || f.id.includes('dos_toros')), startSec, startLvl);
    else if (/\b(bbq|barbecue|racetrack)\b/i.test(norm))           matchedFac = STADIUM_DATA.facilities.find(f => f.id.startsWith('racetrack'));
    else if (/\b(bagel|crescent)\b/i.test(norm))                   matchedFac = STADIUM_DATA.facilities.find(f => f.id.startsWith('crescent'));
    else if (/\b(sausage|boardwalk|jersey)\b/i.test(norm))         matchedFac = STADIUM_DATA.facilities.find(f => f.id.startsWith('jersey'));
    else if (/\b(burger|grill|smash)\b/i.test(norm))               matchedFac = STADIUM_DATA.facilities.find(f => f.id.startsWith('burger'));
    else if (/\b(brew|brews|cerveza|bière)\b/i.test(norm))         matchedFac = closestOf(STADIUM_DATA.facilities.filter(f => f.id.includes('brew')), startSec, startLvl);
    else if (/\b(first aid|station)\b/i.test(norm))                matchedFac = closestOf(STADIUM_DATA.facilities.filter(f => f.category === 'firstaid'), startSec, startLvl);
    else if (/\b(official store|express store|tienda|boutique)\b/i.test(norm)) matchedFac = closestOf(STADIUM_DATA.facilities.filter(f => f.category === 'merch'), startSec, startLvl);
  }

  if (!matchedFac) {
    matchedFac = closestOf(STADIUM_DATA.facilities.filter(f => f.category === category), startSec, startLvl)
              || STADIUM_DATA.facilities[0];
  }

  const catLabel = getCategoryLabel(matchedFac.category);
  const destName = `${catLabel}: ${matchedFac.shortName}`;
  resolveAndRender(lang, startSec, startLvl, matchedFac.section.toString(), matchedFac.level, destName, matchedFac, exactDestCoords);
}

function closestOf(list, startSec, startLvl) {
  if (!list || list.length === 0) return null;
  const sb = getBase(startSec);
  let best = list[0], bestCost = 9999;
  list.forEach(f => {
    const cost = getCircDistance(sb, getBase(f.section)) + (f.level !== startLvl ? 12 : 0);
    if (cost < bestCost) { bestCost = cost; best = f; }
  });
  return best;
}

// ── Render directions into UI ──────────────────────────────
function resolveAndRender(lang, startSec, startLvl, destSec, destLvl, destName, fac, exactDestCoords = null) {
  // Save state so language change can re-render without requiring a new search
  lastRenderState = { lang, startSec, startLvl, destSec, destLvl, destName, fac };

  destinationTitle.textContent = destName;

  const langBadge = selectedLangOverride !== 'auto'
    ? `🌐 ${OFFLINE_DICTIONARY[lang].langName}`
    : `Auto: ${OFFLINE_DICTIONARY[lang].langName}`;

  if (fac && fac.section) {
    const levelLabel = { 100: 'Lower Bowl', 200: 'Club Level', 300: 'Upper Bowl' };
    const lvlText = levelLabel[fac.level] || `Level ${fac.level}`;
    detectedLang.textContent = `📍 Sec. ${fac.section} · ${lvlText}  ·  ${langBadge}`;
  } else {
    detectedLang.textContent = `Offline  ·  ${langBadge}`;
  }

  const dict  = OFFLINE_DICTIONARY[lang];
  const steps = [];

  // Step 1: Start
  const startIsGate = !!STADIUM_DATA.gates[startSec];
  if (startIsGate) {
    steps.push(dict.startGate.replace('{gate}', startSec));
  } else {
    steps.push(dict.start.replace('{start}', startSec).replace('{level}', startLvl));
  }

  // Step 2: Level change
  let curSec = startIsGate ? STADIUM_DATA.gates[startSec].section : parseInt(startSec) || 101;
  let curLvl = startLvl;

  if (startLvl !== destLvl) {
    const escGate  = findNearestGate(startSec);
    const gateData = STADIUM_DATA.gates[escGate];
    const gateSec  = gateData.section;
    steps.push(dict.escalator.replace('{gate}', escGate).replace('{section}', gateSec));
    if (destLvl > startLvl) steps.push(dict.escalatorUp.replace('{level}', destLvl));
    else                    steps.push(dict.escalatorDown.replace('{level}', destLvl));
    curSec = gateSec;
    curLvl = destLvl;
  }

  // Step 3: Walk
  const destBase = getBase(destSec);
  const curBase  = getBase(curSec.toString());
  const rawDiff  = ((destBase - curBase) % 48 + 48) % 48;
  const walkTarget = fac ? fac.shortName : destName;

  if (rawDiff !== 0) {
    const goClockwise = rawDiff <= 24;
    const dirTerm = goClockwise ? dict.clockwise : dict.counterClock;
    const step3   = goClockwise ? 3 : -3;
    const midBase = ((curBase + step3 - 1 + 48) % 48) + 1;
    const midSec  = curLvl + midBase;
    steps.push(dict.walkCirc
      .replace('{direction}', dirTerm)
      .replace('{sections}', midSec)
      .replace('{target}', walkTarget));
  }

  // Step 4: Arrive
  const localName = fac ? (fac.name[lang] || fac.name.en || walkTarget) : destName;
  steps.push(dict.arrive.replace('{target}', localName).replace('{section}', destSec));
  steps.push(parseInt(destSec) % 2 === 0 ? dict.arriveLeft : dict.arriveRight);

  directionsList.innerHTML = '';
  currentDirections        = steps;
  steps.forEach((step, idx) => appendStep(step, idx + 1));

  drawActiveRoute(startSec, startLvl, destSec, destLvl, exactDestCoords);
}

// ── Language code helper ───────────────────────────────────
function getLangCode(langName) {
  if (!langName) return 'en-US';
  const n = langName.toLowerCase();
  if (n.includes('spanish') || n.includes('español'))   return 'es-ES';
  if (n.includes('french')  || n.includes('français'))  return 'fr-FR';
  if (n.includes('german')  || n.includes('deutsch'))   return 'de-DE';
  if (n.includes('portuguese') || n.includes('português')) return 'pt-BR';
  if (n.includes('japanese') || n.includes('日本語'))    return 'ja-JP';
  return 'en-US';
}

// ── Text-to-Speech (directions) ────────────────────────────
speakBtn.addEventListener('click', () => {
  if (!('speechSynthesis' in window)) { alert('Speech Synthesis not supported.'); return; }
  if (window.speechSynthesis.speaking) { stopSpeaking(); return; }
  startSpeaking();
});

function startSpeaking() {
  if (currentDirections.length === 0) return;
  speakBtn.classList.add('speaking');
  const utterance = new SpeechSynthesisUtterance(currentDirections.join('. '));
  utterance.lang  = currentLangCode;
  const voices = window.speechSynthesis.getVoices();
  const voice  = voices.find(v => v.lang.startsWith(currentLangCode.slice(0, 2)));
  if (voice) utterance.voice = voice;
  utterance.onend   = () => speakBtn.classList.remove('speaking');
  utterance.onerror = () => speakBtn.classList.remove('speaking');
  activeSpeakerUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

function stopSpeaking() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  speakBtn.classList.remove('speaking');
  activeSpeakerUtterance = null;
}

if ('speechSynthesis' in window && window.speechSynthesis.onvoiceschanged !== undefined) {
  window.speechSynthesis.onvoiceschanged = () => {};
}

// ── Google Maps link update ────────────────────────────────
function updateGoogleMapsLink() {
  const cfg = STADIUM_CONFIGS[currentStadiumId];
  if (googleMapsBtn) {
    googleMapsBtn.href = `https://www.google.com/maps/search/?api=1&query=${cfg.mapsQuery}`;
  }
}

// ── Stadium switcher ───────────────────────────────────────
function switchStadium(id) {
  currentStadiumId = id;
  STADIUM_DATA     = STADIUM_CONFIGS[id];

  resultsCard.style.display = 'none';
  loadingCard.style.display = 'none';
  lastRenderState           = null;
  stopSpeaking();

  const routePath = document.getElementById('active-route');
  if (routePath) routePath.setAttribute('d', '');
  const endPin = document.getElementById('end-pin');
  if (endPin)   { endPin.setAttribute('cx', '-20'); endPin.setAttribute('cy', '-20'); }

  startLevelInput.value   = '';
  startSectionInput.value = '';

  setupSearchableInput();
  drawStadiumSVG();
  triggerMapUpdate();
  updateGoogleMapsLink();
  updateStaffLangBadge();
  renderStaffPhrases(activeStaffCat);
}

// ── App Initialisation ─────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  // Toggle Search Panel
  const toggleBtn = document.getElementById('toggle-search-btn');
  const controlPanels = document.getElementById('control-panels');
  if (toggleBtn && controlPanels) {
    toggleBtn.addEventListener('click', () => {
      controlPanels.classList.toggle('hidden');
    });
  }

  setupSearchableInput();
  drawStadiumSVG();
  triggerMapUpdate();
  updateGoogleMapsLink();
  checkBackendStatus();
  initStaffTabs();
  updateStaffLangBadge();
  renderStaffPhrases('emergency');
  initAIChat();

  // Apply default UI locale (English for 'auto')
  applyUILocale('en');

  if (stadiumSelect) {
    stadiumSelect.addEventListener('change', () => switchStadium(stadiumSelect.value));
  }
});

// ============================================================
//  GEN AI CONCIERGE — Google Gemini API Integration
// ============================================================

// ── API Configuration ────────────────────────────────────────────────
// The AI Chat is securely routed through our Python backend.
const BACKEND_CHAT_URL = '/api/chat';
let lastUserQuery = '';

// ── DOM References (AI Chat) ──────────────────────────────────────
// These are wired once DOMContentLoaded fires (see initAIChat below).
let aiThread    = null;
let aiInput     = null;
let aiSendBtn   = null;
let aiStatusPill  = null;
let aiStatusLabel = null;

// ── Build System Prompt ──────────────────────────────────────────────
// Dynamically injects stadium context so Gemini answers are specific,
// accurate and helpful for the fan's current physical location.
function buildSystemPrompt() {
  const cfg          = STADIUM_DATA;
  const uiLang       = getEffectiveUILang();
  const langName     = OFFLINE_DICTIONARY[uiLang]?.langName || 'English';
  const startLoc     = getStartLocation();
  const startDisplay = STADIUM_DATA.gates[startLoc.section]
    ? startLoc.section
    : `Section ${startLoc.section} (Level ${startLoc.level})`;

  // Build a concise vendor/facility catalogue for the prompt
  const facilityLines = cfg.facilities.map(f => {
    const localName = f.name[uiLang] || f.name.en;
    return `  - [${f.category.toUpperCase()}] ${localName} — near Section ${f.section}, Level ${f.level}`;
  }).join('\n');

  const gateLines = Object.entries(cfg.gates).map(([name, g]) =>
    `  - ${name} (Section ${g.section})`
  ).join('\n');

  return `You are the AI Stadium Concierge for the Global Fan Concierge app at the FIFA World Cup 2026.

CURRENT CONTEXT:
- Stadium: ${cfg.name}, ${cfg.city}
- Fan's current location: ${startDisplay}
- Fan's preferred language: ${langName}
- Respond ENTIRELY in ${langName}. Do NOT switch languages.

STADIUM FACILITIES:
${facilityLines}

STADIUM GATES:
${gateLines}

INSTRUCTIONS:
1. Answer the fan's question helpfully, warmly, and concisely (2–3 short paragraphs max).
2. If the question involves directions or a specific facility, mention the relevant section/gate from the list above.
3. If something is outside your knowledge (e.g., live wait times), say so honestly.
4. Format key info as a short bulleted list when listing multiple options.
5. Start with a warm, one-line acknowledgment of the fan's question.
6. Do NOT hallucinate venue details not listed above.
7. Do NOT use bold or italics formatting. Use plain text and standard bullet points (-) only.`;
}

// ── Simple Markdown → HTML renderer ─────────────────────────────────
// Handles bold, bullet lists, and line-breaks only — safe, no external deps.
function mdToHtml(text) {
  // Escape any raw HTML first to prevent injection
  const safe = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Convert **bold**
  let html = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Convert bullet points (lines starting with - or *)
  const lines = html.split('\n');
  const result = [];
  let inList = false;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (/^[-*]\s+/.test(trimmed)) {
      if (!inList) { result.push('<ul>'); inList = true; }
      result.push(`<li>${trimmed.replace(/^[-*]\s+/, '')}</li>`);
    } else {
      if (inList) { result.push('</ul>'); inList = false; }
      if (trimmed) result.push(`<p>${trimmed}</p>`);
    }
  });
  if (inList) result.push('</ul>');

  return result.join('');
}

// ── Set AI Status Pill ────────────────────────────────────────────────
function setAIStatus(state) {
  if (!aiStatusPill || !aiStatusLabel) return;
  const uiLang  = getEffectiveUILang();
  const strings = UI_STRINGS[uiLang] || UI_STRINGS.en;

  aiStatusPill.className = 'ai-status-pill'; // reset
  switch (state) {
    case 'thinking':
      aiStatusPill.classList.add('ai-status-thinking');
      aiStatusLabel.textContent = strings.aiStatusThinking;
      break;
    case 'error':
      aiStatusPill.classList.add('ai-status-error');
      aiStatusLabel.textContent = strings.aiStatusError;
      break;
    default: // 'idle'
      aiStatusPill.classList.add('ai-status-idle');
      aiStatusLabel.textContent = strings.aiStatusReady;
  }
}

// ── Render a message bubble into the thread ───────────────────────────
// role: 'user' | 'bot'
// html: inner HTML string (use mdToHtml for bot responses, escaped for user)
function renderAIMessage(role, html, isError = false) {
  if (!aiThread) return;

  const wrap = document.createElement('div');
  wrap.className = `ai-bubble ai-bubble-${role}${isError ? ' ai-bubble-error' : ''}`;

  if (role === 'bot') {
    const avatar = document.createElement('span');
    avatar.className = 'ai-bubble-avatar';
    avatar.textContent = isError ? '⚠️' : '🤖';
    wrap.appendChild(avatar);
  }

  const body = document.createElement('div');
  body.className = 'ai-bubble-body';

  if (role === 'user') {
    const p = document.createElement('p');
    p.className = 'ai-bubble-text';
    // User text is always plain text — escape for safety
    p.textContent = html;
    body.appendChild(p);
  } else {
    // Bot text may contain mdToHtml output — set as innerHTML
    body.innerHTML = `<div class="ai-bubble-text">${html}</div>`;
  }

  wrap.appendChild(body);
  aiThread.appendChild(wrap);

  // Smooth scroll to the new message
  requestAnimationFrame(() => {
    aiThread.scrollTo({ top: aiThread.scrollHeight, behavior: 'smooth' });
  });

  return wrap;
}

// ── Typing indicator bubble ─────────────────────────────────────────────
function showTypingIndicator() {
  if (!aiThread) return null;
  const wrap = document.createElement('div');
  wrap.className = 'ai-bubble ai-bubble-bot ai-typing';
  wrap.id = 'ai-typing-indicator';
  wrap.innerHTML = `
    <span class="ai-bubble-avatar">🤖</span>
    <div class="ai-bubble-body">
      <div class="ai-dots">
        <span></span><span></span><span></span>
      </div>
    </div>`;
  aiThread.appendChild(wrap);
  requestAnimationFrame(() => {
    aiThread.scrollTo({ top: aiThread.scrollHeight, behavior: 'smooth' });
  });
  return wrap;
}

function removeTypingIndicator() {
  const el = document.getElementById('ai-typing-indicator');
  if (el) el.remove();
}

// ── Core GenAI fetch function ──────────────────────────────────────────────
async function askGenAI(userQuery) {
  if (!userQuery || !userQuery.trim()) return;

  lastUserQuery = userQuery;

  // 1. Show user bubble immediately
  renderAIMessage('user', userQuery);

  // 2. Show typing indicator & lock UI
  const typingEl = showTypingIndicator();
  setAIStatus('thinking');
  if (aiSendBtn)  aiSendBtn.disabled  = true;
  if (aiInput)    aiInput.disabled    = true;

  // 3. Build context-rich prompt
  const systemPrompt = buildSystemPrompt();

  // 4. Call Local Backend API
  const requestBody = {
    system_instruction: systemPrompt,
    query: userQuery
  };

  try {
    const response = await fetch(BACKEND_CHAT_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      const errMsg  = errJson?.error?.message || errJson?.message || `HTTP ${response.status}`;
      throw new Error(errMsg);
    }

    const data = await response.json();
    if (data.error) {
      removeTypingIndicator();
      renderAIMessage('bot', mdToHtml(`⚠️ ${data.error}`));
      setAIStatus('idle');
      return;
    }

    // Extract text from backend response
    const rawText = data.text;
    if (!rawText) throw new Error('Empty response from backend');

    // 5. Render the bot response
    removeTypingIndicator();
    renderAIMessage('bot', mdToHtml(rawText));
    setAIStatus('idle');

  } catch (err) {
    removeTypingIndicator();
    renderAIMessage(
      'bot',
      mdToHtml(`**Something went wrong.**\n\n${err.message}\n\nPlease check your API key and network connection, then try again.`),
      true
    );
    setAIStatus('error');
  } finally {
    // 6. Re-enable UI
    if (aiSendBtn)  aiSendBtn.disabled  = false;
    if (aiInput)    { aiInput.disabled = false; aiInput.focus(); }
  }
}

// ── Wire AI Chat UI ──────────────────────────────────────────────────
function initAIChat() {
  aiThread      = document.getElementById('ai-thread');
  aiInput       = document.getElementById('ai-query-input');
  aiSendBtn     = document.getElementById('ai-send-btn');
  aiStatusPill  = document.getElementById('ai-status-pill');
  aiStatusLabel = document.getElementById('ai-status-label');

  if (aiStatusPill) {
    aiStatusPill.addEventListener('click', () => {
      if (aiStatusPill.classList.contains('ai-status-error') && lastUserQuery) {
        // Optionally clear the error state and retry
        setAIStatus('idle');
        askGenAI(lastUserQuery);
      }
    });
  }

  const fabBtn    = document.getElementById('ai-fab');
  const chatCard  = document.getElementById('ai-chat-card');
  const chatClose = document.getElementById('ai-chat-close-btn');

  if (fabBtn && chatCard) {
    fabBtn.addEventListener('click', () => {
      chatCard.classList.add('open');
      fabBtn.classList.add('hidden');
      if (aiInput) aiInput.focus();
    });
  }

  if (chatClose && chatCard) {
    chatClose.addEventListener('click', () => {
      chatCard.classList.remove('open');
      if (fabBtn) fabBtn.classList.remove('hidden');
    });
  }

  if (!aiSendBtn || !aiInput) return;

  // Click → send
  aiSendBtn.addEventListener('click', handleAISend);

  // Enter key → send
  aiInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAISend();
    }
  });

  // Prevent empty sends while AI is working
  function handleAISend() {
    const q = aiInput.value.trim();
    if (!q || aiSendBtn.disabled) return;
    aiInput.value = '';
    askGenAI(q);
  }
}
