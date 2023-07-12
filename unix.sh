#!/bin/bash

wet_dist_url=$1
wet_dist_name=$2

rm -rf "./node_modules/gcwet" 2> /dev/null
rm -rf "$wet_dist_name.zip" 2> /dev/null

curl $wet_dist_url -LO
unzip "$wet_dist_name.zip"
mv $wet_dist_name ./node_modules/gcwet
rm -rf "$wet_dist_name.zip" 2> /dev/null
