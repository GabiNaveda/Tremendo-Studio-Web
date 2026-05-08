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
  const [curtainOut, setCurtainOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setCurtainOut(true), 80);
    return () => clearTimeout(t);
  }, []);

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
      {!curtainOut && (
        <div className={"curtain " + (curtainOut ? "out" : "")}>
          <span className="display" style={{ color: "var(--cream)", fontSize: 80 }}>
            TREMENDO
          </span>
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
