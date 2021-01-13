'use strict'; // vf-banner
// Turn the below code snippet into a banner
// <div class="vf-banner vf-banner--fixed vf-banner--bottom vf-banner--notice"
// data-vf-js-banner
// data-vf-js-banner-state="persistent|dismissible|blocking" data-vf-js-banner-esc-close="y|n"
// data-vf-js-banner-cookie-name="{{data-service-id}}"
// data-vf-js-banner-cookie-version="{{data-protection-version}}"
// data-vf-js-banner-extra-button="<a href='#'>string1</a><a href='#'>string2</a>">
//   <div class="vf-banner__content | vf-grid">
//     <p class="vf-text vf-text--body-l">
//       This website uses cookies, and the limiting processing of your personal data to function. By using the site you are agreeing to this as outlined in our <a class="vf-link" href="JavaScript:Void(0);">Privacy Notice</a> and <a class="vf-link" href="JavaScript:Void(0);">Terms Of Use</a>.
//     </p>
//
//     <button class="vf-button vf-button--secondary">
//       {{vf-data-protection-banner__link}}
//     </button>
//   </div>
// </div>

/**
 * Clear the cooke. This is mostly a development tool.
 */

/* eslint-disable no-unused-vars */

function vfBannerReset(vfBannerCookieNameAndVersion) {
  vfBannerSetCookie(vfBannerCookieNameAndVersion, false);
}
/* eslint-enable no-unused-vars */

/**
 * Dismiss a banner
 */


function vfBannerClose(targetBanner) {
  // remove padding added to not cover up content
  if (targetBanner.classList.contains("vf-banner--fixed")) {
    var height = targetBanner.offsetHeight || 0;
    var pagePadding;

    if (targetBanner.classList.contains("vf-banner--top")) {
      pagePadding = document.body.style.paddingTop.replace(/\D/g, "") || 0;
      pagePadding = pagePadding - height;
      document.body.style.paddingTop = pagePadding + "px";
    }

    if (targetBanner.classList.contains("vf-banner--bottom")) {
      pagePadding = document.body.style.paddingBottom.replace(/\D/g, "") || 0;
      pagePadding = pagePadding - height;
      document.body.style.paddingBottom = pagePadding + "px";
    }
  } // dismiss banner


  targetBanner.classList.add("vf-u-display-none");
}
/**
 * Confirm a banner, initiate cookie logging
 */


function vfBannerConfirm(banner, vfBannerCookieNameAndVersion) {
  vfBannerClose(banner);

  if (vfBannerCookieNameAndVersion !== "null") {
    vfBannerSetCookie(vfBannerCookieNameAndVersion, true);
  }
}
/**
 * Log a cookie
 */


function vfBannerSetCookie(c_name, value, exdays) {
  // var value = value || 'true';

  /* eslint-disable no-redeclare */
  var exdays = exdays || 90;
  /* eslint-enable no-redeclare */

  var exdate = new Date();
  var c_value;
  exdate.setDate(exdate.getDate() + exdays);
  c_value = escape(value) + (exdays === null ? "" : ";expires=" + exdate.toUTCString()) + ";domain=" + document.domain + ";path=/";
  document.cookie = c_name + "=" + c_value;
}
/**
 * See if a cookie has been set
 */


function vfBannerGetCookie(c_name) {
  var x,
      y,
      ARRcookies = document.cookie.split(";");

  for (var i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");

    if (x === c_name) {
      return unescape(y);
    }
  }
}
/**
 * Finds all vf-banner on a page and activates them
 * @param {object} [scope] - the html scope to process, optional, defaults to `document`
 * @example vfBanner(document.querySelectorAll('.vf-component__container')[0]);
 */


function vfBanner(scope) {
  /* eslint-disable no-redeclare */
  var scope = scope || document;
  /* eslint-enable no-redeclare */

  var bannerList = scope.querySelectorAll("[data-vf-js-banner]");

  if (!bannerList) {
    // exit: banners not found
    return;
  }

  if (bannerList.length == 0) {
    // exit: banner content not found
    return;
  } // generate the banner component, js events


  Array.prototype.forEach.call(bannerList, function (banner) {
    // map the JS data attributes to our object structure
    var bannerRemapped = JSON.parse(JSON.stringify(banner.dataset));

    if (typeof banner.dataset.vfJsBannerId != "undefined") {// don't reactivate an already processed banner
    } else {
      bannerRemapped.vfJsBannerText = banner.querySelectorAll("[data-vf-js-banner-text]")[0].innerHTML;
      var uniqueId = Math.round(Math.random() * 10000000); // set an id to target this banner

      banner.setAttribute("data-vf-js-banner-id", uniqueId); // preserve the classlist

      bannerRemapped.classList = banner.querySelectorAll("[data-vf-js-banner-text]")[0].classList; // Make the banner come alive

      vfBannerInsert(bannerRemapped, uniqueId);
    }
  });
}
/**
 * Takes a banner object and creates the necesary html markup, js events, and inserts
 * @example vfBannerInsert()
 * @param {object} [banner]  -
 * @param {string} [bannerId] - the id of the target div, `data-vf-js-banner-id="1"`
 * @param {object} [scope] - the html scope to process, optional, defaults to `document`
 */


function vfBannerInsert(banner, bannerId, scope) {
  /* eslint-disable no-redeclare */
  var scope = scope || document;
  /* eslint-enable no-redeclare */

  var targetBanner = scope.querySelectorAll("[data-vf-js-banner-id=\"" + bannerId + "\"]")[0];

  if (targetBanner == undefined) {
    return;
  }

  var generatedBannerHtml = "<div class=\"" + banner.classList + "\" data-vf-js-banner-text>";
  generatedBannerHtml += banner.vfJsBannerText; // What type of banner?

  if (banner.vfJsBannerState === "persistent") {// nothing more to do for persistent, you can't close it
  } else if (banner.vfJsBannerState === "dismissible") {// nothing more to do for dismissible
  } else if (banner.vfJsBannerState === "blocking") {
    console.warn("vf-banner: Note, the blocking implementation is not yet feature complete."); // escape only works when blocking

    if (banner.vfJsBannerEscClose === "y" || banner.vfJsBannerEscClose === "Y") {
      document.onkeydown = function (evt) {
        evt = evt || window.event;

        if (evt.keyCode == 27) {
          vfBannerConfirm(targetBanner, "null");
        }
      };
    }
  } // Split passed links into buttons
  // <a href='#'>string1</a>\<a href='#'>string2</a>


  if (banner.vfJsBannerExtraButton) {
    var vfBannerExtraButtons = banner.vfJsBannerExtraButton.split("</a>");
    vfBannerExtraButtons.forEach(function (button) {
      if (button.length > 1) {
        button += "</a>";
        var newButton = document.createElement("button");
        newButton.innerHTML = button;
        newButton = newButton.firstChild;
        newButton.classList.add("vf-button", "vf-button--primary");
        generatedBannerHtml += newButton.outerHTML;
      }
    });
  } // if there is a vfJsBannerButtonText and banner is blocking or dismissible,
  // add a button so user can close the banner


  if (banner.vfJsBannerButtonText && (banner.vfJsBannerState === "blocking" || banner.vfJsBannerState === "dismissible")) {
    if (banner.vfJsBannerButtonTheme == "primary") {
      generatedBannerHtml += "<button class=\"vf-button vf-button--primary\" data-vf-js-banner-close>" + banner.vfJsBannerButtonText + "</button>";
    } else if (banner.vfJsBannerButtonTheme == "secondary") {
      generatedBannerHtml += "<button class=\"vf-button vf-button--secondary\" data-vf-js-banner-close>" + banner.vfJsBannerButtonText + "</button>";
    } else if (banner.vfJsBannerButtonTheme == "tertiary") {
      generatedBannerHtml += "<button class=\"vf-button vf-button--tertary\" data-vf-js-banner-close>" + banner.vfJsBannerButtonText + "</button>";
    } else {
      // default
      generatedBannerHtml += "<button class=\"vf-button vf-button--primary\" data-vf-js-banner-close>" + banner.vfJsBannerButtonText + "</button>";
    }
  }

  generatedBannerHtml += "</div>"; // set the html of the banner

  targetBanner.innerHTML = generatedBannerHtml; // prep for cookie

  var vfBannerCookieNameAndVersion = "null";

  if (banner.vfJsBannerCookieName && banner.vfJsBannerCookieVersion) {
    vfBannerCookieNameAndVersion = banner.vfJsBannerCookieName + "_" + banner.vfJsBannerCookieVersion;
  } // utility to reset cookie when developing
  // console.warn('vf-banner: vfBannerReset cookie reset override is on.');
  // vfBannerReset(vfBannerCookieNameAndVersion);
  // if blocking or dismissible, allow the user to close it, store a cookie (if specified)


  if (banner.vfJsBannerState === "blocking" || banner.vfJsBannerState === "dismissible") {
    // On click: close banner, pass any cookie name (or `null`)
    if (banner.vfJsBannerButtonText) {
      targetBanner.querySelectorAll("[data-vf-js-banner-close]")[0].addEventListener("click", function () {
        vfBannerConfirm(targetBanner, vfBannerCookieNameAndVersion);
      }, false);
    }
  } // add appropriate padding to the page to not cover up content


  if (targetBanner.classList.contains("vf-banner--fixed")) {
    var height = Number(targetBanner.offsetHeight || 0);
    var pagePadding;

    if (targetBanner.classList.contains("vf-banner--top")) {
      pagePadding = Number(document.body.style.paddingTop.replace(/\D/g, "") || 0);
      pagePadding = pagePadding + height;
      document.body.style.paddingTop = pagePadding + "px";
    }

    if (targetBanner.classList.contains("vf-banner--bottom")) {
      pagePadding = Number(document.body.style.paddingBottom.replace(/\D/g, "") || 0);
      pagePadding = pagePadding + height;
      document.body.style.paddingBottom = pagePadding + "px";
    }
  }

  if (vfBannerCookieNameAndVersion != "null") {
    // if banner has been previously accepted
    if (vfBannerGetCookie(vfBannerCookieNameAndVersion) === "true") {
      // banner has been accepted, close
      vfBannerClose(targetBanner); // exit, nothng more to do

      return;
    } // if banner is marked as auto-accept, set as read


    if (banner.vfJsBannerAutoAccept == "true") {
      if (banner.vfJsBannerState === "blocking" || banner.vfJsBannerState === "dismissible") {
        vfBannerSetCookie(vfBannerCookieNameAndVersion, true);
      }
    }
  }
} // By default this creates banners from HTML
// optionally you can programatically supply
// Target HTML
// `<div class="vf-banner vf-banner--fixed vf-banner--bottom vf-banner--notice"
//       data-vf-js-banner
//       data-vf-js-banner-id="32423"
//
// ></div>`
// var programaticalBanner = {
//   vfJsBanner: "",
//   vfJsBannerButtonText: "I agree, dismiss this banner",
//   vfJsBannerCookieName: "MyService",
//   vfJsBannerCookieVersion: "0.1",
//   vfJsBannerExtraButton: "<a href='#'>Optional button</a><a target='_blank' href='#'>New tab button</a>",
//   vfJsBannerId: "2352286",
//   vfJsBannerText: '<p class="vf-text vf-text--body-l">This website uses cookies, and the limiting processing of your personal data to function. By using the site you are agreeing to this as outlined in our <a class="vf-link" href="JavaScript:Void(0);">Privacy Notice</a> and <a class="vf-link" href="JavaScript:Void(0);">Terms Of Use</a>.</p>',
//   vfJsBannerState: "dismissible",
//   vfJsBannerAutoAccept: "true"
// };
// vfBannerInsert(programaticalBanner,'32423');
// vf-analytics-google

/*
 * A note on the Visual Framework and JavaScript:
 * The VF is primarily a CSS framework so we've included only a minimal amount
 * of JS in components and it's fully optional (just remove the JavaScript selectors
 * i.e. `data-vf-js-tabs`). So if you'd rather use Angular or Bootstrap for your
 * tabs, the Visual Framework won't get in the way.
 *
 * When querying the DOM for elements that should be acted on:
 * 🚫 Don't: const tabs = document.querySelectorAll('.vf-tabs');
 * ✅ Do:    const tabs = document.querySelectorAll('[data-vf-js-tabs]');
 *
 * This allows users who would prefer not to have this JS engage on an element
 * to drop `data-vf-js-component` and still maintain CSS styling.
 */
// Declare `ga` as a global for eslint

/* global ga */

/**
 * Utility method to invalidate prior GA check.
 */


function vfGaIndicateUnloaded() {
  var el = document.querySelector("body");
  el.setAttribute("data-vf-google-analytics-loaded", "false");
}
/**
 * Track the last time an event was sent (don't double send)
 * @param {Date} lastGaEventTime
 */


var lastGaEventTime = Date.now();
/**
 * We poll the document until we find GA has loaded, or we've tried a few times.
 * Port of https://github.com/ebiwd/EBI-Framework/blob/v1.3/js/foundationExtendEBI.js#L4
 * @param {object} [vfGaTrackOptions]
 * @param {binary} [vfGaTrackOptions.vfGaTrackPageLoad=true] If true, the function will track the initial page view. Set this to false if you track the page view in your HTML.
 * @param {number} [numberOfGaChecksLimit=2]
 * @param {number} [checkTimeout=900]
 * @example
 * let vfGaTrackOptions = {
 *  vfGaTrackPageLoad: true
 *  vfGaTrackNetwork: {
 *    serviceProvider: 'dimension2',
 *    networkDomain: 'dimension3',
 *    networkType: 'dimension4'
 *  }
 * };
 * vfGaIndicateLoaded(vfGaTrackOptions);
 */

function vfGaIndicateLoaded(vfGaTrackOptions, numberOfGaChecksLimit, numberOfGaChecks, checkTimeout) {
  /* eslint-disable no-redeclare*/
  var vfGaTrackOptions = vfGaTrackOptions || {};
  if (vfGaTrackOptions.vfGaTrackPageLoad == null) vfGaTrackOptions.vfGaTrackPageLoad = true;
  var numberOfGaChecks = numberOfGaChecks || 0;
  var numberOfGaChecksLimit = numberOfGaChecksLimit || 5;
  var checkTimeout = checkTimeout || 900;
  /* eslint-enable no-redeclare*/

  var el = document.querySelector("body"); // debug
  // console.log('checking',numberOfGaChecks,numberOfGaChecksLimit)

  numberOfGaChecks++; // If successful we set `data-vf-google-analytics-loaded` on the `body` to true.

  try {
    // unset our check
    vfGaIndicateUnloaded();

    if (ga && ga.loaded) {
      el.setAttribute("data-vf-google-analytics-loaded", "true");
      vfGaInit(vfGaTrackOptions);
    } else {
      if (numberOfGaChecks <= numberOfGaChecksLimit) {
        setTimeout(function () {
          vfGaIndicateLoaded(vfGaTrackOptions, numberOfGaChecksLimit, numberOfGaChecks, checkTimeout);
        }, 900); // give a second check if GA was slow to load
      }
    }
  } catch (err) {
    if (numberOfGaChecks <= numberOfGaChecksLimit) {
      setTimeout(function () {
        vfGaIndicateLoaded(vfGaTrackOptions, numberOfGaChecksLimit, numberOfGaChecks, checkTimeout);
      }, 900); // give a second check if GA was slow to load
    }
  }
}
/**
 * Get Meta Tag Content
 * via https://jonlabelle.com/snippets/view/javascript/get-meta-tag-content
 *
 * @param {string} metaName The meta tag name.
 * @return {string} The meta tag content value, or empty string if not found.
 */


function vfGetMeta(metaName) {
  var metas = document.getElementsByTagName("meta");
  var re = new RegExp("\\b" + metaName + "\\b", "i");
  var i = 0;
  var mLength = metas.length;

  for (i; i < mLength; i++) {
    if (re.test(metas[i].getAttribute("name"))) {
      return metas[i].getAttribute("content");
    }
  }

  return "";
}
/**
 * Hooks into common analytics tracking
 * @param {object} [vfGaTrackOptions]
 * @param {binary} [vfGaTrackOptions.vfGaTrackPageLoad=true] If true, the function will track the initial page view. Set this to false if you track the page view in your HTML.
 */


function vfGaInit(vfGaTrackOptions) {
  /* eslint-disable no-redeclare*/
  var vfGaTrackOptions = vfGaTrackOptions || {};
  /* eslint-enable no-redeclare*/

  if (vfGaTrackOptions.vfGaTrackPageLoad == null) vfGaTrackOptions.vfGaTrackPageLoad = true; // Need help
  // How to add dimension to your property
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/custom-dims-mets
  // https://support.google.com/analytics/answer/2709829?hl=en
  // standard google analytics bootstrap
  // @todo: add conditional

  ga("set", "anonymizeIp", true); // Use the more robust "beacon" logging, when available
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits

  ga("set", "transport", "beacon"); // lookup metadata  <meta name="vf:page-type" content="category;pageTypeHere">
  // Pass your GA dimension with a `;` divider

  var pageType = vfGetMeta("vf:page-type");

  if (pageType.length > 0) {
    var toLog = pageType.split(";");
    var dimension = toLog[1];
    var pageTypeName = toLog[0];
    ga("set", dimension, pageTypeName);
  } // If you want to track the network of visitors be sure to
  // - follow the setup guide at https://ipmeta.io/instructions
  // - view the directions in README.md
  // note: this feature may be broken out as a seperate dependency if the code size needs to grow further


  if (vfGaTrackOptions.vfGaTrackNetwork != null) {
    // a copy of https://ipmeta.io/plugin.js
    // included here to simplify usage and reduce external requests

    /* eslint-disable */
    var providePlugin = function providePlugin(pluginName, pluginConstructor) {
      var ga = window[window.GoogleAnalyticsObject || 'ga'];

      if (typeof ga === 'undefined') {}

      if (typeof ga == 'function') {
        ga('provide', pluginName, pluginConstructor);
      }

      setTimeout(function () {
        var inputs = document.querySelectorAll('input');

        if (inputs) {
          for (var i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('blur', riskCheck);
          }
        }
      }, 750);
    };

    var provideGtagPlugin = function provideGtagPlugin(config) {
      var i = 0;
      var timer = setInterval(function () {
        ++i;
        var gtag = window.gtag;

        if (typeof gtag !== "undefined" || i === 5) {
          Window.IpMeta = new IpMeta(gtag, config);
          Window.IpMeta.loadGtagNetworkFields();
          clearInterval(timer);
        }
      }, 500);
    };

    var provideGtmPlugin = function provideGtmPlugin(config) {
      Window.IpMeta = new IpMeta([], config);
      Window.IpMeta.loadGtmNetworkFields();
      return [];
    };

    var rc = function rc(d) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", 'https://risk.ipmeta.io/check', !0);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
        assoc: d
      }));
    };

    var riskCheck = function riskCheck(e) {
      input = e.srcElement.value;

      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
        var domain = input.replace(/.*@/, "");
        rc(encr(domain));
      }
    };

    var enrichNetwork = function enrichNetwork(key, local, callback) {
      local = local || !1;
      storageKey = key + "ipmetaNetworkResponse";

      if (sessionStorage.getItem(storageKey) !== null) {
        callback(JSON.parse(sessionStorage.getItem(storageKey)), !1);
        return;
      }

      var request = new XMLHttpRequest();
      var pl = 'h=' + encodeURI(window.location.hostname);

      if (key) {
        pl += '&k=' + key;
      }

      var endpoint = 'https://ipmeta.io/api/enrich';

      if (local) {
        endpoint = 'http://ipmeta.test/api/enrich';
      }

      request.open('POST', endpoint, !0);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.setRequestHeader('Accept', 'application/json');
      request.send(pl);

      request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
          if (request.status === 200) {
            sessionStorage.setItem(storageKey, request.responseText);
            callback(JSON.parse(request.responseText), !0);
            return;
          }

          if (request.status === 429) {
            console.error(JSON.parse(request.responseText)[0]);
            return !1;
          }

          console.error('IpMeta lookup failed.  Returned status of ' + request.status);
          return !1;
        }
      };
    };

    var encr = function encr(str) {
      return 'IPM' + btoa(btoa('bf2414cd32581225a82cc4fb46c67643' + btoa(str)) + 'dde9caf18a8fc7d8187f3aa66da8c6bb');
    };

    var IpMeta = function IpMeta(tracker, config) {
      this.tracker = tracker;
      this.nameDimension = config.serviceProvider || config.nameDimension || 'dimension1';
      this.domainDimension = config.networkDomain || config.domainDimension || 'dimension2';
      this.typeDimension = config.networkType || config.typeDimension || 'dimension3';
      this.gtmEventKey = config.gtmEventKey || 'pageview';
      this.isLocal = config.local || !1;
      this.apiKey = config.apiKey;
      this.isDebug = config.debug;
    };

    IpMeta.prototype.loadNetworkFields = function () {
      if (typeof Window.IpMeta === 'undefined') {
        Window.IpMeta = this;
      }

      this.debugMessage('Loading network field parameters');
      enrichNetwork(this.apiKey, this.isLocal, function (fields, wasAsync) {
        var wasAsync = wasAsync || !1;
        var nameValue = fields.name || '(not set)';
        var domainValue = fields.domain || '(not set)';
        var typeValue = fields.type || '(not set)';

        if (nameValue) {
          Window.IpMeta.tracker.set(Window.IpMeta.nameDimension, nameValue);
          Window.IpMeta.debugMessage('Loaded network name: ' + nameValue + ' into ' + Window.IpMeta.nameDimension);
        }

        if (domainValue) {
          Window.IpMeta.tracker.set(Window.IpMeta.domainDimension, domainValue);
          Window.IpMeta.debugMessage('Loaded network domain: ' + domainValue + ' into ' + Window.IpMeta.domainDimension);
        }

        if (typeValue) {
          Window.IpMeta.tracker.set(Window.IpMeta.typeDimension, typeValue);
          Window.IpMeta.debugMessage('Loaded network type: ' + typeValue + ' into ' + Window.IpMeta.typeDimension);
        }

        if (wasAsync) {
          Window.IpMeta.tracker.send('event', 'IpMeta', 'Enriched', 'IpMeta Enriched', {
            nonInteraction: !0
          });
        }
      });
    };

    IpMeta.prototype.setGtagMapping = function (fields) {
      var nameValue = fields.name || '(not set)';
      var domainValue = fields.domain || '(not set)';
      var typeValue = fields.type || '(not set)';
      var mapping = {};
      mapping[this.nameDimension] = nameValue;
      mapping[this.domainDimension] = domainValue;
      mapping[this.typeDimension] = typeValue;
      mapping.non_interaction = !0;
      Window.IpMeta.tracker('event', 'ipmeta_event', mapping);
    };

    IpMeta.prototype.loadGtagNetworkFields = function () {
      if (typeof Window.IpMeta === 'undefined') {
        Window.IpMeta = this;
      }

      this.debugMessage('Loading network field parameters');
      enrichNetwork(this.apiKey, this.isLocal, function (fields, wasAsync) {
        wasAsync = wasAsync || !1;
        Window.IpMeta.setGtagMapping(fields);
      });
    };

    IpMeta.prototype.loadGtmNetworkFields = function () {
      if (typeof Window.IpMeta === 'undefined') {
        Window.IpMeta = this;
      }

      this.debugMessage('Loading network field parameters');
      var eventKey = this.gtmEventKey;
      enrichNetwork(this.apiKey, this.isLocal, function (fields, wasAsync) {
        wasAsync = wasAsync || !1;
        var nameValue = fields.name || '(not set)';
        var domainValue = fields.domain || '(not set)';
        var typeValue = fields.type || '(not set)';
        var dataLayerObj = {};
        dataLayerObj.event = eventKey;
        dataLayerObj.nameValue = nameValue;
        dataLayerObj.domainValue = domainValue;
        dataLayerObj.typeValue = typeValue;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(dataLayerObj);
      });
    };

    IpMeta.prototype.setDebug = function (enabled) {
      this.isDebug = enabled;
    };

    IpMeta.prototype.debugMessage = function (message) {
      if (!this.isDebug) return;
      if (console) console.debug(message);
    };

    providePlugin('ipMeta', IpMeta);
    /* eslint-enable */
    // Track the network

    ga("require", "ipMeta", {
      serviceProvider: vfGaTrackOptions.vfGaTrackNetwork.serviceProvider,
      networkDomain: vfGaTrackOptions.vfGaTrackNetwork.networkDomain,
      networkType: vfGaTrackOptions.vfGaTrackNetwork.networkType
    });
    ga("ipMeta:loadNetworkFields");
  } // standard google analytics bootstrap


  if (vfGaTrackOptions.vfGaTrackPageLoad) {
    ga("send", "pageview");
  } // If we want to send metrics in one go
  // ga('set', {
  //   'dimension5': 'custom dimension data'
  //   // 'metric5': 'custom metric data'
  // });


  vfGaLinkTrackingInit();
}
/**
 * Track clicks as events
 */


function vfGaLinkTrackingInit() {
  document.body.addEventListener("mousedown", function (evt) {
    // Debug event type clicked
    // console.log(evt.target.tagName, evt.target);
    // we only track clicks on interactive elements (links, buttons, forms)
    if (evt.target) {
      if (evt.target.tagName) {
        var clickedElementTag = evt.target.tagName.toLowerCase();
        var actionElements = ["a", "button", "label", "input", "select", "textarea", "details"];

        if (actionElements.indexOf(clickedElementTag) > -1) {
          vfGaTrackInteraction(evt.target);
          return;
        }
      }
    } // In the case that elements such as `span` are wrapped in action elements (e.g. `a`),
    // we need to find the latter and supply them for tracking


    var ancestors = ["a", "details", "label"];

    for (var i = 0; i < ancestors.length; i++) {
      var from = findParent(ancestors[i], evt.target || evt.srcElement);

      if (from) {
        vfGaTrackInteraction(from);
        return;
      }
    }
  }, false); //find first parent with tagName [tagname]

  function findParent(tagname, el) {
    while (el) {
      if ((el.nodeName || el.tagName).toLowerCase() === tagname.toLowerCase()) {
        return el;
      }

      el = el.parentNode;
    }

    return null;
  }
} // /*
//  * Find closest element that has GA attribute
//  * @returns {el} the closest element with GA attribute
//  */
// function getClosestGa(elem, selector) {
//   // Element.matches() polyfill
//   // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
//   if (!Element.prototype.matches) {
//     Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
//   }
// 	// Get the closest matching element
//   for ( ; elem && elem !== document; elem = elem.parentNode ) {
//     if ( elem.matches( selector ) ) return elem;
//   }
//   return null;
// }

/**
 * Utility method to get the last in an array
 * @returns {var} the last item in the array
 * @example linkName = actedOnItem.src.split('/').vfGaLinkLast();
 */


if (!Array.prototype.vfGaLinkLast) {
  Array.prototype.vfGaLinkLast = function () {
    return this[this.length - 1];
  };
} // Catch any use cases that may have been existing
// To be removed in 2.0.0

/* eslint-disable */


function analyticsTrackInteraction(actedOnItem, customEventName) {
  console.warn("vfGa", "As of 1.0.0-rc.3 analyticsTrackInteraction() is now vfGaTrackInteraction(). You function call is being proxied. You should update your code.");
  vfGaTrackInteraction(actedOnItem, customEventName);
}
/* eslint-enable */

/**
 * Analytics tracking
 * ---
 * This code tracks the user's clicks in various parts of the site and logs them as GA events.
 *
 * Dev note:
 * add class verbose-analytics to your body for a readout to console on clicks.
 *
 * @param {element} actedOnItem
 * @param {string} customEventName Event action
 * @example
 * jQuery(".analytics-content-footer").on('mousedown', 'a, button', function(e) {
 *   vfGaTrackInteraction(e.target,'Content footer');
 * });
 */


function vfGaTrackInteraction(actedOnItem, customEventName) {
  /* eslint-disable no-redeclare*/
  var customEventName = customEventName || []; // you can pass some custom text as a 3rd param

  /* eslint-enable no-redeclare*/

  var linkName;

  if (customEventName.length > 0) {
    linkName = customEventName;
  } else if (actedOnItem.dataset.vfAnalyticsLabel) {
    // if an explicit label, use that
    linkName = actedOnItem.dataset.vfAnalyticsLabel;
  } else {
    // otherwise derive a value
    // Fix for when tags have undefined .innerText
    if (typeof actedOnItem.innerText === "undefined") {
      actedOnItem.innerText = "";
    }

    linkName = actedOnItem.innerText; // console.log('linkName',linkName);
    // if there's no text, it's probably and image

    if (linkName.length == 0 && actedOnItem.hasAttribute("src")) linkName = actedOnItem.src.split("/").vfGaLinkLast();
    if (linkName.length == 0 && actedOnItem.value) linkName = actedOnItem.value; // is there an inner image?

    if (linkName.length == 0 && actedOnItem.getElementsByTagName("img")) {
      if (actedOnItem.getElementsByTagName("img")[0]) {
        // if alt text, use that
        if (actedOnItem.getElementsByTagName("img")[0].hasAttribute("alt")) {
          linkName = actedOnItem.getElementsByTagName("img")[0].alt;
        } else if (actedOnItem.getElementsByTagName("img")[0].hasAttribute("src")) {
          linkName = actedOnItem.getElementsByTagName("img")[0].src.split("/").vfGaLinkLast();
        }
      }
    } // fallback to an href value


    if (linkName.length == 0 && actedOnItem.href) linkName = actedOnItem.href; // special things for gloabl search box
    // if (parentContainer == 'Global search') {
    //   linkName = 'query: ' + jQuery('#global-search input#query').value;
    // }
  } // Get closest parent container
  // Track the region of the link clicked (global nav, masthead, hero, main content, footer, etc)
  //data-vf-google-analytics-region="main-content-area-OR-SOME-OTHER-NAME"


  var parentContainer = actedOnItem.closest("[data-vf-google-analytics-region]");

  if (parentContainer) {
    parentContainer = parentContainer.dataset.vfGoogleAnalyticsRegion;
  } else {
    parentContainer = "No container specified";
  } // send to GA
  // Only if more than 100ms has past since last click.
  // Due to our structure, we fire multiple events, so we only send to GA the most specific event resolution


  if (Date.now() - lastGaEventTime > 150) {
    // track link name and region
    // note that we've stored an event(s)
    lastGaEventTime = Date.now(); // What type of element? `a` `button` etc.

    var elementType = "none";

    if (actedOnItem.tagName) {
      elementType = actedOnItem.tagName.toLowerCase();
    } // Track file type (PDF, DOC, etc) or if mailto
    // adapted from https://www.blastanalytics.com/blog/how-to-track-downloads-in-google-analytics


    var filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3|txt|fasta)$/i;
    var href = actedOnItem.href; // log emails and downloads to seperate event "buckets"

    /* eslint-disable no-useless-escape */

    if (href && href.match(/^mailto\:/i)) {
      // email click
      var mailLink = href.replace(/^mailto\:/i, "");
      ga && ga("send", "event", "Email", "Region / " + parentContainer, mailLink);
      vfGaLogMessage("Email", "Region / " + parentContainer, mailLink, lastGaEventTime, actedOnItem);
    } else if (href && href.match(filetypes)) {
      // download event
      var extension = /[.]/.exec(href) ? /[^.]+$/.exec(href) : undefined;
      var filePath = href;
      ga && ga("send", "event", "Download", "Type / " + extension + " / " + parentContainer, filePath);
      vfGaLogMessage("Download", "Type / " + extension + " / " + parentContainer, filePath, lastGaEventTime, actedOnItem);
    }
    /* eslint-enable no-useless-escape */
    // If link and is external, log it as an external link


    if (href && href.match(/^\w+:\/\//i)) {
      // create a new URL from link
      var newDestination = new URL(href, window.location);

      if (newDestination.hostname != window.location.hostname) {
        ga && ga("send", "event", "External links", "External link / " + linkName + " / " + parentContainer, href);
        vfGaLogMessage("External links", "External link / " + linkName + " / " + parentContainer, href, lastGaEventTime, actedOnItem);
      }
    } // is it a form interaction or something with text?


    var formElementTypes = ["label", "input", "select", "textarea"];

    if (formElementTypes.indexOf(elementType) > -1) {
      // create a label for form elements
      // derive a form label
      linkName = ""; // If an explicit label has been provided, use that
      // <label for="radio-3" class="vf-form__label" data-vf-google-analytics-label="A special form option">Form Label</label>

      if (actedOnItem.dataset.vfAnalyticsLabel) {
        linkName = actedOnItem.dataset.vfAnalyticsLabel;
      } else {
        linkName = elementType + ": ";

        if (actedOnItem.getAttribute("name")) {
          // if element has a "name"
          linkName = actedOnItem.getAttribute("name");
        } else if (actedOnItem.getAttribute("for")) {
          // if element has a "for"
          linkName = actedOnItem.getAttribute("for");
        } else {
          // get the text of a label
          linkName = actedOnItem.textContent;
        }
      } // track a selected value


      if (elementType == "select") {
        linkName = linkName + ", " + actedOnItem.value;
      }

      ga && ga("send", "event", "UI", "UI Element / " + parentContainer, linkName);
      vfGaLogMessage("UI", "UI Element / " + parentContainer, linkName, lastGaEventTime, actedOnItem);
    } else {
      // generic catch all
      ga && ga("send", "event", "UI", "UI Element / " + parentContainer, linkName);
      vfGaLogMessage("UI", "UI Element / " + parentContainer, linkName, lastGaEventTime, actedOnItem);
    }
  }
}
/**
 * Helper function to log debug console messages.
 *
 * @param {string} eventCategory
 * @param {string} eventAction
 * @param {string} eventLabel
 * @param {string} lastGaEventTime
 * @param {element} actedOnItem
 */


function vfGaLogMessage(eventCategory, eventAction, eventLabel, lastGaEventTime, actedOnItem) {
  // conditional logging
  var conditionalLoggingCheck = document.querySelector("body"); // debug: always turn on verbose analytics
  // conditionalLoggingCheck.setAttribute("data-vf-google-analytics-verbose", "true");

  if (conditionalLoggingCheck.dataset.vfGoogleAnalyticsVerbose) {
    if (conditionalLoggingCheck.dataset.vfGoogleAnalyticsVerbose == "true") {
      /* eslint-disable */
      console.log("%c Verbose analytics on ", "color: #FFF; background: #111; font-size: .75rem;");
      console.log("clicked on: %o ", actedOnItem);
      console.log("sent to GA: ", "event ->", eventCategory + " ->", eventAction + " ->", eventLabel, "; at: ", lastGaEventTime);
      /* eslint-enable */
    }
  }
} // vf-tabs

/**
 * Finds all tabs on a page and activates them
 * @param {object} [scope] - the html scope to process, optional, defaults to `document`
 * @example vfTabs(document.querySelectorAll('.vf-component__container')[0]);
 */


function vfTabs(scope) {
  /* eslint-disable no-redeclare */
  var scope = scope || document;
  /* eslint-enable no-redeclare */
  // Get relevant elements and collections

  var tablist = scope.querySelectorAll("[data-vf-js-tabs]");
  var panelsList = scope.querySelectorAll("[data-vf-js-tabs-content]");
  var panels = scope.querySelectorAll("[data-vf-js-tabs-content] [id^=\"vf-tabs__section\"]");
  var tabs = scope.querySelectorAll("[data-vf-js-tabs] .vf-tabs__link");

  if (!tablist || !panels || !tabs) {
    // exit: either tabs or tabbed content not found
    return;
  }

  if (tablist.length == 0 || panels.length == 0 || tabs.length == 0) {
    // exit: either tabs or tabbed content not found
    return;
  } // The tab switching function


  var switchTab = function switchTab(newTab) {
    // get the parent ul of the clicked tab
    var parentTabSet = newTab.closest(".vf-tabs__list");
    var oldTab = parentTabSet.querySelector("[aria-selected]");

    if (oldTab) {
      oldTab.removeAttribute("aria-selected");
      oldTab.setAttribute("tabindex", "-1");
      oldTab.classList.remove("is-active");

      for (var item = 0; item < panels.length; item++) {
        var panel = panels[item];

        if (panel.id === oldTab.id) {
          panel.hidden = true;
          break;
        }
      }
    }

    newTab.focus(); // Make the active tab focusable by the user (Tab key)

    newTab.removeAttribute("tabindex"); // Set the selected state

    newTab.setAttribute("aria-selected", "true");
    newTab.classList.add("is-active"); // Get the indices of the new tab to find the correct
    // tab panel to show

    for (var _item = 0; _item < panels.length; _item++) {
      var _panel = panels[_item];

      if (_panel.id === newTab.id) {
        _panel.hidden = false;
        break;
      }
    }
  }; // Add semantics are remove user focusability for each tab


  Array.prototype.forEach.call(tabs, function (tab, i) {
    var tabId = tab.href.split("#")[1]; // calculate an ID based off the tab href (todo: add support for a data-vf-js-tab-id, and if set use that)

    tab.setAttribute("role", "tab");
    tab.setAttribute("id", tabId);
    tab.setAttribute("data-tabs__item", tabId);
    tab.setAttribute("tabindex", "-1");
    tab.parentNode.setAttribute("role", "presentation"); // Reset any active tabs from a previous JS call

    tab.removeAttribute("aria-selected");
    tab.setAttribute("tabindex", "-1");
    tab.classList.remove("is-active"); // Handle clicking of tabs for mouse users

    tab.addEventListener("click", function (e) {
      e.preventDefault();
      switchTab(e.currentTarget);
    }); // Handle keydown events for keyboard users

    tab.addEventListener("keydown", function (e) {
      // Get the index of the current tab in the tabs node list
      var index = Array.prototype.indexOf.call(tabs, e.currentTarget); // Work out which key the user is pressing and
      // Calculate the new tab's index where appropriate

      var dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? "down" : null;

      if (dir !== null) {
        e.preventDefault(); // If the down key is pressed, move focus to the open panel,
        // otherwise switch to the adjacent tab

        dir === "down" ? panels[i].focus() : tabs[dir] ? switchTab(tabs[dir]) : void 0;
      }
    });
  }); // Add tab panel semantics and hide them all

  Array.prototype.forEach.call(panels, function (panel) {
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("tabindex", "-1"); // let id = panel.getAttribute("id");

    panel.setAttribute("aria-labelledby", panel.id);
    panel.hidden = true;
  }); // Add the tablist role to the first <ul> in the .tabbed container

  Array.prototype.forEach.call(tablist, function (tablistset) {
    tablistset.setAttribute("role", "tablist"); // Initially activate the first tab

    var firstTab = tablistset.querySelectorAll(".vf-tabs__link")[0];
    firstTab.removeAttribute("tabindex");
    firstTab.setAttribute("aria-selected", "true");
    firstTab.classList.add("is-active");
  });
  Array.prototype.forEach.call(panelsList, function (panel) {
    // Initially reveal the first tab panel
    var firstPanel = panel.querySelectorAll(".vf-tabs__section")[0];
    firstPanel.hidden = false;
  });
}
/*
 *
 * scripts.css
 * The Visual Framework kitchen sink of JavaScript.
 * Import this as a quick way to get *everything*,
 *
 */


vfBanner();
vfMasthead.vfMastheadSetStyle();
var vfGaTrackOptions = {
  vfGaTrackPageLoad: true
};
vfGaIndicateLoaded(vfGaTrackOptions);
vfTabs();
vfTree.vfTree(); // import { vfFormFloatLabels } from 'vf-form__core/assets/vf-form__float-labels.js';
// vfFormFloatLabels();
// import { vfSearchClientSide } from "vf-search-client-side/vf-search-client-side";
// No default invokation
// import { vfShowMore } from "vf-show-more/vf-show-more";
// vfShowMore();
// import { vfLocationNearest } from "vf-location-nearest/vf-location-nearest";
// Not invoked by default
// All EMBL JS
// import { emblContentHubLoaderHtmlImports } from "embl-content-hub-loader/embl-content-hub-loader__html-imports";
// import { emblContentHubFetch } from "embl-content-hub-loader/embl-content-hub-loader__fetch";
// import { emblContentHub } from "embl-content-hub-loader/embl-content-hub-loader";
// import { emblConditionalEdit } from "embl-conditional-edit/embl-conditional-edit";
// emblContentHub();
// import { emblBreadcrumbs } from "embl-breadcrumbs-lookup/embl-breadcrumbs-lookup";
// emblBreadcrumbs();
// import { emblContentMetaProperties_Read } from "embl-content-meta-properties/embl-content-meta-properties";
// import { emblNotifications } from "embl-notifications/embl-notifications";
// emblNotifications();
// No default invokation