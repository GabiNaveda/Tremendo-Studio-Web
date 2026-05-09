/* global React, Reveal, Star, Asterisk */
const { useState } = React;

// ──────────────────────────────────────────────────────────
// NOSOTRAS page
// ──────────────────────────────────────────────────────────

const TEAM = [
{
  name: "Gabi",
  handle: "@gabi.tremenda",
  role: "Directora de Estrategia & Contenido",
  bio: "Mente inquieta y energía imparable",
  fav: "Excel + café frío",
  sign: "Acuario ♒︎",
  color: "var(--orange)",
  photo: "assets/gabi.png"
},
{
  name: "Dani",
  handle: "@dani.tremenda",
  role: "Directora de Identidad & Branding",
  bio: "Minimalismo puro y ejecución perfecta",
  fav: "Pantone + vinilos",
  sign: "Libra ♎︎",
  color: "var(--burnt)",
  photo: "assets/dani.png"
},
{
  name: "Jos",
  handle: "@jos.tremenda",
  role: "Directora de Arte & Dirección Visual",
  bio: "Experta que estructura y sociable por instinto",
  fav: "Cámara analógica",
  sign: "Leo ♌︎",
  color: "var(--ink)",
  photo: "assets/jos.png"
}];


function TeamCard({ t, i }) {
  const [following, setFollowing] = useState(false);
  return (
    <Reveal delay={i * 120} className="teamcard hoverable">
      <div className="teamcard-portrait" style={{ background: t.color }}>
        {t.photo && (
          <img src={t.photo} alt={t.name} className="teamcard-photo" />
        )}
        <div className="teamcard-num">
          <span className="display">0{i + 1}</span>
          <span className="serif-ital teamcard-hand">{t.handle}</span>
        </div>
        {!t.photo && (
          <span className="display teamcard-initial">{t.name[0]}</span>
        )}
      </div>
      <div className="teamcard-body">
        <h3 className="teamcard-name">
          {t.name}
          <span className="teamcard-verify" aria-label="verificada">✓</span>
        </h3>
        <p className="teamcard-role">{t.role}</p>
        <p className="teamcard-bio">{t.bio}</p>
        <div className="teamcard-foot">
          <div className="teamcard-stats">
            <span className="teamcard-stat" title="Signo">
              <Asterisk size={11} /> {t.sign}
            </span>
            <span className="teamcard-stat" title="Fav tool">
              ✦ {t.fav}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setFollowing((f) => !f)}
            className={"teamcard-follow hoverable " + (following ? "on" : "")}
            data-cursor={following ? "siguiendo" : "follow"}>
            
            {following ? "Siguiendo" : "Follow"} {following ? "✓" : "+"}
          </button>
        </div>
      </div>
    </Reveal>);

}

function Nosotras({ go }) {
  return (
    <div className="page-nosotras tab-enter">
      <section className="page-hero nosotras-hero">
        <div className="nosotras-hero-left">
        <Reveal>
          <span className="eyebrow" style={{ color: "var(--orange)" }}>
            ✦ Nosotras / 03
          </span>
          <h1 className="display page-hero-h">
            Tres amigas, <br />
            un estudio,<br />
            una <em className="serif-ital">misión.</em>
          </h1>
        </Reveal>
        <Reveal delay={150} className="nosotras-intro">
          <p>
            Nos conocimos en la universidad estudiando diseño, y desde entonces
            nuestras vidas han estado conectadas por el crecimiento, la
            creatividad y la complicidad.
          </p>
          <p>
            Después de años de experiencias personales, freelance, colaboraciones
            y crecimiento individual, decidimos que era momento de unirnos y
            crear algo propio. No solo un proyecto — sino un espacio que
            represente quiénes somos, lo que amamos hacer, y lo que queremos
            construir juntas para nuestro futuro.
          </p>
          <p className="display nosotras-intro-big">
            Así nace <em className="serif-ital" style={{ color: "var(--orange)" }}>Tremendo Studio.</em>
          </p>
        </Reveal>
        </div>
        <Reveal delay={250} className="nosotras-hero-right">
          <div className="nosotras-bg-word" aria-hidden="true">
            <span className="display">TRE</span>
            <span className="display">MEN</span>
            <span className="display">DO</span>
          </div>
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
          <span className="serif-ital nosotras-phone-caption" style={{ display: "none" }}>
            <Asterisk size={12} /> nosotras, en movimiento
          </span>
        </Reveal>
      </section>

      {/* Palabra: Tremendo */}
      <section className="nosotras-def">
        <div className="nosotras-def-inner">
          <Reveal>
            <p className="def-pre" style={{ fontFamily: "var(--futura)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>Tremendo es una palabra:</p>
          </Reveal>
          <div className="def-grid">
            {[
            { w: "Fuerte", d: "Ideas con músculo. Sin filler, sin miedo, sin peros." },
            { w: "Positiva", d: "Creativas y cómplices. Hacemos cosas bonitas con buena vibra." },
            { w: "Energética", d: "Que te mueva. Que se note en la calle y en el feed." }].
            map((p, i) =>
            <Reveal key={p.w} delay={i * 120} className="def-item">
                <span className="display def-word">
                  {p.w}.
                </span>
                <p>{p.d}</p>
                <div className="def-line" />
              </Reveal>
            )}
          </div>
          <Reveal delay={400}>
            <p className="def-post" style={{ fontFamily: "var(--futura)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>…y muuuy nuestra.</p>
          </Reveal>
        </div>
      </section>

      {/* TRE = TRES */}
      <section className="nosotras-tres">
        <Reveal className="tres-inner">
          <div className="tres-head">
            <span className="serif-ital">Si lo desglosamos,</span>
            <span className="serif-ital">"Tremendo" empieza con</span>
          </div>
          <div className="tres-word">
            <span className="display tres-big" style={{ color: "rgb(22, 22, 21)", fontWeight: "400" }}>TRE</span>
            <div className="tres-strike" />
            <span className="display tres-rest">mendo</span>
          </div>
          <div className="tres-explain">
            <p>
              por <strong>TRES</strong>: tres mujeres, tres mentes distintas,
              tres formas de sentir y pensar que, lejos de chocar,
              se complementan de forma tremenda.
            </p>
            <p className="serif-ital">
              Nos gusta pensar que nuestra amistad es así: intensa, valiente
              y fuera de lo común.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Equipo */}
      <section className="team-section">
        <Reveal>
          <span className="eyebrow" style={{ color: "var(--orange)" }}>✦ El trío</span>
          <h2 className="display team-h">Conócenos.</h2>
        </Reveal>
        <div className="team-grid">
          {TEAM.map((t, i) =>
          <TeamCard key={t.name} t={t} i={i} />
          )}
        </div>
      </section>

      <section className="page-foot">
        <Reveal>
          <p className="serif-ital">Y eso mismo queremos reflejar en cada marca con la que trabajamos.</p>
          <h3 className="display page-foot-h" style={{ marginTop: 18 }}>
            ¿Construimos la <em className="serif-ital">tuya</em>?
          </h3>
          <button className="btn" onClick={() => go("hablemos")}>
            Hablemos <Star size={12} />
          </button>
        </Reveal>
      </section>
    </div>);

}

Object.assign(window, { Nosotras });