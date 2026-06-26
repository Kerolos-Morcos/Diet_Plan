const CACHE = "diet-pwa-v9";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./favicon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request).catch(() => caches.match("./index.html")))
  );
});

self.addEventListener("message", (e) => {
  if (e.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
    return;
  }

  if (e.data?.type === "NOTIFY") {
    self.registration.showNotification(e.data.title || "Diet Planner", {
      body: e.data.body || "",
      tag: e.data.tag || "diet-reminder",
      badge: "./favicon.png",
      icon: "./favicon.png",
      requireInteraction: !!e.data.requireInteraction,
      renotify: true,
      actions: e.data.actions || [],
      data: e.data.data || {},
    });
  }
});

async function sendActionToClient(action, data) {
  const allClients = await clients.matchAll({ type: "window", includeUncontrolled: true });
  const payload = {
    type: "ALARM_ACTION",
    action,
    taskId: data?.taskId,
    date: data?.date,
  };
  for (const client of allClients) {
    client.postMessage(payload);
    if ("focus" in client) return client.focus();
  }
  const url = new URL("./", self.location.href);
  url.searchParams.set("alarmAction", action);
  if (data?.taskId) url.searchParams.set("taskId", data.taskId);
  if (data?.date) url.searchParams.set("date", data.date);
  return clients.openWindow(url.href);
}

self.addEventListener("notificationclick", (event) => {
  const action = event.action || "open";
  const data = event.notification.data || {};
  event.notification.close();
  if (action === "done" || action === "snooze") {
    event.waitUntil(sendActionToClient(action, data));
    return;
  }
  event.waitUntil(sendActionToClient("open", data));
});
