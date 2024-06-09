import { createEffect, createSignal, on, onCleanup, onMount } from 'solid-js';
import Engine from '../utils/three';
import geojson from '../../public/world.json';

function Globe() {
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
    engine.init(geojson, document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light', curtain);
  });

  onCleanup(() => {
    engine.stop();
  });

  return (
    <>
      <div id='curtain' class='absolute pointer-events-none z-10 w-full h-full bg-[color:var(--background)]'></div>
      {engine.canvas()}
    </>
  );
}

export default Globe;
