/* global React, Reveal, Star, Asterisk */
const { useState } = React;

// ──────────────────────────────────────────────────────────
// SERVICIOS page — interactive carousel-style pricing
// ──────────────────────────────────────────────────────────

const BRANDING_PKG = [
{ tier: "TR-1", name: "Refinamiento de Marca", price: "$1,500", unit: "MXN", tag: "para empezar",
  blurb: "Lo que ya tienes, pero mejorado.",
  features: ["Refinamiento y limpieza de logo actual", "Vectorización profesional", "Paleta + tipografías definidas"] },
{ tier: "TR-2", name: "Creación de Marca", price: "$4,000", unit: "MXN", tag: "más elegido",
  blurb: "El kit de supervivencia para emprendedoras.",
  features: ["3 propuestas de logotipo estratégico", "Manual de identidad esencial", "Paleta extendida + tipografías", "Aplicaciones básicas (IG, papelería)"] },
{ tier: "TR-3", name: "Despliegue de Marca", price: "$6,000", unit: "MXN", tag: "full immersion",
  blurb: "El ADN de tu marca listo para conquistar.",
  features: ["4 propuestas de logotipo", "Manual full de identidad", "Aplicaciones + mockups", "Sistema de plantillas IG", "Brand deck presentable a inversionistas"] }];


const CONTENT_PKG = [
{ tier: "TR-1", name: "Pack Básico de Contenido", price: "$5,700", unit: "MXN / mes", tag: "básico",
  blurb: "El impulso visual que tu feed pide a gritos.",
  features: ["10 artes estáticos", "2 videos editados", "1 shooting cada 2 meses"],
  savings: "Ahorra $1,500 MXN mensuales enviándonos tu propio material visual (fotos/videos). *No incluye shooting." },
{ tier: "TR-2", name: "Pack Plus de Contenido", price: "$8,500", unit: "MXN / mes", tag: "el sweet spot",
  blurb: "Para cuando la marca ya camina y quiere correr.",
  features: ["15 artes estáticos", "4 videos editados", "6 stories interactivos", "Estrategia personalizada", "1 shooting mensual"],
  savings: "Ahorra $2,000 MXN mensuales enviándonos tu propio material visual (fotos/videos). *No incluye shooting." },
{ tier: "TR-3", name: "Pack Premium de Contenido", price: "$12,000", unit: "MXN / mes", tag: "pro",
  blurb: "Estrategia omnicanal. Marca siempre visible.",
  features: ["20 artes estáticos", "6 videos profesionales", "8 stories interactivos", "Estrategia personalizada", "1 shooting mensual", "Reporte de métricas mensual"],
  savings: "Ahorra $2,000 MXN mensuales enviándonos tu propio material visual (fotos/videos). *No incluye shooting." }];


// ──────────────────────────────────────────────────────────
// Carousel — featured card center, side cards muted
// ──────────────────────────────────────────────────────────
function PkgCarousel({ pkgs, variant, eyebrow, title, subtitle, accent = "var(--orange)" }) {
  const [active, setActive] = useState(1); // default middle card

  const go = (dir) => {
    setActive((a) => (a + dir + pkgs.length) % pkgs.length);
  };

  return (
    <section className={"carousel-block " + (variant === "dark" ? "dark" : "light")}>
      <Reveal className="carousel-head">
        <div>
          <span className="eyebrow" style={{ color: variant === "dark" ? "var(--orange)" : "var(--burnt)" }}>
            {eyebrow}
          </span>
          <h2 className="display carousel-h">
            Tremendo <em className="serif-ital" style={{ color: accent }}>{title}</em>
          </h2>
          <p className="carousel-sub">{subtitle}</p>
        </div>
        <div className="carousel-controls">
          <button onClick={() => go(-1)} className="cc-btn hoverable" aria-label="Anterior" data-cursor="prev">
            ←
          </button>
          <span className="cc-count display">
            {String(active + 1).padStart(2, "0")}
            <span className="cc-slash">/</span>
            {String(pkgs.length).padStart(2, "0")}
          </span>
          <button onClick={() => go(1)} className="cc-btn hoverable" aria-label="Siguiente" data-cursor="next">
            →
          </button>
        </div>
      </Reveal>

      <div className="carousel-stage">
        {pkgs.map((p, i) => {
          const offset = i - active;
          // wrap-around for nicer side-cards
          const wrap = offset > pkgs.length / 2 ? offset - pkgs.length :
          offset < -pkgs.length / 2 ? offset + pkgs.length : offset;
          const isActive = wrap === 0;
          return (
            <PkgCard
              key={p.tier}
              pkg={p}
              isActive={isActive}
              wrap={wrap}
              variant={variant}
              accent={accent}
              onClick={() => !isActive && setActive(i)} />);


        })}
      </div>

      {/* Dots */}
      <div className="carousel-dots">
        {pkgs.map((p, i) =>
        <button
          key={i}
          className={"dot hoverable " + (i === active ? "on" : "")}
          onClick={() => setActive(i)}
          aria-label={"Ver " + p.name}
          data-cursor="ver">
          
            <span className="dot-tier eyebrow">{p.tier}</span>
            <span className="dot-name">{p.name}</span>
          </button>
        )}
      </div>
    </section>);

}

function PkgCard({ pkg, isActive, wrap, variant, accent, onClick }) {
  const isSide = !isActive;
  const dir = wrap < 0 ? "left" : wrap > 0 ? "right" : "center";

  return (
    <div
      className={
      "pkg-card hoverable" + (
      isActive ? " active" : " side") +
      " side-" + dir
      }
      onClick={onClick}
      data-cursor={isSide ? "ver" : "elegir"}
      style={{
        "--accent": accent,
        zIndex: isActive ? 10 : 5
      }}>
      
      {/* Featured circle stamp on active */}
      {isActive && pkg.tag === "más elegido" &&
      <div className="pkg-stamp" aria-hidden="true">
          <svg viewBox="0 0 100 100" width="92" height="92">
            <defs>
              <path id={"c-" + pkg.tier} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
            </defs>
            <text fill="var(--cream)" fontFamily="var(--display)" fontSize="11" letterSpacing="2">
              <textPath href={"#c-" + pkg.tier}>MÁS ELEGIDO · MÁS ELEGIDO ·</textPath>
            </text>
          </svg>
          <span className="pkg-stamp-star">✦</span>
        </div>
      }

      <div className="pkg-card-top">
        <span className="eyebrow pkg-tier">{pkg.tier}</span>
        <span className="pkg-tag serif-ital">{pkg.tag === "más elegido" ? "" : pkg.tag}</span>
      </div>

      <h3 className="display pkg-name">{pkg.name}</h3>

      {isActive &&
      <>
          <div className="pkg-price-row">
            <span className="display pkg-price">{pkg.price}</span>
            <span className="pkg-unit">{pkg.unit}</span>
          </div>
          <p className="serif-ital pkg-blurb">{pkg.blurb}</p>
          <div className="pkg-divider" />
          <ul className="pkg-feats">
            {pkg.features.map((f, i) =>
          <li key={i} style={{ animationDelay: i * 60 + "ms" }}>
                <Asterisk size={11} />
                {f}
              </li>
          )}
          </ul>
          {pkg.savings && (
            <div className="pkg-savings">
              <span className="pkg-savings-icon">✦</span>
              <p className="pkg-savings-text">{pkg.savings}</p>
            </div>
          )}
          <a
            className="btn pkg-btn"
            href={"https://wa.me/525548900185?text=" + encodeURIComponent("Hola! Me interesa el paquete " + pkg.name + " de Tremendo Studio 🙌")}
            target="_blank"
            rel="noopener noreferrer">
            Lo quiero <Star size={12} />
          </a>
        </>
      }

      {!isActive &&
      <>
          <p className="pkg-side-hint">
            <span className="pkg-side-price">{pkg.price}</span>
            <span className="pkg-side-cta">click para ver <span className="pkg-side-arrow">→</span></span>
          </p>
        </>
      }
    </div>);

}

// ──────────────────────────────────────────────────────────
// Academia — keep as is (user already direct-edited it)
// ──────────────────────────────────────────────────────────
function Academia() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="academia">
      <Reveal className="academia-card">
        <div className="academia-left">
          <span className="stamp academia-stamp">Coming · Soon</span>
          <h2 className="display academia-h">
            Academia <br />
            <em className="serif-ital" style={{ color: "var(--orange)" }}>Tremenda</em>
          </h2>
          <p className="academia-lede">
            Muy pronto compartiremos todo lo que sabemos sobre diseño,
            creatividad y cómo sobrevivir al mundo creativo sin morir en el intento.
          </p>
          <ul className="academia-list">
            <li><Asterisk size={11} /> Cursos online en vivo</li>
            <li><Asterisk size={11} /> Templates y plantillas editables</li>
            <li><Asterisk size={11} /> Mentorías 1:1 con el equipo</li>
            <li><Asterisk size={11} /> Comunidad privada para emprendedoras</li>
          </ul>
          {!sent ?
          <form className="academia-form" onSubmit={(e) => {e.preventDefault();if (email) setSent(true);}}>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" />
              <button className="btn" type="submit">Avísenme <Star size={12} /></button>
            </form> :

          <p className="academia-sent serif-ital">✦ Listo. Te avisamos en cuanto abra el telón.</p>
          }
        </div>
        <div className="academia-right" aria-hidden="true">
          <div className="academia-blob">
            <span className="display academia-big">ACADEMIA</span>
            <span className="display academia-big academia-big-2"><em className="serif-ital">tremenda</em></span>
            <div className="academia-stars">
              <Asterisk size={44} className="asterisk" />
              <Asterisk size={26} className="asterisk slow" />
              <Asterisk size={18} className="asterisk" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>);

}

function Servicios({ go }) {
  return (
    <div className="page-servicios tab-enter">
      <section className="page-hero">
        <Reveal>
          <span className="eyebrow" style={{ color: "var(--orange)" }}>✦ Servicios / 02</span>
          <h1 className="display page-hero-h">
            Dos <em className="serif-ital">pilares.</em><br />
            Cero <span style={{ textDecoration: "line-through", opacity: 0.35 }}>aburrimiento</span>.
          </h1>
          <p className="page-hero-lede">
            Construimos identidades que se notan y se quedan — y alimentamos tus redes con estética impecable. Elige el camino (o los dos).
          </p>
        </Reveal>
      </section>

      <PkgCarousel
        pkgs={BRANDING_PKG}
        variant="light"
        eyebrow="✦ 01 — Identidad"
        title="Branding"
        subtitle="Construimos identidades que se notan y se quedan. Proyectos one-shot, pago único."
        accent="var(--burnt)" />
      

      <PkgCarousel
        pkgs={CONTENT_PKG}
        variant="dark"
        eyebrow="✦ 02 — Redes"
        title="Content"
        subtitle="Estética impecable para redes sociales. Sin gestión de comunidad, solo arte puro."
        accent="var(--cream)" />
      

      <Academia />

      <section className="page-foot">
        <Reveal>
          <h3 className="display page-foot-h">
            ¿No sabes cuál es <em className="serif-ital">tuyo?</em>
          </h3>
          <p>Escríbenos y armamos algo a tu medida.</p>
          <button className="btn" onClick={() => go("hablemos")}>
            Hablemos <Star size={12} />
          </button>
        </Reveal>
      </section>
    </div>);

}

Object.assign(window, { Servicios });