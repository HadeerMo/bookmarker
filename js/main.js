let nameSite = document.getElementById("siteName");
let URLSite = document.getElementById("siteURL");
let bookMarkList = [];

if (localStorage.getItem("favSite") != null) {
    bookMarkList = JSON.parse(localStorage.getItem("favSite"));
    displayData();
}

function addNewSite() {
    let urlFavSite = nameSite.value;
    if (URLSite.value.toLowerCase().includes("https://www.".toLowerCase())==false
    && URLSite.value.toLowerCase().includes("http://www.".toLowerCase())==false){
        if(URLSite.value.toLowerCase().includes("www.".toLowerCase())==false){
            urlFavSite="https://www." + URLSite.value;
        }
        else{
            urlFavSite="https://" + URLSite.value;
        }
    }   
    if(validName()==true && validURL()==true && checkName() == false) {
        var listOfSite = {
            name: nameSite.value,
            siteURL: urlFavSite
        }
        bookMarkList.push(listOfSite);
        localStorage.setItem("favSite", JSON.stringify(bookMarkList));
        displayData();
        clearInputs();
    }
}
function displayData() {
    let temp = "";
    for (let i = 0; i < bookMarkList.length; i++) {
        temp += `<div class="w-90 m-auto mt-4 p-4 favList">
        <h3 class="fs-4 fw-bold w-25 mt-2 float-start">` + bookMarkList[i].name + `</h3>
        <a style="text-decoration: none;" target="_blank" href="${bookMarkList[i].siteURL}"><button class="px-3 py-2 mb-5 border-0 text-white rounded ms-5 mt-2" >Visit</button></a>
        <button class="px-3 py-2 mb-5 border-0 text-white rounded mt-2 ms-2 " style="background-color:#910004 ;" onclick="deleteSite(`+ i + `)" >Delete</button>
        <div class="float-none"></div>
        </div>`
    }
    document.getElementById("favList").innerHTML = temp;
}
function deleteSite(i) {
    bookMarkList.splice(i, 1);
    localStorage.setItem("favSite", JSON.stringify(bookMarkList))
    displayData()
}

function validName() {
    document.getElementById("alertCheck").style.display = "none";
    var regx = /^\w{3,10}$/;
    var testValid = false;
    if (regx.test(nameSite.value) == true) {
        document.getElementById("alertName").style.display = "none";
        testValid = true;
    }
    else {
        document.getElementById("alertName").style.display = "block";
        testValid = false;
    }
    return testValid;

}
function validURL() {
    var regx = /^(((http|https):\/\/(WWW|www)\.)|((WWW|www))\.)?\w{3,10}\.[A-Za-z]{2,3}$/;
    var testValid = false;
    if (regx.test(URLSite.value) == true) {
        document.getElementById("alerturl").style.display = "none";
        testValid = true;
    }
    else {
        document.getElementById("alerturl").style.display = "block";
        testValid = false;
    }

    return testValid;

}
function checkName() {
    var testInputName = false;
    for (var i = 0; i < bookMarkList.length; i++) {
        if (nameSite.value.toLowerCase().includes(bookMarkList[i].name.toLowerCase())) {
            testInputName = true;
            document.getElementById("alertCheck").style.display = "block";
            return testInputName;
        }
    }
    return testInputName;
}
// function checkURL() {
     
// }
function clearInputs(){
    nameSite.value="";
    URLSite.value="";
}