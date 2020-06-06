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

var precacheConfig = [["/conventions/coding_style.html","84c155bd20c2745b1b049bc76f9324d8"],["/conventions/documenting_code.html","3c42cf462ef6096078481a625b171e0f"],["/conventions/index.html","fa0b778a70ec7df12461d3a440c206ef"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","ad1a5e2577a321f294ee77dbd3a8e9c6"],["/database/connection_pool.html","c808abbb59a0d5177e252f0850a02fe0"],["/database/index.html","7cefb90ce60bd22f6aea63b0664abcab"],["/database/transactions.html","47677a5718db2e054777c99f6463e10c"],["/getting_started/cli.html","b5d181c18a30fbe16fd183a9421f39d3"],["/getting_started/http_server.html","cbccdb3973e90de34fa028ef7a92d55e"],["/getting_started/index.html","62619e56ac395e4db078f150c580bdf7"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","3b54d7be0eec7627f2594375adc292ad"],["/guides/ci/travis.html","7e03c1ddc88521495af3c70cd2c81507"],["/guides/concurrency.html","f22faa90113d0c2c6a038f3170db2598"],["/guides/continuous_integration.html","eecf9545d5630d69e5ad59047c51fbe2"],["/guides/hosting/github.html","5bfaf21675c1c74996d53659e4cbcde9"],["/guides/hosting/gitlab.html","fade4ad1c55c24befb876afdee7995f0"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","850cbcf6c65f7a7b9cb75ce5318ed0f1"],["/guides/performance.html","4a597640f25d05d494750b142de80e00"],["/guides/testing.html","4c700266ba19aa5a65cdc1ce2dfc4cb9"],["/guides/writing_shards.html","4b2f7bc319efa5df945b221e92edd96f"],["/index.html","6d1bdf32b937f9a514a5dc469acc5118"],["/syntax_and_semantics/alias.html","0535f75169145fd4d44162525b4a454d"],["/syntax_and_semantics/and.html","f7157882d9c55db6a74a422800c9ebd1"],["/syntax_and_semantics/annotations.html","3765bc73d1a26afde723e7344536deba"],["/syntax_and_semantics/annotations/built_in_annotations.html","ed2e6e5a209cdeb04430130c97e2f4b6"],["/syntax_and_semantics/as.html","33bfdaf6d12a6818c479fa699666fb8e"],["/syntax_and_semantics/as_a_suffix.html","516760cd8f7995da0bbfd6f0ed51e408"],["/syntax_and_semantics/as_an_expression.html","38175592203fc6321071ebc8b5220293"],["/syntax_and_semantics/as_question.html","c10a33788260a43ae576c1c7df0763e6"],["/syntax_and_semantics/assignment.html","a71ae51b985f24cc6a42daa339121fa4"],["/syntax_and_semantics/block_forwarding.html","d796b663d6c2547caa0107353cc9ca21"],["/syntax_and_semantics/blocks_and_procs.html","c4cd8438ff3b79ec9c616405c074c564"],["/syntax_and_semantics/break.html","bede70257fe78262343f4cac1887f344"],["/syntax_and_semantics/c_bindings/alias.html","25ba056d05f86f67c742db9f1787f7eb"],["/syntax_and_semantics/c_bindings/callbacks.html","409e550bed8e426cef0523cd9810ab26"],["/syntax_and_semantics/c_bindings/constants.html","67e4a7cabff9a5df2b51106d992ead4a"],["/syntax_and_semantics/c_bindings/enum.html","02eaf1b081e815a4d810d195840a15c4"],["/syntax_and_semantics/c_bindings/fun.html","3fe30d3a854ba51a367bc661f8eeb812"],["/syntax_and_semantics/c_bindings/index.html","36e243542fe8d48fb964e30120b7863c"],["/syntax_and_semantics/c_bindings/lib.html","6af62f9a365f1d08ceb7b48830590424"],["/syntax_and_semantics/c_bindings/out.html","f7ed2d76585ef7958a09522c8a34e338"],["/syntax_and_semantics/c_bindings/struct.html","437d3039a2cdad3d3ab05397ac5a42bd"],["/syntax_and_semantics/c_bindings/to_unsafe.html","83bc801de765bab97b46902c96bea0a4"],["/syntax_and_semantics/c_bindings/type.html","0e0dcd19a64169b8d828c677269f6059"],["/syntax_and_semantics/c_bindings/union.html","e44f11ba5409d8102e99dde6aa9fe9a3"],["/syntax_and_semantics/c_bindings/variables.html","b08bc1180949c086d53baafe08a29053"],["/syntax_and_semantics/capturing_blocks.html","cdead08677c9b6f5d62a14cb3cc49d27"],["/syntax_and_semantics/case.html","2369353c260d21430224c0d1bbb19871"],["/syntax_and_semantics/class_methods.html","b879b6a96778692204aa1616c5c17c4d"],["/syntax_and_semantics/class_variables.html","4c3a18f1a9ba3dea048dbec22bfb6727"],["/syntax_and_semantics/classes_and_methods.html","53fc803769906ba76e7d27ecfd41ab62"],["/syntax_and_semantics/closures.html","15b9bde89b4f0c6ace4fc46b15cd5705"],["/syntax_and_semantics/comments.html","def1db102c18034618d58c106b278790"],["/syntax_and_semantics/compile_time_flags.html","97a4bf60af67b31b70cb8e279a582fae"],["/syntax_and_semantics/constants.html","63d76d05b5402e49499fcd3ade2346e4"],["/syntax_and_semantics/control_expressions.html","060d488a82d7a241849005f2c3275fde"],["/syntax_and_semantics/cross-compilation.html","d09ec05ca87fda066d4e0fdf99be38a2"],["/syntax_and_semantics/declare_var.html","eda5f636039f7e073c2d97d698721cc3"],["/syntax_and_semantics/default_and_named_arguments.html","a9bf21387e8c09a6bb490e7703fefc39"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","178cefd5313f9c5f5b6b6e7a0762c39e"],["/syntax_and_semantics/enum.html","1079fdcc07319c0791d4af108af029be"],["/syntax_and_semantics/everything_is_an_object.html","949e570413c6984788ff8536ee3812cb"],["/syntax_and_semantics/exception_handling.html","e183f7c440b7e7e5f95c153ba56c3632"],["/syntax_and_semantics/finalize.html","c41a538a993b6eb4e77d96b1a27c4f50"],["/syntax_and_semantics/generics.html","8f62d184db39adae88248c396b094005"],["/syntax_and_semantics/if.html","e7bf8215ae1df7c53a7455ce15220102"],["/syntax_and_semantics/if_var.html","b318c20a7b5c20797113949d01a16490"],["/syntax_and_semantics/if_var_nil.html","e947e750aad84d84ac4293fe9d36e494"],["/syntax_and_semantics/if_varis_a.html","bd0a7ae9a7da584649f6992be34c7f8f"],["/syntax_and_semantics/if_varresponds_to.html","9aa9ed62a280fbeaf17ef8b584a0d155"],["/syntax_and_semantics/index.html","33c8618abb9786c942e64852b8305629"],["/syntax_and_semantics/inheritance.html","682133745fa392d25e18edeba09a612d"],["/syntax_and_semantics/instance_sizeof.html","c319d9b1bd4b26218008add462b498e4"],["/syntax_and_semantics/is_a.html","6cf8790f24c9c43b0271860d21c64816"],["/syntax_and_semantics/literals.html","8b7079fad86637056f943c71693ea565"],["/syntax_and_semantics/literals/array.html","4e9be0ec85fe2e703883280f2447eb47"],["/syntax_and_semantics/literals/bool.html","22849207726e157c4312b9db3a40c657"],["/syntax_and_semantics/literals/char.html","cea0b2848614409274d6b2457dbbbe3a"],["/syntax_and_semantics/literals/command.html","12d12d92ed040a3fd1d453c7c82db532"],["/syntax_and_semantics/literals/floats.html","b9034332a9172cef80c8285598ab770c"],["/syntax_and_semantics/literals/hash.html","dafaaba97ae8cdf5c5a38f02d8ad99b8"],["/syntax_and_semantics/literals/integers.html","0ae442bb9b29599461d80ec3ef52cee2"],["/syntax_and_semantics/literals/named_tuple.html","145e9bf5da3622cceb844bb714d653d2"],["/syntax_and_semantics/literals/nil.html","e2883e3765af1cb77aad25c8499ec140"],["/syntax_and_semantics/literals/proc.html","b1b1d97ce9a5baf741aa8661ec8ea20a"],["/syntax_and_semantics/literals/range.html","b75edebe0f81631c506c67c0669571da"],["/syntax_and_semantics/literals/regex.html","0af5d8d23af095ff42b55598925f5036"],["/syntax_and_semantics/literals/string.html","271634d4fc07ad10fbbb28529106821b"],["/syntax_and_semantics/literals/symbol.html","d05e07e7e244870eea80f88eeab8d887"],["/syntax_and_semantics/literals/tuple.html","0e2148a5add87360eee43dffc551b237"],["/syntax_and_semantics/local_variables.html","6efb8b5ca861efbee83f08c2950df371"],["/syntax_and_semantics/low_level_primitives.html","55115528ed663264a5f00f6f94083b3a"],["/syntax_and_semantics/macros.html","b6c8d705635553a9ee5468157686a7d8"],["/syntax_and_semantics/macros/fresh_variables.html","d0a5fc3836fd419264ec28f3527e5692"],["/syntax_and_semantics/macros/hooks.html","93d2474dc411e697e9ff1090775fac1e"],["/syntax_and_semantics/macros/macro_methods.html","8d47619056c52c5dcea8a9087d1891d8"],["/syntax_and_semantics/methods_and_instance_variables.html","8f9e7d94a30c0258d9eddfee06653531"],["/syntax_and_semantics/modules.html","c8296f2078461821951ab549e1083490"],["/syntax_and_semantics/new,_initialize_and_allocate.html","690c08ea2245d0acf68c78e17029166b"],["/syntax_and_semantics/next.html","49620f628aea5f059e5f99d8d63b8d37"],["/syntax_and_semantics/nil_question.html","7c9b269a22fbe3f465ac2347c796f103"],["/syntax_and_semantics/not.html","161f315b308da5c31f9aadb9d2ba937f"],["/syntax_and_semantics/offsetof.html","b7c5fd82a2b71d062a955bd03428f00b"],["/syntax_and_semantics/operators.html","551d57683a9e32d1a01ed7bc8f2edc15"],["/syntax_and_semantics/or.html","506ca8d84176e6b547115654278b353d"],["/syntax_and_semantics/overloading.html","71e178a2f430c292298e028b17db8132"],["/syntax_and_semantics/pointerof.html","87e3d2be043d4bc6dd8a2bdeaf6c5708"],["/syntax_and_semantics/proc_literal.html","2fffd87dcd609f280774fb62170ee987"],["/syntax_and_semantics/requiring_files.html","9b0256219405dbd35ebfcc1608d276a8"],["/syntax_and_semantics/responds_to.html","84fff30af7ef4dc4cef28cb596424276"],["/syntax_and_semantics/return_types.html","3a175610928af08a19c83d4bf1acad6b"],["/syntax_and_semantics/sizeof.html","825f9e278e2c7a48e9284d457d694321"],["/syntax_and_semantics/splats_and_tuples.html","ab48c10bc49ef45755be787a67ab0eac"],["/syntax_and_semantics/structs.html","6835bc5f0c6f568d74dc8bab8493beff"],["/syntax_and_semantics/ternary_if.html","401d634ea329084897b3c2aac44abc29"],["/syntax_and_semantics/the_program.html","0670911b4ce9c02226bd5d9cbcd32de7"],["/syntax_and_semantics/truthy_and_falsey_values.html","4910763b3ea5abf284f74072aea91608"],["/syntax_and_semantics/type_grammar.html","dad8f68300aadabf1ebaef6460d0b105"],["/syntax_and_semantics/type_inference.html","6f2797356ec90dfc2e03f3a62880d0b9"],["/syntax_and_semantics/type_reflection.html","1177bbdbde3cf0398b34978fc03c03ae"],["/syntax_and_semantics/type_restrictions.html","bd8dd315bd89cb788ed19e02153295a8"],["/syntax_and_semantics/typeof.html","593d9a193444cc77fb95a24c08b11fb2"],["/syntax_and_semantics/types_and_methods.html","8f5c165cb5a9c06db459a7bc800ce694"],["/syntax_and_semantics/union_types.html","c8cef125302b6d6efa32a6912fdb1cf5"],["/syntax_and_semantics/unless.html","223865d02b89343f23f141be268562f2"],["/syntax_and_semantics/unsafe.html","f8e1feb2a3b2622d27fbfa18ea783d5d"],["/syntax_and_semantics/until.html","8b6f9c20b5166bccff0b0729e8d9afab"],["/syntax_and_semantics/virtual_and_abstract_types.html","7308d6ccdd59b1e6e03d62522b1adaf6"],["/syntax_and_semantics/visibility.html","a0a70bfd6dc1a98de93c3a2c6b727528"],["/syntax_and_semantics/while.html","4ef143bb0c04cf4e4c7e8ac38cd0caea"],["/the_shards_command/index.html","97d2e765c28c1d9706df6ba487a4a57e"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","0ad4f69f6d7ee25761c61defc9e09091"]];
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







