const showTextOnBanner = () => {
  const companyInput = document.getElementById('company');
  const outputText = document.querySelector('.create-sign__output');

  let typingTimer;

  const showText = () => {
    outputText.textContent = companyInput.value;
  };

  companyInput.addEventListener('input', () => {
    clearTimeout(typingTimer);
    if (companyInput.value) {
      typingTimer = setTimeout(showText, 400);
    }
    if (companyInput.value === '') {
      outputText.textContent = '';
    }
    if (outputText.textContent.split('').length >= 18) {
      // outputText.style.bottom = '133px';
    }
    // console.log(outputText.textContent.split('').length);
  });
};

export default showTextOnBanner;
