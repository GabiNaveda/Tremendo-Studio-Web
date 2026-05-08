/* global React, ReactDOM, useTweaks, TweaksPanel, CustomCursor, Navbar, Footer, Home, Servicios, Nosotras, Hablemos */
const { useState, useEffect } = React;

function App() {
  const { tweaks, editMode, update } = useTweaks();
  const [page, setPage] = useState(() => {
    try {
      return localStorage.getItem("tremendo-page") || "home";
    } catch (_) {
      return "home";
    }
  });
  const [welcome, setWelcome] = useState("idle"); // idle | exiting | gone

  const enter = () => {
    if (welcome !== "idle") return;
    go("home");
    setWelcome("exiting");
    setTimeout(() => setWelcome("gone"), 1800);
  };

  const go = (id) => {
    if (id === page) return;
    setPage(id);
    try {
      localStorage.setItem("tremendo-page", id);
    } catch (_) {}
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <>
      {welcome !== "gone" && (
        <div className={"welcome " + welcome}>
          <div className="welcome-grad" />
          <div className="welcome-inner">
            <div className="welcome-eyebrow">
              <span className="eyebrow">✦ Bienvenidos a</span>
            </div>

            <div className="welcome-mark">
              {/* Each letter is independently animatable. "TR" + "®" stay; "EMENDO" disappears. */}
              <span className="wm-letter wm-keep" data-l="T">T</span>
              <span className="wm-letter wm-keep" data-l="R">R</span>
              <span className="wm-letter wm-fade" style={{ "--d": "0ms" }}>E</span>
              <span className="wm-letter wm-fade" style={{ "--d": "70ms" }}>M</span>
              <span className="wm-letter wm-fade" style={{ "--d": "140ms" }}>E</span>
              <span className="wm-letter wm-fade" style={{ "--d": "210ms" }}>N</span>
              <span className="wm-letter wm-fade" style={{ "--d": "280ms" }}>D</span>
              <span className="wm-letter wm-fade" style={{ "--d": "350ms" }}>O</span>
              <span className="wm-reg">®</span>
            </div>

            <div className="welcome-tag">
              <span>ESTD.</span>
              <span className="welcome-dot">·</span>
              <span>STUDIO</span>
              <span className="welcome-dot">·</span>
              <span>2025</span>
            </div>

            <div className="welcome-lede">
              <p className="serif-ital">
                Menos ordinario, más <span style={{ color: "var(--orange)" }}>tremendo</span>.
              </p>
            </div>

            <button className="welcome-cta" onClick={enter} data-cursor="entrar">
              <span>Entrar al estudio</span>
              <span className="welcome-cta-arrow">→</span>
            </button>
          </div>
        </div>
      )}

      <CustomCursor mode={tweaks.cursor} />

      <Navbar page={page} go={go} />

      <main className="tab-wrap" key={page}>
        {page === "home" && <Home tweaks={tweaks} go={go} />}
        {page === "servicios" && <Servicios go={go} />}
        {page === "nosotras" && <Nosotras go={go} />}
        {page === "hablemos" && <Hablemos go={go} />}
      </main>

      <Footer go={go} />

      <TweaksPanel tweaks={tweaks} update={update} open={editMode} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
