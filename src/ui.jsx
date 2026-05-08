/* global React */
const { useEffect, useRef, useState } = React;

// ──────────────────────────────────────────────────────────
// Small shared UI bits
// ──────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} {...rest}>
      {children}
    </Tag>);

}

function Star({ size = 14, color = "currentColor", style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={style}
      aria-hidden="true">
      
      <path
        d="M12 1v22M1 12h22M4.2 4.2l15.6 15.6M19.8 4.2L4.2 19.8"
        stroke={color}
        strokeWidth="1.2" />
      
    </svg>);

}

function Asterisk({ size = 14, color = "currentColor", className = "", style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={style}
      aria-hidden="true">
      
      <g stroke={color} strokeWidth="2" strokeLinecap="round">
        <line x1="12" y1="3" x2="12" y2="21" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
        <line x1="18.4" y1="5.6" x2="5.6" y2="18.4" />
      </g>
    </svg>);

}

function Wordmark({ size = 28, variant = "orange" }) {
  const src =
    variant === "white" ? "assets/logo-white.png" :
    variant === "black" ? "assets/logo-black.png" :
    "assets/logo-orange.png";
  return (
    <img
      src={src}
      alt="Tremendo Studio"
      style={{
        height: size,
        width: "auto",
        display: "block"
      }} />);

}

// Navbar with 4 tabs
function Navbar({ page, go }) {
  const tabs = [
  { id: "home", label: "Home" },
  { id: "servicios", label: "Servicios" },
  { id: "nosotras", label: "Nosotras" },
  { id: "hablemos", label: "Hablemos", cta: true }];

  return (
    <nav className="nav" style={{ backgroundColor: "rgb(242, 218, 199)" }}>
      <button className="nav-brand" onClick={() => go("home")} aria-label="Home">
        <Wordmark size={32} variant="white" />
      </button>

      <ul className="nav-tabs">
        {tabs.map((t) =>
        <li key={t.id}>
            <button
            onClick={() => go(t.id)}
            data-cursor={t.cta ? "hola" : "ir"}
            className={
            "nav-tab " + (
            t.cta ? "cta " : "") + (
            page === t.id ? "active" : "")
            }>
            
              <span className="nav-num">
                {String(tabs.indexOf(t) + 1).padStart(2, "0")}
              </span>
              <span>{t.label}</span>
            </button>
          </li>
        )}
      </ul>
    </nav>);

}

// Footer
function Footer({ go }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <p className="eyebrow" style={{ color: "var(--orange)" }}>
            ¿Te quedaste con ganas?
          </p>
          <h3 className="display footer-big">
            HAGAMOS <br />
            ALGO <em className="serif-ital" style={{ color: "var(--orange)" }}>tremendo</em>.
          </h3>
          <button className="btn" onClick={() => go("hablemos")}>
            Escríbenos <Star size={12} />
          </button>
        </div>

        <div className="footer-cols">
          <div>
            <p className="eyebrow footer-head">Estudio</p>
            <ul>
              <li><button onClick={() => go("home")}>Home</button></li>
              <li><button onClick={() => go("servicios")}>Servicios</button></li>
              <li><button onClick={() => go("nosotras")}>Nosotras</button></li>
              <li><button onClick={() => go("hablemos")}>Hablemos</button></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow footer-head">Redes</p>
            <ul>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Instagram ↗</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>TikTok ↗</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Behance ↗</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Pinterest ↗</a></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow footer-head">Contacto</p>
            <ul>
              <li><a href="mailto:hola@tremendostudio.mx">hola@tremendostudio.mx</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>+52 33 0000 0000</a></li>
              <li>Guadalajara, MX</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Tremendo Studio. Hecho con complicidad.</span>
        <span className="footer-astro">
          <Asterisk size={14} className="asterisk slow" />
          <em className="serif-ital">Tres mentes, un estudio.</em>
          <Asterisk size={14} className="asterisk slow" />
        </span>
      </div>
    </footer>);

}

Object.assign(window, { Reveal, Star, Asterisk, Wordmark, Navbar, Footer });