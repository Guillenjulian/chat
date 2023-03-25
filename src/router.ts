import { Router } from "@vaadin/router";
import "./pages/welcome";
import "./pages/chat";

import "./componetes/header";
import "./componetes/footer";
import "./componetes/form";
import "./componetes/title-chat";
import "./componetes/form-welcome";

const router = new Router(document.querySelector(".root"));

const routes = [
  { path: "/", component: "welcome-pages" },
  { path: "/chat", component: "chat-page" },
];
//console.log(routes);

router.setRoutes(routes);
