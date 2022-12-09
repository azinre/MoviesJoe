$(document).ready(function(){

    const registerUser = function(e){
        e.preventDefault();
        if('' === $('#username').val()){
            $('#errorMessage').text('Input a username');
            return;
        }
        if('' === $('#password').val()){
            $('#errorMessage').text('Input a password');
            return;
        }
        if($('#password').val() !== $('#password').val()){
            $('#errorMessage').text('Password and confirmation do not match');
            return;
        }
        setCookie('username',$('#username').val(),5);
        setCookie('password',$('#password').val(),5);
        sessionStorage.setItem('login', true);
        window.location.href = 'index.html';
    };

    // $('#username').addEventListener("blur", function(){
    //     if(this.value !== ""){
    //         countryError.textContent = "";
    //     }
    // });

	document.registerForm.addEventListener("submit", registerUser);
    searchFunction('');

});