const ak ="Egor_ynKqLVLmAW63V9aMXpAStjUe9bMPkETD";

let widget = document.querySelector('.zodiac-master');
let screens = widget.querySelectorAll('.screen'); // Блоки анкеты
let progressBar = widget.querySelector('.progress_bar_box');
let nextButton = widget.querySelector('.next');
let chooseSex = widget.querySelectorAll('.sex');
let checkbox = widget.querySelectorAll('.checkbox');
let zodiacItems = widget.querySelectorAll('.zodiac_item');
let noTime = widget.querySelector('#no_time');
let timeBirthday = widget.querySelector('#time');
let timeBirthdayPartner = widget.querySelector('#time_partner');
let birthDate = widget.querySelector('#form_date');
let timeType = widget.querySelector('#timeType');
let locationBirthday = widget.querySelector('#location');
let emailInput = widget.querySelector('#email_input');
let formEmail = widget.querySelector('#row_email');
let privacy = widget.querySelector('#privacy');
let privacyRow = widget.querySelector('#row_privacy');
let horoscopeSelect = widget.querySelector('#horoscopeType');
let horoscopeSingl = widget.querySelector('#horoscopeSingl');
let screenImgs = widget.querySelectorAll('.screen_img');
let personalSigns = widget.querySelectorAll('.personal_sign');
let personalNames = widget.querySelectorAll('.personal_name');
let btnStatus = false;

const dataObj = {}; // Обьект с данными

let backButton = widget.querySelector('.back');
backButton.style.opacity = '0';

for (let i = 0; i < screens.length; i++) {
    progressBar.innerHTML += '<div class="step"></div>'
}
let steps = widget.querySelectorAll('.step');
let currentScreen = 0;
steps[0].classList.add('active');



function checkBtnStatus(btnStatus) {
    if (btnStatus) {
        nextButton.classList.add('active');
    } else {
        nextButton.classList.remove('active');
    }
}



// slide forward

nextButton.addEventListener('click', slideNext);

function changerSlides() {
    //for the last screen
    if (currentScreen == (screens.length - 1)) {
        sendData();
    } else {
    // for other screens
    screens[currentScreen].classList.remove('active');
    steps[currentScreen].classList.remove('active');
    currentScreen++;
    screens[currentScreen].classList.add('active');
    steps[currentScreen].classList.add('active');
    backButton.style.opacity = '1';
    }
    if (currentScreen == (screens.length - 1)) {
        widget.querySelector('.next').querySelector('p').innerHTML = widget.querySelector('#last_cta').value;
    }
    checkBtnStatus(btnStatus = false);
}


//slide back

backButton.addEventListener('click', slideBack);

function slideBack(){
    if (currentScreen !== 0) {
    screens[currentScreen].classList.remove('active');
    steps[currentScreen].classList.remove('active');
    currentScreen--;
    screens[currentScreen].classList.add('active');
    steps[currentScreen].classList.add('active');
    }
    if (currentScreen == 0) {
        backButton.style.opacity = '0';
    }
}


//validate fields

function slideNext() {
    let errorStatus = true;

    if (screens[currentScreen].id == "name") {
        if (widget.querySelector('#form_name').value) {
            dataObj.name = widget.querySelector('#form_name').value;
            for (var i = 0; i < personalNames.length; i++) {
                personalNames[i].innerHTML = dataObj.name;
            }
        } else { 
            screens[currentScreen].querySelector('#row_name').classList.add('error');
            errorStatus = false;
        };
        if (!dataObj.sex) { 
            widget.querySelector('#row_sex').classList.add('error');
            errorStatus = false;
        };
    }

    if (screens[currentScreen].id == "birthdate") {
        if (birthDate.value !== '') {
            let dates = birthDate.value.split('-');
            dataObj.birthday = dates[2] + '/' + dates[1] + '/' + dates[0];
        } else { 
            widget.querySelector('#row_date').classList.add('error');
            errorStatus = false;
        };

        dataObj.birthday = widget.querySelector('#form_date').value;
        
        if (timeBirthday.value || noTime.checked) {
            dataObj.timeBirthday = timeBirthday.value;
            if( timeType !== 'undefined' && timeType !== null) {
                dataObj.TimeType = timeType.value
            }
        } else { 
            widget.querySelector('#row_time').classList.add('error');
            errorStatus = false;
        }
    }

    if (screens[currentScreen].id == "city") {
        if (locationBirthday.value) {
            dataObj.locationBirthday = locationBirthday.value;
            dataObj.locationAutocomplete =  widget.querySelector('#autocomplete').value;
            dataObj.locationLocality =  widget.querySelector('#locality').value;
            dataObj.locationAdministrative =  widget.querySelector('#administrative').value;
            dataObj.locationCountry =  widget.querySelector('#country').value;
            dataObj.locationLat = widget.querySelector('#lat').value;
            dataObj.locationLng = widget.querySelector('#lng').value;
        } else { 
            widget.querySelector('#row_location').classList.add('error');
            errorStatus = false;
        }
    } 

    if(screens[currentScreen].id == "email") {
        if (validateEmail(emailInput.value)) {
            dataObj.email = emailInput.value;
        } else {
            formEmail.classList.add('error');
            errorStatus = false;
        }
        if (!privacy.checked) {
            privacyRow.classList.add('error');
            errorStatus = false;
        }
    }
    if (errorStatus && btnStatus) {changerSlides();}
}


//choose zodiac sign

chooseZodiac = function () {
    let thisZodiacItems = screens[currentScreen].querySelectorAll('.zodiac_item');
    for (let i = 0; i < thisZodiacItems.length; i++) {
        if (i == this.id) {
            thisZodiacItems[i].classList.add('active');
        };
        if (i != this.id) {
            thisZodiacItems[i].classList.remove('active');
        };
    };

    //dataObj filling
    if (screens[currentScreen].id == "zodiac") {
            dataObj.zodiacSign = this.dataset.zodiac;
    }

    checkBtnStatus(btnStatus = true);

    for (let i = 0; i < screenImgs.length; i++) {
        screenImgs[i].src = "img/z-" + this.dataset.zodiac + ".png";
    }
    for (let i = 0; i < personalSigns.length; i++) {
        personalSigns[i].innerHTML = this.dataset.zodiac.charAt(0).toUpperCase() + this.dataset.zodiac.slice(1);
    }
}

for (let i = 0; i < zodiacItems.length; i++) {
    zodiacItems[i].addEventListener('click', chooseZodiac);
}



//choose sex

function chosenSex() {
    let thisScreenSex = screens[currentScreen].querySelectorAll('.sex');
    for (let i = 0; i < thisScreenSex.length; i++) {
    if (i == this.id) {
            thisScreenSex[i].classList.add('active');
        };
        if (i != this.id) {
            thisScreenSex[i].classList.remove('active');
        };
    };

    //dataObj filling
    dataObj.sex = this.dataset.sex;

    let sexes = widget.querySelectorAll('.sign_icon');
    for (var i = 0; i < sexes.length; i++) {
        sexes[i].style.display = 'none';
    }
    let mySexes = widget.querySelectorAll('.' + dataObj.sex + '_sign');
    for (var i = 0; i < mySexes.length; i++) {
        mySexes[i].style.display = 'inline-block';
    }
    if (widget.querySelector('#form_name').value) {checkBtnStatus(btnStatus = true);}
    checkError(widget.querySelector('#row_sex'));
}

for (let i = 0; i < chooseSex.length; i++) {
    chooseSex[i].addEventListener('click', chosenSex);
}



//checkboxes

function checkBox() {
    if (this.classList.contains('active')) {
        this.classList.remove('active');
    } else {
        this.classList.add('active');
    }
}

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener('click',checkBox);
}

//remove error sign

widget.querySelector('#form_name').addEventListener('change', () => {
    checkError(widget.querySelector('#row_name'));
    if (widget.querySelector('#form_name').value && dataObj.sex) {checkBtnStatus(btnStatus = true);} else {checkBtnStatus(btnStatus = false);}
});
noTime.addEventListener('change', () => {
    checkError(widget.querySelector('#row_time'));
    if (birthDate.value && (timeBirthday.value || noTime.checked)) {checkBtnStatus(btnStatus = true);} else {checkBtnStatus(btnStatus = false);}
});
timeBirthday.addEventListener('change', () => {
    checkError(widget.querySelector('#row_time'));
    if (birthDate.value && (timeBirthday.value || noTime.checked)) {checkBtnStatus(btnStatus = true);} else {checkBtnStatus(btnStatus = false);}
});
emailInput.addEventListener('change', () => {
    checkError(formEmail);
    if (emailInput.value && privacy.checked) {checkBtnStatus(btnStatus = true);} else {checkBtnStatus(btnStatus = false);}
});
privacy.addEventListener('change', () => {
    checkError(privacyRow);
    if (emailInput.value && privacy.checked) {checkBtnStatus(btnStatus = true);} else {checkBtnStatus(btnStatus = false);}
});
birthDate.addEventListener('change', () => {
    checkError(widget.querySelector('#row_date'));
    if (birthDate.value && (timeBirthday.value || noTime.checked)) {checkBtnStatus(btnStatus = true);} else {checkBtnStatus(btnStatus = false);}
});
locationBirthday.addEventListener('change', () => {
    alert(locationBirthday.value);
    checkError(widget.querySelector('#row_location'));
    if(locationBirthday.value) {checkBtnStatus(btnStatus = true);} else {checkBtnStatus(btnStatus = false);}
})


function checkError(block) {
    block.classList.remove('error');
    block.classList.remove('error-privacy');
}



//check email

function validateEmail(email) {
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
}

function sendData() {
    console.log(dataObj);
}



//autocomplite

$( document ).ready(function() {
    var form = $('#row_location');
    initAutocomplete(form);
});

function initAutocomplete(form) {

    if (form.find('#autocomplete').val() != '') {
        form.find("#location").data('placeholder', form.find('#autocomplete').val());
    }

    form.find("#location").select2({
        ajax: {
            delay: 750,
            url: 'https://test.astromix.net/ajax/location/',
            dataType: 'json',
            crossDomain: true,
            data: function (params) {
                var aida = ak;
                var query = {
                    aida: aida,
                    q: params.term,
                };
                return query;
            }
        },
        width: "100%",
        minimumInputLength: 3,
        language: 'ru',
    }).on("select2:open", function (e) {
        event.preventDefault();
        $('.select2-search__field').trigger('focus');
    }).on('select2:select', function (e) {
        var data = e.params.data;
        $('#row_location').removeClass('error');
        form.find('#lat').val('');
        form.find('#lng').val('');
        form.find('#locality').val('');
        form.find('#administrative').val('');
        form.find('#country').val('');
        form.find('#autocomplete').val(data.text);

        $.ajax({
            url: 'https://test.astromix.net/ajax/locationselect/',
            method: 'post',
            data: 'id=' + data.id,
            success: function (data) {
                if (data.status == 'OK') {
                    form.find('#lat').val(data.lat);
                    form.find('#lng').val(data.lng);
                    form.find('#locality').val(data.locality);
                    form.find('#administrative').val(data.administrative);
                    form.find('#country').val(data.country);
                }
                checkBtnStatus(btnStatus = true);
            }
        });
    });
}