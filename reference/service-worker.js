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

var precacheConfig = [["/conventions/coding_style.html","5c3c016c77da8c282f782b33ffdd6aef"],["/conventions/documenting_code.html","87f6a13892a4597224e24fb7a26c717a"],["/conventions/index.html","1c20a4cf365e6555764d0dcbc3e47773"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","a490311f391a4c71bbda7b434491876e"],["/database/connection_pool.html","8fe0492a08cc80cc44d61d26b1f83949"],["/database/index.html","e9d0563cb0b5f11721880afb192ec875"],["/database/transactions.html","c8be03e8f65381d8e840048e7480d1fb"],["/getting_started/cli.html","557844e66f0928691dc510e5f7762f10"],["/getting_started/http_server.html","28601f00a988a6092e1fb0b31d6b4050"],["/getting_started/index.html","fdc60c06ace6a667d032ffcffff2ace2"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","f1c7c4ca1954aa0252f51191c4695f71"],["/guides/ci/travis.html","3be3fa2c8d841804338da72ba22e46f1"],["/guides/concurrency.html","90f2dd04f6e881d951d77cac3d4a2590"],["/guides/continuous_integration.html","5d997cfc0f839a8494cf1378ef2694cc"],["/guides/hosting/github.html","a9acf994129490b1b65fdf75568db5b5"],["/guides/hosting/gitlab.html","e36f549be784f3ae938efdc278300e80"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","420118cba4f0e6bd34ce9e9f9ba4944d"],["/guides/performance.html","1dd8f05726d935280c15f275852eaf60"],["/guides/testing.html","9f3bd963a255edd3325be4b23bd7df47"],["/guides/writing_shards.html","d2444bf829b24f8510cb43e60a010de6"],["/index.html","ae09f03312dcda1a48664e90ff5a02ff"],["/syntax_and_semantics/alias.html","57d9213d10c2ebea6443549f4e597da8"],["/syntax_and_semantics/and.html","a375ce5e2312f00772b2c341d929d548"],["/syntax_and_semantics/annotations.html","e26f95d379198f5a1e208bf751908f0c"],["/syntax_and_semantics/annotations/built_in_annotations.html","d2ef59b302603c25e569526b63601bea"],["/syntax_and_semantics/as.html","b01cd5ed3c8faf1740549bd66e336002"],["/syntax_and_semantics/as_a_suffix.html","fd284df91a1aaf36ca85dbdb9b0b40fa"],["/syntax_and_semantics/as_an_expression.html","c83b7762e78bf688bed7db1635cbedf6"],["/syntax_and_semantics/as_question.html","2f6e0f9457d93c2655e6918c037fe150"],["/syntax_and_semantics/assignment.html","da5185a88e9e8d8a988e0b3fe1bfba84"],["/syntax_and_semantics/block_forwarding.html","35bd9ffd369125d552604ebc467bd656"],["/syntax_and_semantics/blocks_and_procs.html","50471b6d379a02c009ec2f6b19a27787"],["/syntax_and_semantics/break.html","c7bc48eafe4d856fcc40bdd04f685ed4"],["/syntax_and_semantics/c_bindings/alias.html","3e3a3edf26d4e3ea266db9288e645bf3"],["/syntax_and_semantics/c_bindings/callbacks.html","4c2c893781d87f49d7b6371b2ee4002b"],["/syntax_and_semantics/c_bindings/constants.html","1e39dfd1ea26e5a1421d702e58ee01e8"],["/syntax_and_semantics/c_bindings/enum.html","0d8084aea5ec76d02f8c7562846ad6e3"],["/syntax_and_semantics/c_bindings/fun.html","14aec08cce83ccaced8b567992ba10bd"],["/syntax_and_semantics/c_bindings/index.html","9651cf646518883587e200d013bf3c28"],["/syntax_and_semantics/c_bindings/lib.html","2b4937d7dbec50c3a4873367773bd4b5"],["/syntax_and_semantics/c_bindings/out.html","7aa6e525a6828036224ef761dd5047c4"],["/syntax_and_semantics/c_bindings/struct.html","2a0e73c593cadaf06fa7bb4bccbd1c6f"],["/syntax_and_semantics/c_bindings/to_unsafe.html","9690821009e827caa5f755699f20d212"],["/syntax_and_semantics/c_bindings/type.html","2d27427756bae6ba7da74d0394407fe5"],["/syntax_and_semantics/c_bindings/union.html","e757feccbe1d5518807ac65a9701b35c"],["/syntax_and_semantics/c_bindings/variables.html","fc93dc7ac2c914a12aa2e5135f5868a0"],["/syntax_and_semantics/capturing_blocks.html","932e8e2b76627aa406a386c6cf66294e"],["/syntax_and_semantics/case.html","54fbfbb4b597661d6251fb92c70f9cef"],["/syntax_and_semantics/class_methods.html","3030256e2669695ec78be803a9971578"],["/syntax_and_semantics/class_variables.html","4996dc00591b1e8a3bb0a1986a481a25"],["/syntax_and_semantics/classes_and_methods.html","840b8e3a27676a6a181265989ac8cefc"],["/syntax_and_semantics/closures.html","3ffc5adabb4fe02d8a23b3ab512fbd9d"],["/syntax_and_semantics/comments.html","bbdf6cb551394935362ff94b90212a59"],["/syntax_and_semantics/compile_time_flags.html","d6d37f67736bbe9db90fcfc65ed60bb5"],["/syntax_and_semantics/constants.html","9a48bf697dfa39ddff43bd3779170e4b"],["/syntax_and_semantics/control_expressions.html","e36904b89e026c22436a35c916746192"],["/syntax_and_semantics/cross-compilation.html","ae01ed7e0039df11427d7622f891e096"],["/syntax_and_semantics/declare_var.html","b2adfcdfe986a229ccaa4ea1c1cb458e"],["/syntax_and_semantics/default_and_named_arguments.html","cf80d635fa75d446aacef1fa5cbdfa6c"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","f67af7b332fee337fb6bcbc098c7a95d"],["/syntax_and_semantics/enum.html","56da0ff6adc0eab64b0547c759c1afa6"],["/syntax_and_semantics/everything_is_an_object.html","2103b9b1dbf196c2a56345a9869f624f"],["/syntax_and_semantics/exception_handling.html","c81398b109f83f51992300df7fbd259a"],["/syntax_and_semantics/finalize.html","a9799ecb7c8a9a9f62e96197c3006303"],["/syntax_and_semantics/generics.html","77869cc169321e26f6dd37d02e86d2b0"],["/syntax_and_semantics/if.html","57d6758c11532086c1e19e8d22598fa0"],["/syntax_and_semantics/if_var.html","3230631dceb8d278d089a9befe64e60b"],["/syntax_and_semantics/if_var_nil.html","bc948223d4df535b807df6159dd9bd2b"],["/syntax_and_semantics/if_varis_a.html","0811784ccb7bb97e4c9eb68befe47998"],["/syntax_and_semantics/if_varresponds_to.html","0da5199f94d2e56bf82db9a0e2cac75c"],["/syntax_and_semantics/index.html","103827b9b3b734d8b8ef2bcd762dae04"],["/syntax_and_semantics/inheritance.html","0678dabbefb16d69bf11899298724ef5"],["/syntax_and_semantics/instance_sizeof.html","1b5cd75191bbc698346665b45065fcc3"],["/syntax_and_semantics/is_a.html","bcb72f053f3c9d09411ec189b1da627f"],["/syntax_and_semantics/literals.html","b65616df12f130eaf8c1a44b84b238ce"],["/syntax_and_semantics/literals/array.html","003c6a1a0adbe59f7c9946dd09e11d3f"],["/syntax_and_semantics/literals/bool.html","4218f19dfa72b0eec3bb3e1864be88b7"],["/syntax_and_semantics/literals/char.html","5fd61c47a1238d7f4d06df835fbd7ff7"],["/syntax_and_semantics/literals/command.html","c249b3a22cfc3d23ee3031c29edcd6c2"],["/syntax_and_semantics/literals/floats.html","859147128adf0064a090ee1336a89569"],["/syntax_and_semantics/literals/hash.html","ae4baab4696957937b93571bcc909b3b"],["/syntax_and_semantics/literals/integers.html","11d286dcb3c7a205020607bd4ee4526f"],["/syntax_and_semantics/literals/named_tuple.html","a7a06d3fe94e2c832812d2469e8c7efc"],["/syntax_and_semantics/literals/nil.html","8fc986ac3c82da9808a137bd6c99977e"],["/syntax_and_semantics/literals/proc.html","272ae8354d2b8aeafb681fa3666427cb"],["/syntax_and_semantics/literals/range.html","4570bf4cecb3dbb9f063acc4a8f97e82"],["/syntax_and_semantics/literals/regex.html","d82ee4c5fa5cce018a8f8e114c23b887"],["/syntax_and_semantics/literals/string.html","de69743e3ee087a69f46e29e367088ed"],["/syntax_and_semantics/literals/symbol.html","8825e53bea98cd333466de2bdc8683d3"],["/syntax_and_semantics/literals/tuple.html","53c0548a01a5b57be93b26f48da58a74"],["/syntax_and_semantics/local_variables.html","7e51a5e259a803ff4341f7e69fa25126"],["/syntax_and_semantics/low_level_primitives.html","83b3b4302b9dc5b5fe2c9ff2611a0352"],["/syntax_and_semantics/macros.html","4cf9f530de95e678d926285511bd9c6c"],["/syntax_and_semantics/macros/fresh_variables.html","553f2ef512e11672249096c4712c759e"],["/syntax_and_semantics/macros/hooks.html","bf906762269d7d80310e84bbc839d44a"],["/syntax_and_semantics/macros/macro_methods.html","0ba2227b587a733b336ddf032eca42ec"],["/syntax_and_semantics/methods_and_instance_variables.html","0aaba1e557e37bd3b8bc488e2b505a04"],["/syntax_and_semantics/modules.html","c9bc37c2ba2eac467ef85c08597ce834"],["/syntax_and_semantics/new,_initialize_and_allocate.html","8f698f0736288565227d506adff75d38"],["/syntax_and_semantics/next.html","aadf88307ab6929a17df729945a50882"],["/syntax_and_semantics/nil_question.html","0231118b54926267b8702adec22f2168"],["/syntax_and_semantics/not.html","6bd73124d5637301061797df1776eb63"],["/syntax_and_semantics/offsetof.html","10fb383b8f9771051efec10f9c359f82"],["/syntax_and_semantics/operators.html","5becfe6b945a3f03db6a4cc2173dfe95"],["/syntax_and_semantics/or.html","595eb06e11faa01e518b0a0f49b273db"],["/syntax_and_semantics/overloading.html","775df1ae06ddfcb15b8de8d87e65ac71"],["/syntax_and_semantics/pointerof.html","b7292b0deeaddf1d1c25b8ac2abed83b"],["/syntax_and_semantics/proc_literal.html","02a6aea723b7904fc03e9d14e8b29189"],["/syntax_and_semantics/requiring_files.html","b744260f1230a82a79a76b85d0938f66"],["/syntax_and_semantics/responds_to.html","e941b9856e73942c6b7d2bdb6e4b7604"],["/syntax_and_semantics/return_types.html","004347fa419fbd06b126fb190168f532"],["/syntax_and_semantics/sizeof.html","4db499921a8adf7ea8b5a978a975afbd"],["/syntax_and_semantics/splats_and_tuples.html","c12a3f04219b78c0e307e65b5c4a1ec8"],["/syntax_and_semantics/structs.html","d9979322a3637eab6793a7bfa1d2d658"],["/syntax_and_semantics/ternary_if.html","cfa477199bbd998006eed183f08bcb67"],["/syntax_and_semantics/the_program.html","69beb05e5a11bb22617b8b4720bf7c06"],["/syntax_and_semantics/truthy_and_falsey_values.html","af0aa33648842f2f64b6de3bbfbfa90f"],["/syntax_and_semantics/type_grammar.html","00116b0a48b406b30b41d4d24f5035f4"],["/syntax_and_semantics/type_inference.html","0b2852b25f934eb89068c0fc0c543eed"],["/syntax_and_semantics/type_reflection.html","b3c1025d59f9eddc5d6e2bf4cf3bf43e"],["/syntax_and_semantics/type_restrictions.html","9e54bb50474d74d4d4afc669386f8499"],["/syntax_and_semantics/typeof.html","d13a876c2540989c5882b2045d47f5c2"],["/syntax_and_semantics/types_and_methods.html","89a68915602dd48978e3e189e29cbfe7"],["/syntax_and_semantics/union_types.html","a85662ff0efca4927b153a7264de952b"],["/syntax_and_semantics/unless.html","6890369dc9d60d075fc8644fd655b424"],["/syntax_and_semantics/unsafe.html","4f7e2005e009176d4788d184ed850ee5"],["/syntax_and_semantics/until.html","fbe547f411681b6399c67ff9e5bafff4"],["/syntax_and_semantics/virtual_and_abstract_types.html","9be57e0acf971c43d3a016fe57c7ce3c"],["/syntax_and_semantics/visibility.html","a2b316e115cf06976939495ef2c49e96"],["/syntax_and_semantics/while.html","33028b4a39448778141c25bcf9dd783c"],["/the_shards_command/index.html","add0bc601d1141ec4da67f7edd81fa45"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","3be0269541e78913f4e7448c725f74b9"]];
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







