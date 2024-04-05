#!/bin/bash

# COLORS
RED='\033[1;31m'
GREEN='\033[1;32m'
NC='\033[0m' # No Color

# MAKE SURE TO BE IN THEME DIR
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR/../"

# MAKE SURE LESSC DEPENDENCY IS INSTALLED
lessc --help &> /dev/null || {
  echo -e "${RED}[grama] Cannot build styles and scripts, missing lessc dependency! (for install instructions see on https://lesscss.org)${NC}"
  exit 1
}

# make sure target built folder exists
mkdir -p "assets/built"
mkdir -p "assets/built/pages"

# MERGE AND CONVERT GENERAL LESS STYLES TO CSS
find ./styles/general ./styles/modular ./styles/partials -type f -name "*.less" -exec cat {} \; > assets/built/styles.less
lessc assets/built/styles.less assets/built/styles.css
# CONVERT PAGES LESS STYLES TO CSS
for i in ./styles/*.less; do
  [ -f "$i" ] || break
  filename=$(basename "$i" | sed "s/\..*//")
  lessc "$i" "assets/built/pages/$filename.css"
done

# MERGE ALL JS LIBRARIES
cat ./scripts/lib/*.js > assets/built/libraries.js
# MERGE SCRIPTS FOR PARTIALS ELEMENTS
find ./scripts/modular ./scripts/partials -type f -name "*.js" -exec cat {} \; > assets/built/general.js

# ECHO RESULT
if [ $? -ne 0 ]; then
  echo -e "${RED}[grama] Error building styles and scripts!${NC}"
else
  echo -e "${GREEN}[grama] Successfully built styles and scripts!${NC}"
fi
