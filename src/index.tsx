/** Импортировать стили так, чтобы сначал шли стили бутстрапа, пакетов,
 потом сначала custom.css, а после - index.css */
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { createRoot } from "react-dom/client";
import { App } from "./components/App/App";

const root = createRoot(document.getElementById("root") as Element);
root.render(<App />);
