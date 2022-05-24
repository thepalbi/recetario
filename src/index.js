import m from "mithril";
import Home from "./pages/Home"

m.route(document.body, "/", {
  "/": Home,
});