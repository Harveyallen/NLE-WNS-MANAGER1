const baseUrl = location.hostname;
let base;
switch (baseUrl) {
  case 'order.nlebv.com':
    base = 'https://dev-nl-erp-api.nle-tech.com/';
    break;
  default:
    // base = 'https://dev-wms-api-v2.nle-tech.com/';
    base = 'http://192.168.0.199:10005';
    break;
    // base = 'http://192.168.0.199:10016/';
    // base = 'http://192.168.0.79:10000/';
}
const baseApi = base;
export default baseApi;
