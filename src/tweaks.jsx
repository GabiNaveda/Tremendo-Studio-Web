/* global React */
const { useState, useEffect, useRef } = React;

// ──────────────────────────────────────────────────────────
// Tweaks: persistent state + edit-mode hook
// ──────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
  "bannerStyle": "slogans",
  "cursor": "dot"
} /*EDITMODE-END*/;

const BANNER_OPTIONS = [
  { id: "services", label: "Servicios + Ciudades" },
  { id: "slogans", label: "Slogans manifiesto" },
  { id: "mixed", label: "Mezcla (servicios + estrellas)" },
];
const CURSOR_OPTIONS = [
  { id: "tremendo", label: "Tremendo (ring + dot)" },
  { id: "dot", label: "Solo punto naranja" },
  { id: "native", label: "Nativo del sistema" },
];

function useTweaks() {
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "__activate_edit_mode") setEditMode(true);
      if (e.data.type === "__deactivate_edit_mode") setEditMode(false);
    };
    window.addEventListener("message", handler);
    // Announce availability AFTER listener wired
    try {
      window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    } catch (_) {}
    return () => window.removeEventListener("message", handler);
  }, []);

  const update = (patch) => {
    setTweaks((t) => {
      const next = { ...t, ...patch };
      try {
        window.parent.postMessage(
          { type: "__edit_mode_set_keys", edits: patch },
          "*"
        );
      } catch (_) {}
      return next;
    });
  };

  return { tweaks, editMode, update };
}

function TweaksPanel({ tweaks, update, open }) {
  if (!open) return null;
  return (
    <div className="tweaks-panel">
      <div className="tweaks-head">
        <span className="eyebrow" style={{ color: "var(--orange)" }}>
          Tweaks
        </span>
        <span className="asterisk" style={{ fontFamily: "var(--display)" }}>✦</span>
      </div>

      <div className="tweaks-row">
        <label className="eyebrow">Banner en movimiento</label>
        <div className="tweaks-opts">
          {BANNER_OPTIONS.map((o) => (
            <button
              key={o.id}
              className={"tweak-chip " + (tweaks.bannerStyle === o.id ? "on" : "")}
              onClick={() => update({ bannerStyle: o.id })}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tweaks-row">
        <label className="eyebrow">Cursor</label>
        <div className="tweaks-opts">
          {CURSOR_OPTIONS.map((o) => (
            <button
              key={o.id}
              className={"tweak-chip " + (tweaks.cursor === o.id ? "on" : "")}
              onClick={() => update({ cursor: o.id })}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Custom cursor
// ──────────────────────────────────────────────────────────
function CustomCursor({ mode }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (mode === "native") {
      document.body.classList.remove("cursor-custom");
      return;
    }
    document.body.classList.add("cursor-custom");

    let x = window.innerWidth / 2,
      y = window.innerHeight / 2;
    let rx = x,
      ry = y;
    let raf;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    const onOver = (e) => {
      const t = e.target.closest("a, button, [role='button'], .hoverable");
      if (t) {
        setHovering(true);
        setLabel(t.dataset.cursor || "");
      } else {
        setHovering(false);
        setLabel("");
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("cursor-custom");
    };
  }, [mode]);

  if (mode === "native") return null;
  return (
    <>
      <div ref={ringRef} className={"cur " + (hovering ? "hover" : "")}>
        <div
          className="cur-ring"
          style={mode === "dot" ? { width: 18, height: 18, background: "var(--orange)", borderColor: "var(--orange)" } : undefined}
        >
          {label}
        </div>
      </div>
      {mode !== "dot" && (
        <div ref={dotRef} className="cur">
          <div className="cur-dot" />
        </div>
      )}
    </>
  );
}

Object.assign(window, { useTweaks, TweaksPanel, CustomCursor });
