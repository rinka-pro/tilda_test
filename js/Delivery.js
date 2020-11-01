class Delivery {
	constructor() {
		this.price = 0
		this.deliveryBtn = document.querySelector('#delivery_btn');
	}
	toggleDeliveryFormClass(className) {
		let deliveryForm = document.querySelector('#delivery_address');
		if (className === 'show') {
			deliveryForm.classList.add('show');
		} else {
			deliveryForm.classList.remove('show');
		}
	}
	handleDeliverySelect(option, price) {
		if (option === 'mail' || option === 'express') {
			this.deliveryBtn.disabled = true
			this.toggleDeliveryFormClass('show');
		} else {
			this.toggleDeliveryFormClass('hide');
			this.deliveryBtn.disabled = false
		}
		this.recalcTotalSum(price)
	}
	recalcTotalSum(sum) {
		this.price = Number(totalSum.totalPrice) + Number(sum)
		let totalDeliveryNode = document.querySelector('#total');
		totalDeliveryNode.innerHTML = `<p class="total">К оплате: <span class="total__num">${this.price.toLocaleString()}&#8381;</span></p>`;

	}
	handleNext() {
		totalSum.setSum(this.price)
		window.location.href = "/payment.html"
	}
	render() {
		let deliveryMethods = [{
				title: "Почта России",
				key: "mail",
				price: 250,
				desc: "Срок доставки зависит от удаленности вашего региона"
			},
			{
				title: "Курьерская доставка",
				key: "express",
				price: 400,
				desc: "Срок доставки: 1-2 дня"
			},
			{
				title: "Самовывоз из магазина",
				key: "pickup",
				price: 0,
				desc: ""
			},
		]
		let html = '';
		deliveryMethods.forEach((deliveryMethod) => {
			let formatPrice = deliveryMethod.price === 0 ? 'Бесплатно' : deliveryMethod.price.toLocaleString() + '&#8381;';
			html += `
				<div class="form__radio-group">
					<input class="form__radio-input" id="${deliveryMethod.key}" type="radio" name="delivery_method" onchange="delivery.handleDeliverySelect('${deliveryMethod.key}', '${deliveryMethod.price}')">
					<label class="form__radio-label" for="${deliveryMethod.key}">
						<p class="form__radio-title">
							<span class="form__radio-button"></span>
							<span>${deliveryMethod.title}</span>
						</p>
						<p class="form__radio-price">${formatPrice}</p>
						<p class="form__radio-desc">${deliveryMethod.desc}</p>
					</label>
				</div>
			`
		})
		let deliveryNode = document.querySelector('#delivery');
		deliveryNode.innerHTML = html;

		let actionsHtml = `
			<a href="/contact.html" class="cart__btn-back">Вернуться к оформлению</a>
			<button class="main-btn continue-btn" id="delivery_btn" onclick="delivery.handleNext()">Далее</button>
		`
		let deliveryActionsNode = document.querySelector('#delivery_actions');
		deliveryActionsNode.innerHTML = actionsHtml;
		this.deliveryBtn = document.querySelector('#delivery_btn');

		let addressHtml = `
			<h2 class="page__subtitle">Введите адрес доставки</h1>
			<div class="form__group">
				<input class="form__input" id="name" type="text" placeholder="Имя &ast;" required onblur="delivery.validateForm()">
				<label class="form__label" for="name">Имя &ast;</label>
			</div>
			<div class="form__group">
				<input class="form__input" id="country" type="text" placeholder="Страна &ast;" required onblur="delivery.validateForm()">
				<label class="form__label" for="country">Страна &ast;</label>
			</div>
			<div class="form__group">
				<input class="form__input" id="city" type="text" placeholder="Город &ast;" required onblur="delivery.validateForm()">
				<label class="form__label" for="city">Город &ast;</label>
			</div>
			<div class="form__group">
				<input class="form__input" id="address" type="text" placeholder="Улица, номер дома и квартиры &ast;" required onblur="delivery.validateForm()">
				<label class="form__label" for="address">Улица, номер дома и квартиры &ast;</label>
			</div>
		`
		let deliveryAddressNode = document.querySelector('#delivery_address');
		deliveryAddressNode.innerHTML = addressHtml;

		this.deliveryBtn.disabled = true
	}
	validateForm() {
		let formFields = document.querySelectorAll('#delivery_address .form__input');
		this.deliveryBtn.disabled = true
		let allFilled = true;
		formFields.forEach((item) => {
			if (!item.value) {
				allFilled = false;
				return false;
			}
		});
		if (allFilled) this.deliveryBtn.disabled = false
		return allFilled;
	}
}

const delivery = new Delivery()
delivery.render()