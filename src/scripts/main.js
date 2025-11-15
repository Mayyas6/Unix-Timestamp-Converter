const API_URL = 'https://helloacm.com/api/unix-timestamp-converter/?cached&s=';

async function convert() {
  const input = document.getElementById('inputField').value.trim();
  const loading = document.getElementById('loading');
  const result = document.getElementById('result');
  const resultValue = document.getElementById('resultValue');
  const resultLabel = document.getElementById('resultLabel');

  if (!input) {
    showResult(
      result,
      resultValue,
      resultLabel,
      'Please enter a value',
      'Error:',
      true
    );
    return;
  }

  // Detect if input is a Unix timestamp (only digits) or a date string
  const isTimestamp = /^\d+$/.test(input);

  loading.classList.add('show');
  result.classList.remove('show');

  try {
    const response = await fetch(API_URL + encodeURIComponent(input));
    const data = await response.text();

    loading.classList.remove('show');

    // Remove quotes from the response if present
    const cleanData = data.replace(/^"|"$/g, '');

    if (data === 'false' || !data) {
      showResult(
        result,
        resultValue,
        resultLabel,
        'Invalid input format. Please check your input.',
        'Error:',
        true
      );
    } else {
      // Set appropriate label based on input type
      const label = isTimestamp ? 'Date String:' : 'Unix Timestamp:';
      showResult(result, resultValue, resultLabel, cleanData, label, false);
    }
  } catch (error) {
    loading.classList.remove('show');
    showResult(
      result,
      resultValue,
      resultLabel,
      'Error: Unable to convert. Please try again.',
      'Error:',
      true
    );
  }
}

function showResult(
  resultElement,
  valueElement,
  labelElement,
  message,
  label,
  isError
) {
  labelElement.textContent = label;
  valueElement.textContent = message;
  resultElement.classList.add('show');

  if (isError) {
    resultElement.classList.add('error');
  } else {
    resultElement.classList.remove('error');
  }
}

// Allow Enter key to trigger conversion
document
  .getElementById('inputField')
  .addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      convert();
    }
  });

// Make function globally available
window.convert = convert;
