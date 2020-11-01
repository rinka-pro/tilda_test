class TotalSum {
	constructor() {
		this.totalPrice = 0
	}
	setSum(sum) {
		this.totalPrice = sum;
		localStorageUtil.setSum(this.totalPrice);
	}
	render() {
		const productsStore = localStorageUtil.getProducts();
		if (localStorageUtil.getSum()) {
			this.totalPrice = localStorageUtil.getSum()
		} else {
			productsList.forEach(({ id, title, desc, img, price }) => {
				if (productsStore.indexOf(id) !== -1) {
					this.totalPrice += price;
				}
			})
		}
		localStorageUtil.setSum(this.totalPrice)
		const html = `
			<p class="total">К оплате: <span class="total__num">${Number(this.totalPrice).toLocaleString()}&#8381;</span></p>
			`
		let totalNode = document.querySelector('#total');
		totalNode.innerHTML = html;
	}
}

const totalSum = new TotalSum()
totalSum.render()