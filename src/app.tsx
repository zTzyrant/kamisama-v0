import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, onMount } from "solid-js";
import { MetaProvider, Link } from "@solidjs/meta";
import Nav from "~/components/Nav";
import "./app.css";
// @ts-ignore
import Lenis from "@studio-freight/lenis";

export default function App() {
  onMount(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <MetaProvider>
      <Link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Inter:wght@400;600&display=swap"
        rel="stylesheet"
      />
      <Router
        root={(props) => {
          const location = props.location;
          const isBlog = () => location.pathname.startsWith("/blog");

          return (
            <>
              {!isBlog() && <Nav />}
              <Suspense>{props.children}</Suspense>
            </>
          );
        }}
      >
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}
