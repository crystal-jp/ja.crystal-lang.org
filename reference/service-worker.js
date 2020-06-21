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

var precacheConfig = [["/conventions/coding_style.html","34a0185d9c331d70eda47c14690e10d6"],["/conventions/documenting_code.html","ebfecdded7580c6b22d1cca236ae9d25"],["/conventions/index.html","2aacc694349815f8ac2a9ccf58d5d5c4"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","4f97043d3d0d4e7d0b57bca3f10b1805"],["/database/connection_pool.html","53d5ad2d6c02c6af82d68723449c1e38"],["/database/index.html","61f0587128400e1a4496e3751af64479"],["/database/transactions.html","5d859fbc8243f252edf526f6f521224c"],["/getting_started/cli.html","42878dd7b1182148aa6b082d6898cc68"],["/getting_started/http_server.html","497814ccf73f64c9a8d2f14d0d00fc80"],["/getting_started/index.html","5a6eb34d71b1e7587e1e720ef19053b5"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","110ab9fb9289db5fb8315706fd531f2e"],["/guides/ci/travis.html","5bd50a5db237bb5de4f4eafcd08208fc"],["/guides/concurrency.html","bd2260162b9af70205f56e7df3275724"],["/guides/continuous_integration.html","add37577c22091e5671cd94925c5c9a9"],["/guides/hosting/github.html","29c50e89922c233b33fc9c96693048c7"],["/guides/hosting/gitlab.html","b9b226bc0b91cd0d37a7edb19d504529"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","60af125470e09b95cc63b9c38866e642"],["/guides/performance.html","d98df63374562d2fdfb651d3fe9990de"],["/guides/testing.html","82fc09f6a437fd7becc3558bc1488171"],["/guides/writing_shards.html","4eb0db33f775a3b6e84a87a25131dea5"],["/index.html","f1ad6eb4501020779cfae15547b7ec6f"],["/syntax_and_semantics/alias.html","0cb61869bf2b398d0d29178dfdcd79b8"],["/syntax_and_semantics/and.html","a27885bd97f1b3296ba5471c32965917"],["/syntax_and_semantics/annotations.html","bfcb0088665fd5ca9aecf5ef71508f55"],["/syntax_and_semantics/annotations/built_in_annotations.html","67ce02c78d3d7fcc73a25c9c149d3197"],["/syntax_and_semantics/as.html","f8eac1e8e3f153f7d7d3b23cc9297359"],["/syntax_and_semantics/as_a_suffix.html","b7a32c28bb4b567e607cdcf6e3a56354"],["/syntax_and_semantics/as_an_expression.html","356782c0ca70477a49ccbc23c37865db"],["/syntax_and_semantics/as_question.html","2607300cedeb368b47f9c598004daa56"],["/syntax_and_semantics/assignment.html","06c8ab1d46cbee97fa2f3d941cf8577a"],["/syntax_and_semantics/block_forwarding.html","7aaa91c0265c502873b0e3ef6205dce5"],["/syntax_and_semantics/blocks_and_procs.html","d0278ec565d74862215cf847d4434102"],["/syntax_and_semantics/break.html","fa68866e9f955294f430b575b4e41df8"],["/syntax_and_semantics/c_bindings/alias.html","22b3172fe0517c232f88c4d925337a6b"],["/syntax_and_semantics/c_bindings/callbacks.html","b6d1aec814a5d3f50c4bbf2f8b44c1e1"],["/syntax_and_semantics/c_bindings/constants.html","9a9a8c4164a207c7f22cb45f11ddf595"],["/syntax_and_semantics/c_bindings/enum.html","05af87f8f0d6b7a207858c2935e8377c"],["/syntax_and_semantics/c_bindings/fun.html","be5f37428eab6f50515c723c3e00f8b9"],["/syntax_and_semantics/c_bindings/index.html","72bd4335536cee431c9cf7e4043ccd1a"],["/syntax_and_semantics/c_bindings/lib.html","0a8011956c0235892fa423e1f30c353b"],["/syntax_and_semantics/c_bindings/out.html","89b5d8ba711a785d0490ace1fa75802b"],["/syntax_and_semantics/c_bindings/struct.html","113833155b0d35479e024c3df32b365d"],["/syntax_and_semantics/c_bindings/to_unsafe.html","282a09e9f4d5a169197109876912eb9a"],["/syntax_and_semantics/c_bindings/type.html","375254b6abf77511f26c32a250b79ee7"],["/syntax_and_semantics/c_bindings/union.html","8d9770c90118ddfed9dd16dcae0cb79a"],["/syntax_and_semantics/c_bindings/variables.html","a01c0e522e3f0dc14e1977126c46a467"],["/syntax_and_semantics/capturing_blocks.html","c9c5c586eb30528651ee9acf2ddd903b"],["/syntax_and_semantics/case.html","20859805e64258f3e423496b5a21e508"],["/syntax_and_semantics/class_methods.html","133370b1aeafc60950cb7d60ef6154e6"],["/syntax_and_semantics/class_variables.html","c387359c26ff9251e3fcb6d3dbe874bd"],["/syntax_and_semantics/classes_and_methods.html","ac48bdc7a8b52fcbf2027af7f579053a"],["/syntax_and_semantics/closures.html","97162e9cb1e981a2f3b82ed12e41e9a7"],["/syntax_and_semantics/comments.html","6275d2c7f1f1296af0a6347c13f509a3"],["/syntax_and_semantics/compile_time_flags.html","6131f6ecf5534a23c83cfd840d0709e5"],["/syntax_and_semantics/constants.html","4f60c82bd1444f096583267849715460"],["/syntax_and_semantics/control_expressions.html","858e3dc9a61b5dc87070866df0c5a5df"],["/syntax_and_semantics/cross-compilation.html","68abd844aba1583ef779bd67dbff272c"],["/syntax_and_semantics/declare_var.html","30a1155d2d175143a3d08a34d1061828"],["/syntax_and_semantics/default_and_named_arguments.html","3e3a9b855ddde32606fb20fed9613e7f"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","b354d8ae09a1aceb557499759a88566e"],["/syntax_and_semantics/enum.html","519ec72b8d952035329b13c4a3f0b934"],["/syntax_and_semantics/everything_is_an_object.html","d7bc771116fc21bf67bb1e9b8788bcb9"],["/syntax_and_semantics/exception_handling.html","1ba6e15dc33cfe3ddb66b0f83ca26f7f"],["/syntax_and_semantics/finalize.html","4b8835ed8042a8289fc0a3860c11d125"],["/syntax_and_semantics/generics.html","c60e3c1d31b2ca6e093b5cf558ee453a"],["/syntax_and_semantics/if.html","3bb9e6e7541e3189d7555d84a9792cb4"],["/syntax_and_semantics/if_var.html","16d82622bcac0d574eb62272a7d6db38"],["/syntax_and_semantics/if_var_nil.html","886a9a0d18deaf0935e8ac2c155ffd99"],["/syntax_and_semantics/if_varis_a.html","aea86aadf879a8d62408ca7a0f4ab277"],["/syntax_and_semantics/if_varresponds_to.html","c8d6c2e9ea3ffa01732c42a944703dfd"],["/syntax_and_semantics/index.html","afac3ce45a0317754a8d6486d9df02b0"],["/syntax_and_semantics/inheritance.html","1346d91cbeb23a5a1a25e9a352870560"],["/syntax_and_semantics/instance_sizeof.html","d9c0ef0478b86a3ef9366e577068b9df"],["/syntax_and_semantics/is_a.html","4a33858c25957dc5d6681e019ce395c3"],["/syntax_and_semantics/literals.html","1d08c03adaacb0219377853b69fa2b10"],["/syntax_and_semantics/literals/array.html","dec629c57bac8c763be05c88e189e41f"],["/syntax_and_semantics/literals/bool.html","b7b4e8141e46687f8f05ac586bc1f245"],["/syntax_and_semantics/literals/char.html","7a64172780fd8dd45a094181d5f193da"],["/syntax_and_semantics/literals/command.html","600d3764ce5878210a3a62eb7d3e3863"],["/syntax_and_semantics/literals/floats.html","d3835f5ec0c30b9b86a745173ee0e980"],["/syntax_and_semantics/literals/hash.html","9051e32266038511710138e4da332a6a"],["/syntax_and_semantics/literals/integers.html","301e44bc954c5f8b70acdf59adf7a03f"],["/syntax_and_semantics/literals/named_tuple.html","3afc653268a99b21544925ed34514d7d"],["/syntax_and_semantics/literals/nil.html","cd87ec5776642ef82d8071e02d3e5cdf"],["/syntax_and_semantics/literals/proc.html","d3d0f3460421e88a5312c6e49d2fd07e"],["/syntax_and_semantics/literals/range.html","e575e58fb6ba78f9708a629264fd31d7"],["/syntax_and_semantics/literals/regex.html","6f9f02e453537d945191a848f7d0bf5c"],["/syntax_and_semantics/literals/string.html","7a5964924b2d8babeb844d745b9b42c1"],["/syntax_and_semantics/literals/symbol.html","af4e28a3712d696eb0152be4a3f5fd8a"],["/syntax_and_semantics/literals/tuple.html","9ab68bcdc1f7964d825a6410750657f9"],["/syntax_and_semantics/local_variables.html","c954ff7ca2e409ff10b73bdce8db7b48"],["/syntax_and_semantics/low_level_primitives.html","045fa75afe935cca6f41a3651a6ebb70"],["/syntax_and_semantics/macros.html","c555b4f8586050777b0be6d29f742ba7"],["/syntax_and_semantics/macros/fresh_variables.html","5bdc4cdb01b5b05519ee613f62da86f0"],["/syntax_and_semantics/macros/hooks.html","4509a9728898a8a40bc67b1f056a2625"],["/syntax_and_semantics/macros/macro_methods.html","f8b81655c2149d4b769b85a181033eb0"],["/syntax_and_semantics/methods_and_instance_variables.html","b16a965b92f01a9044e88f8eb93812e1"],["/syntax_and_semantics/modules.html","bd8737d6364ac6c1b0464b593551e31f"],["/syntax_and_semantics/new,_initialize_and_allocate.html","caa5b6b409fb3b1321a0db70cbc2a0e0"],["/syntax_and_semantics/next.html","ef493734cb41e3227ddb314411928507"],["/syntax_and_semantics/nil_question.html","112c3132edb3470a476e82601444af0c"],["/syntax_and_semantics/not.html","ac6574f1f1a04113927b26f2334c0f73"],["/syntax_and_semantics/offsetof.html","0f5eb62f3c5c25a2cc6635d2accd1ab0"],["/syntax_and_semantics/operators.html","c39d458ad04718e58aeca10bd1902b18"],["/syntax_and_semantics/or.html","40ade20a925c540e93b87719b2333e97"],["/syntax_and_semantics/overloading.html","685aad24ac59c558eb02449a6e472c63"],["/syntax_and_semantics/pointerof.html","f260ddda96191b936fdbb67cb9ee94a1"],["/syntax_and_semantics/proc_literal.html","d2bd942a66935362e8886a8fc717b1a4"],["/syntax_and_semantics/requiring_files.html","666184748da3c4923e67269448c824c1"],["/syntax_and_semantics/responds_to.html","f41ca367e2d1c5a898439f28988115cf"],["/syntax_and_semantics/return_types.html","a70a350c93a8a62f3e962ddb69941196"],["/syntax_and_semantics/sizeof.html","39f55803ebabbd80c3f393f39ae2c071"],["/syntax_and_semantics/splats_and_tuples.html","ffb04695d68fc7ff710a58fb88cb7a39"],["/syntax_and_semantics/structs.html","d9af1c7590df2e9e8915be42b2f1224a"],["/syntax_and_semantics/ternary_if.html","7c01d5f4b3174210debc72e27a8ddf19"],["/syntax_and_semantics/the_program.html","6d676c362b04a56dd968c8dfdfed32df"],["/syntax_and_semantics/truthy_and_falsey_values.html","012e0123a76d03b53025a7abe16e1aee"],["/syntax_and_semantics/type_grammar.html","28302131cb387f479aed71020fe8317c"],["/syntax_and_semantics/type_inference.html","f18c34c8ee2cdf668deef9f8faeeba46"],["/syntax_and_semantics/type_reflection.html","03c733be2577ca0ff5bda4140a3e87a7"],["/syntax_and_semantics/type_restrictions.html","a6ee3749428dd8918cf4c147d341d2a2"],["/syntax_and_semantics/typeof.html","557c28feb0b84cf43bb05fefe4292894"],["/syntax_and_semantics/types_and_methods.html","66347489c2c95ebabc7b5c02a1dbd566"],["/syntax_and_semantics/union_types.html","f1acf81f60d934c6fd99e85b06161fed"],["/syntax_and_semantics/unless.html","fd7b6e079826a7a9acd8e10daab4f816"],["/syntax_and_semantics/unsafe.html","3b8b93a2e90da27165029e245fb0def3"],["/syntax_and_semantics/until.html","ba47bad94c5aed3b1b4e233e49ef2b19"],["/syntax_and_semantics/virtual_and_abstract_types.html","98db6721d12fb0980d343bb38670f8dd"],["/syntax_and_semantics/visibility.html","4c6edba66279e46a06bba20f14834731"],["/syntax_and_semantics/while.html","62f8dcce4b7cec6504c69e4a5203a0b2"],["/the_shards_command/index.html","9fe8784ded83ce865dc164c1b45afba8"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","760b742bbebc8c86661fd3deb0d43937"]];
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







