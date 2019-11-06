del .\css\*.* /s /q
del .\js\*.* /s /q
del *.html /s /q

rd .\css /s /q
rd .\js /s /q

md css
md js

xcopy ..\..\..\proto\soal_editor\web\*.* . /s /y

ren index2.html index.html