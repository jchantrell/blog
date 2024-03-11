import { Suspense, lazy } from 'solid-js';
import type { GeoJson } from '../utils/three';

const Globe = lazy(async () => {
  return import('./Globe');
});

function GlobeLazy(props: { geojson: GeoJson }) {
  return (
    <Suspense>
      <Globe geojson={props.geojson} />
    </Suspense>
  );
}

export default GlobeLazy;
