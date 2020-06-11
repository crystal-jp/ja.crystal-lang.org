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

var precacheConfig = [["/conventions/coding_style.html","40afceaa3ed4d9b6d5224d9effeb0dce"],["/conventions/documenting_code.html","38577e803fcf37dc7fc03126e94330d6"],["/conventions/index.html","f85f42aa7fe2f248605979594d5a9349"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","b0c380105a7b696525182e6588f18c19"],["/database/connection_pool.html","aa65b3a278895a23e7d0e4594082e1a9"],["/database/index.html","fb633aada00e7f92bc2407994aeb3904"],["/database/transactions.html","af09cca9750d0e5fa67a7d2ef4155eda"],["/getting_started/cli.html","489bb0280d59810538bdf49acf9c1928"],["/getting_started/http_server.html","b4eac09987996f64aa67c7c1080ecb80"],["/getting_started/index.html","e50a7144ea8ad6932b591b5f0bf973eb"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","da91729df6414ad48f3a083c653a8777"],["/guides/ci/travis.html","2ab9835a764894871d3cc101802500d1"],["/guides/concurrency.html","6db8fad4bdd145e95bef9daaa9c83f32"],["/guides/continuous_integration.html","2596def013c8ca28da767ba5090acb3e"],["/guides/hosting/github.html","d23257cc9ce8b11d3019abf078db5b8f"],["/guides/hosting/gitlab.html","a2d61d5077fa798bdbc1bfe20469d4e8"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","518899dc19a3152a91b06fe39a02a7dd"],["/guides/performance.html","86299286a66c729b96293b7ef4677d9a"],["/guides/testing.html","5916a6551f3607c20bbcfd078b639a00"],["/guides/writing_shards.html","8e107865ec9a316e124f738cd48c463f"],["/index.html","999a6084aeb30dca87a9a0ef52c2f0ec"],["/syntax_and_semantics/alias.html","ded70a0d408828100afa09b62c81cefa"],["/syntax_and_semantics/and.html","de6d97099b3806818b5e7201aec81a04"],["/syntax_and_semantics/annotations.html","190015f48b7ff21e1e72fe596f38f6fa"],["/syntax_and_semantics/annotations/built_in_annotations.html","74acf84309f161f8d6cf2b4903df2992"],["/syntax_and_semantics/as.html","f591f6c0587aadff98d9234098af0f27"],["/syntax_and_semantics/as_a_suffix.html","c522102670d68b5374b1d4ee97d64552"],["/syntax_and_semantics/as_an_expression.html","c986fb0f8b18d1dc73356f3719bc21db"],["/syntax_and_semantics/as_question.html","0691ab79b4ef387aef0ccf1f5c7eda7b"],["/syntax_and_semantics/assignment.html","c3bf60cbbf592a5f6289c9f01dd84b38"],["/syntax_and_semantics/block_forwarding.html","80d8b257143db37ef2231a62592b4b12"],["/syntax_and_semantics/blocks_and_procs.html","74696f3ee771de76b34f2a406fa0e9a4"],["/syntax_and_semantics/break.html","a1c5d4b0c18f1ff5eb43af96bb9f6ec6"],["/syntax_and_semantics/c_bindings/alias.html","e31701951f65734b64752a13d35b3767"],["/syntax_and_semantics/c_bindings/callbacks.html","fa338238ff2f79dd85a3ac736bf7443f"],["/syntax_and_semantics/c_bindings/constants.html","6162d8a17832ddf2af739a7e68dd22a9"],["/syntax_and_semantics/c_bindings/enum.html","1081fd6e1839d3e2e34fb9bb67f3ac1c"],["/syntax_and_semantics/c_bindings/fun.html","b2108fbbf6e0b7c4d68120879f4185b3"],["/syntax_and_semantics/c_bindings/index.html","1151350d0f5d063aab4bf42db422619f"],["/syntax_and_semantics/c_bindings/lib.html","0997d055a56a38679d8caa8e4a3805e9"],["/syntax_and_semantics/c_bindings/out.html","7ea92fe15d53d2de2ce06e70fed07404"],["/syntax_and_semantics/c_bindings/struct.html","27cf1a5d05ac0709b3887f0f77096073"],["/syntax_and_semantics/c_bindings/to_unsafe.html","cbc1083e78a73fd31fc18a0b6f7968ac"],["/syntax_and_semantics/c_bindings/type.html","6d57f20b9a53984a8de6e23b17da2c9b"],["/syntax_and_semantics/c_bindings/union.html","9b7756bac41126bc5b11a155a3860f48"],["/syntax_and_semantics/c_bindings/variables.html","ccb36bfc2e4a92020d9717bea69ab51a"],["/syntax_and_semantics/capturing_blocks.html","6ea35d2fde4c8ac9696bd6d9665f9b98"],["/syntax_and_semantics/case.html","191fe81bb5bf5175020a579aaaef206f"],["/syntax_and_semantics/class_methods.html","c2c5131311d4d44b1ea862637e5361b9"],["/syntax_and_semantics/class_variables.html","3ee429231b6356cf941710c9f5b855b8"],["/syntax_and_semantics/classes_and_methods.html","957efea03ba7327d508c7b4950dae005"],["/syntax_and_semantics/closures.html","b44b8adf8113d8df9654ed20d72c05e6"],["/syntax_and_semantics/comments.html","b4bfbde2972a9ede2bc02d97816a6982"],["/syntax_and_semantics/compile_time_flags.html","c1a49148933772cf5021872d05ce0d21"],["/syntax_and_semantics/constants.html","9618997bf1e6908472ebaf213598798c"],["/syntax_and_semantics/control_expressions.html","298e84faf35ee222281e8cddb7bef6ca"],["/syntax_and_semantics/cross-compilation.html","aefd7106ba518d27cf274e8043fa1af3"],["/syntax_and_semantics/declare_var.html","c966c50579f78d717996ab2b016e4999"],["/syntax_and_semantics/default_and_named_arguments.html","eb57eb729bf37cf0c380c55714f916fc"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","04b581fc8ce76e1014634b1d95910737"],["/syntax_and_semantics/enum.html","b04c001a9af34a8876d522dfabd24cfc"],["/syntax_and_semantics/everything_is_an_object.html","02e5d1d903ffd2c9958cc2f0a9d04ba4"],["/syntax_and_semantics/exception_handling.html","8868b39e2782f45676b333c4f7aa125c"],["/syntax_and_semantics/finalize.html","f65c70c1d29613dc4d18be35481974a9"],["/syntax_and_semantics/generics.html","ad56d4ac6a86a35d1d2f8b1c7d36318e"],["/syntax_and_semantics/if.html","616f9b8352f4f25695bfd82f20ca76d8"],["/syntax_and_semantics/if_var.html","c4970b91425553ffd80a27d605e28244"],["/syntax_and_semantics/if_var_nil.html","23b7ba15e06b7cc7e26c8c6cd2be73c0"],["/syntax_and_semantics/if_varis_a.html","d896b84b5c5e0832dee685e98f58f558"],["/syntax_and_semantics/if_varresponds_to.html","89b30e4983ee01447e50a4575a926699"],["/syntax_and_semantics/index.html","8b2c6fd326d7cc256ea91b0ce5af4bda"],["/syntax_and_semantics/inheritance.html","0f66d2beae5f503a0fb2b7f6b9204016"],["/syntax_and_semantics/instance_sizeof.html","ad517bc436529b61a48dbcc6f66a43b0"],["/syntax_and_semantics/is_a.html","f61cd6071ba65aa78c4d05155de6ec8b"],["/syntax_and_semantics/literals.html","e430f280f14b9b73579e9a48e9e439c7"],["/syntax_and_semantics/literals/array.html","eb0ffac02aeba8e004fe1bf07424f8fa"],["/syntax_and_semantics/literals/bool.html","99fd08b5af80049076e94bb185d8db2e"],["/syntax_and_semantics/literals/char.html","2bfd1e2269bdc715bd02b1e01b5a7e0e"],["/syntax_and_semantics/literals/command.html","9dc143858e72768d19f5cdd99f86cb9c"],["/syntax_and_semantics/literals/floats.html","2362aef9a2b3fb94915b28acf1766706"],["/syntax_and_semantics/literals/hash.html","cc6b71d50549fc6946dc21b542e548b1"],["/syntax_and_semantics/literals/integers.html","6e4c282ec4cc30288e3bf84e36651166"],["/syntax_and_semantics/literals/named_tuple.html","ec4f0fd27c452ac5e14c5922e09b3f9b"],["/syntax_and_semantics/literals/nil.html","6f56e675248639fd43f228cae2290fb8"],["/syntax_and_semantics/literals/proc.html","54fda858b09fc65f5308af313283f5a2"],["/syntax_and_semantics/literals/range.html","35321c10e698cdaa49f1cacfdf58f5f4"],["/syntax_and_semantics/literals/regex.html","72d1d3dbe5a789d08806333a100c1da8"],["/syntax_and_semantics/literals/string.html","ffb5d30f84738c5ac1132dce65fb0a3c"],["/syntax_and_semantics/literals/symbol.html","8772e7d63af04cea1b13978df302a67f"],["/syntax_and_semantics/literals/tuple.html","9848f80bbc23d91c4e5895ad8602d899"],["/syntax_and_semantics/local_variables.html","a126c771bb02e441688600bb44ae841c"],["/syntax_and_semantics/low_level_primitives.html","66a1a689c882c40e14fa16d46e6a373d"],["/syntax_and_semantics/macros.html","cf1c1a049186366e5927aff2e3a782f7"],["/syntax_and_semantics/macros/fresh_variables.html","372d5c47f57bf56f1f2e1091ace712b8"],["/syntax_and_semantics/macros/hooks.html","5872b51ee414aec86e9a9b8f96125fdd"],["/syntax_and_semantics/macros/macro_methods.html","1fed959411f02f3d37704cfb45b49e7d"],["/syntax_and_semantics/methods_and_instance_variables.html","8dcc750d12fd77340404ea518e1f236b"],["/syntax_and_semantics/modules.html","ba6afab906a7252e034c14e2520c9f8d"],["/syntax_and_semantics/new,_initialize_and_allocate.html","37ffbd7fcff63b1f839591c0911912ac"],["/syntax_and_semantics/next.html","3f4ed550380f0d418fe42fe2cb079127"],["/syntax_and_semantics/nil_question.html","5dab96baeb1255d48b62147b252f89c0"],["/syntax_and_semantics/not.html","eaa4d6bb65d73f7afc89dfa428a599a7"],["/syntax_and_semantics/offsetof.html","fe8f8957a7c9ceaf1c123aaab26e0fba"],["/syntax_and_semantics/operators.html","74320d352bdbe2bb7e2a7bc0277e4367"],["/syntax_and_semantics/or.html","7838b419b0f369abbe1266ddf50373ee"],["/syntax_and_semantics/overloading.html","e8e45de37f39c03fbb2e8e2088acbd03"],["/syntax_and_semantics/pointerof.html","5b5506a6e200ecbe9c5c5ed4e87d5978"],["/syntax_and_semantics/proc_literal.html","a7f2553b627489b323b24d452555e803"],["/syntax_and_semantics/requiring_files.html","981123887e614b1fd8e6dd4dcbb8cde8"],["/syntax_and_semantics/responds_to.html","7c0605762df19740294527d61ee7116b"],["/syntax_and_semantics/return_types.html","40c8c416daf76627b1fcd01aa7ab0346"],["/syntax_and_semantics/sizeof.html","9433062d4dfd4db450584fc5e2cf6051"],["/syntax_and_semantics/splats_and_tuples.html","766142ec180f52365a6a97c0d213b20b"],["/syntax_and_semantics/structs.html","37fc7085e95dc7c6005bea9b71f0acce"],["/syntax_and_semantics/ternary_if.html","04b982440cab2d65a05004f4c63f8a56"],["/syntax_and_semantics/the_program.html","91accd97543dec6d997519f7500ff490"],["/syntax_and_semantics/truthy_and_falsey_values.html","df31c335242840f794f2be890555d955"],["/syntax_and_semantics/type_grammar.html","341a62e6d09fe82d4d0a19e614dabbd8"],["/syntax_and_semantics/type_inference.html","9a6b609fde46fe802328c74af662ac9f"],["/syntax_and_semantics/type_reflection.html","3d7995aef8936d39581b3ba1062dcf4f"],["/syntax_and_semantics/type_restrictions.html","5b7f587759f4ae6b8ce9fc75216b7d68"],["/syntax_and_semantics/typeof.html","f6dd826b4ec1a6f620474c5ade0aff87"],["/syntax_and_semantics/types_and_methods.html","456868e07ea56ee95f1076aefb657172"],["/syntax_and_semantics/union_types.html","4e8a20e363578dce23f9d14334326fe7"],["/syntax_and_semantics/unless.html","822aad2f00d9d773477ca83e0324007d"],["/syntax_and_semantics/unsafe.html","050e19001d5dfc780ba17f46439d989f"],["/syntax_and_semantics/until.html","8637a6a973d0bae6672b0b9e2abe80fb"],["/syntax_and_semantics/virtual_and_abstract_types.html","7dd941269a0595a5aaa4f560177f3249"],["/syntax_and_semantics/visibility.html","0b30aa9a2235989da99b06357b44c548"],["/syntax_and_semantics/while.html","676f7b36be5484c8328bf65b27db98b1"],["/the_shards_command/index.html","14b232c1a2c20b355af80cc354c8e6d3"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","a28532b543ad7ba7aa0eedddc5355f17"]];
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







