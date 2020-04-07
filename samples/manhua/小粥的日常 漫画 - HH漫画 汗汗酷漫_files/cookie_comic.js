function checkCookie()
{
	iSetCookie("zhang_lin","zhang_lin","","")
	if(iGetCookie("zhang_lin") == null)
		return false;
	else
		return true;
}

function GetCookieVal(offset)
//
{
var endstr = document.cookie.indexOf (";", offset);
if (endstr == -1)
endstr = document.cookie.length;
return unescape(document.cookie.substring(offset, endstr));
}

function SetCookie(name, value, expires, path) 
{
	if(expires == "")
		expires = "1";
	if(expires == "0")
		expires = null;
	else
	{
		var expdate = new Date();
		expdate.setTime(expdate.getTime() + ( expires * 1000 * 60*60*24 ));
	}
	//alert(expdate)
    document.cookie = name + "=" + escape(value) + 
        ((expires == null) ? "" : "; expires=" + expdate.toGMTString()) +
        ((path == null)    ? "" : "; path=" + path);
}


function DelCookie(name)
//
{
var exp = new Date();
exp.setTime (exp.getTime() - 1);
var cval = GetCookie (name);
document.cookie = name + "=" + cval + "; expires="+ exp.toGMTString();
}

function GetCookie(name)
//
{
var arg = name + "=";
var alen = arg.length;
var clen = document.cookie.length;
var i = 0;
while (i < clen)
{
var j = i + alen;
if (document.cookie.substring(i, j) == arg)
return GetCookieVal (j);
i = document.cookie.indexOf(" ", i) + 1;
if (i == 0) break;
}
return null;
}
