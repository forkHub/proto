del .\css\*.* /s/q
del .\js\*.* /s/q
del .\template\*.* /s/q
del .\imgs\*.* /s/q
del index.html

rd .\css\ /s /q
rd .\js\ /s /q
rd .\template /s /q
rd .\imgs /s /q

xcopy "D:\xampp3\htdocs\moon2\550 refaktor\web\*.*" . /s /y
del test.html
del .\js\test.js
del debug.log
pause