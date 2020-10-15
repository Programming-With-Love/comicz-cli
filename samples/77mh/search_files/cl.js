$("#his_t > a").eq(0).click(function() {
	nTabs(this, 0);
}).end().eq(1).click(function() {
	nTabs(this, 1);
});



var $index_tab_a = $(".conmmand_comic_title a");
var $index_tab_cont = $("#cnt ul");
if ($index_tab_a.length > 0) {
	$index_tab_a.each(function(i, n) {
		$(n).click(function() {
			$index_tab_a.removeClass("act");
			$(this).attr("class", "act");
			$index_tab_cont.hide();
			$("#ConmmandComicTab1_Content" + i).show().find("img").lazyload();
		});
	});
}
$("#GBheader").html('<a class="act" href="javascript:void(0);">今日</a><a href="javascript:void(0);">昨日</a><a href="javascript:void(0);">7日</a><a href="javascript:void(0);">30日</a><a href="javascript:void(0);">全部</a>');
$("#GBheader_Content2").after('<div id="GBheader_Content3" style="display:none;"></div><div id="GBheader_Content4" style="display:none;"></div>');
$(".GBheader > a").each(function(i, n) {
	$(n).click(function() {
		nTabs(this, i);
	});
});
var dmhtml = $('.ar_list h3').html();
if(dmhtml && dmhtml.indexOf('耽美人生')>=0){
	$.ajax({
		url: db_sv + "/ajax/GBlist.php?v=20200327",
		dataType: "script",
		cache: true,
		success: function() {
			$("#GBheader_Content0").html(topInsert(tdaylist));
			$("#GBheader_Content1").html(topInsert(ydaylist));
			$("#GBheader_Content2").html(topInsert(daylist));
			$("#GBheader_Content3").html(topInsert(monlist));
			$("#GBheader_Content4").html(topInsert(alllist))
		}
	});
}else{
	$('.GBBody').hide();
}



$(function() {
	if ($("#qrcode")[0]) {
		$("#qrcode").qrcode({
			render: "image",
			size: 100,
			text: "https://app.77mh.top/" //location.href.replace(/.*\.177mh\.net/, "https://m.177mh.net")
		});
	}
	loginfo.done(longInsert_top);
	loginfo.done(HMInsert);


	$.ajax({
		type: "GET",
		url: css_sv+"/jjs/co_news.js",
		dataType: "json",
		cache: true,
		success: function(json){

			newhtml = '';
			$.each(json.new,function(i,n){
				newhtml += '<li><span>'+n.PublishDate+'</span><a href="'+n.URL+'">'+n.SubTitle+' '+n.Title+'</a></li>';
			});
			$("#jsnew").append('<ul>'+newhtml+'</ul>');

			hothtml = '';
			$.each(json.hot,function(i,n){
				hothtml += '<li><a href="'+n.URL+'">'+n.SubTitle+' '+n.Title+'</a></li>';
			});
			$("#jshot").append('<ul>'+hothtml+'</ul>');

		}

	});	

});



function topInsert(arr) {
	var outhtml = "";
	var i = 0;
	var l = arr.length;
	for (i; i < l; i++) {
		outhtml += "<li><span>" + arr[i][0] + '</span><a href="/colist_' + arr[i][1] + '.html">' + arr[i][2] + "</a></li>";
	}
	return outhtml;
}
function longInsert_top() {
	if (uuid > 0) {
		hloginfo = "当前用户: <b>" + uname + '</b> <a href="'+i_sv+'/login.php?type=loginout">退出</a> <a href="'+i_sv+'/user.php">用户中心</a>';
	} else {
		hloginfo = '未登录，请 <a href="'+i_sv+'/login.html">登录</a> ！';
	}
	$("#topfav").prepend('<span id="hloginfo">' + hloginfo + "</span>");
}
function HMInsert() {
	var hisurl = "";
	var markurl = "";
	if (uuid > 0) {
		var HMurl = i_sv+"/ajax/HMbrowse.php?act=browse";
		$.getScript(HMurl, function() {
			var content = "";
			if (his != "") {
				history_arg = his.split("||");
				var i;
				for (i = 0; i <= history_arg.length; i++) {
					if (history_arg[i] != null) {
						var wlink = history_arg[i].split("|");
						var timeold = (d - wlink[0]);
						var daysold = Math.floor(timeold / 86400);
						var hrsold = Math.floor(timeold / 3600);
						var minsold = Math.floor(timeold / 60);
						var seconds = timeold;
						var str_date = "刚刚";
						if (daysold != 0) {
							str_date = daysold + "天"
						} else {
							if (hrsold != 0) {
								str_date = hrsold + "小时"
							} else {
								if (minsold != 0) {
									str_date = minsold + "分钟"
								} else {
									if (seconds != 0) {
										str_date = seconds + "秒钟"
									}
								}
							}
						}
						content = "<li>" + str_date + "前<a href='/colist_" + wlink[2] + ".html' target='_blank'>" + wlink[3] + "</a>-<a href='/" + wlink[4] + ".html' target='_blank'>" + wlink[1] + "</a></li>" + content;
					}
					$("#history").html(content);
					$("#co_his").html('<a href="'+i_sv+'/his.php">整理记录</a>');
				}
			} else {
				$("#history").html("<li class='cok_null'>您没有任何浏览纪录</li>");
				$("#co_his").html("<a>&nbsp;</a>");
			}
			if (mark != "") {
				var all_data = mark.split("||");
				var s_data = "";
				var out_html = "";
				for (i = 0; i < all_data.length; i++) {
					data = all_data[i].split("|");
					var page_html = "";
					if (data[2] > 1) {
						page_html = "?page=" + data[2]
					}
					out_html = '<li>·<a href="/' + data[1] + ".html" + page_html + '" target="_blank">' + data[0] + ":第" + data[2] + "页</a></li>" + out_html;
				}
				$("#his_mark").html(out_html);
				$("#mark_co").html('<a href="'+i_sv+'/tag.php">整理记号</a>');
			} else {
				$("#his_mark").html("<li class='cok_null'>您没有任何记号</li>");
				$("#mark_co").html("<a>&nbsp;</a>");
			}
		})
	} else {
		hisurl = his_sv+"/get.php?call=?";
		hisurl = his_sv+"/utf8_his.php";
		markurl = mark_sv+"/utf8_mark.php";

		$.getScript(hisurl, function() {
			var content = "";
			if (his != "") {
				history_arg = his.split("||");
				var i;
				for (i = 0; i <= history_arg.length; i++) {
					if (history_arg[i] != null) {
						var wlink = history_arg[i].split("|");
						var timeold = (d - wlink[0]);
						var daysold = Math.floor(timeold / 86400);
						var hrsold = Math.floor(timeold / 3600);
						var minsold = Math.floor(timeold / 60);
						var seconds = timeold;
						var str_date = "刚刚";
						if (daysold != 0) {
							str_date = daysold + "天"
						} else {
							if (hrsold != 0) {
								str_date = hrsold + "小时"
							} else {
								if (minsold != 0) {
									str_date = minsold + "分钟"
								} else {
									if (seconds != 0) {
										str_date = seconds + "秒钟"
									}
								}
							}
						}
						content = "<li>" + str_date + "前<a href='/colist_" + wlink[2] + ".html' target='_blank'>" + wlink[3] + "</a>-<a href='/" + wlink[4] + ".html' target='_blank'>" + wlink[1] + "</a></li>" + content;
					}
					$("#history").html(content);
					$("#co_his").html("请<a title='未登录记录将无法保存在账号里，将无法在别的电脑上浏览' href='"+i_sv+"/login.html'>登录</a>&nbsp;-&nbsp;<a href=\"javascript:clear_cok('his');\">清空记录</a>");
				}
			} else {
				$("#history").html("<li class='cok_null'>您没有任何浏览纪录<br /><br />尚未登录<br />记录将无法保存到其他电脑上<br />请<a href='"+i_sv+"/login.html'>登录</a></li>");
				$("#co_his").html("<a>&nbsp;</a>");
			}
		});


		$.getScript(markurl, function() {
			if (mark != "") {
				var all_data = mark.split("||");
				var s_data = "";
				var out_html = "";
				for (i = 0; i < all_data.length; i++) {
					data = all_data[i].split("|");
					var page_html = "";
					if (data[2] > 1) {
						page_html = "?page=" + data[2]
					}
					out_html = '<li>·<a href="/' + data[1] + ".html" + page_html + '" target="_blank">' + data[0] + ":第" + data[2] + "页</a></li>" + out_html
				}
				$("#his_mark").html(out_html);
				$("#mark_co").html("请<a title='未登录记录将无法保存在账号里，将无法在别的电脑上浏览' href='https://i.177mh.net/login.html'>登录</a>&nbsp;-&nbsp;<a href=\"javascript:clear_cok('mark');\">清空记号</a>");
			} else {
				$("#his_mark").html("<li class='cok_null'>您没有任何记号<br /><br />尚未登录<br />记录将无法保存到其他电脑上<br />请<a href='"+i_sv+"/login.html'>登录</a></li>");
				$("#mark_co").html("<a>&nbsp;</a>");
			}
		})
	}
}
function clear_cok(type) {
	$.getJSON("https://" + type + "."+hm_sv+"/" + type + "_del.php?call=?", function(data) {
		if (data.m == "1") {
			if (type == "his") {
				$("#history").html("<li class='cok_null'>您没有任何浏览纪录</li>");
				$("#co_his").html("<a>&nbsp;</a>");
			} else {
				$("#his_mark").html("<li class='cok_null'>您没有任何记号</li>");
				$("#mark_co").html("<a>&nbsp;</a>");
			}
		}
	})
}
function golistp() {
	var url = location.href;
	var p = document.getElementById("go2").value;
	if (p == null || p == "") {
		alert("请输入要跳转的页面");
		return;
	}
	if (p == 1) {
		if (url.indexOf("_") >= 0) {
			var gourl = url.replace(/index_\d*/, "index");
		} else {
			var gourl = url;
		}
	} else {
		if (url.indexOf("_") >= 0) {
			var gourl = url.replace(/index_\d*/, "index_" + (p - 1));
		} else {
			var gourl = url.replace("index.html", "index_" + (p - 1) + ".html");
		}
	}
	location.href = gourl;
}
function nTabs(thisObj, Num) {
	if (thisObj.className == "act") {
		return;
	}
	var tabObj = thisObj.parentNode.id;
	var tabList = document.getElementById(tabObj).getElementsByTagName("a");
	for (i = 0; i < tabList.length; i++) {
		if (i == Num) {
			thisObj.className = "act";
			document.getElementById(tabObj + "_Content" + i).style.display = "block";
		} else {
			tabList[i].className = "";
			document.getElementById(tabObj + "_Content" + i).style.display = "none";
		}
	}
};