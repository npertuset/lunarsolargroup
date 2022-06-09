import { createRoot } from "react-dom/client";
import React from "react";
import { Menu } from "./Components/Menu";

const container = document.getElementById("react-menu");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Menu tab="home" />);
