del .\css\*.* /s /q
del .\data\*.* /s /q
del .\imgs\*.* /s /q
del .\js\*.* /s /q
del index.html

md css
md data
md imgs
md js

xcopy ..\..\..\proto\soal\web\*.* . /s /q

ren game2.html index.html