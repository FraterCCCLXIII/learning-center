# Review and pull requests

_Stub article._ Outline only — full draft later.

**Audience:** Teams and companies  
**Sources:** [Automated Code Review](https://docs.openhands.dev/openhands/usage/use-cases/code-review) · [PR Review (SDK)](https://docs.openhands.dev/sdk/guides/github-workflows/pr-review) · [OpenHands in Your SDLC](https://docs.openhands.dev/openhands/usage/essential-guidelines/sdlc-integration)

## What this lesson covers

- Review for security, performance, tests, and docs
- Composite GitHub Action: `OpenHands/extensions/plugins/pr-review`
- Labels, severity, and what should block merge
- Humans still approve; the agent comments

## Outline

1. Review prompt and severity levels
2. Wire PR-opened automation or the composite action
3. Ignore generated and vendor paths
4. Respond to findings, do not rubber-stamp

## Try this

On a draft PR, ask Canvas (or the PR review automation) for severity-rated comments. Fix one critical or security item yourself so the loop stays human-owned.
