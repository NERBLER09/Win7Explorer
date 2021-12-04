#!/bin/bash

cd $PWD
electron-builder --linux

if [[ ! -d ./release/AppImage ]]
then 
    mkdir -p release/AppImage
fi

if [[ ! -d ./release/snap ]]
then 
    mkdir -p release/snap
fi

rm release/snap/*
rm release/AppImage/*

mv dist/*.snap release/snap/Win7Explorer.snap
mv dist/*.AppImage release/AppImage/Win7Explorer.AppImage

rm -rf dist
