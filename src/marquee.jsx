/* global React */
const { useMemo } = React;

// ──────────────────────────────────────────────────────────
// Moving banner (marquee) — content depends on tweak
// ──────────────────────────────────────────────────────────

const SERVICES = [
  "BRANDING",
  "IDENTIDAD VISUAL",
  "CONTENIDO REDES",
  "DIRECCIÓN DE ARTE",
  "ESTRATEGIA",
  "FOTOGRAFÍA",
  "VIDEO",
  "STORIES",
  "COPYWRITING",
  "PACKAGING",
];
const CITIES = [
  "GUADALAJARA",
  "CDMX",
  "MONTERREY",
  "MÉRIDA",
  "TULUM",
  "MEDELLÍN",
  "BUENOS AIRES",
  "BARCELONA",
];
const SLOGANS = [
  "MENOS ORDINARIO",
  "MÁS TREMENDO",
  "LO PREDECIBLE SE OLVIDA",
  "EL DETALLE LO ES TODO",
  "TRES MENTES UN ESTUDIO",
  "BRANDING CON INTENCIÓN",
];

function starItem(i) {
  return i % 2 === 0 ? "✦" : "✸";
}

function buildItems(style) {
  if (style === "slogans") {
    return SLOGANS.flatMap((s, i) => [s, starItem(i)]);
  }
  if (style === "mixed") {
    const mix = [];
    SERVICES.forEach((s, i) => {
      mix.push(s);
      mix.push(starItem(i));
    });
    return mix;
  }
  // default "services": services + cities woven
  const woven = [];
  const max = Math.max(SERVICES.length, CITIES.length);
  for (let i = 0; i < max; i++) {
    if (SERVICES[i]) woven.push(SERVICES[i]);
    if (CITIES[i]) woven.push("— " + CITIES[i]);
  }
  return woven;
}

function Marquee({ style = "services", speed = 45, reverse = false, tone = "ink" }) {
  const items = useMemo(() => buildItems(style), [style]);
  const dup = [...items, ...items]; // duplicated for seamless loop

  return (
    <div className={"mq mq-" + tone}>
      <div
        className="marquee-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {dup.map((t, i) => (
          <span key={i} className="mq-item">
            {t === "✦" || t === "✸" ? (
              <span className="mq-star">{t}</span>
            ) : (
              <span>{t}</span>
            )}
          </span>
        ))}
      </div>
      <div
        className="marquee-track"
        aria-hidden="true"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {dup.map((t, i) => (
          <span key={"b" + i} className="mq-item">
            {t === "✦" || t === "✸" ? (
              <span className="mq-star">{t}</span>
            ) : (
              <span>{t}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Marquee });
