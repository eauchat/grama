#!/bin/bash

# make sure to be in theme dir
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR/../"

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
RED='\033[0;31m'
GREEN='\033[1;32m'
NC='\033[0m' # No Color
if [ $? -ne 0 ]; then
  echo -e "${RED}Error building styles and scripts!${NC}"
else
  echo -e "${GREEN}Successfully built styles and scripts!${NC}"
fi
