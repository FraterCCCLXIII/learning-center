import { afterEach, describe, expect, it, vi } from "vitest";
import { activate } from "./extension.js";

afterEach(() => {
  localStorage.clear();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function createHost(overrides = {}) {
  let mountPage;
  const unregister = vi.fn();
  const navigate = vi.fn();
  const request = vi.fn();
  const host = {
    apiVersion: "1",
    extension: {
      name: "learning-center",
      version: "0.1.0",
      resolvedRef: "test-ref",
    },
    backend: { id: "local-test", kind: "local", orgId: null },
    registerPage: vi.fn((id, mount) => {
      expect(id).toBe("center");
      mountPage = mount;
      return unregister;
    }),
    navigate,
    agentServer: { request },
    ...overrides,
  };
  return { host, unregister, navigate, request, getMount: () => mountPage };
}

function mount(hostFactory = createHost, path = "") {
  const created = hostFactory();
  expect(activate(created.host)).toBe(created.unregister);
  const container = document.createElement("div");
  const cleanup = created.getMount()({
    container,
    path,
    navigate: created.navigate,
  });
  return { ...created, container, cleanup };
}

function setSource(source) {
  localStorage.setItem(
    "openhands-app:learning-center:local-test:catalog-source",
    JSON.stringify(source),
  );
}

describe("Learning Center app", () => {
  it("registers the declared page exactly once", () => {
    const { host } = createHost();
    activate(host);
    expect(host.registerPage).toHaveBeenCalledTimes(1);
    expect(host.registerPage).toHaveBeenCalledWith(
      "center",
      expect.any(Function),
    );
  });

  it("rejects unsupported host API versions", () => {
    const { host } = createHost({ apiVersion: "2" });
    expect(() => activate(host)).toThrow("host API 1");
    expect(host.registerPage).not.toHaveBeenCalled();
  });

  it("renders the sample catalog on the root route", async () => {
    const { container, cleanup } = mount();

    await vi.waitFor(() => {
      expect(
        container.querySelector('[data-testid="learning-center-home"]'),
      ).not.toBeNull();
    });
    expect(container.textContent).toContain("Getting started with Agent Canvas");
    expect(container.textContent).toContain("Showing the sample catalog");

    cleanup();
    expect(container.childElementCount).toBe(0);
  });

  it("renders a nested course route from the remainder path", async () => {
    const { container } = mount(createHost, "course/getting-started");

    await vi.waitFor(() => {
      expect(
        container.querySelector('[data-testid="learning-center-course"]'),
      ).not.toBeNull();
    });
    expect(container.textContent).toContain("Welcome to Agent Canvas");
    expect(container.textContent).toContain("Start your first conversation");
  });

  it("renders an article lesson and a video lesson", async () => {
    const article = mount(
      createHost,
      "course/getting-started/lesson/welcome",
    );
    await vi.waitFor(() => {
      expect(
        article.container.querySelector(
          '[data-testid="learning-center-lesson"]',
        ),
      ).not.toBeNull();
    });
    expect(article.container.textContent).toContain(
      "Agent Canvas is the control center for OpenHands",
    );

    const video = mount(
      createHost,
      "course/authoring-catalogs/lesson/sample-walkthrough",
    );
    await vi.waitFor(() => {
      expect(video.container.querySelector("video")).not.toBeNull();
    });
    expect(video.container.querySelector("video")?.getAttribute("src")).toContain(
      "BigBuckBunny.mp4",
    );
  });

  it("renders a safe not-found state for unknown nested routes", async () => {
    const { container, navigate } = mount(createHost, "nope/not-a-page");

    await vi.waitFor(() => {
      expect(
        container.querySelector('[data-testid="learning-center-error"]'),
      ).not.toBeNull();
    });
    expect(container.textContent).toContain("was not found");

    container.querySelector("button")?.click();
    expect(navigate).toHaveBeenCalledWith("/extensions/learning-center/center");
  });

  it("fetches catalog.json from the configured GitHub repo", async () => {
    setSource({
      kind: "github",
      owner: "acme",
      repo: "learn",
      ref: "main",
      path: "catalog",
    });
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () =>
        JSON.stringify({
          title: "Remote catalog",
          courses: [
            {
              id: "remote-course",
              title: "Remote course",
              lessons: [
                {
                  id: "remote-article",
                  title: "Remote article",
                  kind: "article",
                  body: "# Hello from the repo",
                },
              ],
            },
          ],
        }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { container } = mount();
    await vi.waitFor(() => {
      expect(container.textContent).toContain("Remote course");
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://raw.githubusercontent.com/acme/learn/main/catalog/catalog.json",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
    expect(container.textContent).toContain("github:acme/learn@main/catalog");
  });

  it("renders a safe error for a malformed remote catalog", async () => {
    setSource({
      kind: "github",
      owner: "acme",
      repo: "learn",
      ref: "main",
      path: "",
    });
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        text: async () => JSON.stringify({ title: "Broken" }),
      }),
    );

    const { container } = mount();
    await vi.waitFor(() => {
      expect(
        container.querySelector('[data-testid="learning-center-error"]'),
      ).not.toBeNull();
    });
    expect(container.textContent).toContain("courses array");
  });

  it("does not write after the mount disposer runs", async () => {
    setSource({
      kind: "github",
      owner: "acme",
      repo: "learn",
      ref: "main",
      path: "",
    });
    let resolveFetch;
    vi.stubGlobal(
      "fetch",
      vi.fn(
        () =>
          new Promise((resolve) => {
            resolveFetch = resolve;
          }),
      ),
    );

    const { container, cleanup } = mount();
    expect(
      container.querySelector('[data-testid="learning-center-loading"]'),
    ).not.toBeNull();
    cleanup();
    resolveFetch({
      ok: true,
      text: async () =>
        JSON.stringify({
          title: "Late",
          courses: [
            {
              id: "late",
              title: "Late course",
              lessons: [
                {
                  id: "late-lesson",
                  title: "Late",
                  kind: "article",
                  body: "should not appear",
                },
              ],
            },
          ],
        }),
    });
    await Promise.resolve();
    expect(container.childElementCount).toBe(0);
    expect(container.textContent).not.toContain("Late course");
  });
});
