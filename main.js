const login = document.getElementById('login');
const sign = document.getElementById('signup');
const ph = document.getElementById('ph');
const pass = document.getElementById('pass');
let randno;

function otpsend(){
    if(cflag["sign-no"] == 1 && autofl == 0){
        disable();
        changeic();
        backotp();
    }
    else if(cflag["sign-no"] == 0 && autofl == 0){
        sotp.innerText = "Send OTP"
        check();
    }
    autofl = 1;
}

sotp.addEventListener("click", function(){
    if(check() == 0){
        return;
    }
    disable();
    changeic();
    backotp();
    sotp.innerText = "Resend OTP";
});

function backotp(){
    randno = Math.floor(Math.random() * (9999-1000)) + 1000;
    console.log(randno);
    // $.ajax({
    //     async: true,
    //     crossDomain: true,
    //    url: `http://2factor.in/API/V1/c902a01f-baa3-11eb-8089-0200cd936042/SMS/${phoneno}/${randno}`,
    //     method: "GET",
    //     headers: {
    //         "content-type": "application/x-www-form-urlencoded"
    //     },
    //     data: {},
    //     success: function(data){
    //         console.log(data);
    //     }
    // });
}

function check(){
    if(cflag["sign-no"] == 0){
        sph.focus();
        return 0;
    }
    else if(cflag["password"] == 0){
        spass.focus();
        return 0;
    }
    else if(cflag["sign-cpass"] == 0){
        scpass.focus();
        return 0;
    }
    return 1
}

function disable(){
    sph.disabled = spass.disabled = scpass.disabled = true;
}

function reset(){
    sph.disabled = spass.disabled = scpass.disabled = false;
    sph.value = spass.value = scpass.value = sotpinp.value = "";
    req.style.display = otpcnt.style.display = "none";
    eic.className = ric.className = all.className = "";
    cflag["password"] = cflag["sign-cpass"] = cflag["sign-no"] = autofl = otpvalid = 0;
}

function changeic(){
    eic.className = "fas fa-edit";
    eic.style.cursor = "pointer";
}

eic.addEventListener("click", function() {
    eic.className = " ";
    eic.style.cursor = "unset";
    sph.disabled = false;
});

sign.addEventListener("submit", function(e){
    e.preventDefault();
    console.log("hi")
    if(check() == 0){
        return;
    }
    if(otpvalid == 0){
        sotpinp.focus();
        sign.repor
        return;
    }
    let dataString = JSON.stringify({
        "ph": sph.value,
        "pass": spass.value
    });
    console.log(dataString);
    reset();
});

login.addEventListener("submit", function(e){
    e.preventDefault();
    let dataString = JSON.stringify({
        "ph": ph.value,
        "pass": pass.value
    });
    console.log(dataString);
    $.ajax({
        method: "POST",
        url: "/insert",
        contentType : "application/json",
        data: dataString,
        success: function(data){
            console.log(data);
        }
    });
});