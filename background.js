
// 后台监听事件消息
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {

  let requestType = message.type;
  const tab_id = sender.tab.id;

  switch (requestType) {
    case 'getCaptcha':
      const { result } = await getCaptcha(message.data);

      // 发送结果至tab
      const res = await chrome.tabs.sendMessage(tab_id, { type: requestType, data: result })
      console.log(res);
      break;
    case 'getCaptchaByUrl':
      sendResponse({ type: requestType });
      break;
    default:
      break;
  }
});



async function getCaptcha(captcha) {
  const api = "http://110.41.176.92:8000/captcha_api/"
  const params = new URLSearchParams({ 'image': captcha })
  return new Promise((resolve, reject) => {
    fetch(api + '?' + params, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  })
}


