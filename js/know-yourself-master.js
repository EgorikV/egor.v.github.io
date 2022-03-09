let widget = document.querySelector('.know-yourself-master-box');
let pages = widget.querySelectorAll('.page');
let pButton = widget.querySelectorAll('.first_button');
let screens = widget.querySelectorAll('.screen'); // Блоки анкеты
let stories = widget.querySelectorAll('.story');
let storyBtn = widget.querySelector('.next_story');
let stepText = widget.querySelector('.form-block__steps');
let nextButtons = widget.querySelectorAll('.next_btn');
let chooseSex = widget.querySelectorAll('.sex');
let checkbox = widget.querySelectorAll('.checkbox');
let noTime = widget.querySelector('#no_time');
let timeBirthday = widget.querySelector('#time');
let noTimePartner = widget.querySelector('#no_time_partner');
let timeType = widget.querySelector('#timeType');
let locationBirthday = widget.querySelector('#location');
let emailInput = widget.querySelector('#email_input');
let formEmail = widget.querySelector('#row_email');

const dataObj = {}; // Обьект с данными
let currentScreen = 0;
screens[0].classList.add('active');
stories[0].classList.add('active');

let currentPage = 0;
let currentStory = 0;

//change pages

for (let i = 0; i < pButton.length; i++) {
    pButton[i].addEventListener('click', pageNext);
}

function pageNext() {
    pages[currentPage].classList.remove('active');
    currentPage++;
    pages[currentPage].classList.add('active');   
}

//change stories

storyBtn.addEventListener('click', storyNext);

function storyNext() {
    stories[currentStory].classList.remove('active');
    currentStory++;
    stories[currentStory].classList.add('active');
    if (currentStory == stories.length -1) {
        storyBtn.style.opacity = "0";
    }
}

//slide forward screens

for (let i = 0; i < nextButtons.length; i++) {
    nextButtons[i].addEventListener('click', slideNext);
}

function changerSlides() {
    //for the last screen
    if (currentScreen == (screens.length - 1)) {
        sendData();
    } else {
    // for other screens
    screens[currentScreen].classList.remove('active');
    currentScreen++;
    screens[currentScreen].classList.add('active');
    }
}

//slide back

//backButton.addEventListener('click', slideBack);

function slideBack(){
    if (currentScreen !== 0) {
    screens[playScreens[currentScreen]].classList.remove('active');
    currentScreen--;
    screens[playScreens[currentScreen]].classList.add('active');
    }
    if (currentScreen == 0) {
        backButton.style.display = 'none';
    }
    setStep();
}


//validate fields and step forward

function slideNext() {
    let errorStatus = true;
    
    if (screens[currentScreen].id == "personal") {
    	if (screens[currentScreen].querySelector('#name').value !== '') {
	    	dataObj.name = screens[currentScreen].querySelector('#name').value;
        } else { 
            screens[currentScreen].querySelector('#row_name').classList.add('error');
            errorStatus = false;
        }
    	if (!dataObj.sex) { 
            widget.querySelector('#row_sex').classList.add('error');
            errorStatus = false;
        };

        let day = screens[currentScreen].querySelector('.select__day').value;
		let month = screens[currentScreen].querySelector('.select__month').value;
		let year = screens[currentScreen].querySelector('.select__year').value;
		dataObj.birthday = day + '/' + month + '/' + year;
        if (isNaN(Date.parse(dataObj.birthday))) {
            screens[currentScreen].querySelector('#row_date').classList.add('error');
        }
        
        if (timeBirthday.value !== '' || noTime.checked) {
            dataObj.timeBirthday = timeBirthday.value;
            if( timeType !== 'undefined' && timeType !== null) {
                dataObj.TimeType = timeType.value
            }
        } else { 
            screens[currentScreen].querySelector('#row_time').classList.add('error');
            errorStatus = false;
        }
        if (locationBirthday.value !== '') {
            dataObj.locationBirthday = locationBirthday.value;
            dataObj.locationAutocomplete =  widget.querySelector('#autocomplete').value;
            dataObj.locationLocality =  widget.querySelector('#locality').value;
            dataObj.locationAdministrative =  widget.querySelector('#administrative').value;
            dataObj.locationCountry =  widget.querySelector('#country').value;
            dataObj.locationLat = widget.querySelector('#lat').value;
            dataObj.locationLng = widget.querySelector('#lng').value;
        } else { 
            screens[currentScreen].querySelector('#row_location').classList.add('error');
            errorStatus = false;
        }
        if (validateEmail(emailInput.value)) {
            dataObj.email = emailInput.value;
        } else {
            formEmail.classList.add('error');
            errorStatus = false;
        }
    } 
    if (errorStatus) {changerSlides();}
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
    if (screens[currentScreen].id == "personal") {
            dataObj.sex = this.dataset.sex;
    }
}

for (let i = 0; i < chooseSex.length; i++) {
    chooseSex[i].addEventListener('click',chosenSex);
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

widget.querySelector('#name').addEventListener('change', () => {checkError(widget.querySelector('#row_name'));});
noTime.addEventListener('change', () => {
    checkError(widget.querySelector('#row_time'));
    if (noTime.checked) {
            timeBirthday.value = null; 
            timeBirthday.disabled = true;
            if (timeType) { timeType.disabled = true;}
        } else {
            timeBirthday.disabled = false;
            if (timeType) { timeType.disabled = false;}
        }
});
timeBirthday.addEventListener('change', () => {checkError(widget.querySelector('#row_time'));});
emailInput.addEventListener('change', () => {checkError(formEmail);});
for (let i = 0; i < chooseSex.length; i++) {
    chooseSex[i].addEventListener('click',() => {checkError(widget.querySelector('#row_sex'));});
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

function sendData() {
    console.log(dataObj);
}

//time input

$('document').ready(function () {
      $(".mask-time").inputmask("h:s",{ 
        alias: "datetime",
        hourformat: "24"
    });

});

//autocomplite


$( document ).ready(function() {
    var form = $('#row_location');
    initAutocomplete(form);
});

$( document ).ready(function() {
    var form = $('#row_location_partner');
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
            }
        });
    });

    if ($('#PartnerAutocomplete').length > 0) {
        if ($('#PartnerAutocomplete').val() != '') {
            $("#location_partner").data('placeholder', $('#PartnerAutocomplete').val());
        }

        $("#location_partner").select2({
            ajax: {
                delay: 500,
                url: 'https://test.astromix.net/ajax/location/',
                dataType: 'json',
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

            $('#row_location_partner').removeClass('error');
            $('#PartnerLat').val('');
            $('#PartnerLng').val('');
            $('#PartnerLocality').val('');
            $('#PartnerAdministrative').val('');
            $('#PartnerCountry').val('');
            $('#PartnerAutocomplete').val(data.text);

            $.ajax({
                url: 'https://test.astromix.net/ajax/locationselect/',
                method: 'post',
                data: 'id=' + data.id,
                success: function (data) {
                    if (data.status == 'OK') {
                        $('#PartnerLat').val(data.lat);
                        $('#PartnerLng').val(data.lng);
                        $('#PartnerLocality').val(data.locality);
                        $('#PartnerAdministrative').val(data.administrative);
                        $('#PartnerCountry').val(data.country);
                    }
                }
            });

        });
    }
}