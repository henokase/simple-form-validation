const btn = document.querySelector('button');
const form = document.querySelector('#sign-up');
const inputs = document.querySelectorAll('input');
const pass = document.querySelector('#pass');
const cPass = document.querySelector('#cPass');
const email = document.querySelector('#email');
const tel = document.querySelector('#tel');


function passwordValidation(input) {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

    if(!pattern.test(input.value)) {
        return 3;
    }
    if(pass.value !== cPass.value) {
        return 2;
    }
    return;
}

function emailValidation(input) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!pattern.test(input.value)) {
        return 2;
    }
    return;
}

function telValidation(input) {
    const pattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if(!pattern.test(input.value)) {
        return 2;
    }
    return;
}


btn.addEventListener('click', () => {
    let hasError = false;

    inputs.forEach(input => {
        const errorMessageOne = input.nextElementSibling;
        const errorMessageTwo = errorMessageOne ? errorMessageOne.nextElementSibling : null;
        const errorMessageThree = errorMessageTwo ? errorMessageTwo.nextElementSibling : null;

        input.classList.remove('error');
        errorMessageOne.classList.add('hidden');
        if(errorMessageTwo) errorMessageTwo.classList.add('hidden');
        if(errorMessageThree) errorMessageThree.classList.add('hidden');

        if (input.value.length === 0) {
            input.classList.add('error');
            errorMessageOne.classList.remove('hidden');
            if(errorMessageTwo) errorMessageTwo.classList.add('hidden');
            if(errorMessageThree) errorMessageThree.classList.add('hidden');
            hasError = true;
            return;
        }

        if(input === tel) {
            const telError = telValidation(input);
            if(telError === 2) {
                input.classList.add('error');
                errorMessageTwo.classList.remove('hidden');
                hasError = true;
            }
        }

        if (input === pass || input === cPass) {
            const passwordError = passwordValidation(input);
            if (passwordError === 3) {
                input.classList.add('error');
                errorMessageThree.classList.remove('hidden');
                hasError = true;
            } else if (passwordError === 2) {
                input.classList.add('error');
                errorMessageTwo.classList.remove('hidden');
                hasError = true;
            }
        } else if (input === email) {
            const emailError = emailValidation(input);
            if (emailError === 2) {
                input.classList.add('error');
                errorMessageTwo.classList.remove('hidden');
                hasError = true;
            }
        }
    });

    if (!hasError) {
        form.submit();
    }
});


