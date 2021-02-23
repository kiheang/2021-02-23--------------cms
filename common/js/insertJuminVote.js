
	$(function(){
		//달력 한글 세팅	
		settingdatepickerko();
		
		$('#sch_st_date').datepicker({ 
			 dateFormat: 'yy-mm-dd',
			 changeYear: true,
			 changeMonth : true,
			 onSelect: function(selected) { 
				$('#sch_ed_date').datepicker("option","minDate", selected);
			}
		}).datepicker("setDate", "0");
		  
		$('#sch_ed_date').datepicker({ 
			dateFormat: 'yy-mm-dd',
			changeYear: true,
			changeMonth : true,
			onSelect: function(selected) { 
				$('#sch_st_date').datepicker("option","maxDate", selected);
			}
		}).datepicker("setDate", "7");
		
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
		
		
		// 정책반영 투표 타입 선택시
		$('[name=policy_vote_ty]').change(function(e){
			
			// 정책반영투표인경우
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
				
				//의자정족수 - 정책반영투표
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
				$('#vote_radio03_02').prop('checked',true );
				//통계정보 그룹 hide해준다
				$("[name='stats_colct_group']").prop("checked", false);
				$(".statColctDisplay").css("display", "none");
				
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
		$(document).on("change", "[id*='ge_anse_mxmm_choise_co']", function(e) {
			var tab = $(this).attr("id").substring(0,1);
			
			// 총 투표 수 변경
			if($('#' + tab +'_ge_mxmm_choise_co').prop('disabled') == false) { fnSetOptionHtml(tab); }
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
		$(document).on("change", "[id*='ge_anse_mumm_choise_co']", function(e) {
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
	
	//등록
	function fnGoInsert(k){
		var returnFlag = true;
		var selVoteType = $('input:radio[name="voteType"]:checked').val();
		var othbc_trget = $('[name="othbc_trget"] option:selected').val();
		var alertMsg = "";
		//임시저장 여부
		if(k != "save"){
			$("#vote_sttus").val("007"); 
			alertMsg = getNotiMsg('C_MV36');
			
			if($.trim($("#ge_vote_sj").val()) == ""){
				alert(getNotiMsg('C_MV37'));
				$("#ge_vote_sj").val("");
				$("#ge_vote_sj").focus();
				return false;
			}
		} else {
			$("#vote_sttus").val("004"); 
			alertMsg = getNotiMsg('C_MV38');
			
			if($.trim($("#ge_vote_sj").val()) == ""){
				alert(getNotiMsg('C_MV39'));
				$("#ge_vote_sj").val("");
				$("#ge_vote_sj").focus();
				return false;
			}
			
			// 각각 투표 탭 제목을 확인
			if($.trim($("[name=A_vote_detail_sj]").val()) == ""){
				alert(getNotiMsg('C_MV37'));
				$("[name=A_vote_detail_sj]").focus();
				return false;
			}
			
			if($.trim($("[name=B_vote_detail_sj]").val()) == ""){
				alert(getNotiMsg('C_MV37'));
				$("[name=B_vote_detail_sj]").focus();
				return false;
			}
			
			$(".queInput").each(function() {
				if ($.trim($(this).val()) == '') {
					alert(getNotiMsg('C_MV40'));
					
					var tab = $(this).prop("id")[0];
					
					$("[name=" + tab + "_vote_detail_sj]").parent().trigger("click");
					
					$(this).focus();
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
					
					var tab = $(this).prop("id")[0];
					
					$("[name=" + tab + "_vote_detail_sj]").parent().trigger("click");
					
					$(this).focus();
					returnFlag = false;
					return false;
				}
			});
			
			if(!returnFlag){
				return false;
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
			$('[name^=A_ge_attImgFileInfo_]').each(function(){
				// 해당답변의 처음 이미지인경우
				if($(this).attr('name').split('_')[3] != ans_num){
					// 답변 고유번호 셋팅
					ans_num = $(this).attr('name').split('_')[3];
					// 해당 답변 서브 이미지 개수 구하기
					var and_sub_img = $('[name=A_ge_attImgFileInfo_' + ans_num + ']:gt(0)').filter(function(){
						return nvl($(this).val()) != '' ? true : false;
					});
					// 해당 답변의 서브이미지와 대표이미지 있는지 여부 확인
					if(and_sub_img.length > 0){
						/*if(nvl($('[name=A_ge_attImgFileInfo_' + ans_num + ']').eq(0).val()) == ''){
							alert(getNotiMsg('C_MV43'));
							img_submit_flag = false;
							return false;
						} updateVote.js와 동일하게 변경*/
					}
				}
			});
			
			// 각각 답변의 서브 이미지가 있는경우 대표 이미지가 없는경우에는 등록 막기
			$('[name^=B_ge_attImgFileInfo_]').each(function(){
				// 해당답변의 처음 이미지인경우
				if($(this).attr('name').split('_')[3] != ans_num){
					// 답변 고유번호 셋팅
					ans_num = $(this).attr('name').split('_')[3];
					// 해당 답변 서브 이미지 개수 구하기
					var and_sub_img = $('[name=B_ge_attImgFileInfo_' + ans_num + ']:gt(0)').filter(function(){
						return nvl($(this).val()) != '' ? true : false;
					});
					// 해당 답변의 서브이미지와 대표이미지 있는지 여부 확인
					if(and_sub_img.length > 0){
						/*if(nvl($('[name=B_ge_attImgFileInfo_' + ans_num + ']').eq(0).val()) == ''){
							alert(getNotiMsg('C_MV43'));
							img_submit_flag = false;
							return false;
						} updateVote.js와 동일하게 변경*/
					}
				}
			});
			
			var img_size_sum = 0;
			
			$("[id*='ge_attImgFileInfo'").each(function(){
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
									
					if($.trim($("#vote_password").val()).length != 4){
						alert(getNotiMsg('C_MV51'));
						$("#vote_password").focus();
						return false;
					}
					
					if($.trim($("#vote_password").val()) != $.trim($("#vote_password_confirm").val())){
						alert(getNotiMsg('C_MV52'));
						$("#vote_password_confirm").val("");
						$("#vote_password_confirm").focus();
						return false;
					}
				}else if(othbc_trget == "002"){
					if($.trim($("#targetSource").val()) == ""){
						alert(getNotiMsg('C_MV53'));
						return false;
					}
				}
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
		// 발제시에만 태그 체크
		if(k == "save" && $.trim($("[name='vote_tag_nm']").val()) == ""){
			alert(getNotiMsg('C_MV56'));
			$("[name='vote_tag_nm_in']").focus();
			return false;
		}
		
		$("#begin_dt").val($("#sch_st_date").val().replace(/-/g , "") + $("#st_hour").val() + $("#st_min").val());
		$("#end_dt").val($("#sch_ed_date").val().replace(/-/g , "") + $("#ed_hour").val() + $("#ed_min").val());
		
		//나이스 포함 통합인증일 경우, 비용발생으로 인한 최고관리자만 발제 가능
		if(othbc_trget == '009' && k == "save"){
			
			var checkResult = false;
			
			jQuery.ajax( {
				type : 'POST',
				dataType : 'json',
				url : '/common/checkAuthIdAjax.do',
				async : false,
				success : function(param) {
					if(param.resultStats.resultCode != 'ok'){
						alert(getNotiMsg('C_MV57').replace("%s", $.trim($('[name="othbc_trget"] option:selected').text())) );
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
			
			if(k != "save"){
				sbmtFlag = true;
			}else{
				if(confirm(getNotiMsg('C_MV58'))){
					sbmtFlag = true;
				}
			}
		
		if(sbmtFlag){
				var submitUrl = "/admin/eventVote/insertVoteAjax.do";
				var resultUrl = "/admin/eventVote/selectEventVoteMgt.do?event_seq="+$("#event_seq").val();	
				if($("#event_seq").val() == "none"){
					submitUrl = "/admin/vote/insertVoteAjax.do";
					resultUrl = "/admin/vote/selectPageListVoteMgt.do";	
				}
			
				$("#submitForm").attr("action", submitUrl);
				$("#submitForm").ajaxForm({
					beforeSubmit : function(){
						var loading = '<div class="overlay loadingbar"><i class="fa fa-refresh fa-spin"></i></div>';
						// 로딩바 추가
						$('.box-primary').append(loading);
					},
				    success : function(param) {
				    	if(param.resultStats.resultCode == "ok"){
				        	if((othbc_trget == "002" && $("#vote_sttus").val() == "004")){
								alert(getNotiMsg('C_MV61'));
							}else{
			        			alert(getNotiMsg('C_MV60'));	
			        		}
			        		document.location.href = resultUrl;
						}else{
							alert(param.resultStats.resultMsg);
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
	}

	$(function(){	
		fnSetAttr();
		
		// 최대투표수 활성화
		$("#A_ge_mxmm_choise").click(function(){
			// 최대투표수 설정할 경우
			if($('input:checkbox[name=A_ge_mxmm_choise]').prop('checked')){
				alert(getNotiMsg('C_MV12'));
			} 
			
			fnSetAttr();
		});
		
		// 최대투표수 활성화
		$("#B_ge_mxmm_choise").click(function(){
			// 최대투표수 설정할 경우
			if($('input:checkbox[name=B_ge_mxmm_choise]').prop('checked')){
				alert(getNotiMsg('C_MV12'));
			}
			
			fnSetAttr();
		});
	});

	
	// 답변관련 추가 정보 활성화
	function fnOpenAnswerDetail(section, tab, ansNo){
		var $section = $(section).parent().prev();
		
		var popup_sj = $section.find("input").eq(1);
		var popup_cn = $section.find("input").eq(2);
		var popup_url_at = $section.find("input").eq(3);
		
		$("#ge_popup_sj").val(popup_sj.val());
		$("#ge_popup_cn").val(popup_cn.val());
		$("[name=ge_popup_url_at]:radio[value='" + popup_url_at.val() +"']").prop("checked", true);
		
		$("#vote-answerdetail-pop").find("ul.img_reg_list > li").each(function(index){
			$(this).addClass("add");
			$(this).removeClass("reg");
			$(this).find("button.del_btn").attr({"id":"geImgDelete_" + ansNo + (index+1), "onclick":"fnGeImgDelete('" + tab +"', '" + ansNo + (index+1) + "'); return false;"}).hide();
			
			$(this).find("a").attr({"id":"geImgfileBtn_" + ansNo + (index+1), "onclick":"fnSeleteGeImgTrigger('" + tab +"', '" + ansNo + (index+1) + "'); return false;"});
			
			if($("#" + tab + "_ge_attImgFileInfo_" + ansNo + (index+1)).val() == '' || $("#" + tab + "_ge_attImgFileInfo_" + ansNo + (index+1)).val() == undefined){
				var htmlstr = "<span class=\"txt\">";
				htmlstr += index != 0 ? '이미지 추가' : '대표 이미지';
				htmlstr += "</span>";
				
				$(this).find("a").html(htmlstr);
			} else {
				var fileInfo = $("#" + tab + "_ge_attImgFileInfo_" + ansNo + (index+1)).val().split("|");
				//썸네일 변경
				var imgSrc = fileInfo[4] + fileInfo[2] + "." + fileInfo[1]; 
				$("#geImgfileBtn_" + ansNo + (index+1)).html("<img src='" + imgSrc + "' alt='대표 이미지'>");
				$(this).removeClass("add");
				$(this).addClass("reg");
				$("#geImgDelete_" + ansNo + (index+1)).show();
			}
			
		});
		
		var disabled1 = $("[name=ge_popup_url_at]:checked").val() == 'N' && $("#ge_popup_cn").prop("disabled"); 				// 팝업을 공유해서 쓰기 때문에 disabled 값을 컨트롤 하기 위해서 사용
		var disabled2 = $("[name=ge_popup_url_at]:checked").val() == 'Y' && !$("#ge_popup_cn").prop("disabled"); 				// 팝업을 공유해서 쓰기 때문에 disabled 값을 컨트롤 하기 위해서 사용
		
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
	function fnChangeQueType(tab, index, key){
		if(key == "001"){
			var layer = $("#queTypee001Temp").html();
			$("#" + tab + "_que_type_layer_"+index).html(layer);
			$("#" + tab + "_que_type_layer_"+index).addClass("type001");
			$("#" + tab + "_que_type_layer_"+index).removeClass("type002");

			fnSetQueAttr(tab, index - 1);
			
		}else if(key == "002"){
			var layer = $("#queTypee002Temp").html();
			$("#" + tab + "_que_type_layer_"+index).html(layer);
			$("#" + tab + "_que_type_layer_"+index).addClass("type002");
			$("#" + tab + "_que_type_layer_"+index).removeClass("type001");

			fnSetQueAttr(tab, index - 1);
		}
	}
	
	//질문 추가
	function fnAddQueType001(obj){
		var layer = $("#que001Temp").html();
		$(obj).parents(".ge_qestn_form").after(layer);
		$(obj).siblings(".btn.btn-foursquare").show();	//질문추가버튼
		
		
		fnSetAttr();
	}
	
	//질문 삭제
	function fnQueDelete(section){
		if(confirm(getNotiMsg('C_MV13')) == true) {
			$(section).parents(".ge_qestn_form").remove();
			
			fnSetAttr();
		}
	}
	
	//질문 복사
	function fnQueCopy(section){
		$(section).siblings(".btn.btn-foursquare").show();				//질문삭제버튼
		$(section).siblings(".btn.bg-purple2").show();					//질문추가버튼
		
		var box = $(section).parents(".tab-pane");
		
		var clone = $(section).parents(".ge_qestn_form").clone(true);
		
		$(section).parents(".ge_qestn_form").find("select").each(function (i) {
			var select = this;
			$(clone).find("select").eq(i).val($(select).val());
		});
		
		clone.appendTo(box);
		
		fnSetAttr();
	}
	
	//답변 추가
	function fnAddAns(tab, section, no){
		var layer = $("#addAnsBox").html();
		var cnt = $(section).parents('.form_tbl_ui').siblings('.form_tbl_ui_gr').find(".form_tbl_ui").length;
		
		// 기타가 있는 경우 기타 앞에 새 질문을 추가
		if($("[name='" + tab + "_ge_etc_yn_" + no + "_" + cnt +  "']").val() == 'Y') {
			$(section).parent().parent().prev().children('.form_tbl_ui').eq(cnt-2).after(layer);
		} else {
			$(section).parent().parent().prev().append(layer);
		}
		// 질문이 추가 되었음으로 cnt에 1을 더한다.
		fnChAnsCount(tab,no,cnt+1);
		// 분기투표시에 질문추가되는경우 질문선택지가 늘어나야함.
		fnSetAnsAttr(tab, no - 1);
	}
	
	//기타 추가
	function fnAddAns2(tab, section, no){
		var layer = $("#addAnsBox2").html();
		var cnt = $(section).parents('.form_tbl_ui').siblings('.form_tbl_ui_gr').find(".form_tbl_ui").length;
		
		
		$(section).parent().parent().prev().append(layer);
		
		// 질문이 추가 되었음으로 cnt에 1을 더한다.
		fnChAnsCount(tab,no,cnt+1);
		fnSetAnsAttr(tab, no - 1);
		
		$(section).attr("disabled", true);
	}
	
	//답변 삭제
	function fnAnsDelete(tab, section, no){
		var cnt = $(section).parents('.form_tbl_ui_gr').find(".form_tbl_ui").length - 1;
		fnChAnsCount(tab,no,cnt);
		if($(section).siblings("#" + tab + "_ge_etc_yn_" + no + "_" + (cnt + 1)).val() == "Y") {
			$(section).closest(".form_tbl_ui_box").find(".cell.arr_fl").find("button").eq(1).attr("disabled", false);
		}
		$(section).parent().parent().remove();
		fnSetAnsAttr(tab, no - 1);
	}
	
	//옵션의 답변 선택 갯수 변경
	function fnChAnsCount(tab,no,cnt) {
		//최대 선택(필수 선택) 갯수 변경
		var maxInnerHtml = "";
		var minInnerHtml = "";
		var max, min;
		
		// 현재선택한 개수 조회
		max = $("#" + tab+ "_ge_anse_mxmm_choise_co_"+no).val();
		min = $("#" + tab+ "_ge_anse_mumm_choise_co_"+no).val();
		
		for (var i = 0; i <= cnt; i++) {
			var min_sel = i == min ? 'selected="selected"' : '';
			var max_sel = i == max ? 'selected="selected"' : '';
			
			minInnerHtml += '<option value="'+i+'" ' + min_sel + '>'+i+'개</option>' ;
			if(i > 0) { maxInnerHtml += '<option value="'+i+'" ' + max_sel + '>'+i+'개</option>'; }
		}
		
		$("#" + tab+ "_ge_anse_mxmm_choise_co_"+no).html(maxInnerHtml);
		$("#" + tab+ "_ge_anse_mumm_choise_co_"+no).html(minInnerHtml);
	}
	
		// 답변 재설정
	// 파라미터 tab의 i+1번 질문의 답변만 초기화
	// 답변 개수는 꽤 많기 때문에 간단한 조건문으로 실행 속도 줄임 (뛰어난 최적화는 아니지만 어느정도 속도 개선함)
	function fnSetAnsAttr(tab, i) {
	
		var $vote_box = $("#tab" + tab + " .vote_box1").eq(i);
		var ansLen = $vote_box.find(".cell.inc_del").length;   
		var queCount = i+1;
		var ansCount = 0;
		
		for (var j = 0; j < ansLen; j++) {
			var $answer_box = $vote_box.find(".cell.inc_del").eq(j);
			
			ansCount = j+1;
			// 이미 초기화가 되어 있으면 다시 할 필요가 없다
			if($answer_box.find("input").eq(1).attr("id") == tab + "_ge_popup_sj_"+ queCount +"_"+ ansCount){
				continue;
			}
			
			$answer_box.find("input").eq(0).attr({"id" : tab + "_ge_answer_" + queCount + ansCount, "name" : tab + "_ge_answer_" + queCount });
			$answer_box.find("input").eq(1).attr({"id" : tab + "_ge_popup_sj_"+ queCount +"_"+ ansCount , "name" : tab + "_ge_popup_sj_"+ queCount +"_"+ ansCount});
			$answer_box.find("input").eq(2).attr({"id" : tab + "_ge_popup_cn_"+ queCount +"_"+ ansCount , "name" : tab + "_ge_popup_cn_"+ queCount +"_"+ ansCount});
			$answer_box.find("input").eq(3).attr({"id" : tab + "_ge_popup_url_at_"+ queCount +"_"+ ansCount , "name" : tab + "_ge_popup_url_at_"+ queCount +"_"+ ansCount});
			$answer_box.find("input").eq(4).attr({"id" : tab + "_ge_etc_yn_"+ queCount +"_"+ ansCount , "name" : tab + "_ge_etc_yn_"+ queCount +"_"+ ansCount});
			$answer_box.find("input").eq(0).addClass('ansInput');
			$answer_box.find(".del").eq(0).attr({ 'onclick' : 'fnAnsDelete("' + tab + '", this, ' + queCount + '); return false;' });
			
			if(ansLen < 3) {
				$answer_box.find(".del").eq(0).hide();
			} else {
				$answer_box.find(".del").eq(0).show();
			}
			
			for (var k = 0; k < 6; k++) {
				var imgCount = k + 1;
				$answer_box.find("input").eq(5+k).attr({"id" :  tab + "_ge_attImgFileInfo_"+ queCount +"_"+ ansCount +""+ imgCount +"" , "name" :  tab + "_ge_attImgFileInfo_"+ queCount +"_"+ ansCount +""});
			}
			
			$answer_box.next().find("button").attr({"onclick" : "fnOpenAnswerDetail(this,'" + tab + "','" + queCount + "_" + ansCount +"');"});
		}
		
		//투표권 설정 시 셀렉트 옵션 갯수 생성
		fnSetOptionHtml(tab);
		

		//답변수 저장
		$("#" + tab + "_ge_answer_co_"+queCount).val(ansCount);
	}
	
	// 질문 재설정
	// 파라미터 tab의 i+1번 질문 초기화
	// 질문은 많이 생겨도 보통 10개 아래이기 때문에 아래 함수에는 특별히 최적화 코드를 넣지 않음 (2021 주민참여 예산도 8개였음)
	function fnSetQueAttr(tab, i) {
		var $vote_box = $("#tab" + tab + " .vote_box1").eq(i);
		var ansCount = 0;
		var queLen = $("#tab" + tab + " .vote_box1").length;
		var queCount = i+1;
		
		$("#tab" + tab + " .ge_qestn_form").eq(i).find("h2.nvote_sub_tit").text("질문 " + (i+1));
		if(i > 0) {
			$("#tab" + tab + " .ge_qestn_form").eq(i).find("h2.nvote_sub_tit").addClass("nvote_sub_tit_no");			// 질문 위에 border 생기는 것
		} else {
			$("#tab" + tab + " .ge_qestn_form").eq(i).find("h2.nvote_sub_tit").removeClass("nvote_sub_tit_no");
		}
		$vote_box.attr({"id" : tab + "_que_type_layer_"+ queCount +""});
		// 질문
		$vote_box.find("input").eq(0).attr({"id" : tab + "_ge_qestn_sj_"+ queCount +"" , "name" : tab + "_ge_qestn_sj_"+ queCount +""});
		$vote_box.find("input").eq(0).addClass("queInput");
		$vote_box.find("select").eq(0).attr({"id" : tab + "_ge_qestn_se_"+ queCount +"" , "name" : tab + "_ge_qestn_se_"+ queCount +"" , "onchange" : "fnChangeQueType('" + tab + "', '"+ queCount +"', this.value); return false;"});
		$vote_box.find(".lbl_slt_set").eq(0).find("select").eq(0).attr({"id" : tab + "_ge_answer_random_yn_"+ queCount +"" , "name" : tab + "_ge_answer_random_yn_"+ queCount +""});
		$vote_box.find(".lbl_slt_set").eq(0).find("input").eq(0).attr({"id" : tab + "_ge_answer_co_"+ queCount +"" , "name" : tab + "_ge_answer_co_"+ queCount +""});

		// 최대, 최소 네이밍 설정
		$vote_box.find(".lbl_slt_set").eq(1).find("label").attr({"for" : tab + "_ge_anse_mumm_choise_co_"+ queCount +""});
		$vote_box.find(".lbl_slt_set").eq(1).find("select").attr({"id" : tab + "_ge_anse_mumm_choise_co_"+ queCount +"" , "name" : tab + "_ge_anse_mumm_choise_co_"+ queCount +""});
		$vote_box.find(".lbl_slt_set").eq(2).find("label").attr({"for" : tab + "_ge_anse_mxmm_choise_co_"+ queCount +""});
		$vote_box.find(".lbl_slt_set").eq(2).find("select").attr({"id" : tab + "_ge_anse_mxmm_choise_co_"+ queCount +"" , "name" : tab + "_ge_anse_mxmm_choise_co_"+ queCount +""});
		
		if($('input:checkbox[name=' + tab + '_ge_mxmm_choise]').prop('checked')){
			$('#' + tab + '_ge_mxmm_choise_co').prop('disabled', false);
			// 답변 당 최소 선택 개수 0으로 고정하고 disabled
			$("[id^='" + tab + "_ge_anse_mumm_choise_co_']").val(0).prop('disabled', true);
		} else {
			$('#ge_mxmm_choise_co').prop('disabled', true);
			$("[id^='" + tab + "ge_anse_mumm_choise_co_']").val(1).prop('disabled', false);
		}
		
		$vote_box.find(".form_tbl_ui.qa > .cell").find(".btn.btn-default").eq(0).attr({"onclick" : "fnAddAns('" + tab + "', this,"+ queCount +"); return false;"});
		$vote_box.find(".form_tbl_ui.qa > .cell").find(".btn.btn-default").eq(1).attr({"onclick" : "fnAddAns2('" + tab + "', this,"+ queCount +"); return false;"});
		
		// 답변 속성 설정
		fnSetAnsAttr(tab, i);
		
		// 맨 마지막 질문에만 질문 추가 버튼을 보여준다.
		if(queCount != queLen){
			$vote_box.find(".cell.ta_l > .btn").eq(0).hide();
		} else {
			$vote_box.find(".cell.ta_l > .btn").eq(0).show();
		}
		
		// 질문이 2개 이상인 경우 총투표수 설정을 셋팅할수 있게끔 설정
		if(queLen < 2){
			$('#' + tab + '_ge_mxmm_choise').prop('disabled', true);
			// 맨 첫번째 질문은 질문 삭제 버튼을 없앤다.
			$vote_box.find(".cell.ta_l > .btn").eq(2).hide();
		} else {
			$('#' + tab + '_ge_mxmm_choise').prop('disabled', false);
		}
		
		// 총투표수 설정을 하지 않았거나 질문수가 하나 인경우 총 투표수 설정을 막는다.
		if(!$('#' + tab + '_ge_mxmm_choise').prop('checked') || queLen < 2){
			$('#' + tab + '_ge_mxmm_choise_co').prop('disabled', true);
		} else {
			$('#' + tab + '_ge_mxmm_choise_co').prop('disabled', false);
		}
		
		ansCount = $vote_box.find(".cell.inc_del").length;
		
		// 답변 최소 선택 수 설정
		fnChAnsCount(tab, queCount, ansCount);
	}
	
	// name. id 등 재설정
	function fnSetAttr(){
		var queLenA = $("#tabA .vote_box1").length;
		var queLenB = $("#tabB .vote_box1").length;

		// A 질문 영역 (내부에 답변도 함께) 초기화
		for (var i = 0; i < queLenA; i++) {
			fnSetQueAttr("A", i);
		}
		
		// B 질문 영역 (내부에 답변도 함께) 초기화
		for (var i = 0; i < queLenB; i++) {
			fnSetQueAttr("B", i);
		}
		
		// A 질문 개수 셋팅
		$('#A_qestn_co').val(queLenA);
		
		// B 질문 개수 셋팅
		$('#B_qestn_co').val(queLenB);
	}
	
	/* 첨부파일 선택시 */
    var mutex = true;
    
    /* 이미지 클릭 트리거*/
	function fnSeleteGeImgTrigger(tab, idx) {
		if($("#geImgfileBtn_" + idx).hasClass("preventReg")) {
			alert(getNotiMsg('C_MV15'));
			return;
		}
		
		//alert("이미지트리거 실행!!   tab : "+ tab + " idx  : " + idx +" mutex : " + mutex);
		//뮤텍스가 false일경우 리턴
		if(!mutex) {
			//alert("이미지 처리중입니다. 잠시만 기다려 주세요.");
			return;
		}
		//뮤텍스 false로 변경하여 mutex값이 변경되지 전엔 호출 금지
    	$('#temp_geImgFile').trigger('click');
    	$('#temp_geImgFile').data('tab', tab);
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
				
				// 해당 투표 탭 정보 가져오기
				var tab = $('#temp_geImgFile').data('tab');
				
				// 투표 A, B 관련
				if(tab != ''){
					$("#" + tab + "_geImgfileBtn_"+idx).attr("src", imgSrc);
					$("#temp_geImgFile").val("");
					$("#" + tab + "_geImgDelete_"+idx).removeClass("btn_img_delete");
				}
				// 공통
				else {
					$("#geImgfileBtn_"+idx).attr("src", imgSrc);
					$("#temp_geImgFile").val("");
					$("#geImgDelete_"+idx).removeClass("btn_img_delete");
				}
				
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
					// 해당 투표 탭 정보 가져오기
					var tab = $('#temp_geImgFile').data('tab');
					
					// 투표 A, B 관련
					if(tab != ''){
						$("#" + tab + "_ge_attImgFileInfo_"+idx).val(resultStats.fileInfo);
						$("#geImgfileBtn_"+idx).html("<img src='" + imgSrc + "' alt='대표 이미지'>");
						$("#geImgfileBtn_"+idx).parent().removeClass("add");
						$("#geImgfileBtn_"+idx).parent().addClass("reg");
						$("#geImgDelete_"+idx).show();
						$("#temp_geImgFile").val("");
						$("#temp_geImgFile_idx").val("");
					}
					// 공통
					else {
						$("#ge_attImgFileInfo_"+idx).val(resultStats.fileInfo);
						$("#geImgfileBtn_"+idx).html("<img src='" + imgSrc + "' alt='대표 이미지'>");
						$("#geImgfileBtn_"+idx).parent().removeClass("add");
						$("#geImgfileBtn_"+idx).parent().addClass("reg");
						$("#geImgDelete_"+idx).show();
						$("#temp_geImgFile").val("");
						$("#temp_geImgFile_idx").val("");
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
	function fnGeImgDelete(tab, idx) {
		if(delAnswerImg || confirm(getNotiMsg('C_MV07'))){
			$("#temp_geImgFile").val("");
			$("#temp_geImgFile_idx").val("");
			
			// 투표 A, B 관련
			if(tab != ''){
				if($("#geImgfileBtn_"+idx).parent().hasClass("top")) {
					$("#geImgfileBtn_"+idx).html("<span class=\"txt\">대표 이미지</span>");
				} else {
					$("#geImgfileBtn_"+idx).html("<span class=\"txt\">이미지 추가</span>");
				}
				$("#geImgfileBtn_"+idx).parent().addClass("add");
				$("#geImgfileBtn_"+idx).parent().removeClass("reg");
				$("#geImgDelete_"+idx).hide();
				$("#" + tab + "_ge_attImgFileInfo_"+idx).val("");
			}
			// 공통
			else {
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
	}
	

	
	function fnTagAdd(){
		var taghtml = "";
		var vote_tag_nm_in = $.trim($("[name='vote_tag_nm_in']").val());
		//var ran = randomSuMuja();
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
	function fnSetOptionHtml(tab) {
		var ge_mxmm_choise_co = $("#" + tab + "_ge_mxmm_choise_co option:selected").val();
		
		var selectOptionHtml = '';
		
		//객관식 질문만 선택
		var que001Count = 0;
		
		$("[id^='" + tab + "_ge_anse_mxmm_choise_co']").each(function(index, item) { que001Count += parseInt($(item).val(), 10) });
		
		for (var i = 1; i <= que001Count; i++) {
			selectOptionHtml += '<option value="'+i+'">'+i+'개</option>' ;
		}
		
		if(ge_mxmm_choise_co == undefined || ge_mxmm_choise_co > que001Count) ge_mxmm_choise_co = 1;
		
		//최대선택 갯수 셀렉트 박스 생성
		$("#" + tab + "_ge_mxmm_choise_co").html(selectOptionHtml);
		$("#" + tab + "_ge_mxmm_choise_co").val("" + ge_mxmm_choise_co);
	}
	
	// 동일 태그명을 사용하였는지 확인
	function fnChkTagVal(new_tag){
		var chk = true;
		
		$("[name='vote_tag_nm']").each(function(){
			if($(this).val() == new_tag) chk = false;
		});
		
		return chk;
	}
	
		
	/*//옵션 버튼 활성화
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
	}   -> 새 디자인에서는 사용안함*/

	
	/*//이미지 버튼 활성화
	function fnOpenImg(section){
		var locat = section;
		if ($(".v_w_img_box").hasClass("on")) {
			if($(locat).parent().parent().find(".v_w_img_box").hasClass("on")){
				$(locat).parent().parent().find(".v_w_img_box").removeClass("on");
				$(locat).find("i").removeClass("fa-caret-up").addClass("fa-caret-down");
			}else{
				$(locat).parent().parent().find(".v_w_img_box").addClass("on");
				$(locat).find("i").removeClass("fa-caret-down").addClass("fa-caret-up");
			}
		} else {
			$(locat).parent().parent().find(".v_w_img_box").addClass("on");
			$(locat).find("i").removeClass("fa-caret-down").addClass("fa-caret-up");
		}
	}
	
	//답변팝업 버튼 활성화 (토글)
	function fnOpenAnsPop(section){
		var locat = section;
		if ($(".reply_box").hasClass("on")) {
			if($(locat).parent().parent().find(".reply_box").hasClass("on")){
				$(locat).parent().parent().find(".reply_box").removeClass("on");
			}else{
				$(locat).parent().parent().find(".reply_box").addClass("on");
			}
		} else {
			$(locat).parent().parent().find(".reply_box").addClass("on");
		}
	}   

	//답변 팝업 닫기 (확인 버튼)
	function fnCloseAnsPop(section){
		var locat = $(section).parent().parent();
		
		// 답변 문구 팝업 닫기
		$(locat).parent().parent().find(".reply_box").removeClass("on");
		
		// 답변 이미지 닫기
		$(locat).parent().parent().find(".v_w_img_box").removeClass("on");
		$(locat).parent().parent().find("i").removeClass("fa-caret-up").addClass("fa-caret-down");
	}-> 새로운 디자인에서는 사용 안함*/
	
	
	
	