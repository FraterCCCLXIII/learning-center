# Learning Center

An OpenHands App for Agent Canvas. It adds a **Learning Center** page with courses of articles and videos, then populates them from this repository's [`catalog/`](./catalog) directory.

This package targets Canvas Extensions API **manifest schema 1** and **host API 1**.

## Install in Agent Canvas

Installation leaves the App **disabled**. Enable it from Customize → Apps after reviewing the trusted-code disclosure.

| Field | Value |
| --- | --- |
| Source | `github:FraterCCCLXIII/learning-center` |
| Ref | `main` |
| Repository path | _(leave empty — the App lives at the repo root)_ |

## Load the catalog

After the App is enabled, open **Learning Center** → **Catalog source** and use the same repository:

| Field | Value |
| --- | --- |
| GitHub owner | `FraterCCCLXIII` |
| Repository | `learning-center` |
| Ref | `main` |
| Catalog directory | `catalog` |

The App fetches `catalog.json` from GitHub, then loads article Markdown from that directory. Until you connect a source, it shows the built-in sample catalog.

## Catalog format

```json
{
  "title": "Team Learning Center",
  "description": "Internal onboarding courses.",
  "courses": [
    {
      "id": "onboarding",
      "title": "Onboarding",
      "level": "beginner",
      "lessons": [
        {
          "id": "welcome",
          "title": "Welcome",
          "kind": "article",
          "path": "courses/onboarding/welcome.md"
        },
        {
          "id": "overview",
          "title": "Product overview",
          "kind": "video",
          "url": "https://www.youtube.com/watch?v=VIDEO_ID",
          "duration": "6:12"
        }
      ]
    }
  ]
}
```

Rules:

- Course and lesson `id` values are lowercase kebab-case.
- Article lessons need `path` (relative to the catalog directory) or inline `body`.
- Video lessons need an `https` YouTube, Vimeo, or `.mp4` / `.webm` / `.ogg` URL.
- Paths must stay inside the catalog directory. `..` segments are rejected.

## Routes

| Canvas path | Remainder | Page |
| --- | --- | --- |
| `/extensions/learning-center/center` | _(empty)_ | Course catalog |
| `/extensions/learning-center/center/source` | `source` | Catalog source form |
| `/extensions/learning-center/center/course/{id}` | `course/{id}` | Course outline |
| `/extensions/learning-center/center/course/{id}/lesson/{id}` | `course/{id}/lesson/{id}` | Article or video |

## Develop

The entrypoint is a self-contained browser ESM file (`extension.js`). Do not add bare package imports.

```sh
npx vitest run extension.test.js
```
