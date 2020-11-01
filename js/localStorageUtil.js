class LocalStorageUtil {
	constructor() {
		this.keyName = 'products';
	}
	getProducts() {
		const productsInStorage = localStorage.getItem(this.keyName);
		if (productsInStorage) return JSON.parse(productsInStorage);
		return [];
	}
	findProductIndex(id) {
		return this.getProducts().findIndex(item => item.id === id)
	}
	toggleProduct(id) {
		let products = this.getProducts();
		let pushProduct = false;
		if (this.findProductIndex(id) === -1) {
			products.push({ id, quantity: '1' });
			pushProduct = true;
			localStorage.setItem(this.keyName, JSON.stringify(products));
		} else {
			this.removeProduct(id, products)
		}
		return {
			pushProduct,
			products
		}
	}
	toggleProductQuantity(id, sign, page) {
		let products = this.getProducts();
		if (this.findProductIndex(id) !== -1) {
			let product = products[this.findProductIndex(id)];
			if (sign === 'increase') {
				product.quantity++
			} else {
				if (product.quantity > 1) {
					product.quantity--
				}
			}
			localStorage.setItem(this.keyName, JSON.stringify(products));
		}
		if (page === 'home') {
			productsEl.render()
			cartEl.render()
		}
		if (page === 'cart') {
			cartPageEl.render()
		}
	}
	changeQuantity(id, val, page) {
		let products = this.getProducts();
		if (this.findProductIndex(id) !== -1) {
			let product = products[this.findProductIndex(id)];
			product.quantity = val
			localStorage.setItem(this.keyName, JSON.stringify(products));
		}
		if (page === 'home') {
			productsEl.render()
			cartEl.render()
		}
		if (page === 'cart') {
			cartPageEl.render()
		}
	}
	removeProduct(id, products) {
		products.splice(this.findProductIndex(id), 1);
		localStorage.setItem(this.keyName, JSON.stringify(products));
		return products
	}
	clearStorage() {
		localStorage.clear()
	}
	setSum(sum) {
		localStorage.setItem('total_sum', sum)
	}
	getSum() {
		return localStorage.getItem('total_sum')
	}
}

const localStorageUtil = new LocalStorageUtil();