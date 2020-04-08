export interface Setting {
  title: string;
  logo: string;
  auth: boolean;
  apiDev: string;
  apiTest: string;
  api: string;
}

// tslint:disable-next-line:no-var-requires
const setting: Setting = require('../setting');

export default setting;
