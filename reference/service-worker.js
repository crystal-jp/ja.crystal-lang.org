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

var precacheConfig = [["/conventions/coding_style.html","56be9d4ab9208e12162aa6e0b81a9af5"],["/conventions/documenting_code.html","df4bdbbe146bee8ae2822004464656c7"],["/conventions/index.html","742b695b447213ef3a8035e59225c7b6"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","0b8c08cf360f36615aad8495db6f209e"],["/database/connection_pool.html","cd1d29d07eebd90587b852bfcb2da5a5"],["/database/index.html","7c1ae060a5489c1e536a23b7092f0a70"],["/database/transactions.html","c5ab758b02dbf60059ee86d3c8b728f5"],["/getting_started/cli.html","64b2501beb8591e3b9738efc4bceef39"],["/getting_started/http_server.html","312d2b136366a3679aff549392b1550a"],["/getting_started/index.html","913b2b68da4dc30b825141be17e3af9e"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","5a63a8902ff2105eec4f1ac3c4959e35"],["/guides/ci/travis.html","35d7f3b890378d523b197705c1b4e994"],["/guides/concurrency.html","f15f0cf9931c583df56f5c9de44e16ed"],["/guides/continuous_integration.html","615855154b03d325d780fc5d4626aa7d"],["/guides/hosting/github.html","a989a23e1c33b71bd30b4989757a5887"],["/guides/hosting/gitlab.html","c5cb4225178eba06af70d915f1ca5432"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","3d081ea33406a4e514125deaf83afdca"],["/guides/performance.html","785c44fe2a88fb8cf205c00afda83b7f"],["/guides/testing.html","f6f538d595b41d2f0111ebb128d550af"],["/guides/writing_shards.html","b487acd6d9c94fc5f05c9f0fcd2ef72a"],["/index.html","5dc25f5ae436f40ff7b2d05b339df593"],["/syntax_and_semantics/alias.html","fe1be70405925653674a014225324b01"],["/syntax_and_semantics/and.html","a12539f49ae2d9ec3a13c54fe54e637c"],["/syntax_and_semantics/annotations.html","732a6dcc24c2c9df77576abbdc7f0cd1"],["/syntax_and_semantics/annotations/built_in_annotations.html","913253341b227bb52a9d807485032a5d"],["/syntax_and_semantics/as.html","f5adaf27dcbd31cbd4db23a47aa1283c"],["/syntax_and_semantics/as_a_suffix.html","fafeb99745d61be12644d0e17b8e1a78"],["/syntax_and_semantics/as_an_expression.html","7f39f4be563e7b5ed503e1ee5e03f1d3"],["/syntax_and_semantics/as_question.html","4388fa39fba8cd82868be69729360311"],["/syntax_and_semantics/assignment.html","c2e3893f266936359f78520ed921fd60"],["/syntax_and_semantics/block_forwarding.html","ce6ffee1f79acc7b2f66bdeea3cfcea3"],["/syntax_and_semantics/blocks_and_procs.html","170b609cfc49517dd9eabd0ef2ff652e"],["/syntax_and_semantics/break.html","0aa0b1d2f59e60618d2126d49f4ad80b"],["/syntax_and_semantics/c_bindings/alias.html","4ffbd3c09bd9ff1365bde57b9c4bfd20"],["/syntax_and_semantics/c_bindings/callbacks.html","a354edaf46463266621ee5cc42f03c26"],["/syntax_and_semantics/c_bindings/constants.html","9e86b76313ecdc8d908fdf77815b54ce"],["/syntax_and_semantics/c_bindings/enum.html","fad8444e6d45c4be6fc30b35941dc4ab"],["/syntax_and_semantics/c_bindings/fun.html","3c8dfa25f4a0209c662305b54ef4e9c0"],["/syntax_and_semantics/c_bindings/index.html","fd44a6eefbbb20268131ccf675d4ab6b"],["/syntax_and_semantics/c_bindings/lib.html","32f353ca1a18ee5e2c98b965dfb2637f"],["/syntax_and_semantics/c_bindings/out.html","b70ac3ee20a5f7e04535c0b8f6f3a755"],["/syntax_and_semantics/c_bindings/struct.html","9144dbae67c210514b8279ac1070eedd"],["/syntax_and_semantics/c_bindings/to_unsafe.html","6039e1c7466fcf06f2f0cda312f1819d"],["/syntax_and_semantics/c_bindings/type.html","314207027a91ad130933cadf631dce24"],["/syntax_and_semantics/c_bindings/union.html","86ab85f798122bd3b83a6e358f16d1e5"],["/syntax_and_semantics/c_bindings/variables.html","cfbb3c25ba4c67c2e675982150899485"],["/syntax_and_semantics/capturing_blocks.html","1edd0ca1cfe30f06cf94c6644231326f"],["/syntax_and_semantics/case.html","204b556b780f45ffd5583dc9c823baa4"],["/syntax_and_semantics/class_methods.html","8fb5629347ae0907f51bf7fe1608ded0"],["/syntax_and_semantics/class_variables.html","95425c8aa77a46f669d22b9eaf111618"],["/syntax_and_semantics/classes_and_methods.html","1d4a8c648ff626e041d8ecf32dedc27e"],["/syntax_and_semantics/closures.html","d69f70b53f29ee3ba909e456039a6974"],["/syntax_and_semantics/comments.html","7f4d91368801bf28d7bf4856d45f3312"],["/syntax_and_semantics/compile_time_flags.html","944fff315c23d6e6d3830145b41f4b10"],["/syntax_and_semantics/constants.html","80aeaa7999792408b45820268de5780a"],["/syntax_and_semantics/control_expressions.html","8529c45a788bde015a8631457dda783d"],["/syntax_and_semantics/cross-compilation.html","61ac19baee91491413add987b5c77066"],["/syntax_and_semantics/declare_var.html","c56b9cd3f39a0458579aaaf63822aa10"],["/syntax_and_semantics/default_and_named_arguments.html","d10615dbecff24cff56f241a5a2da4c7"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","ce23408481e2b05aa13506b5db9c6ee6"],["/syntax_and_semantics/enum.html","b4f159f3a86fbdcb54e5377d79ce50cd"],["/syntax_and_semantics/everything_is_an_object.html","c6c6db223bf962b49b526c1f7835be59"],["/syntax_and_semantics/exception_handling.html","422cc51f1a18af9405b0bde147de19ce"],["/syntax_and_semantics/finalize.html","79320e1365c93b6b761082b791489f64"],["/syntax_and_semantics/generics.html","80b5986b6fe86ee772cc243bb64591a3"],["/syntax_and_semantics/if.html","b83ca1b2f8835fcddf882ad5c3fdee96"],["/syntax_and_semantics/if_var.html","e379b69e24f7c4a526764372ebef72c6"],["/syntax_and_semantics/if_var_nil.html","4f95f7a914649ea39b053cf6c9066418"],["/syntax_and_semantics/if_varis_a.html","99f9418f395c59bf6bed11c0456b1ee3"],["/syntax_and_semantics/if_varresponds_to.html","c54bc54fa19df21fd052bd810823a023"],["/syntax_and_semantics/index.html","6493ac5e329a3a428c7203c0e4bca893"],["/syntax_and_semantics/inheritance.html","3029b5b79ef576de2c4cc3d80cffe703"],["/syntax_and_semantics/instance_sizeof.html","dd652009eccf891ac4d61a705dbf74fe"],["/syntax_and_semantics/is_a.html","6d9c24fdd27708ff6b367fb6a6403841"],["/syntax_and_semantics/literals.html","da9af3a85bfca7128fe622b282d09e6d"],["/syntax_and_semantics/literals/array.html","3fbb1708e502ca976b2c76fb4789b29e"],["/syntax_and_semantics/literals/bool.html","b6ffc9676bb2c0726a3eb33485eb0961"],["/syntax_and_semantics/literals/char.html","0805d061ee297205a6ac1581df9e8968"],["/syntax_and_semantics/literals/command.html","f5f4193b6568f1be6d014978f90d5535"],["/syntax_and_semantics/literals/floats.html","53e1b0462e6be470522b01de7e8cc257"],["/syntax_and_semantics/literals/hash.html","c7aedfcf280f96d4c8c7bcfea3fdf051"],["/syntax_and_semantics/literals/integers.html","c4a03236c6bbbb616b4a29081ebf147f"],["/syntax_and_semantics/literals/named_tuple.html","d3d20147ec0816f5674ccbd76ead5bff"],["/syntax_and_semantics/literals/nil.html","a9d32ea28d06cc631dd802d7861d5d44"],["/syntax_and_semantics/literals/proc.html","80c83845f6959a3986adcdfef9c81251"],["/syntax_and_semantics/literals/range.html","07a45287b255c131ef029aac84fa062b"],["/syntax_and_semantics/literals/regex.html","b872b59656a53a4bd020f010b6140576"],["/syntax_and_semantics/literals/string.html","0a2ddcdde34de44479a4e5a173690f3a"],["/syntax_and_semantics/literals/symbol.html","ee2e8dc3f96b8f0c6da6b166e580535e"],["/syntax_and_semantics/literals/tuple.html","bb8134eee00d292c4982c643297cc889"],["/syntax_and_semantics/local_variables.html","1497440c4c884b881cad9d2a974e7513"],["/syntax_and_semantics/low_level_primitives.html","caa843da290c5b8677d2ce361f9ef759"],["/syntax_and_semantics/macros.html","2b1c05e470ae0ba9ebac3e1e5eec83c8"],["/syntax_and_semantics/macros/fresh_variables.html","560604f0d7dbe503a1efa34e29f2033a"],["/syntax_and_semantics/macros/hooks.html","23164ac01bac00bbd1b545dbc016a602"],["/syntax_and_semantics/macros/macro_methods.html","667b8dbe06612869ef9511f35dee4d4e"],["/syntax_and_semantics/methods_and_instance_variables.html","ca05383affc6f9f7e47aa9fb5d33f70b"],["/syntax_and_semantics/modules.html","0cdf34c71b043e8b7b872b494252ae05"],["/syntax_and_semantics/new,_initialize_and_allocate.html","c26d75ddf894144467a18fc19bc2e320"],["/syntax_and_semantics/next.html","a4c5e9e760cb66fde567d4422c6c4eef"],["/syntax_and_semantics/nil_question.html","8e2da0817c26384d71a7e94afe09d1df"],["/syntax_and_semantics/not.html","116f6203a9234585d67a16cdec14c552"],["/syntax_and_semantics/offsetof.html","b1ae4cbb89225f51ca896946f6b01ad6"],["/syntax_and_semantics/operators.html","2e6196bb4570ce3c2ad0743c2669e756"],["/syntax_and_semantics/or.html","d6cd587672c77d8b1de98b2a13c9b725"],["/syntax_and_semantics/overloading.html","ee1b60b8836d3fdfb5e808a6e84690cd"],["/syntax_and_semantics/pointerof.html","74a4ef7db2d7db5af93897bc13960214"],["/syntax_and_semantics/proc_literal.html","b6c239a7c38e72bae27ebb65f339adac"],["/syntax_and_semantics/requiring_files.html","03438e8690dca5505af78dff5cf790b3"],["/syntax_and_semantics/responds_to.html","c77704ba3d5ba23e00a25aa08d38ebb4"],["/syntax_and_semantics/return_types.html","22d8ba85cf0a6761efa470b0b751ba61"],["/syntax_and_semantics/sizeof.html","a0f648e149ae8aabb115ae21419e1eee"],["/syntax_and_semantics/splats_and_tuples.html","033a97a32ed6ca2a9ed5c3e917e1b1b1"],["/syntax_and_semantics/structs.html","619a05a2396f6e6670ed2209c67406d1"],["/syntax_and_semantics/ternary_if.html","da1f5013cf786fd80a6147217a198966"],["/syntax_and_semantics/the_program.html","2592939fc512f653168d43fb97be7961"],["/syntax_and_semantics/truthy_and_falsey_values.html","7e82036d0da568d2ff1678cf22ef683e"],["/syntax_and_semantics/type_grammar.html","0f64163febf5d9faed1ff07620b72743"],["/syntax_and_semantics/type_inference.html","bfda5515707cf243ba7290739e6f727e"],["/syntax_and_semantics/type_reflection.html","3e7089942a4769b41c2b8d1424bb6d92"],["/syntax_and_semantics/type_restrictions.html","21847f609a620f32fa939fb070cb4a1b"],["/syntax_and_semantics/typeof.html","0951774788c3db071b69bd60e5131f60"],["/syntax_and_semantics/types_and_methods.html","f2c2669c572dae677711cbd9bf16999a"],["/syntax_and_semantics/union_types.html","43b5ce13956472752504dd85ea95cc11"],["/syntax_and_semantics/unless.html","01ef4c07b0a10cbfeb59693d03c1eeb4"],["/syntax_and_semantics/unsafe.html","9882a978d6e45bfae0295f850b2571e2"],["/syntax_and_semantics/until.html","1f2ea848b827bf79ff5955fa7e0c515c"],["/syntax_and_semantics/virtual_and_abstract_types.html","a02d062c7907ad54e63274c852871691"],["/syntax_and_semantics/visibility.html","2adba4ffb800d73043e31941613b6d15"],["/syntax_and_semantics/while.html","d62c9622a507add76b0377d7a338a60e"],["/the_shards_command/index.html","791cb452b7a18ef4f4fef7f81d817191"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","92eb11961147318c1b509413bef85778"]];
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







