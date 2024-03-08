import { Suspense, createEffect, createSignal, on, onCleanup, onMount } from 'solid-js';
import Engine, { type GeoJson } from '../utils/three';

function Globe(props: { geojson: GeoJson }) {
  const [size, setSize] = createSignal<[number, number]>([0, 0]);

  const engine = new Engine();

  createEffect(on(size, () => engine.resize(...size())));

  onMount(() => {
    const container = document.getElementById('globe') as HTMLElement;
    setSize([container.offsetHeight, container.offsetWidth]);
    window.addEventListener('resize', () => {
      setSize([container.offsetHeight, container.offsetWidth]);
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(({ target }) => {
        if (target instanceof HTMLElement && target.classList.contains('theme-dark')) {
          engine.setTheme('dark');
        } else engine.setTheme('light');
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const curtain = document.getElementById('curtain') as HTMLElement;
    engine.init(props.geojson, document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light', curtain);
  });

  onCleanup(() => {
    engine.stop();
  });

  return (
    <Suspense>
      <div id='curtain' class='absolute pointer-events-none z-10 w-full h-full bg-[color:var(--background)]'></div>
      {engine.canvas()}
    </Suspense>
  );
}

export default Globe;
