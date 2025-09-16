import { createEffect, createResource, createSignal, on, onCleanup, onMount } from 'solid-js';
import type Engine from '../lib/three';
import type { GeoJson } from '../lib/three';

const loadThreeJS = async () => {
  const [Engine, geojsonResponse] = await Promise.all([
    import('../lib/three').then((m) => m.default),
    fetch('/world.json').then((response) => response.json() as unknown as GeoJson),
  ]);
  return { Engine, geojson: geojsonResponse };
};

function GlobeAsync() {
  const [size, setSize] = createSignal<[number, number]>([0, 0]);
  const [threeResources] = createResource(loadThreeJS);
  const [engine, setEngine] = createSignal<Engine | null>(null);

  createEffect(on(size, () => engine()?.resize(...size())));

  createEffect(async () => {
    const resources = threeResources();
    if (resources) {
      const three = new resources.Engine();
      setEngine(three);

      const container = document.getElementById('globe') as HTMLElement;
      three.resize(container.offsetHeight, container.offsetWidth);

      const curtain = document.getElementById('curtain') as HTMLElement;
      await three.init(
        resources.geojson,
        document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light',
        curtain,
      );
    }
  });

  onMount(() => {
    const container = document.getElementById('globe') as HTMLElement;
    if (!container) return;

    window.addEventListener('resize', () => {
      setSize([container.offsetHeight, container.offsetWidth]);
    });

    const observer = new MutationObserver((mutations) => {
      const three = engine();
      if (three) {
        mutations.forEach(({ target }) => {
          three.setTheme(target instanceof HTMLElement && target.classList.contains('theme-dark') ? 'dark' : 'light');
        });
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  });

  onCleanup(() => engine()?.stop());

  return (
    <>
      <div id='curtain' class='absolute pointer-events-none z-10 w-full h-full bg-[color:var(--background)]'></div>
      {engine()?.canvas()}
    </>
  );
}

export default GlobeAsync;
