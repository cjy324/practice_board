(function(){try{var b={pluginName:"eqneditor"};G_KPlugin.eqneditor=b;b.onClickToolIcon=function(){RAONK_EDITOR.prototype.dialog.show(_k_editor._config.webPath.plugin,"eqneditor/editor_popup.html")};b.onDisableToolIcon=function(a){switch(a){case "":case "default":case "focusInCell":return!1;case "focusImage":if(KEDITORTOP.RAONKEDITOR.G_SELECTED_IMAGE_ELEMENT&&"eqneditor"==KEDITORTOP.RAONKEDITOR.G_SELECTED_IMAGE_ELEMENT.getAttribute("raon_plugin"))return!1;default:return["p_eqneditor"]}};b.onCreateContextMenu=
function(a){a.items="paste cut copy  select_all  p_eqneditor".split(" ");a.disabledItems=["paste"];a.height="300px";a.width="200px"};b.onDbClickImage=function(){RAONK_EDITOR.prototype.dialog.show(_k_editor._config.webPath.plugin,"eqneditor/editor_popup.html")}}catch(c){}})();