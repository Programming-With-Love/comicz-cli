var coid = /\/(\d+\/\d+)\.html/.exec(document.location);
var coid_num = /\d+\/(\d+)/.exec(coid)[1];
var cid = /\/colist_(\d+)\.html/.exec(link_z)[1];
var cache_img_num = 2;
var cache_img_num_now = 1;

coid = coid[1];

var page = document.location.hash.split("page=");
page = (page[1] == null) | (page[1] == "undefined") ? 1 : parseInt(page[1]);

var thisURL = location.href;
var theURL = thisURL;

if (page > maxPage) {
  page = maxPage;
}
if (page < 1) {
  page = 1;
}
var next = "";
var nextText = "";
var preText = "";
var prePage = "";
var previousPage = page > 1 ? page - 1 : 1;
var nextPage = page < maxPage ? page + 1 : maxPage;

$("#report").html("报错").before("<span id='user_at'></span>");
$("#tab_srv").append(
  '<a href="javascript:void(0);" onclick="tabSrvCe(this)" id="tab_srv4">服务器4</a><a href="javascript:void(0);" onclick="tabSrvCe(this)" id="tab_srv5">服务器5</a>'
);

var imgWD = 0;
var winWD = 0;
var resval = $.cookie("rs");
if (resval == null) {
  resval = 1;
}
$(window).resize(function () {
  if (resval == 1) {
    dragResize();
  } else {
    dragResizeR();
  }
});

var iiname = "dracga";

function dragResizeR() {
  $("#" + iiname).attr("style", "max-width:auto");
}
function dragResize() {
  $("#" + iiname).attr("style", "max-width:" + $(window).width() + "px");
}
function longInsert_cont() {
  var loginfo = "";
  if (uuid > 0) {
    $.ajax({
      url:
        i_sv +
        "/ajax/HMset.php?act=his&page=1&ComicID=" +
        cid +
        "&url=" +
        coid +
        ".html" +
        "&title=" +
        encodeURIComponent(linkname) +
        "&subTitle=" +
        encodeURIComponent(linkn_z),
      dataType: "script",
      cache: true,
    });
    loginfo =
      '当前用户：<b id="loginfo">' +
      uname +
      '</b> <a href="' +
      i_sv +
      '/login.php?type=loginout">退出</a> - <a href="' +
      i_sv +
      '/user.php">用户中心</a>';
  } else {
    $.ajax({
      url:
        his_sv +
        "/utf8_his_set.php?st=" +
        encodeURIComponent(linkn_z) +
        "&t=" +
        encodeURIComponent(linkname) +
        "&cid=" +
        cid +
        "&coid=" +
        coid +
        "&v=603.js",
      dataType: "script",
      cache: false,
    });
    loginfo =
      '<b id="loginfo" style="color:#0CAA35;">当前未登录，浏览记录将不会保存于“用户中心”</b>  请<a href="' +
      i_sv +
      '/login.html">登录</a>';
  }
  $("#user_at").append(loginfo);
}
var tsvr = $.cookie("ts");
if (tsvr == null) {
  tsvr = 1;
}
$("#tab_srv" + tsvr).addClass("act");

function tabSrvCe(obj) {
  var id = $(obj).attr("id");
  var svrid = /\d$/.exec(id);
  $.cookie("ts", null);
  $.cookie("ts", svrid, {
    path: "/",
  });
  location.reload();
}

var svrss = Array(
  css_sv + "/img_v1/cn_svr.aspx",
  css_sv + "/img_v1/hwcf_svr.aspx",
  css_sv + "/img_v1/hw2_svr.aspx",
  css_sv + "/img_v1/cncf_svr.aspx",
  css_sv + "/img_v1/fdc_svr.aspx"
);

if (atsvr == "hw") {
  svrss = Array(
    css_sv + "/img_v1/hw2_svr.aspx",
    css_sv + "/img_v1/cncf_svr.aspx",
    css_sv + "/img_v1/cn_svr.aspx",
    css_sv + "/img_v1/hwcf_svr.aspx",
    css_sv + "/img_v1/fdc_svr.aspx"
  );
  //svrphoto = 'https://h16hk1g.readingbox.net';
}

error_imgsvr = tsvr;



var showPicNum = 4;
var img_qianz = "";
var arr = "";

function imgCache(i) {
  var img = new Image();
  img.onload = function () {
    p = i + 1;
    if (p < showPicNum && page + i < arr.length - 1) imgCache(p);
  };

  img.src = img_qianz + arr[page + i];
}

function getImg() {
  var cont_img = document.getElementById(iiname);
  cont_img.onload = function () {
    if (page != arr.length) {
      imgCache(0);
    }
  };

  if (isIE() === false) {
    cont_img.onerror = function () {
      //alert('img error');
      error_imgsvr++;
      if (error_imgsvr > svrss.length) {
        error_imgsvr = 1;
        //alert('图片暂时无法显示，错误已记录，管理人员会尽快修复，请谅解。');
        return false;
      }

      if (confirm("当前图片服务器发生错误，是否切换到其他线路")) {
        $.cookie("ts", error_imgsvr, { path: "/" });
        location.reload();
      }

      //getImg();
      return false;
    };
  }

  cont_img.src = img_qianz + arr[page - 1];
}

function isIE() {
  //ie?
  if (!!window.ActiveXObject || "ActiveXObject" in window) return true;
  else return false;
}

// FOCUS: 取pathname前缀 + msg图片的数组 即可破解。 取一次即可
$.ajax({
  url: svrss[tsvr - 1],
  cache: true,
  dataType: "script",
  type: "get",
  data: "z=" + atsvr + "&s=" + img_s + "&cid=" + cid + "&coid=" + coid_num, // FOCUS: 在jiemi.js都能得到, cid 和 coid 根据该章节的path取得 取一次即可
  success: function (html) {
    img_qianz = img_qianzso[img_s];
    if (msg != "") {
      arr = msg.split("|");

      if (checkWebp()) {
        if (webpshow == 1) {
          $.each(arr, function (i, n) {
            arr[i] = n + ".webp";
          });
        }
      }

      getImg();
    }

    if (preLink_b != "") {
      var preLink_ba =
        '<a href="' +
        preLink_b.replace(/http:\/\/www\.77mh\.com\//, "/") +
        '" target="_self">上一章:' +
        preName_b +
        "</a>";
    } else {
      var preLink_ba = '<a href="#" target="_self">上一章:没有了</a>';
    }
    if (nextLink_b != "") {
      var nextLink_ba =
        '<a href="' +
        nextLink_b.replace(/http:\/\/www\.77mh\.com\//, "/") +
        '" target="_self">下一章:' +
        nextName_b +
        "</a>";
    } else {
      var nextLink_ba = "";
    }
    if (page == maxPage) {
      if (0) {
        nextPage = 1;
      }
    }
    if (page < maxPage) {
      nextPage = page + 1;
      nextText = '<a href="#@page=' + nextPage + '" target="_self">下一页</a>';
    } else {
      if (1) {
        nextText =
          '<a href="#@page=' + nextPage + '" target="_self">下一页</a>';
      }
    }
    if (page == maxPage) {
      if (nextLink_b != "") {
        nextText =
          '<a href="' + nextLink_b + '#@page=1" target="_self">下一章</a>';
      } else {
        nextText = '<a href="/" target="_self">下一页</a>';
      }
    }
    if (page > 1) {
      prePage = page - 1;
      preText = '<a href="#@page=' + prePage + '" target="_self">上一页</a>';
    } else {
      if (1) {
        preText =
          '<a href="#@page=' + previousPage + '" target="_self">上一页</a>';
      }
    }

    function jumpPage(gPage) {
      if (gPage > maxPage) {
        if (nextLink_b != "") {
          if (confirm("本话已结束，将跳转到下一话。") == true) {
            window.parent.location.href = nextLink_b.replace(
              /http:\/\/www\.77mh\.com\//,
              "/"
            );
          }
        } else {
          alert("已到最后一页");
          page = gPage - 1;
        }
      } else if (gPage < 1) {
        if (preLink_b != "") {
          if (confirm("已是第一页，将跳转到上一话。") == true) {
            window.parent.location.href = preLink_b.replace(
              /http:\/\/www\.77mh\.com\//,
              "/"
            );
          }
        } else {
          alert("已是第一页");
          page = gPage + 1;
        }
      } else {
        $("#comicImg img").prop("src", "");
        $("#spacing").next().remove();
        //showAdd();
        page = gPage;
        document.location.hash = "@page=" + gPage;
        $(".selectTT").html(getHtmlOption(page));
        $(".showPageNum").html(page);
        getImg();
        $("html,body").scrollTop($("#main").offset().top);
      }
    }

    function getHtmlOption(npage) {
      var htmlOption = "";
      for (var i = 1; i <= maxPage; i++) {
        if (i == npage) {
          htmlOption += '<option selected="selected">' + i + "</option>";
        } else {
          htmlOption += "<option>" + i + "</option>";
        }
      }
      return htmlOption;
    }

    var outinfo =
      '<a href="javascript:void(0);" class="pHome">首页</a> <a href="javascript:void(0);" class="pPrve">上一页</a> <a href="javascript:void(0);" class="pNext">下一页</a> <a href="javascript:void(0);" class="pEnd">尾页</a> 跳转：<select class="selectTT">' +
      getHtmlOption(page) +
      "</select>";

    $("#" + iiname).click(function () {
      page = page + 1;
      jumpPage(page);
    });

    $(".page_num").html(outinfo);

    $(".pHome").click(function () {
      page = 1;
      jumpPage(page);
    });

    $(".pEnd").click(function () {
      page = maxPage;
      jumpPage(page);
    });

    $(".pPrve").click(function () {
      page = page - 1;
      jumpPage(page);
    });

    $(".pNext").click(function () {
      page = page + 1;
      jumpPage(page);
    });

    $(".selectTT").change(function () {
      jumpOPUrl(this);
    });

    function jumpOPUrl(selObj) {
      gpage = parseInt(selObj.options[selObj.selectedIndex].value);
      jumpPage(gpage);
    }

    $("#pnpage").html(preLink_ba + nextLink_ba);

    $(document).keyup(function (event) {
      evt = event;
      var keyCode = evt.keyCode
        ? evt.keyCode
        : evt.which
        ? evt.which
        : evt.charCode;
      if (keyCode == 39) {
        page = page + 1;
        jumpPage(page);
      }
      if (keyCode == 37) {
        page = page - 1;
        jumpPage(page);
      }
    });
  },
});

$("#nav_menu").html(
  '<a href="/">首页</a><a href="/rexue/index.html" title="热血机战 列表">热血机战</a><a href="/kehuan/index.html" title="科幻未来 列表">科幻未来</a><a href="/kongbu/index.html" title="恐怖惊悚 列表">恐怖惊悚</a><a href="/xuanyi/index.html" title="推理悬疑 列表">推理悬疑</a><a href="/gaoxiao/index.html" title="滑稽搞笑 列表">滑稽搞笑</a><a href="/love/index.html" title="恋爱生活 列表">恋爱生活</a><a href="/danmei/index.html" title="耽美人生 列表">耽美人生</a><a href="/tiyu/index.html" title="体育竞技 列表">体育竞技</a><a href="/chunqing/index.html" title="纯情少女 列表">纯情少女</a><a href="/qihuan/index.html" title="魔法奇幻 列表">魔法奇幻</a><a href="/wuxia/index.html" title="武侠经典 列表">武侠经典</a>'
);

$(".page_tip").append(
  '<span>第<b style="color:red" class="showPageNum">' +
    page +
    '</b>页/共<b style="color:red">' +
    maxPage +
    '</b>页</span> <span><a class="red" href="' +
    cmt_sv +
    "/report.php?url=" +
    thisURL +
    '" target="_blank"><font color="red">看不到图片!?</font></a></span> <span class="mark">做个记号</span>'
);
$(".page_tip").after(
  "<p><b>下一页：[单击图片] 或者 [键盘右键] - 上一页：[键盘左键] </b></p>"
);

if (resval == 1) {
  $(".page_tip").prepend(
    '<span class="imgZoom"><label title="如果图片宽度超过浏览器宽度将自动缩放"><input class="imgZoomI" type="checkbox" checked="true") />图片自动缩放</label></span>'
  );
  dragResize();
} else {
  $(".page_tip").prepend(
    '<span class="imgZoom"><label title="如果图片宽度超过浏览器宽度将自动缩放"><input class="imgZoomI" type="checkbox" />图片自动缩放</label></span>'
  );
  dragResizeR();
}

$(".imgZoomI").change(function () {
  if ($(this).prop("checked") == true) {
    dragResize();
    $.cookie("rs", 1, {
      path: "/",
    });
    resval = 1;
  } else {
    dragResizeR();
    $.cookie("rs", 0, {
      path: "/",
    });
    resval = 0;
  }
});

$(".mark").click(function () {
  xmark("cont", coid, page);
});
var $dialog_box = $("#ajax_dialog");
$("#report").click(function (event) {
  event.preventDefault();
  window.open(cmt_sv + "/report.php?url=" + thisURL);
});

function checkWebp() {
  try {
    return (
      document
        .createElement("canvas")
        .toDataURL("image/webp")
        .indexOf("data:image/webp") == 0
    );
  } catch (err) {
    return false;
  }
}

function xmark(type, id, page) {
  if (uuid > 0) {
    $.ajax({
      url:
        i_sv +
        "/ajax/HMset.php?act=mark&page=" +
        page +
        "&ComicID=" +
        cid +
        "&url=" +
        coid +
        ".html" +
        "&title=" +
        encodeURIComponent(linkname) +
        "&subTitle=" +
        encodeURIComponent(linkn_z) +
        "&call=?",
      dataType: "json",
      cache: false,
      success: function (data) {
        if (data.i == 1) {
          alert("为本页面做记号完成!");
        } else {
          if (data.i == 4) {
            alert("记号已满，请删除后再添加!");
          } else {
            alert("失败!");
          }
        }
      },
    });
  } else {
    var title = linkn_z + linkname;
    $.getScript(
      mark_sv +
        "/utf8_mark_set.php?t=" +
        encodeURIComponent(title) +
        "&id=" +
        id +
        "&p=" +
        page,
      function () {
        if (msg == "1") {
          alert("为本页面做记号完成!");
        } else {
          alert("失败!");
        }
      }
    );
  }
}
