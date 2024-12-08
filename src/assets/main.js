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
  // 移动端页脚导航栏按钮事件
  $("#actions-footer > #menu").click(function () {
    const navFooter = $("#nav-footer");
    if (navFooter.is(":visible")) {
      navFooter.slideUp(200);
    } else {
      navFooter.slideDown(200);
    }
  });
  $("#actions-footer > #toc").click(function () {
    const tocFooter = $("#toc-footer");
    if (tocFooter.is(":visible")) {
      tocFooter.slideUp(200);
    } else {
      tocFooter.slideDown(200);
    }
  });
  $("#actions-footer > #share").click(function () {
    const shareFooter = $("#share-footer");
    if (shareFooter.is(":visible")) {
      shareFooter.slideUp(200);
    } else {
      shareFooter.slideDown(200);
    }
  });

  // 桌面端文章页导航栏按钮事件
  $("#actions #action-share").click(function () {
    const shareMenu = $("#share-list");
    if (shareMenu.is(":visible")) {
      shareMenu.slideUp(200);
    } else {
      shareMenu.slideDown(200);
    }
  });

  /**
   * Shows the responsive navigation menu on mobile.
   */
  // 移动端页眉菜单按钮事件
  const mobileMenuIcon = $("#header > #nav > ul > .icon");
  const mobileMenu = $("#header > #nav > ul > li:not(:first-child)");
  mobileMenuIcon.on("click", function () {
    if (mobileMenu.is(":visible")) {
      mobileMenu.slideUp(200, function () {
        mobileMenu.removeClass("responsive").css("display", "");
      });
    } else {
      mobileMenu.slideDown(200, function () {
        mobileMenu.addClass("responsive").css("display", "");
      });
    }
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
      menuIcon.addClass("active"); // for #header-post .active style
      menu.show();
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.on("click", function () {
      if (menu.is(":visible")) {
        menuIcon.removeClass("active");
        menu.fadeOut(50);
      } else {
        menuIcon.addClass("active");
        menu.fadeIn(50);
      }
      return false;
    });

    /**
     * Add a scroll listener to the menu to hide/show the navigation links.
     */
    // 平板端文章页导航栏、回到顶部按钮 页面滚动相关逻辑
    if (menu.length) {
      $(window).on("scroll", function () {
        var topDistance = $(window).scrollTop();

        // hide only the navigation links on desktop
        // if (!nav.is(":visible") && topDistance < 50) {
        //   nav.show();
        // } else if (nav.is(":visible") && topDistance > 100) {
        //   nav.hide();
        // }

        // on tablet, hide the navigation icon as well and
        // show a "scroll to top icon" instead
        const topIcon = $("#top-icon-tablet");
        const menuIconTablet = $("#menu-icon-tablet");
        const menuIcon = $("#menu-icon");
        if (!menuIcon.is(":visible") && topDistance < 50) {
          menuIconTablet.fadeIn(200);
          topIcon.fadeOut(200);
        } else if (!menuIcon.is(":visible") && topDistance > 100) {
          menuIconTablet.fadeOut(200);
          menu.fadeOut(200);
          topIcon.fadeIn(200);
        }
      });
    }

    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    // 移动端文章页底部导航栏 页面滚动相关逻辑
    const footerNav = $("#footer-post");
    if (footerNav.length) {
      var lastScrollTop = 0;
      $(window).on("scroll", function () {
        var topDistance = $(window).scrollTop();

        // close all submenu"s on scroll
        const navFooter = $("#nav-footer");
        const tocFooter = $("#toc-footer");
        const shareFooter = $("#share-footer");
        navFooter.slideUp(200);
        tocFooter.slideUp(200);
        shareFooter.slideUp(200);

        if (topDistance > lastScrollTop) {
          // 向下滚动
          // downscroll -> hide menu
          footerNav.slideUp(200);
        } else {
          // 向上滚动
          // upscroll -> show menu
          footerNav.slideDown(200);
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
