$(document).ready(function(){

    const validateLogin = function(e){
        e.preventDefault();
        let username = getCookie('username');
        if(!username){
            $('#errorMessage').text('Username or password do not match');
            return;
        }
        let password = getCookie('password');
        if(username !== $('#username').val()){
            $('#errorMessage').text('Username or password do not match');
            return;
        }
        if(password !== $('#password').val()){
            $('#errorMessage').text('Username or password do not match');
            return;
        }
        sessionStorage.setItem('login', true);
        window.location.href = 'index.html';
    };

    // $('#username').addEventListener("blur", function(){
    //     if(this.value !== ""){
    //         countryError.textContent = "";
    //     }
    // });

	document.loginForm.addEventListener("submit", validateLogin);

});