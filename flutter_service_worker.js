'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "78be67124fd69b7006cd76c3dc77dfd5",
"assets/assets/images/authentication.png": "4c865611a99eea32c6881be5f472e96a",
"assets/assets/images/backend.png": "6c58b318570c65d5202611c5bea7eb14",
"assets/assets/images/background.png": "6772f189fc1fd7e9c57bff86bedacf8c",
"assets/assets/images/backup.png": "1a56f81cf0fa84b50bb342689cb183da",
"assets/assets/images/ci.png": "ddd30936d92e9c5f2a2c78522dc560cc",
"assets/assets/images/clone.png": "284693c75a67b775d358ac6f87a56e3e",
"assets/assets/images/cover2.png": "d9373991db5b1a353f71b41f664ea01b",
"assets/assets/images/crossplatform.png": "c90760ce111538878d0178183d558767",
"assets/assets/images/database.png": "336e0dee8caa38dea423939089eac8aa",
"assets/assets/images/dataextract.png": "91b46ea0ea8f1002f11229f6f354feb3",
"assets/assets/images/documentation.png": "f9237bc968b0e4a3c01bfe884a020eca",
"assets/assets/images/duwit.png": "f78e059bc574a81a1ca6370b70f1f462",
"assets/assets/images/equity.png": "3dec419ef52b65a870949e072d5d6e8e",
"assets/assets/images/fileStorage.png": "aa5687255aa73eb75cb82588bb561282",
"assets/assets/images/geo.png": "d0e6f56bbe2b075db85a8a9d14b25a2d",
"assets/assets/images/github.png": "6227e4daef10685252a83fd70a42a06d",
"assets/assets/images/latency.png": "f12ba682d484431aa25c53958c5d8378",
"assets/assets/images/linkedin.png": "81f3a364be69f1c2824ab179fb4b1fe5",
"assets/assets/images/map.png": "2cac57973ff377088f7ba2ccd9141af3",
"assets/assets/images/meta.png": "1dc6391e3a086003fc1eb3367803e1dc",
"assets/assets/images/mobmap.png": "b708fe21b40916cfc463c7098f6776bf",
"assets/assets/images/prof2.png": "c2d1eea49991366a71c6aff9dbf12469",
"assets/assets/images/scheduling.png": "475bb584f0b35bc45e5e36fa1b0aece7",
"assets/assets/images/socialclub.png": "edfffd2bbba594aca320b65edb9f0efa",
"assets/assets/images/subscription.png": "9f9f5e4951a6002f1d17e14eda99376f",
"assets/assets/images/transit.png": "ff636e9f4a512a987d92c23e68b269dd",
"assets/assets/images/ui.png": "1166392de96b8537f47de2046c0bc1c9",
"assets/assets/resume/slovofullstack.pdf": "016db0ff9791814020d3c30c21651af8",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "c92056f16ba57a17fb2b7e4404da0842",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "1cfe996e845b3a8a33f57607e8b09ee4",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "811aadef9de0845dba6d6aef3d8388fb",
"/": "811aadef9de0845dba6d6aef3d8388fb",
"main.dart.js": "1c97957d7bab97980b6e432df8d14330",
"manifest.json": "2a2e675a850bbee33c7b31e87a0c08d9",
"version.json": "87a850d00e16ec2f925543b565e7b4d7"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
