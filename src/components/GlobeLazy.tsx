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
            setTimeout(() => {
              setShouldLoad(true);
            }, 500);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
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
