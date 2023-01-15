const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/',
  '/css/styles.css',
  '/images/icons/*',
  '/favicon.ico',
  '/404.html',
  './offline.html',
  '/career.html',
  '/contact.html',
  '/education.html',
];

self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        // console.error('Error adding resources to cache:', error);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Try the network first
    fetch(event.request)
      .then((networkResponse) => {
        // Check if we received a valid response
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
 
        // Clone the response to use it twice.
        const responseToCache = networkResponse.clone();

        // Store the network response in the cache
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          })
          .catch((error) => {
            // console.error('Error storing response in cache:', error);
          });
 
        // Return the network response to the browser
        return networkResponse;
      })
      // If the network request fails, try the cache
      .catch(() => caches.match(event.request))
      // If there's no cache match, return the offline page
      .catch(() => caches.match('/offline.html'))
  );
});




// OLD Service Worker

// /**
//  * Copyright 2016 Google Inc. All rights reserved.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *     http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
// */

// // DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// // This file should be overwritten as part of your build process.
// // If you need to extend the behavior of the generated service worker, the best approach is to write
// // additional code and include it using the importScripts option:
// //   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
// //
// // Alternatively, it's possible to make changes to the underlying template file and then use that as the
// // new base for generating output, via the templateFilePath option:
// //   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
// //
// // If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// // changes made to this original template file with your modified copy.

// // This generated service worker JavaScript will precache your site's resources.
// // The code needs to be saved in a .js file at the top-level of your site, and registered
// // from your pages in order to be used. See
// // https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// // for an example of how you can register this script and handle various service worker events.

// /* eslint-env worker, serviceworker */
// /* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
// 'use strict';

// var precacheConfig = [["404.html","0a27a4163254fc8fce870c8cc3a3f94f"],["career.html","8d950d52c5bbd114136e8f7b3b4fc1bd"],["contact.html","e0641dfff8bae3e2f9a82e0115546fc5"],["css/styles.css","36749221ab44fe42a745554fe9de64fe"],["education.html","39b253c88185e91b7fe3dafd0afcf9f4"],["favicon.ico","55da9ea16d35426b72aa3c73af625337"],["images/icons/Spinner-1.1s-200px.svg","11604420b358ebe72ee94b37341db98b"],["images/icons/android-chrome-192x192.png","571275828fd2ee7bd718b4734d6f56f5"],["images/icons/android-chrome-512x512.png","bbc529fb0af0eac218af9b5601ad248c"],["images/icons/apple-touch-icon.png","ec402318f3a59238eaa99df0a5daf8e9"],["images/icons/browserconfig.xml","a493ba0aa0b8ec8068d786d7248bb92c"],["images/icons/favicon-16x16.png","ecc43087867507740a162a3ac0694730"],["images/icons/favicon-32x32.png","752b55d9f63ef5f8538c7b0d01f8cc27"],["images/icons/mstile-150x150.png","8c47534acbf16754b4558f96c2b704b7"],["images/icons/safari-pinned-tab.svg","501a84bd02180d6a5c5a18ab820afffa"],["images/legacy/avatar_png_high_res.png","2cab3d61b917787f1ee5cea535960d11"],["images/legacy/avatar_png_low_res.png","97ea409ec96a73f60fcdf27bdc93aed6"],["images/video_thumbnails/Forage_Fodder_Poster.png","d929dd314dfd865dd8b5587217bbaf19"],["images/video_thumbnails/Restaurant_Review_Poster.png","ac39ada76bfaf84bcc7ab957b0a89df6"],["images/video_thumbnails/Space_Invasion_Poster.png","0d6fdf1818e7e5f576e391255df6523c"],["images/video_thumbnails/Suffolk_Splashers_Poster.png","39ba3174a18f408e11a9acd2394ba913"],["images/webp/avatar_webp_high_res.webp","5702a5b2a2bd54499c1bc67c22b7fee9"],["images/webp/avatar_webp_low_res.webp","8e5020a6373983718ccbc50e8119ac5b"],["index.html","ccadb4518aef6d8b07ef4a7018d3166b"],["javascript.html","1ff974c2e226f510e48952a1e62bd650"],["js/FuelDataCSV.js","643b3cba062cba9763f07ca43eac612a"],["js/allpages.js","2a977d768c5fa0028be8982e87222311"],["js/contact.js","e9813c7f82d5847bbcfb04954954f751"],["js/data.js","17ce6a7504e772c47018e3fc804dd3bd"],["js/javascriptShowcase.js","9fb4cd3b70fdc4824d11d7ffe2bb4d5f"],["manifest.json","3217db80152a9cb41d52ae36b668d719"],["portfolio.html","4d79dd7052ea9b39df0fded8ec6a0402"],["testimonials.html","56aafb55f8aa437a81824172b46c4090"],["videos/Space Invasion.mp4","0fe8c247d5fa99312dc423c86abac440"]];
// var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


// var ignoreUrlParametersMatching = [/^utm_/];



// var addDirectoryIndex = function(originalUrl, index) {
//     var url = new URL(originalUrl);
//     if (url.pathname.slice(-1) === '/') {
//       url.pathname += index;
//     }
//     return url.toString();
//   };

// var cleanResponse = function(originalResponse) {
//     // If this is not a redirected response, then we don't have to do anything.
//     if (!originalResponse.redirected) {
//       return Promise.resolve(originalResponse);
//     }

//     // Firefox 50 and below doesn't support the Response.body stream, so we may
//     // need to read the entire body to memory as a Blob.
//     var bodyPromise = 'body' in originalResponse ?
//       Promise.resolve(originalResponse.body) :
//       originalResponse.blob();

//     return bodyPromise.then(function(body) {
//       // new Response() is happy when passed either a stream or a Blob.
//       return new Response(body, {
//         headers: originalResponse.headers,
//         status: originalResponse.status,
//         statusText: originalResponse.statusText
//       });
//     });
//   };

// var createCacheKey = function(originalUrl, paramName, paramValue,
//                            dontCacheBustUrlsMatching) {
//     // Create a new URL object to avoid modifying originalUrl.
//     var url = new URL(originalUrl);

//     // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
//     // then add in the extra cache-busting URL parameter.
//     if (!dontCacheBustUrlsMatching ||
//         !(url.pathname.match(dontCacheBustUrlsMatching))) {
//       url.search += (url.search ? '&' : '') +
//         encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
//     }

//     return url.toString();
//   };

// var isPathWhitelisted = function(whitelist, absoluteUrlString) {
//     // If the whitelist is empty, then consider all URLs to be whitelisted.
//     if (whitelist.length === 0) {
//       return true;
//     }

//     // Otherwise compare each path regex to the path of the URL passed in.
//     var path = (new URL(absoluteUrlString)).pathname;
//     return whitelist.some(function(whitelistedPathRegex) {
//       return path.match(whitelistedPathRegex);
//     });
//   };

// var stripIgnoredUrlParameters = function(originalUrl,
//     ignoreUrlParametersMatching) {
//     var url = new URL(originalUrl);
//     // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
//     url.hash = '';

//     url.search = url.search.slice(1) // Exclude initial '?'
//       .split('&') // Split into an array of 'key=value' strings
//       .map(function(kv) {
//         return kv.split('='); // Split each 'key=value' string into a [key, value] array
//       })
//       .filter(function(kv) {
//         return ignoreUrlParametersMatching.every(function(ignoredRegex) {
//           return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
//         });
//       })
//       .map(function(kv) {
//         return kv.join('='); // Join each [key, value] array into a 'key=value' string
//       })
//       .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

//     return url.toString();
//   };


// var hashParamName = '_sw-precache';
// var urlsToCacheKeys = new Map(
//   precacheConfig.map(function(item) {
//     var relativeUrl = item[0];
//     var hash = item[1];
//     var absoluteUrl = new URL(relativeUrl, self.location);
//     var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
//     return [absoluteUrl.toString(), cacheKey];
//   })
// );

// function setOfCachedUrls(cache) {
//   return cache.keys().then(function(requests) {
//     return requests.map(function(request) {
//       return request.url;
//     });
//   }).then(function(urls) {
//     return new Set(urls);
//   });
// }

// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(cacheName).then(function(cache) {
//       return setOfCachedUrls(cache).then(function(cachedUrls) {
//         return Promise.all(
//           Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
//             // If we don't have a key matching url in the cache already, add it.
//             if (!cachedUrls.has(cacheKey)) {
//               var request = new Request(cacheKey, {credentials: 'same-origin'});
//               return fetch(request).then(function(response) {
//                 // Bail out of installation unless we get back a 200 OK for
//                 // every request.
//                 if (!response.ok) {
//                   throw new Error('Request for ' + cacheKey + ' returned a ' +
//                     'response with status ' + response.status);
//                 }

//                 return cleanResponse(response).then(function(responseToCache) {
//                   return cache.put(cacheKey, responseToCache);
//                 });
//               });
//             }
//           })
//         );
//       });
//     }).then(function() {
      
//       // Force the SW to transition from installing -> active state
//       return self.skipWaiting();
      
//     })
//   );
// });

// self.addEventListener('activate', function(event) {
//   var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

//   event.waitUntil(
//     caches.open(cacheName).then(function(cache) {
//       return cache.keys().then(function(existingRequests) {
//         return Promise.all(
//           existingRequests.map(function(existingRequest) {
//             if (!setOfExpectedUrls.has(existingRequest.url)) {
//               return cache.delete(existingRequest);
//             }
//           })
//         );
//       });
//     }).then(function() {
      
//       return self.clients.claim();
      
//     })
//   );
// });


// self.addEventListener('fetch', function(event) {
//   if (event.request.method === 'GET') {
//     // Should we call event.respondWith() inside this fetch event handler?
//     // This needs to be determined synchronously, which will give other fetch
//     // handlers a chance to handle the request if need be.
//     var shouldRespond;

//     // First, remove all the ignored parameters and hash fragment, and see if we
//     // have that URL in our cache. If so, great! shouldRespond will be true.
//     var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
//     shouldRespond = urlsToCacheKeys.has(url);

//     // If shouldRespond is false, check again, this time with 'index.html'
//     // (or whatever the directoryIndex option is set to) at the end.
//     var directoryIndex = 'index.html';
//     if (!shouldRespond && directoryIndex) {
//       url = addDirectoryIndex(url, directoryIndex);
//       shouldRespond = urlsToCacheKeys.has(url);
//     }

//     // If shouldRespond is still false, check to see if this is a navigation
//     // request, and if so, whether the URL matches navigateFallbackWhitelist.
//     var navigateFallback = '';
//     if (!shouldRespond &&
//         navigateFallback &&
//         (event.request.mode === 'navigate') &&
//         isPathWhitelisted([], event.request.url)) {
//       url = new URL(navigateFallback, self.location).toString();
//       shouldRespond = urlsToCacheKeys.has(url);
//     }

//     // If shouldRespond was set to true at any point, then call
//     // event.respondWith(), using the appropriate cache key.
//     if (shouldRespond) {
//       event.respondWith(
//         // Network First - trying to see if app can get the latest version before displaying cache as default is to always use cache so site not picking up latest updates.
//         fetch(event.request).catch(function() {
//           caches.open(cacheName).then(function(cache) {
//             return cache.match(urlsToCacheKeys.get(url))
//           })
//           // return caches.match(event.request)    
//         })


//         //Default Code
//         // caches.open(cacheName).then(function(cache) {
//         //   return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
//         //     if (response) {
//         //       return response;
//         //     }
//         //     throw Error('The cached response that was expected is missing.');
//         //   });
//         // }).catch(function(e) {
//         //   // Fall back to just fetch()ing the request if some unexpected error
//         //   // prevented the cached response from being valid.
//         //   console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
//         //   return fetch(event.request);
//         // })


//       );
//     }
//   }
// });







