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
  display: block;
  width: 2.15rem;
  height: 1.45rem;
  flex-shrink: 0;
  color: var(--oh-foreground, #EEF2F7);
}
.oh-lc-mark path { fill: currentColor; }
.oh-lc-brand-name {
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--oh-foreground, #f4f5f7);
}
.oh-lc-hero-carousel {
  position: relative;
  padding: 1.4rem var(--lc-pad) 0.6rem;
}
.oh-lc-hero-stage {
  --lc-hero-inset: 1.4rem;
  display: grid;
  padding-block: 1.25rem;
  padding-inline-end: var(--lc-hero-inset);
  padding-inline-start: clamp(
    var(--lc-hero-inset),
    8vw - 2.2rem,
    calc(var(--lc-hero-inset) + 3.75rem)
  );
  border-radius: 12px;
  background: var(--oh-surface, #202020);
}
.oh-lc-hero-slide {
  grid-area: 1 / 1;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(16rem, 0.85fr);
  gap: clamp(1.25rem, 4vw, 3rem);
  align-items: center;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 640ms ease, visibility 640ms ease;
}
.oh-lc-hero-slide[data-active="true"] {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  z-index: 1;
}
.oh-lc-hero-media {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  background: var(--oh-surface, #202020);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
}
.oh-lc-hero-media img,
.oh-lc-poster img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.oh-lc-hero-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.1rem;
}
.oh-lc-hero-arrow {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.7rem;
  height: 1.7rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--oh-text-dim, #7E8A9E);
  font: inherit;
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
}
.oh-lc-hero-arrow:hover {
  color: var(--oh-muted, #A3B0C4);
}
.oh-lc-hero-dots {
  display: flex;
  gap: 0.4rem;
}
.oh-lc-hero-dot {
  appearance: none;
  width: 0.45rem;
  height: 0.45rem;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: color-mix(in srgb, var(--oh-foreground, #fff) 22%, transparent);
  cursor: pointer;
}
.oh-lc-hero-dot[aria-current="true"] {
  width: 1.15rem;
  background: var(--oh-accent, #c9b974);
}
.oh-lc-kicker {
  margin: 0 0 0.55rem;
  color: var(--oh-accent, #c9b974);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.04em;
}
.oh-lc-title {
  margin: 0;
  max-width: 22ch;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
}
.oh-lc-lead {
  margin: 0.85rem 0 0;
  max-width: 34rem;
  color: var(--oh-text-secondary, #d0d3da);
  font-size: 0.95rem;
  font-weight: 400;
}
.oh-lc-actions { display: flex; flex-wrap: wrap; gap: 0.7rem; margin-top: 1.25rem; }
.oh-lc-button {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 2.4rem;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: var(--oh-radius, 8px);
  background: var(--oh-surface-raised, #1b1e26);
  color: inherit;
  font: inherit;
  font-weight: 500;
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
.oh-lc-row { margin-top: 0.35rem; position: relative; z-index: 0; }
.oh-lc-row:hover,
.oh-lc-row:focus-within { z-index: 2; }
.oh-lc-row-title {
  margin: 0 0 0.7rem;
  padding: 0 var(--lc-pad);
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: -0.02em;
}
.oh-lc-rail-wrap { position: relative; }
.oh-lc-rail {
  display: flex;
  gap: 0.7rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 1.15rem var(--lc-pad) 1.7rem;
  margin-block: -0.8rem;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  transition: scrollbar-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.oh-lc-row:hover .oh-lc-rail,
.oh-lc-row:focus-within .oh-lc-rail {
  scrollbar-color: var(--oh-scrollbar, color-mix(in srgb, var(--cool-grey-400, #979797) 30%, transparent)) transparent;
}
.oh-lc-rail::-webkit-scrollbar {
  height: 6px;
}
.oh-lc-rail::-webkit-scrollbar-track {
  background: transparent;
}
.oh-lc-rail::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 3px;
  opacity: 0;
  transition: background 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.oh-lc-row:hover .oh-lc-rail::-webkit-scrollbar-thumb,
.oh-lc-row:focus-within .oh-lc-rail::-webkit-scrollbar-thumb {
  background: var(--oh-scrollbar, color-mix(in srgb, var(--cool-grey-400, #979797) 30%, transparent));
  opacity: 1;
}
.oh-lc-row:hover .oh-lc-rail::-webkit-scrollbar-thumb:hover,
.oh-lc-row:focus-within .oh-lc-rail::-webkit-scrollbar-thumb:hover {
  background: var(--oh-scrollbar-hover, color-mix(in srgb, var(--cool-grey-400, #979797) 50%, transparent));
}
.oh-lc-rail-btn {
  position: absolute;
  top: 1.15rem;
  bottom: 1.7rem;
  z-index: 4;
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
  position: relative;
  z-index: 0;
  flex: 0 0 min(72vw, 17.5rem);
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  padding: 0;
  border: 0;
  border-radius: 0.45rem;
  background: var(--oh-surface, #202020);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  transform-origin: center center;
  transition: transform 160ms ease, box-shadow 160ms ease;
}
.oh-lc-tile:hover,
.oh-lc-tile:focus-visible {
  transform: scale(1.06);
  z-index: 3;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.38);
}
.oh-lc-poster {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.oh-lc-tile-copy { padding: 0.7rem 0.8rem 0.9rem; }
.oh-lc-tile-copy h2,
.oh-lc-tile-copy h3 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: -0.02em;
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
  border: 1px solid var(--oh-border, #4B5468);
  background: color-mix(in srgb, var(--oh-foreground, #EEF2F7) 8%, transparent);
  color: var(--oh-text-secondary, #C3CDDC);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.02em;
}
.oh-lc-page {
  padding: 0 var(--lc-pad) 3.5rem;
}
.oh-lc-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin: 0.4rem 0 1.4rem;
  padding: 1.25rem 1.4rem;
  border-radius: 12px;
  background: var(--oh-surface, #202020);
}
.oh-lc-header .oh-lc-title {
  max-width: 18ch;
  font-size: clamp(1.8rem, 4vw, 3rem);
}
.oh-lc-header .oh-lc-actions {
  margin-top: 0;
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
  background: var(--oh-surface, #202020);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.oh-lc-episode:hover { background: var(--oh-interactive-active, #232833); }
.oh-lc-episode-num {
  color: var(--oh-text-dim, #7d8492);
  font-size: 1.05rem;
  font-weight: 500;
  text-align: center;
}
.oh-lc-episode .oh-lc-poster { border-radius: 0.3rem; }
.oh-lc-episode h3 { margin: 0; font-size: 0.98rem; font-weight: 500; }
.oh-lc-status {
  margin: 1.5rem var(--lc-pad);
  padding: 1rem 1.1rem;
  border-radius: var(--oh-radius, 8px);
  background: var(--oh-surface, #202020);
  border: 1px solid var(--oh-border, #3a404c);
}
.oh-lc-status[data-tone="error"] {
  border-color: color-mix(in srgb, var(--oh-danger, #e76a5e) 55%, transparent);
}
.oh-lc-article,
.oh-lc-video,
.oh-lc-lesson-nav {
  max-width: 56rem;
  margin-inline: auto;
}
.oh-lc-lesson-nav {
  display: flex;
  justify-content: space-between;
  gap: 0.7rem;
  margin-top: 1.75rem;
  padding-top: 1.15rem;
  border-top: 1px solid var(--oh-border, #404040);
}
.oh-lc-md > * + * { margin-top: 0.9rem; }
.oh-lc-md h1,
.oh-lc-md h2,
.oh-lc-md h3 {
  margin: 1.4rem 0 0.55rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.25;
}
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
  background: var(--oh-surface, #202020);
  color: inherit;
  font: inherit;
}
.oh-lc-footnote {
  padding: 0 var(--lc-pad);
  color: var(--oh-text-dim, #7d8492);
  font-size: 0.75rem;
}
@media (max-width: 720px) {
  .oh-lc-hero-slide {
    grid-template-columns: 1fr;
  }
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

function stubArticle(title, audience, covers, sources) {
  return [
    `# ${title}`,
    "",
    "_Stub article._ Outline only — full draft later.",
    "",
    `**Audience:** ${audience}`,
    "",
    "## What this lesson covers",
    ...covers.map((item) => `- ${item}`),
    "",
    "## Source material",
    ...sources.map(([label, href]) => `- [${label}](${href})`),
  ].join("\n");
}

function stubLesson(id, title, description, audience, covers, sources) {
  return {
    id,
    title,
    kind: "article",
    description,
    body: stubArticle(title, audience, covers, sources),
  };
}

const FALLBACK_CATALOG = {
  title: "OpenHands Learning Center",
  description:
    "Courses for individual developers and for companies rolling OpenHands across the SDLC and automations.",
  courses: [
    {
      id: "getting-started",
      title: "Getting started with Agent Canvas",
      description:
        "Install Canvas, connect a backend and model, and run a first conversation.",
      level: "beginner",
      lessons: [
        {
          id: "welcome",
          title: "Welcome to Agent Canvas",
          kind: "article",
          description: "What Agent Canvas is and who this Learning Center is for.",
          body: [
            "# Welcome to Agent Canvas",
            "",
            "Agent Canvas is the control center for OpenHands. It is where you start conversations, inspect files, manage backends, and install Apps that add their own pages to the product.",
            "",
            "This Learning Center is for two audiences:",
            "",
            "- **Individual developers** who want a faster daily coding loop",
            "- **Companies** that want agents on the whole SDLC — planning through operations — plus automations that run without someone watching the chat",
            "",
            "## What you will find here",
            "",
            "- **Developer tracks** start with Canvas setup, then daily workflow, skills, and MCP.",
            "- **Company tracks** cover automations, SDLC phases, backends, and governance.",
            "- **Articles** are Markdown files. Stubs first; full drafts later.",
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
        stubLesson(
          "first-time-setup",
          "First-time setup",
          "Choose an agent, connect a backend, and add an LLM.",
          "Individual developers",
          [
            "Install Canvas and pick OpenHands or an ACP agent",
            "Connect a local backend",
            "Save an LLM profile",
          ],
          [
            [
              "First Time Setup",
              "https://docs.openhands.dev/openhands/usage/agent-canvas/first-time-setup",
            ],
          ],
        ),
      ],
    },
    {
      id: "daily-workflow",
      title: "Your daily developer workflow",
      description:
        "Workspaces, prompts, files, and model profiles for everyday coding.",
      level: "beginner",
      lessons: [
        stubLesson(
          "choose-a-workspace",
          "Choose a workspace",
          "Point the agent at a local folder or a connected repository.",
          "Individual developers",
          [
            "Workspace is the folder or repo the agent can edit",
            "Local folder vs connected git repository",
          ],
          [
            [
              "Conversations",
              "https://docs.openhands.dev/openhands/usage/agent-canvas/conversations",
            ],
          ],
        ),
        stubLesson(
          "write-better-instructions",
          "Write better instructions",
          "Ask for outcomes, constraints, and reviewable changes.",
          "Individual developers",
          [
            "Outcome, context, and constraints",
            "Split work that is too large",
          ],
          [
            [
              "Good vs. Bad Instructions",
              "https://docs.openhands.dev/openhands/usage/essential-guidelines/good-vs-bad-instructions",
            ],
          ],
        ),
        stubLesson(
          "follow-the-work",
          "Follow files, terminal, and browser",
          "Watch the agent work and decide what to keep.",
          "Individual developers",
          ["Read diffs before you keep them", "Pause if the agent drifts"],
          [
            [
              "Key Features",
              "https://docs.openhands.dev/openhands/usage/key-features",
            ],
          ],
        ),
        stubLesson(
          "llm-profiles",
          "Save and switch LLM profiles",
          "Keep more than one model ready without re-entering keys.",
          "Individual developers",
          ["Default vs review model", "Switch from the conversation chrome"],
          [
            [
              "Manage LLM Profiles",
              "https://docs.openhands.dev/openhands/usage/agent-canvas/llm-profiles",
            ],
          ],
        ),
      ],
    },
    {
      id: "customize-agent",
      title: "Skills, MCP, and plugins",
      description:
        "Teach the agent your workflows and connect the tools you already use.",
      level: "intermediate",
      lessons: [
        stubLesson(
          "what-are-skills",
          "What skills are",
          "Reusable instructions that stop you from retyping the same prompt.",
          "Individual developers",
          ["Skill vs one-off prompt", "Official skills in OpenHands extensions"],
          [
            [
              "How to Create Effective Agent Skills",
              "https://www.openhands.dev/blog/20260227-creating-effective-agent-skills",
            ],
          ],
        ),
        stubLesson(
          "repo-customization",
          "AGENTS.md and repository skills",
          "Put project rules where every conversation can find them.",
          "Individual developers and teams",
          ["AGENTS.md for every conversation in the repo", "Path-triggered rules"],
          [
            [
              "Repository Customization",
              "https://docs.openhands.dev/openhands/usage/customization/repository",
            ],
          ],
        ),
        stubLesson(
          "connect-mcp",
          "Connect MCP servers",
          "Give the agent GitHub, Slack, and other tools through MCP.",
          "Individual developers",
          ["Marketplace vs custom server", "Secrets stay in settings"],
          [
            [
              "MCP settings",
              "https://docs.openhands.dev/openhands/usage/settings/mcp-settings",
            ],
          ],
        ),
        stubLesson(
          "plugins",
          "Browse and attach plugins",
          "Bundle skills, hooks, MCP, and commands into one package.",
          "Individual developers and teams",
          ["Attach for one conversation", "Review trust before auto-load"],
          [
            [
              "Plugins in Agent Canvas",
              "https://docs.openhands.dev/openhands/usage/agent-canvas/plugins",
            ],
          ],
        ),
      ],
    },
    {
      id: "automations",
      title: "Automations that run without you",
      description:
        "Turn repeated agent work into scheduled and event-driven workflows.",
      level: "intermediate",
      lessons: [
        stubLesson(
          "why-automate",
          "From chats to always-on workflows",
          "When a conversation should become an automation.",
          "Individual developers and companies",
          [
            "Chats for steered work; automations for repeated work",
            "The backend must stay up",
          ],
          [
            [
              "Introducing Agent Canvas",
              "https://www.openhands.dev/blog/introducing-agent-canvas",
            ],
          ],
        ),
        stubLesson(
          "scheduled-automations",
          "Scheduled automations",
          "Daily reports, dependency checks, and other cron-style work.",
          "Individual developers and companies",
          ["Name, schedule, timezone, prompt", "Review a dry run first"],
          [
            [
              "Automations Overview",
              "https://docs.openhands.dev/openhands/usage/automations/overview",
            ],
          ],
        ),
        stubLesson(
          "event-automations",
          "Event-based automations",
          "React to GitHub, Slack, Linear, and custom webhooks.",
          "Companies and power users",
          ["GitHub events vs custom webhooks", "Do not paste signing secrets"],
          [
            [
              "Event-Based Automations",
              "https://docs.openhands.dev/openhands/usage/automations/event-automations",
            ],
          ],
        ),
        stubLesson(
          "prebuilt-automations",
          "Ship a prebuilt automation",
          "PR review, repository monitor, and Slack channel monitor.",
          "Individual developers and companies",
          ["Enable a recommended flow in Automate", "Connect GitHub or Slack first"],
          [
            [
              "Setup a Pre-built Automation",
              "https://docs.openhands.dev/openhands/usage/agent-canvas/prebuilt-automations",
            ],
          ],
        ),
      ],
    },
    {
      id: "sdlc",
      title: "Cover the whole SDLC",
      description:
        "Use OpenHands from planning through deploy, incidents, and maintenance.",
      level: "intermediate",
      lessons: [
        stubLesson(
          "planning",
          "Planning and specs",
          "Turn product asks into technical specs and sprint tasks.",
          "Companies and tech leads",
          ["Specs and architecture options", "Human keeps the decision"],
          [
            [
              "OpenHands in Your SDLC",
              "https://docs.openhands.dev/openhands/usage/essential-guidelines/sdlc-integration",
            ],
          ],
        ),
        stubLesson(
          "implement-and-test",
          "Implement, test, and document",
          "Feature work, bug fixes, coverage, and docs in the same thread.",
          "Individual developers and teams",
          ["Implement from a spec", "Raise coverage with tests that can fail"],
          [
            [
              "Automated QA Testing",
              "https://docs.openhands.dev/openhands/usage/use-cases/qa-changes",
            ],
          ],
        ),
        stubLesson(
          "review-and-prs",
          "Review and pull requests",
          "Automated review, labels, and human gates on every PR.",
          "Teams and companies",
          ["Severity-rated review comments", "Humans still approve"],
          [
            [
              "Automated Code Review",
              "https://docs.openhands.dev/openhands/usage/use-cases/code-review",
            ],
          ],
        ),
        stubLesson(
          "deploy-and-operate",
          "Deploy, incidents, and maintenance",
          "Release notes, rollbacks, triage, and dependency upgrades.",
          "Companies",
          [
            "Release notes and rollback steps",
            "Incidents and dependency upgrades as PRs",
          ],
          [
            [
              "Incident Triage",
              "https://docs.openhands.dev/openhands/usage/use-cases/incident-triage",
            ],
          ],
        ),
      ],
    },
    {
      id: "for-companies",
      title: "OpenHands for teams and companies",
      description:
        "Roll out backends, governance, and shared automations without unsupervised agents.",
      level: "advanced",
      lessons: [
        stubLesson(
          "team-patterns",
          "Solo, team, and enterprise patterns",
          "How ownership and review change as more people use agents.",
          "Companies",
          [
            "Solo daily loop vs small-team review",
            "Platform team sets policy",
          ],
          [
            [
              "OpenHands for Enterprise",
              "https://www.openhands.dev/enterprise",
            ],
          ],
        ),
        stubLesson(
          "where-agents-run",
          "Where agents run",
          "Local, Docker, VM, Kubernetes, Cloud, and Enterprise backends.",
          "Companies and platform teams",
          [
            "UI vs backend vs workspace",
            "Do not schedule org work on a laptop",
          ],
          [
            [
              "Backends",
              "https://docs.openhands.dev/openhands/usage/agent-canvas/backends",
            ],
          ],
        ),
        stubLesson(
          "governance",
          "Governance, secrets, and cost",
          "Policies, audit, RBAC, and budgets around automated work.",
          "Companies",
          ["Secrets in settings", "Budgets and risky-action confirmation"],
          [
            [
              "Enterprise vs. Open Source",
              "https://docs.openhands.dev/enterprise/enterprise-vs-oss",
            ],
          ],
        ),
        stubLesson(
          "measure-and-scale",
          "Measure quality and scale",
          "Track merge rates, rejected suggestions, and which workflows pay off.",
          "Companies",
          ["Merge rate and human overrides", "Improve the skill, not only the model"],
          [
            [
              "Monitoring and Improving Skills",
              "https://docs.openhands.dev/overview/skills/monitoring",
            ],
          ],
        ),
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
    cover: parseOptionalHttpsUrl(value.cover),
    lessons: value.lessons.map((lesson, lessonIndex) =>
      parseLesson(lesson, value.id, lessonIndex),
    ),
  };
}

function parseOptionalHttpsUrl(value) {
  if (typeof value !== "string" || !value.trim()) return "";
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
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
    renderHome(root, { host, catalog, go, signal });
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

function renderHome(root, { host, catalog, go, signal }) {
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
    const rows = [heroCarousel(catalog.courses, go, signal)];
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
        ? button("Start", () => go(`course/${course.id}/lesson/${first.id}`), "primary")
        : null,
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
    page.append(player, lessonPager(course, lesson, go));
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
    page.append(article, lessonPager(course, lesson, go));
  } catch (error) {
    if (!asyncRenderGuard(signal)) return;
    pending.replaceWith(
      statusNode(
        "error",
        error instanceof Error ? error.message : "Unable to load the article.",
        "learning-center-error",
      ),
    );
    page.append(lessonPager(course, lesson, go));
  }
  void catalog;
}

function lessonPager(course, lesson, go) {
  const index = course.lessons.findIndex((item) => item.id === lesson.id);
  const previous = index > 0 ? course.lessons[index - 1] : null;
  const following =
    index >= 0 && index < course.lessons.length - 1
      ? course.lessons[index + 1]
      : null;
  const nav = document.createElement("nav");
  nav.className = "oh-lc-lesson-nav";
  nav.dataset.testid = "learning-center-lesson-nav";
  nav.setAttribute("aria-label", "Lesson");
  const back = button(
    "Back",
    () =>
      go(
        previous
          ? `course/${course.id}/lesson/${previous.id}`
          : `course/${course.id}`,
      ),
    "ghost",
  );
  back.dataset.testid = "lesson-nav-back";
  const next = button(
    "Next",
    () =>
      go(
        following
          ? `course/${course.id}/lesson/${following.id}`
          : `course/${course.id}`,
      ),
    "primary",
  );
  next.dataset.testid = "lesson-nav-next";
  nav.append(back, next);
  return nav;
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
  const nodes = extras.filter(Boolean);
  const chips = nodes.filter((node) => node.classList.contains("oh-lc-badge"));
  const actions = nodes.filter((node) => !node.classList.contains("oh-lc-badge"));
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
  if (chips.length) {
    const row = document.createElement("div");
    row.className = "oh-lc-badge-row";
    row.append(...chips);
    copy.append(row);
  }
  wrap.append(copy);
  if (actions.length) {
    const bar = document.createElement("div");
    bar.className = "oh-lc-actions";
    bar.append(...actions);
    wrap.append(bar);
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
  const mark = openHandsLogo("oh-lc-mark");
  const name = document.createElement("span");
  name.className = "oh-lc-brand-name";
  name.textContent = "Learning Center";
  brand.append(mark, name);
  brand.addEventListener("click", () => go());
  bar.append(brand);
  return bar;
}

function heroCarousel(courses, go, signal) {
  const section = document.createElement("section");
  section.className = "oh-lc-hero-carousel";
  section.dataset.testid = "learning-center-hero";
  section.setAttribute("aria-roledescription", "carousel");
  section.setAttribute("aria-label", "Featured courses");

  const stage = document.createElement("div");
  stage.className = "oh-lc-hero-stage";

  const slides = courses.map((course, index) => {
    const slide = document.createElement("article");
    slide.className = "oh-lc-hero-slide";
    slide.dataset.testid = `hero-slide-${course.id}`;
    if (index === 0) slide.dataset.active = "true";
    else {
      slide.setAttribute("aria-hidden", "true");
      slide.inert = true;
    }
    const first = course.lessons[0];
    const copy = document.createElement("div");
    copy.className = "oh-lc-hero-copy";
    const kicker = document.createElement("p");
    kicker.className = "oh-lc-kicker";
    kicker.textContent = course.level ? `${course.level} course` : "Featured";
    const title = document.createElement(index === 0 ? "h1" : "h2");
    title.className = "oh-lc-title";
    title.textContent = course.title;
    const lead = document.createElement("p");
    lead.className = "oh-lc-lead";
    lead.textContent = course.description;
    const actions = document.createElement("div");
    actions.className = "oh-lc-actions";
    if (first) {
      actions.append(
        button(
          "Start",
          () => go(`course/${course.id}/lesson/${first.id}`),
          "primary",
        ),
      );
    }
    actions.append(button("More info", () => go(`course/${course.id}`), "ghost"));
    copy.append(kicker, title, lead, actions);
    const media = document.createElement("div");
    media.className = "oh-lc-hero-media";
    const image = document.createElement("img");
    image.alt = "";
    image.src = course.cover || coverDataUri();
    media.append(image);
    slide.append(copy, media);
    return slide;
  });
  for (const slide of slides) stage.append(slide);
  section.append(stage);

  if (slides.length > 1) {
    let active = 0;
    const nav = document.createElement("div");
    nav.className = "oh-lc-hero-nav";
    const prev = document.createElement("button");
    prev.type = "button";
    prev.className = "oh-lc-hero-arrow";
    prev.setAttribute("aria-label", "Previous featured course");
    prev.textContent = "‹";
    prev.addEventListener("click", () => show(active - 1));
    const next = document.createElement("button");
    next.type = "button";
    next.className = "oh-lc-hero-arrow";
    next.setAttribute("aria-label", "Next featured course");
    next.textContent = "›";
    next.addEventListener("click", () => show(active + 1));
    const dots = document.createElement("div");
    dots.className = "oh-lc-hero-dots";
    const dotButtons = courses.map((course, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "oh-lc-hero-dot";
      dot.setAttribute("aria-label", `Show ${course.title}`);
      if (index === 0) dot.setAttribute("aria-current", "true");
      dot.addEventListener("click", () => show(index));
      dots.append(dot);
      return dot;
    });

    const show = (nextIndex) => {
      active = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, index) => {
        const isActive = index === active;
        if (isActive) {
          slide.dataset.active = "true";
          slide.removeAttribute("aria-hidden");
          slide.inert = false;
        } else {
          delete slide.dataset.active;
          slide.setAttribute("aria-hidden", "true");
          slide.inert = true;
        }
      });
      dotButtons.forEach((dot, index) => {
        if (index === active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    };

    nav.append(prev, dots, next);
    section.append(nav);

    const reduceMotion = globalThis.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;
    if (!reduceMotion && signal && !signal.aborted) {
      const timer = globalThis.setInterval(() => show(active + 1), 7000);
      signal.addEventListener("abort", () => globalThis.clearInterval(timer), {
        once: true,
      });
    }
  }

  return section;
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
    cover: course.cover,
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

function tile({
  testId,
  seed,
  cover,
  title,
  headingLevel,
  description,
  badges,
  onClick,
}) {
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
  card.append(poster(seed, cover), copy);
  card.addEventListener("click", onClick);
  return card;
}

function poster(seed, cover) {
  const node = document.createElement("div");
  node.className = "oh-lc-poster";
  const image = document.createElement("img");
  image.alt = "";
  image.src = cover || coverDataUri();
  node.append(image);
  return node;
}

const OPENHANDS_LOGO_PATHS = [
  "M71.754 16.863V2.97414C71.754 1.82355 72.6871 0.890503 73.8377 0.890503C74.9883 0.890503 75.9213 1.82355 75.9213 2.97414V16.863C75.9213 18.0136 74.9883 18.9466 73.8377 18.9466C72.6871 18.9466 71.754 18.0136 71.754 16.863Z",
  "M82.5273 18.9329L89.4717 6.90477C90.047 5.90832 91.3215 5.5668 92.318 6.1421C93.3144 6.7174 93.6559 7.99197 93.0806 8.98841L86.1362 21.0165C85.5609 22.0129 84.2864 22.3545 83.2899 21.7792C82.2935 21.2039 81.952 19.9293 82.5273 18.9329Z",
  "M65.1481 18.9329L58.2037 6.90477C57.6284 5.90832 56.3538 5.5668 55.3574 6.1421C54.3609 6.7174 54.0194 7.99197 54.5947 8.98841L61.5391 21.0165C62.1144 22.0129 63.389 22.3545 64.3854 21.7792C65.3819 21.2039 65.7234 19.9293 65.1481 18.9329Z",
  "M140.606 62.0292C140.606 58.409 141.583 47.6748 141.89 44.1323C142.097 41.7374 141.809 40.4247 141.424 39.7542C141.141 39.2626 140.699 38.915 139.634 38.8436C138.865 38.7921 138.027 39.0114 137.401 39.5761C136.814 40.1052 136.159 41.1682 136.159 43.3176L136.155 43.4388L135.198 59.758C135.164 60.3451 134.883 60.8911 134.424 61.2599C133.966 61.6284 133.374 61.7859 132.793 61.6941L122.764 60.1068L111.948 58.6703C110.949 58.5376 110.188 57.7084 110.142 56.7016L109.545 43.8055L109.54 43.6959C109.274 38.5609 109.022 33.8767 109.022 32.4282C109.022 28.3859 108.338 26.6806 107.74 25.9634C107.263 25.3915 106.577 25.1402 105.11 25.1402C104.583 25.1402 104.212 25.2481 103.933 25.4111C103.659 25.5714 103.346 25.8587 103.049 26.4208C102.41 27.6257 101.945 29.891 102.118 33.8479C102.342 38.9804 102.692 42.8146 103.035 46.2718C103.377 49.7231 103.718 52.8561 103.908 56.4971C104.204 62.1966 104.178 66.1256 103.945 68.7924C103.828 70.124 103.656 71.1996 103.423 72.0501C103.202 72.8558 102.871 73.6757 102.296 74.2887C101.6 75.0303 100.608 75.3844 99.577 75.136C98.7592 74.9389 98.1847 74.4215 97.8706 74.0916C97.2141 73.4017 96.7501 72.5106 96.568 72.0512C95.5097 69.3812 92.2352 63.1808 87.8023 59.6811C86.5089 58.6599 85.5666 58.3652 84.9736 58.3204C84.4148 58.2783 84.0094 58.4436 83.6909 58.6967C83.34 58.9756 83.0781 59.3811 82.9479 59.7643C82.9019 59.8999 82.8823 59.9968 82.8741 60.0584C84.0759 62.0865 88.8421 69.5222 91.0896 77.069C92.7648 82.6941 96.8038 88.4259 99.8194 90.8809C102.74 93.258 107.988 94.7313 113.9 95.0218C119.756 95.3095 125.788 94.4121 130.033 92.5092C138.233 88.8334 139.903 80.7382 140.651 77.2292C141.232 74.5057 141.243 71.5987 141.087 68.9009C141.01 67.5551 140.894 66.2969 140.793 65.1373C140.695 64.0105 140.606 62.9215 140.606 62.0292ZM120.986 27.0953C120.986 25.8314 120.648 24.7049 120.089 23.9514C119.583 23.27 118.84 22.7987 117.646 22.7984C116.668 22.7982 116.011 22.9187 115.546 23.1167C115.13 23.2943 114.781 23.5699 114.463 24.0831C113.73 25.2671 113.192 27.6455 113.189 32.384L113.707 43.6021C113.901 47.3443 114.103 51.3994 114.236 54.7707L120.986 55.6666V27.0953ZM125.153 56.2652L131.172 57.218L131.992 43.267V32.5083C131.992 31.031 131.39 30.1275 130.678 29.5489C129.884 28.9039 128.957 28.6731 128.519 28.6731C127.722 28.6731 126.899 28.797 126.306 29.2179C125.849 29.5421 125.153 30.3087 125.153 32.5083V56.2652ZM136.159 35.4278C137.406 34.8069 138.74 34.6083 139.912 34.6868C142.037 34.8292 143.91 35.718 145.037 37.6779C146.06 39.4592 146.273 41.8136 146.041 44.4927C145.72 48.1949 144.772 58.6457 144.772 62.0292C144.772 62.708 144.843 63.6116 144.944 64.7758C145.042 65.907 145.165 67.2389 145.247 68.6606C145.411 71.4987 145.422 74.8383 144.727 78.0987C144.002 81.4953 142.041 91.6918 131.738 96.3108C126.731 98.5551 120.002 99.4936 113.696 99.1838C107.445 98.8767 101.128 97.3189 97.1887 94.1122C93.4809 91.0936 88.9938 84.6307 87.0962 78.2589C84.9529 71.0619 80.3109 63.9646 79.1527 61.9533C78.4706 60.7689 78.684 59.3628 79.0019 58.4258C79.3607 57.3688 80.0554 56.2631 81.0993 55.4337C82.1758 54.5784 83.6043 54.0377 85.2876 54.1647C86.9369 54.2893 88.6462 55.0393 90.3834 56.4107C94.8541 59.9401 98.1342 65.5082 99.7424 68.9231C99.759 68.7664 99.779 68.6024 99.7941 68.4298C100.003 66.0435 100.039 62.3344 99.7467 56.7132C99.5635 53.1942 99.2356 50.1809 98.8888 46.6828C98.5425 43.1904 98.184 39.2713 97.955 34.0302C97.7722 29.8481 98.2012 26.6722 99.3672 24.471C99.9716 23.3302 100.79 22.4223 101.83 21.814C102.866 21.2087 103.995 20.974 105.11 20.974C106.759 20.974 108.813 21.2062 110.448 22.7678C110.593 22.4576 110.75 22.1652 110.921 21.8899C111.676 20.6698 112.681 19.8084 113.912 19.2835C115.095 18.7791 116.378 18.6309 117.646 18.6311C120.195 18.6315 122.165 19.7565 123.435 21.4683C124.257 22.576 124.75 23.8776 124.985 25.1982C126.338 24.5876 127.691 24.5068 128.519 24.5068C129.933 24.5068 131.784 25.0791 133.305 26.3154C134.908 27.6179 136.159 29.6733 136.159 32.5083V35.4278Z",
  "M7.15667 62.0292C7.15667 58.409 6.18001 47.6748 5.87297 44.1323C5.66546 41.7374 5.95363 40.4247 6.33881 39.7542C6.62122 39.2626 7.06342 38.915 8.1284 38.8436C8.89765 38.7921 9.7355 39.0114 10.3617 39.5761C10.9484 40.1052 11.6032 41.1682 11.6032 43.3176L11.6075 43.4388L12.5644 59.758C12.5989 60.3451 12.8798 60.8911 13.338 61.2599C13.7961 61.6284 14.3888 61.7859 14.9695 61.6941L24.9988 60.1068L35.8144 58.6703C36.8136 58.5376 37.5741 57.7084 37.6208 56.7016L38.2174 43.8055L38.2226 43.6959C38.4887 38.5609 38.7401 33.8767 38.7401 32.4282C38.7401 28.3859 39.4246 26.6806 40.0228 25.9634C40.4997 25.3915 41.1851 25.1402 42.6523 25.1402C43.1795 25.1402 43.5506 25.2481 43.8296 25.4111C44.1038 25.5714 44.416 25.8587 44.7139 26.4208C45.3521 27.6257 45.8174 29.891 45.6445 33.8479C45.4202 38.9804 45.0703 42.8146 44.7276 46.2718C44.3854 49.7231 44.0444 52.8561 43.8549 56.4971C43.5583 62.1966 43.5848 66.1256 43.818 68.7924C43.9345 70.124 44.107 71.1996 44.3397 72.0501C44.5602 72.8558 44.891 73.6757 45.4664 74.2887C46.1626 75.0303 47.1547 75.3844 48.1855 75.136C49.0033 74.9389 49.5779 74.4215 49.8919 74.0916C50.5484 73.4017 51.0124 72.5106 51.1945 72.0512C52.2528 69.3812 55.5273 63.1808 59.9602 59.6811C61.2536 58.6599 62.1959 58.3652 62.7889 58.3204C63.3477 58.2783 63.7531 58.4436 64.0716 58.6967C64.4225 58.9756 64.6844 59.3811 64.8146 59.7643C64.8606 59.8999 64.8802 59.9968 64.8884 60.0584C63.6866 62.0865 58.9205 69.5222 56.6729 77.069C54.9978 82.6941 50.9587 88.4259 47.9431 90.8809C45.0229 93.258 39.7748 94.7313 33.8625 95.0218C28.0069 95.3095 21.9748 94.4121 17.7298 92.5092C9.52994 88.8334 7.85968 80.7382 7.11135 77.2292C6.5306 74.5057 6.51956 71.5987 6.67502 68.9009C6.75257 67.5551 6.86815 66.2969 6.96907 65.1373C7.06713 64.0105 7.15666 62.9215 7.15667 62.0292ZM26.7768 27.0953C26.7768 25.8314 27.1148 24.7049 27.6737 23.9514C28.1793 23.27 28.9221 22.7987 30.1168 22.7984C31.0942 22.7982 31.7519 22.9187 32.2162 23.1167C32.6327 23.2943 32.9818 23.5699 33.2997 24.0831C34.0329 25.2671 34.5706 27.6455 34.5739 32.384L34.0554 43.6021C33.8615 47.3443 33.6592 51.3994 33.5263 54.7707L26.7768 55.6666V27.0953ZM22.6096 56.2652L16.5905 57.218L15.7705 43.267V32.5083C15.7705 31.031 16.3726 30.1275 17.0848 29.5489C17.8786 28.9039 18.8059 28.6731 19.2433 28.6731C20.0405 28.6731 20.8635 28.797 21.4565 29.2179C21.9131 29.5421 22.6095 30.3087 22.6096 32.5083V56.2652ZM11.6032 35.4278C10.3568 34.8069 9.02271 34.6083 7.85016 34.6868C5.72547 34.8292 3.85203 35.718 2.7259 37.6779C1.70253 39.4592 1.4893 41.8136 1.7215 44.4927C2.04237 48.1949 2.99044 58.6457 2.99044 62.0292C2.99043 62.708 2.91997 63.6116 2.81865 64.7758C2.7202 65.907 2.59705 67.2389 2.51511 68.6606C2.35156 71.4987 2.34047 74.8383 3.03576 78.0987C3.76011 81.4953 5.7216 91.6918 16.0245 96.3108C21.0312 98.5551 27.7601 99.4936 34.0669 99.1838C40.3173 98.8767 46.6346 97.3189 50.5738 94.1122C54.2816 91.0936 58.7687 84.6307 60.6663 78.2589C62.8096 71.0619 67.4516 63.9646 68.6099 61.9533C69.292 60.7689 69.0785 59.3628 68.7606 58.4258C68.4018 57.3688 67.7071 56.2631 66.6632 55.4337C65.5867 54.5784 64.1582 54.0377 62.4749 54.1647C60.8256 54.2893 59.1163 55.0393 57.3791 56.4107C52.9084 59.9401 49.6283 65.5082 48.0201 68.9231C48.0035 68.7664 47.9835 68.6024 47.9684 68.4298C47.7597 66.0435 47.7233 62.3344 48.0159 56.7132C48.199 53.1942 48.5269 50.1809 48.8738 46.6828C49.22 43.1904 49.5785 39.2713 49.8076 34.0302C49.9903 29.8481 49.5613 26.6722 48.3953 24.471C47.7909 23.3302 46.9729 22.4223 45.9322 21.814C44.8964 21.2087 43.7676 20.974 42.6523 20.974C41.0038 20.974 38.9498 21.2062 37.3141 22.7678C37.1699 22.4576 37.0125 22.1652 36.842 21.8899C36.0864 20.6698 35.0817 19.8084 33.8509 19.2835C32.668 18.7791 31.3849 18.6309 30.1168 18.6311C27.5676 18.6315 25.5976 19.7565 24.3275 21.4683C23.5057 22.576 23.0121 23.8776 22.7771 25.1982C21.4248 24.5876 20.0718 24.5068 19.2433 24.5068C17.8299 24.5068 15.9789 25.0791 14.4573 26.3154C12.8543 27.6179 11.6033 29.6733 11.6032 32.5083V35.4278Z"
];

function openHandsLogo(className) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 148 100");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add(className);
  for (const d of OPENHANDS_LOGO_PATHS) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    svg.append(path);
  }
  return svg;
}

/** Neutral UI plate / mark — data URIs cannot inherit --oh-* tokens. */
const COVER_PLATE = "#282828";
const COVER_MARK = "#565656";

function themeHex(name, fallback) {
  if (typeof document === "undefined" || typeof getComputedStyle !== "function") {
    return fallback;
  }
  const probe = document.createElement("span");
  probe.style.color = `var(${name}, ${fallback})`;
  (document.body || document.documentElement).append(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  const match = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(resolved);
  if (!match) return fallback;
  return `#${[1, 2, 3]
    .map((index) => Number(match[index]).toString(16).padStart(2, "0"))
    .join("")}`;
}

function coverDataUri() {
  const plate = themeHex("--oh-surface-raised", COVER_PLATE);
  const mark = themeHex("--cool-grey-600", COVER_MARK);
  const marks = OPENHANDS_LOGO_PATHS.map((d) => `<path d="${d}"/>`).join("");
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" data-oh-logo="true">`,
    `<rect width="640" height="400" fill="${plate}"/>`,
    `<g transform="translate(239 145) scale(1.1)" fill="${mark}">${marks}</g>`,
    `</svg>`,
  ].join("");
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
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
    card.append(number, poster(`${course.id}-${lesson.id}`), copy);
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
