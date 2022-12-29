
var isInitBtnEnable = true;
var isInstBtnEnable = true;
var isMofyBtnEnable = false;
var isDelBrnEnable  = false;
var isExcelBtnEnable= true;


/*Sheet 기본 설정 */
function LoadPage()
{
	createIBSheet2(  document.getElementById("sheetObj"),"mySheet", "100%", "800px");

  	mySheet.SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );

  	var info    = { Sort:1, ColMove:1, ColResize:1, HeaderCheck:1 };
  	var headers = [ { Text:"A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z", Align:"Center"} ];
  	mySheet.InitHeaders(headers, info);

  	var cols = [ {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
         		 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
			     {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },			
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },			
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" },
				 {Type:"Text",     Hidden:0,  MinWidth:50,   Align:"left",  ColMerge:1,   SaveName:"" }];
   
  	mySheet.InitColumns(cols);

	mySheet.SetCountPosition(1);
	
  	mySheet.SetEditable(0);
  	mySheet.SetVisible(1);
  	mySheet.SetAutoSumPosition(0);

  	newSetActionMenu(mySheet,"엑셀내려받기");
	doAction("기준년월");
}

/* Sheet 각종 처리 */
function doAction(sAction)
{

    switch(sAction)
    {
        case "고정필드설정":
        	mySheet.SetFrozenCol(mySheet.MouseCol());
        	ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,3);
        	break;
        case "고정필드해제":
        	mySheet.SetFrozenCol(0);
        	ufSetMergeCell(mySheet, mySheet.HeaderRows(), 0, 1,3);
        	break;
		case "엑셀내려받기":            // 엑셀내려받기
			 mySheet.Down2Excel();
             break;        

		case "엑셀올리기":              // 엑셀올리기
			mySheet.RemoveAll();
            mySheet.LoadExcel();
			break;      
    }
}
function call1020(){
  
}
