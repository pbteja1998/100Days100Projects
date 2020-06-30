function generateChar(totalRange, startingCharCode) {
  const randomCode = Math.floor(Math.random() * totalRange + startingCharCode)
  return String.fromCharCode(randomCode)
}

function generateRandomLowercase() {
  return generateChar(26, 97)
}

function generateRandomUppercase() {
  return generateChar(26, 65)
}

function generateRandomNumber() {
  return generateChar(10, 48)
}

function generateRandomSpecialChar() {
  return generateChar(15, 33)
}

const generate = {
  lower: generateRandomLowercase,
  upper: generateRandomUppercase,
  number: generateRandomNumber,
  special: generateRandomSpecialChar
}

window.onload = function () {
  const lengthInput = document.getElementById('length')
  const lowerCaseInput = document.getElementById('lowercase')
  const upperCaseInput = document.getElementById('uppercase')
  const numbersInput = document.getElementById('numbers')
  const specialCharInput = document.getElementById('special')
  const result = document.getElementById('result')
  const generatePasswordButton = document.getElementById('generate')
  const regeneratePasswordButton = document.getElementById('regenerate')
  const copyButton = document.getElementById('copy')
  const resultContainer = document.getElementById('result-container')

  lengthInput.addEventListener('change', function () {
    const lengthText = document.getElementById('length-text')
    lengthText.innerText = lengthInput.value
  })

  function generateAndShowPassword () {
    copyButton.classList.remove('success')
    copyButton.innerText = 'Copy'
    result.innerText = ""
    result.innerText = generatePassword()
  }

  generatePasswordButton.addEventListener('click', function () {
    generateAndShowPassword()
  })

  regeneratePasswordButton.addEventListener('click', function () {
    generateAndShowPassword()
  })

  copyButton.addEventListener('click', function () {
    const textarea = document.createElement('textarea');
    textarea.value = result.innerText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    copyButton.innerText = 'Copied'
    copyButton.classList.add('success')
  })

  function displayPasswordStrength(totalLength, included) {
    // Reset
    resultContainer.classList.remove('strong')
    resultContainer.classList.remove('medium')
    resultContainer.classList.remove('weak')

    let passwordStrength = ''
    console.log({ totalLength, len: included.length })
    if (totalLength > 7 && included.length === 4) {
      passwordStrength = 'strong'
    } else if(totalLength > 7 && included.length >= 2) {
      passwordStrength = 'medium'
    } else {
      passwordStrength = 'weak'
    }
    resultContainer.classList.add(passwordStrength)
  }

  function generatePassword() {
    const totalLength = Number(lengthInput.value)
    const shouldIncludeLowerCase = lowerCaseInput.checked
    const shouldIncludeUpperCase = upperCaseInput.checked
    const shouldIncludeNumber = numbersInput.checked
    const shouldIncludeSpecialCharacter = specialCharInput.checked
    const included = []
    let randomPassword = ''
    if (shouldIncludeLowerCase) {
      included.push('lower')
      randomPassword += generate['lower']()
    }
    if (shouldIncludeUpperCase) {
      included.push('upper')
      randomPassword += generate['upper']()
    }
    if (shouldIncludeNumber) {
      included.push('number')
      randomPassword += generate['number']()
    }
    if (shouldIncludeSpecialCharacter) {
      included.push('special')
      randomPassword += generate['special']()
    }
    for (let i = 0; i < totalLength-included.length; i++) {
      const randomIndex = +Math.floor(Math.random() * included.length)
      randomPassword += generate[included[randomIndex]]()
    }
    displayPasswordStrength(totalLength, included)
    return randomPassword
  }
}
