$('.thread').wrap('<div id="mutation"><div id="body"></div></div>');

/* bar */
$('#body').prepend($('<div id="bar"></div>').load(chrome.extension.getURL('html/bar.html')));

var youtubeVid = new RegExp('(?:youtube\.com\/watch\\?v=|youtu\.?be\/)([^ ]+)', 'g');

$.getScript('key.js');

$.ajaxSetup({
	async: false
});

track = []

function ISO8601ToS(iso) {
	var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
	var h = 0, m = 0, s = 0, totalS;

	if (reptms.test(iso)) {
		var matches = reptms.exec(iso);

		if (matches[1]) h = Number(matches[1]);
		if (matches[2]) m = Number(matches[2]);
		if (matches[3]) s = Number(matches[3]);

		totalS = h * 3600 + m * 60 + s;
	}

	return(totalS);
}

$('.thread .postContainer .post .postMessage').each(function() {
	while (id = youtubeVid.exec($(this).text())) {
		$.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + id + '&key=' + key + '&part=snippet,contentDetails', function(data) {
			track.push({
				id: id[1],
				title: data.items[0].snippet.title,
				length: ISO8601ToS(data.items[0].contentDetails.duration)
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

	var hms = new Date(runtime * 1000).toISOString().substr(11, 8);

	$('#stat').text(track.length + ' songs, ' + hms);
});

localStorage.setItem('track', JSON.stringify(track));

// iframe api
$('#mutation').append($('<div id="player"></div>').load(chrome.extension.getURL('html/youtubePlayer.html')));
