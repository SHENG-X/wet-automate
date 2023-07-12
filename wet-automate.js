const os = require('os');
const fs = require('fs');
const { exec } = require('node:child_process');
const pkgJson = require('./package.json');
const wetVersion = pkgJson['wet-version'];
const projName = pkgJson['name'];

if (!!!wetVersion) {
  throw new Error("wet-version property required in package.json");
}

const WET_DIST_URL = `https://github.com/wet-boew/GCWeb/releases/download/v${wetVersion}/themes-dist-${wetVersion}-gcweb.zip`;

if (os.type() === 'Windows_NT') {
// handle window os logic
}

// handle unix/linux os logic
exec(`./unix.sh ${WET_DIST_URL} themes-dist-${wetVersion}-gcweb`, (error, stdout, stderr) => {
  if (error) {
    throw new Error(`exec error: ${error}`);
  }
})

// read angular.json
const angularJson = require("./angular.json")

const buildAssets = angularJson.projects[projName].architect.build.options.assets;

let insWetBoew = true;
let insGCWeb = true;

for(let asset of buildAssets) {
  if (typeof(asset) === 'object') {
    if (asset?.input === './node_modules/gcwet/wet-boew/') {
      insWetBoew = false;
      continue;
    }
    if (asset?.input === './node_modules/gcwet/GCWeb/') {
      insGCWeb = false;
      continue;
    }
  }
}

if (insWetBoew) {
  buildAssets.push({
    glob: '**/*',
    input: './node_modules/gcwet/wet-boew/',
    output: './gcwet/'
  });
}

if (insGCWeb) {
  buildAssets.push({
    glob: '**/*',
    input: './node_modules/gcwet/GCWeb/',
    output: './gcwet/'
  });
}

// console.log(buildAssets)

fs.writeFile("./angular.json", JSON.stringify(angularJson), function(err) {
  if (err) {
    throw new Error("unable to update angular.json to include gcwet assets")
  }
});

