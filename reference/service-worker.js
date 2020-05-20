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

var precacheConfig = [["/conventions/coding_style.html","1b99116ea602ab0ec3db29f5fd021856"],["/conventions/documenting_code.html","c048694c885ff0cb66794a4d5e175d7a"],["/conventions/index.html","0b3b3b08cb546199d16d087d49faf173"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","afcf2946a6787e83600e29246603931f"],["/database/connection_pool.html","4fe36f2edf58ca79c0fbf5a9021f6e14"],["/database/index.html","b39a793239fbd4084fd5624881cde3d3"],["/database/transactions.html","d84220a291b6faf18b6ca8db2656e410"],["/getting_started/cli.html","1cb851c02ca7690515ec7fb67d665b44"],["/getting_started/http_server.html","42fcbda6e28733dead92e3af95f93479"],["/getting_started/index.html","5ff62bd08b8acddeba0d962a891471e1"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","6a12bb51caa9e96e9328cd00c1bde391"],["/guides/ci/travis.html","8bdef79ed338b025f9c152625b9140a8"],["/guides/concurrency.html","4932b29e16f45911d67bcb857f4de97c"],["/guides/continuous_integration.html","30e7200058a5a6fc5ab62a9691be87b8"],["/guides/hosting/github.html","f65acc080c4a7927a8df7a66b2fb6185"],["/guides/hosting/gitlab.html","67b549cfdb6055188280f5f45d6229b8"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","e09903f9a7b118939fb58f96bed67301"],["/guides/performance.html","068b2d961f5f7d036820a27897a0f1ed"],["/guides/testing.html","2cbbb93b2390dad29cda63b805f0d061"],["/guides/writing_shards.html","8e83c68321d4525a2d14ee1a644c22bd"],["/index.html","59dee82e942283a472cafed6c654f78a"],["/syntax_and_semantics/alias.html","c062c23ba884678911f6e99d754b05b4"],["/syntax_and_semantics/and.html","a4d4be3c89c54ea7bfef99dee1dc47cc"],["/syntax_and_semantics/annotations.html","4cfb7d3b28dbeae097d5a07fce643714"],["/syntax_and_semantics/annotations/built_in_annotations.html","af22638eb1ec7b251434ec206f4786d8"],["/syntax_and_semantics/as.html","92cfd5e7a63c440d360637ac49cbeb06"],["/syntax_and_semantics/as_a_suffix.html","4836200985c898b63eed32a88a8c9226"],["/syntax_and_semantics/as_an_expression.html","2af36e3f5ebff8d69c46877140b9f57d"],["/syntax_and_semantics/as_question.html","40ee6b1733ffa7610c57265afceccdac"],["/syntax_and_semantics/assignment.html","95583ce63af62cbfa9d21685e8135b97"],["/syntax_and_semantics/block_forwarding.html","fd65fc78a732f2a2f6de934c6a00d7fb"],["/syntax_and_semantics/blocks_and_procs.html","9d6ca767c701fca30f518647caa23244"],["/syntax_and_semantics/break.html","27b1fd355cc32c4a1b635732776a0e2b"],["/syntax_and_semantics/c_bindings/alias.html","8eee0310d38114f726ca23eed9e2cf3d"],["/syntax_and_semantics/c_bindings/callbacks.html","e21bf8e2bcf9ee3045fa3f1371097ff4"],["/syntax_and_semantics/c_bindings/constants.html","4a9e7a534e0acd3c561c531a967c11a8"],["/syntax_and_semantics/c_bindings/enum.html","c3a6210d6be774246dc55902abc3ee7c"],["/syntax_and_semantics/c_bindings/fun.html","e0e240d35a8492737816022204bf21f8"],["/syntax_and_semantics/c_bindings/index.html","367bf849a66a7117b291367941eb0bff"],["/syntax_and_semantics/c_bindings/lib.html","49536efb1ea0ca202b0d190d798997e9"],["/syntax_and_semantics/c_bindings/out.html","d47b5351d60e48a7c7bad93a54b7a232"],["/syntax_and_semantics/c_bindings/struct.html","f004a4e7a4ba4935841d993dee288253"],["/syntax_and_semantics/c_bindings/to_unsafe.html","20e174f463104ce4a7666dd9e71546ac"],["/syntax_and_semantics/c_bindings/type.html","20ec2638fb9a8b2546e08bceacd92a5c"],["/syntax_and_semantics/c_bindings/union.html","d8d0687c3ccdbbb57a29af251004c16f"],["/syntax_and_semantics/c_bindings/variables.html","48b8ef52541571aa095a9e742bf14b53"],["/syntax_and_semantics/capturing_blocks.html","0d4fbfca052a9d22928c5a68b8f69cc0"],["/syntax_and_semantics/case.html","c111b82bae7990567a00affebad2b011"],["/syntax_and_semantics/class_methods.html","350b629e5e3bfbc11b7fdd6e1ce89b4a"],["/syntax_and_semantics/class_variables.html","52f767a98eabb7a619ef38356a1fb5b5"],["/syntax_and_semantics/classes_and_methods.html","fc1a2c00bda694e21d62ae120c13480e"],["/syntax_and_semantics/closures.html","b489918969b6bed611ffb9e48e826a70"],["/syntax_and_semantics/comments.html","73e1bffa84ba559be5bba332a93a8e4e"],["/syntax_and_semantics/compile_time_flags.html","a7dfb9c04922301bac1423004b664ebd"],["/syntax_and_semantics/constants.html","5857cafc040fc8461442216397001a92"],["/syntax_and_semantics/control_expressions.html","ae0ecaf6085261c94b4193bb0b51baf4"],["/syntax_and_semantics/cross-compilation.html","f8518815af565abccf4ba1ab72ef302a"],["/syntax_and_semantics/declare_var.html","5f71983a7282932fc9e09a79f6c0ef8b"],["/syntax_and_semantics/default_and_named_arguments.html","2783e539e08442483f1a316b753af4f1"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","63d2bc14436269dcbca9c4955ff43b05"],["/syntax_and_semantics/enum.html","8d9a4b114dc6a22687623ac61a273178"],["/syntax_and_semantics/everything_is_an_object.html","ccf4dec166da827038b2f4dd8a137cd2"],["/syntax_and_semantics/exception_handling.html","f338154a125df7c308735234cdba18cb"],["/syntax_and_semantics/finalize.html","d98421e0a1cc9f8a028d0888b9b7c142"],["/syntax_and_semantics/generics.html","9a2b1a24b0b544968982c646b68cb0ed"],["/syntax_and_semantics/if.html","cffd49763423767dcb5e706ed8007bff"],["/syntax_and_semantics/if_var.html","a01a9588aa2cd6bc5906c55d32748f36"],["/syntax_and_semantics/if_var_nil.html","9524e47acdb30f20d6b39a7ac3f1377a"],["/syntax_and_semantics/if_varis_a.html","2fb6ebf6afcdbbacc2aae65403d78fa5"],["/syntax_and_semantics/if_varresponds_to.html","7808264dda0b767c071e206f48a63a8c"],["/syntax_and_semantics/index.html","40f4b4d0aa1b8d5ed3540783bde62378"],["/syntax_and_semantics/inheritance.html","6522844b1d531ebe58eba06afcbe99f7"],["/syntax_and_semantics/instance_sizeof.html","8f119f554e753ddf84d023d6b4822195"],["/syntax_and_semantics/is_a.html","7f30ea0ac04e2d334d018e506a5df853"],["/syntax_and_semantics/literals.html","33d44602a75f9ca0105331deac8ad0cc"],["/syntax_and_semantics/literals/array.html","033c928a66199ab8a1420626a1a7f267"],["/syntax_and_semantics/literals/bool.html","4253d14765167f6d5e2718ef31018fb6"],["/syntax_and_semantics/literals/char.html","350b0b904996be052923e38fe03754ff"],["/syntax_and_semantics/literals/command.html","fe5629de128a2786837b813c7f0a674b"],["/syntax_and_semantics/literals/floats.html","7382585020b4835cfec0d9f74ae32f86"],["/syntax_and_semantics/literals/hash.html","acd32e70cb5328e8a0b8db7c1f8e84ae"],["/syntax_and_semantics/literals/integers.html","ff1ce47f288f56822eb7d82b8c32ddcb"],["/syntax_and_semantics/literals/named_tuple.html","b9204f7de1aadc510609ad14e7ec4052"],["/syntax_and_semantics/literals/nil.html","030b02f4e32567acdd100379b673de92"],["/syntax_and_semantics/literals/proc.html","d47fedf730773a0dce1d71dd1dd158df"],["/syntax_and_semantics/literals/range.html","aefa577ef235ab4c87c9a951d15c1ef3"],["/syntax_and_semantics/literals/regex.html","41dad45ec13f54f343916e4663b45654"],["/syntax_and_semantics/literals/string.html","468097fbb38ecdec4e273c266464645f"],["/syntax_and_semantics/literals/symbol.html","92a8a0434b20e0f7881f24792d0fe21e"],["/syntax_and_semantics/literals/tuple.html","1c218e465b08bf12dd77d5860d11e688"],["/syntax_and_semantics/local_variables.html","129776e9a364999a89af93ce5f9f018c"],["/syntax_and_semantics/low_level_primitives.html","3b9779b3c939f9f1254e06c7f34fe4b5"],["/syntax_and_semantics/macros.html","fcf6419cd1c18da52f9035dc54cef2fb"],["/syntax_and_semantics/macros/fresh_variables.html","1c28a127e7743fe0579ff0fdfdb8aea5"],["/syntax_and_semantics/macros/hooks.html","d68f93936905e0db92e47553355952fc"],["/syntax_and_semantics/macros/macro_methods.html","612b124ee17ee11216adbc2e9fde2248"],["/syntax_and_semantics/methods_and_instance_variables.html","4e82cee413e80da5932732dce086e919"],["/syntax_and_semantics/modules.html","ca541b9d207e3f46dc37462ab6aa281e"],["/syntax_and_semantics/new,_initialize_and_allocate.html","c1eff78c69e1f0e26bbe78711d455c9d"],["/syntax_and_semantics/next.html","5175372a59c33903b109cf5b3e9e67fe"],["/syntax_and_semantics/nil_question.html","23233631b54e521b3b308ccdae66861c"],["/syntax_and_semantics/not.html","edc7ff73578b2a37e350780f80931e3f"],["/syntax_and_semantics/offsetof.html","328c3e935c72e83ac2edc28df9485550"],["/syntax_and_semantics/operators.html","d0caa7634d875385facbbb3bbc83cf69"],["/syntax_and_semantics/or.html","531a7fd7c5d77097252b1e523c123fe5"],["/syntax_and_semantics/overloading.html","7ec43b928566d7c32c3382caa9c4868c"],["/syntax_and_semantics/pointerof.html","9c9b5a9593dc19455831e5914d231b5b"],["/syntax_and_semantics/proc_literal.html","55127211a281977f791ede211c67c8de"],["/syntax_and_semantics/requiring_files.html","b756566f9f8b576494b05bd97b28a0ff"],["/syntax_and_semantics/responds_to.html","8229b434692e7c1cfd9555ca4e143424"],["/syntax_and_semantics/return_types.html","76cc6826460da5f406e7915cc76fcabf"],["/syntax_and_semantics/sizeof.html","8e798bf90d000b0d06dd01fa866ffd8c"],["/syntax_and_semantics/splats_and_tuples.html","b8b981de0129ad4d37c0e6bb5be8146b"],["/syntax_and_semantics/structs.html","cc5962722f7c7f1d0bf8b64c4bf6fcbf"],["/syntax_and_semantics/ternary_if.html","f3ffe891cd5c58872d4ac8b7b49c5ca9"],["/syntax_and_semantics/the_program.html","1a796d678a6dc83737e1528ceec203c4"],["/syntax_and_semantics/truthy_and_falsey_values.html","8bfd55d281515e41b2df93eba45832ab"],["/syntax_and_semantics/type_grammar.html","f52795c7dd2050e8ff96b6456fd2373a"],["/syntax_and_semantics/type_inference.html","84845b3d83337e62a12ef19692d85d36"],["/syntax_and_semantics/type_reflection.html","0902abd8003a13a21354c2b2dd0bafa7"],["/syntax_and_semantics/type_restrictions.html","10cbc4f82498314600230814515ec68b"],["/syntax_and_semantics/typeof.html","cb39d8a81976117ca240955902a0b95b"],["/syntax_and_semantics/types_and_methods.html","cfee77648555765ffc6cbebb343fb995"],["/syntax_and_semantics/union_types.html","2171389abd845435b4bdaa32617fbd8d"],["/syntax_and_semantics/unless.html","83dcb6469bc33e7133c2c0d04d1b0928"],["/syntax_and_semantics/unsafe.html","8c8caa8aad38222c03b584d64ada295c"],["/syntax_and_semantics/until.html","e31fd9d2d511887ced54ae86b53c1e64"],["/syntax_and_semantics/virtual_and_abstract_types.html","75fa5cc61abf4c48aafcd3c9843bdc46"],["/syntax_and_semantics/visibility.html","a23d731f31d4b11e3a9647cb8b2b3b93"],["/syntax_and_semantics/while.html","72f68eeda51f15943b3862089ffbb354"],["/the_shards_command/index.html","c8e503ba7660feec823ad4643017f702"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","4063b0ea00e2b727adbe2da2b1a8c483"]];
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







