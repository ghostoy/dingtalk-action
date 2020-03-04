# Dingtalk robot action

Github action for sending dingtalk messages via webhook

## Example Usage

```yaml
- name: send dingtalk message
  uses: ghostoy/dingtalk-action@master
  with:
    webhook: ${{ secrets.DINGTALK_WEBHOOK}}
    msgtype: markdown
    content: |
      {
        "title": "New push",
        "content": "commit: ${{ github.sha }}"
      }
    at: |
      {
        "atMobiles": [
          "1234567890"
        ],
        "isAtAll": false
      }
```

## Options

| option | type | required | default | description |
| --- | --- | --- | --- | --- |
|  webhook | string | Yes | none | The full address of dingtalk robot: https://oapi.dingtalk.com/robot/send?access_token=xxxxxx |
| msgtype | string | No | text | Dingtalk message type. Valid types are: text,markdown,link,actionCard,feedCard. Default: text. |
| content | string | Yes | none |  Message content of JSON type. See [Dingtalk Developer document](https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq) for details.  |
| at | string | No | none | At users of JSON type. |
