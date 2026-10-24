import { useState, useEffect, useRef } from "react";

/* ---------------------------------------------------------
   ROOT — Portfolio
   Concept: a "character sheet" for a full-stack dev who is
   also a network/security specialist — two classes, one build.
   Projects become a quest log, skills become a stat block.
   --------------------------------------------------------- */

const TIERS = {
  legendaire: { label: "Légendaire", color: "#ffc857", glow: "rgba(255,200,87,0.35)" },
  epique: { label: "Épique", color: "#ff5da2", glow: "rgba(255,93,162,0.35)" },
  rare: { label: "Rare", color: "#5ee7ff", glow: "rgba(94,231,255,0.35)" },
};

const QUESTS = [
  {
    id: "vault",
    title: "Fortress Vault",
    subtitle: "Gestionnaire de mots de passe",
    tier: "legendaire",
    status: "done",
    summary:
      "Coffre-fort numérique en deux versions : une app Vue 3 avec génération, coffre et partage, et un backend ASP.NET Core dédié qui chiffre réellement chaque secret.",
    loadout: ["Vue 3", "Vite", "ASP.NET Core", "C#", "AES-256-GCM", "PBKDF2", "JWT"],
    detail:
      "Version front : trois vues (coffre, générateur, partage/export). Version backend cybersécurité : chiffrement AES-256-GCM, dérivation de clé PBKDF2, authentification JWT, interface React « Fortress Vault ».",
  },
  {
    id: "richvente",
    title: "RichVente",
    subtitle: "Marketplace malgache",
    tier: "epique",
    status: "progress",
    summary:
      "Place de marché avec commission de 10% sur les ventes, pensée pour le contexte local. Le temps réel arrive tout juste dans le donjon.",
    loadout: ["Nuxt 3", "Express", "Node.js", "PostgreSQL", "Socket.IO"],
    detail:
      "Authentification côté serveur (SSR) stabilisée, intégration en cours des fonctionnalités temps réel via Socket.IO, et travail actuel sur l'habillage visuel.",
  },
  {
    id: "transcoop",
    title: "TransCoop",
    subtitle: "Gestion de flotte — coopérative de transport",
    tier: "epique",
    status: "done",
    summary:
      "Application multi-rôles (admin, comptable, client, chauffeur) pour une coopérative de transport, avec pages de salaire chauffeur et authentification par session.",
    loadout: ["PHP", "Tailwind CSS", "MariaDB", "PostgreSQL"],
    detail:
      "Deux générations : une version PHP/Tailwind plus récente, et une version antérieure (IHM Transport) en PHP/PostgreSQL avec charte bleu profond, devise Ariary et migration bcrypt.",
  },
  {
    id: "pfsense",
    title: "Labo pfSense",
    subtitle: "Réseau double WAN",
    tier: "rare",
    status: "done",
    summary:
      "Laboratoire réseau monté de zéro dans VirtualBox : deux pfSense simulant deux FAI, répartition de charge et bascule automatique en cas de panne.",
    loadout: ["pfSense", "VirtualBox", "Double WAN", "Portail captif"],
    detail:
      "Bascule fonctionnelle obtenue avec un temps de latence sous 2 ms. Comprend aussi un travail de dépannage sur un portail captif dont la redirection avait cessé de fonctionner.",
  },
  {
    id: "docker",
    title: "Squelette Docker",
    subtitle: "Architecture multi-conteneurs",
    tier: "rare",
    status: "done",
    summary:
      "Projet pédagogique : une stack complète prête à l'emploi pour apprendre Docker par la pratique, 20 fichiers, cinq services orchestrés.",
    loadout: ["Docker", "React", "Node.js", "PostgreSQL", "Redis", "Nginx"],
    detail:
      "Pensé comme terrain d'entraînement personnel pour comprendre l'orchestration multi-conteneurs de bout en bout.",
  },
];

const STATS = [
  { label: "Frontend", tier: "Avancé", fill: 82, tags: ["Vue 3", "Nuxt 3", "React", "Tailwind"] },
  { label: "Backend", tier: "Avancé", fill: 80, tags: ["Node/Express", "ASP.NET Core", "PHP"] },
  { label: "Réseaux & Sécurité", tier: "Confirmé", fill: 68, tags: ["pfSense", "JWT", "AES-256"] },
  { label: "Bases de données", tier: "Confirmé", fill: 65, tags: ["PostgreSQL", "MariaDB"] },
  { label: "DevOps", tier: "Intermédiaire", fill: 52, tags: ["Docker", "Nginx", "Redis"] },
];

function useOnScreen(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function Emblem() {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" fill="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id="emblemGrad" x1="0" y1="0" x2="128" y2="128">
          <stop offset="0%" stopColor="#ff5da2" />
          <stop offset="100%" stopColor="#ffc857" />
        </linearGradient>
        <filter id="emblemGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <polygon
        points="64,6 118,34 118,94 64,122 10,94 10,34"
        stroke="url(#emblemGrad)"
        strokeWidth="3"
        fill="#221a33"
        filter="url(#emblemGlow)"
      />
      <polygon
        points="64,20 106,42 106,86 64,108 22,86 22,42"
        stroke="#3d3057"
        strokeWidth="1.5"
        fill="none"
      />
      <text
        x="64"
        y="76"
        textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="34"
        fontWeight="700"
        fill="url(#emblemGrad)"
      >
        {"</>"}
      </text>
      <circle cx="64" cy="20" r="3" fill="#5ee7ff" />
      <circle cx="22" cy="42" r="2.5" fill="#5ee7ff" />
      <circle cx="106" cy="86" r="2.5" fill="#5ee7ff" />
    </svg>
  );
}

function StatBar({ stat, index }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  return (
    <div ref={ref} className="statCard">
      <div className="statHead">
        <span className="statLabel">{stat.label}</span>
        <span className="statTier">{stat.tier}</span>
      </div>
      <div className="statBarTrack">
        <div
          className="statBarFill"
          style={{
            width: visible ? `${stat.fill}%` : "0%",
            transitionDelay: `${index * 90}ms`,
          }}
        />
      </div>
      <div className="statTags">
        {stat.tags.map((t) => (
          <span key={t} className="pill">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function QuestCard({ quest }) {
  const [open, setOpen] = useState(false);
  const tier = TIERS[quest.tier];
  return (
    <div
      className="quest"
      style={{ "--tier-color": tier.color, "--tier-glow": tier.glow }}
      onClick={() => setOpen((o) => !o)}
    >
      <div className="questTop">
        <span className="tierBadge">{tier.label}</span>
        <span className={`statusBadge ${quest.status}`}>
          {quest.status === "done" ? "Terminée" : "En cours"}
        </span>
      </div>
      <h3 className="questTitle">{quest.title}</h3>
      <p className="questSubtitle">{quest.subtitle}</p>
      <p className="questSummary">{quest.summary}</p>
      <div className="loadout">
        {quest.loadout.map((l) => (
          <span key={l} className="pill mono">
            {l}
          </span>
        ))}
      </div>
      <button className="expandBtn" onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}>
        {open ? "− Replier le journal" : "+ Ouvrir le journal de quête"}
      </button>
      <div className={`questDetail ${open ? "open" : ""}`}>
        <p>{quest.detail}</p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState("all");
  const filtered = QUESTS.filter((q) =>
    filter === "all" ? true : filter === "done" ? q.status === "done" : q.status === "progress"
  );

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

        :root {
          --bg: #171022;
          --bg-alt: #1d1530;
          --surface: #221a33;
          --surface-2: #2a2140;
          --border: #3d3057;
          --text: #f3eeff;
          --muted: #b8a9d9;
          --magenta: #ff5da2;
          --gold: #ffc857;
          --cyan: #5ee7ff;
        }

        * { box-sizing: border-box; }

        .page {
          background: radial-gradient(1200px 600px at 15% -10%, #2a1f42 0%, var(--bg) 55%), var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          min-height: 100%;
          padding: 0;
          line-height: 1.5;
        }

        .container {
          max-width: 980px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ---------- HERO ---------- */
        .hero {
          padding: 72px 0 56px;
          display: flex;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }
        .emblemWrap {
          animation: floatY 5s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .heroText { flex: 1; min-width: 260px; }
        .kicker {
          font-family: 'JetBrains Mono', monospace;
          color: var(--cyan);
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        h1.name {
          font-family: 'Sora', sans-serif;
          font-weight: 800;
          font-size: clamp(40px, 7vw, 64px);
          margin: 6px 0 4px;
          background: linear-gradient(90deg, #fff 0%, var(--gold) 120%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          letter-spacing: -0.01em;
        }
        .class {
          font-family: 'Sora', sans-serif;
          font-weight: 600;
          font-size: 19px;
          color: var(--text);
          margin: 0 0 14px;
        }
        .class span { color: var(--magenta); }
        .tagline {
          color: var(--muted);
          font-size: 16px;
          max-width: 480px;
          margin: 0 0 22px;
        }
        .heroBtns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 26px; }
        .btn {
          font-family: 'Sora', sans-serif;
          font-weight: 600;
          font-size: 14.5px;
          padding: 12px 22px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
        }
        .btn.primary {
          background: linear-gradient(90deg, var(--magenta), var(--gold));
          color: #171022;
        }
        .btn.ghost {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text);
        }
        .xpWrap {
          max-width: 420px;
        }
        .xpLabel {
          display: flex;
          justify-content: space-between;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--muted);
          margin-bottom: 6px;
        }
        .xpTrack {
          height: 8px;
          border-radius: 6px;
          background: var(--surface-2);
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .xpFill {
          height: 100%;
          width: 60%;
          background: linear-gradient(90deg, var(--cyan), var(--magenta));
          border-radius: 6px;
        }

        /* ---------- SECTIONS ---------- */
        section { padding: 50px 0; }
        .sectionHead { margin-bottom: 28px; }
        .eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--cyan);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        h2.sectionTitle {
          font-family: 'Sora', sans-serif;
          font-size: 30px;
          font-weight: 700;
          margin: 6px 0 8px;
        }
        .sectionDesc { color: var(--muted); font-size: 15px; max-width: 560px; }

        /* ---------- STATS ---------- */
        .statsGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }
        .statCard {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px 18px 16px;
        }
        .statHead { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
        .statLabel { font-family: 'Sora', sans-serif; font-weight: 600; font-size: 15px; }
        .statTier { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--gold); }
        .statBarTrack {
          height: 8px;
          background: var(--surface-2);
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 12px;
        }
        .statBarFill {
          height: 100%;
          background: linear-gradient(90deg, var(--cyan), var(--magenta));
          border-radius: 6px;
          width: 0%;
          transition: width 1s cubic-bezier(.16,1,.3,1);
        }
        .statTags { display: flex; flex-wrap: wrap; gap: 6px; }

        .pill {
          font-family: 'Inter', sans-serif;
          font-size: 11.5px;
          padding: 4px 10px;
          border-radius: 999px;
          background: var(--surface-2);
          border: 1px solid var(--border);
          color: var(--muted);
        }
        .pill.mono { font-family: 'JetBrains Mono', monospace; }

        /* ---------- QUESTS ---------- */
        .filters { display: flex; gap: 8px; margin-bottom: 22px; }
        .filterBtn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12.5px;
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--muted);
          cursor: pointer;
        }
        .filterBtn.active {
          background: var(--surface-2);
          color: var(--text);
          border-color: var(--magenta);
        }
        .questGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 18px;
        }
        .quest {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .quest:hover {
          transform: translateY(-4px);
          border-color: var(--tier-color);
          box-shadow: 0 12px 30px -10px var(--tier-glow);
        }
        .questTop { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .tierBadge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          color: var(--tier-color);
          border: 1px solid var(--tier-color);
          padding: 3px 9px;
          border-radius: 999px;
        }
        .statusBadge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          padding: 3px 9px;
          border-radius: 999px;
          color: var(--muted);
        }
        .statusBadge.done { color: #7ee787; }
        .statusBadge.progress { color: var(--gold); }
        .questTitle { font-family: 'Sora', sans-serif; font-size: 19px; margin: 0 0 2px; }
        .questSubtitle { color: var(--muted); font-size: 13px; margin: 0 0 10px; }
        .questSummary { font-size: 14px; color: var(--text); opacity: 0.9; margin: 0 0 14px; }
        .loadout { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .expandBtn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          background: none;
          border: none;
          color: var(--cyan);
          cursor: pointer;
          padding: 0;
        }
        .questDetail {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease;
          font-size: 13.5px;
          color: var(--muted);
        }
        .questDetail.open { max-height: 200px; margin-top: 12px; }

        /* ---------- ABOUT / GUILD ---------- */
        .aboutGrid { display: flex; gap: 24px; flex-wrap: wrap; }
        .aboutText { flex: 2; min-width: 260px; color: var(--muted); font-size: 15px; }
        .aboutText strong { color: var(--text); }
        .aboutCard {
          flex: 1;
          min-width: 220px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 20px;
        }
        .aboutCard h4 { font-family: 'Sora', sans-serif; margin: 0 0 10px; font-size: 14px; color: var(--gold); }
        .aboutCard ul { margin: 0; padding-left: 18px; font-size: 13.5px; color: var(--muted); }
        .aboutCard li { margin-bottom: 6px; }

        /* ---------- CONTACT ---------- */
        .contact {
          background: linear-gradient(135deg, var(--surface), var(--bg-alt));
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 44px 32px;
          text-align: center;
        }
        .contact h2 { font-family: 'Sora', sans-serif; font-size: 26px; margin: 8px 0 10px; }
        .contact p { color: var(--muted); margin: 0 0 22px; }
        .contactLinks { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }
        .contactLinks a { color: var(--text); text-decoration: none; }

        footer {
          text-align: center;
          padding: 28px 0 40px;
          color: var(--muted);
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
        }

        @media (prefers-reduced-motion: reduce) {
          .emblemWrap { animation: none; }
          .statBarFill, .quest { transition: none; }
        }

        a:focus-visible, button:focus-visible {
          outline: 2px solid var(--cyan);
          outline-offset: 2px;
        }

        @media (max-width: 640px) {
          .hero { padding-top: 48px; text-align: left; }
        }
      `}</style>

      <div className="container">
        {/* HERO */}
        <div className="hero">
          <div className="emblemWrap">
            <Emblem />
          </div>
          <div className="heroText">
            <div className="kicker">Fiche de personnage</div>
            <h1 className="name">Root</h1>
            <p className="class">
              Développeur Full-Stack <span>×</span> Réseaux &amp; Cybersécurité
            </p>
            <p className="tagline">
              Je construis des applications de bout en bout — du câble réseau
              jusqu'à l'interface — et je m'entraîne à les défendre. Étudiant
              en Systèmes, Développement et Informatique à l'ENI, Université
              de Fianarantsoa.
            </p>
            <div className="heroBtns">
              <a className="btn primary" href="#quests">Voir les quêtes</a>
              <a className="btn ghost" href="#contact">Rejoindre la guilde</a>
            </div>
            <div className="xpWrap">
              <div className="xpLabel">
                <span>NIVEAU 3 — PARCOURS SDI</span>
                <span>L3</span>
              </div>
              <div className="xpTrack">
                <div className="xpFill" />
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <section id="stats">
          <div className="sectionHead">
            <div className="eyebrow">Arbre de compétences</div>
            <h2 className="sectionTitle">Statistiques du personnage</h2>
            <p className="sectionDesc">
              Cinq disciplines entraînées en parallèle — le front, le back, le
              réseau et la sécurité avancent ensemble plutôt qu'en silo.
            </p>
          </div>
          <div className="statsGrid">
            {STATS.map((s, i) => (
              <StatBar stat={s} index={i} key={s.label} />
            ))}
          </div>
        </section>

        {/* QUESTS */}
        <section id="quests">
          <div className="sectionHead">
            <div className="eyebrow">Journal de quêtes</div>
            <h2 className="sectionTitle">Projets</h2>
            <p className="sectionDesc">
              Chaque quête a été résolue avec une pile technique différente —
              cliquez une carte pour ouvrir le journal complet.
            </p>
          </div>
          <div className="filters">
            <button
              className={`filterBtn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              Toutes
            </button>
            <button
              className={`filterBtn ${filter === "done" ? "active" : ""}`}
              onClick={() => setFilter("done")}
            >
              Terminées
            </button>
            <button
              className={`filterBtn ${filter === "progress" ? "active" : ""}`}
              onClick={() => setFilter("progress")}
            >
              En cours
            </button>
          </div>
          <div className="questGrid">
            {filtered.map((q) => (
              <QuestCard quest={q} key={q.id} />
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="sectionHead">
            <div className="eyebrow">Bio du personnage</div>
            <h2 className="sectionTitle">Deux classes, un seul build</h2>
          </div>
          <div className="aboutGrid">
            <p className="aboutText">
              <strong>Root</strong> avance en double cursus : le développement
              full-stack au quotidien, et l'administration réseau &amp; la
              cybersécurité comme spécialité parallèle. Cette double approche
              se retrouve dans les projets — un gestionnaire de mots de passe
              pensé autant côté chiffrement que côté interface, une
              marketplace pensée pour tenir en production, des laboratoires
              réseau montés et dépannés à la main.
            </p>
            <div className="aboutCard">
              <h4>Terrain d'entraînement</h4>
              <ul>
                <li>Linux (Ubuntu) comme environnement principal</li>
                <li>Labos pfSense en environnements virtualisés</li>
                <li>Conteneurisation avec Docker</li>
                <li>Écosystème JS/TS, PHP et C#/.NET</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="contact">
            <div className="eyebrow">Guilde ouverte</div>
            <h2>Envie de faire équipe ?</h2>
            <p>Stage, projet collaboratif, ou simple échange technique — n'hésitez pas.</p>
            <div className="contactLinks">
              <a className="btn primary" href="mailto:ton.email@example.com">✉ Email</a>
              <a className="btn ghost" href="https://github.com/ton-pseudo" target="_blank" rel="noreferrer">GitHub</a>
              <a className="btn ghost" href="https://linkedin.com/in/ton-profil" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </section>

        <footer>ROOT · FIANARANTSOA, MADAGASCAR · {new Date().getFullYear()}</footer>
      </div>
    </div>
  );
}
