del .\css\*.* /s/q
del .\js\*.* /s/q
del .\template\*.* /s/q
del index.html

rd .\css\ /s /q
rd .\js\ /s /q
rd .\template /s /q

xcopy "D:\xampp3\htdocs\moon2\500 star\web\*.*" . /s /y
del test.html
del .\js\test.js
pause