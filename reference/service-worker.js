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

var precacheConfig = [["/conventions/coding_style.html","6eb8990c6639c2d896ee6bc16bf7e151"],["/conventions/documenting_code.html","8126a42117a727a9b6b5c02c6111fa61"],["/conventions/index.html","ce3b05e1b53340eeb2e5496df9eead88"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","fde94112466a29a632b92207d0d5e72c"],["/database/connection_pool.html","3f424d087045e89057052ffb72402eab"],["/database/index.html","7956124b7745ea4c30bc86d1ac07235d"],["/database/transactions.html","d79a6324ab3871b7ac8b4f7ba52af83c"],["/getting_started/cli.html","5b493a542e0be7f8484a5d7444086d0c"],["/getting_started/http_server.html","01a98ea18169b095d366cef43315276a"],["/getting_started/index.html","a1bcc04a79a9b3618dbcd7e308c1da9a"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","68cb296c113cd017ef55d664dc26b52c"],["/guides/ci/travis.html","0377e8c2dd7d2e98e6d120e3eb692770"],["/guides/concurrency.html","eb73df14e7ae729873f5e8d55af63272"],["/guides/continuous_integration.html","4a6d262b7d7d133f042f3904268a3e7f"],["/guides/hosting/github.html","1ea8746fc47866904e53e8863a1b94e4"],["/guides/hosting/gitlab.html","b0fd8c193cb43332df7d1d83d707a6ad"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","41473806023ef964b1e4fafe1fae8a9e"],["/guides/performance.html","7098f61dc3f46a70ab54c81e804aa042"],["/guides/testing.html","ae4ad72af964534a55561be9534910d6"],["/guides/writing_shards.html","fa6c5c6061e07ecc2199fded34bb48db"],["/index.html","45650251b5a8644a5c0a4976531f5c9d"],["/syntax_and_semantics/alias.html","a1a818b9d8afa72d1b88e2add0d5dde6"],["/syntax_and_semantics/and.html","5cd8151e9511f150c213d9c643b7bb9b"],["/syntax_and_semantics/annotations.html","2021419decfb117d8c281cb6ec2251d2"],["/syntax_and_semantics/annotations/built_in_annotations.html","4b9cdd5650dc62fce6d9b77c8ca62c5f"],["/syntax_and_semantics/as.html","13381b609823842f2cf2e274c5e27584"],["/syntax_and_semantics/as_a_suffix.html","90152392113c6769b9fc2cbc18536038"],["/syntax_and_semantics/as_an_expression.html","83c381de64d8832b102041fa791f9cec"],["/syntax_and_semantics/as_question.html","69d07db82e69541e994879605182d7b6"],["/syntax_and_semantics/assignment.html","8d09e89e8632dd0f266f83449b3d4854"],["/syntax_and_semantics/block_forwarding.html","e9cfbed2eceeb06722dd955b809b785d"],["/syntax_and_semantics/blocks_and_procs.html","adaa417bc35b26b6fb4821c525436122"],["/syntax_and_semantics/break.html","01facbdb4a1115282a62e68a574de9ad"],["/syntax_and_semantics/c_bindings/alias.html","7d0ed26dce47b3b25b7277d578d758d7"],["/syntax_and_semantics/c_bindings/callbacks.html","fe331bb54ac66dd61d174c47eff4f2a3"],["/syntax_and_semantics/c_bindings/constants.html","650a8ddb487151bc3918b91a5fd0c8c9"],["/syntax_and_semantics/c_bindings/enum.html","2de3bc07f449a9ead6cc94e25359294d"],["/syntax_and_semantics/c_bindings/fun.html","95b5e72daf49067f1ea9ee7a14041336"],["/syntax_and_semantics/c_bindings/index.html","b1084c27a7d63ea02a962b36e9f2be3c"],["/syntax_and_semantics/c_bindings/lib.html","3c88ad1cba6f0dc8a4f59a62402a4524"],["/syntax_and_semantics/c_bindings/out.html","3cc566c1292a3cbdc6b94d4079172df6"],["/syntax_and_semantics/c_bindings/struct.html","810add532039a1eb623e37bb1795e6fe"],["/syntax_and_semantics/c_bindings/to_unsafe.html","e3c27ee0ea24b8f8491021be79875aa3"],["/syntax_and_semantics/c_bindings/type.html","823994253910ce1c30adb5438129c4be"],["/syntax_and_semantics/c_bindings/union.html","6657d4e68b2dacec3f80c0b46380f160"],["/syntax_and_semantics/c_bindings/variables.html","9024dfc944aac1d6291db73719fb2141"],["/syntax_and_semantics/capturing_blocks.html","4a8f492a61dd94bc923f0b26beef7afa"],["/syntax_and_semantics/case.html","55f463bb4bb7b173cf069016e6ada765"],["/syntax_and_semantics/class_methods.html","5999ca9dd176446e300ac5e261c04daf"],["/syntax_and_semantics/class_variables.html","c470bd5d5263283c93de871371975d0f"],["/syntax_and_semantics/classes_and_methods.html","1623ec68aa32afebf8cdff0669c4375c"],["/syntax_and_semantics/closures.html","f1f6137cafd875a80b015f3a93c112ee"],["/syntax_and_semantics/comments.html","b8ae099a5b8673d6bb2f6ed8b8a5b120"],["/syntax_and_semantics/compile_time_flags.html","20fb8c87786328f7e1736b0f324718ed"],["/syntax_and_semantics/constants.html","83af94a322ebfcef20d7cbcfe2cd91be"],["/syntax_and_semantics/control_expressions.html","1211f28d57ea186b561943e2197c631b"],["/syntax_and_semantics/cross-compilation.html","1b5b545b205d1bdad19dfba23dd16d94"],["/syntax_and_semantics/declare_var.html","f1c0bb1cb9a9b50d754500bb4c9f3c3e"],["/syntax_and_semantics/default_and_named_arguments.html","860fc28505602652df5eb8b8986974d3"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","31b9d6c224c679b93e2fddecaa2d0766"],["/syntax_and_semantics/enum.html","584ca9d30fe104a9eff4efb46d4ef55d"],["/syntax_and_semantics/everything_is_an_object.html","6c10fe2e1c1d2f7722f270b5144bf339"],["/syntax_and_semantics/exception_handling.html","86b87bc92b2de8602b95e02429443066"],["/syntax_and_semantics/finalize.html","a62edf7486129ab069fba5ead8bba398"],["/syntax_and_semantics/generics.html","2e8a6f8bfab2bab00166f683e1e137e6"],["/syntax_and_semantics/if.html","b7fcdd2e06e572062f722871b7d7540e"],["/syntax_and_semantics/if_var.html","a036d171fd2310592d61f1775444c76d"],["/syntax_and_semantics/if_var_nil.html","15298de18d0e1badc618efa8ba5d7a35"],["/syntax_and_semantics/if_varis_a.html","565f8aee33336a48b34f9ab7e8d566ee"],["/syntax_and_semantics/if_varresponds_to.html","42fd78a4b99f274b4c4bc60c35b68689"],["/syntax_and_semantics/index.html","286c9df25e418d6115c62992bdd88d76"],["/syntax_and_semantics/inheritance.html","80d962e1c510713b542f32b165aae625"],["/syntax_and_semantics/instance_sizeof.html","a7bab4de0893a1500818263af4d4a84d"],["/syntax_and_semantics/is_a.html","075149af0df3eb56b2dfeb448698c8b0"],["/syntax_and_semantics/literals.html","558ea2a69ac3eb8a3f7d2f2c7451d859"],["/syntax_and_semantics/literals/array.html","a45a4c50bcbc3852c5aeb1755a166c79"],["/syntax_and_semantics/literals/bool.html","4b87893cb0633d95b1eba0c974bed4a0"],["/syntax_and_semantics/literals/char.html","37a5f164b5af58fb7b0ec74870e45ee6"],["/syntax_and_semantics/literals/command.html","9107045add879a078fd3e09a194405c3"],["/syntax_and_semantics/literals/floats.html","6d3e0b8e0d5f26002200e761997cdd3b"],["/syntax_and_semantics/literals/hash.html","e4109d28cdbf9abf6eb40f4dfbc9bef5"],["/syntax_and_semantics/literals/integers.html","b76746ee2c83a0e6236c084b84b24451"],["/syntax_and_semantics/literals/named_tuple.html","0978d64a0561c57f1b621b1a24ded949"],["/syntax_and_semantics/literals/nil.html","9ff7ec9ba626a09c1fdcc744b81c40fe"],["/syntax_and_semantics/literals/proc.html","3d4a775feb544363cca66e0297a33e85"],["/syntax_and_semantics/literals/range.html","63d463978c31b3b9ef23d77d59009e3c"],["/syntax_and_semantics/literals/regex.html","9b276d91980f75e31379ffa13a536d6f"],["/syntax_and_semantics/literals/string.html","2f992ef2218c2f8b1936c559aa26f491"],["/syntax_and_semantics/literals/symbol.html","96234d8861736e52ba205d66a1e7dbd2"],["/syntax_and_semantics/literals/tuple.html","8a3d5215710e195f6c2dd971018cbf2f"],["/syntax_and_semantics/local_variables.html","e800d5e2b767b6b85452eded63119696"],["/syntax_and_semantics/low_level_primitives.html","664104d0248754a479dd3cf1655278ee"],["/syntax_and_semantics/macros.html","9296b3dc9606fe993985a65e586a1fcd"],["/syntax_and_semantics/macros/fresh_variables.html","8897817118ba4f9d90bc18f9040091a3"],["/syntax_and_semantics/macros/hooks.html","fc6de41412a68dcf7cfac542e09c13e2"],["/syntax_and_semantics/macros/macro_methods.html","b1fb8000f38941fa2b2411585ad0509e"],["/syntax_and_semantics/methods_and_instance_variables.html","3237e9bc37e85be139c90d65a0ffd9a8"],["/syntax_and_semantics/modules.html","0ef8c3c359b154090785bd3a012e8588"],["/syntax_and_semantics/new,_initialize_and_allocate.html","5c536b92e8eecd7f80f45efd58436b57"],["/syntax_and_semantics/next.html","48437c3b1657ba0425780452e9665fda"],["/syntax_and_semantics/nil_question.html","7320639a86bb4d339a53624aef95d02d"],["/syntax_and_semantics/not.html","f7440271008f434cf9a3bda29a16d2f8"],["/syntax_and_semantics/offsetof.html","e9ef094870eab85a159e09341dc52ffd"],["/syntax_and_semantics/operators.html","9b81ca16bd98a4b26bf093962a0f7b07"],["/syntax_and_semantics/or.html","d49c6926383012778dc20b0bb6f7998b"],["/syntax_and_semantics/overloading.html","cf62fe4eb46315d2e0f8a4d6cb23a0ed"],["/syntax_and_semantics/pointerof.html","64e0177de81710b743f8da2e13c005db"],["/syntax_and_semantics/proc_literal.html","9fc72fac639e02d806ed3f04fd2cb144"],["/syntax_and_semantics/requiring_files.html","fb2ef5850ed031ac839b47d152668627"],["/syntax_and_semantics/responds_to.html","8360cedf149a0b9960ad6dc852800122"],["/syntax_and_semantics/return_types.html","58e8053fcade097e25812b6780ed60b2"],["/syntax_and_semantics/sizeof.html","965ff2c239f08c0e8a2a377e8ed6c296"],["/syntax_and_semantics/splats_and_tuples.html","7ab1602e8fce74591f7edc7b2934f081"],["/syntax_and_semantics/structs.html","86be82c4dd675b6c66ab99583e8b5e33"],["/syntax_and_semantics/ternary_if.html","61b01b385fbed22b6307f467908b3392"],["/syntax_and_semantics/the_program.html","7897324ed92c8dcb030d1d0d6e4ff137"],["/syntax_and_semantics/truthy_and_falsey_values.html","d4d533cb7d2bb9b0ff13bdc13bd988ad"],["/syntax_and_semantics/type_grammar.html","a4e6a147e8dd6525899de63b7c403388"],["/syntax_and_semantics/type_inference.html","286e164745cec0c074ffef684ad681d1"],["/syntax_and_semantics/type_reflection.html","b1081d1c66e9701235303e9d77edb8ca"],["/syntax_and_semantics/type_restrictions.html","cce4fb93fd7bc5ab8784604a34c74bf0"],["/syntax_and_semantics/typeof.html","fe7169b9e17ab2772ba876211815b8aa"],["/syntax_and_semantics/types_and_methods.html","c53947de274bb34bec3b66e81b5b9022"],["/syntax_and_semantics/union_types.html","0eff65c7d9d66d3485e7d50e44149581"],["/syntax_and_semantics/unless.html","9490f3b44ef69c5bea514f5ca257b605"],["/syntax_and_semantics/unsafe.html","172c145a4e46e8795034f325e322a947"],["/syntax_and_semantics/until.html","fc2d229466f8255153445273b7f6e1bd"],["/syntax_and_semantics/virtual_and_abstract_types.html","9badb6835b5507fa6ab254cbfb5625c8"],["/syntax_and_semantics/visibility.html","5aa8dbdd80b49cbd9a638a4211e49e04"],["/syntax_and_semantics/while.html","a5bd7251f341ffcb178c7ed5f7e8c752"],["/the_shards_command/index.html","56ff76f50df3eba3273b5b5b2f159bfc"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","77ec231aed6fe611fcc962d3c5be8306"]];
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







