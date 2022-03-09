let widget = document.querySelector('.zodiac-master');
let screens = widget.querySelectorAll('.screen'); // Блоки анкеты
let progressBar = widget.querySelector('.progress_bar_box');
let nextButton = widget.querySelector('.next');
let chooseSex = widget.querySelectorAll('.sex');
let checkbox = widget.querySelectorAll('.checkbox');
let zodiacItems = widget.querySelectorAll('.zodiac_item');
let noTime = widget.querySelector('#no_time');
let timeBirthday = widget.querySelector('#form_time');
let selectDate = widget.querySelectorAll('select.input');
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
let buttonBox = widget.querySelector('.button_box');

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
    buttonBox.style.display = 'grid';
    }
    if (currentScreen == (screens.length - 1)) {
        widget.querySelector('.next').querySelector('p').innerHTML = widget.querySelector('#last_cta').value;
    }
    isActiveButton();
}


//slide back

backButton.addEventListener('click', slideBack);

function slideBack(){
    if (currentScreen == (screens.length - 1)) {
        widget.querySelector('.next').querySelector('p').innerHTML = widget.querySelector('#first_cta').value;
    }
    if (currentScreen !== 0) {
    screens[currentScreen].classList.remove('active');
    steps[currentScreen].classList.remove('active');
    currentScreen--;
    screens[currentScreen].classList.add('active');
    steps[currentScreen].classList.add('active');
    isActiveButton();
    }
    if (currentScreen == 0) {
        buttonBox.style.display = 'none';
        let thisZodiacItems = screens[currentScreen].querySelectorAll('.zodiac_item');
        for (let i = 0; i < thisZodiacItems.length; i++) {
            thisZodiacItems[i].classList.remove('active');
        };
    }
}

//button activating

function isActiveButton() {
    let btnStatus = true;

    if (screens[currentScreen].id == "name") {
        if (widget.querySelector('#form_name').value == '') {
            checkBtnStatus(btnStatus = false);
        };
        if (!dataObj.sex) { 
            checkBtnStatus(btnStatus = false);
        };
    }

    if (screens[currentScreen].id == "birthdate") {
        if (validateDate() == false) {
            checkBtnStatus(btnStatus = false);
        }
        if (timeBirthday.value == '' && !noTime.checked) {
            checkBtnStatus(btnStatus = false);   
        }
    }

    if (screens[currentScreen].id == "city") {
        if (!locationBirthday.value) {
            checkBtnStatus(btnStatus = false);
        }
    } 

    if(screens[currentScreen].id == "email") {
        if (!validateEmail(emailInput.value)) {
            checkBtnStatus(btnStatus = false);
        }
        if (!privacy.checked) {
            checkBtnStatus(btnStatus = false);
        }
    }
    if (btnStatus) {checkBtnStatus(btnStatus = true);}
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
        if (validateDate() != false) {
            dataObj.birthday = validateDate();
        } else {
            widget.querySelector('#row_date').classList.add('error');
            errorStatus = false;
        }

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


function validateDate() {
    let day = screens[currentScreen].querySelector('.select__day').value;
    let month = screens[currentScreen].querySelector('.select__month').value;
    let year = screens[currentScreen].querySelector('.select__year').value;
    let birthday = month + '/' + day + '/' + year;
    if (day != '' && month != '' && year != '') {
        if (isNaN(Date.parse(birthday))) {
            birthday = false;
        }
    } else {birthday = false;}
    return birthday
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
        screenImgs[i].src = "img/zs-" + this.dataset.zodiac + ".png";
    }
    for (let i = 0; i < personalSigns.length; i++) {
        personalSigns[i].innerHTML = this.dataset.zodiac.charAt(0).toUpperCase() + this.dataset.zodiac.slice(1);
    }

    slideNext();
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
    isActiveButton();
});
noTime.addEventListener('change', () => {
    checkError(widget.querySelector('#row_time'));
    isActiveButton();
    if (noTime.checked) {
        timeBirthday.value = null; 
        timeBirthday.disabled = true;
        if (timeType) { timeType.disabled = true;}
    } else {
        timeBirthday.disabled = false;
        if (timeType) { timeType.disabled = false;}
    }
});
timeBirthday.addEventListener('change', () => {
    checkError(widget.querySelector('#row_time'));
    isActiveButton();
});
emailInput.addEventListener('change', () => {
    checkError(formEmail);
    isActiveButton();
});
privacy.addEventListener('change', () => {
    checkError(privacyRow);
    isActiveButton();
});
locationBirthday.addEventListener('change', () => {
    checkError(widget.querySelector('#row_location'));
    if(locationBirthday.value) {checkBtnStatus(btnStatus = true);} else {checkBtnStatus(btnStatus = false);}
});
for(let i = 0; i < selectDate.length; i++) {
    selectDate[i].addEventListener('change', () => {
    if(validateDate() != false) {checkError(widget.querySelector('#row_date'));};
    isActiveButton();
});
}


function checkError(block) {
    block.classList.remove('error');
    block.classList.remove('error-privacy');
}



//check email

function validateEmail(email) {
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
}


//time input

$('document').ready(function () {
      $("#form_time").inputmask("h:s",{ 
        alias: "datetime",
        hourformat: "12",
        "oncomplete": function(){ 
            console.log('123')
            checkError(widget.querySelector('#row_time'));
            isActiveButton();
        },
        "oncleared": function(){ checkBtnStatus(btnStatus = false); }
    });

});

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
                var aida = $('#ak').val();
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

function sendData() {
    console.log(dataObj);
    var dataRequst = {};
    dataRequst.Name = dataObj.name;
    dataRequst.Email = dataObj.email;
    dataRequst.country = dataObj.locationCountry;
    dataRequst.administrative = dataObj.locationAdministrative;
    dataRequst.autocomplete = dataObj.locationAutocomplete;
    dataRequst.locality = dataObj.locationLocality;
    dataRequst.lat = dataObj.locationLat;
    dataRequst.lng = dataObj.locationLng;

    dataRequst.Time = dataObj.timeBirthday;
    dataRequst.TimeType = dataObj.TimeType;

    dataRequst.Sex = 3;
    if (dataObj.sex == 'man') dataRequst.Sex = 1;
    if (dataObj.sex == 'woman') dataRequst.Sex = 2;

    var date = new Date(dataObj.birthday);

    dataRequst.Day = date.getDate();
    dataRequst.Month = date.getMonth() + 1;
    dataRequst.Year = date.getFullYear();
    var d = dataRequst.Day;
    if (d < 10) d = '0' + d;
    var m = dataRequst.Month;
    if (m < 10) m = '0' + m;
    dataRequst.UserBirthday = d + '.' + m + '.' + dataRequst.Year;

    dataRequst.Import = true;

    startDemoRequest(dataRequst);
}

function startDemoRequest(dataRequst) {
    $.ajax({
            url: '/free/user-info/',
            method: 'post',
            dataType: "json",
            data: dataRequst,
            success: function (data) {
                if (data.status == 'success') {
                    finishResult();
                }
            },
        }
    );
}

function finishResult() {
    var Url = '';
    if (typeof mainProdUrl !== "undefined") {
        Url = mainProdUrl;
    }
    var Link = '/free/report/';
    if (typeof masterResultUrl !== "undefined") {
        Link = masterResultUrl;
    }
    window.top.location.href = Url + Link;
}