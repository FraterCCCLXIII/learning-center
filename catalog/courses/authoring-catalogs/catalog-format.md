# Catalog format

Publish a `catalog.json` file at the repository path you enter in **Catalog source**. The Learning Center fetches that file from GitHub, then loads article Markdown from paths relative to the same directory.

```json
{
  "title": "Team Learning Center",
  "description": "Internal onboarding courses.",
  "courses": [
    {
      "id": "onboarding",
      "title": "Onboarding",
      "description": "Your first week.",
      "level": "beginner",
      "lessons": [
        {
          "id": "welcome",
          "title": "Welcome",
          "kind": "article",
          "path": "courses/onboarding/welcome.md"
        },
        {
          "id": "overview-video",
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

- Course and lesson `id` values use lowercase kebab-case.
- Article lessons need a `path` or inline `body`.
- Video lessons need an `https` YouTube, Vimeo, or media-file URL.
- Keep lesson files inside the catalog directory. The App will not follow `..` paths.
