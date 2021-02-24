const sendForm = createForm => {
  createForm = document.getElementById('create-sign__form');
  const errorMessage = 'Что-то пошло не так';
  const loadingMessage = 'Загрузка...';
  const successMessage = 'Спасибо, мы скоро с вами свяжемся';
  const statusMessage = document.createElement('span');
  const spiner = document.querySelector('.loader');
  const messageBlock = document.querySelector('.output-message');
  const inputs = document.querySelectorAll('.create-sign__form-input');
  const output = document.querySelector('.create-sign__output');
  const counterText = document.querySelector('.create-sign__form-info_counter');
  const addressText = document.querySelector('.create-sign__form-info_address');
  const siteText = document.querySelector('.create-sign__form-info_site');
  const phoneText = document.querySelector('.create-sign__form-info_phone');
  const createBtn = document.querySelector('.create-sign__form-button');
  counterText.classList.add('counter');
  statusMessage.classList.add('message');
  createBtn.disabled = true;

  const postData = formData => fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: formData,
    credentials: 'include'
  });

  const validateInputs = (selector, regPattern, regExp, regExp2) => {
    selector.setAttribute('pattern', regPattern);
    selector.value = selector.value.replace(regExp, '');
    if (selector.value.length > 18) {
      selector.value = selector.value.replace(regExp2, '');
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

  inputs.forEach(item => {
    item.addEventListener('input', e => {
      const target = e.target;

      if (target.matches('#company')) {
        validateInputs(target, '[а-яА-ЯЁё0-9\\s]{2,18}', /[a-zA-Z.,@!#$%^&*\\()\\{}|/]$/, /.$/, counterText);
        showCounter(target, /[А-Яа-я0-9\s\\"\\']{1,18}$/);
      }
      if (target.matches('#address')) {
        validateInputs(target, '[а-яА-ЯЁё0-9.,\\s]{1,}', /[a-zA-Z!@#$%^&*\\()\\{}\\+=_"']$/, addressText);
        addressText.textContent = 'Пример: г.Москва ул.Арбат д.1 к.2 с.1';
      }
      if (target.matches('#site')) {
        siteText.textContent = 'Пример: https://www.google.com';
      }
      if (target.matches('#phone')) {
        if (target.value !== '') {
          createBtn.disabled = false;
        }
        validateInputs(target, '[0-9\\+]{11,12}', /[^+\-()\d]/);
        phoneText.textContent = 'Пример: 89999999999';
      }
    });
  });

  inputs.forEach(item => {
    item.addEventListener('focus', e => {
      const target = e.target;

      // if (target.matches('#company')) {
      //   showInfoText(target, counterText);
      // }
      // if (target.matches('#address')) {
      //   showInfoText(target, addressText);
      // }
      // if (target.matches('#site')) {
      //   showInfoText(target, siteText);
      // }
      if (target.matches('#phone')) {
        showInfoText(target, phoneText);
      }
    });
  });

  createForm.addEventListener('change', () => {
    // inputs.forEach(item => {
    //   if (item.value === '') {
    //     createBtn.disabled = true;
    //   } else {
    //     createBtn.disabled = false;
    //   }
    // });
  });

  const showLoadMessage = () => {
    statusMessage.textContent = loadingMessage;
    statusMessage.style.display = 'block';
    spiner.style.display = 'block';
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
    postData(JSON.stringify(body))
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Status network not 200');
        }
        statusMessage.textContent = successMessage;
        spiner.style.display = 'none';
      })
      .catch(error => {
        statusMessage.textContent = errorMessage;
        spiner.style.display = 'none';
        console.error(error);
      })
      .then(() => {
        inputs.forEach(item => {
          item.value = '';
        });
        counterText.textContent = '';
        output.textContent = '';
        addressText.textContent = '';
        siteText.textContent = '';
        phoneText.textContent = '';
        createBtn.disabled = true;
        setTimeout(() => {
          statusMessage.remove();
        }, 3000);
      });
  });

};

export default sendForm;
