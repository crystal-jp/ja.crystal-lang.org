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

var precacheConfig = [["/conventions/coding_style.html","10e0b12a2f057bad281917881d92ba79"],["/conventions/documenting_code.html","c55145a8c9453639350a7bddfdc3ae80"],["/conventions/index.html","152898bcc70206893ed4741dda8e83d7"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","8b21fde19e1d58f1675b28d3ac5ea972"],["/database/connection_pool.html","37f4983ae7faef108b3ff8193f949c76"],["/database/index.html","c7e2f9969902593fa4e4406f093b0b81"],["/database/transactions.html","a2c434682cdc2c4d0dfa633369056176"],["/getting_started/cli.html","9b81597bf568b28bc518b6a7503704cd"],["/getting_started/http_server.html","c6927c9d23f75aeac9ccf08cc411505c"],["/getting_started/index.html","652968fc43ef1d7393c446269c6705de"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","8dad5157fcb15ec0fe935f2f4e48ba9b"],["/guides/ci/travis.html","44aa20981f055095d84a82c5ea763478"],["/guides/concurrency.html","7d59c0a6cab603da0e6f8ba65b4310f0"],["/guides/continuous_integration.html","983fc3d8f62fbafab400105637f283c1"],["/guides/hosting/github.html","a10406db7af475395c73c9a859b52362"],["/guides/hosting/gitlab.html","db7c74176537edc80dee8292075ecbb3"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","fc72eae8634220fa4defb1b77d97a3f7"],["/guides/performance.html","32f158422d665009482700e979f8948b"],["/guides/testing.html","79184cd8ede397b3d2b0eaa96a5bf77d"],["/guides/writing_shards.html","f7c8b39c26a1ce3432b7e25b72314e56"],["/index.html","4fae7da8341fa00ea0938b8874add993"],["/syntax_and_semantics/alias.html","945e054d17d8ed16067c424f2575a2ed"],["/syntax_and_semantics/and.html","3c8ffa5fc6d04c49bcc231335b87c747"],["/syntax_and_semantics/annotations.html","221679068bd287aaa7475bbca0292668"],["/syntax_and_semantics/annotations/built_in_annotations.html","99d103925a44fb43bb6eae02a9e844c9"],["/syntax_and_semantics/as.html","ee21533464383b49e058c7b9a0b2c60b"],["/syntax_and_semantics/as_a_suffix.html","7a853edb846ef8767efb76a620a87f8c"],["/syntax_and_semantics/as_an_expression.html","04adf5b7699d5bed1f091eb175b546c3"],["/syntax_and_semantics/as_question.html","77c1cea5b63b29b32e46a5015cfeccb3"],["/syntax_and_semantics/assignment.html","25bc2ed559f3b66876598458d6df7d21"],["/syntax_and_semantics/block_forwarding.html","561a1701fad59d827ed1e2abb4443861"],["/syntax_and_semantics/blocks_and_procs.html","918023d96e6482945d33278bb308bee4"],["/syntax_and_semantics/break.html","c157e27a1b3c67cd5bf4fdfc957f0c2a"],["/syntax_and_semantics/c_bindings/alias.html","76e9cec05e3b6cf20199c0a38509191f"],["/syntax_and_semantics/c_bindings/callbacks.html","a0c2216a5ffec53006fb1b8468713225"],["/syntax_and_semantics/c_bindings/constants.html","c426223bd9483054bd69a4fa0c94c242"],["/syntax_and_semantics/c_bindings/enum.html","3fd22110d7def8198caba1055a04ab8f"],["/syntax_and_semantics/c_bindings/fun.html","3767b27d7f8788b9c136600ab145d335"],["/syntax_and_semantics/c_bindings/index.html","213dbf5d36a04de012568d07867d2995"],["/syntax_and_semantics/c_bindings/lib.html","0ff5f841e942fdd78deed5f3c4dc472b"],["/syntax_and_semantics/c_bindings/out.html","d0b4c82d0f867cdd9f46e9e6befb95dd"],["/syntax_and_semantics/c_bindings/struct.html","0574cdcc83a3ab5b40da057296a934e0"],["/syntax_and_semantics/c_bindings/to_unsafe.html","63f08a53610ceb3f502483e967f4082b"],["/syntax_and_semantics/c_bindings/type.html","71cc3d0991120ba66aa51d3b7eeac90b"],["/syntax_and_semantics/c_bindings/union.html","f13b79a5501c6fbbbf1d16dff09c846f"],["/syntax_and_semantics/c_bindings/variables.html","38dda3b7ec45b3d161a9903083643b55"],["/syntax_and_semantics/capturing_blocks.html","2ac7111617cd692bc4880f6e11e5db49"],["/syntax_and_semantics/case.html","9ba5ee8ff3534f15b82db98bf4a8e0e9"],["/syntax_and_semantics/class_methods.html","1916ae8526bf6b21194bfc1de488940b"],["/syntax_and_semantics/class_variables.html","638b944ca822fdffb0b187b1e8887841"],["/syntax_and_semantics/classes_and_methods.html","aee5c8d7ec3fc6b9fc91e123fbb31fb6"],["/syntax_and_semantics/closures.html","b26a4d35dc1800db6a13e18112a6d5f9"],["/syntax_and_semantics/comments.html","e7cd278520a17c1fdcfa676c4b8c32bd"],["/syntax_and_semantics/compile_time_flags.html","79abb0ec75709ff27fe3490afca05a98"],["/syntax_and_semantics/constants.html","022829bf6b674acea8bba2222f8d4855"],["/syntax_and_semantics/control_expressions.html","03087eda36f9543a113842efe3142e62"],["/syntax_and_semantics/cross-compilation.html","b01c6008dac39a1dc8ac6b651e0a8b50"],["/syntax_and_semantics/declare_var.html","c686ac0633cf8ad55d476b5c71a661fa"],["/syntax_and_semantics/default_and_named_arguments.html","4d8aff48fcc3950c3ba624a2105333aa"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","7e0ce8fbe39964f17e55b7fc9523ef40"],["/syntax_and_semantics/enum.html","4036eb17caed018b4f0c1e799ca5fa26"],["/syntax_and_semantics/everything_is_an_object.html","c018eb48099aca0cfa83901c862fd119"],["/syntax_and_semantics/exception_handling.html","3d72171000774f67fdd6c25e2f382958"],["/syntax_and_semantics/finalize.html","45179c17f8b03b8970215d1628c66116"],["/syntax_and_semantics/generics.html","b1e28547bc2ecfd7662c4cac519f278a"],["/syntax_and_semantics/if.html","6b86da31af981602d6432b4893af417e"],["/syntax_and_semantics/if_var.html","7a7d2e754348480a9cc2f0294990c91a"],["/syntax_and_semantics/if_var_nil.html","bf8c4caaced7acf8d6bc450676c96f70"],["/syntax_and_semantics/if_varis_a.html","3e4adde966a23dca7971f3a9344f7127"],["/syntax_and_semantics/if_varresponds_to.html","b4d845ae9591d4bb7a0ebb4154d2a452"],["/syntax_and_semantics/index.html","88997ee8be3ed45028e8f3a4ef2dc9d1"],["/syntax_and_semantics/inheritance.html","ce42ac9d90d549feb098c857e5aa9628"],["/syntax_and_semantics/instance_sizeof.html","d6c0e189c3f5cf3c068f8d73b41476a4"],["/syntax_and_semantics/is_a.html","c984b68d2e8e0658ce3dac4706ca18f2"],["/syntax_and_semantics/literals.html","ec8a6423d0a249388a2cc41f582fa129"],["/syntax_and_semantics/literals/array.html","94652cb2278d8b55561c685505d9e3a4"],["/syntax_and_semantics/literals/bool.html","7e1359ca762ddb6df59acb94670e68d7"],["/syntax_and_semantics/literals/char.html","d2c4b0451d6fad63c1c365093d2b0278"],["/syntax_and_semantics/literals/command.html","cdaf28fa8d0812218154c0a729eafb6b"],["/syntax_and_semantics/literals/floats.html","fd00a473970d17d5b810c0feb40c0f53"],["/syntax_and_semantics/literals/hash.html","251611699bc11ca9c4bae69c5a399535"],["/syntax_and_semantics/literals/integers.html","9bd8e6bb185056579ea8833c1ea0575f"],["/syntax_and_semantics/literals/named_tuple.html","bbf3b9348abc0c0544edeac00a5291fd"],["/syntax_and_semantics/literals/nil.html","a98f88b8d43ffc5faea51bb52ab322a9"],["/syntax_and_semantics/literals/proc.html","12f0a361fae4f8f0f8579caec79b8000"],["/syntax_and_semantics/literals/range.html","7b22c9daeac23c1617ac7c63ab050465"],["/syntax_and_semantics/literals/regex.html","0f5c7e4a18c7c9a00a40cd7057ec4327"],["/syntax_and_semantics/literals/string.html","39b97b76d9d3e776b3643bdd26ed1f85"],["/syntax_and_semantics/literals/symbol.html","8561fa437f67a023085b3fa77256dc05"],["/syntax_and_semantics/literals/tuple.html","e4f90251284f053437bf7fa6f96b33f2"],["/syntax_and_semantics/local_variables.html","d28c5445d173770201558d5aeb81906d"],["/syntax_and_semantics/low_level_primitives.html","5f427ea6dfdbb421addc2534e02f5a35"],["/syntax_and_semantics/macros.html","7ea480610d5870aeeeb9bbb5e2cd147c"],["/syntax_and_semantics/macros/fresh_variables.html","638947976e81296f18f189535bdf497e"],["/syntax_and_semantics/macros/hooks.html","fc22512b1ff66e2df6105767c62e3ea5"],["/syntax_and_semantics/macros/macro_methods.html","e6f726fa9d1957502baeefe8758e5271"],["/syntax_and_semantics/methods_and_instance_variables.html","17df86c389865ee9f9b267786ac65be7"],["/syntax_and_semantics/modules.html","3bc4edb145740eaa447dbb62b5aafe99"],["/syntax_and_semantics/new,_initialize_and_allocate.html","d90a1875a288e4b81c8a8dc3f794433c"],["/syntax_and_semantics/next.html","df64e0b3203dbfa75482ea88ab48a780"],["/syntax_and_semantics/nil_question.html","beb08420b9bc06e981d8c5cdc4889c6b"],["/syntax_and_semantics/not.html","e926d50224686544d17ca45259050283"],["/syntax_and_semantics/offsetof.html","79aedfb90e5d658545a17172233139ff"],["/syntax_and_semantics/operators.html","d4e82fca9a0579dd5d05f639c895c547"],["/syntax_and_semantics/or.html","8556b3293da47ba0666e0d740a028bbd"],["/syntax_and_semantics/overloading.html","a7a3c7886997da0311f78df621a48a04"],["/syntax_and_semantics/pointerof.html","97ca631e82add96d08d414b6249c5f3c"],["/syntax_and_semantics/proc_literal.html","b6c814c9ce30053fd7320f59cfc12f5a"],["/syntax_and_semantics/requiring_files.html","14d3e56c4259de9d35c523d61d8fe7be"],["/syntax_and_semantics/responds_to.html","dfa37e270bbd2b703a20e68fc2e9cdd7"],["/syntax_and_semantics/return_types.html","fcf55e69e81ad7289f641e32caf43777"],["/syntax_and_semantics/sizeof.html","c38cb473de57a86f5a2255cb738903e9"],["/syntax_and_semantics/splats_and_tuples.html","fbbbb6652996a7863895ee70e1855e06"],["/syntax_and_semantics/structs.html","93fe02653d0cb586764ac6ff0526221b"],["/syntax_and_semantics/ternary_if.html","70b488778d2be1e89846ccaf8da5c0fa"],["/syntax_and_semantics/the_program.html","d77d9ab2747ca9835d8df8568cb82195"],["/syntax_and_semantics/truthy_and_falsey_values.html","f5f8c12e0bf4731cf8206cec76fa6057"],["/syntax_and_semantics/type_grammar.html","3ea4eaf056db6377a70666d086a66172"],["/syntax_and_semantics/type_inference.html","85a6803ba370a06d4506b15d3f6d35a0"],["/syntax_and_semantics/type_reflection.html","936fdee463495eaa231396f6eeb3ae54"],["/syntax_and_semantics/type_restrictions.html","8f23a7043873675e94723873ec5c723e"],["/syntax_and_semantics/typeof.html","076b523766a495ec03b901ab7816590d"],["/syntax_and_semantics/types_and_methods.html","4795729b5490550ea98f825baa9ae9b6"],["/syntax_and_semantics/union_types.html","34a00dd58380daf4de63dc72848f0793"],["/syntax_and_semantics/unless.html","6c34d9265cdefa6140836d620870a68d"],["/syntax_and_semantics/unsafe.html","7f06244294eb92195496426907689ce4"],["/syntax_and_semantics/until.html","e098deb59663a2db1980187c07837509"],["/syntax_and_semantics/virtual_and_abstract_types.html","c40cc4ad95d28df438a8a6e910a56ea9"],["/syntax_and_semantics/visibility.html","5f200f16ea7c95a93d99bed50ec9e59e"],["/syntax_and_semantics/while.html","43d50a90b8f5c6400ba4d01e86370eca"],["/the_shards_command/index.html","22640c9ac9860aa55c8a6ce7c1bea54d"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","f212d7190102a0edef41698743ad509d"]];
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







