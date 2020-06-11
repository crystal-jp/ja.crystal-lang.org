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

var precacheConfig = [["/conventions/coding_style.html","b2282829351ae2b25cc31df110f74d86"],["/conventions/documenting_code.html","1c0eb127254ee551c14024251621b4f7"],["/conventions/index.html","7a894db27260a401525822e2de91a2ec"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","2a9af9cc4b446a2b0a3313171d265e40"],["/database/connection_pool.html","e522ad407a3454250deca9446a553a79"],["/database/index.html","24dd8ec72cd91f5f9fc7debdefd17494"],["/database/transactions.html","692487fd99f6abc8f936cca4824ce285"],["/getting_started/cli.html","11888f591da2a2dd69f084a52d6505a8"],["/getting_started/http_server.html","9253549a13299832a46f929f31e7a020"],["/getting_started/index.html","cd7f7ea050853a9fe7d56e0ba379eec9"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","32d803eff524572dd95c7aa77c8572bd"],["/guides/ci/travis.html","7cb027423e8b369996b46f43be2c8e18"],["/guides/concurrency.html","0cd702e5f81d748d978458b193d56397"],["/guides/continuous_integration.html","0b63cb4d7ece5e58ddb46a701b7d3bb8"],["/guides/hosting/github.html","8a9a1df01c102f2e57ad92113164f28c"],["/guides/hosting/gitlab.html","029424a23d06e6d362b4ef73f8451d82"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","7f115883331b032a56bc04eae46d0730"],["/guides/performance.html","0abb46717444fb9d28f1b31387e46afc"],["/guides/testing.html","160a5cbee5046f4bf9fd3a24f14cce48"],["/guides/writing_shards.html","04618d25e6788c0a1385768c22fb348e"],["/index.html","1847c35317a053e1e5f8e605ea629a7e"],["/syntax_and_semantics/alias.html","86ac240b95efd96973e6d9a72de980d2"],["/syntax_and_semantics/and.html","98165ab4c7cf68fa0d561c0016fc950d"],["/syntax_and_semantics/annotations.html","3d8c46534e0a5fc61219dd41d6e87ec5"],["/syntax_and_semantics/annotations/built_in_annotations.html","3b11ffec3a162e5d1023c54409766af2"],["/syntax_and_semantics/as.html","110ed6875da672df560f2939ed4e3e99"],["/syntax_and_semantics/as_a_suffix.html","33131972951f5caf20b6068d9c1e757a"],["/syntax_and_semantics/as_an_expression.html","39aa5a23f42a19db9f9f710c6008058e"],["/syntax_and_semantics/as_question.html","743e3f6e410662510d6e4ebfa79aff1b"],["/syntax_and_semantics/assignment.html","9052e741ff5c415091bd29b37209f67c"],["/syntax_and_semantics/block_forwarding.html","65cd45942c4803d74552f08e3b0e73f8"],["/syntax_and_semantics/blocks_and_procs.html","7e07153017ae1057479a7cb6c3838daa"],["/syntax_and_semantics/break.html","9ba9b40c3d77d319ff453925c963e752"],["/syntax_and_semantics/c_bindings/alias.html","4b0b95134012af9e61a423a1fd01e213"],["/syntax_and_semantics/c_bindings/callbacks.html","65b368c3a77f7a6e5d8264daafaee402"],["/syntax_and_semantics/c_bindings/constants.html","131ea3084982b83639896d90593d7753"],["/syntax_and_semantics/c_bindings/enum.html","cf43eaaa9fb947fb14e1e018a790fc1a"],["/syntax_and_semantics/c_bindings/fun.html","b5504eb1c11402fa88639290f093fdd1"],["/syntax_and_semantics/c_bindings/index.html","f7bf0870bf6e0c0c0d3b35b19350085f"],["/syntax_and_semantics/c_bindings/lib.html","fd71f3ebc40c3bebf35a8180141c6e95"],["/syntax_and_semantics/c_bindings/out.html","8688c85f677be27b36ee89b80c0ab1e2"],["/syntax_and_semantics/c_bindings/struct.html","106aa293a063b6d89d7101053a670810"],["/syntax_and_semantics/c_bindings/to_unsafe.html","f3f714233f4a01c8622f78838acd4b3e"],["/syntax_and_semantics/c_bindings/type.html","81588639988c9adf81ee7521ee027db0"],["/syntax_and_semantics/c_bindings/union.html","9d3c7543400c41fe69f82d7f3452b50a"],["/syntax_and_semantics/c_bindings/variables.html","4d888eaa1cb83a926591d0e291df0a59"],["/syntax_and_semantics/capturing_blocks.html","597b54c6ef369f0d7a26e6287d468d59"],["/syntax_and_semantics/case.html","999e4aa077ac095b231c78b2e6d62135"],["/syntax_and_semantics/class_methods.html","d6c9b987ed79c4b0f8ed162461f121d0"],["/syntax_and_semantics/class_variables.html","4787568a91c0db78e82ca5b372117d50"],["/syntax_and_semantics/classes_and_methods.html","7412685822b0cfd329be1733a833c3fc"],["/syntax_and_semantics/closures.html","2ef135459c2d71ee8a824d5fdaaf0ff1"],["/syntax_and_semantics/comments.html","c30f8e306c7eb7679c4f6914fe7432d0"],["/syntax_and_semantics/compile_time_flags.html","eda2c2e7689ca87ecc757a8d60d84da7"],["/syntax_and_semantics/constants.html","5808e5325c35eb791790045f643e8b8a"],["/syntax_and_semantics/control_expressions.html","3cfef9daaedf694a454377f85e225c10"],["/syntax_and_semantics/cross-compilation.html","06ce1289dada8e8b2db205a76dbbb470"],["/syntax_and_semantics/declare_var.html","2c9ea312ae37df74e79851058e9a0ba9"],["/syntax_and_semantics/default_and_named_arguments.html","38f7995c59d9d8b4cb906336e218d0ae"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","170ef9ea552ffb013d72b3414732e045"],["/syntax_and_semantics/enum.html","82f7df2a5768661adfd18f183d8e392e"],["/syntax_and_semantics/everything_is_an_object.html","b836c6bfdd3d6492812388a142d53028"],["/syntax_and_semantics/exception_handling.html","e5acefc24002e69122fc8339a78e71b1"],["/syntax_and_semantics/finalize.html","7226c4cc0d8e1ec11c90f73764bb6e42"],["/syntax_and_semantics/generics.html","3b36a4958c1a7f8a78a4c6cd30c81002"],["/syntax_and_semantics/if.html","ca558ca45cc454a164b81a215ada59a7"],["/syntax_and_semantics/if_var.html","300ad61d8f66c0f50a4952f695504d03"],["/syntax_and_semantics/if_var_nil.html","36b5230f548094a8481c035ca3ecc5a1"],["/syntax_and_semantics/if_varis_a.html","b688f50cb892e1c379300a19c69fd3fd"],["/syntax_and_semantics/if_varresponds_to.html","b4599dd9c0484ff18c4677e028ddec51"],["/syntax_and_semantics/index.html","8ae4ec23ede7401e749e081609aebd61"],["/syntax_and_semantics/inheritance.html","bb50d794e06bb5457e8bafb4421706b8"],["/syntax_and_semantics/instance_sizeof.html","12c2d778a2998daad5eacc61fba45ca2"],["/syntax_and_semantics/is_a.html","6aac0ce9ddaf4b8c2a770b1ec5bfa594"],["/syntax_and_semantics/literals.html","adb62f9cef458acdd9ae78f52a60fb4d"],["/syntax_and_semantics/literals/array.html","ee35de4c0221964763d82dadef511887"],["/syntax_and_semantics/literals/bool.html","3201bed7dca4529301795ab674809968"],["/syntax_and_semantics/literals/char.html","bb721e27e3b72e52f0e5c7c18b8aeba4"],["/syntax_and_semantics/literals/command.html","0e5c21d640ae941bc0f60587430eaa0e"],["/syntax_and_semantics/literals/floats.html","38d061f0866304bb990606a82f5065b3"],["/syntax_and_semantics/literals/hash.html","f6fa3f814e942d6d525a43f23bc89d58"],["/syntax_and_semantics/literals/integers.html","86a1bd75206b7341fc911661606a8b52"],["/syntax_and_semantics/literals/named_tuple.html","9f9356f11e0576e1a2d705c5adf6bbf2"],["/syntax_and_semantics/literals/nil.html","e1d17a78e49cb207a942f2a328e9df3c"],["/syntax_and_semantics/literals/proc.html","2bbc3da6d2c62b0336731b3628cedab7"],["/syntax_and_semantics/literals/range.html","5e773b06d5e7c13663a44d979ea60ac7"],["/syntax_and_semantics/literals/regex.html","10fe3b01a4ff056373b790c5f08def79"],["/syntax_and_semantics/literals/string.html","077cf849b45ddedb2358844c3df9b55b"],["/syntax_and_semantics/literals/symbol.html","25cb61c3b01902254c227868915f6196"],["/syntax_and_semantics/literals/tuple.html","c117d0415b879d9f2ea55dae0b34f0ed"],["/syntax_and_semantics/local_variables.html","24175d6daab9e12ff6e77f4ffa79a585"],["/syntax_and_semantics/low_level_primitives.html","0d659720bd4520c4866d4f06fd939963"],["/syntax_and_semantics/macros.html","1dabf299a833e55e698a79598ef22be8"],["/syntax_and_semantics/macros/fresh_variables.html","c2a9a9672b915514b4376ba7704d1a85"],["/syntax_and_semantics/macros/hooks.html","36b571d71911391611d79c5aec4777b6"],["/syntax_and_semantics/macros/macro_methods.html","6f2c95209431b7408a1e61c16e539507"],["/syntax_and_semantics/methods_and_instance_variables.html","c9201cd991a25ab4b4ef269484a60670"],["/syntax_and_semantics/modules.html","1234a40d6bdb7d45329d787e1eb5d77a"],["/syntax_and_semantics/new,_initialize_and_allocate.html","f9f4b3909a23c472a0644fd2c79be3cd"],["/syntax_and_semantics/next.html","0ef1a643b51c2beda8bb2cf98c41520d"],["/syntax_and_semantics/nil_question.html","73a3798aa447679fd80a926b4b5ef9cb"],["/syntax_and_semantics/not.html","254ec69716c3ca6bcfd395e8c4a4d5d6"],["/syntax_and_semantics/offsetof.html","3ea00a9c1323d07fc1ba676a4eacef0c"],["/syntax_and_semantics/operators.html","d9731734549ffbfd06aa972d32ad296a"],["/syntax_and_semantics/or.html","c781dda5b1dd1012295d37814c0afb9b"],["/syntax_and_semantics/overloading.html","1fb1aa3c4dc89eccabe6fef79acf2c1c"],["/syntax_and_semantics/pointerof.html","aa6247e9ac6d861f6557f712c933479c"],["/syntax_and_semantics/proc_literal.html","baa898320ae6f51bd59c7326c3e6a219"],["/syntax_and_semantics/requiring_files.html","90bcb554044905ddabf362f804b31370"],["/syntax_and_semantics/responds_to.html","854ce5b1fbb3385cc59a10ec32ff852e"],["/syntax_and_semantics/return_types.html","2e30b35e5180b54aee01378f24da1802"],["/syntax_and_semantics/sizeof.html","5884c858af92c42fe02dfc0de807379e"],["/syntax_and_semantics/splats_and_tuples.html","f7d1dc3353e34a34e984b7c53b71490f"],["/syntax_and_semantics/structs.html","8abd09098b174677eda5701858ec8c00"],["/syntax_and_semantics/ternary_if.html","4ff11e09f4d73371e7d36713bcc2326c"],["/syntax_and_semantics/the_program.html","15f1de94106bffa4b9510044bfcd2311"],["/syntax_and_semantics/truthy_and_falsey_values.html","f0385488a82aa50c51411d1cfb3141b2"],["/syntax_and_semantics/type_grammar.html","188a7d3e6b2b66e6086ec95e00335a15"],["/syntax_and_semantics/type_inference.html","aa8652c2ba9de6a0a08f4b37716cc274"],["/syntax_and_semantics/type_reflection.html","f5b74dbac3d9d00f6884127272f68ef2"],["/syntax_and_semantics/type_restrictions.html","a3e604faf6f8d95037ed163f177fc895"],["/syntax_and_semantics/typeof.html","a0538cad6cf9c4496977ca4c89b4c7a2"],["/syntax_and_semantics/types_and_methods.html","684309a3f25172ea10c5edfdef7d7e5f"],["/syntax_and_semantics/union_types.html","d59e509cd8a9058ed8d0cecdd061d38c"],["/syntax_and_semantics/unless.html","ac62aa50437c3795d0da15738e4e775f"],["/syntax_and_semantics/unsafe.html","78bc6b71d8a5ddc43f0c3c81b9b09bd3"],["/syntax_and_semantics/until.html","5d30a6d8d7280dcb526f87ef35b2ae28"],["/syntax_and_semantics/virtual_and_abstract_types.html","d87d42172493494db4b2111ae10ad730"],["/syntax_and_semantics/visibility.html","84c94c31630c932ab1b581aa10394329"],["/syntax_and_semantics/while.html","0ce648eeb07f4389469c564e4b06e9c2"],["/the_shards_command/index.html","8bb9d07a4a43243c7a6c8ac48d0f1ee7"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","7ffc8f4264fa1c5a76044885e4881785"]];
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







