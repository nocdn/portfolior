"use client"

import { Sandpack } from "@codesandbox/sandpack-react"
import type { SandpackFiles } from "@codesandbox/sandpack-react"
import { githubLight } from "@codesandbox/sandpack-themes"

const files: SandpackFiles = {
  "/index.html": {
    code: `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Drawer Demo</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
  </body>
</html>`,
    hidden: true,
  },

  "/index.tsx": {
    code: `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./globals.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);`,
    hidden: true,
  },

  "/globals.css": `
@import url("https://fonts.cdnfonts.com/css/open-runde");

:root {
    --gray-200: #e5e7eb;
    --text-strong: #222222;
}

* { box-sizing: border-box; }
html, body { margin: 0; }
body {
    font-family:
        ui-sans-serif,
        system-ui,
        -apple-system,
        Segoe UI,
        Roboto,
        Inter,
        "Helvetica Neue",
        Arial,
        "Noto Sans",
        "Apple Color Emoji",
        "Segoe UI Emoji";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #fff;
    color: #111827;
}

.page {
    min-height: 100vh;
    padding: 50px 76px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
}

.wrapper {
    width: 22rem;
    font-family: "Open Runde", sans-serif;
}

.stack {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.section-title {
    font-size: 1.125rem;
    line-height: 1.6;
    font-weight: 500;
    color: var(--text-strong);
    margin: 0;
}

.btn {
    display: inline-block;
    border: 1px solid var(--gray-200);
    border-radius: 12px;
    padding: 8px 16px;
    background: #fff;
    cursor: pointer;
    margin-top: 8px;
    transition: transform 120ms ease;
}
.btn:active {
    transform: scale(0.95);
}

.drawer {
    border: 1px solid var(--gray-200);
    border-radius: 2rem;
    overflow: hidden;
    background: #fff;
}

.drawer-content {
    padding: 24px;
}

.muted { color: rgba(107, 114, 128, 0.7); }

.initial-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    font-size: 19px;
    padding: 0px 4px;
}

.view-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    font-size: 22px;
    margin: 8px 0;
}

.cross {
    cursor: pointer;
    display: grid;
    place-content: center;
    background-color: #f7f8f9;
    border-radius: 100%;
    padding: 8px;
}
.cross:active {
    transform: scale(0.85);
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}

.initial-divider {
    width: 100%;
    height: 1px;
    background-color: #f7f7f7;
    margin-bottom: 12px;
}

.initial-buttons-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.initial-buttons-container * {
    font-family: "Open Runde", sans-serif;
    font-weight: 600;
}

.initial-buttons-container button {
    background-color: #f7f8f9;
    border: none;
    outline: none;
    height: 3rem;
    border-radius: 16px;
    padding-left: 1rem;
    font-size: 17px;
    display: flex;
    gap: 15px;
    align-items: center;
    cursor: pointer;
}

.danger-button {
    background-color: #fff0f0 !important;
    color: red;
}

button:active {
    transform: scale(0.95);
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}

.paragraph {
    color: #999999;
    font-size: 17px;
    font-weight: 500;
    margin: 14px 0 17px 0;
}

.list {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding: 0;
    margin-top: 0;
}

li {
    font-size: 15px;
    font-weight: 600;
    color: #999999;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
li p { margin: 12px 0; }

.action-container {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
}

.action-container button {
    height: 3rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
    font-size: 19px;
    font-weight: 600;
    outline: none;
    border: none;
    font-family: "Open Runde", sans-serif;
    cursor: pointer;
}

.cancel-button {
    background-color: #f0f2f4;
    color: #222222;
}

.reveal-button {
    background-color: #4dafff;
    color: #ffffff;
    gap: 9px;
}
`,

  "/App.tsx": {
    code: `import React from "react";
import FamilyDrawerComponent from "./FamilyDrawerComponent";

export default function App() {
  return (
    <div className="page">
      <div className="wrapper">
        <FamilyDrawerComponent />
      </div>
    </div>
  );
}`,
    hidden: false,
  },

  "/FamilyDrawerComponent.tsx": {
    code: `"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import useMeasure from "react-use-measure";

import InitialView from "./InitialView";
import KeyView from "./KeyView";
import RecoveryView from "./RecoveryView";

const FamilyDrawerComponent = () => {
  const [view, setView] = useState(0);
  const [elementRef, bounds] = useMeasure();

  const options = [
    <InitialView
      key="initial"
      onViewKey={() => setView(1)}
      onViewRecovery={() => setView(2)}
      onRemoveWallet={() => {}}
    />,
    <KeyView key="key" onCancel={() => setView(0)} onReveal={() => setView(0)} />,
    <RecoveryView key="recovery" onCancel={() => setView(0)} onReveal={() => setView(0)} />,
  ];

  const content = useMemo(() => {
    return options[view];
  }, [options, view]);

  return (
    <motion.div
      animate={{ height: bounds.height }}
      transition={{
        type: "tween",
        ease: [0.26, 1, 0.5, 1],
        bounce: 0,
        duration: 0.27,
      }}
      className="drawer"
    >
      <div className="drawer-content" ref={elementRef}>
        <AnimatePresence initial={false} mode="popLayout" custom={view}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, filter: "blur(2px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0)" }}
            exit={{
              opacity: 0,
              scale: 0.96,
              filter: "blur(2px)",
              transition: {
                opacity: { duration: 0.19, ease: [0.26, 0.08, 0.25, 1] },
                default: { duration: 0.27, ease: [0.26, 0.08, 0.25, 1] },
              },
            }}
            key={view}
            transition={{
              duration: 0.27,
              ease: [0.26, 0.08, 0.25, 1],
            }}
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FamilyDrawerComponent;`,
    hidden: false,
  },

  "/InitialView.tsx": {
    code: `import { X, Lock, NotepadText, TriangleAlert } from "lucide-react";

export default function InitialView({
  onViewKey,
  onViewRecovery,
  onRemoveWallet,
}: {
  onViewKey: () => void;
  onViewRecovery: () => void;
  onRemoveWallet: () => void;
}) {
  return (
    <div className="initial-wrapper">
      <div className="header">
        <p>Options</p>
        <div className="cross">
          <X size={16} strokeWidth={4} color="#999" />
        </div>
      </div>
      <div className="initial-divider"></div>
      <div className="initial-buttons-container">
        <button className="initial-button" onClick={onViewKey}>
          <Lock size={18} strokeWidth={2.65} color="#999" />
          View Private Key
        </button>
        <button className="initial-button" onClick={onViewRecovery}>
          <NotepadText size={18} strokeWidth={2} color="#999" />
          View Recovery Phrase
        </button>
        <button className="initial-button danger-button" onClick={onRemoveWallet}>
          <TriangleAlert size={18} strokeWidth={2} color="red" />
          Remove Wallet
        </button>
      </div>
    </div>
  );
}
`,
    hidden: false,
  },

  "/KeyView.tsx": {
    code: `import { Ban, FileKey2, RectangleEllipsis, ScanFace, ShieldCheck, X } from "lucide-react";

export default function KeyView({
  onCancel,
  onReveal,
}: {
  onCancel: () => void;
  onReveal: () => void;
}) {
  return (
    <div className="initial-wrapper">
      <div className="header" style={{ marginBottom: "8px", padding: 0 }}>
        <FileKey2 size={34} color="#999" style={{ transform: "translateY(3px)" }} />
        <div className="cross" onClick={onCancel}>
          <X size={16} strokeWidth={4} color="#999" />
        </div>
      </div>
      <p className="view-heading">Private Key</p>
      <p className="paragraph">
        Your Private Key is the key used to back up your wallet. Keep it secret and secure at all times.
      </p>
      <div className="initial-divider"></div>
      <ul className="list">
        <li>
          <ShieldCheck size={24} color="#999" />
          <p>Keep your private key safe</p>
        </li>
        <li>
          <RectangleEllipsis size={24} color="#999" />
          <p>Don't share it with anyone else</p>
        </li>
        <li>
          <Ban size={24} color="#999" />
          <p>If you loose it, we can't recover it</p>
        </li>
      </ul>
      <div className="action-container">
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
        <button className="reveal-button" onClick={onReveal}>
          <ScanFace size={20} strokeWidth={2.25} />
          Reveal
        </button>
      </div>
    </div>
  );
}
`,
    hidden: false,
  },

  "/RecoveryView.tsx": {
    code: `import { Ban, FileKey2, RectangleEllipsis, ScanFace, ShieldCheck, X } from "lucide-react";

export default function RecoveryView({
  onCancel,
  onReveal,
}: {
  onCancel: () => void;
  onReveal: () => void;
}) {
  return (
    <div className="initial-wrapper">
      <div className="header" style={{ marginBottom: "8px", padding: 0 }}>
        <FileKey2 size={34} color="#999" style={{ transform: "translateY(3px)" }} />
        <div className="cross" onClick={onCancel}>
          <X size={16} strokeWidth={4} color="#999" />
        </div>
      </div>
      <p className="view-heading">Secret Recovery Phrase</p>
      <p className="paragraph">
        Your Secret Recovery Phrase is the key used to back up your wallet. Keep it secret at all times.
      </p>
      <div className="initial-divider"></div>
      <ul className="list">
        <li>
          <ShieldCheck size={24} color="#999" />
          <p>Keep it safe</p>
        </li>
        <li>
          <RectangleEllipsis size={24} color="#999" />
          <p>Don't share it with anyone else</p>
        </li>
        <li>
          <Ban size={24} color="#999" />
          <p>If you loose it, we can't recover it</p>
        </li>
      </ul>
      <div className="action-container">
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
        <button className="reveal-button" onClick={onReveal}>
          <ScanFace size={20} strokeWidth={2.25} />
          Reveal
        </button>
      </div>
    </div>
  );
}
`,
    hidden: false,
  },
}

export default function DrawerSandpack1() {
  return (
    <Sandpack
      template="react-ts"
      theme={githubLight}
      files={files}
      customSetup={{
        dependencies: {
          react: "latest",
          "react-dom": "latest",
          motion: "latest",
          "react-use-measure": "latest",
          "lucide-react": "latest",
        },
      }}
      options={{
        showTabs: true,
        showNavigator: false,
        showConsole: false,
        editorHeight: 600,
        editorWidthPercentage: 60,
        autorun: true,
        recompileMode: "delayed",
        recompileDelay: 600,
        classes: {
          "sp-wrapper": "sandpack-margin",
        },
        visibleFiles: [
          "/FamilyDrawerComponent.tsx",
          "/InitialView.tsx",
          "/KeyView.tsx",
          "/RecoveryView.tsx",
          "/globals.css",
          "/App.tsx",
        ],
        activeFile: "/FamilyDrawerComponent.tsx",
      }}
    />
  )
}
