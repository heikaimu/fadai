/*
 * @Date: 2022-04-08 17:12:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-08-09 10:30:34
 * @FilePath: /fadai-lawyer/js/theme.js
 */

$(function () {
  backTop();
  new WOW().init();

  customSelector();
  mobileNav();
  sideBarNav();
  mobileSearch();
  mainNavToggle();
  wxShow();
  qsToggle();
  cardOmits();
});

// select
function customSelector() {
  $(".custom-selector").each(function () {
    const selector = $(this);
    const placeholder = $(this).find(".placeholder");
    const options = $(this).find(".options");
    placeholder.click(function () {
      $(".custom-selector .options").hide();
      options.show();
    });
  });

  $("body").bind("click", function (e) {
    if (["placeholder"].includes(e.target.className)) {
      return;
    }

    $(".custom-selector .options").hide();
  });
}

function mobileNav() {
  $("[data-nav-open]").click(function () {
    $("[data-nav-wrapper]").addClass("active");
    $("html").css({ "overflow-y": "hidden" });
  });
  $("[data-nav-close]").click(function () {
    $("[data-nav-wrapper]").removeClass("active");
    $("html").css({ "overflow-y": "auto" });
  });
  $("[data-nav-wrapper]").on("click", function () {
    $("[data-nav-wrapper]").removeClass("active");
    $("html").css({ "overflow-y": "auto" });
  });
  $("[data-nav]").on("click", function (e) {
    e.stopPropagation();
  });
}

function mobileSearch() {
  $("[data-search-open]").on("click", function () {
    $("[data-search]").slideDown();
  });

  $("[data-search-close]").on("click", function () {
    $("[data-search]").slideUp();
  });
}

// 侧边导航
function sideBarNav() {
  $("[data-sidebar]")
    .find("[data-sidebar-item]")
    .each(function () {
      if ($(this).hasClass("active")) {
        $(this).find("[data-sidebar-sub]").show();
      }

      $(this).on("click", function () {
        if ($(this).hasClass("active")) {
          $(this).removeClass("active").find("[data-sidebar-sub]").slideUp();
        } else {
          $(this).addClass("active").find("[data-sidebar-sub]").slideDown();
          $(this)
            .siblings()
            .removeClass("active")
            .find("[data-sidebar-sub]")
            .slideUp();
        }
      });
    });
}

// 主导航栏目
function mainNavToggle() {
  // 判断当前分辨率
  const wWidth = $("body").width();
  // PC效果
  if (wWidth > 990) {
    $("[data-nav]")
      .find("[data-nav-lv1]")
      .each(function () {
        const navOne = $(this);
        const navTwoBox = $(this).find("[data-nav-lv2-wrapper]");
        if (navTwoBox.length) {
          const hasActive = navOne.find("[data-nav-lv1-text]").hasClass("active")
          navOne.hover(
            function () {
              navTwoBox.show();
              if (!hasActive) {
                navOne.find("[data-nav-lv1-text]").addClass("active");
              }
            },
            function () {
              navTwoBox.hide();
              if (!hasActive) {
                navOne.find("[data-nav-lv1-text]").removeClass("active");
              }
            }
          );

          navTwoBox.find("[data-nav-lv2]").each(function () {
            const navTwo = $(this);
            const navThree = $(this).find("[data-nav-lv3-wrapper]");

            if (navThree.length) {
              navTwo.hover(
                function () {
                  navThree.show();
                },
                function () {
                  navThree.hide();
                }
              );
            }
          });
        }
      });
  } else {
    // 移动端效果
    $("[data-nav]")
      .find("[data-nav-lv1]")
      .each(function () {
        const navTwoOpenButton = $(this).find("[data-nav-lv2-open]");
        const navTwoBox = $(this).find("[data-nav-lv2-wrapper]");
        if (navTwoBox.length) {
          navTwoOpenButton.click(function () {
            if (navTwoBox.css("display") === "none") {
              navTwoBox.slideDown();
              navTwoOpenButton
                .removeClass("icon-down")
                .addClass("icon-up");
            } else {
              navTwoBox.slideUp();
              navTwoOpenButton
                .addClass("icon-down")
                .removeClass("icon-up");
            }
          });

          navTwoBox.find("[data-nav-lv2]").each(function () {
            const navTwoOpenButton = $(this).find("[data-nav-lv3-open]");
            const navThree = $(this).find(".nav-three");

            if (navThree.length) {
              navTwoOpenButton.click(function () {
                if (navThree.css("display") === "none") {
                  navThree.slideDown();
                  navTwoOpenButton
                    .removeClass("icon-plus")
                    .addClass("icon-reduce1");
                } else {
                  navThree.slideUp();
                  navTwoOpenButton
                    .addClass("icon-plus")
                    .removeClass("icon-reduce1");
                }
              });
            }
          });
        }
      });
  }
}

if ($(".web-header").hasClass("active")) {
  window.addEventListener("scroll", function () {
    const st = $(document).scrollTop();
    if (st > 300) {
      $(".web-header").addClass("scroll");
    } else {
      $(".web-header").removeClass("scroll");
    }
  });
}

function wxShow() {
  let $qr = undefined;
  $("[data-wx-menu]").hover(function () {
    const { left, top } = $(this).offset();
    const src = $(this).attr('_src');
    $qr = $(`<div id="qrImage" style="position:fixed; left:${left - 12}px; top:${top + 30}px; z-index: 9999"><img style="max-width: 160px;" src="${src}"/></div>`);
    $("body").append($qr);
  }, function () {
    $qr.remove();
  })
}

function isMobile() {
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    return true;
  } else {
    return false;
  }
}

function cardOmits() {
  $(".new-lawyer-card").each(function () {
    const l = $(this).find('.new-lawyer-card__roles p').length
    $(this).find('.new-lawyer-card__desc').addClass(`omits${l}`)
  })
}

function qsToggle() {
  $(".mobile-problem-card").each(function () {
    const heading = $(this).find(".mobile-problem-card__heading")
    const content = $(this).find(".mobile-problem-card__content")
    heading.click(function () {
      if (heading.hasClass('active')) {
        heading.removeClass('active')
        content.hide()
      } else {
        heading.addClass('active')
        content.show()
      }
    })

  })
}

