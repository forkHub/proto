del .\css\*.* /s/q
del .\js\*.* /s/q
del .\template\*.* /s/q
del index.html
del .\lib\*.* /s /q
del .\gbr\*.* /s /q
del .\demo1\*.* /s /q
del .\demo2\*.* /s /q
del .\demo3\*.* /s /q
del .\demo4\*.* /s /q

rd .\css\ /s /q
rd .\js\ /s /q
rd .\template /s /q
rd .\lib /s /q
rd .\gbr /s /q

xcopy "D:\xampp3\htdocs\proto\webgl\demo01\web\*.*" .\demo1 /s /y
xcopy "D:\xampp3\htdocs\proto\webgl\demo02_skala\web\*.*" .\demo02 /s /y
xcopy "D:\xampp3\htdocs\proto\webgl\demo03_rotasi\web\*.*" .\demo03 /s /y
xcopy "D:\xampp3\htdocs\proto\webgl\demo04_anim\web\*.*" .\demo04 /s /y

pause