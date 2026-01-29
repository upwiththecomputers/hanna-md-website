import { Hono } from "hono";
import { Layout } from "./layout.tsx";
import { HomePage } from "./pages/home.tsx";

const app = new Hono();

app.get("/", (c) => {
  const page = Layout({
    children: HomePage(),
  });
  return c.html(page);
});

export default app;
