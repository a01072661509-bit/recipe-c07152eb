const C='gieokhae-v13',F=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
const save=(req,res)=>{if(res.ok){const c=res.clone();caches.open(C).then(x=>x.put(req,c))}return res};
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 const netFirst=u.pathname.endsWith('recipes.json')||u.pathname.endsWith('/')||u.pathname.endsWith('index.html');
 if(netFirst)e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>save(e.request,r)).catch(()=>caches.match(e.request,{ignoreSearch:true})));
 else e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>save(e.request,n))));});
