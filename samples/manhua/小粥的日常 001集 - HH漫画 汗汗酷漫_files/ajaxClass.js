
var Request = new function()
{

	this.pool = new Array();

	this.getXMLHttp = function (chunnel)
	{

		if(chunnel != null)
		{
			for (var a = 0; a < this.pool.length; a++)
			{
				if(this.pool[a]["chunnel"] == chunnel)
				{
					if(this.pool[a]["obj"].readyState == 0 || this.pool[a]["obj"].readyState == 4)
					{
						return this.pool[a]["obj"];
					}
					else 
					{
						return "busy";
					}
				}
			}

			this.pool[this.pool.length] = new Array();
			this.pool[this.pool.length - 1]["obj"] = this.createXMLHttp();
			this.pool[this.pool.length - 1]["chunnel"] = chunnel;
			return this.pool[this.pool.length - 1]["obj"];

		}

		for (var i = 0; i < this.pool.length; i++)
		{
			if (this.pool[i]["obj"].readyState == 0 || this.pool[i]["obj"].readyState == 4)
			{
				return this.pool[i]["obj"];
			}
		}

		this.pool[this.pool.length] = new Array();
		this.pool[this.pool.length - 1]["obj"] = this.createXMLHttp();
		this.pool[this.pool.length - 1]["chunnel"] = "";
		return this.pool[this.pool.length - 1]["obj"];

	}

	this.createXMLHttp = function ()
	{

		if(window.XMLHttpRequest)
		{
			var xmlObj = new XMLHttpRequest();
		} 
		else 
		{
			var MSXML = ['Microsoft.XMLHTTP', 'MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
			for(var n = 0; n < MSXML.length; n++)
			{
				try
				{
					var xmlObj = new ActiveXObject(MSXML[n]);        
					break;
				}
				catch(e)
				{
				}
			}
		} 

		return xmlObj;

	}

	this.reSend = function (url,data,callback,chunnel)
	{
		var objXMLHttp = this.getXMLHttp(chunnel)

		if(typeof(objXMLHttp) != "object")
		{
			return ;
		}

		url += (url.indexOf("?") >= 0) ? "&nowtime=" + new Date().getTime() : "?nowtime=" + new Date().getTime();
		
		if(data == "")
		{
			objXMLHttp.open('GET' , url, true);
			objXMLHttp.send('');
		}
		else 
		{ 
			objXMLHttp.open('POST' , url, true);
			objXMLHttp.setRequestHeader("Content-Length",data.length); 
			objXMLHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			objXMLHttp.send(data);
		}
		
		if(typeof(callback) == "function" )
		{
			
			objXMLHttp.onreadystatechange = function ()
			{
			
				if (objXMLHttp.readyState == 4)
				{
			
					if(objXMLHttp.status == 200 || objXMLHttp.status == 304)
					{
						callback(objXMLHttp) 
					}
					else
					{
						callback(null) 
						//window.status = "Error loading page\n"+ objXMLHttp.status +":"+ objXMLHttp.statusText;
					}
				}
			}
			
		}
		else
		{
			
		}

	}

}


