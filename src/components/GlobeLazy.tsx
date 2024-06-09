import { Suspense, lazy } from 'solid-js';

const Globe = lazy(async () => {
  return import('./Globe');
});

function GlobeLazy() {
  return (
    <Suspense>
      <Globe />
    </Suspense>
  );
}

export default GlobeLazy;
