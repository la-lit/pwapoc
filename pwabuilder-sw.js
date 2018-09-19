
// //
// // sw-12-4-2015.js
// // Author: @greenido
// // Date: April 2015
// //
// importScripts("serviceworker-cache-polyfill.js");
// this.version = 1.5;

// console.log("I am a sw-12-4-2015.js ver:" + this.version +
//             " - Ready to do the work");


// var CACHE_NAME = "SampleCache"; //'sw-12-4-2015-cache-v' + this.version;
// //var dataCacheName = 'pwa-weather-data-v1';
var cacheName = "Sample";
// // The files we want to cache
// var urlsToCache = [
//   'index.html',
//   'css/main12.css',
//   'favicon.ico',
// ];
// // Set the callback for the install step
// self.addEventListener('install', function(event) {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(function(cache) {
//         console.log('Opened cache:' + CACHE_NAME);
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// // self.addEventListener('fetch', function(event) {
// //     event.respondWith(
// //       caches.open(CACHE_NAME).then(function(cache) {
// //         return fetch(event.request).then(function(response) {
// //           cache.put(event.request, response.clone());
// //           return response;
// //         });
// //       })
// //     );
// //   });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         // Cache hit - return response
//         console.log("Got res:"+response);
//         if (response) {
//           console.log("Cache hit: " + JSON.stringify(response.url) );
//           return response;
//         }

//         var fetchRequest = event.request.clone();

//         return fetch(fetchRequest).then(
//           function(response) {
//             // Check if we received a valid response
//             if(!response || response.status !== 200 || response.type !== 'basic') {
//               console.log("return res:"+response.url + " status: "+response.status);
//               return response;
//             }
//             var responseToCache = response.clone();

//             caches.open(cacheName)
//               .then(function(cache) {
//                 cache.put(event.request, responseToCache);
//               });

//             return response;
//           }
//         );
//       })
//     );
// });

// //
// // Let's clean the old cache
// //
// self.addEventListener('activate', function(event) {
//   console.log("sw-12-4-2015 have been activated. Cache name:" + CACHE_NAME);
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.filter(function(cacheName) {
//         }).map(function(cacheName) {
//           console.log("Deleteing cache: " + cacheName);
//           return caches.delete(cacheName);
//         })
//       );
//     })
//   );
// });

// self.addEventListener('message', function(e) {
//   var message = e.data;
//   console.log("sw-12-4-2015 have just got the message:" + message);
// });

// // self.addEventListener('fetch', function(event) {
// //   event.respondWith(
// //     caches.open(CACHE_NAME).then(function(cache) {
// //       return fetch(event.request).then(function(response) {
// //         cache.put(event.request, response.clone());
// //         return response;
// //       });
// //     })
// //   );
// // });



self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          'index.html',
            'favicon.ico',
			'pwabuilder-sw.js'
        ]
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


