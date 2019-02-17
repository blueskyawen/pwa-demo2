/**
 * Created by liuxuwen on 19-2-17.
 */
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");
var cacheStorageKey = 'pwa-demo2'
var cacheList=[
    '/',
    'index.html',
    'main.css',
    'tubiao.jpg'
];
self.addEventListener('install',function(e) {
    e.waitUntil(
    caches.open(cacheStorageKey)
        .then(function(cache) {cache.addAll(cacheList);})
    .then(function() {self.skipWaiting();})
    )
});

self.addEventListener('fetch',function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response){
            if(response != null){
                return response
            }
            return fetch(e.request.url)
        })
    )
});

self.addEventListener('activate',function(e){
    e.waitUntil(
        //获取所有cache名称
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                // 获取所有不同于当前版本名称cache下的内容
                cacheNames.filter(function(cacheNames) {
                    return cacheNames !== cacheStorageKey;
                }).map(function(cacheNames) {
                return caches.delete(cacheNames);
            })
        )
    }).then(function() {
            return self.clients.claim();
        })
    )
});
