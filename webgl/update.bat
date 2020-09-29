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
del .\demo5\*.* /s /q
del .\demo6\*.* /s /q
del .\demo7\*.* /s /q

rd .\css\ /s /q
rd .\js\ /s /q
rd .\template /s /q
rd .\lib /s /q
rd .\gbr /s /q

xcopy "..\..\..\proto\webgl\demo01\web\*.*" .\demo01 /s /y
xcopy "..\..\..\proto\webgl\demo02_skala\web\*.*" .\demo02 /s /y
xcopy "..\..\..\proto\webgl\demo03_rotasi\web\*.*" .\demo03 /s /y
xcopy "..\..\..\proto\webgl\demo04_anim\web\*.*" .\demo04 /s /y
xcopy "..\..\..\proto\webgl\demo05_alpha\web\*.*" .\demo05 /s /y
xcopy "..\..\..\proto\webgl\demo06_tileset\web\*.*" .\demo06 /s /y
xcopy "..\..\..\proto\webgl\demo07_scroll\web\*.*" .\demo07 /s /y

pause