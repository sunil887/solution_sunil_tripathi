const assert = require('assert');
const solution  = require('../index')

describe( "Test1", () => {
    
  it("getSubsetClick returning correct number of subset", () => {
    const clicks = [
      { "ip": "22.22.22.22", "timestamp": "3/11/2020 02:02:58", "amount": 7.0 },
      { "ip": "11.11.11.11", "timestamp": "3/11/2020 02:12:32", "amount": 6.5 }
    ];

    const receivedSubsetClick = solution.getSubsetClicks(clicks);
    assert.equal(receivedSubsetClick.length === 2, true)

  });

  it("compareTime returning correct comparison" , () => {
    const isEarlier =  solution.compareTime("3/11/2020 02:02:58", "3/11/2020 02:12:32");
    assert.equal(isEarlier, true)
  });
});