del module\*.* /s /q
del public\*.* /s /q
del view\*.* /s /q
del public\*.log
del *.log
del upload\*.* /s /q
del index2.html
del *.js
del *.json
del js\*.* /s /q
del css\*.* /s /q
del lib\*.* /s /q

rd public\admin /s /q
rd public /s /q
rd view /s /q
rd module /s /q
rd upload /s /q
rd js /s /q
rd css /s /q
rd lib /s /q

rem exit
