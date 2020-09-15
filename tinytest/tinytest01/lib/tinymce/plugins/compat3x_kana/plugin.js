/*
KE-28220 Hint text includes the language prefix
compat3x plugin sets title to language.title for example en.Table. This corrects the issue by properly setting tooltip instead.
*/
tinymce.PluginManager.add('compat3x_kana', function(editor, url) {
    var originalAddButton = editor.addButton;
	editor.addButton = function(name, settings) {
		if((settings.title && settings.title.length > 0) && (!settings.tooltip || settings.tooltip.length == 0)){
			settings.tooltip = settings.title;
		}		
		return originalAddButton.call(this, name, settings);
	};
});