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

var precacheConfig = [["/conventions/coding_style.html","e3c7067b4132b704aab4f3a41ac9da72"],["/conventions/documenting_code.html","2e0386c6f72ba635509b7389e3a8c29d"],["/conventions/index.html","e9bb1c1d2e8f0bb8827b0016db163203"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","ff92341c1b3194d031d9abb2ab920da8"],["/database/connection_pool.html","59bd470ee1bf69e3d9e961f2ac30a0e9"],["/database/index.html","5a28ccb2db37a258cd4fb01f44a06b19"],["/database/transactions.html","0dc4a1ef247aa1f56e7e8691b2858213"],["/getting_started/cli.html","baa45ead8744ffe8e52c2f5147ddff72"],["/getting_started/http_server.html","315e904942438cbf952f3280835a6521"],["/getting_started/index.html","8683bec42088e2923fe4a44c55919ac3"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","51150e7d8358755441652db80159fd9d"],["/guides/ci/travis.html","02a34af7a4493d0451518f1686b5f1bb"],["/guides/concurrency.html","df85af021f6f857ce6f1045c40fd5958"],["/guides/continuous_integration.html","525ba0671b1559b427ff37e7c3acd5b2"],["/guides/hosting/github.html","0de2a3eb2b0f858f07b184cf7f5870d4"],["/guides/hosting/gitlab.html","a779402519c2dbc2acf3f79c60688d47"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","66d9b4c6a4aaef4d138ba2942ea9e1ac"],["/guides/performance.html","f777acca4f61a403a88917e21598258a"],["/guides/testing.html","ac2a215493ee80aad526d9b8b060deba"],["/guides/writing_shards.html","52f219db979da221fadf2e9db23cfd1f"],["/index.html","ac998a1bdfc07601dba03fab46018a4c"],["/syntax_and_semantics/alias.html","dcadbb7c500d91a69d6434f333e1b27f"],["/syntax_and_semantics/and.html","078948153d2b29a3bcf9de9da1d0f69d"],["/syntax_and_semantics/annotations.html","ee4911eb2dc42695adb19895578ba37f"],["/syntax_and_semantics/annotations/built_in_annotations.html","8434786cb4fe88d5975f2564bd315ae3"],["/syntax_and_semantics/as.html","02dc35975ed43578e312be72958f1ff9"],["/syntax_and_semantics/as_a_suffix.html","20cc7ea120b8fd10ecf504e540a59d23"],["/syntax_and_semantics/as_an_expression.html","dca8f675f6ee611971abdf3c37d7dca6"],["/syntax_and_semantics/as_question.html","5488c6939b646e7d46f878d1e9611c56"],["/syntax_and_semantics/assignment.html","db6167ae84bafb35b518ea378f2d232c"],["/syntax_and_semantics/block_forwarding.html","86882e29651f7ede01ac9a739e2fe958"],["/syntax_and_semantics/blocks_and_procs.html","edb729a5e5fef7f236fbfc808988ad54"],["/syntax_and_semantics/break.html","efb80a5b0e2435bdac7ddf33ff9094ce"],["/syntax_and_semantics/c_bindings/alias.html","77abd13d0d556dd1ae4685de804c893a"],["/syntax_and_semantics/c_bindings/callbacks.html","83e8e0ef9786b36b98132bdb65d3fe46"],["/syntax_and_semantics/c_bindings/constants.html","7338e2801ef8445e520b0206d77600ff"],["/syntax_and_semantics/c_bindings/enum.html","e9b3f9c92b17b1b455745197b129d9db"],["/syntax_and_semantics/c_bindings/fun.html","5e459e966486f2971bcb9b28baeee417"],["/syntax_and_semantics/c_bindings/index.html","eb9d8bac3e9f423c42a6abf65bbcf7cf"],["/syntax_and_semantics/c_bindings/lib.html","293001b51b5dcfe924a356164099bc1f"],["/syntax_and_semantics/c_bindings/out.html","eb14df26202a95d3c3470a4a925ef0c8"],["/syntax_and_semantics/c_bindings/struct.html","47d9c0f12925cbd29b1232683a07a8d8"],["/syntax_and_semantics/c_bindings/to_unsafe.html","5d71decda32268123d296a1e8f3e1503"],["/syntax_and_semantics/c_bindings/type.html","3a6f28fab2149bdbe5e93e6cf9125e15"],["/syntax_and_semantics/c_bindings/union.html","c4c8c2efe545af2ca7134dc06cf2f3dd"],["/syntax_and_semantics/c_bindings/variables.html","533da03b5af952310d4e9d02fdea6594"],["/syntax_and_semantics/capturing_blocks.html","24f756a6ab702944948e37179e9304a5"],["/syntax_and_semantics/case.html","9329834a00ce0c4ed80e0b63afaebff9"],["/syntax_and_semantics/class_methods.html","8a3aa1aa0a299828681298282d6e1e9e"],["/syntax_and_semantics/class_variables.html","1da0a953d9dcca4e2c86bbe2a8d1b3bd"],["/syntax_and_semantics/classes_and_methods.html","53278a57e1a950f3eeef0f490b970d08"],["/syntax_and_semantics/closures.html","922bba6077e23ebcee045b19b4019396"],["/syntax_and_semantics/comments.html","eb0394ae49035fcf3b37ba3c8fa55c02"],["/syntax_and_semantics/compile_time_flags.html","0598b1d681aff903a181dd83c0caa22c"],["/syntax_and_semantics/constants.html","d2653496900e6237f68e2896e9acc4ff"],["/syntax_and_semantics/control_expressions.html","ffc9876691e3dc2f0561d3a5554adbc1"],["/syntax_and_semantics/cross-compilation.html","07f359c0e3566271395135acbda1f7ff"],["/syntax_and_semantics/declare_var.html","a1f9e2e750b31f1fe5cee264ff6e8a1c"],["/syntax_and_semantics/default_and_named_arguments.html","6a0fc5e985976ca947bfdbbd0eacb88e"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","acd25f949070ae569a66428a071678c0"],["/syntax_and_semantics/enum.html","899fd47c69b793c9b4ea820b2635342b"],["/syntax_and_semantics/everything_is_an_object.html","c155113ece7bc204d4560c586d98b92e"],["/syntax_and_semantics/exception_handling.html","2a6e7a9b03d4b910e6b396fb0ed7cdb7"],["/syntax_and_semantics/finalize.html","68619fa77bbfafbe3392ebf114558ac4"],["/syntax_and_semantics/generics.html","715049e1c4fa414038bbacc577eb329c"],["/syntax_and_semantics/if.html","2ed54f14123c06c0bfae2d60971d6a20"],["/syntax_and_semantics/if_var.html","f104d614f996c31fa8415d4ca738f4d0"],["/syntax_and_semantics/if_var_nil.html","3359b45dd79526e9a88c560eb6966fe4"],["/syntax_and_semantics/if_varis_a.html","0bea3ea8dda8892c8b59f5d8aaba5ed9"],["/syntax_and_semantics/if_varresponds_to.html","8b5afa799d8743933cd216831a87ac01"],["/syntax_and_semantics/index.html","51b1dd09f55663bf743364cbb057973f"],["/syntax_and_semantics/inheritance.html","667bdaa3b605a59beabaf27c2bc04b6b"],["/syntax_and_semantics/instance_sizeof.html","1c54e4d7715ab99df8ca0da4fd30b839"],["/syntax_and_semantics/is_a.html","de096257044f3c2ac5424ff21d570e96"],["/syntax_and_semantics/literals.html","fa43655acd74e03255a961ffdbe6bd9c"],["/syntax_and_semantics/literals/array.html","6458bed4b2eb1c4b675fbb0d5ddd86ba"],["/syntax_and_semantics/literals/bool.html","fb12ce14ea1103ca10c3732469ed2b34"],["/syntax_and_semantics/literals/char.html","d5e050fa621ee1e117c8711d84bbf08c"],["/syntax_and_semantics/literals/command.html","f5469976981b71cc0110ba1b273c0119"],["/syntax_and_semantics/literals/floats.html","5a3496038820e369296bcb125799c9ec"],["/syntax_and_semantics/literals/hash.html","b51322d87631c4cb854c7025bc593ab5"],["/syntax_and_semantics/literals/integers.html","84c2157fef63cc7f8195b037979be959"],["/syntax_and_semantics/literals/named_tuple.html","ff77b4bc62054f56344e8c1af84a639e"],["/syntax_and_semantics/literals/nil.html","11a542a80071ed06fb68c65d00a58770"],["/syntax_and_semantics/literals/proc.html","d679f26174221c23edf3255dc93fa2a7"],["/syntax_and_semantics/literals/range.html","00f3c40040daf71e0c87b5351608467c"],["/syntax_and_semantics/literals/regex.html","f572b0010a4c5287afe87f80ab6cf699"],["/syntax_and_semantics/literals/string.html","f773d91efd8ed2581483eee63bf2a9af"],["/syntax_and_semantics/literals/symbol.html","9169a36e420aedc9942af53302bbdc5d"],["/syntax_and_semantics/literals/tuple.html","52d96eb79b9cf53baa63679fb72ab830"],["/syntax_and_semantics/local_variables.html","416c3506d39757039825528bd990735d"],["/syntax_and_semantics/low_level_primitives.html","4344c0509eb2ec128f5cdcc8e91ae351"],["/syntax_and_semantics/macros.html","42d3153b764096cfe46cd84a0d08ca42"],["/syntax_and_semantics/macros/fresh_variables.html","0a35e2c3ac68001a81f5039771111abc"],["/syntax_and_semantics/macros/hooks.html","bb58374d9ca05f8003bcb2e5ee8da3ab"],["/syntax_and_semantics/macros/macro_methods.html","846d8bc7be7c86c9500405dfbcdb7106"],["/syntax_and_semantics/methods_and_instance_variables.html","acd2683f58a80eb998a8c931122e5f4a"],["/syntax_and_semantics/modules.html","6092258a1ce7083f68fab1df946b9419"],["/syntax_and_semantics/new,_initialize_and_allocate.html","e2ded9cb0834ed9f4ee2544177e671b3"],["/syntax_and_semantics/next.html","fae20fbdf489c2cde77aa485da0a882e"],["/syntax_and_semantics/nil_question.html","c62fa286e737de61952d3c0144ff6825"],["/syntax_and_semantics/not.html","8c77375c255befa3cdc41f0b8b94318a"],["/syntax_and_semantics/offsetof.html","4b7ca36cd3a644ab315a702b935f6a25"],["/syntax_and_semantics/operators.html","19556399ebfb5b875b113a78255129d9"],["/syntax_and_semantics/or.html","b7c336bcc0a4362839a5f476f7c9f808"],["/syntax_and_semantics/overloading.html","b5dc04b1e45b11a36514dbd5424c042e"],["/syntax_and_semantics/pointerof.html","0c5efbc607f1f9e4a6aaa9a991a19555"],["/syntax_and_semantics/proc_literal.html","6352332a6bbdf2adca9fe1878d2f6f06"],["/syntax_and_semantics/requiring_files.html","e37e3106ff5bae5db937b32a301e0c91"],["/syntax_and_semantics/responds_to.html","cefab136fe1f998309b02619fe22f7de"],["/syntax_and_semantics/return_types.html","e7d90938aff72f9031aa50e40ceebffe"],["/syntax_and_semantics/sizeof.html","94ea3efa6332ec26ea224dacc2888ff1"],["/syntax_and_semantics/splats_and_tuples.html","6dead62b99c006461cadd857fca11d26"],["/syntax_and_semantics/structs.html","77fffdb730e65f7d278a92e224075b66"],["/syntax_and_semantics/ternary_if.html","8da7cd1ac1b3948076df6f58d9f2f435"],["/syntax_and_semantics/the_program.html","3c5c3d8778b91fc1da1039d2dbd43c3b"],["/syntax_and_semantics/truthy_and_falsey_values.html","4b03039debaebd1d418b056b5eea67ee"],["/syntax_and_semantics/type_grammar.html","385dc307e4644e942413966e220c846a"],["/syntax_and_semantics/type_inference.html","6ab421e43275eeea3fc6565f849c0846"],["/syntax_and_semantics/type_reflection.html","920a2e7e3f988eb8c8d42c385c06d116"],["/syntax_and_semantics/type_restrictions.html","3cbf0bc57fed5b1f8c11e25076470751"],["/syntax_and_semantics/typeof.html","3a9bc3459ea3a7b78fb150e267f42f27"],["/syntax_and_semantics/types_and_methods.html","5e404cc0a8300d7fbbfe44b1f29bd2d3"],["/syntax_and_semantics/union_types.html","f220e35b032af35598fcdd14dd1cae86"],["/syntax_and_semantics/unless.html","c5365713d00fbd4578d6246b6d98090e"],["/syntax_and_semantics/unsafe.html","a655b8a658b0446a5b33bdf6127631c8"],["/syntax_and_semantics/until.html","178cfd60e96c2bb32ce0e770ef399481"],["/syntax_and_semantics/virtual_and_abstract_types.html","d7f028ae7de96a52774c1275865a600b"],["/syntax_and_semantics/visibility.html","c799e866a54d25fbf707fc1f0d87af2b"],["/syntax_and_semantics/while.html","8ad0552fc4fd1b1dd5fa003f866e96be"],["/the_shards_command/index.html","af923db7f3e24320ed66a892c82dd216"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","57e54fe5f5ae34eb56bcc282fc5b217b"]];
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







