const linkSvg = ` 
<svg 
    xmlns="http://www.w3.org/2000/svg" 
    class="inline-block h-6 w-6 absolute bottom-0 -left-6 top-1.5" 
    aria-hidden="true" 
    focusable="false" 
    viewBox="0 0 24 24" 
    stroke-width="1" stroke="currentColor" 
    fill="none" 
    stroke-linecap="round" 
    stroke-linejoin="round">
        <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z">
</svg>
`;

// https://github.com/itaydafna/itaydafna.dev/blob/main/src/utils/anchorHeadings.ts
export function applyAnchorHeadings() {
  const anchorHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

  [...anchorHeadings]
    .filter((heading: Element) => heading.id !== 'table-of-contents' && heading.id !== 'post-title')
    .forEach((heading) => {
      console.log(heading);
      const anchor = document.createElement('a');
      anchor.className = 'group relative cursor-pointer';
      anchor.href = `#${heading.id}`;
      heading.parentNode!.insertBefore(anchor, heading);

      const linkIconWrapper = document.createElement('div');
      linkIconWrapper.className = 'hidden group-hover:block';

      linkIconWrapper.innerHTML = linkSvg;
      anchor.appendChild(linkIconWrapper);
      anchor.appendChild(heading);
    });
}

// https://github.com/itaydafna/itaydafna.dev/blob/main/src/utils/applyBlogScrollToTop.ts
export function applyScrollToTop() {
  const scrollBtn = document.getElementById('to-top-btn') as HTMLButtonElement;
  const targetHeader = document.getElementById('page-header') as HTMLDivElement;

  function callback(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      scrollBtn.dataset.show = (!entry.isIntersecting).toString();
    });
  }

  scrollBtn.addEventListener('click', () => {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const observer = new IntersectionObserver(callback);
  observer.observe(targetHeader);
}
