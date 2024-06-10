import type { MarkdownPost } from '../utils/posts';

import Fuse, { type FuseResult } from 'fuse.js';
import { createSignal, onMount, createEffect, on, For } from 'solid-js';
import { createStore, type SetStoreFunction } from 'solid-js/store';

type Post = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  publishDate: string;
  readingTime: string;
  slug: string;
};

type Tag = {
  id: string;
  selected: boolean;
};

enum Operator {
  And = ' ',
  Or = ' | ',
}

export function Search(props: { posts: MarkdownPost[]; query: string; tags: string[] }) {
  const [searchTerm, setSearchTerm] = createSignal<string>(props.query);
  const [tagFilter, setTagFilter] = createSignal<string[]>(props.tags);
  const [store, setStore] = createStore<{ posts: FuseResult<Post>[]; tags: Tag[] }>({
    posts: [],
    tags: [],
  });

  let fuse: Fuse<Post> | undefined;

  function search() {
    const query = searchTerm();
    const filter = getTagFilter();

    const textArgs = [
      { $path: ['title'], $val: query },
      { $path: ['description'], $val: query },
    ];

    const tagArgs = [{ $path: ['tags'], $val: filter }];

    const args: { [key: string]: any } = {};

    // if no search text or tag filter present -> inverse exact match to return all docs
    // fuse doesnt provide a native solution for this: https://github.com/krisk/Fuse/issues/229
    if (!query.length && !filter.length) {
      args['title'] = '!1234567890';
    }
    // if no tag filter is present -> OR search by text
    if (query.length && !filter.length) {
      args['$or'] = textArgs;
    }
    // if no search text present -> OR filter by tags
    if (!query.length && filter.length) {
      args['$or'] = tagArgs;
    }
    // if text and tags are present -> OR search by text + AND filter by tags
    if (query.length && filter.length) {
      args['$and'] = [{ $or: textArgs }, { $and: tagArgs }];
    }

    setStore('posts', fuse?.search(args) as FuseResult<Post>[]);
  }

  function getTagFilter() {
    const mapped = tagFilter().map((entry) => (entry.includes(' ') ? `="${entry}"` : `=${entry}`));
    return mapped.join(Operator.Or);
  }

  function setUrlParams() {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const query = searchTerm();

    query.length ? params.set('q', query) : params.delete('q');

    params.delete('tags');
    for (const tag of tagFilter()) {
      params.append('tags', tag);
    }

    let replacement = `${url.pathname}${params.size ? '?' : ''}${params}`;
    window.history.replaceState({}, '', replacement);
  }

  function setupFuse(posts: Post[]) {
    const options = {
      keys: ['title', 'description', 'tags'],
      useExtendedSearch: true,
      ignoreFieldNorm: true,
      minMatchCharLength: 1,
      distance: 160,
      threshold: 0.6,
    };

    fuse = new Fuse(posts, options);
  }

  onMount(() => {
    const posts: Post[] = [];
    for (const post of props.posts) {
      posts.push({
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        image: post.frontmatter.image,
        tags: post.frontmatter.tags.split(',').map((tag: string) => tag.trim()),
        publishDate: post.frontmatter.publishDate,
        readingTime: post.readingTime || '',
        slug: post.slug || '',
      });
    }
    setupFuse(posts);

    const allTags: string[][] = posts.map((entry) => entry.tags);
    const flattened = allTags.reduce((acc, curr) => acc.concat(curr), []);
    const unique = Array.from(new Set(flattened));
    const sorted = unique.sort((a, b) => (a !== b ? (a < b ? -1 : 1) : 0));
    const mappedTags = sorted.map((tag) => ({
      id: tag,
      selected: props.tags.includes(tag),
    }));

    setStore('tags', mappedTags);
  });

  createEffect(() => {
    const activeTags = store.tags.filter((tag) => tag.selected);
    setTagFilter(activeTags.map((tag) => tag.id));
  });

  createEffect(
    on([tagFilter, searchTerm], () => {
      setUrlParams();
      search();
    }),
  );

  return (
    <>
      <input
        type='text'
        id='search'
        value={searchTerm()}
        onInput={(e) => setSearchTerm(e.target.value)}
        class='py-1.5 px-4 bg-[color:var(--background)] outline-none ring-1 ring-[color:var(--muted)] focus:ring-[color:var(--text-secondary)] outline-1 rounded-md h-10 w-full placeholder:text-[color:var(--text-muted)]'
        placeholder={`${props.posts[Math.floor(Math.random() * props.posts.length)].frontmatter.title}...`}
      />

      <div class='mt-4 flex flex-wrap gap-3'>
        <For each={store.tags}>
          {(tag) => {
            return <Tag tag={tag} setStore={setStore} />;
          }}
        </For>
      </div>

      <div class='mt-6'>
        <For each={store.posts}>
          {({ item }) => {
            return (
              <>
                <Post post={item} />
              </>
            );
          }}
        </For>
      </div>
    </>
  );
}

function Post(props: { post: Post }) {
  const { title, description, image, publishDate, slug, readingTime } = props.post;
  return (
    <a href={`posts/${slug}`}>
      <div class='flex bg-[color:var(--foreground)] rounded-md p-2 mb-4'>
        <figure class='bg-black hidden m-1 sm:flex flex-[0_0_100px] items-center justify-center rounded-md'>
          <img class='max-w-full' src={`./src/data/posts/hello-world/${image}`} />
        </figure>
        <div class='m-2'>
          <h3 class='font-normal'>{title}</h3>
          <p class='text-sm text-[color:var(--text-secondary)]'>{description}</p>
          <div>
            <span class='text-left mr-4 text-[color:var(--text-secondary)] text-xs'>
              {publishDate} — {readingTime}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

function Tag(props: { tag: Tag; setStore: SetStoreFunction<{ tags: Tag[] }> }) {
  function toggle(id: string) {
    props.setStore(
      'tags',
      (tag: Tag) => tag.id === id,
      'selected',
      (selected: boolean) => !selected,
    );
  }

  return (
    <div
      onClick={(e) => toggle(e.target.id)}
      id={props.tag.id}
      class={
        props.tag.selected
          ? 'bg-[color:var(--primary-color)] text-white py-1 px-2 rounded-md cursor-pointer text-lg'
          : 'bg-[color:var(--foreground)] py-1 px-2 rounded-md cursor-pointer text-lg'
      }
    >
      {props.tag.id.replace('-', ' ')}
    </div>
  );
}

export default Search;
