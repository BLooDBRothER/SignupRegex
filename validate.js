const inp = document.querySelectorAll(".inp-fld");
const req = document.getElementById("hint");
const spass = document.getElementById("spass");
const scpass = document.getElementById("scpass");
const eye = document.getElementById("eye");
const otpcnt = document.querySelector(".otp-cnt");

const digit = [document.querySelector(".digit"), document.querySelector(".digit i")];
const mix = [document.querySelector(".mix"), document.querySelector(".mix i")];
const spe = [document.querySelector(".spe"), document.querySelector(".spe i")];
const len = [document.querySelector(".len"), document.querySelector(".len i")];

let cflag = {
    "sign-no": 0,
    "password": 0,
    "sign-cpass": 0
}

const passpattern = {
    "start": /^[^\d].*/,
    "ucase": /[A-Z]+/,
    "lcase": /[a-z]+/,
    "no" :/[\d]+/,
    "special": /[!@#$%%^&*._]+/,
    "length": /^.{8,16}$/
}

const patterns = {
    "sign-no": /^\d{10}$/ 
}

function rtest(data, name){
    let sts = document.querySelector(`.${name}>i`);
    if(patterns[name].test(data.value) == true){
        cflag[name] = 1;
        sts.className = "fas fa-check-circle";
        data.style.border = "2px solid yellowgreen";
    }
    else{
        cflag[name] = 0;
        sts.className = "fas fa-times-circle";
        data.style.border = "2px solid red";
    }
};

function repasscheck(){
    if(scpass.value.length > 7){
        const addic = document.querySelector(".sign-cpass>i");
        if(cflag["password"] == 1 && scpass.value == spass.value){
            scpass.style.border = "2px solid yellowgreen";
            cflag["sign-cpass"] = 1;
            addic.className = "fas fa-check-circle";
        }
        else{
            scpass.style.border = "2px solid red";
            cflag["sign-cpass"] = 0;
            addic.className = "fas fa-times-circle";
        }
    }
    
}

inp.forEach((input) => {  

    input.addEventListener("focus", (e) =>{
        cflag[input.getAttribute("name")] == 1 ? input.style.border = "2px solid yellowgreen" : input.style.border = "2px solid red";
    })

    input.addEventListener("focusout", (e) =>{
        input.style.border = "2px solid transparent";
    })

    input.addEventListener("input", ()=>{
        let name = input.getAttribute("name")
        if(name == "sign-no"){
            if(input.value.length == 0){    document.querySelector(`.${name}>i`).className = "";    }
            else{   rtest(input, name); }
        }
        else{
            const addic = document.querySelector(`.${name}>i`);
            if(input.value.length == 0){    addic.className = " "; return;  }
            if(cflag["password"] == 1 && input.value == spass.value){
                input.style.border = "2px solid yellowgreen";
                cflag["sign-cpass"] = 1;
                addic.className = "fas fa-check-circle";
                otpcnt.style.display = "initial";
            }
            else{
                input.style.border = "2px solid red";
                cflag["sign-cpass"] = 0;
                addic.className = "fas fa-times-circle";
            }
        }
    });
    
});

spass.addEventListener("input", () => {
    if(spass.value.length == 0){
        req.style.display="none";
    }
    if(spass.value.length > 0){
        req.style.display="initial";
    }

    const wrong = "fas fa-times-circle";
    const tick = "fas fa-check-circle"
    const txtclr = (e, tag) => { e ? tag.style.color="#00FFF3" : tag.style.color="#FF0A2F"};

    passpattern["start"].test(spass.value)? (pst = digit[1].className = tick, txtclr(1, digit[0])): (pst = digit[1].className = wrong, txtclr(0, digit[0]));

    if(passpattern["ucase"].test(spass.value) && passpattern["lcase"].test(spass.value) && passpattern["no"].test(spass.value)){
        pmix = mix[1].className = tick;
        txtclr(1, mix[0]);
    }
    else{
        pmix = mix[1].className = wrong;
        txtclr(0, mix[0])
    }
    
    passpattern["special"].test(spass.value)? (pspe = spe[1].className = tick, txtclr(1, spe[0])) : (pspe = spe[1].className = wrong, txtclr(0, spe[0]));
    
    passpattern["length"].test(spass.value)? (plen = len[1].className= tick, txtclr(1, len[0])) : (plen = len[1].className = wrong, txtclr(0, len[0]));

    if(pst == tick && pmix == tick && pspe == tick && plen == tick){
        cflag["password"] = 1;
        spass.style.border = "2px solid yellowgreen"
    }
    else{
        cflag["password"] = 0;
        spass.style.border = "2px solid red"
    }

    repasscheck();
});

spass.addEventListener("focus", () =>{
    cflag["password"] == 1 ? spass.style.border = "2px solid yellowgreen" : spass.style.border = "2px solid red";
});

spass.addEventListener("focusout", () =>{
    spass.style.border = "2px solid transparent";
});

eye.addEventListener("click", () => {
    if(eye.className == "fas fa-eye-slash"){
        eye.className ="fas fa-eye";
        spass.type = "password";
        scpass.type = "password";
    }
    else{
        eye.className = "fas fa-eye-slash";
        spass.type = "text";
        scpass.type = "text";
    }
    
});