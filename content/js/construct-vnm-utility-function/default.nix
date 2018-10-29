{ extras ? import ../../../nix/extras.nix // import ../../../nix/gitignore.nix { inherit (import <nixpkgs> {}) lib; } } :
  extras.callPurescript2nix {
    pkgs = extras.pinnedPkgs { specFile = ./nixpkgs.json; opts = {}; };
    name = "construct-vnm-utility-function";
    src = extras.gitignoreSource ./.;
    executable = true;
    npm = true;
  }
