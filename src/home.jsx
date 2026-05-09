/* global React, Reveal, Asterisk, Star, Marquee */
const { useEffect, useRef, useState } = React;

// ──────────────────────────────────────────────────────────
// HOME: Hero + Marquee banner + Manifiesto + Portafolio
// ──────────────────────────────────────────────────────────

function Hero({ go }) {
  const wrapRef = useRef(null);
  const isMobile = window.innerWidth <= 600;
  const [progress, setProgress] = useState(isMobile ? 1 : 0);

  useEffect(() => {
    if (isMobile) return;
    let revealed = false;
    const onScroll = () => {
      const y = window.scrollY;
      const start = 60;
      const end = 480;
      const p = Math.max(0, Math.min(1, (y - start) / (end - start)));
      if (p > 0.95) revealed = true;
      const floor = revealed ? 0.55 : 0;
      setProgress(Math.max(floor, p));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero" ref={wrapRef}>
      <div className="hero-photo-wrap">
        <img
          src={isMobile ? "assets/team-photo-mobile.png" : "assets/team-photo.png"}
          alt="Jos, Gabi y Dani — Tremendo Studio"
          className="hero-photo loaded"
          style={{
            opacity: progress,
            transform: `scale(${1.08 - progress * 0.08})`
          }} />
        
        <div className="hero-vignette" />
        <div className="hero-grain" />
      </div>

      {/* Corner meta removed */}

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
              <textPath href="#circle" style={{ color: "rgb(255, 255, 255)" }}>
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
          Branding y redes sociales con intención — para marcas que no se conforman con <em className="serif-ital">"lo de siempre"</em>.
        </p>

        <div className="hero-cta-row">
          <button className="btn" onClick={() => go("servicios")} data-cursor="hola">
            Quiero algo Tremendo <Star size={12} />
          </button>
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
{ id: "01", name: "Privé", cat: "Branding + Content", tag: "Estudio de Pilates", size: "tall",
  frames: [
  { src: "assets/portfolio/prive-1.png" },
  { src: "assets/portfolio/prive-4.png" },
  { src: "assets/portfolio/prive-3.png" },
  { src: "assets/portfolio/prive-2.png" }]
},
{ id: "02", name: "Barisca", cat: "Branding", tag: "Cafetería", size: "wide",
  frames: [
  { src: "assets/portfolio/barisca-1.png" },
  { src: "assets/portfolio/barisca-2.png" },
  { src: "assets/portfolio/barisca-3.png" },
  { src: "assets/portfolio/barisca-4.png" }]
},
{ id: "03", name: "Snakd", cat: "Branding + Content", tag: "Snacks", size: "square",
  frames: [
  { src: "assets/portfolio/snakd-1.png" },
  { src: "assets/portfolio/snakd-2.png" },
  { src: "assets/portfolio/snakd-3.png" }]
},
{ id: "04", name: "Bueno Verte", cat: "Branding", tag: "Social Room", size: "tall",
  frames: [
  { src: "assets/portfolio/buenoverte-1.png" },
  { src: "assets/portfolio/buenoverte-2.png" },
  { src: "assets/portfolio/buenoverte-3.png" },
  { src: "assets/portfolio/buenoverte-4.png" }]
},
{ id: "05", name: "Misión", cat: "Content", tag: "Restaurante", size: "tall",
  frames: [
  { src: "assets/portfolio/mision-1.png" },
  { src: "assets/portfolio/mision-2.png" },
  { src: "assets/portfolio/mision-3.png" },
  { src: "assets/portfolio/mision-4.png" }]
},
{ id: "06", name: "Yokō", cat: "Branding + Content", tag: "Matcha Café", size: "wide",
  frames: [
  { src: "assets/portfolio/yoko-1.png" },
  { src: "assets/portfolio/yoko-2.png" },
  { src: "assets/portfolio/yoko-3.png" }]
}];


function PortaCard({ p, i }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const dur = 2600 + i % 3 * 400; // staggered timing per card
    const id = setInterval(() => {
      setActive((a) => (a + 1) % p.frames.length);
    }, dur);
    return () => clearInterval(id);
  }, [p.frames.length, i]);

  return (
    <div className={"porta-card hoverable porta-" + p.size}>
      {p.frames.map((f, fi) =>
      <div
        key={fi}
        className={"porta-frame " + (fi === active ? "on" : "")}
        style={f.src ? undefined : { background: f.bg, color: f.fg }}>
          {f.src ?
            <img src={f.src} alt={p.name} className="porta-frame-img" /> :
            <>
              <span className="display porta-img-name">{f.label}</span>
              <Asterisk size={28} className="asterisk slow" />
              <span className="porta-img-num display">{p.id}</span>
            </>
          }
        </div>
      )}
      <div className="porta-frame-dots">
        {p.frames.map((_, fi) =>
        <span key={fi} className={"porta-frame-dot " + (fi === active ? "on" : "")} />
        )}
      </div>
      <div className="porta-card-meta">
        <span className="eyebrow">{p.cat}</span>
        <span className="porta-card-tag serif-ital">{p.tag}</span>
      </div>
    </div>);

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
        {PORTFOLIO.map((p, i) => <PortaCard key={p.id} p={p} i={i} />)}
      </Reveal>

      <Reveal className="porta-foot">
        <p className="serif-ital" style={{ color: "#fff" }}>...y algunos proyectos todavía bajo NDA.</p>
      </Reveal>
    </section>);

}

function Showreel() {
  return (
    <section className="showreel">
      <span className="display showreel-bg" aria-hidden="true">
        <span className="showreel-bg-desktop">TREMENDO</span>
        <span className="showreel-bg-mobile">TRE<br/>MEN<br/>DO</span>
      </span>
      <span className="display showreel-bg showreel-bg-2" aria-hidden="true">
        <em className="serif-ital">en movimiento</em>
      </span>

      <div className="showreel-meta showreel-meta-l">
        <Asterisk size={11} />
        <span className="eyebrow">Showreel · 2025</span>
      </div>
      <div className="showreel-meta showreel-meta-r">
        <span className="eyebrow">↻ loop · sin sonido</span>
      </div>

      <Reveal className="showreel-stage">
        <div className="phone-float">
          <div className="phone-shadow" aria-hidden="true" />
          <div className="phone">
            <div className="phone-notch" aria-hidden="true">
              <span className="phone-notch-cam" />
            </div>
            <div className="phone-side phone-side-power" aria-hidden="true" />
            <div className="phone-side phone-side-vol1" aria-hidden="true" />
            <div className="phone-side phone-side-vol2" aria-hidden="true" />
            <div className="phone-screen">
              <video
                src="assets/showreel.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="phone-video" />
            </div>
          </div>
        </div>
      </Reveal>

      <Asterisk size={48} className="asterisk showreel-aster showreel-aster-1" />
      <Asterisk size={28} className="asterisk slow showreel-aster showreel-aster-2" />
    </section>);

}

function Home({ tweaks, go }) {
  return (
    <div className="page-home tab-enter">
      <Hero go={go} />
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