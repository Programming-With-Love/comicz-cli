
var SNSPush3Class = {
	SNSet: [{Id:'facebook', Icon:'/images/icon0.png', Title:'貼到 Facebook'}, {Id:'plurk', Icon:'/images/icon1.png', Title:'噗到 Plurk'}, {Id:'twitter', Icon:'/images/icon2.png', Title:'推到 twitter'}],
	Timer: 30000,//micro second
	TitleSet: '分享',
	BlockW: 8,
	getOW: '',
	getSNSPush: '',
	getEW: '',
	TimerIntervalID: '',
	//method
	trim: function (str) {
	  return str.replace(/^\s*|\s*$/g,"");
	},
	getPosition: function(theElement) {
		var positionX = 0;
		var positionY = 0;
		while (theElement != null) {
			positionX += theElement.offsetLeft;
			positionY += theElement.offsetTop;
			theElement = theElement.offsetParent;
		}
		return [positionX, positionY];
	},
	EWAction: function() {
		clearTimeout(this.TimerIntervalID);
		if (parseInt(this.getEW.style.left) < 0) {
			var getPos = this.getPosition(this.getSNSPush);
			this.getEW.style.left = getPos[0] + this.getSNSPush.offsetWidth - this.getEW.offsetWidth + 'px';
			this.getEW.style.top = getPos[1] + this.getSNSPush.offsetHeight + 'px';
			this.TimerIntervalID = setTimeout('SNSPush3Class.EWAction()', this.Timer);
		} else {
			this.getEW.style.left = '-1000px';
			this.getEW.style.top = '0px';
		}//end if
	},
	ClickAction: function(Type) {
		if (this.getOW && !this.getOW.closed) this.getOW.close();
		switch (Type) {
			case 'facebook':
				this.getOW = window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(location.href)+'&t='+encodeURIComponent(document.title), 'WinSNSPush', 'toolbar=0,status=0,width=650,height=420', false);
				break;
			case 'plurk':
				//window.open('http://www.plurk.com/?qualifier=shares&status='.concat('ent.msn.com.tw/images/poster/1090/MS000000109009090118211101.jpg').concat(' ').concat(encodeURIComponent(location.href)).concat(' ').concat('(').concat(encodeURIComponent(document.title)).concat(')'), 'WinSNSPush');
				this.getOW = window.open('http://www.plurk.com/?qualifier=shares&status='.concat(encodeURIComponent(location.href).concat(' ').concat('(').concat(encodeURIComponent(document.title)).concat(')')), 'WinSNSPush', 'scrollbars=yes,toolbar=yes,status=0,width=650,height=420', false);
				break;
			case 'twitter':
				this.getOW = window.open('http://twitter.com/home/?status='.concat(encodeURIComponent(document.title)).concat(' ').concat(encodeURIComponent(location.href)), 'WinSNSPush', 'scrollbars=yes,toolbar=0,status=0,width=650,height=420', false);
				break;
		}//end switch
	},
	Constructor: function() {
		if (!document.getElementById('SNSPushSection')) return;
		var SNSPush = document.getElementById('SNSPushSection');
		SNSPush.className = 'SNSPushContainerV3';
		this.getSNSPush = SNSPush;

		//SNSExpandWin
		var SNSExpandWin = document.createElement('div');
		SNSExpandWin.className = 'SNSPushExpandV3';
		SNSExpandWin.style.left = '-1000px';
		SNSExpandWin.onmouseover = function() {	clearTimeout(SNSPush3Class.TimerIntervalID); };
		SNSExpandWin.onmouseout = function() {
			clearTimeout(SNSPush3Class.TimerIntervalID);
			SNSPush3Class.TimerIntervalID = setTimeout('SNSPush3Class.EWAction()', SNSPush3Class.Timer);
		};
		
		if ($('FTollBarMain')) $('FTollBarMain').appendChild(SNSExpandWin);
		else document.getElementsByTagName('body')[0].appendChild(SNSExpandWin);
		this.getEW = SNSExpandWin;

		var Pattern = /DataSet\[(.*)\]/;
		for (var i=0; i<this.SNSet.length; i++) {
			//do insert twitter big icon to div
			if(this.SNSet[i].Id != 'twitter') {
				var SNSPushE = document.createElement('div');
				SNSPushE.className = 'SNSPushEV3';
				SNSPushE.Type = this.SNSet[i].Id;
				SNSPushE.onmouseover = function() { this.style.backgroundColor = '#e5e6e6';	this.style.color = '#000000'; };
				SNSPushE.onmouseout = function() { this.style.backgroundColor = 'transparent'; this.style.color = '#0161aa'; };
				SNSPushE.onclick = function() { SNSPush3Class.ClickAction(this.Type); }
				document.getElementById('SNSPushSection').appendChild(SNSPushE);
				var SNSPushEEns = document.createElement('div');
				SNSPushEEns.className = 'SNSPushEEns';
				SNSPushEEns.style.backgroundImage = 'url(' + this.SNSet[i].Icon + ')';
				SNSPushEEns.appendChild(document.createTextNode(this.trim(this.SNSet[i].Title.replace(Pattern, "$1"))));
				SNSPushE.appendChild(SNSPushEEns);
			}

			//SNSPushE2
			var SNSPushE2 = document.createElement('div');
			SNSPushE2.className = 'SNSPushE2V3';
			if (i != 0) SNSPushE2.style.marginTop = this.BlockW + 'px';
			SNSPushE2.style.backgroundImage = 'url(' + this.SNSet[i].Icon + ')';
			SNSPushE2.appendChild(document.createTextNode(this.trim(this.SNSet[i].Title.replace(Pattern, "$1"))));
			SNSPushE2.Type = this.SNSet[i].Id;
			SNSPushE2.onmouseover = function() { this.style.color = '#000000'; };
			SNSPushE2.onmouseout = function() { this.style.color = '#2b7bde'; };
			SNSPushE2.onclick = function() { SNSPush3Class.ClickAction(this.Type); }
			SNSExpandWin.appendChild(SNSPushE2);
		}//end for

		//SNSPush - SNSPushET
		var SNSPushET = document.createElement('div');
		SNSPushET.className = 'SNSPushEV3';
		SNSPushET.style.borderRightStyle = 'solid';
		SNSPushET.style.borderRightWidth = '1px';
		SNSPushET.style.borderRightColor = '#858585';
		SNSPushET.onmouseover = function() { this.style.backgroundColor = '#e5e6e6';	this.style.color = '#000000'; };
		SNSPushET.onmouseout = function() { this.style.backgroundColor = 'transparent'; this.style.color = '#0161aa'; };
		SNSPushET.onclick = function() { SNSPush3Class.EWAction(); };
		SNSPush.appendChild(SNSPushET);
		var SNSPushETEns = document.createElement('div');
		SNSPushETEns.className = 'SNSPushETV3';
		SNSPushET.appendChild(SNSPushETEns);
	}
};

function SNSPush3ClassInit() {
	try {
	  document.execCommand("BackgroundImageCache", false, true);
	} catch(err) {}
	SNSPush3Class.Constructor();
}

function addLoadListener(fn) {
  if (typeof window.addEventListener != 'undefined') window.addEventListener('load', fn, false);
  else if (typeof document.addEventListener != 'undefined') document.addEventListener('load', fn, false);
  else if (typeof window.attachEvent != 'undefined') window.attachEvent('onload', fn);
  else {
    var oldfn = window.onload;
    if (typeof window.onload != 'function') window.onload = fn;
    else window.onload = function() { oldfn(); fn(); };
  }//end if
}

addLoadListener(SNSPush3ClassInit);

function AddToFavorite()
{
    if (document.all){
       window.external.addFavorite(document.URL,document.title);
    }else if (window.sidebar){
       window.sidebar.addPanel(document.title, document.URL, "");
    }
}



function $(obj) {return document.getElementById(obj)}

function loadReView(p)
{  
   
    var sID = $("hdID").value;
    var url = "/app/axGetReview.aspx?ID=" + sID + "&P=" + p;  
    //window.open(url); 
    var callback = loadReView_callback;
    var data = "";
    Request.reSend(url,data,callback); 
}

function loadReView_callback(o)
{
    if(o == null)
    {
        return;
    }
    var s = o.responseText;
    
    $("cReViewList").innerHTML = s;
           
}





document.oncontextmenu=new Function('event.returnValue=false;');
document.onselectstart=new Function('event.returnValue=false;');