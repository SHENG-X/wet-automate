@echo off
SET wet_dist_url=%1
SET wet_dist_name=%2

rd /q /s "./node_modules/gcwet" 2>nul
del /q /s "%wet_dist_name%.zip" 2>nul

curl %wet_dist_url% -LO

tar -xvf "%wet_dist_name%.zip" -C "./node_modules"
move "./node_modules/%wet_dist_name%" "./node_modules/gcwet"
del /q /s "%wet_dist_name%.zip" 2>nul
