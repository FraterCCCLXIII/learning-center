const REQUIRED_HOST_API = "1";
const PAGE_ID = "center";
const PAGE_PATH = "center";
const STORAGE_PREFIX = "openhands-app:learning-center";
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const GITHUB_OWNER_PATTERN =
  /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/;
const GITHUB_REPO_PATTERN = /^[A-Za-z0-9._-]{1,100}$/;
const GIT_REF_PATTERN = /^[A-Za-z0-9._/-]{1,200}$/;
const PATH_SEGMENT_PATTERN = /^[A-Za-z0-9._-]+$/;

const STYLE = `
.oh-learning-center {
  --lc-pad: clamp(1rem, 3.2vw, 3rem);
  box-sizing: border-box;
  min-height: 100%;
  color: var(--oh-foreground, var(--oh-text-primary, #f4f5f7));
  background: var(--oh-color-base, #111318);
  font-family: inherit;
  line-height: 1.5;
}
.oh-learning-center *,
.oh-learning-center *::before,
.oh-learning-center *::after { box-sizing: border-box; }
.oh-learning-center a {
  color: inherit;
  text-decoration-color: color-mix(in srgb, var(--oh-accent, #c9b974) 55%, transparent);
}
.oh-learning-center :focus-visible {
  outline: 2px solid var(--oh-focus, #fff);
  outline-offset: 3px;
}
.oh-lc-topbar {
  position: sticky;
  top: 0;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem var(--lc-pad);
  background: linear-gradient(
    180deg,
    var(--oh-color-base, #111318) 0%,
    color-mix(in srgb, var(--oh-color-base, #111318) 82%, transparent) 70%,
    transparent 100%
  );
}
.oh-lc-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  appearance: none;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  padding: 0;
}
.oh-lc-mark {
  display: grid;
  place-items: center;
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 0.35rem;
  background: var(--oh-accent, #c9b974);
  color: var(--oh-accent-foreground, #111318);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}
.oh-lc-brand-name {
  font-size: 0.95rem;
  font-weight: 750;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--oh-accent, #c9b974);
}
.oh-lc-hero {
  position: relative;
  min-height: min(68vh, 36rem);
  padding: 6.5rem var(--lc-pad) 4.5rem;
  overflow: hidden;
  isolation: isolate;
}
.oh-lc-hero-art {
  position: absolute;
  inset: 0;
  z-index: -2;
}
.oh-lc-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(90deg, var(--oh-color-base, #111318) 8%, transparent 62%),
    linear-gradient(180deg, transparent 42%, var(--oh-color-base, #111318) 96%);
}
.oh-lc-kicker {
  margin: 0 0 0.7rem;
  color: var(--oh-accent, #c9b974);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.oh-lc-title {
  margin: 0;
  max-width: 14ch;
  font-size: clamp(2.2rem, 6vw, 4.4rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.035em;
}
.oh-lc-lead {
  margin: 1rem 0 0;
  max-width: 36rem;
  color: var(--oh-text-secondary, #d0d3da);
  font-size: 1.02rem;
}
.oh-lc-actions { display: flex; flex-wrap: wrap; gap: 0.7rem; margin-top: 1.4rem; }
.oh-lc-button {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 2.6rem;
  padding: 0.55rem 1.15rem;
  border: 1px solid transparent;
  border-radius: var(--oh-radius, 8px);
  background: var(--oh-surface-raised, #1b1e26);
  color: inherit;
  font: inherit;
  font-weight: 650;
  cursor: pointer;
}
.oh-lc-button:hover {
  background: var(--oh-interactive-hover, #3a404c);
}
.oh-lc-button--primary {
  background: var(--oh-accent, #c9b974);
  color: var(--oh-accent-foreground, #111318);
}
.oh-lc-button--primary:hover {
  filter: brightness(1.06);
  background: var(--oh-accent, #c9b974);
}
.oh-lc-button--ghost {
  background: color-mix(in srgb, var(--oh-foreground, #fff) 10%, transparent);
  border-color: color-mix(in srgb, var(--oh-foreground, #fff) 18%, transparent);
}
.oh-lc-browse { padding: 0 0 3.5rem; }
.oh-lc-row { margin-top: 0.35rem; }
.oh-lc-row-title {
  margin: 0 0 0.7rem;
  padding: 0 var(--lc-pad);
  font-size: 1.15rem;
  font-weight: 700;
}
.oh-lc-rail-wrap { position: relative; }
.oh-lc-rail {
  display: flex;
  gap: 0.7rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 0.35rem var(--lc-pad) 1.15rem;
  scrollbar-color: var(--oh-scrollbar, transparent) transparent;
}
.oh-lc-rail-btn {
  position: absolute;
  top: 0.35rem;
  bottom: 1.15rem;
  z-index: 2;
  width: 2.4rem;
  border: 0;
  background: color-mix(in srgb, var(--oh-color-base, #111318) 72%, transparent);
  color: inherit;
  cursor: pointer;
  font: inherit;
  font-size: 1.4rem;
}
.oh-lc-rail-btn:hover { background: color-mix(in srgb, var(--oh-color-base, #111318) 88%, transparent); }
.oh-lc-rail-btn--prev { left: 0; }
.oh-lc-rail-btn--next { right: 0; }
.oh-lc-tile {
  appearance: none;
  flex: 0 0 min(72vw, 17.5rem);
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  padding: 0;
  border: 0;
  border-radius: 0.45rem;
  background: var(--oh-surface, #171a20);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  transform-origin: center bottom;
  transition: transform 160ms ease, box-shadow 160ms ease;
}
.oh-lc-tile:hover,
.oh-lc-tile:focus-visible {
  transform: scale(1.06);
  z-index: 1;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.38);
}
.oh-lc-poster {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.oh-lc-poster-label {
  position: absolute;
  right: 0.7rem;
  bottom: 0.55rem;
  font-size: clamp(2.4rem, 6vw, 3.4rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  color: color-mix(in srgb, var(--oh-foreground, #fff) 88%, var(--oh-accent, #c9b974));
  text-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
}
.oh-lc-tile-copy { padding: 0.7rem 0.8rem 0.9rem; }
.oh-lc-tile-copy h2,
.oh-lc-tile-copy h3 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
}
.oh-lc-meta {
  margin: 0.28rem 0 0;
  color: var(--oh-muted, #9aa0ad);
  font-size: 0.8rem;
}
.oh-lc-badge-row { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.45rem; }
.oh-lc-badge {
  display: inline-flex;
  padding: 0.12rem 0.42rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--oh-accent, #c9b974) 14%, transparent);
  color: var(--oh-accent, #c9b974);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.oh-lc-source {
  margin: -2.4rem 0 0;
  padding: 0 var(--lc-pad) 0.4rem;
  color: var(--oh-text-dim, #7d8492);
  font-size: 0.8rem;
}
.oh-lc-page {
  padding: 0 var(--lc-pad) 3.5rem;
}
.oh-lc-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.4rem 0 1.4rem;
}
.oh-lc-header .oh-lc-title {
  max-width: 18ch;
  font-size: clamp(1.8rem, 4vw, 3rem);
}
.oh-lc-crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
  margin: 0.4rem 0 0.8rem;
  padding: 0;
  list-style: none;
  color: var(--oh-text-subtle, #6b7280);
  font-size: 0.86rem;
}
.oh-lc-crumbs li:not(:last-child)::after {
  content: "›";
  margin-left: 0.45rem;
  color: var(--oh-text-dim, #7d8492);
}
.oh-lc-crumbs button {
  appearance: none;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  padding: 0;
}
.oh-lc-crumbs button:hover { color: var(--oh-foreground, #fff); }
.oh-lc-episodes {
  display: grid;
  gap: 0.65rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.oh-lc-episode {
  appearance: none;
  display: grid;
  grid-template-columns: 2.2rem minmax(7.5rem, 11rem) 1fr;
  gap: 0.9rem;
  align-items: center;
  width: 100%;
  padding: 0.55rem;
  border: 0;
  border-radius: 0.55rem;
  background: var(--oh-surface, #171a20);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.oh-lc-episode:hover { background: var(--oh-interactive-active, #232833); }
.oh-lc-episode-num {
  color: var(--oh-text-dim, #7d8492);
  font-size: 1.15rem;
  font-weight: 750;
  text-align: center;
}
.oh-lc-episode .oh-lc-poster { border-radius: 0.3rem; }
.oh-lc-episode h3 { margin: 0; font-size: 0.98rem; font-weight: 700; }
.oh-lc-status {
  margin: 1.5rem var(--lc-pad);
  padding: 1rem 1.1rem;
  border-radius: var(--oh-radius, 8px);
  background: var(--oh-surface, #171a20);
  border: 1px solid var(--oh-border, #3a404c);
}
.oh-lc-status[data-tone="error"] {
  border-color: color-mix(in srgb, var(--oh-danger, #e76a5e) 55%, transparent);
}
.oh-lc-article,
.oh-lc-video { max-width: 56rem; }
.oh-lc-md > * + * { margin-top: 0.9rem; }
.oh-lc-md h1,
.oh-lc-md h2,
.oh-lc-md h3 { margin: 1.4rem 0 0.55rem; line-height: 1.25; }
.oh-lc-md pre,
.oh-lc-md code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.9em;
}
.oh-lc-md pre {
  overflow: auto;
  padding: 0.85rem 1rem;
  border-radius: var(--oh-radius, 8px);
  background: var(--oh-surface-raised, #1b1e26);
}
.oh-lc-md :not(pre) > code {
  padding: 0.1rem 0.3rem;
  border-radius: 0.3rem;
  background: var(--oh-surface-raised, #1b1e26);
}
.oh-lc-player {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 0.45rem;
  overflow: hidden;
  background: #000;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}
.oh-lc-player iframe,
.oh-lc-player video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.oh-lc-form {
  display: grid;
  gap: 0.85rem;
  max-width: 32rem;
}
.oh-lc-field { display: grid; gap: 0.3rem; }
.oh-lc-field input {
  width: 100%;
  padding: 0.55rem 0.7rem;
  border-radius: var(--oh-field-radius, 8px);
  border: 1px solid var(--oh-border-input, #3a404c);
  background: var(--oh-surface, #171a20);
  color: inherit;
  font: inherit;
}
.oh-lc-footnote {
  padding: 0 var(--lc-pad);
  color: var(--oh-text-dim, #7d8492);
  font-size: 0.75rem;
}
@media (max-width: 720px) {
  .oh-lc-hero { min-height: auto; padding-top: 5.2rem; }
  .oh-lc-title { max-width: none; }
  .oh-lc-tile { flex-basis: min(78vw, 15.5rem); }
  .oh-lc-episode { grid-template-columns: 1.6rem minmax(6rem, 8.5rem) 1fr; }
  .oh-lc-rail-btn { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .oh-learning-center * { transition: none !important; }
  .oh-lc-tile:hover,
  .oh-lc-tile:focus-visible { transform: none; }
}
`;

const FALLBACK_CATALOG = {
  title: "OpenHands Learning Center",
  description:
    "Sample courses that ship with the App. Connect a GitHub catalog to replace them with your own articles and videos.",
  courses: [
    {
      id: "getting-started",
      title: "Getting started with Agent Canvas",
      description:
        "Learn what Agent Canvas is and how a first conversation works.",
      level: "beginner",
      lessons: [
        {
          id: "welcome",
          title: "Welcome to Agent Canvas",
          kind: "article",
          description: "What the product is and what this Learning Center covers.",
          body: [
            "# Welcome to Agent Canvas",
            "",
            "Agent Canvas is the control center for OpenHands. It is where you start conversations, inspect files, manage backends, and install Apps that add their own pages to the product.",
            "",
            "This Learning Center is one of those Apps. It adds a page where people can take courses made of articles and videos.",
            "",
            "## What you will find here",
            "",
            "- **Articles** are Markdown files in a catalog repository.",
            "- **Videos** are YouTube, Vimeo, or direct media URLs listed in that same catalog.",
            "- The App fetches `catalog.json` from the repository you configure, then loads each lesson on demand.",
          ].join("\n"),
        },
        {
          id: "first-conversation",
          title: "Start your first conversation",
          kind: "article",
          description: "Create a thread, pick a workspace, and send a first task.",
          body: [
            "# Start your first conversation",
            "",
            "A conversation is a thread between you and the agent against a workspace.",
            "",
            "1. Open **New Chat** from the sidebar.",
            "2. Choose a local workspace or a connected repository.",
            "3. Describe the outcome you want, not the exact commands.",
            "4. Watch the agent use tools, then review the files and terminal output it produces.",
          ].join("\n"),
        },
      ],
    },
    {
      id: "authoring-catalogs",
      title: "Publish your own catalog",
      description:
        "Add article and video courses by publishing a catalog.json in a GitHub repository.",
      level: "intermediate",
      lessons: [
        {
          id: "catalog-format",
          title: "Catalog format",
          kind: "article",
          description: "The JSON shape the Learning Center fetches from your repo.",
          body: [
            "# Catalog format",
            "",
            "Publish a `catalog.json` file at the repository path you enter in **Catalog source**.",
            "",
            "Course and lesson ids use lowercase kebab-case. Article lessons need a `path` or inline `body`. Video lessons need an `https` YouTube, Vimeo, or media-file URL.",
          ].join("\n"),
        },
        {
          id: "sample-walkthrough",
          title: "Sample video lesson",
          kind: "video",
          description: "A public sample video that demonstrates the video lesson player.",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          duration: "10:34",
        },
      ],
    },
  ],
};

export function activate(host) {
  if (host.apiVersion !== REQUIRED_HOST_API) {
    throw new Error(`Learning Center requires host API ${REQUIRED_HOST_API}.`);
  }
  return host.registerPage(PAGE_ID, (context) => mountCenter(host, context));
}

function mountCenter(host, { container, path, navigate }) {
  const style = document.createElement("style");
  style.dataset.ohApp = host.extension.name;
  style.textContent = STYLE;

  const root = document.createElement("section");
  root.className = "oh-learning-center";
  root.dataset.testid = "learning-center";
  root.setAttribute("aria-label", "Learning Center");

  container.append(style, root);

  const controller = new AbortController();
  const go = (remainder = "") =>
    navigate(pageHref(host.extension.name, remainder));

  renderRoute(root, {
    host,
    path,
    go,
    signal: controller.signal,
  });

  return () => {
    controller.abort();
    style.remove();
    root.remove();
  };
}

function pageHref(extensionName, remainder = "") {
  const base = `/extensions/${encodeURIComponent(extensionName)}/${PAGE_PATH}`;
  if (!remainder) return base;
  return `${base}/${remainder
    .split("/")
    .filter(Boolean)
    .map(encodeURIComponent)
    .join("/")}`;
}

function parseRoute(path) {
  const segments = String(path ?? "")
    .split("/")
    .filter(Boolean);
  if (segments.length === 0) return { kind: "home" };
  if (segments.length === 1 && segments[0] === "source") return { kind: "source" };
  if (segments[0] === "course" && segments.length === 2) {
    return { kind: "course", courseId: segments[1] };
  }
  if (
    segments[0] === "course" &&
    segments[2] === "lesson" &&
    segments.length === 4
  ) {
    return {
      kind: "lesson",
      courseId: segments[1],
      lessonId: segments[3],
    };
  }
  return { kind: "unknown" };
}

function sourceStorageKey(backendId) {
  return `${STORAGE_PREFIX}:${backendId}:catalog-source`;
}

function readStoredSource(backendId) {
  try {
    const raw = globalThis.localStorage?.getItem(sourceStorageKey(backendId));
    return parseSource(raw ? JSON.parse(raw) : null);
  } catch {
    return null;
  }
}

function writeStoredSource(backendId, source) {
  const key = sourceStorageKey(backendId);
  if (!source) {
    globalThis.localStorage?.removeItem(key);
    return;
  }
  globalThis.localStorage?.setItem(key, JSON.stringify(source));
}

function parseSource(value) {
  if (!value || typeof value !== "object") return null;
  if (value.kind !== "github") return null;
  if (
    typeof value.owner !== "string" ||
    !GITHUB_OWNER_PATTERN.test(value.owner)
  ) {
    return null;
  }
  if (
    typeof value.repo !== "string" ||
    !GITHUB_REPO_PATTERN.test(value.repo) ||
    value.repo.startsWith(".") ||
    value.repo.includes("..")
  ) {
    return null;
  }
  const ref =
    typeof value.ref === "string" && value.ref.trim() ? value.ref.trim() : "main";
  if (!GIT_REF_PATTERN.test(ref) || ref.includes("..")) return null;
  const path =
    typeof value.path === "string"
      ? value.path.trim().replace(/^\/+|\/+$/g, "")
      : "";
  if (path && !isSafeRepoPath(path)) return null;
  return {
    kind: "github",
    owner: value.owner,
    repo: value.repo,
    ref,
    path,
  };
}

function isSafeRepoPath(value) {
  return (
    Boolean(value) &&
    !value.includes("..") &&
    value.split("/").every((part) => PATH_SEGMENT_PATTERN.test(part))
  );
}

function parseCatalog(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Catalog must be an object.");
  }
  const title =
    typeof value.title === "string" && value.title.trim()
      ? value.title.trim()
      : "Learning Center";
  const description =
    typeof value.description === "string" ? value.description.trim() : "";
  if (!Array.isArray(value.courses)) {
    throw new Error("Catalog is missing a courses array.");
  }
  const courses = value.courses.map((course, index) =>
    parseCourse(course, index),
  );
  return { title, description, courses };
}

function parseCourse(value, index) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Course ${index} is invalid.`);
  }
  if (typeof value.id !== "string" || !ID_PATTERN.test(value.id)) {
    throw new Error(`Course ${index} needs a kebab-case id.`);
  }
  if (typeof value.title !== "string" || !value.title.trim()) {
    throw new Error(`Course ${value.id} needs a title.`);
  }
  if (!Array.isArray(value.lessons) || value.lessons.length === 0) {
    throw new Error(`Course ${value.id} needs at least one lesson.`);
  }
  return {
    id: value.id,
    title: value.title.trim(),
    description:
      typeof value.description === "string" ? value.description.trim() : "",
    level: typeof value.level === "string" ? value.level.trim() : "",
    lessons: value.lessons.map((lesson, lessonIndex) =>
      parseLesson(lesson, value.id, lessonIndex),
    ),
  };
}

function parseLesson(value, courseId, index) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Lesson ${index} in ${courseId} is invalid.`);
  }
  if (typeof value.id !== "string" || !ID_PATTERN.test(value.id)) {
    throw new Error(`Lesson ${index} in ${courseId} needs a kebab-case id.`);
  }
  if (typeof value.title !== "string" || !value.title.trim()) {
    throw new Error(`Lesson ${value.id} needs a title.`);
  }
  if (value.kind !== "article" && value.kind !== "video") {
    throw new Error(`Lesson ${value.id} kind must be article or video.`);
  }
  const lesson = {
    id: value.id,
    title: value.title.trim(),
    kind: value.kind,
    description:
      typeof value.description === "string" ? value.description.trim() : "",
    duration: typeof value.duration === "string" ? value.duration.trim() : "",
  };
  if (lesson.kind === "article") {
    const body = typeof value.body === "string" ? value.body : "";
    const path = typeof value.path === "string" ? value.path.trim() : "";
    if (!body && !path) {
      throw new Error(`Article ${lesson.id} needs a path or body.`);
    }
    if (path && !isSafeRepoPath(path)) {
      throw new Error(`Article ${lesson.id} has an unsafe path.`);
    }
    return { ...lesson, body, path };
  }
  if (typeof value.url !== "string" || !parseVideo(value.url)) {
    throw new Error(`Video ${lesson.id} needs a supported https URL.`);
  }
  return { ...lesson, url: value.url };
}

function parseVideo(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.replace(/^www\./, "");
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const id =
        parsed.searchParams.get("v") ||
        parsed.pathname.split("/").filter(Boolean).at(-1);
      return id
        ? {
            type: "embed",
            src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`,
          }
        : null;
    }
    if (host === "youtu.be") {
      const id = parsed.pathname.replace(/^\//, "");
      return id
        ? {
            type: "embed",
            src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`,
          }
        : null;
    }
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = parsed.pathname.split("/").filter(Boolean).at(-1);
      return id
        ? {
            type: "embed",
            src: `https://player.vimeo.com/video/${encodeURIComponent(id)}`,
          }
        : null;
    }
    if (/\.(mp4|webm|ogg)$/i.test(parsed.pathname)) {
      return { type: "file", src: parsed.href };
    }
    return null;
  } catch {
    return null;
  }
}

function catalogFileUrl(source, relativePath, cdn = false) {
  const file = [source.path, relativePath].filter(Boolean).join("/");
  if (cdn) {
    return `https://cdn.jsdelivr.net/gh/${source.owner}/${source.repo}@${source.ref}/${file}`;
  }
  return `https://raw.githubusercontent.com/${source.owner}/${source.repo}/${source.ref}/${file}`;
}

async function fetchText(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}).`);
  }
  return response.text();
}

async function loadCatalog(source, signal) {
  if (!source) return { catalog: parseCatalog(FALLBACK_CATALOG), remote: false };
  const urls = [
    catalogFileUrl(source, "catalog.json"),
    catalogFileUrl(source, "catalog.json", true),
  ];
  let lastError = new Error("Unable to load catalog.json.");
  for (const url of urls) {
    try {
      const text = await fetchText(url, signal);
      return { catalog: parseCatalog(JSON.parse(text)), remote: true };
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

async function loadArticle(source, lesson, signal) {
  if (lesson.body) return lesson.body;
  if (!source || !lesson.path) {
    throw new Error("This article has no content source.");
  }
  const urls = [
    catalogFileUrl(source, lesson.path),
    catalogFileUrl(source, lesson.path, true),
  ];
  let lastError = new Error("Unable to load the article.");
  for (const url of urls) {
    try {
      return await fetchText(url, signal);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

async function renderRoute(root, { host, path, go, signal }) {
  root.replaceChildren();
  const route = parseRoute(path);
  const source = readStoredSource(host.backend.id);

  if (route.kind === "source") {
    renderSourcePage(root, { host, source, go });
    return;
  }

  renderStatus(root, "loading", "Loading courses…");
  let catalog;
  try {
    ({ catalog } = await loadCatalog(source, signal));
  } catch (error) {
    if (signal.aborted) return;
    renderStatus(
      root,
      "error",
      error instanceof Error ? error.message : "Unable to load the catalog.",
      go,
    );
    return;
  }
  if (signal.aborted) return;

  if (route.kind === "home") {
    renderHome(root, { host, catalog, source, go });
    return;
  }
  if (route.kind === "course") {
    const course = catalog.courses.find((item) => item.id === route.courseId);
    if (!course) {
      renderStatus(root, "error", "That course was not found.", go);
      return;
    }
    renderCourse(root, { host, catalog, course, go });
    return;
  }
  if (route.kind === "lesson") {
    const course = catalog.courses.find((item) => item.id === route.courseId);
    const lesson = course?.lessons.find((item) => item.id === route.lessonId);
    if (!course || !lesson) {
      renderStatus(root, "error", "That lesson was not found.", go);
      return;
    }
    await renderLesson(root, { host, catalog, course, lesson, source, go, signal });
    return;
  }
  renderStatus(root, "error", "That Learning Center page was not found.", go);
}

function renderHome(root, { host, catalog, source, go }) {
  const featured = catalog.courses[0] ?? null;
  const articles = catalog.courses.flatMap((course) =>
    course.lessons
      .filter((lesson) => lesson.kind === "article")
      .map((lesson) => ({ course, lesson })),
  );
  const videos = catalog.courses.flatMap((course) =>
    course.lessons
      .filter((lesson) => lesson.kind === "video")
      .map((lesson) => ({ course, lesson })),
  );
  const browse = document.createElement("div");
  browse.className = "oh-lc-browse";
  browse.dataset.testid = "learning-center-home";
  if (!catalog.courses.length) {
    browse.append(
      statusNode(
        "empty",
        "This catalog has no courses yet.",
        "learning-center-empty",
      ),
    );
  } else {
    const rows = [];
    if (featured) {
      rows.push(hero(featured, go));
    }
    rows.push(sourceBanner(source, go));
    rows.push(
      contentRow(
        "Courses",
        catalog.courses.map((course) => courseTile(course, go)),
      ),
    );
    if (articles.length) {
      rows.push(
        contentRow(
          "Articles",
          articles.map(({ course, lesson }) => lessonTile(course, lesson, go)),
        ),
      );
    }
    if (videos.length) {
      rows.push(
        contentRow(
          "Watch",
          videos.map(({ course, lesson }) => lessonTile(course, lesson, go)),
        ),
      );
    }
    browse.append(...rows);
  }
  root.replaceChildren(topbar(go), browse, footnote(host));
}

function renderCourse(root, { catalog, course, go }) {
  const first = course.lessons[0];
  const page = document.createElement("div");
  page.className = "oh-lc-page";
  page.append(
    crumbs([
      ["Learning Center", () => go()],
      [course.title, null],
    ]),
    header(course.title, course.description, [
      first
        ? button("Play", () => go(`course/${course.id}/lesson/${first.id}`), "primary")
        : null,
      button("More courses", () => go(), "ghost"),
    ]),
    lessonList(course, go),
  );
  root.replaceChildren(topbar(go), page);
  void catalog;
}

function asyncRenderGuard(signal) {
  return !signal.aborted;
}

async function renderLesson(
  root,
  { catalog, course, lesson, source, go, signal },
) {
  const page = document.createElement("div");
  page.className = "oh-lc-page";
  page.append(
    crumbs([
      ["Learning Center", () => go()],
      [course.title, () => go(`course/${course.id}`)],
      [lesson.title, null],
    ]),
    header(lesson.title, lesson.description, [
      badge(lesson.kind),
      lesson.duration ? badge(lesson.duration) : null,
    ]),
  );
  root.replaceChildren(topbar(go), page);

  if (lesson.kind === "video") {
    const video = parseVideo(lesson.url);
    const player = document.createElement("div");
    player.className = "oh-lc-video";
    player.dataset.testid = "learning-center-lesson";
    if (!video) {
      player.append(
        statusNode("error", "This video URL is not supported.", "learning-center-error"),
      );
    } else {
      const frame = document.createElement("div");
      frame.className = "oh-lc-player";
      if (video.type === "embed") {
        const iframe = document.createElement("iframe");
        iframe.src = video.src;
        iframe.title = lesson.title;
        iframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        frame.append(iframe);
      } else {
        const media = document.createElement("video");
        media.controls = true;
        media.src = video.src;
        media.title = lesson.title;
        frame.append(media);
      }
      player.append(frame);
    }
    page.append(player);
    return;
  }

  const pending = statusNode(
    "loading",
    "Loading article…",
    "learning-center-loading",
  );
  page.append(pending);
  try {
    const markdown = await loadArticle(source, lesson, signal);
    if (!asyncRenderGuard(signal)) return;
    pending.remove();
    const article = document.createElement("article");
    article.className = "oh-lc-article";
    article.dataset.testid = "learning-center-lesson";
    article.append(renderMarkdown(markdown));
    page.append(article);
  } catch (error) {
    if (!asyncRenderGuard(signal)) return;
    pending.replaceWith(
      statusNode(
        "error",
        error instanceof Error ? error.message : "Unable to load the article.",
        "learning-center-error",
      ),
    );
  }
  void catalog;
}

function renderSourcePage(root, { host, source, go }) {
  const form = document.createElement("form");
  form.className = "oh-lc-form";
  form.dataset.testid = "learning-center-source";
  form.append(
    field("GitHub owner", "owner", source?.owner ?? "", "FraterCCCLXIII"),
    field("Repository", "repo", source?.repo ?? "", "learning-center"),
    field("Ref", "ref", source?.ref ?? "main", "main"),
    field("Catalog directory", "path", source?.path ?? "", "catalog"),
  );

  const actions = document.createElement("div");
  actions.className = "oh-lc-actions";
  const save = button("Load catalog", () => undefined, "primary");
  save.type = "submit";
  const reset = button("Use sample catalog", () => {
    writeStoredSource(host.backend.id, null);
    go();
  });
  reset.type = "button";
  actions.append(save, reset);
  form.append(actions);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const next = parseSource({
      kind: "github",
      owner: String(data.get("owner") ?? ""),
      repo: String(data.get("repo") ?? ""),
      ref: String(data.get("ref") ?? "main"),
      path: String(data.get("path") ?? ""),
    });
    if (!next) {
      const existing = form.querySelector("[data-testid='learning-center-error']");
      existing?.remove();
      form.prepend(
        statusNode(
          "error",
          "Enter a valid GitHub owner, repository, ref, and optional directory.",
          "learning-center-error",
        ),
      );
      return;
    }
    writeStoredSource(host.backend.id, next);
    go();
  });

  const page = document.createElement("div");
  page.className = "oh-lc-page";
  page.append(
    crumbs([["Learning Center", () => go()], ["Catalog source", null]]),
    header(
      "Catalog source",
      "The App fetches catalog.json from this GitHub repository, then loads article Markdown from the same directory.",
    ),
    form,
  );
  root.replaceChildren(topbar(go), page);
}

function header(title, description, extras = []) {
  const wrap = document.createElement("header");
  wrap.className = "oh-lc-header";
  const copy = document.createElement("div");
  const kicker = document.createElement("p");
  kicker.className = "oh-lc-kicker";
  kicker.textContent = "Learning Center";
  const heading = document.createElement("h1");
  heading.className = "oh-lc-title";
  heading.textContent = title;
  copy.append(kicker, heading);
  if (description) {
    const lead = document.createElement("p");
    lead.className = "oh-lc-lead";
    lead.textContent = description;
    copy.append(lead);
  }
  wrap.append(copy);
  const usable = extras.filter(Boolean);
  if (usable.length) {
    const actions = document.createElement("div");
    actions.className = "oh-lc-actions";
    actions.append(...usable);
    wrap.append(actions);
  }
  return wrap;
}

function topbar(go) {
  const bar = document.createElement("div");
  bar.className = "oh-lc-topbar";
  const brand = document.createElement("button");
  brand.type = "button";
  brand.className = "oh-lc-brand";
  brand.setAttribute("aria-label", "Learning Center home");
  const mark = document.createElement("span");
  mark.className = "oh-lc-mark";
  mark.textContent = "LC";
  const name = document.createElement("span");
  name.className = "oh-lc-brand-name";
  name.textContent = "Learning Center";
  brand.append(mark, name);
  brand.addEventListener("click", () => go());
  bar.append(brand, button("Catalog source", () => go("source"), "ghost"));
  return bar;
}

function hero(course, go) {
  const first = course.lessons[0];
  const section = document.createElement("section");
  section.className = "oh-lc-hero";
  const art = posterArt(course.id);
  art.className = "oh-lc-hero-art";
  const kicker = document.createElement("p");
  kicker.className = "oh-lc-kicker";
  kicker.textContent = course.level ? `${course.level} course` : "Featured";
  const title = document.createElement("h1");
  title.className = "oh-lc-title";
  title.textContent = course.title;
  const lead = document.createElement("p");
  lead.className = "oh-lc-lead";
  lead.textContent = course.description;
  const actions = document.createElement("div");
  actions.className = "oh-lc-actions";
  if (first) {
    actions.append(
      button("Play", () => go(`course/${course.id}/lesson/${first.id}`), "primary"),
    );
  }
  actions.append(button("More info", () => go(`course/${course.id}`), "ghost"));
  section.append(art, kicker, title, lead, actions);
  return section;
}

function sourceBanner(source, go) {
  const note = document.createElement("p");
  note.className = "oh-lc-source";
  note.dataset.testid = "learning-center-source-status";
  note.textContent = source
    ? `Loaded from github:${source.owner}/${source.repo}@${source.ref}${source.path ? `/${source.path}` : ""}.`
    : "Showing the sample catalog. Connect a GitHub repository to load live courses.";
  if (!source) {
    const wrap = document.createElement("div");
    wrap.className = "oh-lc-source";
    note.className = "oh-lc-meta";
    wrap.append(note, button("Connect a catalog", () => go("source"), "ghost"));
    return wrap;
  }
  return note;
}

function contentRow(title, tiles) {
  const section = document.createElement("section");
  section.className = "oh-lc-row";
  const heading = document.createElement("h2");
  heading.className = "oh-lc-row-title";
  heading.textContent = title;
  const wrap = document.createElement("div");
  wrap.className = "oh-lc-rail-wrap";
  const rail = document.createElement("div");
  rail.className = "oh-lc-rail";
  for (const tile of tiles) rail.append(tile);
  const prev = document.createElement("button");
  prev.type = "button";
  prev.className = "oh-lc-rail-btn oh-lc-rail-btn--prev";
  prev.setAttribute("aria-label", `Scroll ${title} left`);
  prev.textContent = "‹";
  prev.addEventListener("click", () => {
    rail.scrollBy({ left: -Math.round(rail.clientWidth * 0.8), behavior: "smooth" });
  });
  const next = document.createElement("button");
  next.type = "button";
  next.className = "oh-lc-rail-btn oh-lc-rail-btn--next";
  next.setAttribute("aria-label", `Scroll ${title} right`);
  next.textContent = "›";
  next.addEventListener("click", () => {
    rail.scrollBy({ left: Math.round(rail.clientWidth * 0.8), behavior: "smooth" });
  });
  wrap.append(prev, rail, next);
  section.append(heading, wrap);
  return section;
}

function courseTile(course, go) {
  const kinds = [...new Set(course.lessons.map((lesson) => lesson.kind))];
  return tile({
    testId: `course-card-${course.id}`,
    seed: course.id,
    title: course.title,
    headingLevel: "h2",
    description: course.description,
    badges: [course.level, `${course.lessons.length} lessons`, ...kinds].filter(
      Boolean,
    ),
    onClick: () => go(`course/${course.id}`),
  });
}

function lessonTile(course, lesson, go) {
  return tile({
    testId: `lesson-card-${lesson.id}`,
    seed: `${course.id}-${lesson.id}`,
    title: lesson.title,
    headingLevel: "h3",
    description: lesson.description,
    badges: [lesson.kind, lesson.duration].filter(Boolean),
    onClick: () => go(`course/${course.id}/lesson/${lesson.id}`),
  });
}

function tile({ testId, seed, title, headingLevel, description, badges, onClick }) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "oh-lc-tile";
  card.dataset.testid = testId;
  const heading = document.createElement(headingLevel);
  heading.textContent = title;
  const copy = document.createElement("div");
  copy.className = "oh-lc-tile-copy";
  copy.append(heading);
  if (description) {
    const meta = document.createElement("p");
    meta.className = "oh-lc-meta";
    meta.textContent = description;
    copy.append(meta);
  }
  if (badges?.length) {
    const row = document.createElement("div");
    row.className = "oh-lc-badge-row";
    for (const label of badges) row.append(badge(label));
    copy.append(row);
  }
  card.append(poster(seed, title), copy);
  card.addEventListener("click", onClick);
  return card;
}

function poster(seed, title) {
  const node = posterArt(seed);
  node.className = "oh-lc-poster";
  const label = document.createElement("span");
  label.className = "oh-lc-poster-label";
  label.textContent = (title || seed).trim().slice(0, 1).toUpperCase();
  node.append(label);
  return node;
}

function posterArt(seed) {
  const node = document.createElement("div");
  const angle = 120 + (hashSeed(seed) % 50);
  node.style.background = `
    radial-gradient(circle at 80% 12%, color-mix(in srgb, var(--oh-accent, #c9b974) 55%, transparent), transparent 46%),
    linear-gradient(${angle}deg,
      var(--oh-surface-deep, #0d0f14) 0%,
      var(--oh-interactive-active, #232833) 42%,
      color-mix(in srgb, var(--oh-accent, #c9b974) 52%, var(--oh-color-base, #111318)) 100%)
  `;
  return node;
}

function hashSeed(value) {
  let hash = 0;
  for (const char of String(value)) {
    hash = (hash * 31 + char.charCodeAt(0)) % 360;
  }
  return hash;
}

function lessonList(course, go) {
  const list = document.createElement("ol");
  list.className = "oh-lc-episodes";
  list.dataset.testid = "learning-center-course";
  course.lessons.forEach((lesson, index) => {
    const item = document.createElement("li");
    const card = document.createElement("button");
    card.type = "button";
    card.className = "oh-lc-episode";
    card.dataset.testid = `lesson-card-${lesson.id}`;
    const number = document.createElement("span");
    number.className = "oh-lc-episode-num";
    number.textContent = String(index + 1);
    const copy = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = lesson.title;
    const meta = document.createElement("p");
    meta.className = "oh-lc-meta";
    meta.textContent = lesson.description;
    const badges = document.createElement("div");
    badges.className = "oh-lc-badge-row";
    badges.append(badge(lesson.kind));
    if (lesson.duration) badges.append(badge(lesson.duration));
    copy.append(title, meta, badges);
    card.append(number, poster(`${course.id}-${lesson.id}`, lesson.title), copy);
    card.addEventListener("click", () =>
      go(`course/${course.id}/lesson/${lesson.id}`),
    );
    item.append(card);
    list.append(item);
  });
  return list;
}

function crumbs(items) {
  const list = document.createElement("nav");
  list.setAttribute("aria-label", "Breadcrumb");
  const ol = document.createElement("ol");
  ol.className = "oh-lc-crumbs";
  for (const [label, onClick] of items) {
    const item = document.createElement("li");
    if (onClick) {
      const control = document.createElement("button");
      control.type = "button";
      control.textContent = label;
      control.addEventListener("click", onClick);
      item.append(control);
    } else {
      const current = document.createElement("span");
      current.setAttribute("aria-current", "page");
      current.textContent = label;
      item.append(current);
    }
    ol.append(item);
  }
  list.append(ol);
  return list;
}

function button(label, onClick, variant) {
  const control = document.createElement("button");
  control.type = "button";
  control.className =
    variant === "primary"
      ? "oh-lc-button oh-lc-button--primary"
      : variant === "ghost"
        ? "oh-lc-button oh-lc-button--ghost"
        : "oh-lc-button";
  control.textContent = label;
  control.addEventListener("click", onClick);
  return control;
}

function badge(label) {
  const node = document.createElement("span");
  node.className = "oh-lc-badge";
  node.textContent = label;
  return node;
}

function field(labelText, name, value, placeholder) {
  const wrap = document.createElement("label");
  wrap.className = "oh-lc-field";
  const label = document.createElement("span");
  label.textContent = labelText;
  const input = document.createElement("input");
  input.name = name;
  input.value = value;
  input.placeholder = placeholder;
  input.autocomplete = "off";
  input.spellcheck = false;
  wrap.append(label, input);
  return wrap;
}

function footnote(host) {
  const note = document.createElement("p");
  note.className = "oh-lc-footnote";
  note.textContent = `App ${host.extension.name} ${host.extension.version} on ${host.backend.id}.`;
  return note;
}

function renderStatus(root, tone, message, go) {
  root.replaceChildren(statusNode(tone, message, `learning-center-${tone}`, go));
}

function statusNode(tone, message, testId, go) {
  const node = document.createElement("div");
  node.className = "oh-lc-status";
  node.dataset.tone = tone;
  node.dataset.testid = testId;
  node.setAttribute("role", tone === "error" ? "alert" : "status");
  const text = document.createElement("p");
  text.textContent = message;
  node.append(text);
  if (go) {
    node.append(button("Back to courses", () => go()));
  }
  return node;
}

function renderMarkdown(markdown) {
  const root = document.createElement("div");
  root.className = "oh-lc-md";
  const lines = String(markdown ?? "").replace(/\r\n/g, "\n").split("\n");
  let paragraph = [];
  let list = null;
  let fence = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const p = document.createElement("p");
    appendInline(p, paragraph.join(" "));
    root.append(p);
    paragraph = [];
  };
  const flushList = () => {
    if (list) root.append(list);
    list = null;
  };

  for (const line of lines) {
    if (fence) {
      if (line.startsWith("```")) {
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        code.textContent = fence.join("\n");
        pre.append(code);
        root.append(pre);
        fence = null;
      } else {
        fence.push(line);
      }
      continue;
    }
    if (line.startsWith("```")) {
      flushParagraph();
      flushList();
      fence = [];
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }
    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading) {
      flushParagraph();
      flushList();
      const node = document.createElement(`h${heading[1].length}`);
      appendInline(node, heading[2]);
      root.append(node);
      continue;
    }
    const bullet = /^[-*]\s+(.+)$/.exec(line);
    const ordered = /^\d+\.\s+(.+)$/.exec(line);
    if (bullet || ordered) {
      flushParagraph();
      if (!list || list.tagName !== (ordered ? "OL" : "UL")) {
        flushList();
        list = document.createElement(ordered ? "ol" : "ul");
      }
      const item = document.createElement("li");
      appendInline(item, (bullet || ordered)[1]);
      list.append(item);
      continue;
    }
    flushList();
    paragraph.push(line.trim());
  }
  if (fence) {
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.textContent = fence.join("\n");
    pre.append(code);
    root.append(pre);
  }
  flushParagraph();
  flushList();
  return root;
}

function appendInline(parent, text) {
  const pattern =
    /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) {
      parent.append(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith("`")) {
      const code = document.createElement("code");
      code.textContent = token.slice(1, -1);
      parent.append(code);
    } else if (token.startsWith("**")) {
      const strong = document.createElement("strong");
      strong.textContent = token.slice(2, -2);
      parent.append(strong);
    } else if (token.startsWith("*")) {
      const em = document.createElement("em");
      em.textContent = token.slice(1, -1);
      parent.append(em);
    } else {
      const bits = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      const href = bits?.[2] ?? "";
      if (/^https:\/\//.test(href)) {
        const link = document.createElement("a");
        link.href = href;
        link.target = "_blank";
        link.rel = "noreferrer noopener";
        link.textContent = bits[1];
        parent.append(link);
      } else {
        parent.append(bits?.[1] ?? token);
      }
    }
    last = match.index + token.length;
  }
  if (last < text.length) parent.append(text.slice(last));
}
