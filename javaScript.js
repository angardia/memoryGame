//global vars 
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => parent.querySelectorAll(selector);

const random = (max, min = 0) => Math.round(Math.random() * (max - min)) + min;

const icons = [
    "🤩", "🥦", "🐋", "🍬", "🐰", "🚀", "🍒", "🍕", "🍫", "🐶", "🎉", "🎈", "🍇", "🍔", "🌶", "🍤", "🍱", "🥧", "🍦", "🍭", "🍼", "🍺", "🎱", "⚽", "🏆"];

const cardNum = 8;
const randomIcons = [];
const wrapper = $(".wrapper");

//condition global vars
let winScore = 0;
let openCards = 0;
let lockCards = false;
let firstCard;
let secCard;



//create cards

function createCards() {
    randomArray()
    let afterShuffle = cardContent(randomIcons);
    // console.log(afterShuffle);
    for (let i = 0; i < cardNum; i++) {
        var newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.addEventListener("click", cardFlip);

        let frontCard = document.createElement("div");
        frontCard.classList.add("card__face", "card__face--front");
        frontCard.innerHTML = afterShuffle[i];
        newCard.appendChild(frontCard);

        let backCard = document.createElement("div");
        backCard.classList.add("card__face", "card__face--back");
        newCard.appendChild(backCard);
        $(".wrapper").appendChild(newCard);


    }
    // let cardsNodeList =  $$(".card");

    setTimeout(function () {
        // for (let i = 0; i < cardNum; i++) { $$(".card")[i].classList.toggle("is-flipped"); }
        // cardsNodeList.forEach( e => e.classList.toggle("is-flipped") );  

        $$(".card").forEach(el => el.classList.toggle("is-flipped"));
 }, 2000);
}

//FLIP CARDS

function cardFlip(e) {

    if (lockCards) return;
    if (this === firstCard) return;
    const cardFlipping = e.target.parentNode;

    if (openCards === 0) {
        cardFlipping.classList.toggle("is-flipped");
        firstCard = cardFlipping;
        openCards++;
    }
    else {

        cardFlipping.classList.toggle("is-flipped");
        secCard = cardFlipping;
        openCards++;
    }

    if (openCards === 2) {
        lockCards = true;
        setTimeout(winTest, 1100);
    }
}


function winTest() {


    if (firstCard.textContent === secCard.textContent) {
        firstCard.removeEventListener("click", cardFlip);
        secCard.removeEventListener("click", cardFlip);
        winScore++;
        resetGlobalVars()
    }
    else {

        firstCard.classList.toggle("is-flipped");
        secCard.classList.toggle("is-flipped");
        resetGlobalVars()
        alert("wrong")
    }


    if (winScore === 4) {
        confetti.start(2500, 150);
        setTimeout(function () { location.reload(); }, 5000);

    }

}



//create random array
function randomArray() {
    const copyArr = [...icons];
    for (let i = 0; i < (cardNum / 2); i++) {
        const randIcon = copyArr[random(copyArr.length - 1)];
        randomIcons.push(randIcon);
        copyArr.splice(copyArr.indexOf(randIcon), 1);
    }
}

//cards get content from array 

function cardContent(array) {
    const icons = [...array, ...array];

    for (let i = icons.length - 1; i >= 0; i--) {

        let randomIndex = Math.floor(Math.random() * (i + 1));
        let itemAtIndex = icons[randomIndex];

        icons[randomIndex] = icons[i];
        icons[i] = itemAtIndex;
    }
    return icons;

}

//function to reset condition global vars

function resetGlobalVars() {
    openCards = 0;
    firstCard = undefined;
    secCard = undefined;
    lockCards = false;
}


createCards();