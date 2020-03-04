const core = require('@actions/core');
const axios = require('axios');
const crypto = require('crypto');

const VALID_MSGTYPES = ['text', 'url', 'markdown', 'actionCard', 'feedCard'];

async function run () {
  try {
    const webhook = core.getInput('webhook', { required: true });
    const msgtype = core.getInput('msgtype');
    const textContent = core.getInput('content', { required: true });
    const textAt = core.getInput('at');
    const secret = core.getInput('secret');

    if (!VALID_MSGTYPES.includes(msgtype)) throw new Error(`msgtype should be one of ${VALID_MSGTYPES.join(',')}`);

    const content = JSON.parse(textContent);
    const at = textAt ? JSON.parse(textAt) : {};

    const payload = {
      msgtype,
      [msgtype]: content,
      at
    };

    const url = new URL(webhook);

    // sign the request if given
    if (secret) {
      const timestamp = Date.now();
      const stringToSign = `${timestamp}\n${secret}`;
      const sign = crypto.createHmac('sha256', secret).update(stringToSign).digest('base64');
      url.searchParams.append('timestamp', timestamp);
      url.searchParams.append('sign', sign);
    }

    const ret = await axios.post(url.toString(), JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('response:', ret.data);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();