#!/bin/bash

FILES=$(git diff --name-only $BEFORE..$AFTER | grep "sources/.*\.xml")

convert() {
  echo "Converting $1"
  DIR=$(basename "$1" | sed 's/\.xml//' | tr "[:upper:]" "[:lower:]")
  if [ ! -d "editionscs/$DIR" ]; then
    mkdir "editions/$DIR"
  fi
  echo "Output to editions/$DIR/index.md"
  saxon -s:"$1" -xsl:xslt/publish.xsl -o:"docs/$DIR/index.md"
}

for f in $FILES
do
  echo "Processing file $f"
  convert "$f"
done  