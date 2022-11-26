$(document).ready(function(){
    updateHeader();

    const currentUrl = document.URL;
    let itemsData = [];
    let sortItemsData = [];
    let urlParams = getParams(currentUrl);
    let page = parseInt(urlParams.page);
    let offset = 20*(page-1);

    $('#prevBtn').on('click', function(){
        let page = parseInt(urlParams.page);
        if(page === 1)
            return;
        page -= 1;
        location.href = `catalog.html?choice=${urlParams.choice}&page=${page.toString()}&sort=${urlParams.sort}`;
    });

    $('#nextBtn').on('click', function(){
        let page = parseInt(urlParams.page);
        if(page === 5)
            return;
        page += 1;
        location.href = `catalog.html?choice=${urlParams.choice}&page=${page.toString()}&sort=${urlParams.sort}`;
    });

    $('#ratingSort').on('click', function(){
        location.href = `catalog.html?choice=${urlParams.choice}&page=${page.toString()}&sort=rating`;
    });

    $('#dateSort').on('click', function(){
        location.href = `catalog.html?choice=${urlParams.choice}&page=${page.toString()}&sort=date`;
    });

    $('#titleSort').on('click', function(){
        location.href = `catalog.html?choice=${urlParams.choice}&page=${page.toString()}&sort=title`;
    });

    if(urlParams.choice === 'movie'){
        $('#catalogTitle').text('Movies')
        itemsData = JSON.parse(sessionStorage.getItem('moviesData')); 
    }else{
        $('#catalogTitle').text('Tv Series')
        itemsData = JSON.parse(sessionStorage.getItem('seriesData')); 
    }

    if(!urlParams.sort)
        sortData(itemsData,'rating');
    sortData(itemsData,urlParams.sort);
    
    for(let i=offset; i<20+offset;i++){
        $('#moviesCatalog').append(`<a href="itemInfo.html?choice=${urlParams.choice}&id=${itemsData[i].netflix_id}"><img src="${itemsData[i].img}" alt="image ${itemsData[i].title}"></a>`);
    }

    $('#pageText').text(urlParams.page);
	
});