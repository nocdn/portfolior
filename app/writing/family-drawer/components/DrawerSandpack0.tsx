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
import "./styles.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);`,
    hidden: true,
  },

  "/styles.css": `
:root {
  --gray-200: #e5e7eb;
  --text-strong: #222222;
}

* { box-sizing: border-box; }
html, body { margin: 0; }
body {
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
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
  width: 20rem;
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

/* Optional: code text just looks nicer with antialias */
.muted { color: rgba(107, 114, 128, 0.7); }
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

  "/FamilyDrawerComponent.tsx": `"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import useMeasure from "react-use-measure";

const FamilyDrawerComponent = () => {
  const [view, setView] = useState(0);
  const [elementRef, bounds] = useMeasure();

  const options = [
    <div className="stack" key={0}>
      <p className="section-title">Private Key</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
        dolorem fugit consequatur sint necessitatibus natus deserunt? Impedit
        deleniti libero necessitatibus, fuga officiis autem consectetur.
        Accusantium magnam dolorum repellat, quo iure dolore. Libero
        necessitatibus consequuntur quos culpa hic maiores illo amet?
      </p>
      <button
        className="btn"
        onClick={() =>
          setView((currentView) => (currentView + 1) % options.length)
        }
      >
        Show Recovery Phrase
      </button>
    </div>,
    <div className="stack" key={1}>
      <p className="section-title">Secret Recovery Phrase</p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid sint
        molestiae maxime harum ea nisi corporis a eligendi dolor illo eveniet
        doloremque aperiam est, ratione et officia consequuntur, atque error
        aut! Magni accusantium deleniti, eius laboriosam nihil sunt. Corporis
        iusto doloremque ex explicabo commodi earum, nobis, aperiam fuga
        repellendus soluta eos ipsum? Numquam sit vero aspernatur totam, quaerat
        reprehenderit repellendus?
      </p>
      <button
        className="btn"
        onClick={() =>
          setView((currentView) => (currentView + 1) % options.length)
        }
      >
        Show Private Key
      </button>
    </div>,
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
}

export default function DrawerSandpack0() {
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
        },
      }}
      options={{
        showTabs: true,
        showNavigator: false,
        showConsole: false,
        editorHeight: 520,
        editorWidthPercentage: 60,
        autorun: true,
        recompileMode: "delayed",
        recompileDelay: 600,
        classes: {
          "sp-wrapper": "sandpack-margin",
        },
        visibleFiles: ["/FamilyDrawerComponent.tsx", "/styles.css", "/App.tsx"],
        activeFile: "/FamilyDrawerComponent.tsx",
      }}
    />
  )
}
