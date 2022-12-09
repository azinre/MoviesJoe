//validate module
function validate(e){

    // e.preventDefault();

    let valid=true;
    let message= '';
    let notDaysChecked = false;

    // Valid  name
    const nameEl = document.querySelector('#name');
    if(nameEl.value === ''){
        valid = false;
        message = message + '</br>Input your name';
        nameEl.style.borderColor = '#FF0000';
    }

    // Valid tel
    const phoneEl = document.querySelector('#phone');
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(phoneEl.value === ''){
        valid = false;
        message = message + '</br>Input a phone';
        phoneEl.style.borderColor = '#FF0000';
    } else if(!phoneEl.value.match(regex)) {
        valid = false;
        message = message + '</br>Phone has to be 10 numbers';
        phoneEl.style.borderColor = '#FF0000';
    }

    // Valid  name
    const emailEl = document.querySelector('#email');
    if(emailEl.value === ''){
        valid = false;
        message = message + '</br>Input your email';
        emailEl.style.borderColor = '#FF0000';
    }

    // Valid  description
    const descriptionEl = document.querySelector('#description');
    if(descriptionEl.value === ''){
        valid = false;
        message = message + '</br>Input a description';
        descriptionEl.style.borderColor = '#FF0000';
    }


    if(!valid){
        e.preventDefault();
        const errorLabel= document.querySelector('#errorLabel');
        errorLabel.innerHTML = message;
    }

    return valid;

};

//validate 
document.form.addEventListener("submit", validate);

$(document).ready(function(){
	updateHeader();


	searchFunction('');

});