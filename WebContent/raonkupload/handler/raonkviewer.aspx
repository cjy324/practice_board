<%@ Page Language="C#" %>
<%
    using (Com.Raonwiz.KUpload.RAONKHandler upload = new Com.Raonwiz.KUpload.RAONKHandler())
    {
        // SetDebugMode의 두번째 파라미터를 "L"로 설정시 주석해제 (기본적으로 배포되는 /raonkupload의 물리적 경로)
        //char cPathChar = System.IO.Path.DirectorySeparatorChar;
        //string strRootFolder = this.Context.Request.PhysicalPath;
        //strRootFolder = strRootFolder.Substring(0, this.Context.Request.PhysicalPath.LastIndexOf(cPathChar));
        //strRootFolder = strRootFolder.Substring(0, strRootFolder.LastIndexOf(cPathChar));

        //디버깅
        //Log Type 설명
        
        //- C : 일반로그 출력, 3번째 파라미터에 로그파일 경로 설정
        //RAONKParameterVo parameterVo = new RAONKParameterVo();
        //parameterVo.SetIsDebugMode(true);
        //parameterVo.SetLogType("C");
        //parameterVo.SetLogLevel("DEBUG");
        //parameterVo.SetLogFilePath(@"D:\log\");
        //upload.settingVo.SetDebugMode(parameterVo);
        
        //- L : 1. Log4Net 모듈에 의한 로그 출력, 3번째 파라미터에 Log4Net.xml파일의 경로 설정 (기본적으로 배포되는 /handler/.NET의 물리적 경로 설정)
        //      2. Web.config 에 Log4Net 설정이 되어있다면 SetDebugMode 함수의 3번째 파라미터에 null 설정 후
        //         /handler/.NET 폴더의 Log4Net.xml 파일 내용 중 "# K Upload Log" 항목을 Web.config에 적용
        //RAONKParameterVo parameterVo = new RAONKParameterVo();
        //parameterVo.SetIsDebugMode(true);
        //parameterVo.SetLogType("L");
        //parameterVo.SetLogConfigPath(System.IO.Path.Combine(strRootFolder, "handler" + cPathChar + ".NET" + cPathChar));
        //upload.settingVo.SetDebugMode(parameterVo);
        
        upload.Viewer(this.Context);
    }
%>