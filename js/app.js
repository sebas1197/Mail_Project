const btn_send = document.querySelector('#send');
const send_mail = document.querySelector('#send-mail');
const email = document.querySelector('#email_to');
const email_from = document.querySelector('#email_from');
const subject = document.querySelector('#subject');
const message = document.querySelector('#message');
const regular_phrase = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

function eventListeners(){
    // document.addEventListener('DOMContentLoaded',starting);
    email.addEventListener('blur',validate_form);
    email_from.addEventListener('blur',validate_form);
    subject.addEventListener('blur',validate_form);
    message.addEventListener('blur',validate_form);
    send_mail.addEventListener('submit',run_email);
}


function validate_form(e){
    if(e.target.value.length > 0){
        const error = document.querySelector('p.error');
        if(error)
            error.remove();

        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border','border-green-500');
    }else{
        e.target.classList.remove('border','border-green-500');
        e.target.classList.add('border','border-red-500');
        showError('Todos los campos son obligatorios');
    }

    validate_email(e);

    if(regular_phrase.test(email.value) && subject.value!=='' && message.value!==''){
        btn_submit(false);
    }else{
        btn_submit(true);
    }
}

function showError(message){
    const message_error = document.createElement('p');

    message_error.textContent = message;
    message_error.classList.add('border','border-red-500','background-red-100','text-red-500','p-3','mt-5','text-center','error');
    
    const errors = document.querySelectorAll('.error'); 

    if(errors.length === 0){
        send_mail.appendChild(message_error);
    }
}

function run_email(e){
    e.preventDefault();

    const form = new FormData(this);
    const email_from = document.querySelector('#email_from').value;
    const email_to = document.querySelector('#email_to').value;
    const subject = document.querySelector('#subject').value;
    const message = document.querySelector('#message').value;
    const link = document.querySelector('#link');
    
    link.setAttribute('href', `
    mailto: ${form.get('email_to')}?
    subject=${form.get('subject')} ${form.get('email_from')} &
    body = ${form.get('message')} `);

    link.click();

    const spinner = document.querySelector('#spinner');
    spinner.style.display='flex';

    setTimeout( () => {
        spinner.style.display='none';
        swal("Envio exitoso", "Puedes revisar tu bandeja de correo", "success");
        send_mail.reset();
        btn_submit(true);
    }, 500 );    


}


function validate_email(e){
    if(e.target.type === 'email'){        
        if(regular_phrase.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error)
                error.remove();

            e.target.classList.remove('border','border-red-500');
            e.target.classList.add('border','border-green-500');
        }else{
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-500');
            showError('El email no es correcto');
        }
    }
}

function btn_submit(flag){
    if(flag){
        btn_send.disabled = true;
        btn_send.classList.add('cursor-not-allowed','opacity-50');
    }else{
        btn_send.disabled = false;
        btn_send.classList.remove('cursor-not-allowed','opacity-50');
    }
}
