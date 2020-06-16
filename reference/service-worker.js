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

var precacheConfig = [["/conventions/coding_style.html","ad4c3482da295b787c8c2b140f6a6082"],["/conventions/documenting_code.html","d16140af40caf2d3ab36721db98c0408"],["/conventions/index.html","253e4abaa4012868974fdb0cf64dd247"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","27da50c0a0530c8e2e1727ad7ba6c892"],["/database/connection_pool.html","96d579a7e4ee49492d3964307e390142"],["/database/index.html","fba50daf5e848642687733010f661ee0"],["/database/transactions.html","14983a99f34de96901f3040f363e2d7a"],["/getting_started/cli.html","0ad9352b8c93ae0081e57a68cab0b120"],["/getting_started/http_server.html","0b3f1af017a01dac91146fe278e6e58a"],["/getting_started/index.html","de826e61f154149d8db480267989f48e"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","ecb05b06c99406592a2d702d5ef5bf60"],["/guides/ci/travis.html","7069c1a1c6032c8e482e3512deb21a3f"],["/guides/concurrency.html","0f77ff425d308d1ed80eea5e80a3cf56"],["/guides/continuous_integration.html","864ef6899d2744236653c99c5873dda4"],["/guides/hosting/github.html","a0bdb33f12dcadf49e8917545003d6d7"],["/guides/hosting/gitlab.html","d1faa0d2295c77d20b5d453b8f6d7c4d"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","597b18878b5e06324dfba6261e7bc504"],["/guides/performance.html","95c211be00188815309adfc7ef2db528"],["/guides/testing.html","53ce8a274a9d6cf1881ef9e1a1ac2af3"],["/guides/writing_shards.html","f65ecf03c3f0fcbe3d1d88019dab55d1"],["/index.html","e37562d599a9a7c9421d76921a2706cd"],["/syntax_and_semantics/alias.html","11ac2efaed2d3e27743c154f09c53bc1"],["/syntax_and_semantics/and.html","5fb75aab82ce659c113b2060d7499069"],["/syntax_and_semantics/annotations.html","cb02c74630f8b522df27765567245fd1"],["/syntax_and_semantics/annotations/built_in_annotations.html","f7ce69eaaaacf25734e00f45123f5e35"],["/syntax_and_semantics/as.html","f377de2f11ae7c72fa30680ff8ab21c6"],["/syntax_and_semantics/as_a_suffix.html","24833e446073983a6237dae5f7ece14b"],["/syntax_and_semantics/as_an_expression.html","df6ad2cfada3a9457c3d4489c9704530"],["/syntax_and_semantics/as_question.html","82b123e7b4ab8e2648a2fc217ec77e74"],["/syntax_and_semantics/assignment.html","c42d7271a37ec0d34b0957e065274e4d"],["/syntax_and_semantics/block_forwarding.html","423d73a94ae3a09286c301f2af1c14e1"],["/syntax_and_semantics/blocks_and_procs.html","724d81aa82278a3a76804463b9bc1a3c"],["/syntax_and_semantics/break.html","45e628785857cbb32482ef1558a60065"],["/syntax_and_semantics/c_bindings/alias.html","43ca1ae955b7a0ec9aec752640a702b4"],["/syntax_and_semantics/c_bindings/callbacks.html","f50970413487a813219f4bfd6c8756cb"],["/syntax_and_semantics/c_bindings/constants.html","6d81e3522bae50c8261e31f822501c30"],["/syntax_and_semantics/c_bindings/enum.html","8a76a10e4698e77558dab8e985962cd0"],["/syntax_and_semantics/c_bindings/fun.html","cac45d2de9ede1b7c911a58f9e2273f3"],["/syntax_and_semantics/c_bindings/index.html","4aea410efb028fa7f470d6b29be31864"],["/syntax_and_semantics/c_bindings/lib.html","b45653fb897e5008c733a47d830f8c87"],["/syntax_and_semantics/c_bindings/out.html","3d71a8089693b8adecb851a352091677"],["/syntax_and_semantics/c_bindings/struct.html","a596fd575ef815273c85e7a0c6cdd9a2"],["/syntax_and_semantics/c_bindings/to_unsafe.html","e800661549fbd13f708106f805b12cc8"],["/syntax_and_semantics/c_bindings/type.html","2a9323c59d1471b2168f0ff571b1ae6a"],["/syntax_and_semantics/c_bindings/union.html","926f45fdd411d28da20556ce812d0b76"],["/syntax_and_semantics/c_bindings/variables.html","36d528cd6b59f5c7b8e1f14bf8417269"],["/syntax_and_semantics/capturing_blocks.html","fef3857c7abc625082a403c64542dc53"],["/syntax_and_semantics/case.html","5cd5c9378660db7e7683b5a5a5d9ac68"],["/syntax_and_semantics/class_methods.html","82dd918343ffe2cb1ce6ba958fc37bb0"],["/syntax_and_semantics/class_variables.html","a0d299eb123d86a394b64be6f25cd462"],["/syntax_and_semantics/classes_and_methods.html","5dead6bd8a5167a51b44f1b1f8ea6e41"],["/syntax_and_semantics/closures.html","aea710e8e0477ab5d7a57659768524a5"],["/syntax_and_semantics/comments.html","f8391432f8f6c6beaaae4f8c8c9df211"],["/syntax_and_semantics/compile_time_flags.html","934e146694c6b5f023ec97ad49c1d0d5"],["/syntax_and_semantics/constants.html","6e6f66426828492fdc1e411dd2df3701"],["/syntax_and_semantics/control_expressions.html","818e0356d7596e10c261e0c4722802d1"],["/syntax_and_semantics/cross-compilation.html","41ce53bc3b3d269a8682dd7636f1d196"],["/syntax_and_semantics/declare_var.html","24d80afc757bf6af717772aea356bd36"],["/syntax_and_semantics/default_and_named_arguments.html","d0e7be1e3b30688ed8336c3c226b66f7"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","ef885662dd2717d398c4aa7778e40525"],["/syntax_and_semantics/enum.html","755f15968785b8982bacf649256cec1f"],["/syntax_and_semantics/everything_is_an_object.html","821110a9687d0226b2086d61034a5f0c"],["/syntax_and_semantics/exception_handling.html","51d938affba3dc7d1e03b69699a520e0"],["/syntax_and_semantics/finalize.html","d6c0a34a40618282b54dadd9b2b84dd6"],["/syntax_and_semantics/generics.html","6b69078c311306dd23048078a9b20c36"],["/syntax_and_semantics/if.html","9ce4c0a09d3607b23010c0a9b600176b"],["/syntax_and_semantics/if_var.html","cffcd680a098225b44b1f4016e1ad823"],["/syntax_and_semantics/if_var_nil.html","12c62039220d2287f76ec25cb546e63e"],["/syntax_and_semantics/if_varis_a.html","0e8fa681529686e96580e5db6b8456cf"],["/syntax_and_semantics/if_varresponds_to.html","9e246efc1c5cda087e80dc9c150a8b87"],["/syntax_and_semantics/index.html","df0311f65419909cca1dbbd9d22f27f1"],["/syntax_and_semantics/inheritance.html","83498f900df7294856f370c9e9717e7f"],["/syntax_and_semantics/instance_sizeof.html","db00c0cf21b1caf30fc38db71bd275ab"],["/syntax_and_semantics/is_a.html","e6e717070194a6c6fa94b7603757018d"],["/syntax_and_semantics/literals.html","32e06156614d09abb594b656ea9c0c40"],["/syntax_and_semantics/literals/array.html","f8b85e0027874d926b8cc92dd4687451"],["/syntax_and_semantics/literals/bool.html","97d81cef880f9686b22847d79b963405"],["/syntax_and_semantics/literals/char.html","9b164ac5aeb9d5fb7e87b2a01166c6a4"],["/syntax_and_semantics/literals/command.html","7a7eb574005ffa0f12141a5dd82215ef"],["/syntax_and_semantics/literals/floats.html","04e1c36d01a85edf4403eede26065676"],["/syntax_and_semantics/literals/hash.html","95aca4fb08258d465155fccbcc639019"],["/syntax_and_semantics/literals/integers.html","6b78ac88b4e1d80d4ec26f9278b94364"],["/syntax_and_semantics/literals/named_tuple.html","4a68312d118d50749398c40da659bf05"],["/syntax_and_semantics/literals/nil.html","e8c630a58a5a42e332e1de4f4d469880"],["/syntax_and_semantics/literals/proc.html","a28ea21374c93787f35906f7bb96428d"],["/syntax_and_semantics/literals/range.html","d2a37ff6cf95b1795c90b99471d82b21"],["/syntax_and_semantics/literals/regex.html","18ee17b9bd2a60b992901944d31b2634"],["/syntax_and_semantics/literals/string.html","3e746839a978d60e3044a2e45d551e6a"],["/syntax_and_semantics/literals/symbol.html","a7dd4f89944ce81029c805efe56fb2b3"],["/syntax_and_semantics/literals/tuple.html","e991bc20639c0ca1090da5851423429d"],["/syntax_and_semantics/local_variables.html","6213a9f74c688d1ff9b92e1bbee3ae5c"],["/syntax_and_semantics/low_level_primitives.html","34794006828915fa2b59753d049c3046"],["/syntax_and_semantics/macros.html","88cd4fac1b7a8ac2dbc3e9f9cddc2da7"],["/syntax_and_semantics/macros/fresh_variables.html","4af101028ac9a40295d6fb608f72f1c2"],["/syntax_and_semantics/macros/hooks.html","2b16fdd95013c02d99832447335aa40e"],["/syntax_and_semantics/macros/macro_methods.html","6c1e9b602d51ef6a41f783afde922b61"],["/syntax_and_semantics/methods_and_instance_variables.html","30199e5077de5e3ae6a57f38632c7a85"],["/syntax_and_semantics/modules.html","24447fa1e69e66156d62bc18454c70f2"],["/syntax_and_semantics/new,_initialize_and_allocate.html","a40d4e56b60a00d1d644e11f1f1f6d36"],["/syntax_and_semantics/next.html","475aba8746539f661f57883b73c85ff3"],["/syntax_and_semantics/nil_question.html","116d2c7c3a7782a1ebc500a5eb22c683"],["/syntax_and_semantics/not.html","e9da2ea74a9b7ac7d7b36474f0d216e1"],["/syntax_and_semantics/offsetof.html","7751aee342e2eaba6d5a37435fb1ea56"],["/syntax_and_semantics/operators.html","9ed7ad5dbb23b16d48ac01887283dec7"],["/syntax_and_semantics/or.html","f7b62538700d9588fc765d9361c18f5c"],["/syntax_and_semantics/overloading.html","1c4262f6f3a4fae50d6b670bfa4f2443"],["/syntax_and_semantics/pointerof.html","ccf862bfc09a5f273893c58777815082"],["/syntax_and_semantics/proc_literal.html","e292dbef267ad961550d925f128c4593"],["/syntax_and_semantics/requiring_files.html","4bd23eeec942132e3338fe1708043c81"],["/syntax_and_semantics/responds_to.html","a8f214a0e26f93faff5152b2562d3170"],["/syntax_and_semantics/return_types.html","0637e64afd83bc601578aaf061462cc5"],["/syntax_and_semantics/sizeof.html","737a2de137731e750fddf49e6ecadd04"],["/syntax_and_semantics/splats_and_tuples.html","d0dfd239f766ae20a23a2ccaf8a63ea7"],["/syntax_and_semantics/structs.html","9ee5e3fc9acb606f288cf46d6c817e4d"],["/syntax_and_semantics/ternary_if.html","57004696d50fb2865bbe704b419b77ea"],["/syntax_and_semantics/the_program.html","675fd6984766be3a1858e274f65bb589"],["/syntax_and_semantics/truthy_and_falsey_values.html","6dc5ba9d7e51b9925d53199799211d71"],["/syntax_and_semantics/type_grammar.html","ab35edc4f55093bb86cdd6cb35af1f45"],["/syntax_and_semantics/type_inference.html","fb0129c394b1041c5c850d3c11c26259"],["/syntax_and_semantics/type_reflection.html","89057169e1b633be2c840c69330a125e"],["/syntax_and_semantics/type_restrictions.html","dd73ae25ea0868e96fd914df54094ed2"],["/syntax_and_semantics/typeof.html","39fabdb2d19c1024b8195518c4dddd9d"],["/syntax_and_semantics/types_and_methods.html","79ba63487cc29bc0e0d64def011d4b8d"],["/syntax_and_semantics/union_types.html","124675fa7d00af53c82b9843cd0bed6a"],["/syntax_and_semantics/unless.html","2981a3426232ab34258b86d80ca6031d"],["/syntax_and_semantics/unsafe.html","36df58b25a3eb20797db04fdea2934c0"],["/syntax_and_semantics/until.html","0d6a4508f4e8de2cf8bfe27001d55cfc"],["/syntax_and_semantics/virtual_and_abstract_types.html","a427a33f934d3c9ecb01941ec7a0e259"],["/syntax_and_semantics/visibility.html","0d91bf64a9555a498c17e8b01f86844c"],["/syntax_and_semantics/while.html","55bd1047e401285bd97a7230865e71f5"],["/the_shards_command/index.html","4a2e256d1dd14f953cb52e5201c225ed"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","6d873acdc6f4aec8819a5e4a37698970"]];
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







