const toggleButton = document.getElementById('menuToggle');
    const naviList = document.getElementById('naviUl');

    toggleButton.addEventListener('click', function(){
        naviList.classList.toggle('toggle');
    })