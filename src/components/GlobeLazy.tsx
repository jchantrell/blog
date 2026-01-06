import { createSignal, lazy, onMount, Show, Suspense } from 'solid-js';

const Globe = lazy(() => import('./Globe'));

function GlobeLazy() {
  const [shouldLoad, setShouldLoad] = createSignal(false);

  onMount(() => {
    const container = document.getElementById('globe');
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();

            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = '/world.json';
            document.head.appendChild(link);
          }
        });
      },
      {
        rootMargin: '200px',
        threshold: 0.01,
      },
    );
    observer.observe(container);

    return () => observer.disconnect();
  });

  return (
    <Show when={shouldLoad()}>
      <Suspense>
        <Globe />
      </Suspense>
    </Show>
  );
}

export default GlobeLazy;
