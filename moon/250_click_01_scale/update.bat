del .\css\*.* /s/q
del .\js\*.* /s/q
del .\template\*.* /s/q
del index.html

rd .\css\ /s /q
rd .\js\ /s /q
rd .\template /s /q

xcopy "D:\xampp3\htdocs\moon2\250 click 01 - scale\web\*.*" . /s /y
pause