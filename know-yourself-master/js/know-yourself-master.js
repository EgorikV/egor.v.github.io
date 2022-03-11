const demoUrls = [];
demoUrls.push('url_0'); //url for currentStory = 0
demoUrls.push('url_1'); //url for currentStory = 1
demoUrls.push('url_0'); //url for currentStory = 2

const showcaseUrl = 'showcase_url'; //url for showcase button



let widget = document.querySelector('.know-yourself-master-box');
let pages = widget.querySelectorAll('.page');
let screens = widget.querySelectorAll('.screen');
let stories = widget.querySelectorAll('.story');

//buttons
let pButton = widget.querySelectorAll('.first_button');
let storyBtn = widget.querySelector('.next_story');
let nextButtons = widget.querySelectorAll('.next_btn');
let showcaseBtn = widget.querySelector('.showcase_btn');
let demoBtn = widget.querySelector('.demo_btn');


//inputs and rows
let chooseSex = widget.querySelectorAll('.sex');
let checkbox = widget.querySelector('.checkbox');
let noTime = widget.querySelector('#no_time');
let timeBirthday = widget.querySelector('#time');
let timeType = widget.querySelector('#timeType');
let selectDate = widget.querySelectorAll('select.form__input');
let locationBirthday = widget.querySelector('#location');
let emailInput = widget.querySelector('#email_input');
let formEmail = widget.querySelector('#row_email');

let dataObj = {}; // Обьект с данными

let currentPage = 0;
let currentScreen = 0;
screens[0].classList.add('active');
let currentStory = 0;
stories[0].classList.add('active');



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
        widget.querySelector('.button_box').style.display = "none";
    }
}



//set redirects

demoBtn.addEventListener('click', () => {
    window.top.location.href = demoUrls[currentStory];
});

showcaseBtn.addEventListener('click', () => {
    window.top.location.href = showcaseUrl;
});



//slide forward screens

for (let i = 0; i < nextButtons.length; i++) {
    nextButtons[i].addEventListener('click', () => {
        if (screens[currentScreen].id == "form") {
            slideNext();
        } else {
            changerSlides();
        }
    });
}

function changerSlides() {
    screens[currentScreen].classList.remove('active');
    currentScreen++;
    screens[currentScreen].classList.add('active');

    //launch emulator of progressbar on "loader" screens
    if (screens[currentScreen].id == "progress") {myLoader();};
}



//validate fields and step forward

function slideNext() {
    let errorStatus = true;

    if (screens[currentScreen].querySelector('#name').value !== '') {
        dataObj.Name = screens[currentScreen].querySelector('#name').value;
    } else { 
        screens[currentScreen].querySelector('#row_name').classList.add('error');
        errorStatus = false;
    }
    if (!dataObj.Sex) { 
        widget.querySelector('#row_sex').classList.add('error');
        errorStatus = false;
    };
    if (validateDate() != false) {
        var date = new Date(validateDate());
        dataObj.Day = date.getDate();
        dataObj.Month = date.getMonth() + 1;
        dataObj.Year = date.getFullYear();
        var d = dataObj.Day;
        if (d < 10) d = '0' + d;
        var m = dataObj.Month;
        if (m < 10) m = '0' + m;
        dataObj.UserBirthday = d + '.' + m + '.' + dataObj.Year;
    } else {
        widget.querySelector('#row_date').classList.add('error');
        errorStatus = false;
    }
    if (timeBirthday.value !== '' || noTime.checked) {
        dataObj.Time = timeBirthday.value;
        if( timeType !== 'undefined' && timeType !== null) {
            dataObj.TimeType = timeType.value
        }
    } else { 
        screens[currentScreen].querySelector('#row_time').classList.add('error');
        errorStatus = false;
    }
    if (locationBirthday.value !== '') {
        dataObj.locationBirthday = locationBirthday.value;
        dataObj.autocomplete =  widget.querySelector('#autocomplete').value;
        dataObj.locality =  widget.querySelector('#locality').value;
        dataObj.administrative =  widget.querySelector('#administrative').value;
        dataObj.country =  widget.querySelector('#country').value;
        dataObj.lat = widget.querySelector('#lat').value;
        dataObj.lng = widget.querySelector('#lng').value;
    } else { 
        screens[currentScreen].querySelector('#row_location').classList.add('error');
        errorStatus = false;
    }
    if (validateEmail(emailInput.value)) {
        dataObj.Email = emailInput.value;
    } else {
        formEmail.classList.add('error');
        errorStatus = false;
    }
        
    if (errorStatus) {
        changerSlides();
        sendData();
    }
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
    let thisSex = this.dataset.sex;
    dataObj.Sex = 3;
    if (thisSex == 'man') dataObj.Sex = 1;
    if (thisSex == 'woman') dataObj.Sex = 2;
}

for (let i = 0; i < chooseSex.length; i++) {
    chooseSex[i].addEventListener('click',chosenSex);
}



//checkboxe no time

function checkBox() {
	if (noTime.checked) {
		this.classList.add('active');
	} else {
		this.classList.remove('active');
	}
}

checkbox.addEventListener('click',checkBox);




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
};
for(let i = 0; i < selectDate.length; i++) {
    selectDate[i].addEventListener('change', () => {
        if(validateDate() != false) {checkError(widget.querySelector('#row_date'));};
    });
};

function checkError(block) {
    block.classList.remove('error');
    block.classList.remove('error-privacy');
}



//check email

function validateEmail(email) {
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
}

//time mask
$('document').ready(function () {
      $(".mask-time").inputmask("h:s",{ 
        alias: "datetime",
        hourformat: "12",
        "oncomplete": function(){ 
            checkError(widget.querySelector('#row_time'));
        }
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

}



function sendData() {
    dataObj.Import = true;
    console.log(dataObj);
}



// emulator of progressbar on "loader" screens

function myLoader() {
    let progress = widget.querySelector('.progress-fill');
    let progressItems = widget.querySelectorAll('.line');
    let interval = ( 100 / (progressItems.length + 1 ) );
    setInterval( function() {
        progress.value += 0.1;
        for (let i = 0; i < progressItems.length; i++) {
            if (progress.value > interval * (i + 1) ) {
                     progressItems[i].classList.add("active");
            };
        };
    },5);
    setTimeout( function() { changerSlides(); },5000);
}



//scrollbar setup

$( document ).ready(function(){
    $('.scrollbar-inner').scrollbar();
});