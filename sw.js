var C="fin27-v2",F=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
  var u=e.request.url;
  if(e.request.method!=="GET"||u.indexOf("script.google")>=0||u.indexOf("googleusercontent")>=0)return;
  e.respondWith(fetch(e.request).then(function(r){
    if(r&&(r.ok||r.type==="opaque")){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)})}
    return r;
  }).catch(function(){return caches.match(e.request,{ignoreSearch:true})}));
});
