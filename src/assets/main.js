/**
 * Sets up Justified Gallery.
 */
function isPrototypeJustifiedGallery() {
  return !!$.prototype.justifiedGallery;
}

if (isPrototypeJustifiedGallery()) {
  var options = {
    rowHeight: 140,
    margins: 4,
    lastRow: "justify",
  };
  $(".article-gallery").justifiedGallery(options);
}

window.isMobile = () => {
  let flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return flag;
};

$(function () {
  /**
   * Shows the responsive navigation menu on mobile.
   */
  $("#header > #nav > ul > .icon").on("click", function () {
    $("#header > #nav > ul").toggleClass("responsive");
  });

  /**
   * Controls the different versions of  the menu in blog post articles
   * for Desktop, tablet and mobile.
   */
  if ($(".post").length) {
    const menu = $("#menu");
    // const nav = $("#menu > #nav");
    const menuIcon = $("#menu-icon, #menu-icon-tablet");

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if ($(document).width() >= 1440) {
      menu.css("visibility", "visible");
      menuIcon.addClass("active");
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.on("click", function () {
      if (menu.css("visibility") === "hidden") {
        menu.css("visibility", "visible");
        menuIcon.addClass("active");
      } else {
        menu.css("visibility", "hidden");
        menuIcon.removeClass("active");
      }
      return false;
    });

    /**
     * Add a scroll listener to the menu to hide/show the navigation links.
     */
    if (menu.length) {
      $(window).on("scroll", function () {
        var topDistance = menu.offset().top;

        // hide only the navigation links on desktop
        // if (!nav.is(":visible") && topDistance < 50) {
        //   nav.show();
        // } else if (nav.is(":visible") && topDistance > 100) {
        //   nav.hide();
        // }

        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        if (!$("#menu-icon").is(":visible") && topDistance < 50) {
          $("#menu-icon-tablet").show();
          $("#top-icon-tablet").hide();
        } else if (!$("#menu-icon").is(":visible") && topDistance > 100) {
          $("#menu-icon-tablet").hide();
          $("#top-icon-tablet").show();
        }
      });
    }

    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($("#footer-post").length) {
      var lastScrollTop = 0;
      $(window).on("scroll", function () {
        var topDistance = $(window).scrollTop();

        // close all submenu"s on scroll
        var navFooter = $("#nav-footer");
        var tocFooter = $("#toc-footer");
        var shareFooter = $("#share-footer");
        navFooter.slideUp(200);
        tocFooter.slideUp(200);
        shareFooter.slideUp(200);

        if (topDistance > lastScrollTop) {
          // 向下滚动
          // downscroll -> hide menu
          $("#footer-post").slideUp(200);
        } else {
          // 向上滚动
          // upscroll -> show menu
          $("#footer-post").slideDown(200);
        }
        lastScrollTop = topDistance;

        // show a "navigation" icon when close to the top of the page,
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          $("#actions-footer > #top").hide();
        } else if (topDistance > 100) {
          $("#actions-footer > #top").show();
        }
      });
    }
  }

  // mount it!
  $("article .content pre").wrap('<figure class="highlight"></figure>');
  $("figure.highlight pre code").addClass("hljs");
});

// fotter-nav button events
$(document).ready(function () {
  $("#actions-footer > #menu").click(function () {
    var navFooter = $("#nav-footer");
    if (navFooter.is(":visible")) {
      navFooter.slideUp(200);
    } else {
      navFooter.slideDown(200);
    }
  });
  $("#actions-footer > #toc").click(function () {
    var tocFooter = $("#toc-footer");
    if (tocFooter.is(":visible")) {
      tocFooter.slideUp(200);
    } else {
      tocFooter.slideDown(200);
    }
  });
  $("#actions-footer > #share").click(function () {
    var shareFooter = $("#share-footer");
    if (shareFooter.is(":visible")) {
      shareFooter.slideUp(200);
    } else {
      shareFooter.slideDown(200);
    }
  });
});
