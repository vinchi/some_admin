

// drop down menu1 - 국적
const optionMenu = document.querySelector("#select-01"),
    selectBtn = optionMenu.querySelector("#select-btn-01"),
    options = optionMenu.querySelectorAll("#option-01"),
    sBtn_text = optionMenu.querySelector("#sBtn-text-01");

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));

options.forEach(option => {
    option.addEventListener("click", () => {
        let selectedOption = option.querySelector("#option-text-01").innerText;
        
        sBtn_text.innerText = selectedOption;

        optionMenu.classList.remove("active");
    });
});

// drop down menu2 - 지역
const optionMenu02 = document.querySelector("#select-02"),
    selectBtn02 = optionMenu02.querySelector("#select-btn-02"),
    options02 = optionMenu02.querySelectorAll("#option-02"),
    sBtn_text02 = optionMenu02.querySelector("#sBtn-text-02");

selectBtn02.addEventListener("click", () => optionMenu02.classList.toggle("active"));

options02.forEach(option02 => {
    option02.addEventListener("click", () => {
        let selectedOption02 = option02.querySelector("#option-text-02").innerText;
        sBtn_text02.innerText = selectedOption02;
        console.log(selectedOption02);
        
        const data = {
            uid: $("#uid").val(),
            region: selectedOption02,
        }
        
        $.ajax({
            type: "POST",
            url: "/api/updateRegion",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).done(function(resp) {
            alert("지역변경이 완료되었습니다.");
        }).fail(function (err) {
            alert(JSON.stringify(err));
        });

        optionMenu02.classList.remove("active");
    });
});

// drop down menu3 - 학력
const optionMenu03 = document.querySelector("#select-03"),
    selectBtn03 = optionMenu03.querySelector("#select-btn-03"),
    options03 = optionMenu03.querySelectorAll("#option-03"),
    sBtn_text03 = optionMenu03.querySelector("#sBtn-text-03");

selectBtn03.addEventListener("click", () => optionMenu03.classList.toggle("active"));

options03.forEach(option03 => {
    option03.addEventListener("click", () => {
        let selectedOption03 = option03.querySelector("#option-text-03").innerText;
        sBtn_text03.innerText = selectedOption03;
        
        const data = {
            uid: $("#uid").val(),
            edu: selectedOption03,
        }
        
        $.ajax({
            type: "POST",
            url: "/api/updateEducation",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).done(function(resp) {
            alert("학력이 변경이 완료되었습니다.");
        }).fail(function (err) {
            alert(JSON.stringify(err));
        });

        optionMenu03.classList.remove("active");
    });
});

// drop down menu3-1 - 명문대인증
const optionMenu03_1 = document.querySelector("#select-03-1"),
    selectBtn03_1 = optionMenu03_1.querySelector("#select-btn-03-1"),
    options03_1 = optionMenu03_1.querySelectorAll("#option-03-1"),
    sBtn_text03_1 = optionMenu03_1.querySelector("#sBtn-text-03-1");

selectBtn03_1.addEventListener("click", () => optionMenu03_1.classList.toggle("active"));

options03_1.forEach(option03_1 => {
    option03_1.addEventListener("click", () => {
        let selectedOption03_1 = option03_1.querySelector("#option-text-03-1").innerText;
        sBtn_text03_1.innerText = selectedOption03_1;
        
        const data = {
            uid: $("#uid").val(),
            job: selectedOption03_1,
        }
        
        $.ajax({
            type: "POST",
            url: "/api/updateEducation",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).done(function(resp) {
            alert("지역변경이 완료되었습니다.");
        }).fail(function (err) {
            alert(JSON.stringify(err));
        });

        optionMenu03_1.classList.remove("active");
    });
});

// drop down menu4 - 직업
const optionMenu04 = document.querySelector("#select-04"),
    selectBtn04 = optionMenu04.querySelector("#select-btn-04"),
    options04 = optionMenu04.querySelectorAll("#option-04"),
    sBtn_text04 = optionMenu04.querySelector("#sBtn-text-04");

selectBtn04.addEventListener("click", () => optionMenu04.classList.toggle("active"));

options04.forEach(option04 => {
    option04.addEventListener("click", () => {
        let selectedOption04 = option04.querySelector("#option-text-04").innerText;
        sBtn_text04.innerText = selectedOption04;

        optionMenu04.classList.remove("active");
    });
});

// drop down menu5 - 전문직인증
const optionMenu05 = document.querySelector("#select-05"),
    selectBtn05 = optionMenu05.querySelector("#select-btn-05"),
    options05 = optionMenu05.querySelectorAll("#option-05"),
    sBtn_text05 = optionMenu05.querySelector("#sBtn-text-05");

selectBtn05.addEventListener("click", () => optionMenu05.classList.toggle("active"));

options05.forEach(option05 => {
    option05.addEventListener("click", () => {
        let selectedOption05 = option05.querySelector("#option-text-05").innerText;
        sBtn_text05.innerText = selectedOption05;

        optionMenu05.classList.remove("active");
    });
});

// drop down menu6 - 대기업인증
const optionMenu06 = document.querySelector("#select-06"),
    selectBtn06 = optionMenu06.querySelector("#select-btn-06"),
    options06 = optionMenu06.querySelectorAll("#option-06"),
    sBtn_text06 = optionMenu06.querySelector("#sBtn-text-06");

selectBtn06.addEventListener("click", () => optionMenu06.classList.toggle("active"));

options06.forEach(option06 => {
    option06.addEventListener("click", () => {
        let selectedOption06 = option06.querySelector("#option-text-06").innerText;
        sBtn_text06.innerText = selectedOption06;

        optionMenu06.classList.remove("active");
    });
});

// drop down menu7 - 사업가인증
const optionMenu07 = document.querySelector("#select-07"),
    selectBtn07 = optionMenu07.querySelector("#select-btn-07"),
    options07 = optionMenu07.querySelectorAll("#option-07"),
    sBtn_text07 = optionMenu07.querySelector("#sBtn-text-07");

selectBtn07.addEventListener("click", () => optionMenu07.classList.toggle("active"));

options07.forEach(option07 => {
    option07.addEventListener("click", () => {
        let selectedOption07 = option07.querySelector("#option-text-07").innerText;
        sBtn_text07.innerText = selectedOption07;

        optionMenu07.classList.remove("active");
    });
});

// drop down menu8 - 고소득인증
const optionMenu08 = document.querySelector("#select-08"),
    selectBtn08 = optionMenu08.querySelector("#select-btn-08"),
    options08 = optionMenu08.querySelectorAll("#option-08"),
    sBtn_text08 = optionMenu08.querySelector("#sBtn-text-08");

selectBtn08.addEventListener("click", () => optionMenu08.classList.toggle("active"));

options08.forEach(option08 => {
    option08.addEventListener("click", () => {
        let selectedOption08 = option08.querySelector("#option-text-08").innerText;
        sBtn_text08.innerText = selectedOption08;

        optionMenu08.classList.remove("active");
    });
});
// drop down menu9 - 고소득인증
const optionMenu09 = document.querySelector("#select-09"),
    selectBtn09 = optionMenu09.querySelector("#select-btn-09"),
    options09 = optionMenu09.querySelectorAll("#option-09"),
    sBtn_text09 = optionMenu09.querySelector("#sBtn-text-09");

selectBtn09.addEventListener("click", () => optionMenu09.classList.toggle("active"));

options09.forEach(option09 => {
    option09.addEventListener("click", () => {
        let selectedOption09 = option09.querySelector("#option-text-09").innerText;
        sBtn_text09.innerText = selectedOption09;

        optionMenu09.classList.remove("active");
    });
});


