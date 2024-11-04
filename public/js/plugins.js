/* ==============
 ========= js documentation ==========================

 * theme name: HIEQ
 * version: 1.0
 * description: Shipping Services HTML Template
 * author: expert-Themes
 * author-url: https://themeforest.net/user/expert-themes

    ==================================================

     01. banner one slider
     -------------------------------------------------
     02. banner two slider
     -------------------------------------------------
     03. banner three slider
     -------------------------------------------------
     04. video modal
     -------------------------------------------------
     05. price range
     -------------------------------------------------
     06. select freight
     -------------------------------------------------
     07. select load
     -------------------------------------------------
     08. company slider
     -------------------------------------------------
     09. team vertical slider
     -------------------------------------------------
     10. team horizontal slider
     -------------------------------------------------
     11. testimonial slider
     -------------------------------------------------
     12. sponsor slider
     -------------------------------------------------
     13. counter
     -------------------------------------------------
     14. init wow js
     -------------------------------------------------
     15. project three slider
     -------------------------------------------------
     16. testimonial three slider
     -------------------------------------------------
     17. news three slider
     -------------------------------------------------
     18. project masonry
     -------------------------------------------------
     19. project masonry main
     -------------------------------------------------
     20. latest project slider
     -------------------------------------------------
     21. shop lightbox

    ==================================================
============== */

(function ($) {
  "use strict";

  jQuery(document).ready(function () {
    // device width
    let device_width = window.innerWidth;

    // banner one slider
    // $(".banner-alt-slider")
    //   .not(".slick-initialized")
    //   .slick({
    //     infinite: true,
    //     autoplay: true,
    //     focusOnSelect: true,
    //     slidesToShow: 1,
    //     speed: 3000,
    //     autoplaySpeed: 5000,
    //     slidesToScroll: 1,
    //     arrows: true,
    //     dots: false,
    //     fade: true,
    //     prevArrow: $(".prev-ban-one"),
    //     nextArrow: $(".next-ban-one"),
    //     centerMode: true,
    //     centerPadding: "0px",
    //   });

    // $(".banner-alt-slider").addClass("slick-slider--start-animation");

    // // banner two slider
    // $(".banner-two-alt-slider")
    //   .not(".slick-initialized")
    //   .slick({
    //     infinite: true,
    //     autoplay: true,
    //     focusOnSelect: true,
    //     slidesToShow: 1,
    //     speed: 3000,
    //     autoplaySpeed: 5000,
    //     slidesToScroll: 1,
    //     arrows: true,
    //     fade: true,
    //     dots: false,
    //     prevArrow: $(".prev-ban-two"),
    //     nextArrow: $(".next-ban-two"),
    //     centerMode: true,
    //     centerPadding: "0px",
    //   });
    // $(".banner-two-alt-slider").addClass("slick-slider--start-animation");

    // // banner three slider
    // $(".banner-three-alt-slider")
    //   .not(".slick-initialized")
    //   .slick({
    //     infinite: true,
    //     autoplay: true,
    //     focusOnSelect: true,
    //     slidesToShow: 1,
    //     speed: 3000,
    //     fade: true,
    //     autoplaySpeed: 3000,
    //     slidesToScroll: 1,
    //     arrows: true,
    //     dots: false,
    //     prevArrow: $(".prev-ban-three"),
    //     nextArrow: $(".next-ban-three"),
    //     centerMode: true,
    //     centerPadding: "0px",
    //   });
    // $(".banner-three-alt-slider").addClass("slick-slider--start-animation");

    // video modal
    if (document.querySelector(".video-btn") !== null) {
      $(".video-btn").magnificPopup({
        disableOn: 768,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
      });
    }

    // price range
    $("#price-range").slider({
      step: 1,
      range: true,
      min: 0,
      max: 2000,
      values: [0, 2000],
      slide: function (event, ui) {
        $("#priceRange").val(ui.values[0] + " - " + ui.values[1]);
      },
    });
    $("#priceRange").val(
      $("#price-range").slider("values", 0) +
        " - " +
        $("#price-range").slider("values", 1)
    );

    // select freight
    $("#selectFreight").niceSelect();

    // select load
    $("#selectLoad").niceSelect();

    // company slider
    $(".company__slider")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        focusOnSelect: true,
        slidesToShow: 4,
        speed: 1000,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        appendDots: $(".company-pagination"),
        centerMode: false,
        variableWidth: true,
      });

    // team vertical slider
    $(".team-vertical")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        focusOnSelect: true,
        slidesToShow: 3
        speed: 1000,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        vertical: true,
        centerMode: true,
        centerPadding: "0px",
        asNavFor: ".team-horizontal__slider",
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              vertical: false,
            },
          },
          {
            breakpoint: 425,
            settings: {
              slidesToShow: 2,
              vertical: false,
            },
          },
        ],
      });

    // team horizontal slider
    $(".team-horizontal__slider").not(".slick-initialized").slick({
      infinite: true,
      autoplay: true,
      focusOnSelect: true,
      slidesToShow: 1,
      speed: 1000,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      centerMode: false,
      asNavFor: ".team-vertical",
    });

    // testimonial slider
    $(".testimonial__slider")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        focusOnSelect: true,
        slidesToShow: 2,
        speed: 1000,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        appendDots: $(".testimonial-pagination"),
        centerMode: false,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });

    // sponsor slider
    $(".sponsor__slider")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        focusOnSelect: true,
        slidesToShow: 5,
        speed: 1000,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        centerMode: false,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
      });

    // counter
    $(".odometer").each(function () {
      $(this).isInViewport(function (status) {
        if (status === "entered") {
          for (
            var i = 0;
            i < document.querySelectorAll(".odometer").length;
            i++
          ) {
            var el = document.querySelectorAll(".odometer")[i];
            el.innerHTML = el.getAttribute("data-odometer-final");
          }
        }
      });
    });

    // init wow js
    new WOW().init();

    // project three slider
    $(".project-three__slider")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        focusOnSelect: true,
        slidesToShow: 4,
        speed: 1000,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $(".prev-project-three"),
        nextArrow: $(".next-project-three"),
        dots: false,
        centerMode: true,
        variableWidth: true,
        centerPadding: "0px",
      });

    // testimonial three slider
    $(".testimonial-three__slider")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        focusOnSelect: true,
        slidesToShow: 2,
        speed: 2000,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        appendDots: $(".testimonial-three-pagination"),
        centerMode: false,
        centerPadding: "0px",
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });

    // news three slider
    $(".news-three__slider")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        focusOnSelect: true,
        slidesToShow: 2,
        speed: 2000,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        appendDots: $(".news-three-pagination"),
        centerMode: false,
        centerPadding: "0px",
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });

    // project masonry
    function masonryFilter() {
      if ($(".grid").length) {
        // Initialize Isotope
        var $gridt = $(".grid").isotope({
          itemSelector: ".grid-item",
          layoutMode: "fitRows",
        });

        // Filter functions
        var filterFnst = {
          all: function () {
            return true;
          },
        };

        // Bind filter button click
        $(".project-main__filter").on("click", "button", function () {
          var filterValuet = $(this).attr("data-filter");
          filterValuet = filterFnst[filterValuet] || filterValuet;
          $gridt.isotope({ filter: filterValuet });
        });

        // Change active class on buttons
        $(".project-main__filter").each(function (i, buttonGroupt) {
          var $buttonGroupt = $(buttonGroupt);
          $buttonGroupt.on("click", "button", function () {
            $buttonGroupt.find(".active").removeClass("active");
            $(this).addClass("active");
          });
        });

        // Set easing effect duration
        $gridt.isotope({
          transitionDuration: "1200ms",
        });
      }
    }

    masonryFilter();

    // project masonry main
    function masonryMain() {
      if ($(".masonry-grid").length) {
        // Initialize Isotope
        var $grid = $(".masonry-grid").isotope({
          itemSelector: ".grid-item-main",
          layoutMode: "fitRows",
        });

        // Filter functions
        var filterFns = {
          all: function () {
            return true;
          },
        };

        // Bind filter button click
        $(".project-main-masonry__filter").on("click", "button", function () {
          var filterValue = $(this).attr("data-filter");
          filterValue = filterFns[filterValue] || filterValue;
          $grid.isotope({ filter: filterValue });
        });

        // Change active class on buttons
        $(".project-main-masonry__filter").each(function (i, buttonGroup) {
          var $buttonGroup = $(buttonGroup);
          $buttonGroup.on("click", "button", function () {
            $buttonGroup.find(".active").removeClass("active");
            $(this).addClass("active");
          });
        });

        // Set easing effect duration
        $grid.isotope({
          transitionDuration: "1200ms",
        });
      }
    }

    masonryMain();

    // latest project slider
    $(".latest-project__slider")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        focusOnSelect: true,
        slidesToShow: 3,
        speed: 2000,
        autoplaySpeed: 2000,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        centerMode: false,
        prevArrow: $(".previous-slide"),
        nextArrow: $(".next-slide"),
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });

    // shop lightbox
    if ($(".lightbox-image").length) {
      $(".lightbox-image").fancybox({
        openEffect: "fade",
        closeEffect: "fade",
        helpers: {
          media: {},
        },
      });
    }

    // product slider
    $(".image-carousel").not(".slick-initialized").slick({
      infinite: true,
      autoplay: true,
      focusOnSelect: true,
      slidesToShow: 1,
      speed: 2000,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      centerMode: false,
      centerPadding: "0px",
      autoplaySpeed: 2000,
    });

    $(".thumbs-carousel")
      .not(".slick-initialized")
      .slick({
        infinite: true,
        autoplay: true,
        focusOnSelect: true,
        slidesToShow: 4,
        speed: 2000,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        centerMode: false,
        asNavFor: ".image-carousel",
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 375,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
      });

    // register gsap
    gsap.registerPlugin(
      ScrollTrigger,
      ScrollSmoother,
      TweenMax,
      ScrollToPlugin
    );

    // config gsap
    gsap.config({
      nullTargetWarn: false,
    });

    if (device_width > 100) {
      // smooth scroll

      const smoother = ScrollSmoother.create({
        smooth: 2.2,
        effects: device_width < 1025 ? false : true,
        smoothTouch: false,
        normalizeScroll: false,
        ignoreMobileResize: true,
      });

      // title animation
      let splitTitleLines = gsap.utils.toArray(".title-anim");

      splitTitleLines.forEach((splitTextLine) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: splitTextLine,
            start: "top 90%",
            end: "bottom 60%",
            scrub: false,
            markers: false,
            toggleActions: "play none none none",
          },
        });

        const itemSplitted = new SplitText(splitTextLine, {
          type: "words, lines",
        });
        gsap.set(splitTextLine, { perspective: 400 });
        itemSplitted.split({ type: "lines" });
        tl.from(itemSplitted.lines, {
          duration: 1,
          delay: 0.3,
          opacity: 0,
          rotationX: -80,
          force3D: true,
          transformOrigin: "top center -50",
          stagger: 0.1,
        });
      });

      // text animation
      let splitTextLines = gsap.utils.toArray(".text-anim p");

      splitTextLines.forEach((splitTextLine) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: splitTextLine,
            start: "top 90%",
            duration: 2,
            end: "bottom 60%",
            scrub: false,
            markers: false,
            toggleActions: "play none none none",
          },
        });

        const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
        gsap.set(splitTextLine, { perspective: 400 });
        itemSplitted.split({ type: "lines" });
        tl.from(itemSplitted.lines, {
          duration: 1,
          delay: 0.5,
          opacity: 0,
          rotationX: -80,
          force3D: true,
          transformOrigin: "top center -50",
          stagger: 0.1,
        });
      });
    }

    let char_come = document.querySelectorAll(".animation__char_come");

    char_come.forEach((char_come) => {
      let split_char = new SplitText(char_come, { type: "chars, words" });
      gsap.from(split_char.chars, {
        duration: 1,
        x: 70,
        autoAlpha: 0,
        stagger: 0.05,
      });
    });

    // fade bottom
    const boxes1 = gsap.utils.toArray(".gFadeBottom");

    boxes1.forEach((box1, i) => {
      gsap.from(box1, {
        y: 100,
        opacity: 0,
        duration: 1.7,
        delay: 0.3,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: box1,
          scrub: false,
          markers: false,
          start: "top 80%",
          end: "bottom 60%",
        },
      });
    });

    gsap.set(".fade_bottom", { y: 30, opacity: 0 });

    if (device_width < 1023) {
      const fadeArray = gsap.utils.toArray(".fade_bottom");
      fadeArray.forEach((item, i) => {
        let fadeTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top center+=200",
          },
        });
        fadeTl.to(item, {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 1.5,
        });
      });
    } else {
      gsap.to(".fade_bottom", {
        scrollTrigger: {
          trigger: ".fade_bottom",
          start: "top center+=300",
          markers: false,
        },
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 1,
        stagger: {
          each: 0.2,
        },
      });
    }

    // fade right
    gsap.set(".cmn-animation .cmn-animation-item", { x: 50, opacity: 0 });

    if (device_width < 1023) {
      const blogList = gsap.utils.toArray(".cmn-animation .cmn-animation-item");
      blogList.forEach((item, i) => {
        let blogTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top center+=200",
          },
        });
        blogTl.to(item, {
          x: 0,
          opacity: 1,
          ease: "power2.out",
          duration: 1.5,
        });
      });
    } else {
      gsap.to(".cmn-animation .cmn-animation-item", {
        scrollTrigger: {
          trigger: ".cmn-animation .cmn-animation-item",
          start: "top center+=300",
          markers: false,
        },
        x: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 2,
        stagger: {
          each: 0.3,
        },
      });
    }

    // animation four
    gsap.set(".bdFade3", { y: 40, opacity: 0 });
    gsap.to(".bdFade3", {
      scrollTrigger: {
        trigger: ".bdFade3",
        start: "top bottom-=130",
        markers: false,
      },
      y: 0,
      opacity: 1,
      ease: "back.out(2.7)",
      duration: 1,
      stagger: 0.3,
    });
  });
})(jQuery);
