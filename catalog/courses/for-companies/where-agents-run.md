# Where agents run

_Stub article._ Outline only — full draft later.

**Audience:** Companies and platform teams  
**Sources:** [Agent Canvas overview](https://docs.openhands.dev/openhands/usage/agent-canvas/overview) · [Backends](https://docs.openhands.dev/openhands/usage/agent-canvas/backends) · [Introducing Agent Canvas](https://www.openhands.dev/blog/introducing-agent-canvas)

## What this lesson covers

- Canvas is the UI; the backend is where tools and the workspace run
- Local laptop → Docker → VM / always-on → Cloud or Enterprise VPC
- Automations need a backend that does not sleep when you close the lid
- Settings, secrets, MCP, and automations persist on the selected backend

## Outline

1. Browser UI vs backend vs workspace
2. Local and Docker for trying things
3. VM or Kubernetes when work must stay up
4. Cloud / Enterprise when the org needs shared sandboxes

## Try this

Map one workflow to a backend: laptop for spikes, VM or Cloud for the nightly report. Do not schedule org automations on a developer laptop.
