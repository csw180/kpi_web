   <!--script>displayAI();</script//-->
  </td>
 </tr>
</table>
</form>

<form id="frm_optLayer" name="frm_optLayer">
	<div id="pwExcelmodalOpt" class="modalOpt" style="display:none;">
		<!-- modalOpt content -->
		<div class="modalOpt-content">
			<div class="closeOpt">&times;</div>
			<div class="modalOpt-tit">엑/셀/전/환/옵/션</div>
			<div class="modalOpt-info">
				<li>
					<input type="radio" name="exceltype" value="1" checked> 스피드&nbsp;&nbsp;
	            	<input type="radio" name="exceltype" value="2"> 일반
	            	<input type="hidden" id="hdnExcelOpt" name="hdnExcelOpt" value="" />
				</li>
				<li>
					일반 선택시는 셀병합으로 인하여 <br/> 전환 속도가 늦습니다.
				</li>
			</div>
			<div class="modalOpt-btn">  
	            <img src="/kpi/img/sky/butt_choice.gif" width="64" height="19" border="0" style="cursor:pointer;" id="selectOpt" />
				<img src="/kpi/img/sky/butt_close.gif"  width="64" height="19" border="0" style="cursor:pointer;" id="closeBtnOpt" />
			</div>	
		</div>
	</div>
</form>

<form id="frm_pwLayer" name="frm_pwLayer">
	<input type="text" style="display:none"/>
	<div id="pwExcelModal" class="modal" style="display:none;">
		<!-- Modal content -->
		<div class="modal-content">
			<div class="close">&times;</div>
			<div class="modal-tit">엑셀 비밀번호 입력</div>
			<div class="modal-pw">
				<input type="password" class="input_l" name="iLayer_excelPW" size="20" value="" autocomplete="off" onKeyUp="doEnterClick1()" />
			</div>
			<div class="modal-btn">  
	            <img src="/kpi/img/sky/butt_choice.gif" width="64" height="19" border="0" style="cursor:pointer;" id="inputPw" />
				<img src="/kpi/img/sky/butt_close.gif"  width="64" height="19" border="0" style="cursor:pointer;" id="closeBtn" />
			</div>	
		</div>
	</div>
</form>

<script>
var modal 	= document.getElementById("pwExcelModal");
var inputPw = document.getElementById("inputPw");
var closeBtn = document.getElementById("closeBtn");
var span 		= document.getElementsByClassName("close")[0];

var modalOpt 	= document.getElementById("pwExcelmodalOpt");
var selectOpt = document.getElementById("selectOpt");
var closeBtnOpt = document.getElementById("closeBtnOpt");
var spanOpt 		= document.getElementsByClassName("closeOpt")[0];

span.onclick = function() {
	modal.style.display = "none";
}

spanOpt.onclick = function() {
	stepFlag = 1;
	tmpRtnVal = "";
	modalOpt.style.display = "none";
}

inputPw.onclick = function() {
	on_PWinput("btn");
	return false;
}

selectOpt.onclick = function() {
	on_optSelect();
	return;
}

closeBtn.onclick = function() {
	modal.style.display = "none";
	document.frm_pwLayer.iLayer_excelPW.value="";	// 초기화
	return false;
}

closeBtnOpt.onclick = function() {
	stepFlag = 1;
	tmpRtnVal = "";
	
	modalOpt.style.display = "none";
	document.frm_optLayer.hdnExcelOpt.value = "";	//초기화
	return false;
}

function on_optSelect()
{
    for(i=0;i<document.frm_optLayer.exceltype.length;i++){
		if(document.frm_optLayer.exceltype[i].checked==true){
    		document.frm_optLayer.hdnExcelOpt.value = document.frm_optLayer.exceltype[i].value;
        	break;
		}
	}

	if (document.frm_optLayer.hdnExcelOpt.value != "")
	{
		modalOpt.style.display = "none";
		doAction("엑셀내려받기");
	}
}

function on_PWinput(caller)
{
	if (document.frm_pwLayer.iLayer_excelPW.value === "") 
	{
		alert('비밀번호 를 입력 하십시오.\n엑셀 다운로드를 다시 진행해주세요.');
		document.frm_pwLayer.iLayer_excelPW.focus();
		return false;
	}
	
	if(!fnValidChk(document.frm_pwLayer.iLayer_excelPW.value))
	{
		document.frm_pwLayer.iLayer_excelPW.value="";
		return false;
	} 
	else 
	{
		if(caller == "enter")
			return true;
		else 
			extDoAction();
	}
}  

window.onclick = function(e) {
	/*
	if (e.target == modal) {
		modal.style.display = "none";
		document.frm_pwLayer.iLayer_excelPW.value="";	// 초기화
	}
	*/
}	

function extDoAction() {
	stepFlag = 2;
	tmpRtnVal = document.frm_pwLayer.iLayer_excelPW.value;
	
	doAction("엑셀내려받기");
	
	document.frm_pwLayer.iLayer_excelPW.value="";	// 초기화
	modal.style.display = "none";
}

var stepFlag = 1;
var tmpRtnVal = "";

function doEnterClick1() {
    if(window.event.srcElement.type != "button") {
		var ieKey = window.event.keyCode;
        if (ieKey == 13 ) {
        	window.event.preventDefault();
			if(on_PWinput("enter")) {
				extDoAction();
			}
			return false;
        }
    }
}
</script>

<style type="text/css">
	
	.modal {
		display: none;
		position: fixed;
		z-index : 1;
		left : 0;
		top : 0;
		width : 100%;
		height: 100%;
		overflow : auto;
		background-coolor : rgb(0,0,0);
		background-color : rgba(0,0,0,0.4); 		/*Black w/ opacity */
	}
	
	.modalOpt {
		display: none;
		position: fixed;
		z-index : 1;
		left : 0;
		top : 0;
		width : 100%;
		height: 100%;
		overflow : auto;
		background-coolor : rgb(0,0,0);
		background-color : rgba(0,0,0,0.4); 		/*Black w/ opacity */
	}
	
	/* Modal, modalOpt Content box */
	.modal-content {
		background-color : #fefefe;
		margin : 5% auto;
		padding : 5px;
		border: 1px  solid #000;
		width : 250px;
		height: 150px;
	}
	.modalOpt-content {
		background-color : #fefefe;
		margin : 5% auto;
		padding : 5px;
		border: 1px  solid #000;
		width : 250px;
		height: 200px;
		
		font-size : 12px;
	    font-weight : bold;
	    color : #000;
	    padding:5px;
	}
	
	.modal-content > div.close {
		color : #aaa;
		font-size : 20px;
		font-weight: bold;
		height:20px;
		width:100%;
		text-align:right;
	}
	
	.modalOpt-content > div.closeOpt {
		color : #aaa;
		font-size : 20px;
		font-weight: bold;
		height:20px;
		width:100%;
		text-align:right;
	}
	
	.modal-content > div.close:hover,focus {
		color: black;
		text-decoration : none;
		cursor : pointer;
	}
	
	 .modalOpt-content > div.closeOpt:hover,focus {
		color: black;
		text-decoration : none;
		cursor : pointer;
	}
	
	div.modal-tit {
		margin-top:20px;
		font-family:나눔고딕;
		font-size:14px;
		font-weight:bold;
		color:#fff;
		height:30px;
		padding-left:5px;
		padding-top:5px;
		background-image: url('/kpi/img/top_ci.gif');  
	}
	
	div.modalOpt-tit {
		margin-top:3px;
		font-family:나눔고딕;
		font-size:14px;
		font-weight:bold;
		color:#fff;
		height:30px;
		padding-left:5px;
		padding-top:5px;
		background-image: url('/kpi/img/top_ci.gif');  
	}
	
	div.modal-pw {
		border:1px solid #888;
		margin-top:10px;
		text-align:center;
		padding:5px 0;
		background-color: rgba(192,202,220);
	}
	
	div.modal-info {
		border:1px solid #888;
		margin-top:10px;
		text-align:center;
		padding:5px 0;
		background-color: rgba(192,202,220);
	}
	div.modalOpt-info {
		border:1px solid #888;
		margin-top:10px;
		text-align:center;
		padding:5px 0;
		background-color: rgba(192,202,220);
	}
	div.modalOpt-info li {
		list-style : none;
	}
	
	div.modal-btn {
		margin-top:10px;
		text-align:center;
	}
	
	div.modalOpt-btn {
		margin-top:10px;
		text-align:center;
	}


</style>

</body>
</html>
