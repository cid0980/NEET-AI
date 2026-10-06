/* NEET Tutor — optional companion service worker.
   Put this file NEXT TO neet-ai-tutor.html whenever the app is hosted online
   (any static host). It is what lets Chrome offer the one-tap install prompt
   and keeps the whole app working with no connection.
   If the file is absent the app notices and simply skips registration —
   nothing breaks. Opening the HTML as a local file never touches it. */
const CACHE = 'neet-tutor-v1';

self.addEventListener('install', () => { self.skipWaiting(); });

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    // Network first: a newly built tutor beats a stale cached one.
    e.respondWith(
      fetch(req)
        .then(r => {
          const copy = r.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
          return r;
        })
        .catch(() => caches.match(req).then(m => m || caches.match('./')))
    );
    return;
  }

  // Everything else: serve from cache, refresh in the background.
  e.respondWith(
    caches.match(req).then(m => {
      const fresh = fetch(req)
        .then(r => {
          if (r && r.ok) {
            const copy = r.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return r;
        })
        .catch(() => m);
      return m || fresh;
    })
  );
});
