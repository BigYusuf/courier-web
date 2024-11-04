/* ==============
 ========= js documentation ==========================

 * theme name: HIEQ
 * version: 1.0
 * description: Shipping Services HTML Template
 * author: expert-Themes
 * author-url: https://themeforest.net/user/expert-themes

    ==================================================

     01. preloader
     -------------------------------------------------
     02. navbar
     -------------------------------------------------
     03. sidebar cart
     -------------------------------------------------
     04. copyright year
     -------------------------------------------------
     05. scroll to top
     -------------------------------------------------
     06. cart increaser
     -------------------------------------------------
     07. coming soon
     -------------------------------------------------
     08. Event Countdown Timer
     -------------------------------------------------
     09. shop single tab

    ==================================================
============== */

(function ($) {
  "use strict";

  jQuery(document).ready(function () {
    // preloader
    $("#preloader").hide();

    // navbar
    $(".nav__bar").on("click", function () {
      $(this).toggleClass("nav__bar-toggle");
      $(".nav__menu").toggleClass("nav__menu-active");
      $(".backdrop").toggleClass("backdrop-active");
      $("body").toggleClass("body-active");
    });

    $(".nav__bar-alt").on("click", function () {
      $(this).toggleClass("nav__bar-toggle-active");
      $(".off-canvas-backdrop").toggleClass("off-canvas-backdrop-active");
      $(".off-canvas").toggleClass("off-canvas-active");
      $("body").toggleClass("body-active");
    });

    $(".off-canvas-backdrop, .off-canvas-close").on("click", function () {
      $(".off-canvas").removeClass("off-canvas-active");
      $(".off-canvas-backdrop").removeClass("off-canvas-backdrop-active");
      $("body").removeClass("body-active");
      $(".nav__bar-alt").removeClass("nav__bar-toggle-active");
    });

    $(".backdrop, .nav__menu-close").on("click", function () {
      $(".backdrop").removeClass("backdrop-active");
      $(".nav__bar").removeClass("nav__bar-toggle");
      $(".nav__menu").removeClass("nav__menu-active");

      $(".nav__dropdown").removeClass("nav__dropdown-active");
      $(".nav__menu-link--dropdown").next(".nav__dropdown").slideUp(500);
      $(".nav__menu-link--dropdown").removeClass(
        "nav__menu-link--dropdown-active"
      );
      $("body").removeClass("body-active");
      $(".off-canvas").removeClass("off-canvas-active");
      $(".sidebar-cart").removeClass("sidebar-cart-active");
    });

    $(".search").on("click", function () {
      $("body").addClass("search-active body-active");
    });

    $(".close-search").on("click", function () {
      $("body").removeClass("search-active body-active");
    });

    $(window).on("resize", function () {
      $(".backdrop").removeClass("backdrop-active");
      $(".nav__bar").removeClass("nav__bar-toggle");
      $(".nav__bar-alt").removeClass("nav__bar-toggle-active");
      $(".nav__menu").removeClass("nav__menu-active");
      $(".nav__dropdown").removeClass("nav__dropdown-active");
      $(".nav__menu-link--dropdown").removeClass(
        "nav__menu-link--dropdown-active"
      );
      $(".sidebar-cart").removeClass("sidebar-cart-active");
      $("body").removeClass("body-active");
      $(".search-popup").removeClass("search-popup-active");
      $(".off-canvas").removeClass("off-canvas-active");
      $(".off-canvas-backdrop").removeClass("off-canvas-backdrop-active");
      $(".cart-backdrop").removeClass("cart-backdrop-active");
    });

    $(".nav__menu-link--dropdown, .nav__menu-item--dropdown-item-link").on(
      "click",
      function () {
        $(this).toggleClass("nav__menu-link--dropdown-active");
      }
    );

    $(".nav__menu-link--dropdown").on("click", function () {
      if (window.matchMedia("(max-width: 1199.98px)").matches) {
        $(this).next(".nav__dropdown").slideToggle(300);
      }
    });

    $(".nav__menu-item--dropdown-item-link").on("click", function () {
      if (window.matchMedia("(max-width: 1199.98px)").matches) {
        $(this).next(".nav__dropdown--sub").slideToggle(300);
      }
    });

    // on window scroll
    $(window).on("scroll", function () {
      var scroll = $(window).scrollTop();
      if (scroll < 100) {
        $(".header--primary").removeClass("header-active");
        $(".topbar--primary").removeClass("topbar-hide");
        $(".topbar--tertiary").removeClass("topbar-hide");
        $(".header--tertiary").removeClass("header--tertiary-active");
      } else {
        $(".header--primary").addClass("header-active");
        $(".topbar--primary").addClass("topbar-hide");
        $(".topbar--tertiary").addClass("topbar-hide");
        $(".header--tertiary").addClass("header--tertiary-active");
      }

      if ($(window).width() >= 1200) {
        if (scroll < 130) {
          $(".header--secondary").removeClass("header--secondary-active");
        } else {
          $(".header--secondary").addClass("header--secondary-active");
        }
      }

      if ($(window).width() < 1200) {
        if (scroll < 100) {
          $(".header--secondary").removeClass("header--secondary-active");
        } else {
          $(".header--secondary").addClass("header--secondary-active");
        }
      }

      if (scroll < 10) {
        $(".altu-top").removeClass("altu-top-active");
        $(".header--secondary").removeClass("header--secondary-active");
      } else {
        $(".altu-top").addClass("altu-top-active");
        $(".header--secondary").addClass("header--secondary-active");
      }
    });

    // sidebar cart

    $(".cart").on("click", function () {
      $(".sidebar-cart").addClass("sidebar-cart-active");
      $(".cart-backdrop").addClass("cart-backdrop-active");
      $("body").toggleClass("body-active");
    });

    $(".close-cart").on("click", function () {
      $(".sidebar-cart").removeClass("sidebar-cart-active");
      $(".cart-backdrop").removeClass("cart-backdrop-active");
      $("body").removeClass("body-active");
    });

    $(".cart-backdrop").on("click", function () {
      $(".sidebar-cart").removeClass("sidebar-cart-active");
      $(".cart-backdrop").removeClass("cart-backdrop-active");
      $("body").removeClass("body-active");
    });

    $(".sidebar-cart").on("click", function (event) {
      event.stopPropagation();
    });

    function calculateTotalPrice() {
      var totalPrice = 0;
      $(".cart-item-single").each(function () {
        var quantity = parseInt($(this).find(".item-quantity").text());
        var price = parseFloat($(this).find(".item-price").text());
        totalPrice += quantity * price;
      });
      $(".total-price").text(totalPrice.toFixed(2));
    }

    $(".cart-item-single").each(function () {
      var quantity = parseInt($(this).find(".item-quantity").text());
      $(this)
        .find(".quantity-increase")
        .click(function () {
          if (quantity < 6) {
            quantity++;
            $(this).siblings(".item-quantity").text(quantity);
            calculateTotalPrice();
          }
        });
      $(this)
        .find(".quantity-decrease")
        .click(function () {
          if (quantity > 1) {
            quantity--;
            $(this).siblings(".item-quantity").text(quantity);
            calculateTotalPrice();
          }
        });
      $(this)
        .find(".delete-item")
        .click(function () {
          $(this).closest(".cart-item-single").hide();
        });
    });

    // copyright year
    $("#copyYear").text(new Date().getFullYear());

    // scroll to top
    $(".scroll-to-top").on("click", function () {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        500
      );
    });

    // cart increaser
    if ($(".quantity-spinner").length) {
      $("input.quantity-spinner").TouchSpin({
        verticalbuttons: true,
      });
    }

    // coming soon
    if ($(".clock-wrapper").length) {
      (function () {
        // Generate clock animations
        var now = new Date();
        var hourDeg =
          (now.getHours() / 12) * 360 + (now.getMinutes() / 60) * 30;
        var minuteDeg =
          (now.getMinutes() / 60) * 360 + (now.getSeconds() / 60) * 6;
        var secondDeg = (now.getSeconds() / 60) * 360;

        var stylesDeg = [
          "@-webkit-keyframes rotate-hour{from{transform:rotate(" +
            hourDeg +
            "deg);}to{transform:rotate(" +
            (hourDeg + 360) +
            "deg);}}",
          "@-webkit-keyframes rotate-minute{from{transform:rotate(" +
            minuteDeg +
            "deg);}to{transform:rotate(" +
            (minuteDeg + 360) +
            "deg);}}",
          "@-webkit-keyframes rotate-second{from{transform:rotate(" +
            secondDeg +
            "deg);}to{transform:rotate(" +
            (secondDeg + 360) +
            "deg);}}",
          "@-moz-keyframes rotate-hour{from{transform:rotate(" +
            hourDeg +
            "deg);}to{transform:rotate(" +
            (hourDeg + 360) +
            "deg);}}",
          "@-moz-keyframes rotate-minute{from{transform:rotate(" +
            minuteDeg +
            "deg);}to{transform:rotate(" +
            (minuteDeg + 360) +
            "deg);}}",
          "@-moz-keyframes rotate-second{from{transform:rotate(" +
            secondDeg +
            "deg);}to{transform:rotate(" +
            (secondDeg + 360) +
            "deg);}}",
        ].join("");
        document.getElementById("clock-animations").innerHTML = stylesDeg;
      })();
    }

    // Event Countdown Timer
    if ($(".time-countdown").length) {
      $(".time-countdown").each(function () {
        var $this = $(this);
        var finalDate = new Date("29 April 2025 9:56:00 GMT+01:00");
        finalDate.setDate(finalDate.getDate()); // Add 365 days from today

        $this.countdown(finalDate, function (event) {
          var $this = $(this).html(
            event.strftime(
              "" +
                '<div class="counter-column"><span class="count">%D</span>Days</div> ' +
                '<div class="counter-column"><span class="count">%H</span>Hours</div>  ' +
                '<div class="counter-column"><span class="count">%M</span>Minutes</div>  ' +
                '<div class="counter-column"><span class="count">%S</span>Seconds</div>'
            )
          );
        });
      });
    }

    // shop single tab
    if ($(".tabs-box").length) {
      $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
        e.preventDefault();
        var target = $($(this).attr("data-tab"));

        if ($(target).is(":visible")) {
          return false;
        } else {
          target
            .parents(".tabs-box")
            .find(".tab-buttons")
            .find(".tab-btn")
            .removeClass("active-btn");
          $(this).addClass("active-btn");
          target
            .parents(".tabs-box")
            .find(".tabs-content")
            .find(".tab")
            .fadeOut(0);
          target
            .parents(".tabs-box")
            .find(".tabs-content")
            .find(".tab")
            .removeClass("active-tab");
          $(target).fadeIn(300);
          $(target).addClass("active-tab");
        }
      });
    }
  });
})(jQuery);
