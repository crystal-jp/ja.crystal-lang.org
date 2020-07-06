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

var precacheConfig = [["/conventions/coding_style.html","20842a849ad566f71538e76a9dcc5eb3"],["/conventions/documenting_code.html","61fb432a59c63aa4f7a666a86d739b68"],["/conventions/index.html","b4baad216d9d2dd4790732e8e85fc41f"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","702f49a95cd027f1b0397d226058258c"],["/database/connection_pool.html","2befd03538a72b3f3fd5af48472eac40"],["/database/index.html","e90e4dce33a6cb82767742ebad232b83"],["/database/transactions.html","75aff84c8ecf120d1ca60f5c5762657c"],["/getting_started/cli.html","91e734cf0b3fe2b2dd05ec5248830ef5"],["/getting_started/http_server.html","f023e3206e0a7ce3c2d7d844ae2528b4"],["/getting_started/index.html","e5369d797d8a734a1087d142a93a1610"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","8fb3962dbc35b2472cf405994361f5a0"],["/guides/ci/travis.html","5cfce2ea5aaa479d8e70e61483625d40"],["/guides/concurrency.html","fa7123e37af7af17ffb3242350bea044"],["/guides/continuous_integration.html","7d55b5f77f1801936651c26b74a85782"],["/guides/hosting/github.html","8adb9888e6ebd2118ce31aa735b8c6df"],["/guides/hosting/gitlab.html","c1a04bc6d48d7778bbbf4be205c99888"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","86ad303e94d44bf0190eecc41ecdb252"],["/guides/performance.html","f6dc33c0639a97196b9bad82919b11be"],["/guides/testing.html","00ccced849438434fbc6d5aa355deabb"],["/guides/writing_shards.html","aa9f765f05bef61a5eb8d5a9f9db196c"],["/index.html","55aec8e788eee7ef2810e06b912f1772"],["/syntax_and_semantics/alias.html","8abeae83c748925d16fc1465a46e15ff"],["/syntax_and_semantics/and.html","f834ddc75039bcda6e9a56ab43c56697"],["/syntax_and_semantics/annotations.html","69cf9fabcb2faf7c1e721bd80568e9af"],["/syntax_and_semantics/annotations/built_in_annotations.html","19cb81b24a370199cd5a8b685a1bb833"],["/syntax_and_semantics/as.html","04d5c0db40271453f5a3a71f82de6493"],["/syntax_and_semantics/as_a_suffix.html","18c8a24e5e30319aebdef33e7c49bea1"],["/syntax_and_semantics/as_an_expression.html","9a779f5a61c773a35e2b32970f1c30be"],["/syntax_and_semantics/as_question.html","eb13ada12d61c5b0607b03d3cd51761f"],["/syntax_and_semantics/assignment.html","673c76d3a743ae0e187be3fe37ccee3c"],["/syntax_and_semantics/block_forwarding.html","43de11c4836d0824adeff280da89472c"],["/syntax_and_semantics/blocks_and_procs.html","7d126898391c3bf69e1e610c24a52c6d"],["/syntax_and_semantics/break.html","3cc024b6e1d0d688d38d44d195ecc51c"],["/syntax_and_semantics/c_bindings/alias.html","4ab8a9d7bb6bfc474b8f53bdf5eb9262"],["/syntax_and_semantics/c_bindings/callbacks.html","6fc10433e23572d2eae25389f3052732"],["/syntax_and_semantics/c_bindings/constants.html","f4f32056d6906eb6f79c0a2841d9afcb"],["/syntax_and_semantics/c_bindings/enum.html","c1c34da002edbcec60c58183d090fc9a"],["/syntax_and_semantics/c_bindings/fun.html","49269ba020e5710800b36f9ac0c7a0f8"],["/syntax_and_semantics/c_bindings/index.html","aedf0dad8e4ca9b9322579e6f66375b9"],["/syntax_and_semantics/c_bindings/lib.html","b4dd1f4056ab7b7de09e706f0234df70"],["/syntax_and_semantics/c_bindings/out.html","0c7cb88ee1d3adf07752e2e4cc5b2593"],["/syntax_and_semantics/c_bindings/struct.html","900c928ab191c8c512803ad6bc941e4c"],["/syntax_and_semantics/c_bindings/to_unsafe.html","13f0ad04856376c2f89c61335404c5aa"],["/syntax_and_semantics/c_bindings/type.html","654b36b9ab2d0867a15ff5789742d002"],["/syntax_and_semantics/c_bindings/union.html","c0b0750f3a0e22a7fda78161cf1bff32"],["/syntax_and_semantics/c_bindings/variables.html","0eacb77607405494635185092226bab7"],["/syntax_and_semantics/capturing_blocks.html","d2c722db4610ef9f892f75aa27980adf"],["/syntax_and_semantics/case.html","f9689e4c4a35cc39efc066fbb82304a2"],["/syntax_and_semantics/class_methods.html","b1e4b515f544ff221a863f8ce1037bca"],["/syntax_and_semantics/class_variables.html","6ef6ed478c9e4676f224e55f0d6eb654"],["/syntax_and_semantics/classes_and_methods.html","f820ca6eab9e04c5d3c4374d8f35669f"],["/syntax_and_semantics/closures.html","c43f9de0205de3e691a03e7449841e5f"],["/syntax_and_semantics/comments.html","7f6bcfb0066938527a50f5f8c8a3bf5d"],["/syntax_and_semantics/compile_time_flags.html","bfeeb90e2c7cc3750541f4e6d5c82f98"],["/syntax_and_semantics/constants.html","4341a0589f1c37785f88d060e6ff8b7f"],["/syntax_and_semantics/control_expressions.html","559d7d29880f6626446b8a96780e9ba0"],["/syntax_and_semantics/cross-compilation.html","561cd02004253e8a31b9f0e80be16183"],["/syntax_and_semantics/declare_var.html","87548412470948fc692ad91996e2d84d"],["/syntax_and_semantics/default_and_named_arguments.html","1b5c13135930dbb27a56232596aae4e7"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","d9e351828cbf64100bebe9e0613d1c1c"],["/syntax_and_semantics/enum.html","c07424d33fd30e168406fea79789494f"],["/syntax_and_semantics/everything_is_an_object.html","e9cc826a60ecd6a87fabb4de35d56a2e"],["/syntax_and_semantics/exception_handling.html","7c6aeb1941f89beddb9926b7bc9c7347"],["/syntax_and_semantics/finalize.html","c2cc65c79ea360fff0506284f76e56e6"],["/syntax_and_semantics/generics.html","db97e9981cefaa9dd46c079c0652bca8"],["/syntax_and_semantics/if.html","0ce1e27e4c9edbb58d9fe2675e70d8df"],["/syntax_and_semantics/if_var.html","1dbdbb5bc3a7831f7b5a09df3f0a3926"],["/syntax_and_semantics/if_var_nil.html","cabdf7ed8c55f5f49e2b82033a408d79"],["/syntax_and_semantics/if_varis_a.html","d46df95c2d92788aa58348cd85ef232c"],["/syntax_and_semantics/if_varresponds_to.html","7e47434b1c486c774efe8124d2501e9a"],["/syntax_and_semantics/index.html","47c9810064d88e82192c3e0ffbb6fb5d"],["/syntax_and_semantics/inheritance.html","71968270629159663ee8d2f44bbb7069"],["/syntax_and_semantics/instance_sizeof.html","6d3407b9e3895412ce0741bd43d54a96"],["/syntax_and_semantics/is_a.html","0735c8edbbbe159767b525ae0d5b7dcf"],["/syntax_and_semantics/literals.html","cdf8b4e69d7d441b371f8cdab8dd086e"],["/syntax_and_semantics/literals/array.html","61484e21ae129048e2a02bfa264c268a"],["/syntax_and_semantics/literals/bool.html","be43d9804628d290857ba539bf5e0230"],["/syntax_and_semantics/literals/char.html","584d4e47cd266c5c798d34d690dec066"],["/syntax_and_semantics/literals/command.html","7ade9a0f9f4c02670c6276150832d16f"],["/syntax_and_semantics/literals/floats.html","d252ae15b5bb8ccb29e6f13f62b4c95d"],["/syntax_and_semantics/literals/hash.html","8f916d585723906d046b3339a8cd35e2"],["/syntax_and_semantics/literals/integers.html","d0b6e1b4d227c2bec7fdc746a276e6b7"],["/syntax_and_semantics/literals/named_tuple.html","dba1dddf51021d322dbef8bf11f54f28"],["/syntax_and_semantics/literals/nil.html","188db92f599e06e88a5335f3cb3916e5"],["/syntax_and_semantics/literals/proc.html","42649730f85f67b60af558f5728d95fe"],["/syntax_and_semantics/literals/range.html","3064bd45b5f1be7ebb41ff4213e3d793"],["/syntax_and_semantics/literals/regex.html","1287d5ef1713bbced626144b212caa6b"],["/syntax_and_semantics/literals/string.html","909d14ddda94c0f82e040742d1a4ed56"],["/syntax_and_semantics/literals/symbol.html","d0347f88908275476f16856941c90d39"],["/syntax_and_semantics/literals/tuple.html","f95ff82a7c5a8f1a8fbf5e5081bc114c"],["/syntax_and_semantics/local_variables.html","118683fbf84f7b13d8b37601f61a8238"],["/syntax_and_semantics/low_level_primitives.html","f9658bfe58c90275c53d18957a9a2192"],["/syntax_and_semantics/macros.html","4933fabf49b930dbf527ec64cc9b9ab1"],["/syntax_and_semantics/macros/fresh_variables.html","4be470c514f4200dbfb7e21d3d396149"],["/syntax_and_semantics/macros/hooks.html","74c38ebc931cb1d0e213d5dabf1d1f60"],["/syntax_and_semantics/macros/macro_methods.html","7f3d925099cf6e16b51c8ad15f5b6c2f"],["/syntax_and_semantics/methods_and_instance_variables.html","673aaf1ec1eecff0b2d0c1ae3a5e666a"],["/syntax_and_semantics/modules.html","487f94a8672b8212600a8f51e43e2fc8"],["/syntax_and_semantics/new,_initialize_and_allocate.html","2409178db65282fd4052cec6c7d57e83"],["/syntax_and_semantics/next.html","415337a8f9c8c807a371319ce074f668"],["/syntax_and_semantics/nil_question.html","654a57a8ecba9ee87796575eeaa0032f"],["/syntax_and_semantics/not.html","9f6035c517d1eeafd6144e1d40f97885"],["/syntax_and_semantics/offsetof.html","d764ed8f1b9f2d2f6a716f4d53c0506b"],["/syntax_and_semantics/operators.html","2f7685970d6e9157bed991826fb879bb"],["/syntax_and_semantics/or.html","6f3fdcc0e123ce7c5c3bb4966f337e4d"],["/syntax_and_semantics/overloading.html","2dc1afc2ca38cfa591d1f39e1f2d0163"],["/syntax_and_semantics/pointerof.html","bc9401448b139c2692e18a7083db8b31"],["/syntax_and_semantics/proc_literal.html","c0d55f7b5105a3c92993c409887432cb"],["/syntax_and_semantics/requiring_files.html","2cda263cda96750dc9d978e2e30c55c5"],["/syntax_and_semantics/responds_to.html","1c6adf8ccdc0d04a080f529117a112df"],["/syntax_and_semantics/return_types.html","97183260cc528a2e44df6b32b75f65d7"],["/syntax_and_semantics/sizeof.html","e9ad90b7d06b3ceb9c45887b96160f40"],["/syntax_and_semantics/splats_and_tuples.html","a36f1506adf01db4a18d7612ac5da0e5"],["/syntax_and_semantics/structs.html","f2bdd36bf7d0fd242239c002783432da"],["/syntax_and_semantics/ternary_if.html","167f9b1f6cfc834da35790b118609d42"],["/syntax_and_semantics/the_program.html","6eb9ea037a79bd1752bf899052843830"],["/syntax_and_semantics/truthy_and_falsey_values.html","a89bba7686e4f658492684df908820b1"],["/syntax_and_semantics/type_grammar.html","f686344f1495cc4890ca7f44acbf4c7c"],["/syntax_and_semantics/type_inference.html","bca988f3adb5f33e35a6098e097e0b6e"],["/syntax_and_semantics/type_reflection.html","b23c9f1de6d64fdafcfa7dbadef953ce"],["/syntax_and_semantics/type_restrictions.html","322e7c466022394927f32e9b99d8ad7e"],["/syntax_and_semantics/typeof.html","0cd664fcf80ab805882472e873838a47"],["/syntax_and_semantics/types_and_methods.html","1d8ef5afd4bc3d7209f6dd668cba8c78"],["/syntax_and_semantics/union_types.html","2deeb7fdd7a04d845895b4164f6d3f9e"],["/syntax_and_semantics/unless.html","36132300dace7d1953abb73833ecb170"],["/syntax_and_semantics/unsafe.html","8e922d385f46c98543ba14082112b9d3"],["/syntax_and_semantics/until.html","5c0be3ad6c56c9102a41e67697bc9144"],["/syntax_and_semantics/virtual_and_abstract_types.html","9d1ccf03ad498f6c1596e9f22504dde1"],["/syntax_and_semantics/visibility.html","9b4e04b7832aae75d102ac981f9bf02a"],["/syntax_and_semantics/while.html","f94a086830b621dbbf432e2e21310594"],["/the_shards_command/index.html","c8e4deeffd1c4e600af59c94d0f3f275"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","6aac30eba7b5b58d4a0ad651dee8e2d2"]];
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







