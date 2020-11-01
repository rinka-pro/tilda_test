class Products {
	constructor() {
		this.classNameActive = 'add-btn--active';
		this.labelAdd = 'В корзину'
		this.labelRemove = 'В корзине'
	}
	handleSetLS(el, id, quantityNum) {
		const { pushProduct, products } = localStorageUtil.toggleProduct(id, quantityNum, 'home');
		const cartBtn = document.querySelector('#cart_btn')
		if (pushProduct) {
			cartBtn.classList.remove('animate')
			cartBtn.classList.add('animate')
			setTimeout(() => {
				cartBtn.classList.remove('animate')
			}, 1000);
			el.classList.add(this.classNameActive);
			el.innerHTML = this.labelRemove;
		} else {
			el.classList.remove(this.classNameActive);
			el.innerHTML = this.labelAdd;
		}
		headerEl.renderCounter(products.length)
		cartEl.render()
	}
	render() {
		const productsStore = localStorageUtil.getProducts();
		let items = '';

		productsList.forEach(({ id, title, desc, img, price }) => {
			let activeClass = '',
				activeTxt = '';
			let quantity = 1;
			let productIndex = productsStore.findIndex(item => item.id === id);
			if (productIndex === -1) {
				activeTxt = this.labelAdd;
			} else {
				activeClass = this.classNameActive
				activeTxt = this.labelRemove
				quantity = productsStore[productIndex].quantity
			}
			items += `
			<li class="product">
				<div class="product__img">
					<img width="200" height="300" src="${img}" alt="${title}">
				</div>
				<p class="product__title">${title}</p>
				<p class="product__desc">${desc}</p>
				<div class="product__footer">
					<p class="product__price">${price.toLocaleString()}&#8381;</p>
					<div class="product__actions">
						<button class="add-btn ${activeClass}"
						onclick="productsEl.handleSetLS(this, '${id}', ${quantity})">
							${activeTxt}
						</button>
						<div class="quantity" id="quantity">
							<button class="quantity__btn less" onclick="localStorageUtil.toggleProductQuantity('${id}', 'decrease', 'home')">-</button>
							<input type="number" class="quantity__num" id="quantity_num" value="${quantity}" onchange="localStorageUtil.changeQuantity('${id}', value, 'home')">
							<button class="quantity__btn more" onclick="localStorageUtil.toggleProductQuantity('${id}', 'increase', 'home')">+</button>
						</div>
					</div>
				</div>
			</li>
			`
		})

		const productsNode = document.querySelector('#products')
		productsNode.innerHTML = items;
	}
}

const productsEl = new Products()
productsEl.render()