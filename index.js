const core = require('@actions/core');
const axios = require('axios');

const VALID_MSGTYPES = ['text', 'url', 'markdown', 'actionCard', 'feedCard'];

async function run () {
  try {
    const webhook = core.getInput('webhook');
    const msgtype = core.getInput('msgtype');
    const textContent = core.getInput('content');
    const textAt = core.getInput('at');

    if (!VALID_MSGTYPES.includes(msgtype)) throw new Error(`msgtype should be one of ${VALID_MSGTYPES.join(',')}`);

    const content = JSON.parse(textContent);
    const at = textAt ? JSON.parse(textAt) : {};

    const payload = {
      msgtype,
      [msgtype]: content,
      at
    };

    const ret = await axios.post(webhook, JSON.stringify(payload), {
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