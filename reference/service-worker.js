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

var precacheConfig = [["/conventions/coding_style.html","2e35939259244ed65f8df7d276dd689b"],["/conventions/documenting_code.html","82875e2266ec9656b757d715908797ae"],["/conventions/index.html","0335d9c8058d6a70ab5954274909dd98"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","da65cbd04ecb97e4b706816df02d3355"],["/database/connection_pool.html","83297ff3617350d1d4965f1be6dd10a7"],["/database/index.html","134d52de378d0395cea612d877eb5e10"],["/database/transactions.html","a5891192dc5d403da4aeb8e06d368b63"],["/getting_started/cli.html","1c446826f153396376478aa4603902a7"],["/getting_started/http_server.html","82f97be854f7f7b6a54243a6d299d91d"],["/getting_started/index.html","436ea1892bd0e1cbd1939e322cde54cc"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","0a7886220f57fd3d2de530bf6d8991fa"],["/guides/ci/travis.html","70a0e3be3e4cfcd80139d66dd172cffa"],["/guides/concurrency.html","1d4f49e50d288c2f0ab31dff17e86678"],["/guides/continuous_integration.html","94250d387cedefffe022192c55c60762"],["/guides/hosting/github.html","b9dc2bc9d19f8ed3db0398e1566d19a9"],["/guides/hosting/gitlab.html","de0f8a986b41f03de8e0cdd081dcacca"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","dfe214248ccc1250b5cbae0fd0cf3d6a"],["/guides/performance.html","c745f59ba889de318f9882068c5bd31f"],["/guides/testing.html","fe01eb7e6cfd28d42abf68472bb4bbe3"],["/guides/writing_shards.html","a356ed50f96e313f6c01b4e8aa9bd0d2"],["/index.html","36733e9ba9b60f5ac98d8ec358364e56"],["/syntax_and_semantics/alias.html","b6cac124b7eb19d002c8b5c69e665f66"],["/syntax_and_semantics/and.html","021cee0f7e52ec0fc44f373b3dcd9805"],["/syntax_and_semantics/annotations.html","0827666e9a6c1aa52f0239fb52050c20"],["/syntax_and_semantics/annotations/built_in_annotations.html","2e3d92b7a4d5be072905779a48c7b617"],["/syntax_and_semantics/as.html","a70cbd64146a9e37bca13fdd3d7134e2"],["/syntax_and_semantics/as_a_suffix.html","ecdf5865b1820436a649d436c97a967c"],["/syntax_and_semantics/as_an_expression.html","4afe5887fc5b49c8747dfecd85078b30"],["/syntax_and_semantics/as_question.html","e2b039dbf81e48f14b36d7825d1f9b00"],["/syntax_and_semantics/assignment.html","0759c11e01d1cd1be1112f8a190a6cd0"],["/syntax_and_semantics/block_forwarding.html","4b12860cfe75053f16d8dbac466c29e2"],["/syntax_and_semantics/blocks_and_procs.html","6faeeb9194a8c015135b67ce4fb8fa64"],["/syntax_and_semantics/break.html","641fcc11a2439f1b906c611ed17c8c20"],["/syntax_and_semantics/c_bindings/alias.html","6ea5a7aaf22c815175117ad4dcdba133"],["/syntax_and_semantics/c_bindings/callbacks.html","5d495f6a5451afcf3f9eff6794db0bb3"],["/syntax_and_semantics/c_bindings/constants.html","1243e76ef04d672159ccd47f65de6b2a"],["/syntax_and_semantics/c_bindings/enum.html","0e36f8376b2906fcaca57af70f1a1546"],["/syntax_and_semantics/c_bindings/fun.html","d042af8444a1c36da01da1046095f9be"],["/syntax_and_semantics/c_bindings/index.html","150116fdba4439a104b4c1daa9d4b036"],["/syntax_and_semantics/c_bindings/lib.html","5d4bf1ded112fd62ac0e9cbd2b7e095f"],["/syntax_and_semantics/c_bindings/out.html","b26b14af1afee24b3fd85861609b3991"],["/syntax_and_semantics/c_bindings/struct.html","a211daa9417749395afb4d6fae7633e1"],["/syntax_and_semantics/c_bindings/to_unsafe.html","2586c32525ca9f01b7a44f022b944479"],["/syntax_and_semantics/c_bindings/type.html","08bdf93f56552ec2c11ec76c5e654df3"],["/syntax_and_semantics/c_bindings/union.html","1e6adf27f4bde50500345b05768dae72"],["/syntax_and_semantics/c_bindings/variables.html","38b29499d3c3d3a1e66ab3f7a90088a2"],["/syntax_and_semantics/capturing_blocks.html","0270730362b838b6100a196c05d98b88"],["/syntax_and_semantics/case.html","2118057e1b38ac6e4e12bc4e0b53f775"],["/syntax_and_semantics/class_methods.html","444a1c3e65dbca37fc5b2e9e4e70a45d"],["/syntax_and_semantics/class_variables.html","fc902a9e7e7aa63bb79808586fc53512"],["/syntax_and_semantics/classes_and_methods.html","7892c563367e635c0293eb63a1836c6c"],["/syntax_and_semantics/closures.html","48d7bea93afb09f5515c3de64e4f0d0b"],["/syntax_and_semantics/comments.html","f6a218eff11aa45375a663d70606f206"],["/syntax_and_semantics/compile_time_flags.html","23f01ef6aa083b9accb4c3896dbbe743"],["/syntax_and_semantics/constants.html","bb69ec944b110265c1536ef1698600f4"],["/syntax_and_semantics/control_expressions.html","c388815d57925431935345027a9ac3d4"],["/syntax_and_semantics/cross-compilation.html","73ad2fc07964f29049b9756473402061"],["/syntax_and_semantics/declare_var.html","141d16ee3b00096035015f441814258d"],["/syntax_and_semantics/default_and_named_arguments.html","014fd6e419b991e21a7473eba69f3dcb"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","39a8e094b7f1bd3554ab467bd9dfd3fc"],["/syntax_and_semantics/enum.html","bb38622059563e0b32505c21e48852b4"],["/syntax_and_semantics/everything_is_an_object.html","cd62d34c5888101a99379d7db9a3d948"],["/syntax_and_semantics/exception_handling.html","b697ee45b34fd7c6cbb2dfef0d0e9885"],["/syntax_and_semantics/finalize.html","6f61b05b4a9662d75b9d800f4cb5eb7d"],["/syntax_and_semantics/generics.html","aad22fd4244d880e789ce93456e4714a"],["/syntax_and_semantics/if.html","956f0487821e4aa98ccbe257279215c0"],["/syntax_and_semantics/if_var.html","39eb347f33b0aa89f443ac6c217c783d"],["/syntax_and_semantics/if_var_nil.html","be0479e7f9e9d35c6e42353bc06912c4"],["/syntax_and_semantics/if_varis_a.html","bad573c58c187f386072f82669116d8f"],["/syntax_and_semantics/if_varresponds_to.html","5732d31b5ff60e9012962f8f02a83fbc"],["/syntax_and_semantics/index.html","0619679036d628f416ef9eb43c1bf21b"],["/syntax_and_semantics/inheritance.html","8ce84adadcf85f335009c8f03007a502"],["/syntax_and_semantics/instance_sizeof.html","7a74ea4ca460a7d3fc7d68f89f1ab3c2"],["/syntax_and_semantics/is_a.html","913b1838659482effb54a5faceea834c"],["/syntax_and_semantics/literals.html","29bfd5b2af58d2fe008c6844b462b497"],["/syntax_and_semantics/literals/array.html","d1419af995fd640720c3906adfee0d8c"],["/syntax_and_semantics/literals/bool.html","b5fcb6922cc790cf1fc59c23be2a9b94"],["/syntax_and_semantics/literals/char.html","5a4d3b81df5d9978a0dee2a0066a0bf7"],["/syntax_and_semantics/literals/command.html","30d3b82ef92c0d2ad90c48b030f747d0"],["/syntax_and_semantics/literals/floats.html","b0351bd948ce7180782379897cd55934"],["/syntax_and_semantics/literals/hash.html","91a263eee35bcae2530249817f2e1fb2"],["/syntax_and_semantics/literals/integers.html","a832b14e8bec6da837447b92ff48c8af"],["/syntax_and_semantics/literals/named_tuple.html","569839943a51b2e052d412e96e01154a"],["/syntax_and_semantics/literals/nil.html","7968b3998475426695b23b2461d2d0ef"],["/syntax_and_semantics/literals/proc.html","57f0dcfaec57ec716fda151ad211a5f2"],["/syntax_and_semantics/literals/range.html","e2001bc503ded4138847c2f0a1e615f9"],["/syntax_and_semantics/literals/regex.html","90b8503d1f828a845cc45d6006d8b40c"],["/syntax_and_semantics/literals/string.html","03122f8804680a63f1a078f8b7ae76a5"],["/syntax_and_semantics/literals/symbol.html","49a21428e91c0e3d7095a156f4393133"],["/syntax_and_semantics/literals/tuple.html","0e30b7016a3f540e855df86dc650e35d"],["/syntax_and_semantics/local_variables.html","0bbbb90532af859da94d778223b08220"],["/syntax_and_semantics/low_level_primitives.html","7848e0a878a26262f8d1451a07e3a3fb"],["/syntax_and_semantics/macros.html","73954aec6bb30652e983ce2c0060b93b"],["/syntax_and_semantics/macros/fresh_variables.html","4fff00d46dac37a4b26aead37920e51f"],["/syntax_and_semantics/macros/hooks.html","c96e501ffced6d088b5ed36e5a669c00"],["/syntax_and_semantics/macros/macro_methods.html","8f48a95a9555d2f7199c7b794aa9c1e8"],["/syntax_and_semantics/methods_and_instance_variables.html","209fe1db10007ea8196f2f0af9f352c4"],["/syntax_and_semantics/modules.html","a9a2cf8786119ed2ff6bc8967ee18ad5"],["/syntax_and_semantics/new,_initialize_and_allocate.html","edbd1f730ca268bee6e6ebc01cd197d5"],["/syntax_and_semantics/next.html","144029dda1a0a8769cb8dc696e1e7f73"],["/syntax_and_semantics/nil_question.html","707c3989c414552c42a737e75cefad3d"],["/syntax_and_semantics/not.html","c45639427764c40a7257e48ae5382379"],["/syntax_and_semantics/offsetof.html","72c4a7c81f05d8f893895d5854fa0ac0"],["/syntax_and_semantics/operators.html","ecf64d6ba4980565a1b7aace5e0c58a7"],["/syntax_and_semantics/or.html","d7a74ed5851aae89d5e945a8adf7567f"],["/syntax_and_semantics/overloading.html","2ac81cb6458ee02a1e596fc29645a703"],["/syntax_and_semantics/pointerof.html","072c8f2388db29f738531f0d996d12f8"],["/syntax_and_semantics/proc_literal.html","5e3bc6666342f91e880f1cce906ac9aa"],["/syntax_and_semantics/requiring_files.html","57719f4c78f4d0495d00f0f1dc95f74c"],["/syntax_and_semantics/responds_to.html","ddefe536d76b3c917404ab46fc6d17ba"],["/syntax_and_semantics/return_types.html","0e3af41dd146d0b32110064feb528996"],["/syntax_and_semantics/sizeof.html","82e5a3dd8aa4f972e19a62a38f8e3053"],["/syntax_and_semantics/splats_and_tuples.html","bca848c573d857fc80b4c1a06c047b6c"],["/syntax_and_semantics/structs.html","631f829a3c688f7edc62a41ce194d09b"],["/syntax_and_semantics/ternary_if.html","d273e4a9600e4b6a13c0f36a2824c60f"],["/syntax_and_semantics/the_program.html","6a73e4417e42292a4450bbef853f2890"],["/syntax_and_semantics/truthy_and_falsey_values.html","fbbdf34da2efa17a90676fa0716bb701"],["/syntax_and_semantics/type_grammar.html","c52d85a9d4c0d0ec3d8d9582d8a80675"],["/syntax_and_semantics/type_inference.html","03c144e7eb956f15a7345019e680c9db"],["/syntax_and_semantics/type_reflection.html","6f797119a45473c36e841ee06b90f3ba"],["/syntax_and_semantics/type_restrictions.html","2c924ff558373410eaf4e30e195c119d"],["/syntax_and_semantics/typeof.html","4911fc5a11756a27f70768aabdf0b0dc"],["/syntax_and_semantics/types_and_methods.html","63c9296ba403f185ea435b7dc5b2737a"],["/syntax_and_semantics/union_types.html","688cdbe2c71efef7d0105d952f40258f"],["/syntax_and_semantics/unless.html","24d8e5eeff59866aa4e632f09cc73fbd"],["/syntax_and_semantics/unsafe.html","72766141b18870fc379d5ff52b74b5e6"],["/syntax_and_semantics/until.html","e3c7a3a5d32e53d60b17609c7f867588"],["/syntax_and_semantics/virtual_and_abstract_types.html","af82eccf75ab636b92a0112f8fd1e7c0"],["/syntax_and_semantics/visibility.html","1d24c3e6a7aaee02d14e3dad3f6db407"],["/syntax_and_semantics/while.html","42211c59446821967cf2fb57f371989a"],["/the_shards_command/index.html","72510b56d7fc9a42ee75bd6ccdf5687b"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","c15b906ad9cb50e6312c40a099a0d575"]];
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







