'use strict';
var WxBase = require('co-wxbase');

class WxMsg extends WxBase {
  constructor(config){
    super(config);
  }

  *_getAccessToken(accessToken){
    if ( !accessToken ){
      accessToken = yield this.provider.getAccessToken();
    }
    return accessToken;
  }

  *setIndustry(id1, id2, accessToken){
    var params = {
       "industry_id1":id1,
       "industry_id2":id2
    }
    accessToken = yield this._getAccessToken(accessToken);
    var url = `https://api.weixin.qq.com/cgi-bin/template/api_set_industry?access_token=${accessToken}`;
    var result = yield this.jsonRequest(url, 'POST', params);
    return result;
  }

  *getTemplateId(shortId, accessToken) {
    var params = {
      template_id_short: shortId
    }
    accessToken = yield this._getAccessToken(accessToken);
    var url =`https://api.weixin.qq.com/cgi-bin/template/api_add_template?access_token=${accessToken}`;
    var result = yield this.jsonRequest(url, 'POST', params);
    return result;
  }

  *sendTemplateMessage(openid, templateId, data, link, accessToken){
    var params = {
      touser: openid,
      template_id: templateId,
      data: data
    }
    if ( link ) {
      params.url = link;
    }
    accessToken = yield this._getAccessToken(accessToken);
    var url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`;
    var result = yield this.jsonRequest(url, 'POST', params);
    return result;
  }
}

module.exports = function(config){
  var api = new WxMsg(config);
  return api;
}
