var IBLANG = {
    "kr" : {
        "chart" : {
            "thousandsSep" : ",",
            "contextButtonTitle": "보조메뉴",
            "decimalPoint": ".",
            "downloadJPEG": "JPEG 이미지로 다운받기",
            "downloadPDF": "PDF 문서로 다운받기",
            "downloadPNG": "PNG 이미지로 다운받기",
            "downloadSVG": "SVG vector 이미지로 다운받기",
            "drillUpText": "{series.name}로 돌아가기",
            "invalidDate": "",
            "loading": "조회중...",
            "months": [ "1월" , "2월" , "3월" , "4월" , "5월" , "6월" , "7월" , "8월" , "9월" , "10월" , "11월" , "12월"],
            "noData": "표시할 데이터가 없습니다.",
            "numericSymbols": [ "k" , "M" , "G" , "T" , "P" , "E"],
            "printChart": "프린터로 출력",
            "resetZoom": "확대 초기화",
            "resetZoomTitle": "1:1 크기로 돌아가기",
            "shortMonths": [ "1" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "10" , "11" , "12"],
            "shortWeekdays": ["일", "월", "화", "수", "목", "금", "토"],
            "weekdays": ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
        },
        "alert" : {
            "createIBChartId" : "차트 id 값이 잘못되었습니다!",
            "chartProperties" : "속성(옵션) 값이 잘못되었습니다!",
            "chartNoData" : "데이터를 입력해주세요!",
            "chartData" : "데이터가 잘못되었습니다!",
            "chartNoLoad" : "${0} 차트가 로드 되지않았습니다!",
            "plugin" : "현재 객체의 플러그인을 확인 해주세요.",
            "pluginLoading" : "${0} 파일을 추가 해주세요.",
            "eventListenerType": "이벤트 종류를 확인해주세요.",
            "eventListenerFunc": "이벤트 함수를 확인해주세요.",
            "chartNoIndex" : "인덱스를 입력해주세요!",
            "chartIndex" : "인덱스가 잘못되었습니다!",
            "series" : "${0} 시리즈가 잘못 되었습니다!",
            "noSeries" : "${0} 시리즈가 없습니다!",
            "variableRequired" : "${0} 값은 필수 입니다.",
            "variableInteger" : "${0} 값은 정수여야 합니다.",
            "variableFloat" : "${0} 값은 실수여야 합니다.",
            "variableString" : "${0} 값은 문자열이어야 합니다.",
            "variableLessThen" : "${0}값은 ${1}값보다 작아야합니다.",
            "variableGreaterThen" : "${0}값은 ${1}값보다 커야합니다.",
            "variableEpual" : "${0}값은 ${1}값과 같아야합니다.",
            "noMessage" : "알림 메시지를 입력해주세요!"
        },
        "text" : {
            "productName" : "[IBChart]",
            "referenceSite" : "\n참고 사이트 : http://www.ibsheet.com/ibchart/",
            "legend" : "범례"
        }
    },
    "en" : {
        "chart" : {
            "thousandsSep" : ",",
            "contextButtonTitle": "Chart context menu",
            "decimalPoint": ".",
            "downloadJPEG": "Download JPEG image",
            "downloadPDF": "Download PDF document",
            "downloadPNG": "Download PNG image",
            "downloadSVG": "Download SVG vector image",
            "drillUpText": "Back to {series.name}",
            "invalidDate": "",
            "loading": "Loading...",
            "months": [ "January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"],
            "noData": "No data to display",
            "numericSymbols": [ "k" , "M" , "G" , "T" , "P" , "E"],
            "printChart": "Print chart",
            "resetZoom": "Reset zoom",
            "resetZoomTitle": "Reset zoom level 1:1",
            "shortMonths": [ "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"],
            "shortWeekdays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            "weekdays": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        },
        "alert" : {
            "createIBChartId" : "Chart id value is wrong!",
            "chartProperties" : "Properties(options) is wrong!",
            "chartNoData" : "Please enter data!",
            "chartData" : "Data is wrong!",
            "chartNoLoad" : "${0} chart not loaded!",
            "plugin" : "Please check the plugin of this object.",
            "pluginLoading" : "Please import ${0} file.",
            "eventListenerType": "Please check the event type.",
            "eventListenerFunc": "Please check the event function.",
            "chartNoIndex" : "Please enter index value!",
            "chartIndex" : "Index is wrong!",
            "series" : "${0} Series is worng!",
            "noSeries" : "No data series(${0})!",
            "variableRequired" : "${0} value is required.",
            "variableInteger" : "${0} value must be integer.",
            "variableFloat" : "${0} value must be float.",
            "variableString" : "${0} value must be string.",
            "variableLessThen" : "${0} value must be less than the ${1} value.",
            "variableGreaterThen" : "${0} value must be greater than the ${1} value.",
            "variableEpual" : "${0} value shall be equal to ${1} value.",
            "noMessage" : "Please enter alert message!"
        },
        "text" : {
            "productName" : "[IBChart]",
            "referenceSite" : "\nreference site : http://www.ibsheet.com/ibchart/",
            "legend" : "legend"
        }
    }
};

function createIBChart(cont, id, opt) {
    var obj = {};

    if(typeof opt !== "undefined" && typeof opt === "object") {
        obj = opt;
    }

    obj["cont"] = cont;
    obj["id"] = id;

    window[obj["id"]] = IBChart(obj);
}
