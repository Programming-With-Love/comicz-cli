function unsuan(s) 
{
	sw="44123.com|hhcool.com|hhimm.com";
	su = location.hostname.toLowerCase();
	b=false;
	for(i=0;i<sw.split("|").length;i++) {
	    if(su.indexOf(sw.split("|")[i])>-1) {
	        b=true;
	        break;
        }
    }
    if(!b)return "";
    
    x = s.substring(s.length-1);
    w="abcdefghijklmnopqrstuvwxyz";
    xi=w.indexOf(x)+1;
    sk = s.substring(s.length-xi-12,s.length-xi-1);
    s=s.substring(0,s.length-xi-12);    
	k=sk.substring(0,sk.length-1);
	f=sk.substring(sk.length-1);
	for(i=0;i<k.length;i++) {
	    eval("s=s.replace(/"+ k.substring(i,i+1) +"/g,'"+ i +"')");
	}
    ss = s.split(f);
	s="";
	for(i=0;i<ss.length;i++) {
	    s+=String.fromCharCode(ss[i]);
    }
    return s;
}


var cuImg;
var arrDS;
var cuDomainNo;

function window_onload()
{
    if(document.getElementById("btnPagePrv").disabled)
        document.getElementById("btnPagePrv2").disabled = true;
    if(document.getElementById("btnPageNext").disabled)
        document.getElementById("btnPageNext2").disabled = true;
    
    
    arrDS = document.getElementById("hdDomain").value.split("|");
    cuDomainNo = getUrlPar("d");
    if(cuDomainNo=="") cuDomainNo="0";
    var sCuDomian = getDomain(parseInt(cuDomainNo))
    
    document.getElementById("spSl").innerHTML = dfSL(cuDomainNo);
    
    cuImg = getCuImg();
    cuImg.src = sCuDomian + unsuan(cuImg.name);
	cuImg.style.cursor = "hand";
    //var evt = window.event;
    cuImg.onmousedown = function(evt){drag(evt);};
}



function getUrlPar(name)
{
	var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i"); 
	source = location.href;
	if (reg.test(source)) return RegExp.$2; return "";
}
function getCuImg()
{
    if(document.getElementById("img1021")) return document.getElementById("img1021");
    if(document.getElementById("img2391")) return document.getElementById("img2391");
    if(document.getElementById("img7652")) return document.getElementById("img7652");
    if(document.getElementById("imgCurr")) return document.getElementById("imgCurr");
    return null;
}
function addFav()
{
    var sID = document.getElementById("hdVolID").value;
    if(sID == "")
    {
        alert("出错，找不到本漫画记录ID");
        return;
    }
    var url = "/ax/addFav.aspx?VolID=" + sID;   
   // window.open(url);
    var callback = addFav_callback;
    var data = "";
    Request.reSend(url,data,callback);
}
function addFav_callback(o)
{
    if(o == null)
    {
        alert("未知出错，无法收藏");
        return;
    }
    var s = o.responseText;
    alert(s);
}

function changePage(oname)
{
    if(document.getElementById(oname).innerHTML == "")
        document.getElementById(oname).innerHTML = "<div class='cPageChangeHtm'>" +  document.getElementById("iPageHtm").innerHTML + "</div>";
    else
        document.getElementById(oname).innerHTML = "";
}

function csel(i)
{
    document.getElementById("hdGoPage").value = i;
    
    try
    {
        document.getElementById("lkbGoPage").click();
    }
    catch(e)
    {
        __doPostBack('lkbGoPage','')
    }
    
}

function csel2(i)
{
        
    var sID = document.getElementById("hdVolID").value;
    var s = document.getElementById("hdS").value;
    location.href = "../cool"+ sID +"/"+ (i)  + ".html?s=" + s + "&d="+cuDomainNo;	
    
}

function pageChange(s)
{
    if(s == "prv")
        document.getElementById("btnPagePrv").click();
    if(s == "next")        
         document.getElementById("btnPageNext").click();
}

function movePage(obj)
{
	var s1 = obj.src;
	if(s1.indexOf(".gif") < 0)
	{
		//document.body.scrollLeft = obj.width
		//document.body.scrollTop = 0;
	}
}
function getDomain(s)
{
    if(arrDS.length==1) return arrDS[0];
    return arrDS[s];
}
function dfSL(s)
{
    if(arrDS.length==1) return "";
    
    var sDName = new Array("南极号","北极号","月亮号");
    var sHtm = "切换图片源：";
    for(i=0;i<arrDS.length;i++)
    {
        if(s == i)
            sHtm += "<a class='cSLSelected' href='' onclick=\"changeSL('"+ i +"');return false;\">"+sDName[i]+"</a>";   
        else
            sHtm += "<a  href='' onclick=\"changeSL('"+ i +"');return false;\">"+sDName[i]+"</a>";   
    }
    return sHtm;
    
}
function changeSL(d)
{
    var s = document.getElementById("hdS").value;
    location.href = "?s=" + s + "&d="+d;	
}

function cerrmsg()
{
    var sHtm = dfSL(0);
   // alert(sHtm)
   document.getElementById("dvMsg").innerHTML = "<br><div class='cErrMsg'>漫画图片加载出错，请更换漫画图片源：<br><br>"+ sHtm +"<br><br><span>若所有图源无法使用，请点上面报错。。囧囧囧</span></div>";
}

function prvLoadNext()
{
	if(document.getElementById("hdNextImg") != null)
	{
	var sNextImgName = document.getElementById("hdNextImg").value;
	sNextImgName = getDomain(parseInt(cuDomainNo)) + unsuan(sNextImgName);

	if(sNextImgName == "") return;
	if(document.getElementById("spMsg") != null)
		document.getElementById("spMsg").innerHTML = "正在读取下一页漫画...";
	if(document.getElementById("spTmp") != null)
		document.getElementById("spTmp").innerHTML = "<img style='display:none' src='"+ sNextImgName +"' onload='prvLoadNextOK()' onerror='prvLoadNextErr()'>";
	window.status = "开始打开下一页漫画....";
	}
	
}
function prvLoadNextOK()
{
	document.getElementById("spMsg").innerHTML = "读存完毕";
	window.status = "读存完毕";
}
function prvLoadNextErr()
{
	document.getElementById("spMsg").innerHTML = "无法读存！";
}


function initImg()
{

	
}	

function dfImg()
{
    var s = document.getElementById("iBodyQ").innerHTML;   
    document.getElementById("iBodyQ").innerHTML = "";
    document.getElementById("iBodyQ").style.display = "none";
    document.getElementById("iBody").innerHTML = s  + "<div id='dvMsg'></div>";
    cuImg = getCuImg();
	cuImg.style.cursor = "hand";
    cuImg.onmousedown = function(evt){drag(evt);};
}

function drag(evt) 
{
   
	evt = evt || window.event;
	if (document.all && evt.button != 1) {
		return false;
	}
		
	oX = 2 * document.documentElement.scrollLeft;
	cX = document.documentElement.scrollLeft - evt.screenX;
	oY = 2 * document.documentElement.scrollTop;
	cY = document.documentElement.scrollTop - evt.screenY;	
	if (cuImg.addEventListener) {
		cuImg.addEventListener("mousemove", moveHandler, true);
		cuImg.addEventListener("mouseup", upHandler, true);
	} else if (cuImg.attachEvent) {
		cuImg.setCapture( );
		cuImg.attachEvent("onmousemove", moveHandler);
		cuImg.attachEvent("onmouseup", upHandler);
		cuImg.attachEvent("onlosecapture", upHandler);
	} else {
		var oldmovehandler = cuImg.onmousemove;
		var olduphandler = cuImg.onmouseup;
		cuImg.onmousemove = moveHandler;
		cuImg.onmouseup = upHandler;
	}	
	if (evt.stopPropagation) evt.stopPropagation( );
	else evt.cancelBubble = true;	
	if (evt.preventDefault) evt.preventDefault( );
	else evt.returnValue = false;	
	if (evt.stopPropagation) evt.stopPropagation( );
	else evt.cancelBubble = true;	
	cuImg.style.cursor = "move";	
	function moveHandler(evt) {
		mX = evt.screenX + cX;
		mY = evt.screenY + cY;
		window.scrollTo(oX - mX, oY - mY);		
		if (evt.stopPropagation) evt.stopPropagation( );
		else evt.cancelBubble = true;
	}	
	function upHandler(evt) {
		cuImg.style.cursor = "pointer";		
		if (cuImg.removeEventListener) {
			cuImg.removeEventListener("mouseup", upHandler, true);
			cuImg.removeEventListener("mousemove", moveHandler, true);
		} else if (cuImg.detachEvent) {
			cuImg.detachEvent("onlosecapture", upHandler);
			cuImg.detachEvent("onmouseup", upHandler);
			cuImg.detachEvent("onmousemove", moveHandler);
			cuImg.releaseCapture( );
		} else {
			cuImg.onmouseup = olduphandler;
			cuImg.onmousemove = oldmovehandler;
		}
		if (evt.stopPropagation) evt.stopPropagation( );
		else evt.cancelBubble = true;
	}
}


function PageGo(lktype)
{
    
	try
	{
		var sID = document.getElementById("hdVolID").value;
		var s = document.getElementById("hdS").value;
		var nCurrNo = parseInt(document.getElementById("hdPageIndex").value);
		var nDataCount = parseInt(document.getElementById("hdPageCount").value);
		
		//alert(nCurrNo)
		if(lktype == "first")
		{
			location.href = "../cool"+ sID +"/1.html?s=" + s + "&d="+cuDomainNo;	
		}
		else if(lktype == "prev")
		{
			if(nCurrNo == 1)
				alert("第一页")
			else			
				location.href = "../cool"+ sID +"/"+ (nCurrNo - 1)  + ".html?s=" + s + "&d="+cuDomainNo;	
		}
		else if(lktype == "next")
		{
			if(nCurrNo >= nDataCount)
				alert("最后一页")
			else			
				location.href = "../cool"+ sID +"/"+ (nCurrNo + 1)  + ".html?s=" + s + "&d="+cuDomainNo;	
		}
		else if(lktype == "last")
		{
			location.href = "../cool"+ sID +"/"+ nDataCount +".html?s=" + s + "&d="+cuDomainNo;	
		}
		else if(lktype == "Go")
		{
			var nGoPage = document.getElementById("ddlPageList").options[document.getElementById("ddlPageList").selectedIndex +1].value
			if(nGoPage != "")
				location.href = "../cool"+ sID +"/"+ nGoPage +".html?s=" + s + "&d="+cuDomainNo;	
		}
	}
	catch(e)
	{
		return false;
	}
	
}	



function rf()

{return false; }

document.oncontextmenu = rf

function keydown()

{if(event.ctrlKey ==true || event.keyCode ==93 || event.shiftKey ==true){return false;} }

document.onkeydown =keydown

function drag()

{return false;}

document.ondragstart=drag 

function stopmouse(e) { 

if (navigator.appName == 'Netscape' && (e.which == 3 || e.which == 2)) 

return false; } 

document.onmousedown=stopmouse; 

if (document.layers) 

window.captureEvents(Event.MOUSEDOWN); 

window.onmousedown=stopmouse; 
