window.onload = function () {
  const backgroundColorInput = document.getElementById('background-color-input')
  const boxColorInput = document.getElementById('box-color-input')
  const shadowColorInput = document.getElementById('shadow-color-input')
  const codeText = document.getElementById('code-text')
  function changeBoxShadow() {
    const preview = document.getElementById('preview')
    const box = document.getElementById('box')
    const horizontalLength = document.getElementById('horizontal-length-input').value
    const verticalLength = document.getElementById('vertical-length-input').value
    const blurRadius = document.getElementById('blur-radius-input').value
    const spreadRadius = document.getElementById('spread-radius-input').value
    preview.style.backgroundColor = backgroundColorInput.value
    box.style.backgroundColor = boxColorInput.value
    box.style.boxShadow = `${horizontalLength}px ${verticalLength}px ${blurRadius}px ${spreadRadius}px ${shadowColorInput.value}`
    codeText.innerText = `-webkit-box-shadow: ${box.style.boxShadow};
      -moz-box-shadow: ${box.style.boxShadow};
      box-shadow: ${box.style.boxShadow};
    `
    document.getElementById('horizontal-length-value').innerText = `${horizontalLength}px`
    document.getElementById('vertical-length-value').innerText = `${verticalLength}px`
    document.getElementById('blur-radius-value').innerText = `${blurRadius}px`
    document.getElementById('spread-radius-value').innerText = `${spreadRadius}px`
  }

  changeBoxShadow()

  const code = document.getElementById('code')
  code.addEventListener('click', (e) => {
    const textarea = document.createElement('textarea');
    textarea.value = codeText.innerText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    code.classList.add('check')
    setTimeout(() => {
      code.classList.remove('check')
    }, 1000)
  })

  document.querySelectorAll('.input').forEach(item => {
    item.addEventListener('input', () => {
      changeBoxShadow()
    })
  })
}
