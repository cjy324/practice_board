function fileHandler_html4(b,h){if("upload"==KUPLOADTOP.G_CURRKUPLOADER._config.mode){var e=KUPLOADTOP.G_CURRKUPLOADER._config.maxTotalFileCount,a=!0,c=[],f={file:b,name:getFileName(h,!1),size:"",type:"",lastModifiedDate:""};c.push(f);var f=[],n=KUPLOADTOP.G_CURRKUPLOADER.frameWin.getTotalFileCount(),k=KUPLOADTOP.G_CURRKUPLOADER._config.disableAlertMessage.duplication,d=0,m=!1;"0"==KUPLOADTOP.G_CURRKUPLOADER._config.allowDuplicationFile&&(m=sameFileCheck(c[0]));if(m)"0"==k&&alert(c[0].name+" "+RAONKUpload_Lang.message_duplication_file);
else{var k=!1,m=KUPLOADTOP.G_CURRKUPLOADER._config.extension,r=m.extArr.length;if(0<r){var p=m.allowOrLimit;if("1"==p){for(var q=getExtension(c[0].name),t=0;t<r;t++)if(("***"==m.extArr[t]?"":m.extArr[t])==q){k=!0;break}k||f.push(""==q?'" "':q)}else for(q=getExtension(c[0].name),t=0;t<r;t++)if(("***"==m.extArr[t]?"":m.extArr[t])==q){k=!1;f.push(""==q?'" "':q);break}else k=!0}else k=!0;calcTotalSize();m=TOTALREALFILENUM;if(0!=e&&m+1>e){var g=RAONKUpload_Lang.message_limit_num,g=g.replace("{0}",e);alert(g);
return}if(k){var v=e="";document.getElementById("tab_"+KUPLOADTOP.G_CURRKUPLOADER.TagID)&&(v=document.getElementById("tab_"+KUPLOADTOP.G_CURRKUPLOADER.TagID).value);null==h&&(h="");(e=h)&&(e=KUPLOADTOP.RAONKUPLOAD.util.trim(e));if("undefined"==typeof e||null==e)e="undefined"==typeof filePathSplit[0]||null==filePathSplit[0]?"":filePathSplit[0].substring(0,filePathSplit[0].lastIndexOf(KUPLOADTOP.RAONKUPLOAD.UserAgent.osSeparator)+1)+c[0].name;if("1"==KUPLOADTOP.G_CURRKUPLOADER._config.useAddEvent)try{var l=
c[0].file,g={strName:c[0].name,nSize:c[0].size,nIndex:n+d,strPath:e,dropZoneId:"",objFile:l,isFolder:"1"==c[0].isFolder?!0:!1,strPreviewUrl:""},a="function"==typeof KUPLOADTOP.G_CURRKUPLOADER._config.event.beforeAddFile?KUPLOADTOP.G_CURRKUPLOADER._config.event.beforeAddFile(KUPLOADTOP.G_CURRKUPLOADER.ID,g):KUPLOADTOP.KUPLOADWIN.RAONKUPLOAD_BeforeAddFile(KUPLOADTOP.G_CURRKUPLOADER.ID,g);!1!==a&&(a=!0)}catch(w){}if(a){a=c[0].type;if(null==a||void 0==a||""==a)a="application/octet-stream";e={file:c[0].file,
guid:"",fileIdx:"",webPath:"",originName:c[0].name,fileSize:c[0].size,uploadName:"",uploadPath:"",logicalPath:"",status:"ready",fileExt:"",isDelete:"n",isWebFile:"n",localPath:e,customValue:"",responseCustomValue:"",headerEx:"",lastModifiedDate:c[0].lastModifiedDate,mimeType:a};RESULTFILELIST.push(e);e.isFolder="0";addFileList(e);if("1"==KUPLOADTOP.G_CURRKUPLOADER._config.useAfterAddEvent)try{calcTotalSize(),l=c[0].file,g={strName:c[0].name,nSize:c[0].size,nIndex:n+d,strPath:e.localPath,dropZoneId:"",
objFile:l,isFolder:"1"==c[0].isFolder?!0:!1,strPreviewUrl:""},"function"==typeof KUPLOADTOP.G_CURRKUPLOADER._config.event.afterAddFile?KUPLOADTOP.G_CURRKUPLOADER._config.event.afterAddFile(KUPLOADTOP.G_CURRKUPLOADER.ID,g):KUPLOADTOP.KUPLOADWIN.RAONKUPLOAD_AfterAddFile(KUPLOADTOP.G_CURRKUPLOADER.ID,g)}catch(x){}d++;c=document.getElementById("files_container");KUPLOADTOP.G_CURRKUPLOADER.TagID=KUPLOADTOP.RAONKUPLOAD.util.makeGuidTagName();l=document.createElement("form");l.setAttribute("id","form_"+
KUPLOADTOP.G_CURRKUPLOADER.TagID);l.setAttribute("method","post");l.setAttribute("enctype","multipart/form-data");l.setAttribute("encoding","multipart/form-data");g=document.createElement("span");g.className="input_image_add";g.innerHTML=RAONKUpload_Lang.btn_add;""!=KUPLOADTOP.G_CURRKUPLOADER._config.customHeaderColor&&(g.style.background=KUPLOADTOP.G_CURRKUPLOADER._config.customHeaderColor);""!=KUPLOADTOP.G_CURRKUPLOADER._config.customFooterColor&&(g.style.color=KUPLOADTOP.G_CURRKUPLOADER._config.customFooterColor);
var u=document.createElement("input");u.setAttribute("id","file_"+KUPLOADTOP.G_CURRKUPLOADER.TagID);u.setAttribute("name","file_"+KUPLOADTOP.G_CURRKUPLOADER.TagID);u.setAttribute("type","file");KUPLOADTOP.RAONKUPLOAD.util.addEvent(u,"change",function(){fileHandler_html4(u,u.value)});KUPLOADTOP.RAONKUPLOAD.util.addEvent(u,"blur",function(){focusHandler(u)});n=document.createElement("input");n.setAttribute("id","tab_"+KUPLOADTOP.G_CURRKUPLOADER.TagID);n.setAttribute("name","tab_"+KUPLOADTOP.G_CURRKUPLOADER.TagID);
n.setAttribute("type","hidden");n.setAttribute("value","0");l.appendChild(g);l.appendChild(u);l.appendChild(n);g=document.createElement("div");g.appendChild(l);c.appendChild(g);g.previousSibling&&(g.previousSibling.style.display="none",g.previousSibling.childNodes[0].childNodes[1].tabIndex="-1")}}}displayTotalSizeAndNum();c=f.length;if(0<c){g="";l=KUPLOADTOP.G_CURRKUPLOADER._config.extension.extArr;g=l.length;for(n=0;n<g;n++)"***"==l[n]&&(l[n]='" "');"1"==p?1<c?(g=RAONKUpload_Lang.message_not_allow_exts,
g=g.replace("{0}",c),g=g.replace("{1}",l)):(g=RAONKUpload_Lang.message_not_allow_ext,g=g.replace("{0}",l),g=g.replace("{1}",f[0])):1<c?(g=RAONKUpload_Lang.message_not_limit_exts,g=g.replace("{0}",c),g=g.replace("{1}",l)):(g=RAONKUpload_Lang.message_not_limit_ext,g=g.replace("{0}",l),g=g.replace("{1}",f[0]));alert(g)}"1"==KUPLOADTOP.G_CURRKUPLOADER._config.use_file_sort&&"1"==KUPLOADTOP.G_CURRKUPLOADER._config.auto_sort&&"1"!=KUPLOADTOP.G_CURRKUPLOADER._config.sort_field&&sortTotalFileList(KUPLOADTOP.G_CURRKUPLOADER._config.sort_field,
KUPLOADTOP.G_CURRKUPLOADER._config.sort_ascdesc);calcTotalSize();fileListSortIconReset();setFileListBorder();setTabOrder();setListvalue();setLargeFileAllList();1==v&&(document.getElementById("file_"+KUPLOADTOP.G_CURRKUPLOADER.TagID).focus(),document.getElementById("form_"+KUPLOADTOP.G_CURRKUPLOADER.TagID).childNodes[0].style.backgroundImage="url("+KUPLOADTOP.G_CURRKUPLOADER._config.webPath.image+"img_bt_line.png)",document.getElementById("form_"+KUPLOADTOP.G_CURRKUPLOADER.TagID).childNodes[0].style.backgroundRepeat=
"no-repeat",document.getElementById("form_"+KUPLOADTOP.G_CURRKUPLOADER.TagID).childNodes[0].style.backgroundPositionY="2px",document.getElementById("form_"+KUPLOADTOP.G_CURRKUPLOADER.TagID).childNodes[0].style.backgroundPositionX="1px",document.getElementById("tab_"+KUPLOADTOP.G_CURRKUPLOADER.TagID).value="1",G_FileHandlerControl=0);"thumbs"==KUPLOADTOP.G_CURRKUPLOADER._config.views&&thumbsViewWithCanvas();if("1"==KUPLOADTOP.G_CURRKUPLOADER._config.useAfterAddEndTimeEvent&&0<d)try{"function"==typeof KUPLOADTOP.G_CURRKUPLOADER._config.event.afterAddAllFile?
KUPLOADTOP.G_CURRKUPLOADER._config.event.afterAddAllFile(KUPLOADTOP.G_CURRKUPLOADER.ID):KUPLOADTOP.KUPLOADWIN.RAONKUPLOAD_AfterAddAllFile(KUPLOADTOP.G_CURRKUPLOADER.ID)}catch(y){}}}
function processUploadHtml4(){if(!KUPLOADTOP.G_CURRKUPLOADER._config.uploadCancel){var b=getDialogDocument();0==upload_complete_count&&(G_UploadStartTime=(new Date).getTime()/1E3);var h=document.getElementById("files_container").getElementsByTagName("form"),e=0;if("1"==KUPLOADTOP.G_CURRKUPLOADER._config.skipSentFile)for(var a=0;a<uploaders[upload_complete_count];a++)RESULTFILELIST[a].file&&"complete"==RESULTFILELIST[a].status&&e++;h=h[upload_complete_count+e];e=document.charset;document.charset="utf-8";
var c=upload_complete_count.toString();c==(uploaders.length-1).toString()&&(c+="z");RESULTFILELIST[uploaders[upload_complete_count]].guid=KUPLOADTOP.RAONKUPLOAD.util.makeGuid();var f=h.getElementsByTagName("input"),n=f[0],f=f[1];h.removeChild(f);for(var k=0,d=RESULTFILELIST.length,a=0;a<uploaders[upload_complete_count];a++)"n"==RESULTFILELIST[a].isDelete&&(k+=parseInt(RESULTFILELIST[a].fileSize,10));for(a=uploaders[upload_complete_count]+1;a<d;a++)"y"==RESULTFILELIST[a].isWebFile&&(k+=parseInt(RESULTFILELIST[a].fileSize,
10));d=""+("kc"+KUPLOADTOP.RAONKSolution.Agent.formfeed+"c02"+KUPLOADTOP.RAONKSolution.Agent.vertical);d+="k01"+KUPLOADTOP.RAONKSolution.Agent.formfeed+KUPLOADTOP.G_CURRKUPLOADER._config.security.encryptParam+KUPLOADTOP.RAONKSolution.Agent.vertical;d+="k12"+KUPLOADTOP.RAONKSolution.Agent.formfeed+RESULTFILELIST[uploaders[upload_complete_count]].guid+KUPLOADTOP.RAONKSolution.Agent.vertical;d+="k14"+KUPLOADTOP.RAONKSolution.Agent.formfeed+RESULTFILELIST[uploaders[upload_complete_count]].originName+
KUPLOADTOP.RAONKSolution.Agent.vertical;d+="k15"+KUPLOADTOP.RAONKSolution.Agent.formfeed+KUPLOADTOP.G_CURRKUPLOADER._config.fileNameRule+KUPLOADTOP.RAONKSolution.Agent.vertical;d+="k16"+KUPLOADTOP.RAONKSolution.Agent.formfeed+KUPLOADTOP.G_CURRKUPLOADER._config.fileNameRuleEx+KUPLOADTOP.RAONKSolution.Agent.vertical;d+="k17"+KUPLOADTOP.RAONKSolution.Agent.formfeed+KUPLOADTOP.G_CURRKUPLOADER._config.folderNameRule+KUPLOADTOP.RAONKSolution.Agent.vertical;d+="k20"+KUPLOADTOP.RAONKSolution.Agent.formfeed+
c+KUPLOADTOP.RAONKSolution.Agent.vertical;d+="k21"+KUPLOADTOP.RAONKSolution.Agent.formfeed+RESULTFILELIST[uploaders[upload_complete_count]].customValue+KUPLOADTOP.RAONKSolution.Agent.vertical;d+="k22"+KUPLOADTOP.RAONKSolution.Agent.formfeed+"1"+KUPLOADTOP.RAONKSolution.Agent.vertical;d+="k23"+KUPLOADTOP.RAONKSolution.Agent.formfeed+"1"+KUPLOADTOP.RAONKSolution.Agent.vertical;d+="k24"+KUPLOADTOP.RAONKSolution.Agent.formfeed+KUPLOADTOP.G_CURRKUPLOADER._config.allowedZeroFileSize+KUPLOADTOP.RAONKSolution.Agent.vertical;
"1"==KUPLOADTOP.G_CURRKUPLOADER._config.security.fileExtensionDetector&&(d+="k29"+KUPLOADTOP.RAONKSolution.Agent.formfeed+"1"+KUPLOADTOP.RAONKSolution.Agent.vertical);a=KUPLOADTOP.G_CURRKUPLOADER._config.maxOneFileSize;0!=a&&(d+="k40"+KUPLOADTOP.RAONKSolution.Agent.formfeed+a+KUPLOADTOP.RAONKSolution.Agent.vertical);a=KUPLOADTOP.G_CURRKUPLOADER._config.maxTotalFileSize;0!=a&&(d+="k41"+KUPLOADTOP.RAONKSolution.Agent.formfeed+a+KUPLOADTOP.RAONKSolution.Agent.vertical,d+="k42"+KUPLOADTOP.RAONKSolution.Agent.formfeed+
k+KUPLOADTOP.RAONKSolution.Agent.vertical);KUPLOADTOP.G_CURRKUPLOADER._config.cloudInfo.Use&&"2"==KUPLOADTOP.G_CURRKUPLOADER._config.cloudInfo.Use&&(d+="k46"+KUPLOADTOP.RAONKSolution.Agent.formfeed+KUPLOADTOP.G_CURRKUPLOADER._config.cloudInfo.Use+KUPLOADTOP.RAONKSolution.Agent.vertical);a=document.createElement("input");a.type="hidden";k=KUPLOADTOP.RAONKUPLOAD.util.makeEncryptParamFinal(d);a.name=k.name;a.value=k.value;h.insertBefore(a,n);c=G_FormData.length;k=[];for(d=0;d<c;d++){var m=G_FormData[d].form_value,
m="1"<=KUPLOADTOP.G_CURRKUPLOADER._config.security.encryptParam?KUPLOADTOP.RAONKUPLOAD.util.makeEncryptParamFinal(m).value:encodeURIComponent(m),r=document.createElement("input");r.type="hidden";r.name=G_FormData[d].form_name;r.value=m;h.insertBefore(r,n);k.push(r)}var p=document.createElement("div"),d=KUPLOADTOP.RAONKUPLOAD.util.getDefaultIframeSrc();p.innerHTML='<iframe name="uploadframe" id="uploadframe" style="display:none;" src="'+d+'"></iframe>';p.style.display="none";document.body.appendChild(p);
KUPLOADTOP.RAONKUPLOAD.util.addEvent(p.firstChild,"load",function(){p.firstChild.contentWindow.postMessage("check","*");if(0==KUPLOADTOP.G_CURRKUPLOADER._config.isCrossDomain){KUPLOADTOP.RAONKUPLOAD.util.removeEvent(window,"message",q);document.body.removeChild(p);var a=p.firstChild.contentWindow.document.body.innerHTML,a=KUPLOADTOP.RAONKUPLOAD.util.trim(a);uploadEnd_html4(a)}},!0);if(window.postMessage){var q=function(a){KUPLOADTOP.RAONKUPLOAD.util.removeEvent(window,"message",q);document.body.removeChild(p);
a=KUPLOADTOP.RAONKUPLOAD.util.trim(a.data);uploadEnd_html4(a)};KUPLOADTOP.RAONKUPLOAD.util.addEvent(window,"message",q)}h.setAttribute("target","uploadframe");h.setAttribute("action",KUPLOADTOP.G_CURRKUPLOADER._config.handlerUrl);b.getElementById("RAON_K_UP_current_upload_file_name").innerHTML=" "+RESULTFILELIST[uploaders[upload_complete_count]].originName;h.submit();document.charset=e;h.removeChild(a);for(a=c-1;0<=a;a--)h.removeChild(k[a]);h.insertBefore(f,n.nextSibling);uploadProgress_html4(upload_complete_count,
TOTALUPLOADNUM,50)}}
function uploadEnd_html4(b){var h=getDialogDocument(),e=function(a,b){var d=getUploadedFileListObj();try{if(d={strType:"upload",strCode:a,strMessage:b,arrUploadedFileList:d},"function"==typeof KUPLOADTOP.G_CURRKUPLOADER._config.event.onError)KUPLOADTOP.G_CURRKUPLOADER._config.event.onError(KUPLOADTOP.G_CURRKUPLOADER.ID,d);else"function"!==typeof KUPLOADTOP.KUPLOADWIN.RAONKUPLOAD_OnError&&alert("Error Code : "+d.strCode+"\nError Message : "+d.strMessage),KUPLOADTOP.KUPLOADWIN.RAONKUPLOAD_OnError(KUPLOADTOP.G_CURRKUPLOADER.ID,d)}catch(c){}if(1==
G_MultiTranferCheck)G_MultiTranferCheck=4;else try{"0"==KUPLOADTOP.G_CURRKUPLOADER._config.skipSentFile&&fileListReset()}catch(e){}clearInterval(G_IntervalObj);PREVIOUSUPLOADEDSIZE=0;h.getElementById("RAON_K_UP_upload_size").innerHTML="-";clearInterval(KUPLOADTOP.G_CURRKUPLOADER.processTimeInterval);KUPLOADTOP.G_CURRKUPLOADER.processTimeInterval=null;KUPLOADTOP.G_CURRKUPLOADER.processTime=0;0<getSessionKeepData(KUPLOADTOP.G_CURRKUPLOADER).length&&(KUPLOADTOP.G_CURRKUPLOADER._config.sessionKeep.requestFlag=
!1);displayCommonReady(!1,KUPLOADTOP.G_CURRKUPLOADER);closeSendDialog();KUPLOADTOP.G_CURRKUPLOADER.cancel()};b=KUPLOADTOP.RAONKUPLOAD.util.parseDataFromServer(b);if(0==b.indexOf("[OK]"))if(b=b.replace("[OK]",""),b=KUPLOADTOP.RAONKUPLOAD.util.makeDecryptReponseMessage(b),"C012|response data decrypt error"==b)b=b.split("|"),e(b[0],b[1]);else{e=b.split(KUPLOADTOP.RAONKSolution.Agent.formfeed);b=e[0];var a="",c="",f=b.indexOf("::");-1<f&&(a=b.substring(0,f),b=b.substring(f+2,b.length));f=b.indexOf(":");
-1<f&&(c=b.substring(0,f),b=b.substring(f+1,b.length));f="";f=b.length;"|"==b.substring(f-1,f)?(b=b.substring(0,f-1),f=getFileName(b,!1),b=b.substring(0,b.lastIndexOf("/"+f))):f=getFileName(b,!1);RESULTFILELIST[uploaders[upload_complete_count]].uploadName=f;RESULTFILELIST[uploaders[upload_complete_count]].uploadPath=b;RESULTFILELIST[uploaders[upload_complete_count]].fileSize=e[2];RESULTFILELIST[uploaders[upload_complete_count]].status="complete";RESULTFILELIST[uploaders[upload_complete_count]].logicalPath=
"";RESULTFILELIST[uploaders[upload_complete_count]].responseCustomValue=e[1];""!=c&&(RESULTFILELIST[uploaders[upload_complete_count]].originName=c);RESULTFILELIST[uploaders[upload_complete_count]].hashValue=a;KUPLOADTOP.G_CURRKUPLOADER.uploadedTaskId="";KUPLOADTOP.G_CURRKUPLOADER.uploadedSize=0;PREVIOUSUPLOADEDSIZE+=parseInt(e[2],10);clearInterval(G_IntervalObj);uploadProgressComplete_html4(KUPLOADTOP.RAONKUPLOAD.util.bytesToSize(e[2]));upload_complete_count++;if(KUPLOADTOP.G_CURRKUPLOADER._config.uploadCancel){if("1"==
KUPLOADTOP.G_CURRKUPLOADER._config.useUploadingCancelEvent){e={bAutoTransferFlag:!1,arrUploadedFileList:getUploadedFileListObj()};try{"function"==typeof KUPLOADTOP.G_CURRKUPLOADER._config.event.uploadingCancel?KUPLOADTOP.G_CURRKUPLOADER._config.event.uploadingCancel(KUPLOADTOP.G_CURRKUPLOADER.ID,e):KUPLOADTOP.KUPLOADWIN.RAONKUPLOAD_UploadingCancel(KUPLOADTOP.G_CURRKUPLOADER.ID,e)}catch(n){}}if(1==G_MultiTranferCheck)G_MultiTranferCheck=3;else try{"0"==KUPLOADTOP.G_CURRKUPLOADER._config.skipSentFile&&
fileListReset()}catch(k){}PREVIOUSUPLOADEDSIZE=0;h.getElementById("RAON_K_UP_upload_size").innerHTML="-";clearInterval(KUPLOADTOP.G_CURRKUPLOADER.processTimeInterval);KUPLOADTOP.G_CURRKUPLOADER.processTimeInterval=null;KUPLOADTOP.G_CURRKUPLOADER.processTime=0;0<getSessionKeepData(KUPLOADTOP.G_CURRKUPLOADER).length&&(KUPLOADTOP.G_CURRKUPLOADER._config.sessionKeep.requestFlag=!1);displayCommonReady(!1,KUPLOADTOP.G_CURRKUPLOADER);closeSendDialog();KUPLOADTOP.G_CURRKUPLOADER.cancel()}else upload_complete_count==
TOTALUPLOADNUM?(PREVIOUSUPLOADEDSIZE=0,h.getElementById("RAON_K_UP_upload_size").innerHTML="-",totalUploadComplete(),0<getSessionKeepData(KUPLOADTOP.G_CURRKUPLOADER).length&&(KUPLOADTOP.G_CURRKUPLOADER._config.sessionKeep.requestFlag=!1)):(e=uploaders.indexOf(uploaders[upload_complete_count]),adjustUploadFileListScroll(e,upload_complete_count,TOTALUPLOADNUM),processUploadHtml4())}else if(0==b.indexOf("[FAIL]")){b=b.replace("[FAIL]","");b=KUPLOADTOP.RAONKUPLOAD.util.makeDecryptReponseMessage(b);b=
KUPLOADTOP.RAONKUPLOAD.util.getCodeAndMessage(b);c=KUPLOADTOP.G_CURRKUPLOADER._config.maxOneFileSize;f=KUPLOADTOP.G_CURRKUPLOADER._config.maxTotalFileSize;a="";"020"==b.code?(a=RAONKUpload_Lang.message_limit_one_size,a=a.replace("{0}",KUPLOADTOP.RAONKUPLOAD.util.bytesToSize(c).toString)):a="021"==b.code?RAONKUpload_Lang.message_file_ext_detect_html4:"022"==b.code?RAONKUpload_Lang.file_maximum+" "+KUPLOADTOP.RAONKUPLOAD.util.bytesToSize(f).toString+RAONKUpload_Lang.message_limit_size:b.message;c=0;
if("020"==b.code||"021"==b.code||"022"==b.code){for(f=0;f<uploaders[upload_complete_count];f++)"y"==RESULTFILELIST[f].isDelete&&c++;var d=uploaders[upload_complete_count]-c;setSelectFile(d,0);d=KUPLOADTOP.G_CURRKUPLOADER._config.disableAlertMessage.disableDeleteConfirm;KUPLOADTOP.G_CURRKUPLOADER._config.disableAlertMessage.disableDeleteConfirm=1;KUPLOADTOP.RAONKUPLOAD.DeleteSelectedFile(KUPLOADTOP.G_CURRKUPLOADER.ID);KUPLOADTOP.G_CURRKUPLOADER._config.disableAlertMessage.disableDeleteConfirm=d}if("022"==
b.code)for(var m=RESULTFILELIST.length,f=uploaders[upload_complete_count];f<m;f++)"y"==RESULTFILELIST[f].isDelete?c++:"n"==RESULTFILELIST[f].isWebFile&&(d=f-c,setSelectFile(d,0),d=KUPLOADTOP.G_CURRKUPLOADER._config.disableAlertMessage.disableDeleteConfirm,KUPLOADTOP.G_CURRKUPLOADER._config.disableAlertMessage.disableDeleteConfirm=1,KUPLOADTOP.RAONKUPLOAD.DeleteSelectedFile(KUPLOADTOP.G_CURRKUPLOADER.ID),KUPLOADTOP.G_CURRKUPLOADER._config.disableAlertMessage.disableDeleteConfirm=d,f--,m--);e(b.code,
a)}}
function uploadProgress_html4(b,h,e){var a=getDialogDocument();adjustUploadFileListScroll(b-1,b,h);a.getElementById("RAON_K_UP_uploadFileProgress_"+uploaders[b]).style.width="0%";G_IntervalObj=setInterval(function(){c()},400);var c=function(){var c;c=0;if(a.getElementById("RAON_K_UP_uploadFileProgress_"+uploaders[b])){c=a.getElementById("RAON_K_UP_uploadFileProgress_"+uploaders[b]).style.width.split("%");c=Math.round(1*c[0]*e/100);c++;if(c==parseInt(3*e/5,10)+1)f("1");else if(c==parseInt(4*e/5,10)+
1)f("2");else if(c==parseInt(9*e/10,10)+1)f("3");else if(c==parseInt(24*e/25,10)+1){f("4");return}if(1==c)if(a.getElementById("RAON_K_UP_upload_count"))a.getElementById("RAON_K_UP_upload_count").innerHTML=b+1+"/"+h;else return;var k=parseInt(1/e*100*c,10);a.getElementById("RAON_K_UP_uploadFileProgress_"+uploaders[b])&&(a.getElementById("RAON_K_UP_uploadFileProgress_"+uploaders[b]).style.width=k+"%",a.getElementById("RAON_K_UP_current_upload_progress_bar")&&(a.getElementById("RAON_K_UP_current_upload_progress_bar").style.width=
k+"%"),c=parseInt(1*b/h*100,10)+parseInt(parseInt(1/e*100*c,10)/h,10),a.getElementById("RAON_K_UP_total_upload_percent")&&(a.getElementById("RAON_K_UP_total_upload_percent").innerHTML=c+"%",a.getElementById("RAON_K_UP_total_upload_progress_bar")&&(a.getElementById("RAON_K_UP_total_upload_progress_bar").style.width=c+"%",a.getElementById("RAON_K_UP_upload_size")&&0==PREVIOUSUPLOADEDSIZE&&(a.getElementById("RAON_K_UP_upload_size").innerHTML="-"))))}},f=function(a){"1"==a?(clearInterval(G_IntervalObj),
G_IntervalObj=setInterval(function(){c()},800)):"2"==a?(clearInterval(G_IntervalObj),G_IntervalObj=setInterval(function(){c()},1E3)):"3"==a?(clearInterval(G_IntervalObj),G_IntervalObj=setInterval(function(){c()},1200)):"4"==a&&clearInterval(G_IntervalObj)};null==KUPLOADTOP.G_CURRKUPLOADER.processTimeInterval&&(KUPLOADTOP.G_CURRKUPLOADER.processTimeInterval=setInterval(function(){a.getElementById("RAON_K_UP_process_time").innerHTML=viewTime(++KUPLOADTOP.G_CURRKUPLOADER.processTime)},1E3))}
function uploadProgressComplete_html4(b){var h=getDialogDocument(),e=uploaders[upload_complete_count];if(void 0!=e){var a=parseInt(1*(upload_complete_count+1)/TOTALUPLOADNUM*100,10);h.getElementById("RAON_K_UP_current_upload_progress_bar").style.width="100%";h.getElementById("RAON_K_UP_uploadFileProgress_"+e).style.width="100%";h.getElementById("RAON_K_UP_uploadFilePercent_"+e).style.color="";h.getElementById("RAON_K_UP_uploadFilePercent_"+e).innerHTML="100%";h.getElementById("RAON_K_UP_uploadFileSize_"+
e).innerHTML=b.toString;UPLOADIDX++;h.getElementById("RAON_K_UP_upload_count").innerHTML=upload_complete_count+1+"/"+TOTALUPLOADNUM;h.getElementById("RAON_K_UP_total_upload_percent").innerHTML=a+"%";h.getElementById("RAON_K_UP_total_upload_progress_bar").style.width=a+"%";h.getElementById("RAON_K_UP_upload_size").innerHTML=KUPLOADTOP.RAONKUPLOAD.util.bytesToSize(PREVIOUSUPLOADEDSIZE).toString;100==a&&(clearInterval(KUPLOADTOP.G_CURRKUPLOADER.processTimeInterval),KUPLOADTOP.G_CURRKUPLOADER.processTimeInterval=
null,KUPLOADTOP.G_CURRKUPLOADER.processTime=0)}};