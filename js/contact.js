const messageSubjectInput = document.querySelector("#message-subject");
const messageEmailInput = document.querySelector("#message-email-address");
const messageContentInput = document.querySelector("#message-content");
const contactForm = document.querySelector("#contact-form");
const submitButton = document.querySelector("#form-submit-button");
const fakeCaptcha = document.querySelector("#fakeCaptcha");
const charCountLabel = document.querySelector("#charCount");

function validateContactForm(evt) {
    evt.preventDefault();
    messageEmailInput.classList.remove("contact-form-input-error");
    messageSubjectInput.classList.remove("contact-form-input-error");
    messageContentInput.classList.remove("contact-form-input-error");
    if(!fakeCaptcha.checked) {
        window.alert("Please prove you are not a bot!")
    }
    else {
        if(contactForm.checkValidity()) {
            window.alert("This function is not currently switched on. Please contact via another method.")
        } else {
            if(!messageEmailInput.checkValidity()) {
                messageEmailInput.classList.add("contact-form-input-error");    
            }
            if(!messageSubjectInput.checkValidity()) {
                messageSubjectInput.classList.add("contact-form-input-error");    
            }
            if(!messageContentInput.checkValidity()) {
                messageContentInput.classList.add("contact-form-input-error");    
            }
        }
    }
}


function isEmail(email) {

}

function characterCount() {
    let remainingLength = 500 - messageContentInput.value.length;
    charCountLabel.innerText = remainingLength;
}



submitButton.addEventListener('click', validateContactForm);
messageContentInput.addEventListener('keyup', characterCount);