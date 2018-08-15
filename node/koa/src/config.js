let qiniuConfig = {
  qn_ak : '6iiHASYJ5orOZzdpRNnr0xx66_1aaV05u1c1v',
  qn_sk: 'IzTyqmnhEoRmyIBApBGDjxxxV38UNMD2OoNq',
  scope: '563-file',
  expires: 7200
}
const secret = 'flameindark';
const controllersPath = './controllers/*.js';
const DbConfig = {
  url: 'mongodb://localhost/test'
}
export {
  qiniuConfig,
  secret,
  controllersPath,
  DbConfig
};