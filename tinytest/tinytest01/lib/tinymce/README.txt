This copy of the TinyMCE editor source code has been modified from the original.
The original version can be downloaded from https://www.tinymce.com/download/.
For more information contact Verint

The following modifications and bug fixes have been made :

KE-28220 : Hint text includes the language prefix
- tinymce/plugin/compat3x_kana

And Several JIRA for changes in tinymce/plugins/spellchecker/


List Of TinyMCE Patch :

1. KE-70766, KE-71082 : Fullscreen issue - mce-fullscreen class is removed from body html element when inserting image, video, special char that use pop-up window
Fullscreen issues has been raised at tinyMCE community : https://github.com/tinymce/tinymce/issues/3135, https://github.com/tinymce/tinymce/issues/3289
Patched from tinymce source code & these must be checked and should be removed when upgrading.
- tinymce/tinymce.js
- tinymce/tinymce.min.js