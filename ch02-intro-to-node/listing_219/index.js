'use strict';
const async = require('async');
const exec = require('child_process').exec;

function downloadNodeVersion(version, destination, callback) {
  const url = `http://nodejs.org/dist/v${version}/node-v${version}.tar.gz`;
  const filepath = `${destination}\\${version}.tgz`;
  exec(`curl ${url} > ${filepath}`, callback);
}

async.series([
  callback => {
    async.parallel([
      callback => {
        console.log('Downloading Node v4.4.7...');
        downloadNodeVersion('4.4.7', 'C:\\Users\\usera\\Downloads\\nodejsinaction-master\\ch02-intro-to-node\\listing_219\\tmp', callback);
      },
      callback => {
        console.log('Downloading Node v6.3.0...');
        downloadNodeVersion('6.3.0', 'C:\\Users\\usera\\Downloads\\nodejsinaction-master\\ch02-intro-to-node\\listing_219\\tmp', callback);
      }
    ], callback);
  },
  callback => {
    console.log('Creating archive of downloaded files...');
    exec(
      'tar cvf node_distros.tar C:\\Users\\usera\\Downloads\\nodejsinaction-master\\ch02-intro-to-node\\listing_219\\tmp\\4.4.7.tgz C:\\Users\\usera\\Downloads\\nodejsinaction-master\\ch02-intro-to-node\\listing_219\\tmp\\6.3.0.tgz',
      err => {
        if (err) throw err;
        console.log('All done!');
        callback();
      }
    );
  }
], (err, results) => {
  if (err) throw err;
});
