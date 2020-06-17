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

var precacheConfig = [["/conventions/coding_style.html","899f1e8abd5715b881c761cf8469d0fd"],["/conventions/documenting_code.html","fec14df9055e797a3a6344e7934d5f6a"],["/conventions/index.html","06759bc99965674ee891920b89f9ceba"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","fd8b5eed6d79d858ed10e84b4c14f33d"],["/database/connection_pool.html","85d795621f4fdabeaa82690f8fd0d8c1"],["/database/index.html","50b86bd53c86e307f6c088bdfd1fed1a"],["/database/transactions.html","d8c9d2afe398f9a893c5669fd40d74e5"],["/getting_started/cli.html","5b202ecbaee535fd8f0e94d5fd333f18"],["/getting_started/http_server.html","c0420281daccf51fa36f5b9db52f9b84"],["/getting_started/index.html","28b769b753e121498bd49780984c6f2a"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","c0b838b4cf8f0b2cb676af91c5adde4c"],["/guides/ci/travis.html","88dd46ebd4b69e492232a40c9a3ad083"],["/guides/concurrency.html","4d5c08cd778d301ca01c9f67193c3d97"],["/guides/continuous_integration.html","0a0a5c8a89e744cdfc20c33b3105178a"],["/guides/hosting/github.html","3c80faf7de997684a447d3a81e75227e"],["/guides/hosting/gitlab.html","f8b32a167d47772d1491a17bed98b581"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","7736211829bfa39dc4d1bc3475270d36"],["/guides/performance.html","a719fab47c56d8b5d10f47f93095f5aa"],["/guides/testing.html","7c3275bef235c92b3ddd03548b416d32"],["/guides/writing_shards.html","084d9a6d4af42a945b38b88ea5677d14"],["/index.html","c5cd3c9d53efeea0420fc0c24fdf2c1d"],["/syntax_and_semantics/alias.html","3c64b609dae3153e22a07e8a89f9f324"],["/syntax_and_semantics/and.html","4b53e18c4e2234ae1e16af9cbc608f86"],["/syntax_and_semantics/annotations.html","85e9703b33d9c7a8ce80d3a1718e82b7"],["/syntax_and_semantics/annotations/built_in_annotations.html","423bba349f09389c4806f1e352341876"],["/syntax_and_semantics/as.html","d07d5c2949086d4df18bc24b293dba16"],["/syntax_and_semantics/as_a_suffix.html","c317ec0ac4396cf5531ca870861f860e"],["/syntax_and_semantics/as_an_expression.html","ed3c0ea77d797d285ce66be072f765b1"],["/syntax_and_semantics/as_question.html","e50233420aa73e48ead08274bc0a1a20"],["/syntax_and_semantics/assignment.html","db03878739bab0f11f9598735b6a26b1"],["/syntax_and_semantics/block_forwarding.html","c0bc2e021f275ca6bb1cf5c70a47a5fc"],["/syntax_and_semantics/blocks_and_procs.html","d660428e503434f3d00bdbf55a15a0e4"],["/syntax_and_semantics/break.html","a324be1457ed663d90686695a4a88aec"],["/syntax_and_semantics/c_bindings/alias.html","e952a32bac68f23c1807eb5625598219"],["/syntax_and_semantics/c_bindings/callbacks.html","cb261e72ecc469af30a1a0738e2feb84"],["/syntax_and_semantics/c_bindings/constants.html","0cc055cbf7af830561825668535a373b"],["/syntax_and_semantics/c_bindings/enum.html","80bc516d2b8b9ee89eac0af610c383cc"],["/syntax_and_semantics/c_bindings/fun.html","085a2fd28b457813017d90e7b3722d8d"],["/syntax_and_semantics/c_bindings/index.html","7e0df43e87096abdfb5c0c664874914e"],["/syntax_and_semantics/c_bindings/lib.html","4ebd9b3e065c0ae9685344ca8585f3f4"],["/syntax_and_semantics/c_bindings/out.html","3c8f82a98fd3ada3809c3b6d76072305"],["/syntax_and_semantics/c_bindings/struct.html","a9c537f2220cf6194097eeab8efe82bc"],["/syntax_and_semantics/c_bindings/to_unsafe.html","a7b79d0d1bfa566ff64b2314bdb49bc1"],["/syntax_and_semantics/c_bindings/type.html","417b0dee64f15e9d5b17c864501b0aa6"],["/syntax_and_semantics/c_bindings/union.html","c6001ede1f75d7a99cb1fdbb7a2b78b9"],["/syntax_and_semantics/c_bindings/variables.html","d154ab13b9476b3b9336e90cc847042f"],["/syntax_and_semantics/capturing_blocks.html","825bc7526aebfd42dd4d687408f3463c"],["/syntax_and_semantics/case.html","f2567d35f869e9a907966ce134b0bcdd"],["/syntax_and_semantics/class_methods.html","011d6dc894dd8d63f498fb27372efb1e"],["/syntax_and_semantics/class_variables.html","e2b3ddbecb8d849e0ea8420926f69ee0"],["/syntax_and_semantics/classes_and_methods.html","e26a6c50592573a52a4053f3820c81c3"],["/syntax_and_semantics/closures.html","4d5e8e17694ad27b1248f5a5e3161420"],["/syntax_and_semantics/comments.html","8dc06d3295f3d478332e716d12d6c17b"],["/syntax_and_semantics/compile_time_flags.html","3d389da21b6db642543f5f0f283b2fe9"],["/syntax_and_semantics/constants.html","9be5503b77e67b0f8e0ee84b547ba71f"],["/syntax_and_semantics/control_expressions.html","c075d220a94a091b7364db82aab3550c"],["/syntax_and_semantics/cross-compilation.html","cabd6399b2596275a2442e5dbcd8faff"],["/syntax_and_semantics/declare_var.html","48b29ef29b6bfa9353c61d4a7dfff6ff"],["/syntax_and_semantics/default_and_named_arguments.html","65cf22eb0d5981ddd490c474bd1de82b"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","01a26f4c10f227113ff4dabf9dd7f841"],["/syntax_and_semantics/enum.html","53b49d2ed35aae4b77fe8c3b8105e8da"],["/syntax_and_semantics/everything_is_an_object.html","8b229646d8d592d6671dd43e613d8e25"],["/syntax_and_semantics/exception_handling.html","a0e3b11879136deb0e33a56ff7c4809f"],["/syntax_and_semantics/finalize.html","957132e6ce396310c4200f7475c19918"],["/syntax_and_semantics/generics.html","77a05ce7d15ab2797ba91da325cd0089"],["/syntax_and_semantics/if.html","36c88cbd8865ed6f17720150d3ec186a"],["/syntax_and_semantics/if_var.html","8e19eb63f7e8145b5e8d0868d9036e66"],["/syntax_and_semantics/if_var_nil.html","f00faaa5e58fc79007da91384a8fface"],["/syntax_and_semantics/if_varis_a.html","1d296633ea601b43b2279db93bf44046"],["/syntax_and_semantics/if_varresponds_to.html","6fa0e5dea454317e477da95e4cd9b5c8"],["/syntax_and_semantics/index.html","4daaab89eb22b8130833920154cd667c"],["/syntax_and_semantics/inheritance.html","73343cefdb32d847fe1901acd4cf3920"],["/syntax_and_semantics/instance_sizeof.html","a824cb3981c3e93390091a27df9407d9"],["/syntax_and_semantics/is_a.html","b8fdc03841e5eae87bbc917675c795c4"],["/syntax_and_semantics/literals.html","c53845dc788d0436e709c751f572da32"],["/syntax_and_semantics/literals/array.html","680fcd960326dbf682f0a9a17bd0dcbf"],["/syntax_and_semantics/literals/bool.html","5c396114174f1c0a3ad2231288f9e6dc"],["/syntax_and_semantics/literals/char.html","436ffd0993ef2e2f360881c809126459"],["/syntax_and_semantics/literals/command.html","a4ba54b6b884e2af13bf0532a12ea8f7"],["/syntax_and_semantics/literals/floats.html","c05018a0391fbae9639ae8b35e9fe50f"],["/syntax_and_semantics/literals/hash.html","2cdc437a951255f5e4affd5da64f10d3"],["/syntax_and_semantics/literals/integers.html","45395c3e42380da2a65c9cb3261cd9d7"],["/syntax_and_semantics/literals/named_tuple.html","fd2e754545f81ef4db2e75395299f66b"],["/syntax_and_semantics/literals/nil.html","17d98f60a33af441de9d6d12e20e66df"],["/syntax_and_semantics/literals/proc.html","faebaa2375250b933356789f329ce9e3"],["/syntax_and_semantics/literals/range.html","f951a627b4b25711ad5878870a3e6c49"],["/syntax_and_semantics/literals/regex.html","19c1fc20358b826ac7627b43740088e6"],["/syntax_and_semantics/literals/string.html","5b9acb6249704de49c940cd107844eea"],["/syntax_and_semantics/literals/symbol.html","24586aa10f43821509989841f58954d5"],["/syntax_and_semantics/literals/tuple.html","5a746cb1c6bd3730c5cb1a33c82db28f"],["/syntax_and_semantics/local_variables.html","062358313f57ea10c54054c3ed3ee206"],["/syntax_and_semantics/low_level_primitives.html","02e96237399e97aff50eaa7f2109894a"],["/syntax_and_semantics/macros.html","a4fba5ee02347de891bccca4da4082a9"],["/syntax_and_semantics/macros/fresh_variables.html","5ddaa086fd2ab28d9f9c7d297c25c3e9"],["/syntax_and_semantics/macros/hooks.html","4652e30cdb7a07ccfc1bfd350f446c8f"],["/syntax_and_semantics/macros/macro_methods.html","4c979626725f89225d0863e39e920f83"],["/syntax_and_semantics/methods_and_instance_variables.html","81663bffc7f3aee94ed52a0209bff4b1"],["/syntax_and_semantics/modules.html","271d37d2a245a36a6cad1a85706fb4e7"],["/syntax_and_semantics/new,_initialize_and_allocate.html","39235c8925dd2121696d6b0fe4dccf64"],["/syntax_and_semantics/next.html","6cb963059f3ef6384c64109075a572be"],["/syntax_and_semantics/nil_question.html","ed3dd6e07349ae13066efa1b35fef989"],["/syntax_and_semantics/not.html","cf169213b2c015d181a6c1eec8a46ca0"],["/syntax_and_semantics/offsetof.html","2b08671861098ab2ca8c4ae3098769f5"],["/syntax_and_semantics/operators.html","60df762d34b0f5c5adf2e56c9641c6a3"],["/syntax_and_semantics/or.html","b541c4845dc15c1003aff4ab24ea03e9"],["/syntax_and_semantics/overloading.html","9868849691f95bae15f9ffa81bfcd3f5"],["/syntax_and_semantics/pointerof.html","82cf2adeeeedb7b10d8cdbf568216846"],["/syntax_and_semantics/proc_literal.html","76a1c242acedcc774751a788a220f89c"],["/syntax_and_semantics/requiring_files.html","f9721791c6a5d25d29c89d75c11f1b56"],["/syntax_and_semantics/responds_to.html","439c9daa32d9312a720936090f32de01"],["/syntax_and_semantics/return_types.html","e5ed8e4db969571e22bed707311e9873"],["/syntax_and_semantics/sizeof.html","cb8f67b9dc9597e7354db28320b48af1"],["/syntax_and_semantics/splats_and_tuples.html","5e55957e5e7356d335d79ba24a82847c"],["/syntax_and_semantics/structs.html","02641763b750e2c4a44a4abc736b06e0"],["/syntax_and_semantics/ternary_if.html","517717c4558a77aa64a584e98050f30f"],["/syntax_and_semantics/the_program.html","5320f6eda726fad6829f882a4a5d3b87"],["/syntax_and_semantics/truthy_and_falsey_values.html","6bf1180edbf83482bb23c3a52d6e52a3"],["/syntax_and_semantics/type_grammar.html","97cc9277b5e79ad6a9a0d303eedd6c84"],["/syntax_and_semantics/type_inference.html","4bdeac701deec5ac3de3fd36163799c3"],["/syntax_and_semantics/type_reflection.html","8b53710d9ab00ff9e3eba18bee130753"],["/syntax_and_semantics/type_restrictions.html","5784be6ce3c3e61361bd54a4f69c5ebb"],["/syntax_and_semantics/typeof.html","81f851c39b2bf6fbce035472edca7419"],["/syntax_and_semantics/types_and_methods.html","8b5dbcc2324f32463162a151f5b107b6"],["/syntax_and_semantics/union_types.html","e9a852a71c052b770391cb22968db851"],["/syntax_and_semantics/unless.html","5e5f43ecc568aac00930181fec884728"],["/syntax_and_semantics/unsafe.html","9276dad62ef61ba5267bb7275290efea"],["/syntax_and_semantics/until.html","0c8303cf6358c231a0e98ee0bc85aa1f"],["/syntax_and_semantics/virtual_and_abstract_types.html","22c68f12f675c02fe97c34439a954812"],["/syntax_and_semantics/visibility.html","0b8b7861d6623cd1669d9fe17235c009"],["/syntax_and_semantics/while.html","3a54fa9ed4ee3c64561066f62e600a91"],["/the_shards_command/index.html","ad95b3d7414bdea929fc0945cf09738f"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","7d4ad84eb8ca0d37768a407df6b30be8"]];
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







