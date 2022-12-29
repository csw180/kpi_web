ECHO OFF
IF NOT EXIST "boot.lgb" GOTO ERROR

attrib -a -s -r boot.ini
IF EXIST "boot.ini" del boot.ini
ren boot.lgb boot.ini

ECHO.
ECHO Yours boot screen is now reset to original.

GOTO END

:ERROR
ECHO.
ECHO Can not find the file "boot.lgb"
ECHO If you want to reset the boot screen
ECHO to original, go to system32 folder
ECHO and delete the files "kernel1.exe"
ECHO and/or "kernel2.exe"

:End
ECHO.
PAUSE
ECHO ON
