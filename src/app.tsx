import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense, onMount } from 'solid-js';
import { MetaProvider, Link } from '@solidjs/meta';
import Nav from '~/components/home/Nav';
import { initTheme } from '~/lib/theme';
import { AuthProvider } from '~/lib/auth';
import './app.css';
// @ts-ignore
import Lenis from '@studio-freight/lenis';

declare global {
  interface Window {
    lenis: Lenis;
  }
}

export default function App() {
  onMount(() => {
    const lenis = new Lenis();
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    initTheme();
  });

  return (
    <MetaProvider>
      <AuthProvider>
        <Router
          root={(props) => {
            const location = props.location;
            const isBlog = () => location.pathname.startsWith('/blog');

            return (
              <>
                {!isBlog() && !location.pathname.startsWith('/dashboard') && (
                  <Nav />
                )}
                <Suspense>{props.children}</Suspense>
              </>
            );
          }}
        >
          <FileRoutes />
        </Router>
      </AuthProvider>
    </MetaProvider>
  );
}
