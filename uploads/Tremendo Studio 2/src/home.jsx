/* global React, Reveal, Asterisk, Star, Marquee */
const { useEffect, useRef, useState } = React;

// ──────────────────────────────────────────────────────────
// HOME: Hero + Marquee banner + Manifiesto + Portafolio
// ──────────────────────────────────────────────────────────

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = "assets/team-photo.png";
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <section className="hero">
      <div className="hero-photo-wrap">
        <img
          src="assets/team-photo.png"
          alt="Jos, Gabi y Dani — Tremendo Studio"
          className={"hero-photo " + (loaded ? "loaded" : "")} />
        
        <div className="hero-vignette" />
        <div className="hero-grain" />
      </div>

      {/* Corner meta */}
      <div className="hero-meta top-left">
        <span className="eyebrow">Est. 2024</span>
        <span className="dot-sep">·</span>
        <span className="eyebrow">GDL · MX</span>
      </div>
      <div className="hero-meta top-right">
        <span className="eyebrow">Vol. 01</span>
        <span className="dot-sep">·</span>
        <span className="eyebrow">Índice Tremendo</span>
      </div>

      {/* Floating stamp */}
      <div className="hero-stamp">
        <div className="stamp-ring">
          <svg viewBox="0 0 200 200" width="170" height="170">
            <defs>
              <path
                id="circle"
                d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              
            </defs>
            <text fill="currentColor" className="display" fontSize="17" letterSpacing="4">
              <textPath href="#circle">
                BRANDING · CONTENT · DIRECCIÓN DE ARTE · BRANDING · CONTENT ·
              </textPath>
            </text>
          </svg>
          <Asterisk size={30} className="asterisk" />
        </div>
      </div>

      {/* Headline */}
      <div className="hero-content">
        <h1 className="hero-h1 display">
          <span className="hero-h1-row">
            <span>MENOS</span>
            <span className="serif-ital hero-italic">ordinario,</span>
          </span>
          <span className="hero-h1-row">
            <span>MÁS</span>
            <span className="hero-orange">TREMENDO.</span>
          </span>
        </h1>
        <p className="hero-lede">
          Convertimos lo imposible en algo tremendo.<br />
          Branding y redes sociales con intención — para marcas que no se
          conforman con <em className="serif-ital">“lo de siempre”.</em>
        </p>

        <div className="hero-cta-row">
          <a href="#" className="btn" data-cursor="hola">
            Quiero algo Tremendo <Star size={12} />
          </a>
          <span className="hero-note">
            <Asterisk size={10} /> respuesta en &lt;48h
          </span>
        </div>
      </div>

      <div className="hero-scroll">
        <span>scroll</span>
        <span className="scroll-arrow">↓</span>
      </div>
    </section>);

}

function MarqueeBlock({ style }) {
  return (
    <div className="mq-block">
      <Marquee style={style} speed={50} />
    </div>);

}

function Manifiesto() {
  return (
    <section className="manifiesto">
      <div className="manifiesto-inner">
        <Reveal>
          <span className="eyebrow" style={{ color: "var(--orange)" }}>
            ✦ Manifiesto
          </span>
        </Reveal>
        <Reveal delay={120}>
          <p className="manifiesto-text display">
            Lo ordinario <em className="serif-ital">cansa</em>,
            <br />
            lo predecible se{" "}
            <span style={{ textDecoration: "line-through", opacity: 0.4 }}>
              olvida
            </span>
            .
          </p>
        </Reveal>
        <Reveal delay={260}>
          <p className="manifiesto-text-2 display">
            Pero lo <span style={{ color: "var(--orange)" }}>tremendo</span>
            <br />
            no queda atrás.
          </p>
        </Reveal>


      </div>
    </section>);

}

// Portfolio — image grid (placeholders editoriales hasta que el usuario suba reales)
const PORTFOLIO = [
{ id: "01", name: "Mentas Rituales", cat: "Branding", tag: "Wellness", size: "tall", bg: "var(--orange)", fg: "var(--cream)" },
{ id: "02", name: "Barra Nocturna", cat: "Content", tag: "F&B", size: "wide", bg: "var(--ink)", fg: "var(--orange)" },
{ id: "03", name: "Casa Lina", cat: "Branding + Content", tag: "Home", size: "square", bg: "var(--cream-deep)", fg: "var(--ink)" },
{ id: "04", name: "Taller Norte", cat: "Branding", tag: "Moda", size: "tall", bg: "var(--burnt)", fg: "var(--cream)" },
{ id: "05", name: "Forma Libre", cat: "Content", tag: "Yoga", size: "wide", bg: "var(--cream-soft)", fg: "var(--burnt)" },
{ id: "06", name: "Quiosco Solar", cat: "Branding", tag: "Heladería", size: "square", bg: "var(--ink)", fg: "var(--cream)" }];


function PortaCard({ p }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className={"porta-card hoverable porta-" + p.size}
      data-cursor="ver"
      style={{ background: p.bg, color: p.fg }}>
      
      <div className="porta-img">
        {/* Editorial placeholder — tipografía + asterisco hasta que suban imágenes reales */}
        <span className="display porta-img-name">{p.name}</span>
        <Asterisk size={28} className="asterisk slow" />
        <span className="porta-img-num display">{p.id}</span>
      </div>
      <div className="porta-card-meta">
        <span className="eyebrow">{p.cat}</span>
        <span className="porta-card-arrow">↗</span>
      </div>
    </a>);

}

function Portafolio() {
  return (
    <section className="porta">
      <div className="porta-head">
        <Reveal>
          <span className="eyebrow" style={{ color: "var(--burnt)" }}>
            ✦ Portafolio / 2024–2025
          </span>
          <h2 className="porta-h2 display">
            Lo que hemos vuelto{" "}
            <em className="serif-ital" style={{ color: "var(--orange)" }}>tremendo.</em>
          </h2>
          <p className="porta-lede">
            No creemos en fórmulas — creemos en experiencias visuales personalizadas.
          </p>
        </Reveal>
      </div>

      <Reveal className="porta-grid">
        {PORTFOLIO.map((p) => <PortaCard key={p.id} p={p} />)}
      </Reveal>

      <Reveal className="porta-foot">
        <p className="serif-ital">...y algunos proyectos todavía bajo NDA.</p>
      </Reveal>
    </section>);

}

function Home({ tweaks, go }) {
  return (
    <div className="page-home tab-enter">
      <Hero />
      <MarqueeBlock style={tweaks.bannerStyle} />
      <Manifiesto />
      <Portafolio />

      <section className="home-cta">
        <Reveal>
          <p className="eyebrow" style={{ color: "var(--orange)" }}>
            Siguiente paso
          </p>
          <h2 className="display home-cta-h">
            ¿Lista para algo{" "}
            <em className="serif-ital" style={{ color: "rgb(28, 28, 27)" }}>tremendo</em>?
          </h2>
          <div className="home-cta-row">
            <button className="btn" onClick={() => go("servicios")}>
              Ver servicios <Star size={12} />
            </button>
            <button className="btn ghost" onClick={() => go("hablemos")}>
              Hablemos →
            </button>
          </div>
        </Reveal>
      </section>
    </div>);

}

Object.assign(window, { Home });