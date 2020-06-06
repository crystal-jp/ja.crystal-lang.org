/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/conventions/coding_style.html","8633f2fe37a99a8186704785c37469cc"],["/conventions/documenting_code.html","89117fcef34ffd6b82253a6b5e1b7ce0"],["/conventions/index.html","ff21ebbe107df7f131b1258036b0e35f"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","3b4bc40633d1c6c1122e2c289dca6b04"],["/database/connection_pool.html","67f201c1d448b75a3f049cf3c7e906f7"],["/database/index.html","819ed9614766ba7233e9ebf588fc176a"],["/database/transactions.html","3272bb5acc783828b70d74b30d286a7c"],["/getting_started/cli.html","012f978fd3ae29452120282ddbb3fa08"],["/getting_started/http_server.html","3c9f9994ec75c3353ac4e5382449cb79"],["/getting_started/index.html","898ac2c7f687e756319682ced40798a0"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","da9799d65f10db4506fa32a16ae53428"],["/guides/ci/travis.html","44d6062710c80050a94fd6a5cc01bd62"],["/guides/concurrency.html","202f087c5ffd45431d391daeae3c80c4"],["/guides/continuous_integration.html","03bac643986940a51e5b8bc9cb18af83"],["/guides/hosting/github.html","ce7a633134572458dc8cfa9f48a07d6f"],["/guides/hosting/gitlab.html","d5680aa33bd2511dc44611306fce2e06"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","e620fffd9f8b6cb57b53c794fe536b7f"],["/guides/performance.html","c403585ce470163f378a0e58c67f7d4c"],["/guides/testing.html","442ccbe28ef11037f0311dd1d9dc9bbb"],["/guides/writing_shards.html","0fb1828a26adbd8d5ff4465e751fbbaa"],["/index.html","69fd628390e4dfd459c516ff0ceb14f8"],["/syntax_and_semantics/alias.html","42d96702101a6922f3785e5ab4cd1376"],["/syntax_and_semantics/and.html","6c83546d8615042d0f5a5d5380952abe"],["/syntax_and_semantics/annotations.html","caf39e8b2af72f6995a8af6ae6148fc7"],["/syntax_and_semantics/annotations/built_in_annotations.html","979754dc3f2cc213f2006b30441d8acf"],["/syntax_and_semantics/as.html","fd2bbd79ba59d0f258eff615b1b5c015"],["/syntax_and_semantics/as_a_suffix.html","bee3c7523fa5bf231132155623c5782b"],["/syntax_and_semantics/as_an_expression.html","84455ea0758aa3641dca27762c01af1c"],["/syntax_and_semantics/as_question.html","400177870d42f2f254e35db12863d96d"],["/syntax_and_semantics/assignment.html","ce4cc8b6873b10fe11d7c7441f3043a2"],["/syntax_and_semantics/block_forwarding.html","b7c3e3ed70d5a12e36933f4577ab5303"],["/syntax_and_semantics/blocks_and_procs.html","fba9c2ab9fe39664878375b97b696342"],["/syntax_and_semantics/break.html","be1a3ceed689b984782ba58580ca46ba"],["/syntax_and_semantics/c_bindings/alias.html","950f4f5f588692ed1ff471d4fcb8392d"],["/syntax_and_semantics/c_bindings/callbacks.html","5bd32ddb6f53470a4a561ea936dbdc91"],["/syntax_and_semantics/c_bindings/constants.html","da215b5eb9eddffe12b38e20025b818c"],["/syntax_and_semantics/c_bindings/enum.html","bd951849f365a8b8637407a095ef5a90"],["/syntax_and_semantics/c_bindings/fun.html","4c417bd04cbd37d4eefe84f3058d957f"],["/syntax_and_semantics/c_bindings/index.html","ed89b82f69b068968879d452002675f1"],["/syntax_and_semantics/c_bindings/lib.html","a0e24e05d723e72bba010d04b4f6e89d"],["/syntax_and_semantics/c_bindings/out.html","7a0de198f26cbc2f3f044e3e826b8623"],["/syntax_and_semantics/c_bindings/struct.html","e742d0599695b4c6b6e17fb923334e7e"],["/syntax_and_semantics/c_bindings/to_unsafe.html","9dac4af596801de67c2f135e7266302a"],["/syntax_and_semantics/c_bindings/type.html","70d3b9a7e6626f19cc302d945900f9b8"],["/syntax_and_semantics/c_bindings/union.html","2047f4942cc45c839f8b98da35edf70a"],["/syntax_and_semantics/c_bindings/variables.html","400f3812cfc2f3d6dc1b51ed799d36be"],["/syntax_and_semantics/capturing_blocks.html","7325cca50b7969a0af91592c42e7ee49"],["/syntax_and_semantics/case.html","d6e3a01ecb3951d5ca0baf274dc02eb2"],["/syntax_and_semantics/class_methods.html","996b25226653788098680ba039b91385"],["/syntax_and_semantics/class_variables.html","dc952a186ae689f80e537f6ab55e5162"],["/syntax_and_semantics/classes_and_methods.html","409cf7cb7ff175193a53126d0a2b1383"],["/syntax_and_semantics/closures.html","0f32b522b4ead0435c8cfcd7f1780612"],["/syntax_and_semantics/comments.html","0bfe2a61013cb797a14637d5c4d162fc"],["/syntax_and_semantics/compile_time_flags.html","6235afd0494d1ccbce42e0fe120a4fe8"],["/syntax_and_semantics/constants.html","e182a4b99035e0b495d9d04a76809d43"],["/syntax_and_semantics/control_expressions.html","ac50e8522b796ff116c3abb4733f40e1"],["/syntax_and_semantics/cross-compilation.html","5ee245b60f6dbfc0592027b46b75f417"],["/syntax_and_semantics/declare_var.html","ec98b3492f81a744cad0a5cf2a9ebd70"],["/syntax_and_semantics/default_and_named_arguments.html","4b60a8ee42fe81b5059f3f354432f35f"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","4e89d759927467e9923aa47a34586696"],["/syntax_and_semantics/enum.html","d6849ba6fd7bf6018d5da287ea4ddf80"],["/syntax_and_semantics/everything_is_an_object.html","5b571072ddb40b8367d669791fd2abf3"],["/syntax_and_semantics/exception_handling.html","2436a5400ae99b30fbb5ab444b1b60ec"],["/syntax_and_semantics/finalize.html","2a392832283baaa816fac2ad708f269c"],["/syntax_and_semantics/generics.html","8d13d255b87eadfd9823798e22abca73"],["/syntax_and_semantics/if.html","423d52c393fa12eae1007fd76dd3efd9"],["/syntax_and_semantics/if_var.html","81921d40d303b446a8a5567fd8ffd2e8"],["/syntax_and_semantics/if_var_nil.html","389cec8da4dab2f06076ca174bc84f5c"],["/syntax_and_semantics/if_varis_a.html","c52750490a1a7c6f835097e266d65e87"],["/syntax_and_semantics/if_varresponds_to.html","fddf9749be0fdaeff37c062c9c54b3da"],["/syntax_and_semantics/index.html","9ca7e7eef7a44b4123126479ebfca87b"],["/syntax_and_semantics/inheritance.html","e4270360f02a8fcd38df29b432febe03"],["/syntax_and_semantics/instance_sizeof.html","c9f0a6352f2e1fe9f9af3bc62fea1939"],["/syntax_and_semantics/is_a.html","8f6157595e2265536537c72ae627351a"],["/syntax_and_semantics/literals.html","5412ffc7bd32983bdce28ec6a511d140"],["/syntax_and_semantics/literals/array.html","4bcfb6fe57ec2f53c712515882a12c36"],["/syntax_and_semantics/literals/bool.html","800732753fda95f37d6473d1522e497b"],["/syntax_and_semantics/literals/char.html","228f99d106582e1679bdd912780d9b6a"],["/syntax_and_semantics/literals/command.html","018fc9d45bd91435ea77a0d658371db9"],["/syntax_and_semantics/literals/floats.html","7517797ab47981de24742abb04972cee"],["/syntax_and_semantics/literals/hash.html","e3b0dbdc014e907c4311af7c5ff04578"],["/syntax_and_semantics/literals/integers.html","0e84903b64fdad5010dda3ea1a3a884d"],["/syntax_and_semantics/literals/named_tuple.html","e65a6113eb50bd4bdb6400516286c9d2"],["/syntax_and_semantics/literals/nil.html","59fab8aa1ee2a2983d4a20893ade7878"],["/syntax_and_semantics/literals/proc.html","c0b1dfb5bdcd699bfde0569c5ebd9b53"],["/syntax_and_semantics/literals/range.html","6fa7a14e0dc5f1f4d4c34d85d38cecc3"],["/syntax_and_semantics/literals/regex.html","26279324cd7ccbc2e3b3f1299f6dcec2"],["/syntax_and_semantics/literals/string.html","4f1f96eb2c8554e66e966f85ddbbaa87"],["/syntax_and_semantics/literals/symbol.html","aed4b00042bed7ad9e99fa24b9ec3af9"],["/syntax_and_semantics/literals/tuple.html","fc1f1ce887ba44ca8717669b2ac1b501"],["/syntax_and_semantics/local_variables.html","cfade4d258413abfffc157759f3285c5"],["/syntax_and_semantics/low_level_primitives.html","348c47883543de1b0e2282b6febb93cb"],["/syntax_and_semantics/macros.html","dddf0e8018014c2688e07ea80518b6a3"],["/syntax_and_semantics/macros/fresh_variables.html","77827637c28ca38208a83f2a9139223f"],["/syntax_and_semantics/macros/hooks.html","363303c44f78f932fc364ae8a154ca40"],["/syntax_and_semantics/macros/macro_methods.html","d810145e83ffa654f422d619d7c93650"],["/syntax_and_semantics/methods_and_instance_variables.html","e4b257ed8d88e8b09f731bd877191bfc"],["/syntax_and_semantics/modules.html","c3aec89f563f2be23078edf304d46bd2"],["/syntax_and_semantics/new,_initialize_and_allocate.html","28094a5e4bf879235dc88ea9a16de094"],["/syntax_and_semantics/next.html","6157c0513d8b574edc69f9c3391aceee"],["/syntax_and_semantics/nil_question.html","702da13a1f09a5d85febde2948391471"],["/syntax_and_semantics/not.html","dbbf39bf8587d1dcbeb1ec653e0d3ffe"],["/syntax_and_semantics/offsetof.html","86174dd7b773e8d6953358ec52d15d62"],["/syntax_and_semantics/operators.html","a83686c4d6b39366f7034155a74cfe46"],["/syntax_and_semantics/or.html","a16974fc2e7ceebfd5639b8ea63e69f2"],["/syntax_and_semantics/overloading.html","82cf57e20fa958e448f4fe459bf0e037"],["/syntax_and_semantics/pointerof.html","c61332b3e69d594c7daf0e22cfe8dea5"],["/syntax_and_semantics/proc_literal.html","669fe736254f4b0b49b76016963c24dd"],["/syntax_and_semantics/requiring_files.html","5cd27de8a2b220fa340cc7d69a85efff"],["/syntax_and_semantics/responds_to.html","80f01986678cd9715f1bf6aac168b544"],["/syntax_and_semantics/return_types.html","dbc516f3ab482e5f3bc5b147a9103abc"],["/syntax_and_semantics/sizeof.html","783cd8b8dee27e30cf7f328b6b1eb968"],["/syntax_and_semantics/splats_and_tuples.html","d8a21587149915e2f68203d9e19d00b8"],["/syntax_and_semantics/structs.html","b8d9123feccb5a8b522e28a24c6a78f3"],["/syntax_and_semantics/ternary_if.html","e8ccfea9e33d5da74f5715978c97c46d"],["/syntax_and_semantics/the_program.html","270750890eeedec5056bf5dae22801a6"],["/syntax_and_semantics/truthy_and_falsey_values.html","665331c857a113772fe4e2b053ebd56d"],["/syntax_and_semantics/type_grammar.html","752df6613f0dc3ea806e6cb68be1e634"],["/syntax_and_semantics/type_inference.html","264ba0bfb3e5cb11979b90de6a98fe1c"],["/syntax_and_semantics/type_reflection.html","1d8be4577066943bd0ce7d68611c2c40"],["/syntax_and_semantics/type_restrictions.html","f3b787acbd16c6ce7899a472fe36d83b"],["/syntax_and_semantics/typeof.html","bce901fac844ce145bf7b152e2666ff3"],["/syntax_and_semantics/types_and_methods.html","abe16bec10d6ea89e1879e3393c64b0c"],["/syntax_and_semantics/union_types.html","9032fea5f3c392b07ca216e38b518c44"],["/syntax_and_semantics/unless.html","29f0ad0f23daef005d4bce418adb71f1"],["/syntax_and_semantics/unsafe.html","1a8a6c20d666cfc36a42241374a76537"],["/syntax_and_semantics/until.html","b8fee7820d4df22b326a02e6500cf963"],["/syntax_and_semantics/virtual_and_abstract_types.html","2c41f3116329e6557451adfe67236df2"],["/syntax_and_semantics/visibility.html","55f1ebf7cbfe501de4453174e90f3496"],["/syntax_and_semantics/while.html","1d94b6a9026c8d2d0fd69ed18a66b704"],["/the_shards_command/index.html","fb09b9cba216ee3bf707e1298ed0bdc2"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","2d6479d6a34c37a1cc271b618620e7bf"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







