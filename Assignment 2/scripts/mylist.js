$(document).ready(function(){
    updateHeader();

    const currentUrl = document.URL;
    let itemsData = [];
    let displayData = [];
    let urlParams = getParams(currentUrl);
    let page = parseInt(urlParams.page);
    let offset = 20*(page-1);

    $('#moviesBtn').on('click', function(){
        location.href = `mylist.html?choice=movie&page=1&sort=rating`;
    });

    $('#seriesBtn').on('click', function(){
        location.href = `mylist.html?choice=series&page=1&sort=rating`;
    });

    $('#prevBtn').on('click', function(){
        let page = parseInt(urlParams.page);
        if(page === 1)
            return;
        page -= 1;
        location.href = `mylist.html?choice=${urlParams.choice}&page=${page.toString()}&sort=${urlParams.sort}`;
    });

    $('#nextBtn').on('click', function(){
        let page = parseInt(urlParams.page);
        let limit = Math.ceil(displayData.length/20);
        if(page === limit)
            return;
        page += 1;
        location.href = `mylist.html?choice=${urlParams.choice}&page=${page.toString()}&sort=${urlParams.sort}`;
    });

    $('#ratingSort').on('click', function(){
        location.href = `mylist.html?choice=${urlParams.choice}&page=${page.toString()}&sort=rating`;
    });

    $('#dateSort').on('click', function(){
        location.href = `mylist.html?choice=${urlParams.choice}&page=${page.toString()}&sort=date`;
    });

    $('#titleSort').on('click', function(){
        location.href = `mylist.html?choice=${urlParams.choice}&page=${page.toString()}&sort=title`;
    });

    let favorites = '';
    let favoritesArray = [];
    if(urlParams.choice === 'movie'){
        itemsData = JSON.parse(sessionStorage.getItem('moviesData')); 
        favorites = getCookie('favoritesMovies')
    }else{
        itemsData = JSON.parse(sessionStorage.getItem('seriesData')); 
        favorites = getCookie('favoritesSeries')
    }
    favoritesArray = favorites.split(',');
    for(let i=0; i<favoritesArray.length; i++){
        let item= itemsData.find((el)=>{
            return el.netflix_id.toString() === favoritesArray[i];
        });
        displayData.push(item);
    }

    if(!urlParams.sort)
        sortData(displayData,'rating');
    sortData(displayData,urlParams.sort);

    for(let i=offset; i<20+offset;i++){
        if(displayData[i])
            $('#moviesCatalog').append(`<a href="itemInfo.html?choice=${urlParams.choice}&id=${displayData[i].netflix_id}"><img src="${displayData[i].img}" alt="image ${displayData[i].title}"></a>`);
    }

    $('#pageText').text(urlParams.page);
    searchFunction(urlParams.choice);
	
});