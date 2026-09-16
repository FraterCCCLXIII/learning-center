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
  box-sizing: border-box;
  min-height: 100%;
  padding: 1.5rem clamp(1rem, 3vw, 2.5rem) 2.75rem;
  color: var(--oh-text-primary, var(--foreground, #f5f5f5));
  background: var(--oh-color-base, transparent);
  font-family: inherit;
  line-height: 1.55;
}
.oh-learning-center *,
.oh-learning-center *::before,
.oh-learning-center *::after { box-sizing: border-box; }
.oh-learning-center a {
  color: inherit;
  text-decoration-color: color-mix(in srgb, currentColor 45%, transparent);
}
.oh-learning-center :focus-visible {
  outline: 2px solid var(--oh-accent, #6ea8fe);
  outline-offset: 2px;
}
.oh-lc-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.oh-lc-kicker {
  margin: 0 0 0.35rem;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.7;
}
.oh-lc-title { margin: 0; font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 650; }
.oh-lc-lead { margin: 0.5rem 0 0; max-width: 42rem; opacity: 0.78; }
.oh-lc-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.oh-lc-button,
.oh-lc-card {
  appearance: none;
  border: 1px solid var(--oh-border, color-mix(in srgb, currentColor 16%, transparent));
  background: color-mix(in srgb, currentColor 4%, transparent);
  color: inherit;
  border-radius: 0.85rem;
  font: inherit;
}
.oh-lc-button {
  padding: 0.55rem 0.85rem;
  cursor: pointer;
}
.oh-lc-button:hover,
.oh-lc-card:hover { background: color-mix(in srgb, currentColor 8%, transparent); }
.oh-lc-crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
  margin: 0 0 1rem;
  padding: 0;
  list-style: none;
  font-size: 0.9rem;
  opacity: 0.8;
}
.oh-lc-crumbs button {
  appearance: none;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}
.oh-lc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16.5rem, 1fr));
  gap: 1rem;
}
.oh-lc-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.45rem;
  width: 100%;
  padding: 1.1rem 1.15rem 1.2rem;
  text-align: left;
  cursor: pointer;
}
.oh-lc-card h2,
.oh-lc-card h3 { margin: 0; font-size: 1.05rem; }
.oh-lc-meta { margin: 0; font-size: 0.85rem; opacity: 0.7; }
.oh-lc-badge-row { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.oh-lc-badge {
  display: inline-flex;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  border: 1px solid var(--oh-border, color-mix(in srgb, currentColor 16%, transparent));
  font-size: 0.75rem;
}
.oh-lc-status {
  margin: 1.5rem 0;
  padding: 1rem 1.1rem;
  border-radius: 0.85rem;
  border: 1px solid var(--oh-border, color-mix(in srgb, currentColor 16%, transparent));
}
.oh-lc-status[data-tone="error"] {
  border-color: color-mix(in srgb, #f87171 55%, transparent);
}
.oh-lc-article,
.oh-lc-video {
  max-width: 46rem;
}
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
  border-radius: 0.75rem;
  background: color-mix(in srgb, currentColor 6%, transparent);
}
.oh-lc-md :not(pre) > code {
  padding: 0.1rem 0.3rem;
  border-radius: 0.3rem;
  background: color-mix(in srgb, currentColor 8%, transparent);
}
.oh-lc-player {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 0.85rem;
  overflow: hidden;
  background: #000;
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
  border-radius: 0.65rem;
  border: 1px solid var(--oh-border, color-mix(in srgb, currentColor 16%, transparent));
  background: color-mix(in srgb, currentColor 4%, transparent);
  color: inherit;
  font: inherit;
}
.oh-lc-lessons { display: grid; gap: 0.65rem; margin: 0; padding: 0; list-style: none; }
@media (max-width: 640px) {
  .oh-learning-center { padding: 1rem 0.9rem 2rem; }
  .oh-lc-grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .oh-learning-center * { transition: none !important; }
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
  root.replaceChildren(
    header(catalog.title, catalog.description, [
      button("Catalog source", () => go("source"), "secondary"),
    ]),
    sourceBanner(source, go),
    catalog.courses.length
      ? courseGrid(catalog.courses, go)
      : statusNode(
          "empty",
          "This catalog has no courses yet.",
          "learning-center-empty",
        ),
    footnote(host),
  );
}

function renderCourse(root, { catalog, course, go }) {
  root.replaceChildren(
    crumbs([
      ["Learning Center", () => go()],
      [course.title, null],
    ]),
    header(course.title, course.description, [
      badge(course.level || "course"),
      badge(`${course.lessons.length} lessons`),
    ]),
    lessonList(course, go),
  );
  void catalog;
}

function asyncRenderGuard(signal) {
  return !signal.aborted;
}

async function renderLesson(
  root,
  { catalog, course, lesson, source, go, signal },
) {
  root.replaceChildren(
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
    root.append(player);
    return;
  }

  const pending = statusNode(
    "loading",
    "Loading article…",
    "learning-center-loading",
  );
  root.append(pending);
  try {
    const markdown = await loadArticle(source, lesson, signal);
    if (!asyncRenderGuard(signal)) return;
    pending.remove();
    const article = document.createElement("article");
    article.className = "oh-lc-article";
    article.dataset.testid = "learning-center-lesson";
    article.append(renderMarkdown(markdown));
    root.append(article);
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
  const save = button("Load catalog", () => undefined);
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

  root.replaceChildren(
    crumbs([["Learning Center", () => go()], ["Catalog source", null]]),
    header(
      "Catalog source",
      "The App fetches catalog.json from this GitHub repository, then loads article Markdown from the same directory.",
    ),
    form,
  );
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

function sourceBanner(source, go) {
  const note = document.createElement("p");
  note.className = "oh-lc-meta";
  note.dataset.testid = "learning-center-source-status";
  note.textContent = source
    ? `Loaded from github:${source.owner}/${source.repo}@${source.ref}${source.path ? `/${source.path}` : ""}.`
    : "Showing the sample catalog. Connect a GitHub repository to load live courses.";
  const row = document.createElement("div");
  row.style.margin = "0 0 1.25rem";
  row.append(note);
  if (!source) {
    const link = button("Connect a catalog", () => go("source"));
    link.style.marginTop = "0.65rem";
    row.append(link);
  }
  return row;
}

function courseGrid(courses, go) {
  const grid = document.createElement("div");
  grid.className = "oh-lc-grid";
  grid.dataset.testid = "learning-center-home";
  for (const course of courses) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "oh-lc-card";
    card.dataset.testid = `course-card-${course.id}`;
    const title = document.createElement("h2");
    title.textContent = course.title;
    const meta = document.createElement("p");
    meta.className = "oh-lc-meta";
    meta.textContent = course.description;
    const badges = document.createElement("div");
    badges.className = "oh-lc-badge-row";
    if (course.level) badges.append(badge(course.level));
    const kinds = new Set(course.lessons.map((lesson) => lesson.kind));
    badges.append(badge(`${course.lessons.length} lessons`));
    for (const kind of kinds) badges.append(badge(kind));
    card.append(title, meta, badges);
    card.addEventListener("click", () => go(`course/${course.id}`));
    grid.append(card);
  }
  return grid;
}

function lessonList(course, go) {
  const list = document.createElement("ol");
  list.className = "oh-lc-lessons";
  list.dataset.testid = "learning-center-course";
  for (const lesson of course.lessons) {
    const item = document.createElement("li");
    const card = document.createElement("button");
    card.type = "button";
    card.className = "oh-lc-card";
    card.dataset.testid = `lesson-card-${lesson.id}`;
    const title = document.createElement("h3");
    title.textContent = lesson.title;
    const meta = document.createElement("p");
    meta.className = "oh-lc-meta";
    meta.textContent = lesson.description;
    const badges = document.createElement("div");
    badges.className = "oh-lc-badge-row";
    badges.append(badge(lesson.kind));
    if (lesson.duration) badges.append(badge(lesson.duration));
    card.append(title, meta, badges);
    card.addEventListener("click", () =>
      go(`course/${course.id}/lesson/${lesson.id}`),
    );
    item.append(card);
    list.append(item);
  }
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

function button(label, onClick) {
  const control = document.createElement("button");
  control.type = "button";
  control.className = "oh-lc-button";
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
  note.className = "oh-lc-meta";
  note.style.marginTop = "1.75rem";
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
