/* global React, Reveal, Star, Asterisk */
const { useState } = React;

// ──────────────────────────────────────────────────────────
// HABLEMOS page — contact form
// ──────────────────────────────────────────────────────────

const PACKAGES = [
  { label: "Tremendo Branding", options: [
    "TR-1 Refinamiento de Marca — $1,500 MXN",
    "TR-2 Creación de Marca — $4,000 MXN",
    "TR-3 Despliegue de Marca — $6,000 MXN",
  ]},
  { label: "Tremendo Content", options: [
    "TR-1 Pack Básico de Contenido — $5,700 MXN/mes",
    "TR-2 Pack Plus de Contenido — $8,500 MXN/mes",
    "TR-3 Pack Premium de Contenido — $12,000 MXN/mes",
  ]},
  { label: "Otro", options: ["Todavía no sé, quiero asesoría"] },
];

const BUDGETS = ["< $3k MXN", "$3k — $8k", "$8k — $15k", "$15k+"];
const WHENS = ["Ayer", "Este mes", "En 1–3 meses", "Todavía explorando"];

function Hablemos() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    project: "",
    pkg: "",
    budget: "",
    when: "",
    heard: "",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const pick = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const lines = [
      "¡Hola! 👋 Nuevo mensaje desde Tremendo Studio:",
      "",
      `*Nombre:* ${form.name}`,
      `*Email:* ${form.email}`,
      form.phone    ? `*Teléfono:* ${form.phone}`       : "",
      form.location ? `*Ubicación:* ${form.location}`   : "",
      "",
      `*Proyecto:* ${form.project}`,
      form.pkg    ? `*Paquete:* ${form.pkg}`       : "",
      form.budget ? `*Presupuesto:* ${form.budget}` : "",
      form.when   ? `*¿Para cuándo?:* ${form.when}` : "",
      form.heard  ? `*¿Cómo nos encontró?:* ${form.heard}` : "",
    ].filter((l, i) => i < 5 || l !== "");
    const msg = encodeURIComponent(lines.join("\n"));
    window.open("https://wa.me/525548900185?text=" + msg, "_blank");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="page-hablemos tab-enter hablemos-sent">
        <Reveal>
          <div className="sent-big">
            <Asterisk size={64} className="asterisk" />
            <h1 className="display">
              ¡<em className="serif-ital" style={{ color: "var(--orange)" }}>Tremendo!</em>
            </h1>
          </div>
          <p className="sent-lede">
            Recibimos tu mensaje. Las tres lo vamos a leer —
            prometemos responderte en menos de <strong>48 horas</strong>.
          </p>
          <p className="serif-ital sent-ps">
            Mientras tanto, un café con calma. ✦
          </p>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="page-hablemos tab-enter">
      <section className="hablemos-hero">
        <Reveal>
          <span className="eyebrow" style={{ color: "var(--orange)" }}>
            ✦ Hablemos / 04
          </span>
          <h1 className="display hablemos-h">
            ¿Hacemos algo<br />
            <em className="serif-ital" style={{ color: "var(--orange)" }}>tremendo</em> juntos?
          </h1>
          <p className="hablemos-lede">
            Buscamos emprendedores, creativos y marcas emergentes que estén
            listas para el siguiente nivel. Si buscas “lo de siempre”, no somos
            nosotras. Si buscas algo tremendo — llegaste al lugar indicado.
          </p>
        </Reveal>

        <Reveal delay={180} className="hablemos-meta">
          <div>
            <span className="eyebrow">Ubicación</span>
            <span className="serif-ital">Sin Fronteras.</span>
            <p style={{ marginTop: "0.5rem", fontSize: "13px", opacity: 0.7, lineHeight: 1.6 }}>
              Sede en México, alcance mundial. Trabajamos remoto para marcas que buscan algo tremendo.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="hablemos-form-wrap">
        <form
          className="hablemos-form"
          onSubmit={handleSubmit}
        >
          <div className="field">
            <label className="eyebrow"><span>01</span> ¿Cómo te llamas?</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={set("name")}
              placeholder="Tu nombre completo"
            />
          </div>

          <div className="field">
            <label className="eyebrow"><span>02</span> ¿Y tu email?</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="tu@correo.com"
            />
          </div>

          <div className="field">
            <label className="eyebrow"><span>03</span> ¿Tu número de teléfono / WhatsApp?</label>
            <input
              type="tel"
              value={form.phone}
              onChange={set("phone")}
              placeholder="+52 55 0000 0000"
            />
          </div>

          <div className="field">
            <label className="eyebrow"><span>04</span> ¿Desde dónde nos escribes?</label>
            <input
              type="text"
              value={form.location}
              onChange={set("location")}
              placeholder="Ciudad, País"
            />
          </div>

          <div className="field">
            <label className="eyebrow"><span>05</span> Cuéntanos tu proyecto <em className="serif-ital">soñado.</em></label>
            <textarea
              required
              rows={4}
              value={form.project}
              onChange={set("project")}
              placeholder="¿Qué estás construyendo? ¿Por qué ahora? ¿Qué referencias te vuelan la cabeza?"
            />
          </div>

          <div className="field">
            <label className="eyebrow"><span>06</span> ¿A qué paquete le echaste el ojo?</label>
            <div className="chip-grid">
              {PACKAGES.flatMap((g) =>
                g.options.map((o) => (
                  <button
                    key={o}
                    type="button"
                    className={"chip " + (form.pkg === o ? "on" : "")}
                    onClick={() => pick("pkg", o)}
                  >
                    {o}
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label className="eyebrow"><span>07</span> Presupuesto aproximado</label>
              <div className="chip-grid tight">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    className={"chip " + (form.budget === b ? "on" : "")}
                    onClick={() => pick("budget", b)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <label className="eyebrow"><span>08</span> ¿Para cuándo?</label>
              <div className="chip-grid tight">
                {WHENS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    className={"chip " + (form.when === b ? "on" : "")}
                    onClick={() => pick("when", b)}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="field">
            <label className="eyebrow"><span>09</span> ¿Cómo nos encontraste? <span className="opt">(opcional)</span></label>
            <input
              type="text"
              value={form.heard}
              onChange={set("heard")}
              placeholder="Instagram, recomendación, sueño revelador..."
            />
          </div>

          <div className="submit-row">
            <button className="btn" type="submit">
              Enviar mensaje <Star size={12} />
            </button>
            <p className="serif-ital submit-note">
              Hablemos, <strong>las tres</strong> escuchamos.
            </p>
          </div>
        </form>

        <aside className="hablemos-side">
          <div className="side-card">
            <span className="eyebrow" style={{ color: "var(--orange)" }}>¿Prefieres directo?</span>
            <h4 className="display">Escríbenos a:</h4>
            <a className="serif-ital side-mail" href="mailto:hola@tremendostudio.mx">
              hola@tremendostudio.mx
            </a>
            <p>O en Instagram <a href="#" onClick={(e)=>e.preventDefault()}>@tremendo.studio</a></p>
          </div>

          <div className="side-card side-dark">
            <Asterisk size={22} className="asterisk slow" />
            <p style={{ fontFamily: "var(--futura)", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", fontSize: "13px", lineHeight: 1.6 }}>
              "No contestamos plantillas. Leemos cada mensaje con calma — y te respondemos como a una amiga."
            </p>
            <span className="eyebrow">— Las tres</span>
          </div>
        </aside>
      </section>
    </div>
  );
}

Object.assign(window, { Hablemos });
