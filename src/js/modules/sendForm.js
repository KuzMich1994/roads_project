const sendForm = (createForm, discountForm) => {
  createForm = document.getElementById('create-sign__form');
  discountForm = document.getElementById('discount-form');
  const errorMessage = 'Что-то пошло не так';
  const loadingMessage = 'Загрузка...';
  const successMessage = 'Спасибо, мы скоро с вами свяжемся';
  const statusMessage = document.createElement('span');
  const statusMessage2 = document.createElement('span');
  const spiner = document.querySelector('.loader');
  const spiner2 = document.querySelector('.discount-loader');
  const messageBlock = document.querySelector('.output-message');
  const messageBlock2 = document.querySelector('.output-discount');
  const createSignInputs = document.querySelectorAll('.create-sign__form-input');
  const discountInputs = document.querySelectorAll('.discount__form-input');
  const inputsDiscount = document.querySelectorAll('.discount__form-input');
  const counterText = document.querySelector('.create-sign__form-info_counter');
  const addressText = document.querySelector('.create-sign__form-info_address');
  const siteText = document.querySelector('.create-sign__form-info_site');
  const phoneText = document.querySelector('.create-sign__form-info_phone');
  const phoneText2 = document.querySelector('.discount__form-info_phone');
  const nameText = document.querySelector('.discount__form-info_name');
  const createBtn = document.querySelector('.create-sign__form-button');
  const discountBtn = document.querySelector('.discount__form-button');
  counterText.classList.add('counter');
  statusMessage.classList.add('message');
  statusMessage2.classList.add('message');
  createBtn.disabled = true;
  discountBtn.disabled = true;
  discountBtn.style.filter = 'opacity(20%)';
  createBtn.style.filter = 'opacity(20%)';

  const postData = formData => fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: formData,
    credentials: 'include'
  });

  const validateCompanyInput = (selector, regExp) => {
    if (selector.value.length > 18) {
      selector.value = selector.value.replace(regExp, '');
    }
  };

  const replaceValue = (selector, regExp) => {
    if (selector.value.length > 12) {
      selector.value = selector.value.replace(regExp, '');
    }
  };

  const validateCreateInputs = (selector, regPattern) => {
    const regExp = regPattern.test(selector.value);
    if (regExp) {
      createBtn.disabled = false;
      createBtn.style.filter = 'opacity(100%)';
    } else {
      createBtn.disabled = true;
      createBtn.style.filter = 'opacity(20%)';
    }
  };
  const validateDiscountInputs = (selector, regPattern, regExp2) => {
    const regExp = regPattern.test(selector.value);
    if (selector.value.length > 12) {
      selector.value = selector.value.replace(regExp2, '');
    }
    if (regExp) {
      discountBtn.disabled = false;
      discountBtn.style.filter = 'opacity(100%)';
    } else {
      discountBtn.disabled = true;
      discountBtn.style.filter = 'opacity(20%)';
    }
  };

  const showCounter = (selector, reg) => {
    const regExp = reg.test(selector.value);

    for (let i = 0; i <= selector.value.length; i++) {
      if (regExp) {
        counterText.textContent = `${i} / 18`;
      } else {
        counterText.textContent = `${i} / 18`;
      }
    }
  };

  const showInfoText = (selector, infoText) => {
    if (selector.value === '') {
      infoText.textContent = 'Пожалуйста, заполните это поле';
    }
  };

  createSignInputs.forEach(item => {
    item.addEventListener('input', e => {
      const target = e.target;

      if (target.matches('#company')) {
        validateCompanyInput(target, /.$/);
        showCounter(target, /[А-Яа-я0-9\s\\"\\']{1,18}$/);
      }
      if (target.matches('#address')) {
        // validateInputs(target, '[а-яА-ЯЁё0-9.,\\s]{1,}', /[a-zA-Z!@#$%^&*\\()\\{}\\+=_"']$/, addressText);
        addressText.textContent = 'Пример: г.Москва ул.Арбат д.1 к.2 с.1';
      }
      if (target.matches('#site')) {
        siteText.textContent = 'Пример: https://www.google.com';
      }
      if (target.matches('#phone')) {
        // if (target.value !== '') {
        //   createBtn.disabled = false;
        // }
        validateCreateInputs(target, /[0-9\\+]{11,12}/, /[^+\-()\d]/);
        replaceValue(target, /[0-9]$/);
        phoneText.textContent = 'Пример: 89999999999';
      }
    });
  });

  discountInputs.forEach(item => {
    item.addEventListener('input', e => {
      const target = e.currentTarget;

      if (target.matches('#fio')) {
        // validateInputs(target, '[а-яА-Я]{2,}', /[a-zA-Z0-9!@#$%^&*(){}_=+,./|]$/);
        validateDiscountInputs(target, /^[а-яА-Я]{2,}$/);
        nameText.textContent = 'Не менее двух символов кириллицы';
        if (discountInputs[1].value === '') {
          discountBtn.disabled = true;
          discountBtn.style.filter = 'opacity(20%)';
        }
      }
      if (target.matches('#tel')) {
        // validateDiscountInputs(target, '[0-9\\+]{11,12}', /[^+\-()\d]/);
        validateDiscountInputs(target, /[0-9\\+]{11,12}/, /[0-9]$/);
        phoneText2.textContent = 'Пример: 89999999999';
        if (discountInputs[0].value === '') {
          discountBtn.disabled = true;
          discountBtn.style.filter = 'opacity(20%)';
        }
      }
    });
  });

  createSignInputs.forEach(item => {
    item.addEventListener('focus', e => {
      const target = e.target;

      if (target.matches('#phone')) {
        showInfoText(target, phoneText);
      }
    });
  });

  const showLoadMessage = () => {
    statusMessage.textContent = loadingMessage;
    statusMessage.style.display = 'block';
    spiner.style.display = 'block';
  };
  const showLoadMessageDiscount = () => {
    statusMessage2.textContent = loadingMessage;
    statusMessage2.style.display = 'block';
    spiner2.style.display = 'block';
  };

  let formData;

  document.addEventListener('submit', e => {
    e.preventDefault();
    const target = e.target;

    const body = {};

    if (target.matches('#create-sign__form')) {
      messageBlock.append(statusMessage);
      showLoadMessage();
      formData = new FormData(createForm);
      for (const val of formData) {
        body[val[0]] = val[1];
      }
    }

    if (target.matches('#discount-form')) {
      messageBlock2.append(statusMessage);
      showLoadMessageDiscount();
      formData = new FormData(discountForm);
      for (const val of formData) {
        body[val[0]] = val[1];
      }
    }

    postData(JSON.stringify(body))
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Status network not 200');
        }
        statusMessage.textContent = successMessage;
        spiner.style.display = 'none';
        spiner2.style.display = 'none';
      })
      .catch(error => {
        statusMessage.textContent = errorMessage;
        spiner.style.display = 'none';
        spiner2.style.display = 'none';
        console.error(error);
      })
      .then(() => {
        createSignInputs.forEach(item => {
          item.value = '';
        });
        inputsDiscount.forEach(item => {
          item.value = '';
        });
        counterText.textContent = '';
        addressText.textContent = '';
        siteText.textContent = '';
        phoneText.textContent = '';
        nameText.textContent = '';
        phoneText2.textContent = '';
        createBtn.disabled = true;
        discountBtn.disabled = true;
        discountBtn.style.filter = 'opacity(20%)';
        createBtn.style.filter = 'opacity(20%)';
        setTimeout(() => {
          statusMessage.remove();
          statusMessage2.remove();
        }, 3000);
      });
  });

};

export default sendForm;
