import { createEffect, createSignal, on, onMount, type Setter } from 'solid-js';

export function Theme() {
  const [theme, setTheme] = createSignal('');

  const root = typeof document !== 'undefined' ? document.documentElement : null;

  onMount(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme') || '');
    } else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  });

  createEffect(
    on(theme, () => {
      if (root && theme() === 'light') {
        root.classList.remove('theme-dark');
      } else if (root && theme() === 'dark') {
        root.classList.add('theme-dark');
      }
      localStorage.setItem('theme', theme());
    }),
  );

  return <>{theme() === 'dark' ? <LightIcon setTheme={setTheme} /> : <DarkIcon setTheme={setTheme} />}</>;
}

function LightIcon(props: { setTheme: Setter<string> }) {
  return (
    <svg
      onKeyDown={({ ctrlKey, shiftKey, key }) => {
        if (ctrlKey && shiftKey && key === 'L') props.setTheme('light');
      }}
      onClick={() => props.setTheme('light')}
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='currentColor'
      class='cursor-pointer'
    >
      <path
        fill-rule='evenodd'
        d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
        clip-rule='evenodd'
      />
    </svg>
  );
}

function DarkIcon(props: { setTheme: Setter<string> }) {
  return (
    <svg
      onKeyDown={({ ctrlKey, shiftKey, key }) => {
        if (ctrlKey && shiftKey && key === 'L') props.setTheme('dark');
      }}
      onClick={() => props.setTheme('dark')}
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='currentColor'
      class='cursor-pointer'
    >
      <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
    </svg>
  );
}

export default Theme;
