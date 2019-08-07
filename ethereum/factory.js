import web3 from './web3.js';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x9AA59337791C20678534C254cA1A1AA504cFa8a8'
);

export default instance;
