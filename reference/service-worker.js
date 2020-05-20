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

var precacheConfig = [["/conventions/coding_style.html","f962b1cf244d1d917e99cf8c14782d0d"],["/conventions/documenting_code.html","7854e261b88dc5c6517bd7962ce95b7c"],["/conventions/index.html","a56e1cb60d3e9c535c78d631b4b33a00"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","f1fb4ae5c4d9fbe2effbcad88f1e7a80"],["/database/connection_pool.html","b5999da392db02f91c4350e00c7f12b1"],["/database/index.html","baddcb4e0d022c55596f0d7e9528ccd1"],["/database/transactions.html","b004f1e9997722c5ed4ce732e98ed358"],["/getting_started/cli.html","1af55fd61061c3a69d92f3a75283fd5d"],["/getting_started/http_server.html","f5e669f9ac126dd13fed7e9e8a67ac92"],["/getting_started/index.html","abaff6bded05db130e30cd5b2fc45716"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","b6227487607bec9a4eee4d569d8db111"],["/guides/ci/travis.html","f65e23db5077bae6eda583993886636d"],["/guides/concurrency.html","769af44ee9c04b41b50bace0db3da278"],["/guides/continuous_integration.html","276c899292a8ca5b7a212cdfaabb8c6f"],["/guides/hosting/github.html","2797cfba73195f4cfc234062a8aab663"],["/guides/hosting/gitlab.html","8fddaa9c8a12fd77d99aeb32618f15f6"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","7f872daf72dfe4c384dede73a9961829"],["/guides/performance.html","27ea1d15b5f56f0f5b5d8c9f48aa7dfd"],["/guides/testing.html","5ad01d9eb014b33d6ac66659b15c39ad"],["/guides/writing_shards.html","ca8e7c1ab6c80401435459d70e98dcbf"],["/index.html","513ed1cc4f6c63bc24d7fa45451ea2a7"],["/syntax_and_semantics/alias.html","54c0b9f8912f724db7d97406f33b16b9"],["/syntax_and_semantics/and.html","ae725f74834034876d3a069074a59691"],["/syntax_and_semantics/annotations.html","7648dc33fd08f9c5f0765a4dcdf5be24"],["/syntax_and_semantics/annotations/built_in_annotations.html","9acc56a9432ee809368f14690fb8e480"],["/syntax_and_semantics/as.html","68fec10f3f3ee89a77b4bc9ab85c460f"],["/syntax_and_semantics/as_a_suffix.html","4aba9b52160b959357fda789fa1af7b6"],["/syntax_and_semantics/as_an_expression.html","0e880c261bb92773bf726c449636446a"],["/syntax_and_semantics/as_question.html","adf043763b8d3bf98fe5ac26d4786a87"],["/syntax_and_semantics/assignment.html","13569e4d1019d83772b399d2346a0db2"],["/syntax_and_semantics/block_forwarding.html","c27417754d99b38095cdf6df0b61d03c"],["/syntax_and_semantics/blocks_and_procs.html","905c167ede33fc7fac4eefd2b5f78410"],["/syntax_and_semantics/break.html","3e6e95a86de439bb126e381cd7d45201"],["/syntax_and_semantics/c_bindings/alias.html","bf9d0f55a1a2c45d7b3557f322b477ac"],["/syntax_and_semantics/c_bindings/callbacks.html","356c0ea03fc1e64894700f375001f9dd"],["/syntax_and_semantics/c_bindings/constants.html","9a85ad1d993217198678276efe76f77e"],["/syntax_and_semantics/c_bindings/enum.html","6da05acac7501377ae657f0c166011d1"],["/syntax_and_semantics/c_bindings/fun.html","f1b49019215d6aebb0817911c75fb6de"],["/syntax_and_semantics/c_bindings/index.html","f4e7bda1e84d4a8350e697d29ce6f115"],["/syntax_and_semantics/c_bindings/lib.html","d0771cf103e370d8c1089678565f53b8"],["/syntax_and_semantics/c_bindings/out.html","0ecced57b0dd6c10125ac6023e64ef06"],["/syntax_and_semantics/c_bindings/struct.html","c2ad54173eda7ab3db6718714740215e"],["/syntax_and_semantics/c_bindings/to_unsafe.html","a6e349d6b2b481483dff7f143191a27e"],["/syntax_and_semantics/c_bindings/type.html","ab62f2d36b291b37119a1ac6977af1bb"],["/syntax_and_semantics/c_bindings/union.html","04afd3e0ed5b60ac1a73eac9140d14cb"],["/syntax_and_semantics/c_bindings/variables.html","78065b8e82efa2261a5c3009d6c504f3"],["/syntax_and_semantics/capturing_blocks.html","82633d5906211b0ff2b21e9a5392ff0a"],["/syntax_and_semantics/case.html","b4536420d0a18b923e528268f8623605"],["/syntax_and_semantics/class_methods.html","5eca1b733120b14de15b6dbc87673b66"],["/syntax_and_semantics/class_variables.html","b68d08979081a7c33b0cb8a2a5a18aaa"],["/syntax_and_semantics/classes_and_methods.html","55698ac6224164a0441dbe88de2b2cc1"],["/syntax_and_semantics/closures.html","bda4d595683df6df0a9081f3e99bb03f"],["/syntax_and_semantics/comments.html","b470a987c8bcfd21aee3da5178fe3b0b"],["/syntax_and_semantics/compile_time_flags.html","eac13569ce29424fb27b7c43a12c4029"],["/syntax_and_semantics/constants.html","5bab640fca8581adb8eadef5bb48c65d"],["/syntax_and_semantics/control_expressions.html","622bdca4fa1c36bf4b08eaede43097ff"],["/syntax_and_semantics/cross-compilation.html","49bc6fc60b224663613f43504c9eba42"],["/syntax_and_semantics/declare_var.html","099fae9e57fa8ae5833355e4d4dbdec9"],["/syntax_and_semantics/default_and_named_arguments.html","2cbc464e1ad897c4c3bc0934ccec1071"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","5c847dba31c60dc8206605fe82eb57cf"],["/syntax_and_semantics/enum.html","df4df4f2752b5dd47942a228fcc2c8a6"],["/syntax_and_semantics/everything_is_an_object.html","08b67ad67a37bc4b27465e5aa491e8bf"],["/syntax_and_semantics/exception_handling.html","f2015c5ab17fb42ee9c92d2979531973"],["/syntax_and_semantics/finalize.html","7ecb942d97803560a3689f7e2c3ece9f"],["/syntax_and_semantics/generics.html","5fd836202f39b4d49df57465a0b5589e"],["/syntax_and_semantics/if.html","6f636b6ab635c2049e5624636022e3a4"],["/syntax_and_semantics/if_var.html","def6912cdeecded743b575a6dbd48622"],["/syntax_and_semantics/if_var_nil.html","c92dd45619fd48bb262f39baca8a81c8"],["/syntax_and_semantics/if_varis_a.html","f6492b7dbdc9b142a5afb092b8b7c903"],["/syntax_and_semantics/if_varresponds_to.html","947e79e1467b67159c6b419f99d77a93"],["/syntax_and_semantics/index.html","4f154e928d0ff687b1c83675a91ccc14"],["/syntax_and_semantics/inheritance.html","0c4731dec6cba7ce7f5585b984c430b2"],["/syntax_and_semantics/instance_sizeof.html","a5d52b4603ab450f73024b0dc3713a5d"],["/syntax_and_semantics/is_a.html","9eb5d60d548fd9ab12f22bce312210b2"],["/syntax_and_semantics/literals.html","4a0ed00bcb8bd6f24f5af44f3c4746eb"],["/syntax_and_semantics/literals/array.html","abc103c71f8488f7ebc566a7df2e1582"],["/syntax_and_semantics/literals/bool.html","5398a57f82a2c22f5d0cc0057d30e7fe"],["/syntax_and_semantics/literals/char.html","ff1c3bc044641b9aac99cb204c984ae1"],["/syntax_and_semantics/literals/command.html","ad59886d667cabee1fae11fee14ede8b"],["/syntax_and_semantics/literals/floats.html","debf2dde8e1fcd565b97f7f68c429006"],["/syntax_and_semantics/literals/hash.html","39e84b068dab58ec3b37b4e604afaf90"],["/syntax_and_semantics/literals/integers.html","11eaaabde2144a6407796ec3d0762701"],["/syntax_and_semantics/literals/named_tuple.html","af7d2c519d896031a115088b4f359dd9"],["/syntax_and_semantics/literals/nil.html","450435ce67c4330c65032cd0e0db9939"],["/syntax_and_semantics/literals/proc.html","4f37c22609a40539e55d1162bf4b38bd"],["/syntax_and_semantics/literals/range.html","f784f2efc96ea7d536d422d5fbb4b6e6"],["/syntax_and_semantics/literals/regex.html","9ab0fc6e67b540134070f5b28e99aae2"],["/syntax_and_semantics/literals/string.html","8a76425cd3fa64edff7d471bb5ff6c6c"],["/syntax_and_semantics/literals/symbol.html","9ce42e2d4b51cf44bedd6ad8976b7e7c"],["/syntax_and_semantics/literals/tuple.html","67bec6a987cd526ff29dcb7b904cf326"],["/syntax_and_semantics/local_variables.html","1ae79958f525bba2a0f90202ebb961ab"],["/syntax_and_semantics/low_level_primitives.html","b7ba9351d2668585eb2e1eb7a8617bc2"],["/syntax_and_semantics/macros.html","cdd47ff3935d9c34b6303951182eadd7"],["/syntax_and_semantics/macros/fresh_variables.html","08b55e3392c543c3964bd7ec3a0d3a88"],["/syntax_and_semantics/macros/hooks.html","371e53ca1d199e3876dac980f99347d9"],["/syntax_and_semantics/macros/macro_methods.html","a3f8f7dc2166a047e79c3eac7b5b07d6"],["/syntax_and_semantics/methods_and_instance_variables.html","35a158894254866a4c742df1f124e4c8"],["/syntax_and_semantics/modules.html","a0311ca680b733582a69ac9917c25b99"],["/syntax_and_semantics/new,_initialize_and_allocate.html","4c8ac2dea8920745b4649eed5d46a788"],["/syntax_and_semantics/next.html","b25c321affca2cb194d86a73cecda3de"],["/syntax_and_semantics/nil_question.html","03b6ca6313fa072d5eff2d841f07b1de"],["/syntax_and_semantics/not.html","2e1c3b8813492cb75af0e7283b44398c"],["/syntax_and_semantics/offsetof.html","25d71dc138214a9010b864e68e55cacf"],["/syntax_and_semantics/operators.html","7fba3874b67cd8eb07f1891208dc8007"],["/syntax_and_semantics/or.html","75f783064cc490c003e3841cc93a434f"],["/syntax_and_semantics/overloading.html","3b7aca0c0b5bdf8b9ee6216aa1f97cf6"],["/syntax_and_semantics/pointerof.html","c9296b84a40c6d8c45fd4731a1c4bce9"],["/syntax_and_semantics/proc_literal.html","c31895c7f2d1ef95558d0a17aeb4972f"],["/syntax_and_semantics/requiring_files.html","5969611f22e4d899abe58eec6518e245"],["/syntax_and_semantics/responds_to.html","bd5b7b02dba04b64daf425c64080fb43"],["/syntax_and_semantics/return_types.html","9a95a3f7ba1395403e79e052f473e603"],["/syntax_and_semantics/sizeof.html","bf4953bbf525127da7ef56a69db47c62"],["/syntax_and_semantics/splats_and_tuples.html","760df306631ab5be589e241bc1e74b97"],["/syntax_and_semantics/structs.html","8d3926399dd0489c2aad29d0a6160122"],["/syntax_and_semantics/ternary_if.html","ea6b7803965e8151804d8e0236fd8284"],["/syntax_and_semantics/the_program.html","9f7f4ae67c640935b0da34d93521c55c"],["/syntax_and_semantics/truthy_and_falsey_values.html","4ab4b3e1c5c3d0e2f6a2d399b27ec134"],["/syntax_and_semantics/type_grammar.html","f86165a26031dcee380f15e04cef49b1"],["/syntax_and_semantics/type_inference.html","83123c4d51858f058d360fc81944477c"],["/syntax_and_semantics/type_reflection.html","9462f7c69718c40d87946159b50fd023"],["/syntax_and_semantics/type_restrictions.html","c10901faea4703252a2414018072b4cf"],["/syntax_and_semantics/typeof.html","dd9f92758bad98a88861e0dce7787a45"],["/syntax_and_semantics/types_and_methods.html","080fa83f2fcc0a8a1f388312345d681d"],["/syntax_and_semantics/union_types.html","8854a76afacd7df19c2c174cd49d0fc9"],["/syntax_and_semantics/unless.html","97aa83f560313b3c49b90bc3d0a4cca1"],["/syntax_and_semantics/unsafe.html","d676ae6d3d223a1893eab5320af00c44"],["/syntax_and_semantics/until.html","f53d0c7ff88e4ec2344527226bee807e"],["/syntax_and_semantics/virtual_and_abstract_types.html","bcb190486d8cb8d9a4e51828e21d24ec"],["/syntax_and_semantics/visibility.html","b4438f5b90fc75419a43dba1e4bf3b8a"],["/syntax_and_semantics/while.html","3642e5e3c9d804a4c51213f5bdfd1a4f"],["/the_shards_command/index.html","1ed337e0cc8cd1da4d63a014856a4593"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","e4d6209656951a59aa61ad05f78d7307"]];
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







