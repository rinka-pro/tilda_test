class Contact {
	handleNext() {
		window.location.href = "/delivery.html"
	}
	render() {
		let html = `
				<div class="form__group">
					<input class="form__input" id="name" type="text" placeholder="Имя &ast;" required onblur="contact.validateForm()">
					<label class="form__label" for="name">Имя &ast;</label>
				</div>
				<div class="form__group">
					<input class="form__input" id="email" type="email" placeholder="Email &ast;" required onblur="contact.validateForm()">
					<label class="form__label" for="email">Email &ast;</label>
				</div>
				<div class="form__group">
					<input class="form__input" id="phone" type="tel" placeholder="Телефон &ast;" required onblur="contact.validateForm()">
					<label class="form__label" for="phone">Телефон &ast;</label>
				</div>
			`
		let contactNode = document.querySelector('#user_contacts');
		contactNode.innerHTML = html;
		let actionsHtml = `
			<a href="/cart.html" class="cart__btn-back">Вернуться в корзину</a>
			<button class="main-btn continue-btn" onclick="contact.handleNext()" id="contacts_btn">Далее</button>
		`
		let contactActionsNode = document.querySelector('#contact_actions');
		contactActionsNode.innerHTML = actionsHtml;
		let contactsBtn = document.querySelector('#contacts_btn');
		contactsBtn.disabled = true
	}
	validateForm() {
		let formFields = document.querySelectorAll('#user_contacts .form__input');
		let contactsBtn = document.querySelector('#contacts_btn');
		contactsBtn.disabled = true

		let allFilled = true;
		formFields.forEach((item) => {
			if (!item.value) {
				allFilled = false;
				return false;
			}
		});
		if (allFilled) contactsBtn.disabled = false
		return allFilled;
	}
}

const contact = new Contact()
contact.render()