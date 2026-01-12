import siteData from '~/data/site.json';
import { onMount, onCleanup } from 'solid-js';
import { Title } from '@solidjs/meta';
import { animate } from 'motion';
import Hero from '~/components/Hero';
import Manifesto from '~/components/Manifesto';
import SelectedWorks from '~/components/SelectedWorks';
import TechStack from '~/components/TechStack';
import ContactCta from '~/components/ContactCta';
import Footer from '~/components/Footer';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      reveal: boolean;
    }
  }
}

function reveal(el: HTMLElement) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(50px)';

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target, { opacity: 1, transform: 'translateY(0px)' }, {
            duration: 1.2,
            easing: [0.16, 1, 0.3, 1]
          } as any);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(el);
  onCleanup(() => observer.disconnect());
}

export default function Home() {
  return (
    <main class="w-full relative min-h-screen bg-background">
      <Title>{siteData.title}</Title>

      <Hero />

      <div use:reveal>
        <Manifesto />
      </div>

      <div use:reveal>
        <SelectedWorks />
      </div>

      <div use:reveal>
        <TechStack />
      </div>

      <div use:reveal>
        <ContactCta />
      </div>

      <div use:reveal>
        <Footer />
      </div>
    </main>
  );
}
