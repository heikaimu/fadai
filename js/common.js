/*
 * @Date: 2022-04-27 12:26:20
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-05-05 16:07:36
 * @FilePath: /school-webs/webs/2022-4-zby-laboratory/js/common.js
 */
// 弹窗
function layer(title, message, callbackFn) {
  var str = '<div class="layer" id="customLayer"><div class="layer__blank"></div><div class="layer__content"><div class="layer-top"><p class="text">' + title + '</p></div><div class="layer-bottom"><p class="text">' + message + '</p><div class="confirm"><p class="confirm-button" id="layerConfirm">确定</p></div></div></div></div>'
  var $layer = $(str);
  $("body").append($layer);
  $layer.find('#layerConfirm').on('click', function () {
    $layer.remove();
    callbackFn();
  });
}

// 页面刷新回到顶部，回到顶部按钮
function backTop() {
  const sp = document.getElementById("startPos");
  if (sp) {
    // sp.scrollIntoView({
    //   // 滚动到指定节点
    //   block: 'start', // 值有start,center,end，nearest，当前显示在视图区域中间
    //   behavior: 'smooth' // 值有auto、instant,smooth，缓动动画（当前是慢速的）
    // });
  } else {
    $('body,html').animate({
      scrollTop: 0
    }, 300);

    $("#backTopMenu").backTop({
      offset: 500,
      duration: 300
    });
  }


}

function startPosScroll() {
  const sp = document.getElementById("startPos");
  if (sp) {
    sp.scrollIntoView({
      // 滚动到指定节点
      block: 'start', // 值有start,center,end，nearest，当前显示在视图区域中间
      behavior: 'smooth' // 值有auto、instant,smooth，缓动动画（当前是慢速的）
    });
  }
}
