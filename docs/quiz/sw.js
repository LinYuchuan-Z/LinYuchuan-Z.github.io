const CACHE='module-quiz-20261021-v3';
const ROOT=new URL('./',self.location.href);
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(ASSETS.map(p=>new URL(p,ROOT).href));await self.skipWaiting();})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('module-quiz-')&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{const req=event.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==ROOT.origin||!url.pathname.startsWith(ROOT.pathname))return;
event.respondWith((async()=>{const cache=await caches.open(CACHE);if(req.mode==='navigate'){try{const response=await fetch(req);if(!response.ok)throw Error('navigation failed');return response;}catch(error){const fallback=await cache.match(new URL('index.html',ROOT).href);if(fallback)return fallback;throw error;}}
const saved=await cache.match(req,{ignoreSearch:true});if(saved)return saved;return fetch(req);})());});
