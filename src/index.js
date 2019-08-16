'use strict';

//checkbox
function toggleCheckbox() {

    const checkbox = document.getElementById('discount-checkbox');


    checkbox.addEventListener('change', function () {
        if (this.checked) {
            this.nextElementSibling.classList.add('checked');
        } else {
            this.nextElementSibling.classList.remove('checked');
        }
    });

}
toggleCheckbox();
//end checkbox


//trashbox
function toggleCart() {

    const btnCart = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');
    const closeBtn = document.querySelector('.cart-close');

    btnCart.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        modalCart.style.display = '';
        document.body.style.overflow = '';
    });

}

toggleCart();
//end trashbox

//add to trashbox
function addCart() {
    const cards = document.querySelectorAll('.goods .card');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmpty = document.getElementById('cart-empty');
    const countGoods = document.querySelector('.counter');



    cards.forEach((card) => {
        const btn = card.querySelector('button');

        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            showData();

            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'remove';
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();
            });
        });

    });

    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card');
        const cardsPrice = cartWrapper.querySelectorAll('.card-price');
        const cardTotal = document.querySelector('.cart-total span');
        let sum = 0;
        countGoods.textContent = cardsCart.length;

        cardsPrice.forEach((cardPrice) => {
            let price = parseFloat(cardPrice.textContent);
            sum += price;
        });
        cardTotal.textContent = sum;

        if (cardsCart.length !== 0) {
            cartEmpty.remove();
        } else {
            cartWrapper.appendChild(cartEmpty);
        }



    }

}
addCart();
//end add to trashbox


//filter sale

function actionPage() {

    const cards = document.querySelectorAll('.goods .card');
    const discountCheckbox = document.getElementById('discount-checkbox');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const search = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');


    discountCheckbox.addEventListener('click', () => {
        cards.forEach((elem) => {
            const cardPrice = elem.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            if (((discountCheckbox.checked) && (!elem.querySelector('.card-sale'))) || ((min.value && price < min.value) || (max.value && price > max.value))) {
                    elem.parentNode.style.display = 'none';
                }
             else {
                elem.parentNode.style.display = '';
            }
        });
    });

    function filterPrice(){
        cards.forEach((elem) => {
            const cardPrice = elem.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);

            if ((min.value && price < min.value) || (max.value && price > max.value)){
                elem.parentNode.style.display = 'none';
            } else {
                elem.parentNode.style.display = '';
            }

        });
    }

    max.addEventListener('change', filterPrice);
    min.addEventListener('change', filterPrice);

    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });

    });

    search.addEventListener('keydown', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });
    });

    

}
actionPage();


//end filter sale



//GetData from server
function getData() {
    const goodsWrapper = document.querySelector('.goods');
    return fetch('../db/db.json')
    .then((response) => {
        if (response.ok){
            return response.json();
        } else {
            throw new Error ('error: ' + response.status);
        }
    })
    .then((data) => {
        return data;
    })
    .catch((err) => {
        console.warn(err);
        goodsWrapper.innerHTML = '<div>Oops! something goes wrong</div>';
    });
}
//show cards
function renderCards(data){
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach((good) => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `
                                <div class="card" data-category="${good.category}">
                                
									${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
									<div class="card-img-wrapper">
										<span class="card-img-top"
											style="background-image: url('${good.img}')"></span>
									</div>
									<div class="card-body justify-content-between">
										<div class="card-price" style=""${good.sale ? 'color:red' : ''}">${good.price} Р</div>
										<h5 class="card-title">${good.title}</h5>
										<button class="btn btn-primary">В корзину</button>
									</div>
								</div>
        `;
       goodsWrapper.appendChild(card); 
    });

}

function renderCatalog(){
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const catalogWrapper = document.querySelector('.catalog');
    const catalogBtn = document.querySelector('.catalog-button');
    const goods = document.querySelector('.goods');
    const categories = new Set();

    cards.forEach((card) => {
        categories.add(card.dataset.category);
    });

    categories.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener('click', (event) => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }

        if (event.target.tagName === 'LI') {
            cards.forEach((card) => {
                if (card.dataset.category === event.target.textContent) {
                    goods.appendChild(card.parentNode);
                } else {
                    card.parentNode.remove();
                }
            });
        }
    });

}

getData().then((data) =>{
    renderCards(data);
    toggleCheckbox();
    toggleCart();
    addCart();
    actionPage();
    renderCatalog();
});
//End GetData from server

