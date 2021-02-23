const sendForm = createForm => {
  createForm = document.getElementById('create-sign__form');
  const errorMessage = 'Что-то пошло не так';
  const loadingMessage = 'Загрузка...';
  const successMessage = 'Спасибо, мы скоро с вами свяжемся';
  const statusMessage = document.createElement('span');
  const spiner = document.querySelector('.loader');
  const messageBlock = document.querySelector('.output-message');
  statusMessage.classList.add('message');

  const postData = formData => fetch('../server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: formData,
    credentials: 'include'
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
      });
  });

};

export default sendForm;
