/* ============================================================
   HIILLA static site — main.js
   - Mobile navigation drawer (open / close)
   - Fare calculator (same-day / instant)
   - Auto-updating copyright year
   ============================================================ */

(function () {
  "use strict";

  /* ==========================================================
     Mobile navigation
     ========================================================== */
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.querySelector(".site-nav");
  var navOverlay = document.querySelector(".nav-overlay");

  function closeNav() {
    if (!siteNav) return;
    siteNav.classList.remove("is-open");
    if (navOverlay) navOverlay.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  function openNav() {
    if (!siteNav) return;
    siteNav.classList.add("is-open");
    if (navOverlay) navOverlay.classList.add("is-open");
    document.body.classList.add("nav-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "true");
  }

  if (siteNav) {
    // Add a close button inside the drawer (works on every page)
    if (!siteNav.querySelector(".nav-close")) {
      var closeBtn = document.createElement("button");
      closeBtn.className = "nav-close";
      closeBtn.setAttribute("type", "button");
      closeBtn.setAttribute("aria-label", "Close menu");
      closeBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">' +
        '<path d="m13.06 12 6.47-6.47-1.06-1.06L12 10.94 5.53 4.47 4.47 5.53 10.94 12l-6.47 6.47 1.06 1.06L12 13.06l6.47 6.47 1.06-1.06L13.06 12Z"></path>' +
        "</svg>";
      siteNav.appendChild(closeBtn);
      closeBtn.addEventListener("click", closeNav);
    }

    // Close when any navigation link is clicked
    var navLinks = siteNav.querySelectorAll(".site-nav__links a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }

  // Toggle open / close
  if (navToggle) {
    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      if (siteNav && siteNav.classList.contains("is-open")) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  // Close when clicking the overlay (outside the drawer)
  if (navOverlay) {
    navOverlay.addEventListener("click", closeNav);
  }

  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  /* ==========================================================
     Auto-updating copyright year
     ========================================================== */
  var copyright = document.querySelector(".site-footer__copyright");
  if (copyright) {
    copyright.textContent =
      "Copyright " + new Date().getFullYear() + " \u2013 HIILLA TRANSIT SERVICES";
  }

  /* ==========================================================
     Fare calculator
     ========================================================== */
  var fareForm = document.querySelector(".fare-form");

  if (fareForm) {
    var placeFrom = fareForm.querySelector("#from-input");
    var placeTo = fareForm.querySelector("#to-input");
    var typeInputs = fareForm.querySelectorAll('input[name="travel_time"]');
    var resultBox = fareForm.querySelector(".fare-result");

    // Base rate (₦/km) and base fee (₦)
    var RATES = {
      day: { perKm: 50, base: 1500 }, // Same day
      night: { perKm: 70, base: 2000 } // Instant
    };

    function getSelectedType() {
      for (var i = 0; i < typeInputs.length; i++) {
        if (typeInputs[i].checked) return typeInputs[i].value;
      }
      return "day";
    }

    // Approximate straight-line km via the haversine formula,
    // then inflate slightly to account for road travel.
    function haversineKm(lat1, lon1, lat2, lon2) {
      var R = 6371; // Earth radius in km
      var dLat = ((lat2 - lat1) * Math.PI) / 180;
      var dLon = ((lon2 - lon1) * Math.PI) / 180;
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }

    function showError(msg) {
      if (!resultBox) return;
      resultBox.innerHTML =
        '<p class="fare-result__line">' + msg + "</p>";
    }

    fareForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!resultBox) return;

      var fromVal = placeFrom ? placeFrom.value.trim() : "";
      var toVal = placeTo ? placeTo.value.trim() : "";

      if (!fromVal || !toVal) {
        showError("Please enter both pickup and drop-off locations.");
        return;
      }

      var type = getSelectedType();
      var rate = RATES[type] || RATES.day;
      var distKm = 0;

      // Try the browser's geocoding API (requires network access).
      // Falls back to a text-based estimate when unavailable.
      if (window.google && window.google.maps && window.google.maps.Geocoder) {
        var geocoder = new window.google.maps.Geocoder();
        var requestCount = 0;
        var coords = {};

        function geocode(value, key) {
          geocoder.geocode({ address: value }, function (results, status) {
            if (status === "OK" && results && results[0]) {
              coords[key] = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              };
            }
            requestCount++;
            if (requestCount === 2) finish(coords);
          });
        }

        geocode(fromVal, "from");
        geocode(toVal, "to");
      } else {
        // Fallback: estimate distance from the number of words / length.
        distKm = Math.max(1, Math.round((fromVal.length + toVal.length) / 12));
        renderResult(distKm, rate, "estimate");
      }

      function finish(coords) {
        if (coords.from && coords.to) {
          distKm = Math.max(
            1,
            Math.round(haversineKm(coords.from.lat, coords.from.lng, coords.to.lat, coords.to.lng) * 1.3)
          );
          renderResult(distKm, rate, "road");
        } else {
          distKm = Math.max(1, Math.round((fromVal.length + toVal.length) / 12));
          renderResult(distKm, rate, "estimate");
        }
      }
    });

    function renderResult(distKm, rate, mode) {
      var estimated = rate.base + distKm * rate.perKm;
      var note =
        mode === "road"
          ? "Distance estimated from road routes."
          : "Distance estimated from address length.";
      resultBox.innerHTML =
        '<p class="fare-result__line">Approximate distance: <strong>' +
        distKm +
        " km</strong></p>" +
        '<p class="fare-result__line">Estimated fare: <strong>\u20A6' +
        formatNaira(estimated) +
        "</strong></p>" +
        '<p class="fare-result__note">' +
        note +
        "</p>";
    }

    function formatNaira(n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
})();