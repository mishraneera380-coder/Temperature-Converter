 const tempInput = document.getElementById('tempInput');
  const convertBtn = document.getElementById('convertBtn');
  const errorMsg = document.getElementById('errorMsg');
  const errorText = document.getElementById('errorText');
  const absZeroMsg = document.getElementById('absZeroMsg');
  const results = document.getElementById('results');

  const cardC = document.getElementById('cardC');
  const cardF = document.getElementById('cardF');
  const cardK = document.getElementById('cardK');
  const valC = document.getElementById('valC');
  const valF = document.getElementById('valF');
  const valK = document.getElementById('valK');

  const ABSOLUTE_ZERO_C = -273.15;
  const numberPattern = /^-?\d*\.?\d+$/;

  function clearError(){
    tempInput.classList.remove('input-error');
    errorMsg.classList.remove('show');
  }

  function showError(message){
    errorText.textContent = message;
    errorMsg.classList.add('show');
    tempInput.classList.add('input-error');
    resetResults();
  }

  function resetResults(){
    [cardC, cardF, cardK].forEach(c => { c.classList.remove('filled', 'active-unit'); });
    valC.textContent = '—';
    valF.textContent = '—';
    valK.textContent = '—';
    absZeroMsg.classList.remove('show');
  }

  function getSelectedUnit(){
    return document.querySelector('input[name="unit"]:checked').value;
  }

  function convertTemperature(){
    clearError();
    absZeroMsg.classList.remove('show');

    const raw = tempInput.value.trim();

    if (raw === ''){
      showError('Please enter a temperature value.');
      return;
    }

    if (!numberPattern.test(raw)){
      showError('Please enter a valid number (e.g. 25, -10, 98.6).');
      return;
    }

    const value = parseFloat(raw);
    const unit = getSelectedUnit();

    let celsius;
    if (unit === 'C') celsius = value;
    else if (unit === 'F') celsius = (value - 32) * 5 / 9;
    else celsius = value - 273.15;

    if (celsius < ABSOLUTE_ZERO_C - 0.0001){
      resetResults();
      absZeroMsg.classList.add('show');
      return;
    }

    const fahrenheit = celsius * 9 / 5 + 32;
    const kelvin = celsius + 273.15;

    valC.textContent = celsius.toFixed(2) + '°C';
    valF.textContent = fahrenheit.toFixed(2) + '°F';
    valK.textContent = kelvin.toFixed(2) + 'K';

    cardC.classList.add('filled');
    cardF.classList.add('filled');
    cardK.classList.add('filled');

    cardC.classList.toggle('active-unit', unit === 'C');
    cardF.classList.toggle('active-unit', unit === 'F');
    cardK.classList.toggle('active-unit', unit === 'K');
  }

  convertBtn.addEventListener('click', convertTemperature);
  tempInput.addEventListener('input', clearError);
  tempInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') convertTemperature();
  });