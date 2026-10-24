import { useState, useEffect, useRef } from "react";

/* ---------------------------------------------------------
   ICÔNES SVG (Inline)
   --------------------------------------------------------- */
const Icons = {
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  Phone: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Github: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
      <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  ),
  Linkedin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  X: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Whatsapp: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Reddit: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M17 12a2 2 0 1 0-4 0 2 2 0 0 0 4 0zm-10 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0zm10 4c-1.5 1-3.5 1-5 0s-3.5-1-5 0"/>
      <circle cx="12" cy="7" r="1"/>
    </svg>
  ),
  Threads: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm2 13.5a4 4 0 1 1 0-7 4 4 0 0 1 0 7z"/>
    </svg>
  ),
  Download: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" x2="12" y1="15" y2="3"/>
    </svg>
  ),
  Shield: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffc857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    </svg>
  ),
  Layers: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff5da2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  Network: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5ee7ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="16" y="16" width="6" height="6" rx="1"/>
      <rect x="2" y="16" width="6" height="6" rx="1"/>
      <rect x="9" y="2" width="6" height="6" rx="1"/>
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/>
      <path d="M12 12V8"/>
    </svg>
  ),
  Graduation: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5ee7ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  )
};

const CATEGORIES = {
  securite: { label: "Sécurité & Crypto", color: "#ffc857", glow: "rgba(255,200,87,0.35)", icon: Icons.Shield },
  fullstack: { label: "Full-Stack", color: "#ff5da2", glow: "rgba(255,93,162,0.35)", icon: Icons.Layers },
  systemes: { label: "Réseaux & DevOps", color: "#5ee7ff", glow: "rgba(94,231,255,0.35)", icon: Icons.Network },
};

const PROJECTS = [
  {
    id: "web-security-mail",
    title: "Web Security Mail",
    subtitle: "Messagerie sécurisée & Intégrité des données",
    category: "securite",
    status: "done",
    summary: "Création d'une application web de messagerie sécurisée intégrant un algorithme de vérification d'intégrité via hachage SHA-256.",
    stack: ["Node.js", "SHA-256", "Express", "Security"],
    detail: "Implémentation complète d'algorithmes de hachage SHA-256 pour assurer la non-altération des e-mails en transit."
  },
  {
    id: "coop-transport",
    title: "Gestion Coopérative de Transport",
    subtitle: "Plateforme Web Multi-rôles",
    category: "fullstack",
    status: "done",
    summary: "Plateforme multi-rôles pour la gestion des recettes et des trajets avec tableaux de bord interactifs.",
    stack: ["PostgreSQL", "JavaScript", "Express", "Node.js"],
    detail: "Modélisation complète sous PostgreSQL et mise en place d'une architecture multi-utilisateurs sécurisée."
  },
  {
    id: "gestion-vin",
    title: "Gestion de Stock de Vin",
    subtitle: "Projet de stage - LAZAN'I BETSILEO",
    category: "fullstack",
    status: "done",
    summary: "Conception et développement complet d'une application de gestion de stock de vin.",
    stack: ["PHP", "JavaScript", "SQL", "HTML/CSS"],
    detail: "Automatisation du suivi des entrées/sorties et optimisation de la gestion de la réserve pour LAZAN'I BETSILEO."
  },
  {
    id: "location-vehicules",
    title: "Gestion de Location de Véhicules",
    subtitle: "Projet de Fin d'Année - ENI",
    category: "fullstack",
    status: "done",
    summary: "Développement d'une solution informatique pour le suivi des réservations, de la flotte et des clients.",
    stack: ["Java", "SQL", "Swing/JavaFX"],
    detail: "Implémentation de la logique métier complexe et automatisation des calculs de tarification selon la catégorie."
  }
];

const SKILLS = [
  { label: "Frontend", tier: "Avancé", fill: 85, tags: ["Vue.js", "React.js", "Next.js", "HTML/CSS", "JavaScript"] },
  { label: "Backend", tier: "Avancé", fill: 82, tags: ["Node.js", "PHP", "C# / .NET", "Java", "JSP", "Python"] },
  { label: "Bases de données", tier: "Confirmé", fill: 78, tags: ["PostgreSQL", "SQL", "SQLite"] },
  { label: "SysAdmin & OS", tier: "Confirmé", fill: 75, tags: ["Windows", "Ubuntu", "Debian", "IDE (VSCode, Rider, IntelliJ)"] },
];

const EXPERIENCES = [
  {
    period: "Mai / Juin 2026",
    role: "Développeur Full-Stack — Projet Coopérative",
    company: "École Nationale d'Informatique (ENI)",
    description: "Conception d'une plateforme multi-rôles pour la gestion des recettes et trajets avec base de données PostgreSQL."
  },
  {
    period: "Mai 2026",
    role: "Développeur Sécurité — Web Security Mail",
    company: "École Nationale d'Informatique (ENI)",
    description: "Développement d'une messagerie sécurisée intégrant la vérification d'intégrité par hachage SHA-256."
  },
  {
    period: "Septembre 2024 – Novembre 2024",
    role: "Stagiaire en Gestion de Projets & Développement Web",
    company: "LAZAN'I BETSILEO - Fianarantsoa",
    description: "Création d'une application web de gestion de stock et support opérationnel entre les services et la production."
  },
  {
    period: "2024",
    role: "Développeur Logiciel — Projet de fin d'année",
    company: "École Nationale d'Informatique (ENI)",
    description: "Développement d'une solution pour le suivi des réservations, de la flotte et des clients."
  }
];

const FORMATIONS = [
  {
    title: "Licence en Informatique (L3)",
    institution: "École Nationale d'Informatique (ENI) - Fianarantsoa",
    period: "2024 à aujourd'hui"
  },
  {
    title: "Baccalauréat",
    institution: "SE.VI.RA - Antsohihy",
    period: "2022 - 2023"
  }
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

function SkillBar({ stat, index }) {
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

function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);
  const category = CATEGORIES[project.category];
  const CategoryIcon = category.icon;

  return (
    <div
      className="quest"
      style={{ "--tier-color": category.color, "--tier-glow": category.glow }}
    >
      <div className="questTop">
        <span className="tierBadge">
          <CategoryIcon /> {category.label}
        </span>
        <span className="statusBadge done">Livré</span>
      </div>
      <h3 className="questTitle">{project.title}</h3>
      <p className="questSubtitle">{project.subtitle}</p>
      <p className="questSummary">{project.summary}</p>
      <div className="techLabel">Stack Technique</div>
      <div className="loadout">
        {project.stack.map((l) => (
          <span key={l} className="pill mono">
            {l}
          </span>
        ))}
      </div>
      <button 
        className="expandBtn" 
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? "− Masquer le détail" : "+ En savoir plus"}
      </button>
      <div className={`questDetail ${open ? "open" : ""}`}>
        <p>{project.detail}</p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState("all");

  const filtered = PROJECTS.filter((q) =>
    filter === "all" ? true : q.category === filter
  );

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

        :root {
          --bg: #0f0a1c;
          --surface: #19122c;
          --surface-card: #1f1738;
          --border: #332752;
          --text: #f3eeff;
          --muted: #a395c4;
          --magenta: #ff5da2;
          --purple-pill: #7c3aed;
          --cyan: #5ee7ff;
          --gold: #ffc857;
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        .page {
          background: radial-gradient(1200px 600px at 15% -10%, #20133b 0%, var(--bg) 65%), var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          padding-top: clamp(70px, 10vw, 85px); /* Espace pour la navbar fixe */
          line-height: 1.5;
          overflow-x: hidden;
        }

        .container {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 clamp(12px, 4vw, 24px);
        }

        /* NAVBAR PERMANENTE / FIXE POUR TOUTES LES TAILLES D'ÉCRAN */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 1000;
          background: rgba(15, 10, 28, 0.92);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border);
          padding: clamp(10px, 2vw, 16px) 0;
        }
        .navContent {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .navLogo {
          font-family: 'Sora', sans-serif;
          font-weight: 800;
          font-size: clamp(15px, 3.5vw, 19px);
          color: var(--text);
          text-decoration: none;
          transition: transform 0.2s ease, text-shadow 0.2s ease;
        }
        .navLogo:hover {
          transform: scale(1.03);
          text-shadow: 0 0 12px rgba(255, 93, 162, 0.4);
        }
        .navLogo span { color: var(--magenta); }
        .navLinks {
          display: flex;
          gap: clamp(10px, 2.5vw, 24px);
          align-items: center;
          flex-wrap: wrap;
        }
        .navLink {
          color: var(--muted);
          text-decoration: none;
          font-size: clamp(11px, 2.5vw, 14px);
          font-family: 'JetBrains Mono', monospace;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }
        .navLink:hover {
          color: var(--cyan);
          transform: translateY(-2px);
        }

        /* HERO & PROFIL PHOTO AGRANDIE */
        .hero {
          padding: clamp(24px, 6vw, 56px) 0 clamp(20px, 4vw, 48px);
          display: flex;
          align-items: center;
          gap: clamp(20px, 5vw, 40px);
          flex-wrap: wrap;
        }

        .profileWrap {
          position: relative;
          width: clamp(170px, 28vw, 230px);
          height: clamp(170px, 28vw, 230px);
          border-radius: 50%;
          padding: 6px;
          background: linear-gradient(135deg, var(--magenta), var(--cyan));
          box-shadow: 0 0 32px rgba(255, 93, 162, 0.4);
          flex-shrink: 0;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .profileWrap:hover {
          transform: scale(1.05) rotate(2deg);
          box-shadow: 0 0 45px rgba(94, 231, 255, 0.55);
        }
        .profileImg {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          background: var(--surface);
          display: block;
        }
        .heroText { 
          flex: 1; 
          min-width: min(100%, 260px); 
        }
        .kicker {
          font-family: 'JetBrains Mono', monospace;
          color: var(--cyan);
          font-size: clamp(11px, 2.5vw, 13px);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        h1.name {
          font-family: 'Sora', sans-serif;
          font-weight: 800;
          font-size: clamp(20px, 5.5vw, 44px);
          margin: 6px 0 4px;
          background: linear-gradient(90deg, #fff 0%, var(--gold) 120%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          word-break: break-word;
        }
        .class {
          font-family: 'Sora', sans-serif;
          font-weight: 600;
          font-size: clamp(14px, 3.5vw, 18px);
          color: var(--text);
          margin: 0 0 14px;
        }
        .class span { color: var(--magenta); }
        .tagline { color: var(--muted); font-size: clamp(13px, 2.8vw, 15px); max-width: 560px; margin: 0 0 22px; }
        .heroBtns { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn {
          font-family: 'Sora', sans-serif;
          font-weight: 600;
          font-size: clamp(12px, 2.5vw, 14px);
          padding: 10px 18px;
          border-radius: 10px;
          border: 1px solid var(--border);
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--surface);
          color: var(--text);
          transition: all 0.25s ease;
        }
        .btn:hover {
          border-color: var(--cyan);
          background: #23193e;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px -6px rgba(94, 231, 255, 0.3);
        }

        /* SECTIONS */
        section { padding: clamp(30px, 6vw, 52px) 0; }
        .sectionHead { text-align: center; margin-bottom: clamp(24px, 5vw, 40px); }
        h2.sectionTitle {
          font-family: 'Sora', sans-serif;
          font-size: clamp(20px, 5vw, 32px);
          font-weight: 800;
          margin: 0;
          position: relative;
          display: inline-block;
          transition: transform 0.3s ease;
        }
        h2.sectionTitle:hover {
          transform: scale(1.02);
        }
        h2.sectionTitle::after {
          content: '';
          display: block;
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, var(--magenta), var(--cyan));
          margin: 8px auto 0;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        h2.sectionTitle:hover::after {
          width: 90px;
        }

        /* TIMELINE EXPÉRIENCE CHRONOLOGIQUE */
        .timelineContainer {
          position: relative;
          padding-left: clamp(24px, 5vw, 36px);
          max-width: 760px;
          margin: 0 auto;
        }
        .timelineLine {
          position: absolute;
          left: clamp(7px, 2vw, 11px);
          top: 12px;
          bottom: 12px;
          width: 2px;
          background: linear-gradient(180deg, var(--purple-pill), var(--cyan));
        }
        .timelineItem {
          position: relative;
          margin-bottom: clamp(20px, 4vw, 28px);
        }
        .timelineItem:last-child { margin-bottom: 0; }
        .timelineDot {
          position: absolute;
          left: clamp(-24px, -5vw, -36px);
          top: 16px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--bg);
          border: 3px solid var(--cyan);
          box-shadow: 0 0 10px var(--cyan);
          transform: translateX(-3px);
          transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
        }
        .timelineItem:hover .timelineDot {
          transform: translateX(-3px) scale(1.3);
          background: var(--cyan);
          box-shadow: 0 0 18px var(--cyan);
        }
        .timelineCard {
          background: var(--surface-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: clamp(14px, 3.5vw, 26px);
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .timelineCard:hover {
          border-color: var(--cyan);
          transform: translateY(-4px) translateX(4px);
          box-shadow: 0 12px 28px -10px rgba(94, 231, 255, 0.25);
        }
        .datePill {
          display: inline-block;
          font-family: 'Sora', sans-serif;
          font-size: clamp(10px, 2.2vw, 12px);
          font-weight: 700;
          background: linear-gradient(90deg, #6366f1, #3b82f6);
          color: #fff;
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 10px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .timelineCard:hover .datePill {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        }
        .roleTitle {
          font-family: 'Sora', sans-serif;
          font-size: clamp(16px, 3.5vw, 20px);
          font-weight: 700;
          margin: 0 0 4px;
        }
        .companyName {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(12px, 2.5vw, 13.5px);
          color: var(--cyan);
          margin-bottom: 10px;
        }
        .roleDesc {
          color: var(--muted);
          font-size: clamp(12.5px, 2.5vw, 14px);
          margin: 0;
          line-height: 1.6;
        }

        /* FORMATIONS & CENTRES D'INTÉRÊT */
        .dualGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: 20px;
        }
        .formCard {
          background: var(--surface-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: clamp(16px, 4vw, 24px);
          transition: all 0.3s ease;
        }
        .formCard:hover {
          border-color: var(--magenta);
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -8px rgba(255, 93, 162, 0.25);
        }
        .formCardTitle {
          font-family: 'Sora', sans-serif;
          font-size: clamp(15px, 3.2vw, 18px);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text);
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
        }
        .formList { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px; }
        .formItem { font-size: clamp(12.5px, 2.5vw, 14px); color: var(--muted); }
        .formItem strong { color: var(--text); font-weight: 600; display: block; }
        .formPeriod { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--gold); }

        /* SKILLS */
        .statsGrid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); 
          gap: 16px; 
        }
        .statCard {
          background: var(--surface-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px;
          transition: all 0.3s ease;
        }
        .statCard:hover {
          border-color: var(--gold);
          transform: translateY(-3px);
          box-shadow: 0 8px 22px -8px rgba(255, 200, 87, 0.2);
        }
        .statHead { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
        .statLabel { font-family: 'Sora', sans-serif; font-weight: 600; font-size: 15px; }
        .statTier { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--gold); }
        .statBarTrack { height: 8px; background: var(--surface); border-radius: 6px; overflow: hidden; margin-bottom: 12px; }
        .statBarFill { height: 100%; background: linear-gradient(90deg, var(--cyan), var(--magenta)); border-radius: 6px; width: 0%; transition: width 1s ease; }
        .statTags { display: flex; flex-wrap: wrap; gap: 6px; }

        .pill {
          font-size: clamp(10px, 2.2vw, 11.5px);
          padding: 4px 10px;
          border-radius: 999px;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--muted);
          transition: all 0.2s ease;
        }
        .pill:hover {
          border-color: var(--cyan);
          color: var(--text);
          transform: scale(1.05);
        }
        .pill.mono { font-family: 'JetBrains Mono', monospace; }

        /* PROJETS */
        .filters { display: flex; gap: 8px; justify-content: center; margin-bottom: 26px; flex-wrap: wrap; }
        .filterBtn {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(11px, 2.5vw, 12.5px);
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--muted);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .filterBtn:hover { border-color: var(--magenta); color: var(--text); }
        .filterBtn.active { background: var(--surface-card); color: var(--text); border-color: var(--magenta); box-shadow: 0 0 12px rgba(255, 93, 162, 0.3); }
        
        .questGrid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 270px), 1fr)); 
          gap: 18px; 
        }
        .quest {
          background: var(--surface-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: clamp(16px, 3.5vw, 20px);
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .quest:hover {
          transform: translateY(-6px);
          border-color: var(--tier-color);
          box-shadow: 0 14px 32px -10px var(--tier-glow);
        }
        .questTop { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 6px; }
        .tierBadge { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; color: var(--tier-color); border: 1px solid var(--tier-color); padding: 4px 10px; border-radius: 999px; display: inline-flex; align-items: center; gap: 6px; }
        .statusBadge { font-family: 'JetBrains Mono', monospace; font-size: 11px; padding: 3px 9px; border-radius: 999px; }
        .statusBadge.done { color: #7ee787; background: rgba(126,231,135,0.08); border: 1px solid rgba(126,231,135,0.2); }
        .questTitle { font-family: 'Sora', sans-serif; font-size: clamp(16px, 3.5vw, 18px); margin: 0 0 2px; }
        .questSubtitle { color: var(--muted); font-size: 13px; margin: 0 0 10px; }
        .questSummary { font-size: 13.5px; color: var(--text); opacity: 0.9; margin: 0 0 14px; }
        .techLabel { font-family: 'JetBrains Mono', monospace; font-size: 10.5px; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
        .loadout { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .expandBtn { font-family: 'JetBrains Mono', monospace; font-size: 12px; background: none; border: none; color: var(--cyan); cursor: pointer; padding: 0; transition: color 0.2s; }
        .expandBtn:hover { color: var(--magenta); text-decoration: underline; }
        .questDetail { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; font-size: 13.5px; color: var(--muted); }
        .questDetail.open { max-height: 200px; margin-top: 12px; }

        /* FOOTER */
        footer {
          padding: clamp(24px, 5vw, 48px) 0 32px;
          border-top: 1px solid var(--border);
          text-align: center;
          margin-top: 40px;
        }
        .footerSocials {
          display: flex;
          justify-content: center;
          gap: clamp(8px, 2vw, 12px);
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .socialIconBtn {
          width: clamp(38px, 8vw, 44px);
          height: clamp(38px, 8vw, 44px);
          border-radius: 50%;
          background: #1c1533;
          border: 1px solid var(--border);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .socialIconBtn:hover {
          background: var(--purple-pill);
          border-color: var(--cyan);
          color: #fff;
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 8px 20px rgba(124, 58, 237, 0.5);
        }
        .footerName {
          font-family: 'Sora', sans-serif;
          font-size: 15px;
          color: var(--muted);
          margin-bottom: 6px;
        }
        .footerSub {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(11px, 2.5vw, 13px);
          color: var(--muted);
          margin-bottom: 16px;
        }
        .footerPhones {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(11px, 2.5vw, 12.5px);
          color: var(--cyan);
          display: flex;
          justify-content: center;
          gap: 18px;
          flex-wrap: wrap;
        }
        .footerPhones span {
          transition: transform 0.2s ease, color 0.2s ease;
          cursor: pointer;
        }
        .footerPhones span:hover {
          color: var(--gold);
          transform: scale(1.05);
        }

        /* MEDIA QUERIES */
        @media (max-width: 600px) {
          .statsGrid,
          .questGrid,
          .dualGrid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .hero {
            flex-direction: column;
            text-align: center;
          }

          .heroText {
            min-width: 100%;
          }

          .heroBtns {
            justify-content: center;
          }

          .navContent {
            justify-content: center;
          }

          .navLinks {
            justify-content: center;
            width: 100%;
          }

          .profileWrap {
            width: 180px;
            height: 180px;
            margin: 0 auto;
          }

          h1.name {
            font-size: clamp(18px, 7vw, 30px);
          }
        }

        @media (max-width: 320px) {
          .navLinks {
            gap: 8px;
          }
          .timelineContainer { 
            padding-left: 20px; 
          }
          .timelineDot { 
            left: -20px; 
            width: 10px; 
            height: 10px; 
          }
          .socialIconBtn {
            width: 34px;
            height: 34px;
          }
        }
      `}</style>

      {/* NAVIGATION : LIENS CORRESPONDANT EXACTEMENT À L'ORDRE DES SECTIONS */}
      <nav className="navbar">
        <div className="container navContent">
          <a href="#" className="navLogo">RAKOTOARISOA<span>.ulrich</span></a>
          <div className="navLinks">
            <a href="#skills" className="navLink">Compétences</a>
            <a href="#projects" className="navLink">Projets</a>
            <a href="#experience" className="navLink">Expérience</a>
            <a href="#formations" className="navLink">Formations</a>
          </div>
        </div>
      </nav>

      <div className="container">
        {/* HERO */}
        <div className="hero">
          <div className="profileWrap">
            <img 
              src="/ulrich_photo.png" 
              alt="Ulrich Alexandroh" 
              className="profileImg"
            />
          </div>
          <div className="heroText">
            <div className="kicker">Portfolio</div>
            <h1 className="name">RAKOTOARISOA Valimbavaka Alexandroh Ulrich</h1>
            <p className="class">
              Développeur Full-Stack <span>×</span> Réseaux &amp; Systèmes
            </p>
            <p className="tagline">
              Étudiant en 3ème année à l'ENI Fianarantsoa. Rigoureux et motivé, spécialisé en développement web full-stack et gestion de bases de données.
            </p>
            <div className="heroBtns">
              <a className="btn" href="https://github.com/Ulrich506" target="_blank" rel="noreferrer">
                <Icons.Github /> GitHub
              </a>
              <a className="btn" href="/ulrich_cv.pdf" download="ulrich_cv.pdf">
                <Icons.Download /> Télécharger CV
              </a>
            </div>
          </div>
        </div>

        {/* 1. COMPÉTENCES */}
        <section id="skills">
          <div className="sectionHead">
            <h2 className="sectionTitle">Compétences Techniques</h2>
          </div>
          <div className="statsGrid">
            {SKILLS.map((s, i) => (
              <SkillBar stat={s} index={i} key={s.label} />
            ))}
          </div>
        </section>

        {/* 2. PROJETS */}
        <section id="projects">
          <div className="sectionHead">
            <h2 className="sectionTitle">Projets Réalisés</h2>
          </div>
          <div className="filters">
            <button className={`filterBtn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>Tous</button>
            <button className={`filterBtn ${filter === "fullstack" ? "active" : ""}`} onClick={() => setFilter("fullstack")}>Full-Stack</button>
            <button className={`filterBtn ${filter === "securite" ? "active" : ""}`} onClick={() => setFilter("securite")}>Sécurité</button>
          </div>
          <div className="questGrid">
            {filtered.map((q) => (
              <ProjectCard project={q} key={q.id} />
            ))}
          </div>
        </section>

        {/* 3. EXPÉRIENCE */}
        <section id="experience">
          <div className="sectionHead">
            <h2 className="sectionTitle">Mon Expérience</h2>
          </div>
          <div className="timelineContainer">
            <div className="timelineLine" />
            {EXPERIENCES.map((exp, idx) => (
              <div className="timelineItem" key={idx}>
                <div className="timelineDot" />
                <div className="timelineCard">
                  <span className="datePill">{exp.period}</span>
                  <h3 className="roleTitle">{exp.role}</h3>
                  <div className="companyName">{exp.company}</div>
                  <p className="roleDesc">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. FORMATIONS */}
        <section id="formations">
          <div className="sectionHead">
            <h2 className="sectionTitle">Formations</h2>
          </div>
          <div className="dualGrid">
            <div className="formCard">
              <div className="formCardTitle">
                <Icons.Graduation /> Parcours Académique
              </div>
              <ul className="formList">
                {FORMATIONS.map((f, idx) => (
                  <li key={idx} className="formItem">
                    <strong>{f.title}</strong>
                    <div>{f.institution}</div>
                    <span className="formPeriod">{f.period}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="formCard">
              <div className="formCardTitle">
                <Icons.Shield /> Centres d'intérêt &amp; Langues
              </div>
              <ul className="formList">
                <li className="formItem">
                  <strong>Langues pratiquées</strong>
                  <div>Français • Anglais</div>
                </li>
                <li className="formItem">
                  <strong>Passions</strong>
                  <div>Lecture • Basket-ball • Anime</div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="footerSocials">
            <a href="https://github.com/Ulrich506" target="_blank" rel="noreferrer" className="socialIconBtn" title="GitHub">
              <Icons.Github />
            </a>
            <a href="https://x.com/Ulrich_alexandroh" target="_blank" rel="noreferrer" className="socialIconBtn" title="X (Ulrich_alexandroh)">
              <Icons.X />
            </a>
            <a href="https://wa.me/261345372250" target="_blank" rel="noreferrer" className="socialIconBtn" title="WhatsApp (034 53 722 50)">
              <Icons.Whatsapp />
            </a>
            <a href="https://instagram.com/ulrichalexandroh" target="_blank" rel="noreferrer" className="socialIconBtn" title="Instagram (ulrichalexandroh)">
              <Icons.Instagram />
            </a>
            <a href="https://facebook.com/Ulrich.alexandroh" target="_blank" rel="noreferrer" className="socialIconBtn" title="Facebook (Ulrich alexandroh)">
              <Icons.Facebook />
            </a>
            <a href="mailto:ulrichalexandroh@gmail.com" className="socialIconBtn" title="Email (ulrichalexandroh@gmail.com)">
              <Icons.Mail />
            </a>
            <a href="https://reddit.com/user/Old_Peanut9682" target="_blank" rel="noreferrer" className="socialIconBtn" title="Reddit (Old_Peanut9682)">
              <Icons.Reddit />
            </a>
            <a href="https://threads.net/@ulrichalexandroh" target="_blank" rel="noreferrer" className="socialIconBtn" title="Threads (ulrichalexandroh)">
              <Icons.Threads />
            </a>
          </div>

          <div className="footerName">
            © 2026 Portfolio
          </div>
          <div className="footerSub">
            Développeur Full Stack | Web • Systèmes • Réseaux
          </div>
          <div className="footerPhones">
            <span>📞 034 53 722 50</span>
            <span>📱 032 51 454 16</span>
          </div>
        </footer>
      </div>
    </div>
  );
}