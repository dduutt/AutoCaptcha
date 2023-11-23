let captcha_info;


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case 'getCaptcha':
      input_value(request.data)
      break;
    default:
      console.log('default', request)
  }

  sendResponse(request);
});

function get_image_dom() {
  let img;
  const { image_method, image_path } = captcha_info
  switch (image_method) {
    case 'ID':
      img = document.getElementById(image_path)
      break;
    case 'ClassName':
      img = document.getElementsByClassName(image_path)[0]
      break
    case 'Query':
      img = document.querySelector(image_path)
      break
    default:
      console.log('defualt', image_method, image_path)
  }
  return img
}

function get_code() {
  const base64 = get_image_base64()
  chrome.runtime.sendMessage({
    type: 'getCaptcha',
    data: base64
  })
  // 新增点击事件
  const img = get_image_dom()
  img.addEventListener('load', () => {
    setTimeout(() => {
      const base64 = get_image_base64()
      console.log(base64)
      chrome.runtime.sendMessage({
        type: 'getCaptcha',
        data: base64
      })
    }, 500)
  })
}


function get_image_base64() {
  const img = get_image_dom()
  if (!img) {
    return
  }
  const src = img.getAttribute('src')
  if (src.startsWith('data:image')) {
    return src
  }
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  ctx?.drawImage(img, 0, 0, img.width, img.height)
  const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
  const dataURL = canvas.toDataURL('image/' + ext)
  return dataURL
}


async function input_value(value) {
  const { input_method, input_path } = captcha_info
  let input;
  switch (input_method) {
    case 'ID':
      input = document.getElementById(input_path)
      break
    case 'ClassName':
      input = document.getElementsByClassName(input_path)[0]
      break
    case 'Query':
      input = document.querySelector(input_path)
      break
    default:
      console.log('default', input_method)
  }
  if (input) {
    input.value = value
  }
}


setTimeout(() => {
  getCaptchas()
}, 1000)


async function getCaptchas() {
  const URL = window.location.href
  const autocaptchas = await chrome.storage.sync.get('AutoCaptChas')
  const captchas = autocaptchas ? JSON.parse(autocaptchas.AutoCaptChas) : []
  for (let captcha of captchas) {
    if (URL.startsWith(captcha.url)) {
      captcha_info = captcha
      get_code()
    }
  }
}

