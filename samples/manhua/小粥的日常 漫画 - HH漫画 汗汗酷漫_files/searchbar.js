function SearchCheck()
{
    if(event.keyCode==13){
	    window.event.returnValue = false;
	    document.getElementById("checkout").click();
    }
}
function SearchGo()
{
    var st = document.getElementById("so").value;
    if(st.indexOf("'") >=0)
	    st = st.substring(0,st.indexOf("'"));
    if(st == "")
    {
	    window.event.returnValue = false;
	    alert("Please enter a search word")
	    return;
    }
    var url = "/comic/?act=search&st=" + st;
    location.href = url;
}