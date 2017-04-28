$('.thread').wrap('<div id="mutation"><div id="body"></div></div>');

/* bar */
$('#body').prepend($('<div id="bar"></div>').load(chrome.extension.getURL('html/bar.html')));

var youtubeVid = new RegExp('(?:youtube\.com\/watch\\?v=|youtu\.?be\/)([^ ]+)');
var timeMS = new RegExp('PT([0-9]+)M([0-9]+)S');

var key = '***REMOVED***'

$.ajaxSetup({
	async: false
});

track = []

$('.thread .postContainer .post .postMessage').each(function() {
	if(youtubeVid.test($(this).text())) {
		var id = $(this).text().match(youtubeVid)[1];

		$.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + id + '&key=' + key + '&part=snippet,contentDetails', function(data) {
			track.push({
				id: id,
				title: data.items[0].snippet.title,
				length: parseInt(data.items[0].contentDetails.duration.match(timeMS)[1]) * 60 + parseInt(data.items[0].contentDetails.duration.match(timeMS)[2])
			});
		});
	}
});

$(document).ready(function() {
	var runtime = 0;

	$.each(track, function(t) {
		$('#bar #track').append('<h5>' + track[t].title + '</h5>');

		runtime += track[t].length

		t++;
	});

	var time = Math.floor(runtime / 3600) + ':' + Math.floor(runtime / 60) % 60 + ':' + runtime % 60

	$('#stat').text(track.length + ' songs, ' + time);
});

localStorage.setItem('track', JSON.stringify(track));

// iframe api
$('#mutation').append($('<div id="player"></div>').load(chrome.extension.getURL('html/youtubePlayer.html')));
