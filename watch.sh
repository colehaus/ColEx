#! /usr/bin/env nix-shell
#! nix-shell -i bash shell.nix

set -euxo pipefail

root=$(pwd)

ijsinstall
jupyter notebook --no-browser &

cd "${root}/hakyll"
stack install

cd "${root}/content/js"
rm -f dist/*

# Default `NODE_PATH` doesn't work with scoped packages
for path in ${NODE_PATH//:/ }; do
    if [[ "$path" = *"node-dependencies-ColEx"* ]]; then
        NODE_PATH="$path/@colehaus":$NODE_PATH
    fi
done

# Fixes race between hakyll and webpack
# NO_WATCH=no_watch webpack

cd "${root}/content"
"${root}/hakyll/.stack-bin/site" watch &

cd "${root}/content/js"
webpack &

cd "${root}/content/js/bibliometric"
bower install
pulp --watch browserify --to ../dist/bibliometric.js &

cd "${root}/content/js/value-of-information-calculator"
npm install
bower install
pulp --watch browserify --to ../dist/value-of-information-calculator.js &

cd "${root}/content/js/construct-vnm-utility-function"
bower install
npm install
pulp --watch browserify --to ../dist/construct-vnm-utility-function.js &

trap 'kill $(jobs -p)' EXIT
sleep infinity
