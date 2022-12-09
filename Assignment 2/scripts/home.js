$(document).ready(function(){
	updateHeader();

	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://unogs-unogs-v1.p.rapidapi.com/search/titles?limit=100&order_by=rating&type=movie",
		"method": "GET",
		"headers": {
			"X-RapidAPI-Key": "60617891f2mshc94768e9bc40ff2p13c9e3jsn16760f31756e",
			"X-RapidAPI-Host": "unogs-unogs-v1.p.rapidapi.com"
		}
	};

	const displayData = function(data, type){
		if(type === 'movie'){
			for(let i=0;i<10;i++){
				$('#topMovies').append(`<a href="itemInfo.html?choice=${type}&id=${data[i].netflix_id}"><img src="${data[i].img}" alt="image ${data[i].title}"></a>`);
				let recentData = sortData(data, 'date');
				$('#recentMovies').append(`<a href="itemInfo.html?choice=${type}&id=${recentData[i].netflix_id}"><img src="${recentData[i].img}" alt="image ${recentData[i].title}"></a>`);
			}
		}else{
			for(let i=0;i<10;i++){
				$('#topSeries').append(`<a href="itemInfo.html?choice=${type}&id=${data[i].netflix_id}"><img src="${data[i].img}" alt="image ${data[i].title}"></a>`);
				let recentData = sortData(data, 'date');
				$('#recentSeries').append(`<a href="itemInfo.html?choice=${type}&id=${recentData[i].netflix_id}"><img src="${recentData[i].img}" alt="image ${recentData[i].title}"></a>`);
			}
		}
	}

	const moviesData = JSON.parse(sessionStorage.getItem('moviesData'));
	const seriesData = JSON.parse(sessionStorage.getItem('seriesData'));

	if(!moviesData){
		$.ajax(settings).done(function (response) {
			console.log('Load movies');
			sessionStorage.setItem('moviesData', JSON.stringify(response.results));
			displayData(response.results,'movie');
		});
	}

	if(!seriesData){
		settings.url = "https://unogs-unogs-v1.p.rapidapi.com/search/titles?limit=100&order_by=rating&type=series";
		$.ajax(settings).done(function (response) {
			console.log('Load series');
			sessionStorage.setItem('seriesData', JSON.stringify(response.results));
			displayData(response.results,'series');
		});
	}
	if(moviesData && seriesData){
		displayData(moviesData,'movie');
		displayData(seriesData,'series');
	}

	searchFunction('');

});