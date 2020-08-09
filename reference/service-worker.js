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

var precacheConfig = [["/conventions/coding_style.html","b24e9b4dbebeeead8b8fe024c49b0100"],["/conventions/documenting_code.html","b3dc31baafbe14ea8885c1e1fd2ec7cb"],["/conventions/index.html","80a4e0ef21f087a6d07278e3754e415c"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","de6da7416c10add2985431f20e754cb2"],["/database/connection_pool.html","5a1c08cd7aa6d1ecae0e5fb6f1c027e7"],["/database/index.html","80cb73f04cb0ba64452742e0ffd64493"],["/database/transactions.html","c53e4499bb49ed812728af0f6ee6aace"],["/getting_started/cli.html","32030ef3036ee7f74167238d82ff8e92"],["/getting_started/http_server.html","f1dd31523e5523a7bd84c18bd47f299a"],["/getting_started/index.html","befd51077e78108d082f4cfc7458aeef"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","034dff1168921853fc925273f8e8bdea"],["/guides/ci/travis.html","36c6ca0854699cb023e8ea625ff96a81"],["/guides/concurrency.html","b96fdca2a7d4d6f8ef764a6be813fb9b"],["/guides/continuous_integration.html","3681a52c2a858e1af9416108fd8a36f0"],["/guides/hosting/github.html","118841ccba3554675f29f46f5ee4914f"],["/guides/hosting/gitlab.html","037d04eb9921060e1497bb0bb28d4c64"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","9b2dd677ee1435ea16ff379146f61bd3"],["/guides/performance.html","1d87216c498f63d151ec620cf55d74cd"],["/guides/testing.html","103108e16fd34017a8dc70f514dfcde0"],["/guides/writing_shards.html","1ea0ff7d2566be309ef619050a3bdfb9"],["/index.html","840a26e5edf2f84ae17d36633e593205"],["/syntax_and_semantics/alias.html","332826a54cfad13e3cb2d50319b1272a"],["/syntax_and_semantics/and.html","091d92c5fd65c896945476cea0b11f88"],["/syntax_and_semantics/annotations.html","252c95c669a1e3ad7a225fef7f2309d6"],["/syntax_and_semantics/annotations/built_in_annotations.html","e9f6f26d985af9814a0c9681b98d9763"],["/syntax_and_semantics/as.html","9d0ad85e03282ebac250e5c3d34da54f"],["/syntax_and_semantics/as_a_suffix.html","cf0f32472ff58716450da5092b3abbfe"],["/syntax_and_semantics/as_an_expression.html","6ddcc1fabb154c3c30c7dc3f6b35fd74"],["/syntax_and_semantics/as_question.html","1b85ca64a4fe6addc5640d2bc2d02d0a"],["/syntax_and_semantics/assignment.html","afcd0a17a466f0da22cca2c28576344c"],["/syntax_and_semantics/block_forwarding.html","ccd84048255f93d970d3236ef2441e47"],["/syntax_and_semantics/blocks_and_procs.html","30df424fcf9b5ae946188a8281be9987"],["/syntax_and_semantics/break.html","2498eac64b64459c81bddc2dec4599bf"],["/syntax_and_semantics/c_bindings/alias.html","7ef4529eac902c5b4c8a83e75bddd4af"],["/syntax_and_semantics/c_bindings/callbacks.html","5642a928d95c164136666d90a6bb0073"],["/syntax_and_semantics/c_bindings/constants.html","af42967a1229db8455efb37aa09793e7"],["/syntax_and_semantics/c_bindings/enum.html","c8f249020c8107deb6e2dd1b34745183"],["/syntax_and_semantics/c_bindings/fun.html","a07f808c675ee35f3b6092d80608561d"],["/syntax_and_semantics/c_bindings/index.html","2604b2aeddc2dc901b98265271d64bc0"],["/syntax_and_semantics/c_bindings/lib.html","a03fa764e97427644c133f0fd9b05840"],["/syntax_and_semantics/c_bindings/out.html","2cb6ee8dddddf9293444d37a49e61fd6"],["/syntax_and_semantics/c_bindings/struct.html","fbb5d42fa4a546d069ac7351dfacc1fc"],["/syntax_and_semantics/c_bindings/to_unsafe.html","f49f16748d9efa17565461747a285791"],["/syntax_and_semantics/c_bindings/type.html","9fb77d4be452d812e12d5dd1f40b3943"],["/syntax_and_semantics/c_bindings/union.html","9d24041b4ab19babd76c6d177eba25f7"],["/syntax_and_semantics/c_bindings/variables.html","68a7d5ecc309cb553d512576e8ed4643"],["/syntax_and_semantics/capturing_blocks.html","3ccb20c2176b4050cfc9abd65dda5c01"],["/syntax_and_semantics/case.html","7906a3daabe92bc71d99611cb4bcfda3"],["/syntax_and_semantics/class_methods.html","f2f0f41c3889d049bfb37d397b395db9"],["/syntax_and_semantics/class_variables.html","ae5043b84b042ed63e71b0773beb96a5"],["/syntax_and_semantics/classes_and_methods.html","ed4fb0ed62a9d85e382f2e02c63b2b61"],["/syntax_and_semantics/closures.html","ebad1a942c58c043fb6ccf388194b48e"],["/syntax_and_semantics/comments.html","1db991bd884726c6538f3cb82d3a3566"],["/syntax_and_semantics/compile_time_flags.html","6b3f23345c3437f1d6edcf98b0e9302b"],["/syntax_and_semantics/constants.html","f2dbe27e00b9534fcdb9574d82af626b"],["/syntax_and_semantics/control_expressions.html","3a42bee52529cdfc1df9a53f01a3e8ee"],["/syntax_and_semantics/cross-compilation.html","0fba03e1f61002e5364d20dd815faa9a"],["/syntax_and_semantics/declare_var.html","581882e331c0890e0510df77b8a57162"],["/syntax_and_semantics/default_and_named_arguments.html","c5b4a217978b75c085db68b5aa96df46"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","0b4720a49db48a1f3612905c95c59270"],["/syntax_and_semantics/enum.html","d1f819bc2e09fb18fc6d93c2168b202e"],["/syntax_and_semantics/everything_is_an_object.html","3a8f0a26dad7966afb274d9ee01dda83"],["/syntax_and_semantics/exception_handling.html","2b859eaa6b356634ad17345fcec0f70b"],["/syntax_and_semantics/finalize.html","fdc48aa0786df2d6c5d220a9d2ed8d42"],["/syntax_and_semantics/generics.html","10438c66b32b5e980d8bf2f130e95f90"],["/syntax_and_semantics/if.html","d397aabb1dc1a5eaa2c560a145eb3474"],["/syntax_and_semantics/if_var.html","7b905461b22f1791309ce3cb650716a7"],["/syntax_and_semantics/if_var_nil.html","7c0f873faf93bb1e517cf2bad516360b"],["/syntax_and_semantics/if_varis_a.html","c2520304d555924a0ffe2ee3bd7f9419"],["/syntax_and_semantics/if_varresponds_to.html","fb0dd85345947f60b54900277efb8581"],["/syntax_and_semantics/index.html","5bdc06d8b19dcfd7137d93d75dfce285"],["/syntax_and_semantics/inheritance.html","f0e74ba7f25028460adfd0e1929024e8"],["/syntax_and_semantics/instance_sizeof.html","5beae8ae17baf28f38aa7562719da585"],["/syntax_and_semantics/is_a.html","8cba004cdbcf95eb9e3791681855b8b6"],["/syntax_and_semantics/literals.html","14948f6a36b31f76eae65b3ed5f98de1"],["/syntax_and_semantics/literals/array.html","6c7f6d15e14a1b2eb2da8ca37e2f8262"],["/syntax_and_semantics/literals/bool.html","288e825bbb3c40838d6cecdb1eea1d36"],["/syntax_and_semantics/literals/char.html","e5fc5ed46fc0fa23fd1ed02527eda174"],["/syntax_and_semantics/literals/command.html","74ac3f6f4e858a1338e89d2ce188c2dd"],["/syntax_and_semantics/literals/floats.html","3596c4470147f45ba0c93b9e072bac06"],["/syntax_and_semantics/literals/hash.html","86b55f5ea1d1dcc17a602020b8ae745c"],["/syntax_and_semantics/literals/integers.html","6ec57e160a80d7a5675c8af9143fbaa2"],["/syntax_and_semantics/literals/named_tuple.html","9969f115080696e61d762eddba50baac"],["/syntax_and_semantics/literals/nil.html","9e408f25b0c42b94e87bfa8ad7a66b29"],["/syntax_and_semantics/literals/proc.html","a34537f6eba790b6b16a95339e9def84"],["/syntax_and_semantics/literals/range.html","210d7163f036b7a762801d1873f976b6"],["/syntax_and_semantics/literals/regex.html","8735ee8f7c1e313c014a23d862ddbe8c"],["/syntax_and_semantics/literals/string.html","69b1064b0ff84d5000a506288c9f4fd1"],["/syntax_and_semantics/literals/symbol.html","53bbb64bb6d62aa8909bd1c25300eabc"],["/syntax_and_semantics/literals/tuple.html","df0f5c54f6b7d27770853972eed86a7a"],["/syntax_and_semantics/local_variables.html","c4675273fe24bc454bba594aecc56dd1"],["/syntax_and_semantics/low_level_primitives.html","a4137df2c2964f1bc0e629edcfdbdd1e"],["/syntax_and_semantics/macros.html","b09057927dd4ff194b84841c508b0fab"],["/syntax_and_semantics/macros/fresh_variables.html","e45e280bf3de30f09d2782e93ee68172"],["/syntax_and_semantics/macros/hooks.html","27a799536655438b7dcbedb76e20c615"],["/syntax_and_semantics/macros/macro_methods.html","6476d3e295f8600801f7e2fc02c47aea"],["/syntax_and_semantics/methods_and_instance_variables.html","067bfadc902d5edc34b30a8e7c6ba280"],["/syntax_and_semantics/modules.html","f7e296970d2d9a9c87414b9f7be4aba2"],["/syntax_and_semantics/new,_initialize_and_allocate.html","6242661e141e39aa38c2a3055f78142e"],["/syntax_and_semantics/next.html","e0d67affb9bcdadfde4474bfc1a3ca90"],["/syntax_and_semantics/nil_question.html","c9268aab4fab5c2f34cbaca5bf956ff8"],["/syntax_and_semantics/not.html","984b5d5491f0c5a8615a29333efa55e9"],["/syntax_and_semantics/offsetof.html","1c0011bd111ba3301520247c7fd356df"],["/syntax_and_semantics/operators.html","5e303a18498aaa8cc7919aa44328f6e2"],["/syntax_and_semantics/or.html","b300a0f5da1b237f0c0c56d762b81e73"],["/syntax_and_semantics/overloading.html","00bb5aa32fa6edea3277cc15afa3b088"],["/syntax_and_semantics/pointerof.html","431979c6550436dc65892e9b20e7d87b"],["/syntax_and_semantics/proc_literal.html","5385784b7fa209a2917919ebc73989b5"],["/syntax_and_semantics/requiring_files.html","290278a5d285ac0d36a885d444065b32"],["/syntax_and_semantics/responds_to.html","0bff87600c7f269e205fe26397779df5"],["/syntax_and_semantics/return_types.html","7a5e6c452cb39d034cfe463fbea49cbb"],["/syntax_and_semantics/sizeof.html","8b8d469f3fe677569b169cce17677340"],["/syntax_and_semantics/splats_and_tuples.html","3ce3b6d3e211b4a5ca17fe12143a4e04"],["/syntax_and_semantics/structs.html","43dad5857b89ed55806b7851a79c1ada"],["/syntax_and_semantics/ternary_if.html","ea81eb527692ef078ae7816786f34d80"],["/syntax_and_semantics/the_program.html","3d6dbb3123314df607403e624c3c1973"],["/syntax_and_semantics/truthy_and_falsey_values.html","32ea9b9f7b66578ad7d00f3221d85192"],["/syntax_and_semantics/type_grammar.html","603c3315c8c9be5afaa5447186064014"],["/syntax_and_semantics/type_inference.html","5f87a1faa45cb9674c073be5e41bed8a"],["/syntax_and_semantics/type_reflection.html","217a23a5c83c678d8266f2b3622a5f7b"],["/syntax_and_semantics/type_restrictions.html","ab4a23d6b010a88c818399d50bbe803f"],["/syntax_and_semantics/typeof.html","ca781c46b1e08f9eb34c747adf481e4f"],["/syntax_and_semantics/types_and_methods.html","e5174939209255553905fbee8d8dd22d"],["/syntax_and_semantics/union_types.html","02667996350e6339946dcf609bb481db"],["/syntax_and_semantics/unless.html","d2aa26f2a9aa681e4d5de93343a7a010"],["/syntax_and_semantics/unsafe.html","37ce03b2c4499464334a769ff77668a6"],["/syntax_and_semantics/until.html","9d772eaffff7fe17726c5fe282ad782b"],["/syntax_and_semantics/virtual_and_abstract_types.html","e53ff1f15adaaa2942dd7d6d48bd0290"],["/syntax_and_semantics/visibility.html","0dd5d92af5b669adf9e877aa8ae66f6d"],["/syntax_and_semantics/while.html","33f3e3b2bfde4071e172433e843101c4"],["/the_shards_command/index.html","5aef2692630400d1ebed3f03e53ec743"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","1df383003f8fec5f7f93825c45a00579"]];
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







