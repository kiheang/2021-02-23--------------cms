	 
	$(function(){	
		if(voteTy == "V"){
			//VS
			fnSelVoteType('02');
			$("#voteType").val("V");
		}else{
			//일반
			fnSelVoteType('01');
			
			// 분기투표가 아닌경우
			if($("#voteType").val() != 'D'){
				$("#voteType").val("N");
			}
		}

		//이미지 클릭 방지
		$(".preventDefault").click(function(e) {
			 e.preventDefault();
		});
		
		//달력 한글 세팅	
		settingdatepickerko();
		
		$('#sch_st_date').datepicker({ 
			 dateFormat: 'yy-mm-dd',
			 changeYear: true,
			 changeMonth : true,
			 onSelect: function(selected) { 
				$('#sch_ed_date').datepicker("option","minDate", selected);
			} 
		});  
		  
		$('#sch_ed_date').datepicker({ 
			dateFormat: 'yy-mm-dd',
			changeYear: true,
			changeMonth : true,
			onSelect: function(selected) { 
				$('#sch_st_date').datepicker("option","maxDate", selected);
			} 
		});
		
		$('#sch_st_date_btn').click(function() {
       		$('#sch_st_date').datepicker('show');
	    });
		 
		$('#sch_ed_date_btn').click(function() {
	    	$('#sch_ed_date').datepicker('show');
	    });
		
		$(".ui-datepicker-month").css({'color':'#222 !important'});
		
		$(document).on( "click", ".btn_help", function() {
			var locat = $(this);
			if ($(".btn_help").hasClass("on")) {
				$(".btn_help").removeClass("on");
			} else {
				$(locat).parent().find(locat).addClass("on");
			}
		});
		
		// 투표대상 비공개 투표 선택에 따른 인풋박스 활성화/비활성화
		$("[name=othbc_trget]").change(function(){
			var id = this.id;
			var val = $("select[name=othbc_trget]").val();
			// 비공개
			if(val == "003" || val == "005"){
				$("#trget_type_cell").hide();
				$("#trget_btn_cell").hide();
				$("#trget_type").val("011");
				$("#targetSource_cell").find("input").each(function(){
					$(this).val('');
				});
				$("#targetSource_cell").hide();
				// 최대 투표수 활성화
				$("#mxmm_vote_cnt").prop('disabled', false);
				
				// 비밀번호 입력창 
				$(".password_cell").show();
			
			// 특정인
			}else if(val == "002"){
				$("#trget_type_cell").show();
				$("#trget_btn_cell").show();
				$("#targetSource_cell").show();
				// 최대 투표수 초기화 및 비활성화
				$("#mxmm_vote_co").prop('disabled', true);
				$("#mxmm_vote_cnt").prop('checked', false);
				$("#mxmm_vote_cnt").prop('disabled', true);
				$("#mxmm_vote_co").val('');
				
				// 비밀번호 입력창 
				$(".password_cell").each(function(){
					$(this).find("input").val('');
				});
				$(".password_cell").hide();
			// 전체공개
			}else{
				$("#trget_type_cell").hide();
				$("#trget_btn_cell").hide();
				$("#trget_type").val("011");
				$("#targetSource_cell").find("input").each(function(){
					$(this).val('');
				});
				$("#targetSource_cell").hide();
				// 최대 투표수 활성화
				$("#mxmm_vote_cnt").prop('disabled', false);
				
				// 비밀번호 입력창 
				$(".password_cell").each(function(){
					$(this).find("input").val('');
				});
				$(".password_cell").hide();
			}
		});
		
		// 최대투표수 설정 변경시
		$('#mxmm_vote_cnt').change(function(e){
			// 체크시
			if($(this).prop('checked')){
				$('[name=mxmm_vote_co]').prop('disabled', false);
			} else {
				$('[name=mxmm_vote_co]').prop('disabled', true);
			}
		});
		
		// 최소의사정족수 설정 변경시
		$('#minmm_vote_quorum_cnt').change(function(e){
			// 체크시
			if($(this).prop('checked')){
				$('[name=minmm_vote_qurrum_co]').prop('disabled', false);
			} else {
				$('[name=minmm_vote_qurrum_co]').val('');
				$('[name=minmm_vote_qurrum_co]').prop('disabled', true);
			}
		});
		
		
		// 정책결정 투표 타입 선택시
		$('[name=policy_vote_ty]').change(function(e){
			
			// 정책결정투표인경우
			if($(this).val() == '001'){
				
				var selected_othbc_trget = $('[name="othbc_trget"] option:selected').val();
				//투표대상이 전체공개(휴대폰), 전체공개 통합인증 - 시민카드, 통합인증 - 시민카드, 나이스 가 아닐 경우 기본 값 고정
				if(!(selected_othbc_trget == '004' || selected_othbc_trget == '008' || selected_othbc_trget == '009')){
					// 투표대상 전체공개(핸드폰) 변경
					$('[name=othbc_trget]').val("004").trigger('change');
				}
				
				// 비활성화 처리
				$("#trget_type").val("011");
				$("#targetSource_cell").find("input").each(function(){
					$(this).val('');
				});
				// 투표 대상 전체공개(통합인증), 전체공개 (휴대폰)만 선택 가능하게 변경
				$('[name=othbc_trget] option').prop('disabled', true);
				$('[name=othbc_trget] option[value=004]').prop('disabled', false);
				$('[name=othbc_trget] option[value=008]').prop('disabled', false);
				$('[name=othbc_trget] option[value=009]').prop('disabled', false);
				
				// 마감후 결과노출 고정
				$('#vote_radio02_02').prop('checked', true);
				// 비활성화 처리
				$('[name=progrs_middl_result]').prop('disabled', true);
				// 히든값 동적추가
				$('#vote_radio02_02').after('<input type="hidden" name="progrs_middl_result" value="E" />');
				
				// 통계정보 받음 고정
				$('#vote_radio03_01').prop('checked', true);
				// 비활성화 처리하고 Y값을 동적 추가해준다.
				$('[name=stats_colct_yn]').prop('disabled', true);
				$('#vote_radio03_01').after('<input type="hidden" name="stats_colct_yn" value="Y" />');
				//통계정보 그룹 표시해준다
				$("[name='stats_colct_group']").prop("checked", true);
				$(".statColctDisplay").css("display", "");
				
				//의사정족수 - 정책결정투표
				$('#minmm_vote_quorum_cnt').prop('disabled', false);
			}
			// 정책 참조 투표인경우
			else {
				//의사정족수 -  정책 참조투표
				$('#minmm_vote_quorum_cnt').prop('checked',false);
				$('#minmm_vote_quorum_cnt').prop('disabled', true);
				$('[name=minmm_vote_qurrum_co]').prop('disabled', true);
				$('[name=minmm_vote_qurrum_co]').val('');
				
				// 히든타입의 othbc_trget 삭제
				$('[type=hidden][name=othbc_trget]').remove();
				// 비활성화 풀기
				$('[name=othbc_trget] option').prop('disabled', false);
				
				// 히든타입의 stats_colct_yn 삭제
				$('[type=hidden][name=stats_colct_yn]').remove();
				// 비활성화 풀기
				$('[name=stats_colct_yn]').prop('disabled', false);
				//통계정보 그룹 hide해준다
				if($('#vote_radio03_02').prop('checked') == true) {
					$("[name='stats_colct_group']").prop("checked", false);
					$(".statColctDisplay").css("display", "none");
				}
				
				// 히든타입의 progrs_middl_result 삭제
				$('[type=hidden][name=progrs_middl_result]').remove();
				// 비활성화 풀기
				$('[name=progrs_middl_result]').prop('disabled', false);
			}
		});
		
		//재투표 관련 추후 삭제
		$('[name=othbc_trget]').change(function(e){
			var othbcTrgetVal = $(this).val();
			//전체 공개 휴대폰,소셜    /  전체 공개 휴대폰   /  전체 공개 통합인증 이 아닌 경우 재투표 설정 불가능
			if(!(othbcTrgetVal == '001' || othbcTrgetVal == '004' || othbcTrgetVal == '008' || othbcTrgetVal == '009')){
				$("[name=vote_gubun][value='000']").prop("checked", true);
				return false;
			}
			
		});
		
		//재투표 관련 추후 삭제
		$('[name=vote_gubun]').change(function(e){
			var othbcTrgetVal = $("select[name=othbc_trget]").val();
			
			if($("#vote_ty").val() == "V"){
				alert(getNotiMsg('C_MV62'));
				$("[name=vote_gubun][value='000']").prop("checked", true);
			}
			
			//전체 공개 휴대폰,소셜    /  전체 공개 휴대폰   /  전체 공개 통합인증 이 아닌 경우 재투표 설정 불가능
			if(!(othbcTrgetVal == '001' || othbcTrgetVal == '004' || othbcTrgetVal == '008' || othbcTrgetVal == '009')){
				alert(getNotiMsg('C_MV30'));
				$("[name=vote_gubun][value='000']").prop("checked", true);
			}
		});
		
		// 동적으로 생성되는 버튼에 이벤트 바인딩
		// 최대 투표 수 변경하면
		$(document).on("change", "[id^='ge_anse_mxmm_choise_co']", function(e) {
			// 총 투표 수 변경
			if($('#ge_mxmm_choise_co').prop('disabled') == false) { fnSetOptionHtml(); }
		});
		
		// 동적으로 생성되는 버튼에 이벤트 바인딩
		// 답변 input에서 엔터 치면
		$(document).on("keydown", '.cell.inc_del > input[type=text]' , function(e) {
			var $input = $(this).parents('.form_tbl_ui_gr').find('.cell.inc_del > input[type=text]');
			
			if(e.keyCode == 13) { 
				var index = $input.index(this);
				
				// 현재 질문 넘버가 전체 질문 개수보다 적다면
				if($input.length - 1 > index) {
					// 다음 질문에 포커싱
					$input.eq(index + 1).focus();
				} else {
					// 추가 질문이 없으면 질문 추가하고 포커싱
					$(this).parents('.form_tbl_ui_gr').next().find('button').eq(0).trigger('click');
					$(this).parents('.form_tbl_ui_gr').find('.cell.inc_del > input[type=text]').focus();
				}
			}
		});
		
		// 동적으로 생성되는 버튼에 이벤트 바인딩
		// 최소 투표 수 변경하면
		$(document).on("change", "[id^='ge_anse_mumm_choise_co']", function(e) {
			var mumVal = $(this).val();
			var mxmVal = $(this).parent().next().find("select").val();
			
			// 답변 최소선택수가 최대선택수 보다 많게 선택시
			if(mxmVal < mumVal) {
				alert(getNotiMsg('C_MV11'));
				$(this).val(mxmVal);
			}
		});
		
		
		// 통계정보 받음 선택 시
		$("[name='stats_colct_yn']").change(function(){
			if($(this).val() == 'Y') {
				// 선택사항 체크 후 show
				$("[name='stats_colct_group']").prop("checked", true);
				$(".statColctDisplay").css("display", "");
			} else {
				// 선택사항 체크 푼 후 hide
				$("[name='stats_colct_group']").prop("checked", false);
				$(".statColctDisplay").css("display", "none");
			}
		});
	});
	
	function fnOpenTrgetPopup() {
		var trgetType = $("#trget_type option:selected").val();
		
		switch (trgetType) {
		case "011":
			toggle_object("vote-recentlist-pop");
			break;
		case "012":
			toggle_object("vote-excel-pop");
			break;
		case "02" :
			toggle_object("vote-minfost-pop");
			break;
		case "03" :
			toggle_object("vote-gps-pop");
			break;
		}
	}
	
	// 차단번호 양식 다운
	function fnTampletBlockNumDown(){
		document.location.href="/upload/sample/block_num_sample.xls";
	}
	
	function fnBlockNumDel (){
		if(confirm("등록된 차단된 번호를 삭제 하시겠습니까?")){
			$("#submitForm").attr({action: "/admin/vote/deleteBlockNum.do" , method:"post"}).submit();		
		}
	} 
			
	/* 대상 선택 (일반투표 / vs형 투표) */
	function fnSelVoteType(id){
		$('.vote_type01').css('display', 'none');
		$('.vote_type02').css('display', 'none');
		$('.vote_type' + id).css('display', '');
		$(".main-sidebar").css("height", $(".wrapper")[0].scrollHeight);
	}
	
	//특정인 목록에서 선택시 레이어 초기화
    function fnSelectObjList() {
    	var tab = $('.sub_tab>li');
		var con = $('.tab_content');

		//클릭이벤트정의
		tab.each(function(e) {

			$(this).click(function() {
				con.hide();
				tab.removeClass('on');
				con.eq(e).show();
				tab.eq(e).addClass('on');
				
				if(tab.eq(e).attr("class") == "onVoteList on"){
					fnVoteGroupLsit();
				}
				
				return false;
			});
		});
		//초기설정
		con.hide();
		tab.eq(0).trigger('click');
	}	
	
	//투표 목록 이동
	function fnGoList(){
		$("#searchform").attr({action:"/admin/vote/selectPageListVoteMgt.do", method:"post"}).submit();	
	}
	
	//수정 취소
	function fnGoUpdateCancle(){
		location.reload(true);
	}
	
	//투표발제전 name. id 등 재설정
	function fnSetAttrBeforChVotesttus(){
		var queLen = $(".vote_box1").length -2;
		for (var i = 0; i < queLen; i++) {
			$(".vote_box1").eq(i).find("input").eq(0).addClass("queInput");
			var ansLen = $(".vote_box1").eq(i).find(".v_w_inp_box").length;   
			for (var j = 0; j < ansLen; j++) {
				$(".vote_box1").eq(i).find(".v_w_inp_box").eq(j).find("input").eq(0).addClass("ansInput");
			}
		}
	}
	
	//투표 상태 변경
	function fnGoChangeVoteSttus(code){
		var alertMsg = ""; 
		if(code == "004"){
			//상태 변경전 id, Class 재부여  
			fnSetAttrBeforChVotesttus();
			if(chkValues()){
				alertMsg = getNotiMsg('C_SV09');
			}else{
				alert(getNotiMsg('C_SV08'));
				return false;
			}
		} else if(code == "005"){
			alertMsg = getNotiMsg('C_SV15').replace("%s", "중지");
		} else if(code == "006"){
			alertMsg = getNotiMsg('C_SV15').replace("%s", "마감");
		}
		
		var submitUrl = "/admin/eventVote/updateVoteSttusMgt.do";
		if($("#event_seq").val() == "none"){
			 submitUrl = "/admin/vote/updateVoteSttusMgt.do";
		}
		
		//나이스 포함 통합인증일 경우, 비용발생으로 인한 최고관리자만 발제 가능
		if(code == "004" && $('[name="othbc_trget"] option:selected').val() == '009'){
			
			var checkResult = false;
			
			jQuery.ajax( {
				type : 'POST',
				dataType : 'json',
				url : '/common/checkAuthIdAjax.do',
				async : false,
				success : function(param) {
					if(param.resultStats.resultCode != 'ok'){
						alert("투표대상이 " + $.trim($('[name="othbc_trget"] option:selected').text()) + "일 경우\n 투표 발제를 원하시면 \n신오균 주무관 (02-2133-2953)에게 문의 바랍니다." );
						checkResult = true;
					}
				},
				error : function(jqXHR, textStatus, thrownError){
					ajaxJsonErrorAlert(jqXHR, textStatus, thrownError);
					return;
				}
			});
			
			if(checkResult){
				return false;
			}
		}
		
		if(confirm(alertMsg)){
			var sbmtFlag = false;

			if(code == "004"){
				if(confirm(getNotiMsg('C_MV58'))){
					sbmtFlag = true;
				}
			}else{
				sbmtFlag = true;
			}

			if(sbmtFlag){
				var loading = '<div class="overlay loadingbar"><i class="fa fa-refresh fa-spin"></i></div>';
				// 로딩바 추가
				$('.box-primary').append(loading);
				$("#mod_vote_sttus").val(code);
				$("#cform").attr({action: submitUrl , method:"post"}).submit();
			}
		}
	}
	
	function chkValues() {
		var returnFlag = true;
		var selVoteType = $("#vote_ty").val();
		var othbc_trget = $('[name="othbc_trget"] option:selected').val();
		
		//필수값 체크
		if(selVoteType == "V"){
			if($.trim($("#vs_vote_sj").val()) == ""){
				alert(getNotiMsg('C_MV39'));
				$("#vs_vote_sj").val("");
				$("#vs_vote_sj").focus();
				return false;
			}
			
			if($.trim($("#vs_vote_ans_1").val()) == ""){
				alert(getNotiMsg('C_MV63').replace("(두번째)", ""));
				$("#vs_vote_ans_1").val("");
				$("#vs_vote_ans_1").focus();
				return false;
			}
			
			if($.trim($("#vs_vote_ans_2").val()) == ""){
				alert(getNotiMsg('C_MV63').replace("첫", "두").replace("(두번째)", ""));
				$("#vs_vote_ans_2").val("");
				$("#vs_vote_ans_2").focus();
				return false;
			}
			
			//투표 질문 답변 갯수 설정
			$("#qestn_co").val("1"); 
			$("#totAnsCnt").val("2"); 
			
		}else{
			if($.trim($("#ge_vote_sj").val()) == ""){
				alert(getNotiMsg('C_MV39'));
				$("#ge_vote_sj").val("");
				$("#ge_vote_sj").focus();
				return false;
			}
			$(".queInput").each(function() {
				if ($.trim($(this).val()) == '') {
					alert(getNotiMsg('C_MV40'));
					returnFlag = false;
					return false;
				}
			});
			
			if(!returnFlag){
				return false;
			}
			
			$(".ansInput").each(function() {
				if ($.trim($(this).val()) == '') {
					alert(getNotiMsg('C_MV41'));
					returnFlag = false;
					return false;
				}
			});
			
			if(!returnFlag){
				return false;
			}
			
			// 분기투표인경우 다음 질문 선택이 되어야 한다.
			if($('.vote_type01 [name^=ge_next_qestn_seq]').length > 0){
				
				$('.vote_type01 [name^=ge_next_qestn_seq]').each(function(){
					if($(this).val() == ''){
						alert(getNotiMsg('C_MV64'));
						returnFlag = false;
						return false;
					}
				});
			}
			
			if(!returnFlag){
				return false;
			}
		}
		
		// 메인 서브 이미지가 있는경우 대표 이미지가 없는경우에는 등록 막기
		var main_sub_img = $('[name=ge_attImgFileInfoMain]:gt(0)').filter(function(){
			return nvl($(this).val()) != '' ? true : false;
		});
		
		if(main_sub_img.length > 0){
			if(nvl($('[name=ge_attImgFileInfoMain]').eq(0).val()) == ''){
				alert(getNotiMsg('C_MV42'));
				return false;
			}
		}
		
		var ans_num = '';
		var img_submit_flag = true;
		// 각각 답변의 서브 이미지가 있는경우 대표 이미지가 없는경우에는 등록 막기
		$('[name^=ge_attImgFileInfo_]').each(function(){
			// 해당답변의 처음 이미지인경우
			if($(this).attr('name').split('_')[2] != ans_num){
				// 답변 고유번호 셋팅
				ans_num = $(this).attr('name').split('_')[2];
				// 해당 답변 서브 이미지 개수 구하기
				var and_sub_img = $('[name=ge_attImgFileInfo_' + ans_num + ']:gt(0)').filter(function(){
					return nvl($(this).val()) != '' ? true : false;
				});
				// 해당 답변의 서브이미지와 대표이미지 있는지 여부 확인
				if(and_sub_img.length > 0){
					/*
					if(nvl($('[name=ge_attImgFileInfo_' + ans_num + ']').eq(0).val()) == ''){
						alert(getNotiMsg('C_MV43'));
						img_submit_flag = false;
						return false;
					}
					*/
				}
			}
		});
		
		var img_size_sum = 0;
		
		$("[id^='ge_attImgFileInfo'").each(function(){
			if($(this).val() != '') {
				img_size_sum += parseInt($(this).val().split("|")[5], 10);
			}
		});
		
		if(img_size_sum <= 1024 * 1024 * 50) {
		}else {
			alert(getNotiMsg('C_MV44').replace("###",  img_size_sum));
			return false;
		}
		
		if(!img_submit_flag){
			return false;
		}
		
		if($.trim($("#vote_dc").val()) == ""){
			alert(getNotiMsg('C_MV45'));
			$("#vote_dc").val("");
			$("#vote_dc").focus();
			return false;
		}
		
		if($.trim($("#sch_st_date").val()) == ""){
			alert(getNotiMsg('C_MV47'));
			$("#sch_st_date").val("");
			$("#sch_st_date").focus();
			return false;
		}
		
		if($.trim($("#sch_ed_date").val()) == ""){
			alert(getNotiMsg('C_MV48'));
			$("#sch_ed_date").val("");
			$("#sch_ed_date").focus();
			return false;
		}
		
		// 시작일자가 끝날짜를 넘어갈수 없다.
		var start_time = '' + $.trim($("#sch_st_date").val()).replace(/-/gi, '') + $('#st_hour').val() + $('#st_min').val();
		var end_time = '' + $.trim($("#sch_ed_date").val()).replace(/-/gi, '') + $('#ed_hour').val() + $('#ed_min').val();
		var now = new Date().format("yyyymmddhh24mi");
		
		if(start_time > end_time){
			alert(getNotiMsg('C_MV49'));
			return false;
		}
		
		if(end_time < now){
			alert('투표 종료 시간이 현재 시간보다 이전입니다.');
			return false
		}
		
		if($.trim($("#vote_crtr").val()) == ""){
			alert(getNotiMsg('C_MV46'));
			$("#vote_crtr").val("");
			$("#vote_crtr").focus();
			return false;
		}
		
		if($("#event_seq").val() == "none"){
			if(othbc_trget == "003" || othbc_trget == "005"){
				if($.trim($("#vote_password").val()) == ""){
					alert(getNotiMsg('C_MV50'));
					$("#vote_password").val("");
					$("#vote_password").focus();
					return false;
				}
			}else if(othbc_trget == "002"){
				if($.trim($("#targetSource").val()) == ""){
					alert(getNotiMsg('C_MV53'));
					return false;
				}
			}
		}
		
		if($("[name='stats_colct_yn']:checked").val() == 'Y') {
			if($("[name='stats_colct_group']:checked").length < 1) {
				alert("통계 정보 그룹을 선택해주세요.");
				return false;
			}
		}
		
		//if($("#dept_code").val() == "none" || $("#best_code").val() == "none"){
		//투표 부서 선택
		if($("#viewDeptNm").length >0){ //admin은 존재하지 않다
			if($("#dept_code").val() == "" || $("#best_code").val() == ""){
				alert(getNotiMsg('C_MV55'));
				$('#depthsearchbtn').focus();
				return false;
			}
		}
		
		if($.trim($("[name='vote_tag_nm']").val()) == ""){
			alert(getNotiMsg('C_MV56'));
			$("[name='vote_tag_nm_in']").focus();
			return false;
		}
		
		$("#begin_dt").val($("#sch_st_date").val().replace(/-/g , "") + $("#st_hour").val() + $("#st_min").val());
		$("#end_dt").val($("#sch_ed_date").val().replace(/-/g , "") + $("#ed_hour").val() + $("#ed_min").val());
		
		return true;
	}
	
	//수정폼 이동 (disable => false)
	function fnGoVoteUpdateForm(){
		$('.updateStatDisabled').attr('disabled', false);
		$('.targetSourceBtn').attr('disabled', false);
		$(".updateStatReadOnly").attr("readonly", false);
		$(".updateStatDisplay").css('display', '');
		$(".updateStatDisplayNone").css('display', 'none');
		$(".updateStatDisabledAnswer").removeClass("updateStatDisabledAnswer");
		
		$("#targetSource").removeAttr('onclick');
		$('.vote_tag_nm_minus').attr('disabled', false);
		$('#vote_password').attr('disabled', false);
		$('.BlockNumDel').attr('disabled', false);
		$('[name=vote_gubun]').attr('disabled', false);
		
		
		if(voteTy == "V"){
			//VS
			$("#vsImgDelete_1").attr({"onclick" : "fnVsimgDelete(1); return false;"});
			$("#vsImgDelete_2").attr({"onclick" : "fnVsimgDelete(2); return false;"});
			$("#vsImgDelete_1").next("img").attr({"id" : "vsImgfileBtn_1", "onclick" : "fnSeleteVsImgTrigger(1); return false;"});
			$("#vsImgDelete_2").next("img").attr({"id" : "vsImgfileBtn_2", "onclick" : "fnSeleteVsImgTrigger(2); return false;"});
			
			var img = "/common/images/img_none04.png";
			var img_1 = $("#vsImgDelete_1").next("img").attr("src");
			if(img_1 != img){
				$("#vsImgDelete_1").addClass("btn_img_delete");
			} 
			
			var img_2 = $("#vsImgDelete_2").next("img").attr("src");
			if(img_2 != img){
				$("#vsImgDelete_2").addClass("btn_img_delete");
			} 
			
			$(".geThumbBtn").hide();
			
			//재투표 관련 추후 삭제
			$("[name=vote_gubun][value='000']").prop("checked", true);
			
		}else{
			//일반
			//메인 이미지 ATTR설정
			for (var i = 1; i <= 6; i++) {
				$("#geImgDelete_"+i).attr({"onclick" : "fnGeImgDelete("+i+"); return false;"});
				$("#geImgDelete_"+i).parent().find("a").attr({"id" : "geImgfileBtn_"+i+"", "onclick" : "fnSeleteGeImgTrigger("+i+"); return false;"});
			}
			
			fnSetAttr();
			
			// 수정폼은 답변 내 input이 하나 더 많음
			var inputHtml = '<input type="hidden" id="" name="">';
			$("#que001Temp").find(".cell.inc_del").eq(0).find("input").eq(0).after(inputHtml);
			$("#que001Temp").find(".cell.inc_del").eq(1).find("input").eq(0).after(inputHtml);
			$("#addAnsBox").find("input").eq(0).after(inputHtml);
			$("#addAnsBox2").find("input").eq(0).after(inputHtml);
		}
		
		var innerHtml = '	<button class="btn btn-default" type="button" onclick="fnGoUpdateCancle(); return false;"><i class="fa fa-reply"></i> 취소</button>	';
			//innerHtml += '	<button class="btn btn-success" type="button" onclick="fnGoCopyVoteTemp(); return false;""><i class="fa fa-copy"></i> 투표복사</button>';
			innerHtml += '	<button class="btn btn-info" type="button" onclick="fnGoUpdate(); return false;"><i class="fa fa-pencil"></i> 수정완료</button>';
		$(".btnGroup").html(innerHtml);
		
		// 정책투표타입설정이 있기때문에 change 이벤트를 한번 걸어준다.
		$('[name=policy_vote_ty]:checked').trigger('change');
		// 특정인 관련 change 이벤트 한번 더 걸어줌
		$('[name=othbc_trget]').trigger('change');
	}
	
	//투표 복사
	function fnGoCopyVoteTemp(){
//		var selVoteType = $('input:radio[name="voteType"]:checked').val();
		// 투표 타입 가져오기
		var selVoteType = $('input[name=voteType]').val();
		var vote_copy_sttus = $('#vote_copy_sttus').val(); 
		
		if(vote_copy_sttus=="A"){
			msg = "양도 하시겠습니까?";
		}else{
			msg = getNotiMsg('C_SV04');
		}
		
		//필수값 체크
		if(selVoteType == "V"){
			if($.trim($("#vs_vote_sj").val()) == ""){
				alert(getNotiMsg('C_SV05'));
				$("#vs_vote_sj").val("");
				$("#vs_vote_sj").focus();
				return false;
			}
			
			//투표 질문 답변 갯수 설정
			$("#qestn_co").val("1"); 
			$("#totAnsCnt").val("2"); 
			
		}else{
			if($.trim($("#ge_vote_sj").val()) == ""){
				alert(getNotiMsg('C_SV05'));
				$("#ge_vote_sj").val("");
				$("#ge_vote_sj").focus();
				return false;
			}
		}
		
		//if($("#dept_code").val() == "none" || $("#best_code").val() == "none"){
		//투표 부서 선택
		if($("#viewDeptNm").length >0){ //admin은 존재하지 않다
			if($("#dept_code").val() == "" || $("#best_code").val() == ""){
				alert(getNotiMsg('C_SV06'));
				$('#depthsearchbtn').focus();
				return false;
			}
		}

//		if($.trim($("[name='vote_tag_nm']").val()) == ""){
//			alert(getNotiMsg('C_MV56'));
//			$("[name='vote_tag_nm_in']").focus();
//			return false;
//		}
		
		$("#begin_dt").val($("#sch_st_date").val().replace(/-/g , "") + $("#st_hour").val() + $("#st_min").val());
		$("#end_dt").val($("#sch_ed_date").val().replace(/-/g , "") + $("#ed_hour").val() + $("#ed_min").val());
		
    	if(confirm(msg)){
    		
    		//복사시 disabled 상태값 풀고 저장
    		fnSetAttr();
    		
    		// vs 형인경우 질문,답변 개수 지정
    		if(selVoteType == "V"){
    			//투표 질문 답변 갯수 설정
    			$("#qestn_co").val("1"); 
    			$("#totAnsCnt").val("2"); 
    		}
    		
    		$('.updateStatDisabled').attr('disabled', false);
    		
    		// 특정인 투표인경우 목록에서 선택인경우 목록혹은 파일일 경우 설정값 셋팅
    		/*if($('#submitForm [name=othbc_trget]:checked').val() == '002'){
    			if($('#submitForm [name=trget_sourc]').val() == '001'){
    				$("#targetSourceTabNo").val("01");
    			} else if($('#submitForm [name=trget_sourc]').val() == '004'){
    				$("#targetSourceTabNo").val("02");
    			}
    		}  현재 디자인에서는 사용 안함 2020.06.16 elliot*/
    		
    		var submitUrl = "/admin/eventVote/copyVoteTempAjax.do";
			var resultUrl = "/admin/eventVote/selectEventVoteMgt.do?event_seq="+$("#event_seq").val();	
			if($("#event_seq").val() == "none"){
				 submitUrl = "/admin/vote/copyVoteTempAjax.do";
				 resultUrl = "/admin/vote/selectPageListVoteMgt.do";	
			}
    		
    		$("#submitForm").attr("action", submitUrl);
			$("#submitForm").ajaxForm({
			    success : function(param) {
			        if(param.resultStats.resultCode == "ok"){
			        	if(vote_copy_sttus=="A"){
			    			msg = getNotiMsg('C_SV13');
			    		}else{
			    			msg = getNotiMsg('C_SV07');
			    		}
			        	
			        	alert(msg);
			        	document.location.href = resultUrl;
			        	//location.reload(true);
					}else{
						alert(param.resultStats.resultMsg);
						return;
					}
			    },
				error : function(jqXHR, textStatus, thrownError){
					ajaxJsonErrorAlert(jqXHR, textStatus, thrownError);
				}
			}); 
			$("#submitForm").submit(); 
		}
	}
	
	//수정
	function fnGoUpdate(){
		
		var selVoteType = $("#vote_ty").val();
		
		//필수값 체크
		if(selVoteType == "V"){
			if($.trim($("#vs_vote_sj").val()) == ""){
				alert(getNotiMsg('C_MV39'));
				$("#vs_vote_sj").val("");
				$("#vs_vote_sj").focus();
				return false;
			}
			
			//투표 질문 답변 갯수 설정
			$("#qestn_co").val("1"); 
			$("#totAnsCnt").val("2"); 
			
		}else{
			if($.trim($("#ge_vote_sj").val()) == ""){
				alert(getNotiMsg('C_MV39'));
				$("#ge_vote_sj").val("");
				$("#ge_vote_sj").focus();
				return false;
			}
		}
		if($("[name='stats_colct_yn']:checked").val() == 'Y') {
			if($("[name='stats_colct_group']:checked").length < 1) {
				alert("통계 정보 그룹을 선택해주세요.");
				return false;
			}
		}
		
		//의사정족수 체크 부분
		if($('#minmm_vote_quorum_cnt').prop('checked') == true)
		{
			if($('#minmm_vote_qurrum_co').val()<=0)
			{
				alert(getNotiMsg('C_MV54'));
				$('#minmm_vote_qurrum_co').focus();
				return false;
			}
		}
		
		//if($("#dept_code").val() == "none" || $("#best_code").val() == "none"){
		//투표 부서 선택
		if($("#viewDeptNm").length >0){ //admin은 존재하지 않다
			if($("#dept_code").val() == "" || $("#best_code").val() == ""){
				alert(getNotiMsg('C_MV55'));
				$('#depthsearchbtn').focus();
				return false;
			}
		}
		
		/* 2020.06.01 mk 태그 체크는 발제시에만 하도록 변경
		if($.trim($("[name='vote_tag_nm']").val()) == ""){
			alert(getNotiMsg('C_MV56'));
			$("[name='vote_tag_nm_in']").focus();
			return false;
		}
		*/
		
		$("#begin_dt").val($("#sch_st_date").val().replace(/-/g , "") + $("#st_hour").val() + $("#st_min").val());
		$("#end_dt").val($("#sch_ed_date").val().replace(/-/g , "") + $("#ed_hour").val() + $("#ed_min").val());
		
    	if(confirm("수정 하시겠습니까?")){
    		
    		// 특정인 투표인경우 목록에서 선택인경우 목록혹은 파일일 경우 설정값 셋팅
    		if($('#submitForm [name=othbc_trget]:checked').val() == '002'){
    			if($('#submitForm [name=trget_sourc]').val() == '001'){
    				$("#targetSourceTabNo").val("01");
    			} else if($('#submitForm [name=trget_sourc]').val() == '004'){
    				$("#targetSourceTabNo").val("02");
    			}
    		}
    		
    		var submitUrl = "/admin/eventVote/updateVoteAjax.do";
			if($("#event_seq").val() == "none"){
				 submitUrl = "/admin/vote/updateVoteAjax.do";
			}
    		
    		$("#submitForm").attr("action", submitUrl);
			$("#submitForm").ajaxForm({
				beforeSubmit : function(){
					var loading = '<div class="overlay loadingbar"><i class="fa fa-refresh fa-spin"></i></div>';
					// 로딩바 추가
					$('.box-primary').append(loading);
				},
			    success : function(param) {
			    	alert(param.resultStats.resultMsg);
			    	
			    	// 시스템 상 정상처리되었을 때는 새로고침함
			        if(param.resultStats.resultCode == "ok"){
			        	//document.location.href="/admin/vote/selectPageListVoteMgt.do";
			        	location.reload(true);
					}else{
						return;
					}
			    },
				error : function(jqXHR, textStatus, thrownError){
					ajaxJsonErrorAlert(jqXHR, textStatus, thrownError);
				},
				complete : function(){
					$('.overlay.loadingbar').remove();
				}
			}); 
			$("#submitForm").submit(); 
		}
	} 	
	
	//VS 이미지 삭제
	function fnVsimgDelete(idx) {
		if(confirm(getNotiMsg('C_MV07'))){
			var imgSrc = "/common/images/img_none04.png";
			$("#temp_vsImgFile_"+idx).val("");
			$("#temp_vsImgFile_idx").val("");
			$("#vsImgfileBtn_"+idx).attr("src", imgSrc);
			$("#vsImgDelete_"+idx).removeClass("btn_img_delete");
			$("#vs_attImgFileInfo_"+idx).val("");
			
			if(idx == 1) {
				$("#popup06 .btn_delete").trigger("click");
			}
		}
	}
	
	/* 대상 선택 */
	function showType(id){
		$("#excel_upload").val("");
		$('.area001').css('display', 'none');
		$('.area002').css('display', 'none');
		$('.area003').css('display', 'none');
		$('.area' + id).css('display', '');
		
		if(id == "001"){
			fnSelectGuCdAjax();
		}else if(id == "003"){
			
		}
	}
 
	$(function(){	
		// 최대투표수 활성화
		$("#ge_mxmm_choise").click(function(){
			// 최대투표수 설정할 경우
			if($('input:checkbox[name=ge_mxmm_choise]').prop('checked')){
				alert(getNotiMsg('C_MV12'));
			}
			
			if(!$('input:checkbox[name=ge_mxmm_choise]').prop('checked')){
				$("[id^='ge_anse_mumm_choise_co_']").val(1);
			}
			
			
			fnSetAttr();
		});
	});
	
	// 답변관련 추가 정보 활성화
	function fnOpenAnswerDetail(section, ansNo){
		var $section = $(section).parent().prev();
		var disableAt = $(section).hasClass("updateStatDisabledAnswer");
		
		var popup_sj = $section.find("input").eq(2);
		var popup_cn = $section.find("input").eq(3);
		var popup_url_at = $section.find("input").eq(4);
		
		$("#ge_popup_sj").val(popup_sj.val());
		$("#ge_popup_cn").val(popup_cn.val());
		$("[name=ge_popup_url_at]:radio[value='" + popup_url_at.val() +"']").prop("checked", true);
		
		$("#vote-answerdetail-pop").find("li").each(function(){
			var index = $("#vote-answerdetail-pop").find("li").index($(this));
			$(this).addClass("add");
			$(this).removeClass("reg");
			$(this).find("button.del_btn").attr({"id":"geImgDelete_" + ansNo + (index+1), "onclick":"fnGeImgDelete('" + ansNo + (index+1) + "'); return false;"}).hide();
			
			$(this).find("a").attr({"id":"geImgfileBtn_" + ansNo + (index+1), "onclick":"fnSeleteGeImgTrigger('" + ansNo + (index+1) + "'); return false;"});
			
			// 수정상태가 아니면 팝업 내부 속성들을 컨트롤
			if(disableAt) {
				$(this).find("a").attr("onclick", "");
				
				$("#ge_popup_sj").addClass("updateStatDisabled");
				$("#ge_popup_sj").attr("disabled", true);
				$("#ge_popup_cn").addClass("updateStatDisabled");
				$("#ge_popup_cn").attr("disabled", true);
				$("#ge_popup_url_at_01").addClass("updateStatDisabled");
				$("#ge_popup_url_at_01").attr("disabled", true);
				$("#ge_popup_url_at_02").addClass("updateStatDisabled");
				$("#ge_popup_url_at_02").attr("disabled", true);
				
				
				$("#insertAnswerDetailBtn").addClass("updateStatDisplay");
				$("#insertAnswerDetailBtn").css("display", "none");
			} else {
				var disabled1 = $("[name=ge_popup_url_at]:checked").val() == 'N' && $("#ge_popup_cn").prop("disabled"); 				// 팝업을 공유해서 쓰기 때문에 disabled 값을 컨트롤 하기 위해서 사용
				var disabled2 = $("[name=ge_popup_url_at]:checked").val() == 'Y' && !$("#ge_popup_cn").prop("disabled"); 			// 팝업을 공유해서 쓰기 때문에 disabled 값을 컨트롤 하기 위해서 사용
				
				if(disabled1 || disabled2) {
					$("#ge_popup_cn").attr({"disabled": !$("#ge_popup_cn").prop("disabled")});
					
					if($("#ge_popup_cn").prop("disabled")){
						$("#ge_popup_sj").prop("placeholder", "URL을 입력해 주세요.");
						// 이미지 등록 불가, 기존 등록 이미지 삭제
						delAnswerImg = true;
						$("#vote-answerdetail-pop ul.img_reg_list").find("li a").each(function() { $(this).addClass("preventReg"); $(this).next().trigger("click"); });
						delAnswerImg = false;
					} else {
						$("#ge_popup_sj").prop("placeholder", "제목을 입력해 주세요.");
						// 이미지 등록 가능
						$("#vote-answerdetail-pop ul.img_reg_list").find("li a").each(function() { $(this).removeClass("preventReg"); });
					}
				}
			}
			
			if($("#ge_attImgFileInfo_" + ansNo + (index+1)).val() == '' || $("#ge_attImgFileInfo_" + ansNo + (index+1)).val() == undefined){
				var htmlstr = "<span class=\"txt\">";
				htmlstr += index != 0 ? '이미지 추가' : '대표 이미지';
				htmlstr += "</span>";
				
				$(this).find("a").html(htmlstr);
			} else {
				var fileInfo = $("#ge_attImgFileInfo_" + ansNo + (index+1)).val().split("|");
				//썸네일 변경
				var imgSrc = fileInfo[4] + fileInfo[2] + "." + fileInfo[1]; 
				$("#geImgfileBtn_" + ansNo + (index+1)).html("<img src='" + imgSrc + "' alt='대표 이미지'>");
				$(this).removeClass("add");
				$(this).addClass("reg");
				if(!disableAt) $("#geImgDelete_" + ansNo + (index+1)).show();
			}
			
		});
		
		$("#insertAnswerDetailBtn").attr("onclick", "fnSaveAnswerDetail('" + popup_sj.attr("id") + "', '" + popup_cn.attr("id") + "', '" + popup_url_at.attr("id") + "')");
		
		toggle_object('vote-answerdetail-pop');
	}
	
	function fnSaveAnswerDetail(popup_sj, popup_cn, popup_url_at){
		// URL 여부가 체크 되어 있는 상태에서 값을 입력 안한 경우 
		if($("[name=ge_popup_url_at]:checked").val() == 'Y' && $("#ge_popup_sj").val() == '') {
			alert(getNotiMsg('C_MV16'));
			return;
		}
		
		$('#' +popup_sj).val($("#ge_popup_sj").val());
		$('#' +popup_cn).val($("#ge_popup_cn").val());
		$('#' +popup_url_at).val($("[name=ge_popup_url_at]:checked").val());
		
		toggle_object('vote-answerdetail-pop');
	}
	
	// 답변 상세 이미지 일괄 삭제를 위한 체크변수
	var delAnswerImg = false;
	function toggleURLCheckbox() {
		var $inputSj = $("#ge_popup_sj");
		var $inputCn = $("#ge_popup_cn");
		
		$inputCn.attr({"disabled": !$inputCn.prop("disabled")});
		
		if($inputCn.prop("disabled")){
			alert(getNotiMsg('C_MV14'))
			$inputSj.prop("placeholder", "URL을 입력해 주세요.");
			$inputSj.val("https://");
			// 이미지 등록 불가, 기존 등록 이미지 삭제
			delAnswerImg = true;
			$("#vote-answerdetail-pop ul.img_reg_list").find("li a").each(function() { $(this).addClass("preventReg"); $(this).next().trigger("click"); });
			delAnswerImg = false;
		} else {
			$inputSj.prop("placeholder", "답변 상세 제목을 입력해 주세요. (최대 1000자)");
			$inputSj.val("");
			// 이미지 등록 가능
			$("#vote-answerdetail-pop ul.img_reg_list").find("li a").each(function() { $(this).removeClass("preventReg"); });
		}
	}
	
	//질문 타입 변경
	function fnChangeQueType(index, key){
		if(key == "001"){
			var layer = $("#queTypee001Temp").html();
			$("#que_type_layer_"+index).html(layer);
			$("#que_type_layer_"+index).addClass("type001");
			$("#que_type_layer_"+index).removeClass("type002");

			fnSetNextQestn();
			fnSetQueAttr(index - 1);
			
		}else if(key == "002"){
			var layer = $("#queTypee002Temp").html();
			$("#que_type_layer_"+index).html(layer);
			$("#que_type_layer_"+index).addClass("type002");
			$("#que_type_layer_"+index).removeClass("type001");

			fnSetNextQestn();
			fnSetQueAttr(index - 1);
		}
	}
	
	//질문 추가
	function fnAddQueType001(obj){
		var layer = $("#que001Temp").html();
		$(obj).parents(".ge_qestn_form").after(layer);
		$(obj).siblings(".btn.btn-foursquare").show();	//질문추가버튼
		
		// 분기투표시에 질문추가되는경우 질문선택지가 늘어나야함.
		fnSetNextQestn();
		
		fnSetAttr();
	}
	
	//질문 삭제
	function fnQueDelete(section){
		if(confirm(getNotiMsg('C_MV13')) == true) {
			$(section).parents(".ge_qestn_form").prev().find(".btn.bg-purple2").show();	//질문추가버튼
			$(section).parents(".ge_qestn_form").remove();
			
			// 분기투표시에 질문추가되는경우 질문선택지가 늘어나야함.
			fnSetNextQestn();
			
			fnSetAttr();
		}
	}
	
	//질문 복사
	function fnQueCopy(section){
		$(section).siblings(".btn.btn-foursquare").show();				//질문삭제버튼
		$(section).siblings(".btn.bg-purple2").show();					//질문추가버튼
		
		var box = $(section).parents(".box.box-primary");
		
		var clone = $(section).parents(".ge_qestn_form").clone(true);
		
		$(section).parents(".ge_qestn_form").find("select").each(function (i) {
			// 분기 선택 셀렉트 박스는 제외함
			if($(this).attr("name").indexOf("ge_next_qestn_seq") < 0) {
				var select = this;
				$(clone).find("select").eq(i).val($(select).val());
			}
		});
		
		clone.appendTo(box);
		
		// 분기투표시에 질문추가되는경우 질문선택지가 늘어나야함.
		fnSetNextQestn();
		fnSetAttr();
	}
	
	//답변 추가
	function fnAddAns(section, no){
		var layer = $("#addAnsBox").html();
		var cnt = $(section).parents('.form_tbl_ui').siblings('.form_tbl_ui_gr').find(".form_tbl_ui").length;
		
		// 기타가 있는 경우 기타 앞에 새 질문을 추가
		if($("[name='ge_etc_yn_" + no + "_" + cnt +  "']").val() == 'Y') {
			$(section).parent().parent().prev().children('.form_tbl_ui').eq(cnt-2).after(layer);
		} else {
			$(section).parent().parent().prev().append(layer);
		}
		// 질문이 추가 되었음으로 cnt에 1을 더한다.
		fnChAnsCount(no,cnt+1);
		// 분기투표시에 질문추가되는경우 질문선택지가 늘어나야함.
		fnSetNextQestn();
		fnSetAnsAttr(no - 1);
	}
	
	//기타 추가
	function fnAddAns2(section, no){
		var layer = $("#addAnsBox2").html();
		var cnt = $(section).parents('.form_tbl_ui').siblings('.form_tbl_ui_gr').find(".form_tbl_ui").length;
		
		
		$(section).parent().parent().prev().append(layer);
		
		// 질문이 추가 되었음으로 cnt에 1을 더한다.
		fnChAnsCount(no,cnt+1);
		// 분기투표시에 질문추가되는경우 질문선택지가 늘어나야함.
		fnSetNextQestn();
		fnSetAnsAttr(no - 1);
		
		$(section).attr("disabled", true);
	}
	
	//답변 삭제
	function fnAnsDelete(section,no){
		var cnt = $(section).parents('.form_tbl_ui_gr').find(".form_tbl_ui").length - 1;
		fnChAnsCount(no,cnt);
		if($(section).siblings("#ge_etc_yn_" + no + "_" + (cnt + 1)).val() == "Y") {
			$(section).closest(".form_tbl_ui_box").find(".cell.arr_fl").find("button").eq(1).attr("disabled", false);
		}
		$(section).parent().parent().remove();
		fnSetAnsAttr(no - 1);
	}
	
	//옵션의 답변 선택 갯수 변경
	function fnChAnsCount(no,cnt) {
		//최대 선택(필수 선택) 갯수 변경
		var maxInnerHtml = "";
		var minInnerHtml = "";
		var max, min;
		
		// 현재선택한 개수 조회
		max = $("#ge_anse_mxmm_choise_co_"+no).val();
		min = $("#ge_anse_mumm_choise_co_"+no).val();
		
		for (var i = 0; i <= cnt; i++) {
			var min_sel = i == min ? 'selected="selected"' : '';
			var max_sel = i == max ? 'selected="selected"' : '';
			
			minInnerHtml += '<option value="'+i+'" ' + min_sel + '>'+i+'개</option>' ;
			if(i > 0) { maxInnerHtml += '<option value="'+i+'" ' + max_sel + '>'+i+'개</option>'; }
		}
		
		$("#ge_anse_mxmm_choise_co_"+no).html(maxInnerHtml);
		$("#ge_anse_mumm_choise_co_"+no).html(minInnerHtml);
	}
	
	// 답변 재설정
	// i+1번 질문의 답변만 초기화
	// 답변 개수는 꽤 많기 때문에 간단한 조건문으로 실행 속도 줄임 (뛰어난 최적화는 아니지만 어느정도 속도 개선함)
	function fnSetAnsAttr(i) {
	
		var $vote_box = $(".vote_box1").eq(i);
		var ansLen = $vote_box.find(".cell.inc_del").length;   
		var queCount = i+1;
		var ansCount = 0;
		
		for (var j = 0; j < ansLen; j++) {
			var $answer_box = $vote_box.find(".cell.inc_del").eq(j);
			
			ansCount = j+1;
			// 이미 초기화가 되어 있으면 다시 할 필요가 없다
			if($answer_box.find("input").eq(2).attr("id") == "ge_popup_sj_"+ queCount +"_"+ ansCount){
				continue;
			}
			
			$answer_box.find("input").eq(0).attr({"id" : "ge_answer_"+ queCount + ansCount , "name" : "ge_answer_"+ queCount +""});
			$answer_box.find("input").eq(1).attr({"id" : "ge_ans_popup_doc_id_"+ queCount +""+ ansCount +"" , "name" : "ge_ans_popup_doc_id_"+ queCount +""});
			$answer_box.find("input").eq(2).attr({"id" : "ge_popup_sj_"+ queCount +"_"+ ansCount , "name" : "ge_popup_sj_"+ queCount +"_"+ ansCount});
			$answer_box.find("input").eq(3).attr({"id" : "ge_popup_cn_"+ queCount +"_"+ ansCount , "name" : "ge_popup_cn_"+ queCount +"_"+ ansCount});
			$answer_box.find("input").eq(4).attr({"id" : "ge_popup_url_at_"+ queCount +"_"+ ansCount , "name" : "ge_popup_url_at_"+ queCount +"_"+ ansCount});
			$answer_box.find("input").eq(5).attr({"id" : "ge_etc_yn_"+ queCount +"_"+ ansCount , "name" : "ge_etc_yn_"+ queCount +"_"+ ansCount});
			$answer_box.find("input").eq(0).addClass("ansInput");
			$answer_box.find(".del").eq(0).attr({"onclick" : "fnAnsDelete(this,"+ queCount +");"});
			
			if(ansLen < 3) {
				$answer_box.find(".del").eq(0).hide();
			} else {
				$answer_box.find(".del").eq(0).show();
			}
			
			for (var k = 0; k < 6; k++) {
				var imgCount = k + 1;
				$answer_box.find("input").eq(6+k).attr({"id" : "ge_attImgFileInfo_"+ queCount +"_"+ ansCount +""+ imgCount +"" , "name" : "ge_attImgFileInfo_"+ queCount +"_"+ ansCount +""});
			}
			
			$answer_box.next().find("button").attr({"onclick" : "fnOpenAnswerDetail(this,'"+ queCount + "_" + ansCount +"');"});
			
			// 기타 질문이 포함되었으면 기타 추가 버튼을 disable 시켜야한다.
			if($answer_box.find("input").eq(5).val() == "Y") {
				$vote_box.find(".arr_fl").find("button").eq(1).attr("disabled", true);
			}
		}
		
		// 분기투표 다음 질문선택 네이밍 설정
		$vote_box.find("[name^=ge_next_qestn_seq]").attr({"name" : "ge_next_qestn_seq_"+ queCount +""});
		
		//투표권 설정 시 셀렉트 옵션 갯수 생성
		fnSetOptionHtml();
		

		//답변수 저장
		$("#ge_answer_co_"+queCount).val(ansCount);
	}
	
	// 질문 재설정
	// i+1번 질문 초기화
	// 질문은 많이 생겨도 보통 10개 아래이기 때문에 아래 함수에는 특별히 최적화 코드를 넣지 않음 (2021 주민참여 예산도 8개였음)
	function fnSetQueAttr(i) {
		var $vote_box = $(".vote_box1").eq(i);
		var ansCount = 0;
		var queLen = $(".vote_box1").length -2;
		var queCount = i+1;
		
		$(".ge_qestn_form").eq(i).find("h2.nvote_sub_tit").text("질문 " + (i+1));
		if(i > 0) {
			$(".ge_qestn_form").eq(i).find("h2.nvote_sub_tit").addClass("nvote_sub_tit_no");			// 질문 위에 border 생기는 것
		} else {
			$(".ge_qestn_form").eq(i).find("h2.nvote_sub_tit").removeClass("nvote_sub_tit_no");
		}
		$vote_box.attr({"id" : "que_type_layer_"+ queCount +""});
		// 질문
		$vote_box.find("input").eq(0).attr({"id" : "ge_qestn_sj_"+ queCount +"" , "name" : "ge_qestn_sj_"+ queCount +""});
		$vote_box.find("input").eq(0).addClass("queInput");
		$vote_box.find("select").eq(0).attr({"id" : "ge_qestn_se_"+ queCount +"" , "name" : "ge_qestn_se_"+ queCount +"" , "onchange" : "fnChangeQueType('"+ queCount +"',this.value); return false;"});
		$vote_box.find(".lbl_slt_set").eq(0).find("select").eq(0).attr({"id" : "ge_answer_random_yn_"+ queCount +"" , "name" : "ge_answer_random_yn_"+ queCount +""});
		$vote_box.find(".lbl_slt_set").eq(0).find("input").eq(0).attr({"id" : "ge_answer_co_"+ queCount +"" , "name" : "ge_answer_co_"+ queCount +""});

		// 최대, 최소 네이밍 설정
		$vote_box.find(".lbl_slt_set").eq(1).find("label").attr({"for" : "ge_anse_mumm_choise_co_"+ queCount +""});
		$vote_box.find(".lbl_slt_set").eq(1).find("select").attr({"id" : "ge_anse_mumm_choise_co_"+ queCount +"" , "name" : "ge_anse_mumm_choise_co_"+ queCount +""});
		$vote_box.find(".lbl_slt_set").eq(2).find("label").attr({"for" : "ge_anse_mxmm_choise_co_"+ queCount +""});
		$vote_box.find(".lbl_slt_set").eq(2).find("select").attr({"id" : "ge_anse_mxmm_choise_co_"+ queCount +"" , "name" : "ge_anse_mxmm_choise_co_"+ queCount +""});
		
		if($('input:checkbox[name=ge_mxmm_choise]').prop('checked')){
			$('#ge_mxmm_choise_co').prop('disabled', false);
			// 답변 당 최소 선택 개수 0으로 고정하고 disabled
			$("[id^='ge_anse_mumm_choise_co_']").val(0).prop('disabled', true);
		} else {
			$('#ge_mxmm_choise_co').prop('disabled', true);
			$("[id^='ge_anse_mumm_choise_co_']").val(1).prop('disabled', false);
		}
		
		// 분기투표 다음 질문선택 네이밍 설정
		$vote_box.find("[name^=ge_next_qestn_seq]").attr({"name" : "ge_next_qestn_seq_"+ queCount +""});
		
		$vote_box.find(".form_tbl_ui.qa > .cell").find(".btn.btn-default").eq(0).attr({"onclick" : "fnAddAns(this,"+ queCount +"); return false;"});
		$vote_box.find(".form_tbl_ui.qa > .cell").find(".btn.btn-default").eq(1).attr({"onclick" : "fnAddAns2(this,"+ queCount +"); return false;"});
		
		// 답변 속성 설정
		fnSetAnsAttr(i);
		
		
		// 맨 마지막 질문에만 질문 추가 버튼을 보여준다.
		if(queCount != queLen){
			$vote_box.find(".cell.ta_l > .btn").eq(0).hide();
		} else {
			$vote_box.find(".cell.ta_l > .btn").eq(0).show();
		}
		
		// 질문이 2개 이상인 경우 총투표수 설정을 셋팅할수 있게끔 설정
		if(queLen < 2){
			$('#ge_mxmm_choise').prop('disabled', true);
			// 맨 첫번째 질문은 질문 삭제 버튼을 없앤다.
			$vote_box.find(".cell.ta_l > .btn").eq(2).hide();
		} else {
			$('#ge_mxmm_choise').prop('disabled', false);
		}
		
		// 총투표수 설정을 하지 않았거나 질문수가 하나 인경우 총 투표수 설정을 막는다.
		if(!$('#ge_mxmm_choise').prop('checked') || queLen < 2){
			$('#ge_mxmm_choise_co').prop('disabled', true);
		} else {
			$('#ge_mxmm_choise_co').prop('disabled', false);
		}
		
		ansCount = $vote_box.find(".cell.inc_del").length;
		
		// 답변 최소 선택 수 설정
		fnChAnsCount(queCount, ansCount);
	}
	
	//name. id 등 재설정
	function fnSetAttr(){
		var maxChoise_flag = $('input:checkbox[name="ge_mxmm_choise"]:checked').val();
		var queLen = $(".vote_box1").length -2;
		
		// 질문 영역 (내부에 답변도 함께) 초기화
		for (var i = 0; i < queLen; i++) {
			fnSetQueAttr(i);
		}
				
		
		//투표 타입 결정
		// 분기투표가 아닌경우만 설정
		if($("#vote_ty").val() != 'D'){
			var typeList = "";
			var vote_ty = "";
			var maxChose = $('input:checkbox[name="ge_mxmm_choise"]:checked').val();
			for (var i = 0; i < queLen; i++) {
				typeList += $(".vote_box1").eq(i).attr("class");
			}
			
			if(typeList.indexOf("type001") > -1 && typeList.indexOf("type002") > -1){
				//복합형
				if(maxChose == "Y"){
					//alert("복합형 복수");
					vote_ty = "A";
				}else{
					//alert("복합형 단수");
					vote_ty = "B";
				}
			}else if(typeList.indexOf("type001") > -1 && typeList.indexOf("type002") == -1 ){
				//객관식 
				if(maxChose == "Y"){
					//alert("객관식 복수");
					vote_ty = "O";
				}else{
					//alert("객관식 단수");
					vote_ty = "M";
				}
			}else if(typeList.indexOf("type002") > -1 && typeList.indexOf("type001") == -1 ){
				//주관식
				vote_ty = "S";
				//투표권 설정 제어
				$("#ge_mxmm_choise_co").attr("disabled", true);
				$('#ge_mxmm_choise').prop('checked', false);
			}else{
				vote_ty = "V";
			}
			
			//투표 타입 설정
			$("#vote_ty").val(vote_ty); 
			
		// 분기 투표일 경우엔 다음질문 선택지도 초기화해준다.
		} else {
			fnSetNextQestn();
		}
		
		//총 질문 갯수 세팅
		$("#qestn_co").val(queLen); 
		
		//투표권 설정시 버튼제어
		if(maxChoise_flag == "Y"){
//			$("#ge_mxmm_choise_co").attr("disabled", false);
//			$(".addAnsBtn").css("display","none");
//			$(".deleteAnsBtn").css("display","none");
//			$(".addQueBox").css("display","none");
//			$(".deleteBtn").attr({"disabled" : true});
//			$(".copyBtn").attr({"disabled" : true});
		}else{
//			$("#ge_mxmm_choise_co").attr("disabled", true);
		}
	}
	
	/* 첨부파일 선택시 */
    var mutex = true;
    
    /* 이미지 클릭 트리거*/
	function fnSeleteGeImgTrigger(idx) {
		if($("#geImgfileBtn_" + idx).hasClass("preventReg")) {
			alert(getNotiMsg('C_MV15'));
			return;
		}
		
		//뮤텍스가 false일경우 리턴
		if(!mutex) {
			//alert("이미지 처리중입니다. 잠시만 기다려 주세요.");
			return;
		}
		//뮤텍스 false로 변경하여 mutex값이 변경되지 전엔 호출 금지
    	$('#temp_geImgFile').trigger('click');
    	$("#temp_geImgFile_idx").val(idx);
    }
    
	$(function(){	
	    
		$("[name='ajaxFormGeImg']").on("change", "[name^='temp_geImgFile']", function(){
			
			//뮤텍스가 false일경우 리턴
			if(!mutex) {
				//alert("이미지 처리중입니다. 잠시만 기다려 주세요.");
				return;
			}
			//뮤텍스 false로 변경하여 mutex값이 변경되지 전엔 호출 금지
			mutex = false;
			
			var ext = $(this).val().split(".").pop().toLowerCase(); 
			//해당 input:file의 index 조회
			//index로 input:hidden(파일정보저장)와 썸네일 이미지의 위치를 찾는다.
			var idx = $("#temp_geImgFile_idx").val();
			//이미지 파일만 업로드 가능함
			if($.inArray(ext, ["png","jpg","jpeg"]) == -1) { 
				if ( $(this).val() != "" ) {
					alert("사진파일만 등록 가능합니다.(jpg, jpeg, png)");
				}
				//스틸컷 이미지를 기본 이미지로 변경
				
				var imgSrc = "/common/images/img_none02.png";
				if(idx > 10){
					imgSrc = "/common/images/img_none03.png";
				}
				$("#geImgfileBtn_"+idx).attr("src", imgSrc);
				$("#temp_geImgFile").val("");
				$("#geImgDelete_"+idx).removeClass("btn_img_delete");
				//해당 파일 정보 초기화
				mutex = true;
			} else {
				$("#temp_geImgFile_idx").val(idx);
				$("[name='ajaxFormGeImg']").submit();
			}
		});
		
	    /* 첨부파일 임시저장 */
		$("[name='ajaxFormGeImg']").ajaxForm({
			url : "/admin/vote/uploadGeImgFileAjax.do",
			beforeSubmit: function(arr, $form, options) { 
				//$("#loadingBar").show();
			},
			success : function(param) {
				//문자열형태의 응답파라미터를 JSON타입으로 변경
				param = $.parseJSON(param);
				var resultStats = param.resultStats;
				var resultCode = resultStats.resultCode;
				var resultMsg = resultStats.resultMsg;
				
				//파일업로드 성공
				if ( resultCode == "ok" ) {
					//"image/jpeg|jpg|1441758811057EGQI8XGWCJP9LWAYCHL31XL69|Lighthouse.jpg|/upload/cnts/1/20150911104058230|561276|D:/eGovFrameDev-3.0.0-32bit-SMP/workspace/AllNewSMP/src/main/webapp/upload/cnts/87/20150914033811300/"
					//fileInfo[0] : contentType;
					//fileInfo[1] : 확장자;
					//fileInfo[2] : 파일ID;
					//fileInfo[3] : 파일명;
					//fileInfo[4] : 상대경로;
					//fileInfo[5] : 파일크기;
					//fileInfo[6] : 절대경로;
					
					//파일정보 저장
					var idx = $("#temp_geImgFile_idx").val();
					//var idx = resultStats.temp_geImgFile_idx;
					var fileInfo = resultStats.fileInfo.split("|");
					//썸네일 변경
					var imgSrc = fileInfo[4] + fileInfo[2] + "." + fileInfo[1]; 
					$("#ge_attImgFileInfo_"+idx).val(resultStats.fileInfo);
					$("#geImgfileBtn_"+idx).html("<img src='" + imgSrc + "' alt='대표 이미지'>");
					$("#geImgfileBtn_"+idx).parent().removeClass("add");
					$("#geImgfileBtn_"+idx).parent().addClass("reg");
					$("#geImgDelete_"+idx).show();
					$("#temp_geImgFile").val("");
					$("#temp_geImgFile_idx").val("");
					if(idx == 1) {
						geThumbDelete('t');			//대표이미지가 변경되면 썸네일 삭제
					}
				} else {
					if ( resultMsg != "" ) {
						alert(resultMsg);
					}
				}
				
				mutex = true;
			}
		});
	});
	
	// 썸네일 삭제
	// type => t: 트리거(대표이미지 삭제로 인해 삭제), d: 버튼(썸네일 삭제 버튼을 이용해 직접 삭제)
	function geThumbDelete(type){
		if(type == 't' || confirm("썸네일을 삭제 하시겠습니까?")){				// 타입이 t면 컨펌 생략
			var imgSrc = "/common/images/img_none02.png";
	
			$("#temp_geImgFile").val("");
			$("#temp_geImgFile_idx").val("");
			$("#geThumbImg").attr("src", imgSrc);
			$("#geThumbDelete").removeClass("btn_img_delete");
			$("#geThumbfileInfo").val("");
		}
	}
	
	//이미지 삭제
	function fnGeImgDelete(idx) {
		if(delAnswerImg || confirm(getNotiMsg('C_MV07'))){
			$("#temp_geImgFile").val("");
			$("#temp_geImgFile_idx").val("");
			if($("#geImgfileBtn_"+idx).parent().hasClass("top")) {
				$("#geImgfileBtn_"+idx).html("<span class=\"txt\">대표 이미지</span>");
			} else {
				$("#geImgfileBtn_"+idx).html("<span class=\"txt\">이미지 추가</span>");
			}
			$("#geImgfileBtn_"+idx).parent().addClass("add");
			$("#geImgfileBtn_"+idx).parent().removeClass("reg");
			$("#geImgDelete_"+idx).hide();
			$("#ge_attImgFileInfo_"+idx).val("");
			
			if(idx == 1) {
				$("#popup06 .btn_delete").trigger("click");
				geThumbDelete('t');
			}
		}
	}
	 /* 첨부파일 선택시 */
    var mutex = true;
    
    /* 이미지 클릭 트리거*/
	function fnSeleteVsImgTrigger(idx) {
		//뮤텍스가 false일경우 리턴
		if(!mutex) {
			//alert("이미지 처리중입니다. 잠시만 기다려 주세요.");
			return;
		}
		//뮤텍스 false로 변경하여 mutex값이 변경되지 전엔 호출 금지
		if(idx == "1"){
			 $('#temp_vsImgFile_1').trigger('click'); 
		}else{
			$('#temp_vsImgFile_2').trigger('click'); 
		}
    } 

	$(function(){	
		
	    /* 첨부파일 선택시 */
		$("[name='ajaxFormVsImg']").on("change", "[name^='temp_vsImgFile']", function(){
			
			//뮤텍스가 false일경우 리턴
			if(!mutex) {
				//alert("이미지 처리중입니다. 잠시만 기다려 주세요.");
				return;
			}
			//뮤텍스 false로 변경하여 mutex값이 변경되지 전엔 호출 금지
			mutex = false;
			
			var ext = $(this).val().split(".").pop().toLowerCase(); 
			//해당 input:file의 index 조회
			//index로 input:hidden(파일정보저장)와 썸네일 이미지의 위치를 찾는다.
			var idx = $(this).attr("id").replace("temp_vsImgFile_", "");
			//이미지 파일만 업로드 가능함
			if($.inArray(ext, ["png","jpg","jpeg"]) == -1) { 
				if ( $(this).val() != "" ) {
					alert("사진파일만 등록 가능합니다.(jpg, jpeg, png)");
				}
				//스틸컷 이미지를 기본 이미지로 변경
				var imgSrc = "/common/images/img_none04.png";
				$("#vsImgfileBtn_"+idx).attr("src", imgSrc);
				$("#temp_vsImgFile_"+idx).val("");
				$("#vsImgDelete_"+idx).removeClass("btn_img_delete");
				//해당 파일 정보 초기화
				mutex = true;
			} else {
				$("#temp_vsImgFile_idx").val(idx);
				$("[name='ajaxFormVsImg']").submit();
			}
		});
		
	    /* 첨부파일 임시저장 */
		$("[name='ajaxFormVsImg']").ajaxForm({
			url : "/admin/vote/uploadVsImgFileAjax.do",
			beforeSubmit: function(arr, $form, options) { 
				//$("#loadingBar").show();
			},
			success : function(param) {
				//문자열형태의 응답파라미터를 JSON타입으로 변경
				param = $.parseJSON(param);
				var resultStats = param.resultStats;
				var resultCode = resultStats.resultCode;
				var resultMsg = resultStats.resultMsg;
				
				//파일업로드 성공
				if ( resultCode == "ok" ) {
					//"image/jpeg|jpg|1441758811057EGQI8XGWCJP9LWAYCHL31XL69|Lighthouse.jpg|/upload/cnts/1/20150911104058230|561276|D:/eGovFrameDev-3.0.0-32bit-SMP/workspace/AllNewSMP/src/main/webapp/upload/cnts/87/20150914033811300/"
					//fileInfo[0] : contentType;
					//fileInfo[1] : 확장자;
					//fileInfo[2] : 파일ID;
					//fileInfo[3] : 파일명;
					//fileInfo[4] : 상대경로;
					//fileInfo[5] : 파일크기;
					//fileInfo[6] : 절대경로;
					
					//파일정보 저장
					var idx= $("#temp_vsImgFile_idx").val();
					var fileInfo = resultStats.fileInfo.split("|");
					//썸네일 변경
					var imgSrc = fileInfo[4] + fileInfo[2] + "." + fileInfo[1];  
					$("#vs_attImgFileInfo_"+idx).val(resultStats.fileInfo);
					 
					$("#vsImgfileBtn_"+idx).attr("src", imgSrc);
					$("#vsImgDelete_"+idx).addClass("btn_img_delete");
					
				} else {
					if ( resultMsg != "" ) {
						alert(resultMsg);
					}
				}
				
				mutex = true;
			}
		});
	}); 
	
	// 투표 화면 보기
	function fnGoVoteView(vote_no){
		// 미리보기 화면 출력
		var url = front_preview_web_url + '?key=' + preview_api_key + '&vote_no=' + vote_no;
		
		window.open(url, 'preview');
	}
	
	// 댓글 현황 화면 보기
	function fnGoRepleList(vote_no){
		var url = '/admin/vote/selectListVoteReplyPop.do?vote_no=' + vote_no;
		
		window.open(url, 'replyPop');
	}

	function fnGoStatIng(preview_url, vote_no){
		// 미리보기 화면을 보여주는데 결과하면을 바로 보여주도록 한다.
		var url = preview_url  + '&type=result&vote_no=' + vote_no;
		windowStatus = 'scrollbars=yes,top=250,left=300';
		window.open(url, "votePop", windowStatus);
	}
	
	function fnGoStatRes(){
		
	}
	
	// 질문수가 변경이 될때마다 분기투표에서 다음 질문 선택지 변경
	function fnSetNextQestn(){
		var qLen = $('.vote_type01 .vote_box1').length;
		
		// 각각의 질문번호를 수정한다.
		$('.vote_box .qestn_num').each(function(){
			var index = $('.vote_box .qestn_num').index($(this));
			
			$(this).find('.num').text(index + 1);
		});
		
		// 개수만큼 설정한다.
		$('[name^=ge_next_qestn_seq').each(function(){
			// 자신의 질문 인덱스
			var index = $('.vote_type01 .vote_box1').index($(this).closest('.vote_type01 .vote_box1'));
			var sel = $(this).val();
			
			// 기존 리스트를 지운다.
			$(this).find('option').remove();
			// 개수만큼 리스트 추가
			var innerStr = '<option value="">다음질문선택</option>';
			
			for(var i = 1; i <= qLen; i++){
				// 자신의 번호 아래로는 선택하지 못하도록 한다.
				if(index + 1 < i){
					innerStr += '<option value="' + i + '">' + i + '번째 질문으로</option>';
				}
			}
			
			innerStr += '<option value="-1">종료</option>';
			
			$(this).append(innerStr).val(sel);
		});
	}
	
	function fnTagAdd(){
		var taghtml = "";
		var vote_tag_nm_in = $.trim($("[name='vote_tag_nm_in']").val());
		if(vote_tag_nm_in == ""){
			alert(getNotiMsg('C_MV32'));
			return false;
		}else if(!fnChkTagVal(vote_tag_nm_in)){
			alert(getNotiMsg('C_MV33'));
		}else{
			//화면상 추가되는 로직
			taghtml +='<li>';
			taghtml +='<button type="button" class="del" title="태그 삭제" onclick="vote_tag_nm_minus(this);return false;">'+ vote_tag_nm_in+ '</button>';
			taghtml +='<input type="hidden" name="vote_tag_nm" value="'+ vote_tag_nm_in +'">'
			taghtml +='</li>';
			$(".tag_input_list").append(taghtml);
			$("[name='vote_tag_nm_in']").val('');
		}
	}
	
	/* 화면상 태그 삭제하는 로직*/
	function vote_tag_nm_minus(obj){
		if(confirm(getNotiMsg('C_MV34'))) {
			$(obj).parent().remove();
		}
	}
	
	// 최대 투표수 셀렉트 박스 생성
	function fnSetOptionHtml() {
		var ge_mxmm_choise_co = $("#ge_mxmm_choise_co option:selected").val();
		
		var selectOptionHtml = "";
		//객관식 질문만 선택
		var que001Count = 0;
		
		$("[id^='ge_anse_mxmm_choise_co']").each(function(index, item) { que001Count += parseInt($(item).val(), 10) });
		
		for (var i = 1; i <= que001Count; i++) {
			selectOptionHtml += '<option value="'+i+'">'+i+'개</option>' ;
		}
		
		if(ge_mxmm_choise_co == undefined || ge_mxmm_choise_co > que001Count) ge_mxmm_choise_co = 1;
		
		//최대선택 갯수 셀렉트 박스 생성
		$("#ge_mxmm_choise_co").html(selectOptionHtml);
		$("#ge_mxmm_choise_co").val("" + ge_mxmm_choise_co);
	}
	
	// 동일 태그명을 사용하였는지 확인
	function fnChkTagVal(new_tag){
		var chk = true;
		
		$("[name='vote_tag_nm']").each(function(){
			if($(this).val() == new_tag) chk = false;
		});
		
		return chk;
	}
	
	
	function fnGoBlockList(){
		$("#searchform").attr({action:"/admin/vote/selectPageListFailedBlckChainVoteMgt.do", method:"post"}).submit();	
	}
	
	/* 사용안함
	 * function randomSuMuja(){
		var text1 = "";
		var text2 = "";
		var result="";
		var alphabet = "abcdefghijklmnopqrstuvwxyz";
		var num = "0123456789";
	
		for( var i=0; i < 4; i++ ){      
		    text1 += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		    text2 += num.charAt(Math.floor(Math.random() * num.length));
		}
		return result = text1+text2;
		
	}		*/	
			//질문 갯수가 1개일떄 투표 제목을 질문으로 넣어줌
		/*$('.voteTitle').keyup(function() {
			var val = $(this).val();
			var qestn_co = $("#qestn_co").val();
			if(qestn_co == 1){
				$(".vote_box1").eq(0).find("input").eq(0).val(val);
			}
	    }); 요청으로 인해 빠짐*/
		
    
	/* 총무과 비상연락망 레이어 팝업 토글 */
	/*function toggle_object(post_id) {
		var obj = document.getElementById(post_id);
		if (obj.style == "" || obj.style.display == "block") {
			obj.style.display = 'none';
		}else{
			obj.style.display = "block";
		}
		
		if(post_id == "popup01"){
			fnSelectObjList();
			fnSelectGuCdAjax();
		}else if(post_id == "popup02"){
			fnSelectGuCdAjax();
		}else if(post_id == "popup03"){
			openMap('mgis_poiname','mgis_address', 'mgis_latitude', 'mgis_longitude','mgis_ctype','mgis_cdata');
		}
	}		2020.06.11 elliot 사용 안함*/
	
			//투표권 설정 활성화
//		$("#ge_mxmm_choise").click(function(){
//			var tmp_flag = $('input:checkbox[name="ge_mxmm_choise"]:checked').val();
//			if(tmp_flag == "Y"){
//				$("#ge_mxmm_choise_co").attr("disabled", false);
//				if(confirm("투표권 설정 시 질문추가 및 답변 추가는 \n제한되며 사용자가 선택할 수 있는 \n답변의 수가 우측 표기 숫자로 제한됩니다.")){
//					$(".chTextmaxChose").text("최대 선택");
//					$(".addAnsBtn").css("display","none");
//					$(".deleteAnsBtn").css("display","none");
//					$(".addQueBox").css("display","none");
//					$(".deleteBtn").attr({"disabled" : true});
//					$(".copyBtn").attr({"disabled" : true});
//				}else{
//					return false;
//				}
//				//fnSetAttr();
//			}else{
//				$("#ge_mxmm_choise_co").attr("disabled", true);
//				$(".chTextmaxChose").text("필수 선택");
//				$(".addAnsBtn").css("display","");
//				$(".deleteAnsBtn").css("display","");
//				$(".addQueBox").css("display","");
//				$(".deleteBtn").attr({"disabled" : false});
//				$(".copyBtn").attr({"disabled" : false});
//				fnSetAttr();
//			}
//		});

/* 옵션 버튼 사라짐 2020.06.11 elliot
 * //옵션 버튼 활성화
	function fnOpenOption(section){
		var locat = section;
		if ($(".option_box").hasClass("on")) {
			if($(locat).parent().find(".option_box").hasClass("on")){
				$(locat).parent().find(".option_box").removeClass("on"); 
			}else{
				$(locat).parent().find(".option_box").addClass("on");
			}
		} else {
			$(locat).parent().find(".option_box").addClass("on");
		}
	}
	
	//옵션 내 랜덤 설정 버튼
	function fnCheckRan(section){
		if ($(section).hasClass("on")) {
			$(section).removeClass("on");
			$(section).next().attr("value", "N");
		} else {
			$(section).addClass("on");
			$(section).next().attr("value", "Y");
		}
	}
	*/
	
	/* 기존의 답변 팝업 사용 안함 2020.06.09 elliot
	 * //답변 팝업 닫기 (확인 버튼)
	function fnCloseAnsPop(section){
		var locat = $(section).parent().parent();
		
		// 답변 문구 팝업 닫기
		$(locat).parent().parent().find(".reply_box").removeClass("on");
		
		// 답변 이미지 닫기
		$(locat).parent().parent().find(".v_w_img_box").removeClass("on");
		$(locat).parent().parent().find("i").removeClass("fa-caret-up").addClass("fa-caret-down");
	}*/