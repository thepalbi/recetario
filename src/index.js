import m from "mithril";
import Home from "./pages/Home";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

m.route(document.body, "/", {
  "/": new Home(),
});