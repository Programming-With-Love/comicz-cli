var SinConf = function () {
    return {
	edition: 3,
	mainHost: {"desktop":"https://www.manhuabei.com/","phone":"https://m.manhuabei.com/"},
        apiHost: 'https://api.manhuabei.com',
        resHost: [{"name":"自动选择","domain":["https://manga.mipcdn.com/i/s/img01.eshanyao.com"]},{"name":"电信线路","domain":["https://manga9.mlxsc.com"]}],
        scheduler: "off",
        theme: {"basic":"dmzj"},
        common: [],
        desktop: {"chapter":{"mode":"pagination","reload":true,"maxPreload":10,"imageWidth":"auto"}},
        phone: {"chapter":{"mode":"pagination","reload":true,"maxPreload":10,"imageWidth":"auto"}},
        hotKeys: {"back":"backspace","read":"r","next":"right","prev":"left","nextChapter":"x","prevChapter":"z"},
        toastPosition: 'toast-top-center',
        toastClose: true,
        init: function () {
        }
    };
}();

toastr.options.positionClass = SinConf.toastPosition;
toastr.options.closeButton = SinConf.toastClose;

