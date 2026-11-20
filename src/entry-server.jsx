// Build-time entry: renders the page to static HTML so search engines and AI
// crawlers that do not run JavaScript still receive the full content.
// Used by scripts/prerender.mjs; the browser keeps using main.jsx.
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

export function render() {
  return renderToString(<App />);
}
