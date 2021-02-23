
// SNS URL Send bitly.com
//var bitlyAcount = "";
//var bitlyApiKey = "";

// 0 : twitter, 1 : facebook, 2 : me2day
//function fnSNSSendURL(longUrl, type){
//	// bitly shortURl 생성
//	// 계정 정보와 apiKey는 이관 작업 시 변경해야함
//	// cross-domain ajax 때문에 XMLHttpRequest 사용하여 타 도메인 접근 불가 (IE)
//	// bit.ly 이용시 주소에 callback함수 적어주어야지 cross-domain ajax해결
//	// XMLHttpRequest IE 이용시 엑세스 거부 뜸 그래서 jquery 이용
//	var apiCallUrl = "https://api-ssl.bitly.com/v3/shorten?" +
//	"login=" + bitlyAcount +
//	"&apiKey=" + bitlyApiKey +
//	"&longUrl=" + encodeURIComponent(longUrl) +
//	"&format=json&callback=?";
//	
//	$.getJSON(apiCallUrl, function(data){
//		if (data.status_txt == "OK") {
//			var bitlydata = eval(data);
//			switch (type) {
//				case 0:
//					url = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(bitlydata.data.url) + "&text="+ encodeURIComponent("직접판매공제조합");
//					break;
//				case 1:
//					url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(bitlydata.data.url);
//					break;
//				case 2:
//					url = "https://me2day.net/plugins/mobile_post/new?new_post[body]=" + encodeURIComponent("직접판매공제조합 ") + encodeURIComponent(bitlydata.data.url);
//					break;
//			}
//			
//			var openNewWindow = window.open("about:blank", "", "width=1000,height=500");
//			openNewWindow.location.href = url;
//		} else {
//			alert("Fail");
//		}
//	});
//}

// 0 : twitter, 1 : facebook, 2 : kakaoTalk, 4 : 마이피플
function fnSNSSendURL(type){

	//	< 카카오톡>
	//	kakaolink://sendurl?msg=[메시지]&url=[주소]&appid=[사용자 이름]&appver=0.1
	//	[페이스북]
	//	http://www.facebook.com/sharer.php?u=[주소]
	//	[트위터]
	//	http://twitter.com/?status=[타이틀]+++[주소]" 
	//	< 마이피플 >
	//	https://m.mypeople.daum.net/mypeople/mweb/share.do?prefix=[타이틀]&link=[주소]&source_id=none&callback=postdone
	
	var longUrl = location.href;
	var url;

	switch (type) {
		case 0:
			url = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(longUrl) + "&text="+ encodeURIComponent("한의지식포털");
			break;
		case 1:
			url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(longUrl);
			break;
		case 2:
			url =" kakaolink://sendurl?url=" + encodeURIComponent(longUrl) + "&appid=" + encodeURIComponent("한의지식포털") + "&appver=0.1";
			break;
		case 3:
			url = "https://m.mypeople.daum.net/mypeople/mweb/share.do?prefix=" + encodeURIComponent("한의지식포털") + "&link=" + encodeURIComponent(longUrl) + "&source_id=none&callback=postdone";
			break;
	}
	
	var openNewWindow = window.open("about:blank", "", "width=1000,height=500");
	openNewWindow.location.href = url;
	
}


