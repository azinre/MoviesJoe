$(document).ready(function(){

    updateHeader();
    
	const currentUrl = document.URL;
    var getParams = function (url) {
        var params = {};
        var match = url.match(/\?(.*)$/);
    
        if (match && match[1]) {
            match[1].split('&').forEach(function (pair) {
                pair = pair.split('=');
                params[pair[0]] = pair[1];
            });
        }
    
        return params;
    };
    var itemsData = [];
    var urlParams = getParams(currentUrl);
    console.log(urlParams);
    if(urlParams.choice === 'movie'){
        itemsData = JSON.parse(sessionStorage.getItem('moviesData')); 
    }else{
        itemsData = JSON.parse(sessionStorage.getItem('seriesData')); 
    }
    var item = itemsData.find((el)=>{
        if(parseInt(el.netflix_id) === parseInt(urlParams.id))
            return el;
    });
    console.log(item);
    $('#itemImage').attr("src",item.img);
    $('#itemImage').attr(`${item.title} picture`);
    $('#title').html(item.title);
    var runtime = item.runtime/3600;
    $('#info').text(`Premiere: ${item.title_date} Runtime: ${runtime.toFixed(2)}Hr Rating: ${item.rating}`);
    $('#synopsis').html(item.synopsis);

    let genres = ['Comedy', 'Drama', 'Action', 'Romance', 'Horror', 'Fantasy']
    let randomEpisodes= Math.floor(Math.random() * (21 - 1) ) + 1;
    let randomGenre1 = Math.floor(Math.random() * (6 - 0) ) + 0;
    let randomGenre2 = Math.floor(Math.random() * (6 - 0) ) + 0;
    $('#genres').text(`Genres: ${genres[randomGenre1]}, ${genres[randomGenre2]}`);
    $('#episodes').text(`Episodes: ${randomEpisodes}`);
    $('#awards').text(`Awards: None`);
    $("#favoriteIcon").hide()
    let login = sessionStorage.getItem('login');
    if(login === 'true'){
        let favorites = '';
        if(item.title_type === 'movie'){
            favorites = getCookie('favoritesMovies');
        }else{
            favorites = getCookie('favoritesSeries');
        }
        let favoritesArray = favorites.split(',');
        let index = favoritesArray.indexOf(urlParams.id);
        $("#favoriteIcon").hide()
        if(index === -1){
            $("#favoriteIcon").hide()
        }else{
            $("#favoriteIcon").show()
        }
    }
    
    $('#favoriteDiv').click(function(){
        if(login !== 'true'){
            $("#favoriteIcon").hide()
            return
        }
        let favorites = '';
        if(item.title_type === 'movie'){
            favorites = getCookie('favoritesMovies');
        }else{
            favorites = getCookie('favoritesSeries');
        }
        let favoritesArray = favorites.split(',');
        let index = favoritesArray.indexOf(urlParams.id);
        if(index === -1){
            $("#favoriteIcon").show()
            favoritesArray.push(urlParams.id);
            if(item.title_type === 'movie'){
                setCookie('favoritesMovies', favoritesArray);
            }else{
                setCookie('favoritesSeries', favoritesArray);
            }
        }else{
            $("#favoriteIcon").hide()
            favoritesArray.splice(index,1);
            if(item.title_type === 'movie'){
                setCookie('favoritesMovies', favoritesArray);
            }else{
                setCookie('favoritesSeries', favoritesArray);
            }
        }
        console.log(getCookie('favorites'));
    });
});