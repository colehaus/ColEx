{ pkgs ? import <nixpkgs> {}, extras ? import ./extras.nix } :
  let
    nodeEnv = extras.callNode2nix {
      inherit pkgs;
      name = "webpackColEx";
      src = ./content/js/package.json;
      # TODO: Figure out a less hacky way to do this
      # (The root issue here is that node2nix has flattened the dependencies badly.)
      postBuild = ''
        sed --in-place s/sources.\"resolve-from-1.0.1\"/sources.\"resolve-from-3.0.0\"/ node-packages.nix
      '';
    };
  in
    pkgs.stdenv.mkDerivation rec {
      name = "webpackColEx";
      phases = [ "unpackPhase" "buildPhase" ];
      nativeBuildInputs = [
        pkgs.nodejs
        pkgs.flow
        nodeEnv.shell.nodeDependencies
      ];
      # We fetch via git rather than directly including the directory so we can reuse .gitignore
      src = (extras.fetchGitHashless { args = { inherit name; url = ./.; }; }) + "/content/js";
      nodeDependencies = nodeEnv.shell.nodeDependencies;
      NODE_ENV = "production";
      buildPhase = ''
        # Default `NODE_PATH` doesn't work with scoped packages
        for path in ''${NODE_PATH//:/ }; do
            if [[ "$path" = *"node-dependencies-ColEx"* ]]; then
                NODE_PATH="$path/@colehaus":$NODE_PATH
            fi
        done
        OUT_DIR="$out" webpack
      '';
    }
