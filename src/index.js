'use strict';

//checkbox

const checkbox = document.getElementById('discount-checkbox');



checkbox.addEventListener('change', function(){
    if (this.checked){
        this.nextElementSibling.classList.add('checked');
    } else {
        this.nextElementSibling.classList.remove('checked');
    }
});
//end checkbox


//trashbox

const btnCart = document.getElementById('cart');
const modalCart = document.querySelector('.cart');
const closeBtn = document.querySelector('.cart-close');

btnCart.addEventListener('click', () => {
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () =>{
    modalCart.style.display = '';
    document.body.style.overflow = '';
});


//end trashbox

//add to trashbox

const cards = document.querySelectorAll('.goods .card');
const cartWrapper = document.querySelector('.cart-wrapper');
const cartEmpty = document.getElementById('cart-empty');
const countGoods = document.querySelector('.counter');

cards.forEach((card) => {
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        cartEmpty.remove();
        showData();
    });
});

function showData() {
    const cardsCart = cartWrapper.querySelectorAll('.card');
    countGoods.textContent = cardsCart.length;
}





//end add to trashbox