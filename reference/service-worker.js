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

var precacheConfig = [["/conventions/coding_style.html","3a0ea2e4154f6e6f895acc8456f3cdf0"],["/conventions/documenting_code.html","ed47d37ddf4ca920c1ad5315a6013c8a"],["/conventions/index.html","b88fce4279f2f931e3ea803528230a97"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","ffd6af35a2e834b22bdf76372519baf0"],["/database/connection_pool.html","60338f08a367f92503aec8798cfd6bb0"],["/database/index.html","4f0415177f3af4f73c6c5ff7246acc0e"],["/database/transactions.html","d1d37aefdc4969260515825008cee1f5"],["/getting_started/cli.html","578b3338f06e96b1d8e2e3040433ccd4"],["/getting_started/http_server.html","9be2ac30a467319781ef4a39102b9c36"],["/getting_started/index.html","61bebb53ab0cad2383e8c720321b976d"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","b32b228af8ddf0519b6cc66152162f37"],["/guides/ci/travis.html","822ef150d30af81b813abf1ed67232d8"],["/guides/concurrency.html","c75d89a7db4428772dd28114e605cef8"],["/guides/continuous_integration.html","6d5ec244b85eb7e398d0c12d6ea70985"],["/guides/hosting/github.html","8de46ff8502ca96dc233b84621bd0c57"],["/guides/hosting/gitlab.html","dbaf7c4b7b4466ddea8d29586189e905"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","360b054c122f918c229618ecbc1846b3"],["/guides/performance.html","0e380eebc248a231eef343defb9f4da0"],["/guides/testing.html","029269031ae52c249be3b5feb7d9f02e"],["/guides/writing_shards.html","1f101682335d3ce3011d7d6e20aec0b1"],["/index.html","70137b09c8e461c789fee48016d93434"],["/syntax_and_semantics/alias.html","756a02d596bcf3edf3bfc49efa2e1202"],["/syntax_and_semantics/and.html","a31aee0bf3d952ec3a21b82b4afc1577"],["/syntax_and_semantics/annotations.html","457e2b82a0e08482aaab5cd6812dea99"],["/syntax_and_semantics/annotations/built_in_annotations.html","28f4d31823420069bca45c954922cec5"],["/syntax_and_semantics/as.html","c490bb4c632cef439dbac8b6dedb33da"],["/syntax_and_semantics/as_a_suffix.html","9d17c618561d9e63dbe3ca1933fdb23e"],["/syntax_and_semantics/as_an_expression.html","780c8848c6be2dc0ff6c8a277d16d200"],["/syntax_and_semantics/as_question.html","e82fc1c653d541fb95ef3eeebb49562c"],["/syntax_and_semantics/assignment.html","76638d629af42191518d21e47e7a45f5"],["/syntax_and_semantics/block_forwarding.html","1551513d2259358c66fd21a0ec9b18c3"],["/syntax_and_semantics/blocks_and_procs.html","37f9999212cff55b47357e6738fa36a0"],["/syntax_and_semantics/break.html","6a4671464c025e4876af87d0eb06c892"],["/syntax_and_semantics/c_bindings/alias.html","e3b312bbb85a6e7ae58177cd9071a78c"],["/syntax_and_semantics/c_bindings/callbacks.html","66bc00bd2c8624a4b157e11739656507"],["/syntax_and_semantics/c_bindings/constants.html","ddf8365d0fffab08bfb076dc32d8f164"],["/syntax_and_semantics/c_bindings/enum.html","f5c7138c021fc72074d6d86fd7dc7408"],["/syntax_and_semantics/c_bindings/fun.html","ead890e209557e0adee040dc67971cb4"],["/syntax_and_semantics/c_bindings/index.html","063b3445c91f3bf260c7d64403869e15"],["/syntax_and_semantics/c_bindings/lib.html","ba57fd3162da72d6c95f37144aa70527"],["/syntax_and_semantics/c_bindings/out.html","227f547b598e6a2aa0b5026622d857e9"],["/syntax_and_semantics/c_bindings/struct.html","89e1d4920cbd7a99a3af6483b7ddfed6"],["/syntax_and_semantics/c_bindings/to_unsafe.html","918cd813b477b63295cb9f17e198fbf3"],["/syntax_and_semantics/c_bindings/type.html","69eebefc4e5fabe10cb556005301e4e8"],["/syntax_and_semantics/c_bindings/union.html","67b83e3852083c9c7ac00f71709e842f"],["/syntax_and_semantics/c_bindings/variables.html","1e1ecd1278421704e9db2a6b936345bd"],["/syntax_and_semantics/capturing_blocks.html","40bc2dec2ebd47a989f4e2530124c1d9"],["/syntax_and_semantics/case.html","ffac002ba7bc0a3ec3e9a29fea1cf0d0"],["/syntax_and_semantics/class_methods.html","836e4c256e77f8618c69010793768fd5"],["/syntax_and_semantics/class_variables.html","267d059415f23ea46f815a93c6b9328e"],["/syntax_and_semantics/classes_and_methods.html","6f5c2972ad745c677f5b19d72ad37e2a"],["/syntax_and_semantics/closures.html","09ef2e8884f3cc481af3bfd26fa2e171"],["/syntax_and_semantics/comments.html","f864f5a5a046156ab933fb1094764715"],["/syntax_and_semantics/compile_time_flags.html","13ea83b7ae2a3e88be03cd8acb0c748f"],["/syntax_and_semantics/constants.html","7a4773d65941e880aa6bd1ef4ef636f5"],["/syntax_and_semantics/control_expressions.html","94c7ab6de4b961f997c193fed759af85"],["/syntax_and_semantics/cross-compilation.html","caa038007ec146113711566ba494f882"],["/syntax_and_semantics/declare_var.html","9dc22045a48a52ada29250fc5f2a34ea"],["/syntax_and_semantics/default_and_named_arguments.html","118188cb20b26b0d781ecfff1227fcfd"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","f7940d9274c482719efee980cbb3f575"],["/syntax_and_semantics/enum.html","51721a65654845523903011b09acd500"],["/syntax_and_semantics/everything_is_an_object.html","3ad03929a796b1c5df42753acf4113b0"],["/syntax_and_semantics/exception_handling.html","54c46d32406961cbfacd719ccd94b3ec"],["/syntax_and_semantics/finalize.html","0f1f1882dcbf7acab3fea78f21269797"],["/syntax_and_semantics/generics.html","6369c934413a427ca585a6fa4c11e092"],["/syntax_and_semantics/if.html","94c7534d0069967c136ec538747f76a3"],["/syntax_and_semantics/if_var.html","5979cbf2319eb78c953a8dec01c7045d"],["/syntax_and_semantics/if_var_nil.html","f2856fd3b511be03e63e35a5c302220e"],["/syntax_and_semantics/if_varis_a.html","faddbfa17adf9958bac2fb223b4382a2"],["/syntax_and_semantics/if_varresponds_to.html","f5f73fbd2c74b66401da443053b57ee2"],["/syntax_and_semantics/index.html","c8cc4a6ed47a5f06b2197ebb5b3ddede"],["/syntax_and_semantics/inheritance.html","efbdff0a352af85d9da83e0ab506e674"],["/syntax_and_semantics/instance_sizeof.html","3bd8bb89d42cdc7caef913391beacb33"],["/syntax_and_semantics/is_a.html","9c9b286e346fed9e28f1b584e097b719"],["/syntax_and_semantics/literals.html","31f47258a18d461bc4f54194c048998f"],["/syntax_and_semantics/literals/array.html","2e88cda75229d31c4f952739726edc40"],["/syntax_and_semantics/literals/bool.html","efc12e7482013f79e356f125c1bf31a0"],["/syntax_and_semantics/literals/char.html","fd88d10cb859854d5475821cfe36ef47"],["/syntax_and_semantics/literals/command.html","e22f04442936e12d460e3b1109bbfa27"],["/syntax_and_semantics/literals/floats.html","839846b12b48034b69f328516bbd7c93"],["/syntax_and_semantics/literals/hash.html","e323400277ee2023f5f434da38727541"],["/syntax_and_semantics/literals/integers.html","c198c86ef46bea6e38001d72a5ab50bc"],["/syntax_and_semantics/literals/named_tuple.html","88a198f992ae1d8ff9f6a1a305810dfa"],["/syntax_and_semantics/literals/nil.html","b50f03367ccd9a1f3cea0550a788cc03"],["/syntax_and_semantics/literals/proc.html","d94b13523fa28671a89f72894e1ad41b"],["/syntax_and_semantics/literals/range.html","c416b1b5c4027ebb15095211c511e3e8"],["/syntax_and_semantics/literals/regex.html","56781f4c6ce8c4920d557c924c7c4d03"],["/syntax_and_semantics/literals/string.html","5b86960a24e85b25b4f9de87a7d0b233"],["/syntax_and_semantics/literals/symbol.html","93606a99d3e80d464853dd64cc45cfb5"],["/syntax_and_semantics/literals/tuple.html","17f02576f16747170ce02e95cabb9c48"],["/syntax_and_semantics/local_variables.html","d5e23b17b096fbc33fd9c9c9de5717bf"],["/syntax_and_semantics/low_level_primitives.html","526523727a0692df5aa98d76354f5f47"],["/syntax_and_semantics/macros.html","cf39ac43fd7cc06a73cc214120bc10ba"],["/syntax_and_semantics/macros/fresh_variables.html","97b2df986fdaddf7349f6bf8d96fbaec"],["/syntax_and_semantics/macros/hooks.html","159016d5eaa41f05fa66467554771426"],["/syntax_and_semantics/macros/macro_methods.html","428bd5f33b15e462bc17680b1dd27e51"],["/syntax_and_semantics/methods_and_instance_variables.html","a36ed9ff383ea819ab5efffe5c8790f3"],["/syntax_and_semantics/modules.html","11311567de9adf6de02c57c086852540"],["/syntax_and_semantics/new,_initialize_and_allocate.html","942f44a86a9a3bb0cb1d99a0deb1c638"],["/syntax_and_semantics/next.html","322d676934cc45c7ae8dbeb1f81ef8d5"],["/syntax_and_semantics/nil_question.html","ff26fdf7f1e4d616292122b365aec2bc"],["/syntax_and_semantics/not.html","913c49691ef253367d727fdc53d49477"],["/syntax_and_semantics/offsetof.html","01228e5670a1a0a01f12794cdec44143"],["/syntax_and_semantics/operators.html","f29b572d130bb8a52fa217f3c127d66f"],["/syntax_and_semantics/or.html","915a20514219844be0ec2b53243ca928"],["/syntax_and_semantics/overloading.html","9c382ac45633c90a8931367e77206d99"],["/syntax_and_semantics/pointerof.html","641d4ba2317d153fe46878ef9227e6d8"],["/syntax_and_semantics/proc_literal.html","e1b3ab3f35665454db3787d3876cb7c2"],["/syntax_and_semantics/requiring_files.html","25a99e1dc8a948eb27fc7db7f16a0498"],["/syntax_and_semantics/responds_to.html","024f61abbe232b3372cfb3d3c3924a3a"],["/syntax_and_semantics/return_types.html","61459df3f1d1065c69c192d14990cadf"],["/syntax_and_semantics/sizeof.html","8d4cafecc2c9e3e2b63de964916ba848"],["/syntax_and_semantics/splats_and_tuples.html","e1bdedd8a35e5674b75e41dbd6500bcf"],["/syntax_and_semantics/structs.html","42236e32483440e02c5100245220e237"],["/syntax_and_semantics/ternary_if.html","7effab171e6585de409b56993d655993"],["/syntax_and_semantics/the_program.html","61ab0500cb8ecc102af50c745428ed06"],["/syntax_and_semantics/truthy_and_falsey_values.html","80075c8d4c72e36fc26c4450076db4f4"],["/syntax_and_semantics/type_grammar.html","1719d11eca7bb4de457f727e5cd9b720"],["/syntax_and_semantics/type_inference.html","eeb85eef8c13c4643bae34085349b7a6"],["/syntax_and_semantics/type_reflection.html","f08a94d4f91987262f160e1bef7f5ee0"],["/syntax_and_semantics/type_restrictions.html","76b0dbc28e74204b7d8008cd80fd89cd"],["/syntax_and_semantics/typeof.html","0357527eee9b98e1e2716f4ab6ceffd5"],["/syntax_and_semantics/types_and_methods.html","6528b0111f8807e62761f8994e3769dd"],["/syntax_and_semantics/union_types.html","e10703ca91330f6b948ebcd66f00b92d"],["/syntax_and_semantics/unless.html","74d63a43663a19092622459b75cb90e4"],["/syntax_and_semantics/unsafe.html","4338eb530f370083b8895736b4b82625"],["/syntax_and_semantics/until.html","7828daa1196d2646fde0a60f78b3a95e"],["/syntax_and_semantics/virtual_and_abstract_types.html","0649243e95cef6d3ad60710ae54a8bf8"],["/syntax_and_semantics/visibility.html","2715094022bcb67fab466c5d3305c106"],["/syntax_and_semantics/while.html","440fa84e07fc63aad83f2a61a437f6ae"],["/the_shards_command/index.html","1ac721e573fd0d84986b7bd0a52bd0b2"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","fb5fa3449e50f6926b8ca2b02c0f876c"]];
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







