const login = document.getElementById('login');
const sign = document.getElementById('signup');
const ph = document.getElementById('ph');
const pass = document.getElementById('pass');
const signbtn = document.getElementById("si-btn");
const msg = document.querySelector(".msg");
let randno;

function validmsg(message){
    msg.innerHTML = message;
    msg.style.display = "initial";
    setTimeout(()=>{
        msg.innerHTML = message;
        msg.style.display = "none";
    }, 3000)
}

function otpsend(){
    if(cflag["sign-no"] == 1 && autofl == 0){
        disable();
        changeic();
        backotp();
    }
    else if(cflag["sign-no"] == 0 && autofl == 0){
        sotp.className = "fas fa-share-square rotp";
        check();
    }
    autofl = 1;
}

function backotp(){
    randno = Math.floor(Math.random() * (9999-1000)) + 1000;
    // console.log(randno);
    $.ajax({
        async: true,
        crossDomain: true,
        url: `https://2factor.in/API/V1/{API-KEY}/SMS/${sph.value}/${randno}`,
        method: "GET",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        data: {},
        success: function(data){
            validmsg("OTP Sent Check your Mobile no");
        }
    });
}

function mobilecheck(no){
    $.ajax({
        async: true,
        url: `/mobile/${no}`,
        method: "POST",
        data: "",
        success: function(data){
            if(data.status == 1){
                sph.setCustomValidity("Mobile Already Registerd");
                cflag["sign-no"] = 0;
                signbtn.click();
            }
        }
    });
}

function check(){
    if(cflag["sign-no"] == 0){
        sph.focus();
        signbtn.click();
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
    passic.className = "";
    eye.style.right = "20px";
    cflag["password"] = cflag["sign-cpass"] = cflag["sign-no"] = autofl = otpvalid = 0;
}

function changeic(){
    eic.className = "fas fa-edit";
    eic.style.cursor = "pointer";
}

sotp.addEventListener("click", function(){
    if(check() == 0){
        return;
    }
    if(sotp.className == "fas fa-share-square rotp"){
        sotp.className = "fas fa-retweet rotp";
    }
    console.log("inside");
    otpvalid = 0;
    sotpinp.value = "";
    disable();
    changeic();
    backotp();
});

eic.addEventListener("click", function() {
    eic.className = " ";
    eic.style.cursor = "unset";
    sph.disabled = false;
});

sign.addEventListener("submit", function(e){
    formSubmit(e);
});

function formSubmit(e){
    e.preventDefault();
    if(check() == 0){
        return;
    }
    if(otpvalid == 0){
        sotpinp.focus();
        return;
    }
    let dataString = JSON.stringify({
        "ph": sph.value,
        "pass": spass.value
    });
    console.log(dataString);
    $.ajax({
        method: "POST",
        url: "/insert",
        contentType : "application/json",
        data: dataString,
        success: function(data){
            validmsg(data);
        }
    });
    reset();
}

// login.addEventListener("submit", function(e){
//     e.preventDefault();
//     let dataString = JSON.stringify({
//         "ph": ph.value,
//         "pass": pass.value
//     });
//     console.log(dataString);
//     $.ajax({
//         method: "POST",
//         url: "/insert",
//         contentType : "application/json",
//         data: dataString,
//         success: function(data){
//             console.log(data);
//         }
//     });
// });