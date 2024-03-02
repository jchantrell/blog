import Fuse from 'fuse.js';
import { createSignal, onMount, For } from 'solid-js';
import { createStore } from 'solid-js/store';

type PostGlob = {
  frontmatter: {
    title: string;
    tags: string;
    description: string;
    publishDate: string;
  };
  file: string;
};

const options = {
  keys: [
    'frontmatter.title',
    'frontmatter.description',
    'frontmatter.slug',
    'frontmatter.tags',
  ],
  includeMatches: true,
  minMatchCharLength: 1,
  threshold: 0.5,
};

export function Search(props: { posts: PostGlob[]; query: string }) {
  const [searchTerm, setSearchTerm] = createSignal(props.query);
  const [filteredPosts, setFilteredPosts] = createStore([]);

  const fuse = new Fuse(props.posts, options);

  function handleInput(value: string) {
    setSearchTerm(value);
    searchPosts();
    handleUrlParams();
  }

  function handleUrlParams() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set('q', searchTerm());

    let replacement = searchTerm().length
      ? `${url.pathname}?${params}`
      : url.pathname;
    window.history.replaceState({}, '', replacement);
  }

  function searchPosts() {
    setFilteredPosts(fuse.search(searchTerm()));
  }

  const allTags = props.posts.map((post) =>
    post.frontmatter.tags.split(',').map((entry) => entry.trim()),
  );
  const flattened = allTags.reduce((acc, curr) => acc.concat(curr), []);
  const unique = Array.from(new Set(flattened));
  const sorted = unique.sort((a, b) => (a !== b ? (a < b ? -1 : 1) : 0));

  onMount(() => {
    searchPosts();
  });

  return (
    <>
      <input
        type='text'
        id='search'
        value={searchTerm()}
        onInput={(e) => handleInput(e.target.value)}
        class='py-1.5 px-4 bg-[color:var(--background)] outline-none ring-1 ring-[color:var(--secondary-color)] focus:ring-[color:var(--text-secondary)] outline-1 rounded-md h-10 w-full placeholder:text-stone-500'
        placeholder={`${props.posts[Math.floor(Math.random() * props.posts.length)].frontmatter.title}...`}
      />

      {/* should be collapsible */}
      <div class='mt-4 flex flex-wrap gap-3'>
        {sorted.map((entry) => {
          return (
            <div class='bg-[color:var(--secondary-color)] py-1 px-2 rounded-md cursor-pointer text-lg'>
              {entry.replace(/-/g, ' ')}
            </div>
          );
        })}
      </div>

      <ul>
        <For each={filteredPosts}>
          {(post) => {
            console.log(post.item);
            const {
              item: {
                frontmatter: { title, description, publishDate },
              },
            } = post;
            return (
              <Post
                title={title}
                description={description}
                publishDate={publishDate}
              />
            );
          }}
        </For>
      </ul>
    </>
  );
}

function Post(props: {
  title: string;
  description: string;
  publishDate: string;
}) {
  const { title, description, publishDate } = props;
  return (
    <div>
      <h3 class='font-sans font-bold underline'>
        <a href='abc'>{title}</a>
      </h3>
      <p>{description}</p>
      <div class='font-bold'>
        <span class='text-left mr-4 uppercase text-[color:var(--text-secondary)]'>
          — {publishDate}
        </span>
      </div>
    </div>
  );
}

export default Search;
