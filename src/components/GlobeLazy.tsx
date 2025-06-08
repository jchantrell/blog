import { lazy } from 'solid-js';

const Globe = lazy(async () => import('./Globe'));

function GlobeLazy() {
  return <Globe />;
}

export default GlobeLazy;
