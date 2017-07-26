// Data for the "HTML Video" Page
window.onload = function() {
    let videos = document.querySelector('#videos');
    var videoStart = "<video", videoEnd = "</video>";

    for (var i = 0; i < video.source.length; i++) {
        videoStart += " width='" + video.width + "' height='" + video.height + "' controls>";
            videoStart += "<source src='" + video.source[i].src + "' type='" + video.source[i].type + "' ";
                videoStart += videoEnd;
                videos.innerHTML = videoStart;
        }
    }

var video = {
    controls: true, 
    width: 320,
    height: 240,
    source: [
        {src: "https://scs.senecac.on.ca/~patrick.crawford/shared/fall-2016/int222/movie.mp4", type: "video/mp4"},
        {src: "https://scs.senecac.on.ca/~patrick.crawford/shared/fall-2016/int222/movie.ogg", type: "video/ogg"},
        {src: "https://scs.senecac.on.ca/~patrick.crawford/shared/fall-2016/int222/movie.webm", type: "video/webm"}
    ]
};