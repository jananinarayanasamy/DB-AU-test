
 // const index = require('../index.js');
 // const tableFunction = require('../es6/table-functions.js');
  const {dataFormation, filterByTerm,sortByChangeBid, filterByTime, calculateMidprice} = require('../es6/data-formation.js');

  describe("Filter function", () => {
    test("Sort table", () => {
        const input = [
            {name: "gbpjpy", bestBid: "156.336674", bestAsk: "162.514956", openBid: "155.081092", openAsk: "161.498908", lastChangeAsk: "5.295630", lastChangeBid: "3.437916"},
            {name: "gbpchf", bestBid: "1.441315", bestAsk: "1.441877", openBid: "1.385971", openAsk: "1.439229", lastChangeAsk: "0.073887",lastChangeBid: "4.087565"},
            {name: "gbpusd", bestBid: "1.464292", bestAsk: "1.514167", openBid: "1.428014", openAsk: "1.489386", lastChangeAsk: "0.062203", lastChangeBid: "-0.065600"}
          ];

          const output = [
            {name: "gbpchf", bestBid: "1.441315", bestAsk: "1.441877", openBid: "1.385971", openAsk: "1.439229", lastChangeAsk: "0.073887",lastChangeBid: "4.087565"},
            {name: "gbpjpy", bestBid: "156.336674", bestAsk: "162.514956", openBid: "155.081092", openAsk: "161.498908", lastChangeAsk: "5.295630", lastChangeBid: "3.437916"},
            {name: "gbpusd", bestBid: "1.464292", bestAsk: "1.514167", openBid: "1.428014", openAsk: "1.489386", lastChangeAsk: "0.062203", lastChangeBid: "-0.065600"}
           ];
        expect(sortByChangeBid(input)).toEqual(output);
    });

    test("MidPrice calculation", () => {
        const input = [
            {name: "gbpjpy", bestBid: "156.336674", bestAsk: "162.514956", openBid: "155.081092", openAsk: "161.498908", lastChangeAsk: "5.295630", lastChangeBid: "3.437916"},
            {name: "gbpchf", bestBid: "1.441315", bestAsk: "1.441877", openBid: "1.385971", openAsk: "1.439229", lastChangeAsk: "0.073887",lastChangeBid: "4.087565"},
            {name: "gbpusd", bestBid: "1.464292", bestAsk: "1.514167", openBid: "1.428014", openAsk: "1.489386", lastChangeAsk: "0.062203", lastChangeBid: "-0.065600"}
          ];

          const output = [
            {name: "gbpchf", bestBid: "1.441315", bestAsk: "1.441877", openBid: "1.385971", openAsk: "1.439229", lastChangeAsk: "0.073887",lastChangeBid: "4.087565"},
            {name: "gbpjpy", bestBid: "156.336674", bestAsk: "162.514956", openBid: "155.081092", openAsk: "161.498908", lastChangeAsk: "5.295630", lastChangeBid: "3.437916"},
            {name: "gbpusd", bestBid: "1.464292", bestAsk: "1.514167", openBid: "1.428014", openAsk: "1.489386", lastChangeAsk: "0.062203", lastChangeBid: "-0.065600"}
           ];
        expect(sortByChangeBid(input)).toEqual(output);
    });

    test("Filter SpakLine Data", () => {
        const input = [
            {dataTime: 1603860046528, dataMPrice: 1.8364815},
            {dataTime: 1603860047517, dataMPrice: 1.895693},
            {dataTime: 1603860056512, dataMPrice: 1.816951},
            {dataTime: 1603860058540, dataMPrice: 1.808581}
          ];

          const output = [   ];
        expect(filterByTime(input)).toEqual(output);
    });

    test("MidPrice calculation", () => {
        const bestBid =  "156.336674" ;
        const bestAsk =  "162.514956" ;
      
        const output = 159.425815;
        expect(calculateMidprice(bestBid,bestAsk)).toEqual(output);
    });
});
