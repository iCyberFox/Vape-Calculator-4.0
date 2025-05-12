    let flavorCount = 0;

function addFlavor(defaultName = '', defaultCurrent = '', defaultTarget = '') {
  flavorCount++;
  const container = document.getElementById('flavors');
  const wrapper = document.createElement('div');
  wrapper.className = 'flavor-container';

  // Якщо не задано ім’я, ставимо Ароматизатор N
  const namePlaceholder = defaultName || `Ароматизатор ${flavorCount}`;

  const row = document.createElement('div');
  row.className = 'flavor-row';
  row.innerHTML = `
    <input type="text" placeholder="${namePlaceholder}" class="input-name" value="${namePlaceholder}">
    <input type="number" placeholder="% поточний" step="0.01" class="input-sm" value="${defaultCurrent}">
    <input type="number" placeholder="% цільовий" step="0.01" class="input-sm" value="${defaultTarget}">
    <button class="remove-btn" onclick="removeFlavor(this)">×</button>
  `;

  wrapper.appendChild(row);
  container.appendChild(wrapper);
}

    function removeFlavor(button) {
  button.closest('.flavor-container').remove();
  const rows = document.querySelectorAll('.flavor-row');
  flavorCount = 0;
  rows.forEach((row, index) => {
    flavorCount++;
    const nameInput = row.querySelector('.input-name');
    const defaultName = `Ароматизатор ${index + 1}`;
    if (!nameInput.value || nameInput.value.startsWith("Ароматизатор")) {
      nameInput.value = defaultName;
      nameInput.placeholder = defaultName;
    }
  });
}

function calculate() {
  const volume = parseFloat(document.getElementById('volume').value);
  const rows = document.querySelectorAll('.flavor-row');
  let resultText = '';

  rows.forEach((row, index) => {
    const inputs = row.querySelectorAll('input');
    const name = inputs[0].value.trim() || `Ароматизатор ${index + 1}`;
    const current = parseFloat(inputs[1].value);
    const target = parseFloat(inputs[2].value);
    const currentFlavor = volume * (current / 100);
    const x = (target / 100 * volume - currentFlavor) / (1 - target / 100);

    if (x >= 0 && isFinite(x)) {
      const drops = x * 33;
      resultText += `${name}: додати ${x.toFixed(3)} мл (${Math.round(drops)} крапель)\n`;
    } else {
      resultText += `${name}: помилка в розрахунках\n`;
    }
  });

  document.getElementById('result').innerText = resultText.trim();
}
    addFlavor();
