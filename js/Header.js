class Header {
	constructor() {
		this.count = 0
	}
	handleOpenCartPopup() {
		cartEl.cartNode.classList.add('header-cart__el--active')
		document.addEventListener('click', this.handleClickOutside);
	}
	handleClickOutside(event) {
		let cart = document.querySelector('#header_cart_wrapper')
		let isClickInside = cart.contains(event.target);
		if (!isClickInside) {
			cartEl.handleCloseCart();
		}
	}
	updateCounter() {
		let counter = document.querySelector('#header_cart_counter');
		const productsStore = localStorageUtil.getProducts();
		counter.value = productsStore.length
		if (counter.value == 0) {
			counter.classList.add('hide')
		} else {
			counter.classList.remove('hide')
		}
	}
	render(count) {
		let html = `
		<nav class="main-nav container">
			<ul class="nav__list">
				<li class="nav__item nav__item--home">
					<a href="/" class="nav__link"></a>
				</li>
			</ul>
			<div class="header-cart__wrapper" id="header_cart_wrapper">
				<a href="/cart.html" class="header-cart__btn" id="cart_btn" onclick="headerEl.handleOpenCartPopup()">
					<i class="header-cart__btn-icon"></i>
					Корзина
					<span class="header-cart__counter" id="header_cart_counter">${count}</span>
				</a>
				<div class="header-cart__el" id="header_cart_popup"></div>
			</div>
		</nav>
		`
		const headerNode = document.querySelector('#header')
		headerNode.innerHTML = html;
		headerEl.renderCounter(count)
		cartEl.cartNode = document.querySelector('#header_cart_popup')
		cartEl.render()
	}
	renderCounter(count) {
		const headerCounterNode = document.querySelector('#header_cart_counter')
		headerCounterNode.innerHTML = `${count}`;
		let counter = document.querySelector('#header_cart_counter');
		if (count == 0) {
			counter.classList.add('hide')
		} else {
			counter.classList.remove('hide')
		}
	}
}

const headerEl = new Header()
const productsNum = localStorageUtil.getProducts();
headerEl.render(productsNum.length)