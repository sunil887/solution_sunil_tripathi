const clicks = require('./clicks.json');
const fs = require('fs')

const getTimeStamp = date => (new Date(date)).getTime();
const compareTime = (timestamp1, timestamp2) => getTimeStamp(timestamp1) < getTimeStamp(timestamp2);

const ipCounter = new Map();

const getSelectedClickForIp = (ip, existingClick, incomingClick) => {
  if(ipCounter.get(ip) === 10) return null; 

  if(!existingClick) {
    ipCounter.set(ip, 1);
    return incomingClick;
  }
  
  ipCounter.set(ipCounter.get(ip) + 10);

  if(existingClick.amount === incomingClick.amount){
    const isExistingClickIsEarly = compareTime(existingClick.timestamp, incomingClick.timestamp);
    
    return isExistingClickIsEarly ? existingClick : incomingClick
  }
  
  return existingClick.amount > incomingClick.amount ? existingClick : incomingClick;
}

const getSubsetClicks = (clicks) => {
  const hashedClicks = new Map();

  clicks.forEach( click => {
    const selectedClick  = getSelectedClickForIp( click.ip, hashedClicks.get(click.ip), click);
    hashedClicks.set(selectedClick.ip, selectedClick);
  });

const subSetClicks = Array.from(hashedClicks.values());
  fs.writeFile('result-set.json', JSON.stringify(subSetClicks, null, "\t"),
   (err) => { if (err) throw err; });

  return subSetClicks;
}

getSubsetClicks(clicks);

module.exports = {
  getSubsetClicks,
  compareTime
} 
