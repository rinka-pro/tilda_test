class CartPopup {
	constructor() {
		this.cartNode = document.querySelector('#header_cart_popup') || ''
	}
	handleCloseCart() {
		this.cartNode.classList.remove('header-cart__el--active')
		document.removeEventListener('click', headerEl.handleClickOutside)
	}
	handleProductDelete(id) {
		const productsStore = localStorageUtil.getProducts();
		localStorageUtil.removeProduct(id, productsStore)
		headerEl.renderCounter(productsStore.length)
		productsEl.render()
		cartEl.render()
	}
	getProductsStoreData() {
		const productsStore = localStorageUtil.getProducts();
		const productsArray = []
		const productsStoreIndexes = productsStore.map((item) => {
			return item.id
		})
		productsStoreIndexes.forEach((id) => {
			let productInList = productsList.find(item => item.id === id)
			let productInStore = productsStore.find(item => item.id === id)
			productInList.quantity = productInStore.quantity
			productsArray.push(productInList)
		})
		return productsArray
	}
	render() {
		let totalPrice = 0;
		let items = '';
		const productsInStorage = this.getProductsStoreData()

		productsInStorage.forEach(({ id, title, desc, img, price, quantity }) => {
			let totalItemPrice = price * quantity
			items += `
						<li class="header-cart__item cart-item">
							<div class="cart-item__img">
								<img width="50" height="50" src="${img}" alt="${title}">
							</div>
							<div class="cart-item__info">
								<a href="#" class="cart-item__title">${title}</a>
								<p class="cart-item__price">${price.toLocaleString()}&#8381;/шт</p>
								<p class="cart-item__price--total">${totalItemPrice.toLocaleString()}&#8381;</p>
							</div>
							<div class="cart-item__quantity">
								<button class="quantity__btn-cart less" onclick="localStorageUtil.toggleProductQuantity('${id}', 'decrease', 'home')">-</button>
								<input type="number" class="quantity__num-cart" value="${quantity}" oninput="localStorageUtil.changeQuantity('${id}', value, 'home')">
								<button class="quantity__btn-cart more" onclick="localStorageUtil.toggleProductQuantity('${id}', 'increase', 'home')">+</button>
							</div>
							<button class="delete-btn" onclick="cartEl.handleProductDelete('${id}')"></button>
						</li>
					`
			totalPrice += totalItemPrice;
		})
		let html = '';
		if (productsInStorage.length > 0) {
			html = `
						<div class="header-cart__popup">
							<ul class="header-cart__list">
							${items}
							</ul>
							<div class="header-cart__footer">
								<p class="header-cart__total">Всего: <span class="total__price">${totalPrice.toLocaleString()}&#8381;</span></p>
								<div class="header-cart__actions">
									<!-- <button class="popup-back-btn" onclick="cartEl.handleCloseCart()">Продолжить покупки</button> -->
									<a href="/cart.html" class="checkout-btn">В корзину</a>
								</div>
							</div>
						</div>
					`
		} else {
			html = ``
		}
		this.cartNode.innerHTML = html;
	}
}

const cartEl = new CartPopup()