class Payment {
	constructor() {
		this.cardBtn = document.querySelector('#card_btn')
		this.cardBtnTxt = 'Далее'
	}
	togglePaymentFormClass(className) {
		let paymentForm = document.querySelector('#payment_form');
		if (className === 'show') {
			paymentForm.classList.add('show');
		} else {
			paymentForm.classList.remove('show');
		}
	}
	handlePaymentSelect(option) {
		if (option === 'card') {
			this.cardBtnTxt = 'Оплатить'
			this.togglePaymentFormClass('show');
			payment.renderPaymentOptions()
			this.cardBtn.disabled = true
		} else {
			this.cardBtnTxt = 'Далее'
			this.togglePaymentFormClass('hide');
			payment.renderPaymentOptions()
			this.cardBtn.disabled = false
		}

	}
	handlePay() {
		let successPopup = document.querySelector('#success_popup')
		successPopup.classList.add('show');
	}
	handleOrderCompletion() {
		localStorageUtil.clearStorage()
		window.location.href = '/'
	}
	render() {
		let paymentMethods = [{
				title: "Картой на сайте",
				key: "card",
			},
			{
				title: "Наличными курьеру",
				key: "cash",
			},
		]
		let selectPaymentHtml = '';
		paymentMethods.forEach((paymentMethod) => {
			selectPaymentHtml += `
			<div class="form__radio-group">
				<input class="form__radio-input" id="${paymentMethod.key}" type="radio" name="payment_method" onchange="payment.handlePaymentSelect('${paymentMethod.key}')">
				<label class="form__radio-label" for="${paymentMethod.key}">
					<p class="form__radio-title">
						<span class="form__radio-button"></span>
						<span>${paymentMethod.title}</span>
					</p>
				</label>
			</div>
			`
		})

		let paymentNode = document.querySelector('#payment');
		paymentNode.innerHTML = selectPaymentHtml;

		this.renderPaymentOptions()
		this.renderCardForm()
		this.cardBtn.disabled = true

		let popupHtml = `
		<div class="success__popup">
		<p class="success__title">Спасибо за покупку!</p>
		<p class="success__txt">Мы отправили письмо с подтверждением заказа на указанный Вами email.</p>
		<p class="success__heart">❤️</p>
		<button class="success__back" onclick="payment.handleOrderCompletion()">Вернуться в магазин</button>
		</div>
		`
		let paymentPopupNode = document.querySelector('#success_popup');
		paymentPopupNode.innerHTML = popupHtml;
	}
	renderPaymentOptions() {
		let actionsHtml = `
		<a href="/delivery.html" class="cart__btn-back">Вернуться к выбору способа доставки</a>
		<button class="main-btn continue-btn" id="card_btn" onclick="payment.handlePay()">${this.cardBtnTxt}</button>
		`
		let paymentActionsNode = document.querySelector('#payment_actions');
		paymentActionsNode.innerHTML = actionsHtml;
		this.cardBtn = document.querySelector('#card_btn')
	}
	renderCardForm() {
		let formHtml = `
			<h2 class="page__subtitle">Введите данные карты</h1>
			<div class="card__container">
				<div class="cart__front">
					<div class="card__fields">
						<div class="form__group-card">
							<label class="form__label-card" for="country">Номер карты</label>
							<input class="form__input-card" id="country" type="number" required onblur="payment.validateForm()">
						</div>
						<div class="form__group-card form__group-half">
							<label class="form__label-card" for="city">Срок действия</label>
							<input class="form__input-card" id="city" type="text" required onblur="payment.validateForm()">
						</div>
						<div class="form__group-card">
							<label class="form__label-card" for="name">Имя держателя карты</label>
							<input class="form__input-card" id="name" type="text" required onblur="payment.validateForm()">
						</div>
					</div>
					<div class="card__icons">
						<i class="card__icon visa"></i>
						<i class="card__icon mastercard"></i>
					</div>
				</div>
				<div class="cart__back">
					<div class="cart__line"></div>
					<div class="cvc-wrapper">
						<div class="form__group-cvc">
							<label class="form__label-card" for="address">CVC</label>
							<input class="form__input-card" id="address" type="number" required onblur="payment.validateForm()" maxlength="4">
						</div>
					</div>
				</div>
		`
		let paymentFormNode = document.querySelector('#payment_form');
		paymentFormNode.innerHTML = formHtml;
	}

	validateForm() {
		let formFields = document.querySelectorAll('#payment_form .form__input-card');
		this.cardBtn.disabled = true

		let allFilled = true;
		formFields.forEach((item) => {
			if (!item.value) {
				allFilled = false;
				return false;
			}
		});
		if (allFilled) this.cardBtn.disabled = false
		return allFilled;
	}
}

const payment = new Payment()
payment.render()