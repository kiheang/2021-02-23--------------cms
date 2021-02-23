/**
 * Copyright (c) 2000 by LG-EDS Systems Inc
 * All rights reserved.
 *
 * 자바스크립트 공통함수
 *
 * 주의: 아래의 모든 메소드는 입력폼의 필드이름(myform.myfield)을
 *       파라미터로 받는다. 필드의 값(myform.myfield.value)이 아님을
 *       유념할 것.
 *
 * @version 1.1, 2000/10/06
 * @author 박종진(JongJin Park), ecogeo@dreamwiz.com
 */

// 첨부파일 최대 개수

//datepick 한글 셋팅
function settingdatepickerko(){
	
	$.datepicker.regional['ko']= {
	  closeText:'닫기',
	  prevText:'이전달',
	  nextText:'다음달',
	  currentText:'오늘',
	  monthNames:['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUM)','7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
	  monthNamesShort:['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	  dayNames:['일','월','화','수','목','금','토'],
	  dayNamesShort:['일','월','화','수','목','금','토'],
	  dayNamesMin:['일','월','화','수','목','금','토'],
	  weekHeader:'Wk',
	  dateFormat:'yy-mm-dd',
	  firstDay:0,
	  isRTL:false,
	  showMonthAfterYear:true,
	  yearSuffix:''
	};
	
	$.datepicker.setDefaults($.datepicker.regional['ko']);
}

/*
 * 브라우저 체크
 */
function browser_check(){
	var s = navigator.userAgent.toLowerCase();
	var match = /(webkit)[ \/](\w.]+)/.exec(s) || /(opera)(?:.*version)?[ \/](\w.]+)/.exec(s) || /(msie) ([\w.]+)/.exec(s) || /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) || [];
	return { name: match[1] || "", version: match[2] || "0" };
}

/* 현재 URL clipboard 복사 */
function clipBoardCopy(){
	var url = document.location.href;
	if(browser_check().name == 'msie'){
		window.clipboardData.setData('Text', url);
		alert('URL 주소가 복사되었습니다. 원하는 곳에 Ctrl+V로 붙여 넣기 하세요.');
	} else {
		prompt("이 글의 URL 주소입니다. Ctrl+C를 눌러 클립보드로 복사하세요", url);
	}
}

/*
 * 준비중 경고창
 */
function fnReadyPage(){
	alert('준비중입니다.');
}

/*
 * code 관련 함수
 */

function getComboStr(resourceCodeList, valueColName, nameColName, selectedDtlCd, addOptionType){
	var rstlStr = '';
	var selStr = '';
	
	if (addOptionType == 'C') {	//Choice
		rstlStr = '<option value="">선택하세요</option>';
	}
	else if (addOptionType == 'A') {	//All
		rstlStr = '<option value="">전체</option>';
	}
	
	for(var i = 0; i < resourceCodeList.length; i++){
		selStr = "";
		var tmpMap = resourceCodeList[i];
		
		if(eval('tmpMap.' + valueColName) == selectedDtlCd)
			selStr = "selected='selected'";
		
		rstlStr += "<option value='"+eval('tmpMap.' + valueColName)+"' "+selStr+">"+eval('tmpMap.' + nameColName)+"</option>";
	}
	
	return rstlStr;
}

/**
 * 여러개의 첨부파일 양식을 그릴경우 같은 obj 안에서는 다시 그릴경우는 폼양식이 갱신이 되며
 * 새로운 곳은 sel_file_box[숫자], input_file_wrap[숫자] 이런식으로 증가하게 되며 file name인 upload만 초기는 숫자가 없고 그 이후로 upload[숫자] 형식으로 naming 이 된다.
 * 
 * @param obj : 파일양식 그리영역
 * @param num : 현재 첨부파일 개수
 * @param max_count : 최대 첨부파일 개수
 */
function fnComboStrFile(obj, num, max_count){
	// 기본 값
	var ii = '0';
	// select박스 id, 파일박스 id
	var sel_id = 'sel_file_box';
	var file_box_id = 'input_file_wrap';

	var tag_n = 'upload';
	
	// 해당 obj영역에 첨부파일 양식이 있는지 확인
	// 양식이 있는경우
	if($(obj).find('.sel_file_box').length > 0){
		sel_id = $(obj).find('.sel_file_box').attr('id');
		file_box_id = $(obj).find('.input_file_wrap').attr('id');
		tag_n = $(obj).find('.input_file_wrap input[type=file]').attr('name');
	}
	// 없는경우
	else {
		// 총 첨부파일 양식의 숫자를 구한다.
		ii = $('.sel_file_box').length;
		
		// id 값에 숫자를 추가한다.
		sel_id += ii;
		file_box_id += ii;
		// 폼양식이 하나 이상일경우에만 upload에 숫자를 붙여준다.
		if(ii > 0){
			tag_n += ii;
		}
	}
	
	// 기존에 있는 이벤트를 제거한다.
	$('#' + sel_id).off('change');
	
	var mc = max_count ? max_count : MAX_FILE_COUNT;
	var n = mc - num;
	var html = '';
	
	// 첨부파일 최대개수일때
	if(mc == num){
		html += '<span class="no_file_text">더이상 등록하실수 없습니다.</span>';
	}
	else {
		html += '<select id="' + sel_id + '" class="selectA sel_file_box">';
		
		for(var i = 1; i <= n ; i++){
			html += '<option value="' + i + '">' + i + '</option>';
		}
		
		html += '</select>';
		html += '<div id="' + file_box_id + '" class="input_file_wrap">';
		html += '	<input type="file" name="' + tag_n + '" />';
		html += '</div>';
	}
	
	$(obj).html(html);
	
	// 첨부파일 개수 변경 이벤트
	$('#' + sel_id).on({
		'change' : function(e){
			var n = $(this).val();
			var txt = '';
			for(var i = 0; i < n; i++){
				txt += '<input type="file" name="' + tag_n + '" /><br/>';
			}
			
			$('#' + file_box_id).html(txt);
		}
	});
}

/**
 * 웹쪽 첨부파일 폼
 * 여러개의 첨부파일 양식을 그릴경우 같은 obj 안에서는 다시 그릴경우는 폼양식이 갱신이 되며
 * 새로운 곳은 sel_file_box[숫자], input_file_wrap[숫자] 이런식으로 증가하게 되며 file name인 upload만 초기는 숫자가 없고 그 이후로 upload[숫자] 형식으로 naming 이 된다.
 * 
 * @param obj : 파일양식 그리영역
 * @param num : 현재 첨부파일 개수
 * @param max_count : 최대 첨부파일 개수
 */
function fnComboStrFileFront(obj, num, max_count){
	// 기본 값
	var ii = '0';
	// select박스 id, 파일박스 id
	var sel_id = 'sel_file_box';
	var file_box_id = 'input_file_wrap';

	var tag_n = 'upload';
	
	// 해당 obj영역에 첨부파일 양식이 있는지 확인
	// 양식이 있는경우
	if($(obj).find('.sel_file_box').length > 0){
		sel_id = $(obj).find('.sel_file_box').attr('id');
		file_box_id = $(obj).find('.input_file_wrap').attr('id');
		tag_n = $(obj).find('.input_file_wrap input[type=file]').attr('name');
	}
	// 없는경우
	else {
		// 총 첨부파일 양식의 숫자를 구한다.
		ii = $('.sel_file_box').length;
		
		// id 값에 숫자를 추가한다.
		sel_id += ii;
		file_box_id += ii;
		// 폼양식이 하나 이상일경우에만 upload에 숫자를 붙여준다.
		if(ii > 0){
			tag_n += ii;
		}
	}
	
	// 기존에 있는 이벤트를 제거한다.
	$('#' + sel_id).off('change');
	
	var mc = max_count ? max_count : MAX_FILE_COUNT;
	var n = mc - num;
	var html = '';
	
	// 첨부파일 최대개수일때
	if(mc == num){
		html += '<li><span class="no_file_text">더이상 등록하실수 없습니다.</span></li>';
	}
	else {
		html += '<li><select id="' + sel_id + '" class="selectText sel_file_box" style="width:50px;">';
		
		for(var i = 1; i <= n ; i++){
			html += '<option value="' + i + '">' + i + '</option>';
		}
		
		html += '</select>최대 ' + mc + '개, 총 ' + MAX_SIZE_STR + ' 까지</li>';
		
		html += '<li><ul id="' + file_box_id + '" class="addfile">';
		html += '	<li><input type="file" name="' + tag_n + '" class="inputFile" style="width:255px;" /></li>';
		
		html += '	</ul></li>';
	}
	
	$(obj).html(html);
	
	// 첨부파일 개수 변경 이벤트
	$('#' + sel_id).on({
		'change' : function(e){
			var n = $(this).val();
			var txt = '';
			for(var i = 0; i < n; i++){
				txt += '<li><input type="file" name="' + tag_n + '" class="inputFile" style="width:255px;" /></li>';
			}
			
			$('#' + file_box_id).html(txt);
		}
	});
}

/**
 * ajax 호출 시 세션 끊겼을 경우 처리
 *
 * @param e
 * @param xhr
 * @param settings
 * @param exception
 */
function ajaxJsonErrorAlert(jqXHR, textStatus, thrownError){
	if(jqXHR.status	==0){ 						alert("네트워크를 체크해 주세요.");
	}else if(jqXHR.status	==404){ 			alert("페이지를 찾을수 없습니다.");
	}else if(jqXHR.status	==500){ 			alert("서버에러가 발생하였습니다.");
	}else if(textStatus	=='parsererror'){ 	alert("응답 메시지 분석에 실패 하였습니다.");
	}else if(textStatus	=='timeout'){ 		alert("시간을 초과 하였습니다.");
	}else {
		alert('에러가 발생하였습니다.');
	}
}
