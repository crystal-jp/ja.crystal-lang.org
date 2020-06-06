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

var precacheConfig = [["/conventions/coding_style.html","5b29eb3758c03aa0755ecbf5d446e44b"],["/conventions/documenting_code.html","2cd411cc88d820cd1820e5a7875b1bf3"],["/conventions/index.html","bdf50654e57b68a2b2d85fc9a1b308bc"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","e5f02247cef148613266c56d555be929"],["/database/connection_pool.html","ad5cc9058446eff91afb7382d0c67a40"],["/database/index.html","a7d6dd9475bba85e1c7cdc4e43308ab4"],["/database/transactions.html","2ca731a22c71a75e7c7e6d2ecbfb055e"],["/getting_started/cli.html","5112d8486005a435ad814f4f4d5429fe"],["/getting_started/http_server.html","04e6e9aa6a0b7a541e682dbca2ae5606"],["/getting_started/index.html","7f760cb3640a7dd33b77ae10ec4fbbac"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","85dbc6d168d09312d78dd5612a42326f"],["/guides/ci/travis.html","2be2451a1c809fb010e0c603d5fc3bc3"],["/guides/concurrency.html","50cf8f462e87c877ee45c48b9be5d195"],["/guides/continuous_integration.html","74eea71a04e9b5b9d24180d742db96b8"],["/guides/hosting/github.html","a82c02206c29837d5ffbbf962781968e"],["/guides/hosting/gitlab.html","442a9a1e947fd1b555c18d4e15dc08b4"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","fb216a512ab8f324b5e461c46f6bbc7c"],["/guides/performance.html","eae480e2b408f72eb65f240345c2443b"],["/guides/testing.html","7af6382b50ff0a99d0ee7538316bc100"],["/guides/writing_shards.html","430fe5ee295cf33bdb262a7ac90cf544"],["/index.html","d3c41c21ab0fab5755398a77bb61869e"],["/syntax_and_semantics/alias.html","bd176d4b32e0cae798d4d596848b10da"],["/syntax_and_semantics/and.html","049d169636b9a96165d54ea924100bb8"],["/syntax_and_semantics/annotations.html","148eef1461c09dcd1460427c3d7daaad"],["/syntax_and_semantics/annotations/built_in_annotations.html","45b313ce398772a010a0ee0b7f6e4c23"],["/syntax_and_semantics/as.html","0105320642728d6c8f905750b4f72e28"],["/syntax_and_semantics/as_a_suffix.html","6b6357fff527e628c17606c2c4bc97a2"],["/syntax_and_semantics/as_an_expression.html","d4f3921f3dc09cf53e0082fec2fec78d"],["/syntax_and_semantics/as_question.html","1522f0271cae635a655d44971b8f4e24"],["/syntax_and_semantics/assignment.html","9e64e8f58c936dd55822fc86ff1ae302"],["/syntax_and_semantics/block_forwarding.html","04c5b5748dfc2fbea71e9204ad23f111"],["/syntax_and_semantics/blocks_and_procs.html","47ea9e86e6e41c8cd12a8e277a65181c"],["/syntax_and_semantics/break.html","d0e8f840051452c7b73c3801a0731697"],["/syntax_and_semantics/c_bindings/alias.html","9d313dcf971b4f636d193350aa8f294e"],["/syntax_and_semantics/c_bindings/callbacks.html","6279034f78622f7cbc6146b5c4cc9698"],["/syntax_and_semantics/c_bindings/constants.html","fbc1039b8d67a3e7ab59feb8e1ed973f"],["/syntax_and_semantics/c_bindings/enum.html","40d2c66bec03b6b1e38a4cce5bd9440a"],["/syntax_and_semantics/c_bindings/fun.html","0029c15fdd94d6c290938ac833534ce0"],["/syntax_and_semantics/c_bindings/index.html","c6095a0659a805d01376e6f0b24df93a"],["/syntax_and_semantics/c_bindings/lib.html","66970f575cc71db0f0139542f21887fe"],["/syntax_and_semantics/c_bindings/out.html","65baf40516971e807e8d25d91637933e"],["/syntax_and_semantics/c_bindings/struct.html","9ffb067623b1f23a927935695467b9c8"],["/syntax_and_semantics/c_bindings/to_unsafe.html","6e9eb81d1a752f5d26888a7d8f314ce7"],["/syntax_and_semantics/c_bindings/type.html","59201497ee6a26b5ce8d6460ec88f835"],["/syntax_and_semantics/c_bindings/union.html","1f71ad4cb7048aac86df82ed04f06688"],["/syntax_and_semantics/c_bindings/variables.html","1641e207613e1d1b5e4e0d27a989f272"],["/syntax_and_semantics/capturing_blocks.html","d89bf9e7d8803072b664242523685e62"],["/syntax_and_semantics/case.html","9f0e8e1678f1d50e4a3b9aeb2755da5c"],["/syntax_and_semantics/class_methods.html","84448166897d3cc7b65a065107f94d51"],["/syntax_and_semantics/class_variables.html","6c36a86e3f38da8c8b480e31ee8a4e5e"],["/syntax_and_semantics/classes_and_methods.html","4aa21bd32df3471d62580f64c6310ea2"],["/syntax_and_semantics/closures.html","867dc186fad4100f221e61fe9273003b"],["/syntax_and_semantics/comments.html","de5bea98fe0df8adeb5f9be9917cfb3b"],["/syntax_and_semantics/compile_time_flags.html","ed8286c744f4418c5976a605f2ea107a"],["/syntax_and_semantics/constants.html","bad243c3f41e63a89bbbcebac3543c86"],["/syntax_and_semantics/control_expressions.html","b74fcc316410fc6c2409f45361314602"],["/syntax_and_semantics/cross-compilation.html","b482cadc1ec4ba9f7ec8a082678d8e08"],["/syntax_and_semantics/declare_var.html","290dcef20cada6474ed8bb4154cb518f"],["/syntax_and_semantics/default_and_named_arguments.html","186fdd646b817938ba1ceadf43d820de"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","d19ec6f826080f5c1fcb8357aec6ed4a"],["/syntax_and_semantics/enum.html","b9ff6337aa1587324144a68982e95aa7"],["/syntax_and_semantics/everything_is_an_object.html","dc6d7fb08aea1f7253ff45a063bf884e"],["/syntax_and_semantics/exception_handling.html","b5616ec231bbf0a43645605882e3e3b3"],["/syntax_and_semantics/finalize.html","6e138669d99c4edb685c8e167516cbb1"],["/syntax_and_semantics/generics.html","d89363a36aae8f40fbf11d7001403cf5"],["/syntax_and_semantics/if.html","9fe4ba8a41b23abe978c7749aaadbe01"],["/syntax_and_semantics/if_var.html","62f41e2b6f30c1b185789ee9f812f79b"],["/syntax_and_semantics/if_var_nil.html","8a1776e8348fc85c65a316c37c7e8712"],["/syntax_and_semantics/if_varis_a.html","2c4bb3b1d6b1c7c60652dda273365c28"],["/syntax_and_semantics/if_varresponds_to.html","bad605030edd01ccb8d6fd576d020765"],["/syntax_and_semantics/index.html","1ef43172ed27680cc90e46f007f812f4"],["/syntax_and_semantics/inheritance.html","85e54c652c79ac39e80e8a3601c12801"],["/syntax_and_semantics/instance_sizeof.html","94afc01a48a4ea55cf45931ae1810bac"],["/syntax_and_semantics/is_a.html","ba64cfbfb3bf75f317c9bea5fe421603"],["/syntax_and_semantics/literals.html","9510513c294ad2b50ce053082aad2dc6"],["/syntax_and_semantics/literals/array.html","3ecabcfd6167d1882a9dc5b2b7095f8e"],["/syntax_and_semantics/literals/bool.html","24ee4e52f2206dbc4f0c93fe2f115394"],["/syntax_and_semantics/literals/char.html","fc5aef91c8682f9ca52700248305523f"],["/syntax_and_semantics/literals/command.html","dcbdfb6c735d31275e77ca16ed7ad0d3"],["/syntax_and_semantics/literals/floats.html","bcd9258f4ef6382e3509f13986cdff1d"],["/syntax_and_semantics/literals/hash.html","983df13ae4f4003173e4332311b82908"],["/syntax_and_semantics/literals/integers.html","c01c8d1e2e3b9b70820fd2f1157c2ca4"],["/syntax_and_semantics/literals/named_tuple.html","ce2e32d79bb7cf7d22abf0c704365d10"],["/syntax_and_semantics/literals/nil.html","c24faa10d2725e4c55d9e6043f882519"],["/syntax_and_semantics/literals/proc.html","465e217c09ca36d249a8114d59fda07a"],["/syntax_and_semantics/literals/range.html","1c16da471a3ff14d503342d55f52bf6c"],["/syntax_and_semantics/literals/regex.html","b9a7bc90aac620364a434b0e8223ad63"],["/syntax_and_semantics/literals/string.html","5e134cc28c81f5ac96bb46123cc2d82a"],["/syntax_and_semantics/literals/symbol.html","6500b5cb81b9fdf1eb2681e13e2b4cee"],["/syntax_and_semantics/literals/tuple.html","946222f8e2c15fd591eddc54bb8bf82f"],["/syntax_and_semantics/local_variables.html","f66e6f11d45e4b13dbad78b723b25653"],["/syntax_and_semantics/low_level_primitives.html","d389d19816cfcac4414085e0954b99b3"],["/syntax_and_semantics/macros.html","54bdb138ef33c723562c4701d3701ac2"],["/syntax_and_semantics/macros/fresh_variables.html","08c1da1fda91c10992a7da6faa24c278"],["/syntax_and_semantics/macros/hooks.html","16fbff662b077f819fe724ce49eb2dcd"],["/syntax_and_semantics/macros/macro_methods.html","db103cc6b9100d5980a408462e50939f"],["/syntax_and_semantics/methods_and_instance_variables.html","434a531c91b07d0697e38138296dd1fb"],["/syntax_and_semantics/modules.html","2b325ba441e1c6eb4c1d316c3ab75c27"],["/syntax_and_semantics/new,_initialize_and_allocate.html","1c29647ae6e6452b4381eb5a54354784"],["/syntax_and_semantics/next.html","6c1e7305f8e688ad2f10325b0461c632"],["/syntax_and_semantics/nil_question.html","2fb61ce2961520e396dcbb7b4f3fab0d"],["/syntax_and_semantics/not.html","1c322bcb17136b1d7ce6b23647cb1f64"],["/syntax_and_semantics/offsetof.html","91f8268c9b02f6e96a3c11ec905af824"],["/syntax_and_semantics/operators.html","73bbc2300eb5202242d7bc4dc851d766"],["/syntax_and_semantics/or.html","d0d5d46b055154df0845441178fd243c"],["/syntax_and_semantics/overloading.html","ae71c2b8f0dbf0e7ce6781e751b65689"],["/syntax_and_semantics/pointerof.html","063e0a764f787b3347a4ecfe75d4003a"],["/syntax_and_semantics/proc_literal.html","b288ed7e9c882f2a9df03c0c396416c1"],["/syntax_and_semantics/requiring_files.html","d1ad20e8cb4ac76bedc66f9a4395d717"],["/syntax_and_semantics/responds_to.html","1a76e1e8f408bef4870407b18ef03326"],["/syntax_and_semantics/return_types.html","28a8567e1280d3d232651e9a2d973913"],["/syntax_and_semantics/sizeof.html","8569ded3d47fc2c6b2775549c493f9a0"],["/syntax_and_semantics/splats_and_tuples.html","e2117492130873395ca505c79d4d737c"],["/syntax_and_semantics/structs.html","31955a310e65c007fdae983bd1122f82"],["/syntax_and_semantics/ternary_if.html","edc934030781e4f51e0b43b9871c7076"],["/syntax_and_semantics/the_program.html","872a2add377785cf14ff9ae8a04cac78"],["/syntax_and_semantics/truthy_and_falsey_values.html","b00a31d369c40c3ebd2dff6eef2274e4"],["/syntax_and_semantics/type_grammar.html","9d9894d9aadd571249c3b3208c3399fe"],["/syntax_and_semantics/type_inference.html","e9a272ac4cd5af8c8b61384d12678545"],["/syntax_and_semantics/type_reflection.html","86a94190fc749fc23d3d10495e67e0f9"],["/syntax_and_semantics/type_restrictions.html","89bc3bb341b1b64e22afaf5944e863ea"],["/syntax_and_semantics/typeof.html","a4a2fa16231f8d645457d262f0c3684b"],["/syntax_and_semantics/types_and_methods.html","d1c456ea467cb1bfe8368c086466eef1"],["/syntax_and_semantics/union_types.html","a52e384f5e22a3c7f7f5b73c201f6e66"],["/syntax_and_semantics/unless.html","8a6601f092846f9027d3d36b4f7f1a7a"],["/syntax_and_semantics/unsafe.html","22ac6bee918e04254c4310fe428baa41"],["/syntax_and_semantics/until.html","72025c5e0dc9f24b9d150ed7960f7ca7"],["/syntax_and_semantics/virtual_and_abstract_types.html","d9da22fad8989ca6fcbd2aec0bc76f63"],["/syntax_and_semantics/visibility.html","605647fdc06edae59d8512ba4ee0220d"],["/syntax_and_semantics/while.html","04ab1ed3cbcaf13da1d27ed4200d12ed"],["/the_shards_command/index.html","2087ba5fca464180eae2b09f11e7fcbc"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","fd50bdbd5409e187ecccbb9aa8483665"]];
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







