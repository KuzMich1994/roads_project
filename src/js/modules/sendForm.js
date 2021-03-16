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
  const inputsDiscount = document.querySelectorAll('.discount__form-input');
  const counterText = document.querySelector('.create-sign__form-info_counter');
  const addressText = document.querySelector('.create-sign__form-info_address');
  const siteText = document.querySelector('.create-sign__form-info_site');
  const phoneText = document.querySelector('.create-sign__form-info_phone');
  const phoneText2 = document.querySelector('.discount__form-info_phone');
  const nameText = document.querySelector('.discount__form-info_name');
  counterText.classList.add('counter');
  statusMessage.classList.add('message');
  statusMessage2.classList.add('message');

  const postData = formData => fetch('./send.php', {
    method: 'POST',
    body: formData,
  });

  const validateCompanyInput = (selector, regExp) => {
    if (selector.value.length > 18) {
      selector.value = selector.value.replace(regExp, '');
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

  createSignInputs.forEach(item => {
    item.addEventListener('input', e => {
      const target = e.target;

      if (target.matches('#company')) {
        validateCompanyInput(target, /.$/);
        showCounter(target, /[А-Яа-я0-9\s\\"\\']{1,18}$/);
      }
      if (target.matches('#address')) {
        addressText.textContent = 'Пример: г.Москва ул.Арбат д.1 к.2 с.1';
      }
      if (target.matches('#email')) {
        siteText.textContent = 'Пример: mail@mail.ru';
      }
    });
  });

  const showLoadMessage = () => {
    statusMessage.textContent = loadingMessage;
    statusMessage.style.display = 'block';
    spiner.style.display = 'block';
  };

  // let formData;

  document.addEventListener('submit', e => {
    e.preventDefault();
    const target = e.target;

    if (target.matches('#create-sign__form')) {
      messageBlock.append(spiner);
      messageBlock.append(statusMessage);
      showLoadMessage();
    }

    if (target.matches('#discount-form')) {
      messageBlock2.append(spiner);
      messageBlock2.append(statusMessage);
      showLoadMessage();
    }

    postData(new FormData(target))
      .then(response => {
        response.json().then(data => {
          console.log(data);
        });
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
        setTimeout(() => {
          statusMessage.remove();
          statusMessage2.remove();
        }, 3000);
      });
  });

};

export default sendForm;
