call ./bersih.bat

xcopy D:\xampp3\htdocs\proto\toko\client\web\*.* . /y /s

del public\*.log

pause