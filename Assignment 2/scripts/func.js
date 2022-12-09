function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
};

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

function updateHeader() {
    let login = sessionStorage.getItem('login');
    if(login === 'true'){
        $('#loginHeader').hide();
        $('#usernameHeader').text(getCookie('username'));
        $('#usernameHeader').show();
        $('#logout').show();
    }else{
        $('#usernameHeader').hide();
        $('#logout').hide();
        $('#loginHeader').show();
    }
    $('#logout').click(function(){
        console.log('click')
        sessionStorage.setItem('login', false);
        window.location.href = 'index.html';
    });
};

const sortData = function(data, sortType){
    if(sortType === 'rating'){
        return data;
    }else if(sortType === 'date'){
        return data.sort((a,b)=>{
            if(a.title_date > b.title_date){
                return 1;
            }else{
                return -1;
            }
        });
    }else if(sortType === 'title'){
        return data.sort((a,b)=>{
            if(a.title > b.title){
                return 1;
            }else{
                return -1;
            }
        });
    }
    
};

const getParams = function (url) {
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

const searchFunction = function (option) {
    $('#searchIcon').click(function(){
		let searchVal = ''+ $('#search').val();
		let findVal = -1;
		let moviesData = JSON.parse(sessionStorage.getItem('moviesData'));
		let seriesData = JSON.parse(sessionStorage.getItem('seriesData'));
		if(searchVal !== ''){
            if(option === 'movie' || option === ''){
                for (movie of moviesData){
                    console.log(movie.title);
                    findVal= movie.title.search(new RegExp(searchVal, "i"));
                    console.log(findVal);
                    if(findVal !== -1){
                        console.log('open window');
                        window.open(`itemInfo.html?choice=movie&id=${movie.netflix_id}`, '_self');
                        return 
                    }
                }
            }
            if(option === 'series' || option === ''){
                for (serie of seriesData){
                    findVal= serie.title.search(new RegExp(searchVal, "i"));
                    console.log(findVal);
                    if(findVal !== -1){
                        console.log('open window');
                        window.open(`itemInfo.html?choice=series&id=${serie.netflix_id}`, '_self');
                        return 
                    }
                }
            }
		}
	});
};