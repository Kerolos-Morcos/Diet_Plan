const CACHE = "diet-pwa-auto-cache";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const isAppFile =
    url.pathname.endsWith("/") ||
    url.pathname.endsWith("/index.html") ||
    url.pathname.endsWith("/app.js") ||
    url.pathname.endsWith("/styles.css") ||
    url.pathname.endsWith("/manifest.webmanifest") ||
    url.pathname.endsWith("/sw.js");

  if (isAppFile) {
    event.respondWith(
      fetch(event.request, { cache: "no-store" })
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          return res;
        })
      );
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data?.type === "NOTIFY") {
    const actions = event.data.actions || [];

    self.registration.showNotification(event.data.title || "Diet Planner", {
      body: event.data.body || "",
      tag: event.data.tag || "diet-reminder",
      icon: "./favicon.png",
      badge: "./favicon.png",
      actions,
      data: event.data,
    });
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const action = event.action;
  const data = event.notification.data || {};

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      const url = `./?notificationAction=${encodeURIComponent(action || "open")}&taskId=${encodeURIComponent(data.taskId || "")}`;

      for (const client of clientList) {
        client.focus();
        client.postMessage({
          type: "NOTIFICATION_ACTION",
          action,
          taskId: data.taskId,
        });
        return;
      }

      return clients.openWindow(url);
    })
  );
});