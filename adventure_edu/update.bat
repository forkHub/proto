del .\js\*.* /s /q
rd .\js\ /s /q
rd .\images\ /s /q
del .\*.html

md .\js
md .\images

xcopy ..\..\..\proto\moon\*.html .\ /s /i
xcopy ..\..\..\proto\moon\js\*.* .\js /s /i
xcopy ..\..\..\proto\moon\images\*.* .\images /s /i

pause
