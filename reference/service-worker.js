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

var precacheConfig = [["/conventions/coding_style.html","674ec9fa487a755090c355444e53fe65"],["/conventions/documenting_code.html","8ce2f31d7a68c1bc9eb4bbe9c719c883"],["/conventions/index.html","54aff62cd72f478051623b51bbe4d0d6"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","7e0a6cc147a03e80460953378fc92f30"],["/database/connection_pool.html","c64756f00c4e9f03ff211901289e7e3f"],["/database/index.html","c4d3a8a207cc5b1d53524f9a84e7f323"],["/database/transactions.html","fe4415e96977b9a87be456e3023877d9"],["/getting_started/cli.html","0ce99514945b36e0cb0907ecd6ee1132"],["/getting_started/http_server.html","794ef8c8a27d91ae85b8513ef46c5be0"],["/getting_started/index.html","f4598bb25426d01fe5925e58e7b71901"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","b9e68de3c62290b73f0b94f76a41777c"],["/guides/ci/travis.html","83209a83d491e4dc4cb820d2fff76b23"],["/guides/concurrency.html","afe80b52c289cfd62e8b046ad5973863"],["/guides/continuous_integration.html","7178786712c48d0a4f78a282aa9a6156"],["/guides/hosting/github.html","7a4c6528c7d2f19dc3cb4b509e8cfded"],["/guides/hosting/gitlab.html","581a6bceb233d7f3cbbab3ac9edc7b0d"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","64cf92893b6de3939bd39200f2df2cfc"],["/guides/performance.html","e49be208bf9aa4a0ee1563c9517ae568"],["/guides/testing.html","7fdbfdcdc1a4ecb80ac444be4cca7121"],["/guides/writing_shards.html","8d092e2c1fd388a6b105e926ab9c69f7"],["/index.html","9aa14cb1883e7edbc878b0f2b97334eb"],["/syntax_and_semantics/alias.html","0ae5eaeacd24ca24041a64ef27033133"],["/syntax_and_semantics/and.html","acd8e47e1bd323725394eb4e472833fe"],["/syntax_and_semantics/annotations.html","1cc3b02775394f593d1d7a6cfa04e862"],["/syntax_and_semantics/annotations/built_in_annotations.html","56e70134af18128c82e36a1475842e20"],["/syntax_and_semantics/as.html","c06d3c1c8759d6bfa4a29512c093ecab"],["/syntax_and_semantics/as_a_suffix.html","794c228a4ed07c1c3303919d87080c7f"],["/syntax_and_semantics/as_an_expression.html","c0df5daaa028c240983af1e26b631d48"],["/syntax_and_semantics/as_question.html","2df4bfbe486f80d5db748c85c4248cf4"],["/syntax_and_semantics/assignment.html","d2669dccd00ac729377d0fc95d106a50"],["/syntax_and_semantics/block_forwarding.html","8e2eb95e41b9d339a8121f442f62c5e4"],["/syntax_and_semantics/blocks_and_procs.html","8ce113ab839a152dbb2ae9a8a5abab64"],["/syntax_and_semantics/break.html","2799ff5b65bf7f5360d20ad19541fad3"],["/syntax_and_semantics/c_bindings/alias.html","8042a62b149e703e39b0dbec4ac85a02"],["/syntax_and_semantics/c_bindings/callbacks.html","839854cd3d39bc54d987d40a208d101d"],["/syntax_and_semantics/c_bindings/constants.html","5d65c0a20d238e8e6ceba2ad62c6e25c"],["/syntax_and_semantics/c_bindings/enum.html","c4ac36285a4356c6d868bd6d5d79e1d2"],["/syntax_and_semantics/c_bindings/fun.html","2d0fa6fe98015fe634e62734da2f8b71"],["/syntax_and_semantics/c_bindings/index.html","9f6b846a9cf7d3b29678e6627a7df504"],["/syntax_and_semantics/c_bindings/lib.html","268112d7070863c9625f559e7295d8c0"],["/syntax_and_semantics/c_bindings/out.html","5e380a8a65f41d73eadfe01e1d59bbe7"],["/syntax_and_semantics/c_bindings/struct.html","54050ab705068e1bf43110b175cea117"],["/syntax_and_semantics/c_bindings/to_unsafe.html","50425bb41cdb1dacc1bcd9bf9ead0e5e"],["/syntax_and_semantics/c_bindings/type.html","bf7fe4be4d2c8bc1a41466aa8a0aa4dc"],["/syntax_and_semantics/c_bindings/union.html","aa82955efc96c22da5dad3bc6a2e6e69"],["/syntax_and_semantics/c_bindings/variables.html","e9c7825f2e00bbc8e5296d99069dc132"],["/syntax_and_semantics/capturing_blocks.html","596665c0ff726760bff0d80ce7fce326"],["/syntax_and_semantics/case.html","3eeab5944c229d524ddd38b8166fa905"],["/syntax_and_semantics/class_methods.html","7bef6e8e5ffe17459651454047004e2e"],["/syntax_and_semantics/class_variables.html","c4a01d429a8148a69fd16c2f6c1c2984"],["/syntax_and_semantics/classes_and_methods.html","4c72a7e4bac8162d97b93eaef67a6507"],["/syntax_and_semantics/closures.html","50ee25082608a9ff6e4246dece4796c8"],["/syntax_and_semantics/comments.html","123cedd053bb99db0e0df8bd77374d44"],["/syntax_and_semantics/compile_time_flags.html","8ce0e49878825c900ecbe01e3425c71f"],["/syntax_and_semantics/constants.html","41e132b774a50396bd4321ed3db5a7c8"],["/syntax_and_semantics/control_expressions.html","63e569447ef2de9162d5159f9410cc3d"],["/syntax_and_semantics/cross-compilation.html","51e87e66ebbc5e28fd5c8983258c4d3f"],["/syntax_and_semantics/declare_var.html","87ea98c0e61b817c65a5fbeee658298c"],["/syntax_and_semantics/default_and_named_arguments.html","062f235c1464992334d9714ecbde6090"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","03868f5c64362415575f405a0093eb56"],["/syntax_and_semantics/enum.html","49337a3cdfc708d6e585b3a9a7420df9"],["/syntax_and_semantics/everything_is_an_object.html","1444b666ccf94e470eebf0592cd9e050"],["/syntax_and_semantics/exception_handling.html","47a3d8b20e874656e9f2f3f15b3da259"],["/syntax_and_semantics/finalize.html","80731d07fffcbc134b910bef6eb8b103"],["/syntax_and_semantics/generics.html","a52bbbe7b0e2e2bfcaadcc9c0fb1e545"],["/syntax_and_semantics/if.html","a5226c82c41093afaba9e1346f79a358"],["/syntax_and_semantics/if_var.html","7a047f87ee3ecd371f841c43c66b7772"],["/syntax_and_semantics/if_var_nil.html","6cb12e355c70a24315f3245ff5c8cd6f"],["/syntax_and_semantics/if_varis_a.html","bc3e18a96d74b7d040ad6617bd11e04f"],["/syntax_and_semantics/if_varresponds_to.html","9a1fdf2a50fbf9f4bd63b592819b07a2"],["/syntax_and_semantics/index.html","8395579c709e5b1d769f472da9f9498a"],["/syntax_and_semantics/inheritance.html","9a7f52bd9bc968945052c967f2ed937c"],["/syntax_and_semantics/instance_sizeof.html","825735b79b44528163f58f0d52e4a3e3"],["/syntax_and_semantics/is_a.html","0f4a35f4596fe069106a5b3a60b53799"],["/syntax_and_semantics/literals.html","98f61fe5b588b410de71c1a0df6d20e2"],["/syntax_and_semantics/literals/array.html","5c9fd3ecba13d06c1755efb1830c7c7c"],["/syntax_and_semantics/literals/bool.html","41816e7c2a728f4455036177041dfa4a"],["/syntax_and_semantics/literals/char.html","c43410b86dae0fbe43743068ca557ebf"],["/syntax_and_semantics/literals/command.html","592652d79c2d5505a1441a1889a5f072"],["/syntax_and_semantics/literals/floats.html","242ea294d763a79ee48560d500462caa"],["/syntax_and_semantics/literals/hash.html","a9dd253bf5b0cffc51d9e016d7244514"],["/syntax_and_semantics/literals/integers.html","cac7f6625933cd011efa4ce596bd5dab"],["/syntax_and_semantics/literals/named_tuple.html","d24b4ddb4f600ef84a421980d7aeccfe"],["/syntax_and_semantics/literals/nil.html","1a8b4364f501782ffc2c39e3f8ba8834"],["/syntax_and_semantics/literals/proc.html","bc84b3a4f5b7b1b2923e3de07a8a0de7"],["/syntax_and_semantics/literals/range.html","ec1df14d1f13c4bacbb7d7a9e76849be"],["/syntax_and_semantics/literals/regex.html","2dfa25175b89c5cec71b5296e3934cc6"],["/syntax_and_semantics/literals/string.html","5a269c3476b3ba0775e3164dd014e294"],["/syntax_and_semantics/literals/symbol.html","962b35b50ef1968a90ae1356030914f4"],["/syntax_and_semantics/literals/tuple.html","1dab0ed91165b0ed7f6e8cdb84f7df6c"],["/syntax_and_semantics/local_variables.html","c685fd666a8166ed6e0ebcafec2f8bdc"],["/syntax_and_semantics/low_level_primitives.html","04775aed0e825da8d98e8d592118a2bd"],["/syntax_and_semantics/macros.html","6d9254e6cc05192c5ea4645ca6c5aecb"],["/syntax_and_semantics/macros/fresh_variables.html","229da293d33a8662539f355bcef62ac8"],["/syntax_and_semantics/macros/hooks.html","bbedfb4fada416cbc61d337092923537"],["/syntax_and_semantics/macros/macro_methods.html","e69ff8b9910cc0d779826ee43f8d38f3"],["/syntax_and_semantics/methods_and_instance_variables.html","b0b4f7c04cce8c54d6231c72c7632c16"],["/syntax_and_semantics/modules.html","40261fd798b9e1a4aea776b612f46d81"],["/syntax_and_semantics/new,_initialize_and_allocate.html","696b139ba9142597a2894ce1e8560789"],["/syntax_and_semantics/next.html","f70f08203184facfe23ac5e37383eae4"],["/syntax_and_semantics/nil_question.html","3579c8c8e97bd46033bf398e5a17f0d4"],["/syntax_and_semantics/not.html","8c7a9f0722fec789d7bf6ff7836e6a50"],["/syntax_and_semantics/offsetof.html","842c7919254988d84b7c167d10fceacc"],["/syntax_and_semantics/operators.html","a4a40c6a5c0421a14038a785e0759a6a"],["/syntax_and_semantics/or.html","9ca16ffd9f9442c537a5cfdddc526825"],["/syntax_and_semantics/overloading.html","66eb7bf6f26a3681af93993a7057dbff"],["/syntax_and_semantics/pointerof.html","811c6815fe832ed45fa4f9e78d702b8a"],["/syntax_and_semantics/proc_literal.html","df6d752a1767c9c5ef6d3b279248cadf"],["/syntax_and_semantics/requiring_files.html","b8825a57fe0b85fbd50145396174c281"],["/syntax_and_semantics/responds_to.html","4464afa4c089ecd35d85ac0816dec53f"],["/syntax_and_semantics/return_types.html","90f0ce0b130a61af17d9454ba2448b9a"],["/syntax_and_semantics/sizeof.html","d7ad47e326c9f1b3d85203677f9be2d1"],["/syntax_and_semantics/splats_and_tuples.html","95bbc59e4120115a2436f7054e5da232"],["/syntax_and_semantics/structs.html","3f647cd81205603a8396d2908e21c99e"],["/syntax_and_semantics/ternary_if.html","9ead49948b1af844e80162afc83ec025"],["/syntax_and_semantics/the_program.html","f4fbfa579da75062a7efd4d1997ec823"],["/syntax_and_semantics/truthy_and_falsey_values.html","8e9c0beb4536babc9d30f6b969b2a02a"],["/syntax_and_semantics/type_grammar.html","5f2a1bde5fb19ffdb556d1472cd236bb"],["/syntax_and_semantics/type_inference.html","349966e280a924e30fc39ca8561f46a3"],["/syntax_and_semantics/type_reflection.html","35f476ed81cd69c1fdf3079a05bdba2b"],["/syntax_and_semantics/type_restrictions.html","6991269db70772b9a2ee538d850044a1"],["/syntax_and_semantics/typeof.html","aed917e1b9b57d2893c2360d6fae751c"],["/syntax_and_semantics/types_and_methods.html","4b20b3da0b6dc0013bfde76041caf07c"],["/syntax_and_semantics/union_types.html","9c2fa4ba50ec6f31fad59ed5b3f026e8"],["/syntax_and_semantics/unless.html","9ceff14f23306f7c2a993ada813c97cb"],["/syntax_and_semantics/unsafe.html","99d6a3ec4bff9f55f12a596ef4364012"],["/syntax_and_semantics/until.html","1faa0f116786fc35ee443e3914be8985"],["/syntax_and_semantics/virtual_and_abstract_types.html","5db79f74e25b1384a55b69aee39d708d"],["/syntax_and_semantics/visibility.html","200549ae2aa54ddf00d2f477c37f1fad"],["/syntax_and_semantics/while.html","fbcdff138753e087ceb3e1ad451c4774"],["/the_shards_command/index.html","e6165ced182d1f49a571b07f3975dd44"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","5a97deefc2c75066e4d9237b5440b48e"]];
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







