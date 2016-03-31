"use strict";
var immutable_1 = require("immutable");
var chai_1 = require('chai');
var Game_1 = require("../src/Game");
describe("A game", function () {
    describe("Begin a game", function () {
        it("Has cells", function () {
            var state = immutable_1.Map();
            var nextState = Game_1.beginGame(state, {
                x: 1,
                y: 1,
                mines: 0
            });
            chai_1.expect(nextState).to.equal(immutable_1.Map({
                victory: false,
                cells: immutable_1.Map({
                    "1,1": immutable_1.Map({
                        has_mine: false,
                        is_hidden: true,
                        neibhouring_mines: 0
                    })
                })
            }));
        });
    });
});
//# sourceMappingURL=core_spec.js.map