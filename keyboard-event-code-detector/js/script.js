window.onload = function () {
  const defaultValues = {
    code: '-',
    keyCode: '-',
    key: '-',
    metaKey: '-',
    ctrlKey: '-',
    altKey: '-',
    shiftKey: '-'
  }

  function getHTML({ code, keyCode, key, metaKey , ctrlKey, altKey, shiftKey } = defaultValues) {
    return ` 
      <div class="box-container">
        <p>metaKey</p>
        <div class="box">
          <h2>${metaKey}</h2>
        </div>
      </div>
      
      <div class="box-container">
        <p>ctrlKey</p>
        <div class="box">
          <h2>${ctrlKey}</h2>
        </div>
      </div>
      
      <div class="box-container">
        <p>shiftKey</p>
        <div class="box">
          <h2>${shiftKey}</h2>
        </div>
      </div>
      
      <div class="box-container">
        <p>altKey</p>
        <div class="box">
          <h2>${altKey}</h2>
        </div>
      </div>
      
      <div class="box-container">
        <p>code</p>
        <div class="box">
          <h2>${code}</h2>
        </div>
      </div>
      
      <div class="box-container">
        <p>keyCode</p>
        <div class="box">
          <h2>${keyCode}</h2>
        </div>
      </div>
      
      <div class="box-container">
        <p>key</p>
        <div class="box">
          <h2>${key}</h2>
        </div>
      </div>
    `
  }
  const container = document.getElementById('container')
  container.innerHTML = getHTML()
  window.addEventListener('keydown', (e) => {
    e.preventDefault()
    const code = e.code
    const keyCode = e.keyCode
    const key = e.key
    const metaKey = e.metaKey
    const ctrlKey = e.ctrlKey
    const altKey = e.altKey
    const shiftKey = e.shiftKey
    container.innerHTML = getHTML({ code, key, altKey, ctrlKey, keyCode, metaKey, shiftKey })
  })
}
