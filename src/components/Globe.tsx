import { Suspense, createEffect, createResource, createSignal, on, onMount } from 'solid-js';
import Engine from '../utils/three';

const engine = new Engine();

function Globe(props: { ip: string; geojson: { features: object[] } }) {
  const [location] = createResource(props.ip, fetchLocation);
  const [size, setSize] = createSignal<[number, number]>([0, 0]);

  onMount(() => {
    const container = document.getElementById('globe') as HTMLElement;
    window.addEventListener('resize', () => {
      setSize([container.offsetHeight, container.offsetWidth]);
    });
    setSize([container.offsetHeight, container.offsetWidth]);
  });

  createEffect(on(size, () => engine.resize(...size())));

  createEffect(
    on(
      location,
      () => {
        engine.init([location()], props.geojson);
      },
      { defer: true },
    ),
  );

  return <Suspense>{engine.canvas()}</Suspense>;
}

async function fetchLocation(ip: string) {
  const response = await fetch(`https://ipapi.co/${ip}/json/`);
  return response.json();
}

export default Globe;
