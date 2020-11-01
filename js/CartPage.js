class CartPage {
	constructor() {
		this.totalPrice = 0;
	}
	handleProductDelete(id) {
		const productsStore = localStorageUtil.getProducts();
		localStorageUtil.removeProduct(id, productsStore);
		cartPageEl.render()
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
				<li class="cart__item">
						<div class="item__img">
							<img width="50" height="50" src="${img}" alt="${title}">
						</div>
						<p class="item__title">${title}</p>
						<div class="item__quantity">
						<button class="quantity__btn-cart less" onclick="localStorageUtil.toggleProductQuantity('${id}', 'decrease', 'cart')">-</button>
						<input type="number" class="quantity__num-cart" value="${quantity}" oninput="localStorageUtil.changeQuantity('${id}', value, 'cart')">
						<button class="quantity__btn-cart more" onclick="localStorageUtil.toggleProductQuantity('${id}', 'increase', 'cart')">+</button>
						</div>
						<p class="item__price">${price.toLocaleString()}&#8381;/шт</p>
						<p class="item__price--total">${totalItemPrice.toLocaleString()}&#8381;</p>
						<button class="delete-btn" onclick="cartPageEl.handleProductDelete('${id}')"></button>
					</li>
				`
			totalPrice += totalItemPrice;
		})
		this.totalPrice = totalPrice;
		localStorageUtil.setSum(this.totalPrice)
		let html = '';
		if (productsInStorage.length > 0) {
			html = `
			<ul class="cart__list">
				${items}
			</ul>
			<p class="total">К оплате: <span class="total__num">${this.totalPrice.toLocaleString()}&#8381;</span></p>
			<div class="cart__footer">
				<a href="/" class="cart__btn-back">Продолжить покупки</a>
				<a href="/contact.html" class="main-btn continue-btn">Далее</a>
			</div>
			`
		} else {
			html = `
				<p class="cart-empty">В корзине пусто</>
				<div class="cart__footer">
					<a href="/" class="cart__btn-back">Вернуться в каталог</a>
				</div>
			`
		}

		let cartPageNode = document.querySelector('#cart');
		cartPageNode.innerHTML = html;
	}
}

const cartPageEl = new CartPage()
cartPageEl.render()