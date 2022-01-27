/*
  
  USES FFMPEG to split videos into 2 minute chunks for video analysis

*/

var path = require('path');
var fs = require('fs');
//joining path of directory 
var directoryPath = path.join(__dirname);
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    let mp4s = []
    while(files.length > 0){
      const file = files.pop()
      if(file.slice(-3) === 'mp4'){
        mp4s.push(file)
      }
    }


    function splitVideo(){
      if(mp4s.length < 1) return


      const file = mp4s.pop()
    console.log('splitting', file)
      var child = require('child_process')
        .exec(`ffmpeg -i ${file} -c copy -map 0 -segment_time 00:2:00 -f segment -reset_timestamps 1 split/${file}-%03d.mp4`)
      child.stdout.pipe(process.stdout)
      child.on('error', function(e){
        console.log(e)
      })
      child.on('message', function(e){
        console.log(e)
      })
      child.on('exit', function() {
        splitVideo()
      })
    }

    splitVideo()
});




