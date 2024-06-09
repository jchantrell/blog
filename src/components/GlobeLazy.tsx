import { Suspense, lazy } from 'solid-js';
import type { GeoJson } from '../utils/three';

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
