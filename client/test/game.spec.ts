import {Map, fromJS} from "immutable";
import {expect} from 'chai';

import {
  IGameConfiguration,
  beginGame,
  addMine,
  getNeighbors
} from "../src/Game";
import {ICell} from "../src/Cell";

describe("Get neighbors", () => {
  it("returns center neighbors", () => {
    const actual = getNeighbors({ coords: { x: 5, y: 5 }, mines: 0 }, { x: 3, y: 3 });

    expect(actual).to.deep.equal([
      { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 },
      { x: 3, y: 2 }, { x: 3, y: 4 },
      { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 }
    ])
  });

  it("returns top-left neighbors", () => {
    const actual = getNeighbors({ coords: { x: 5, y: 5 }, mines: 0 }, { x: 1, y: 1 });

    expect(actual).to.deep.equal([
      { x: 1, y: 2 },
      { x: 2, y: 1 }, { x: 2, y: 2 }
    ])
  });

  it("returns top-right neighbors", () => {
    const actual = getNeighbors({ coords: { x: 5, y: 5 }, mines: 0 }, { x: 1, y: 5 });

    expect(actual).to.deep.equal([
      { x: 1, y: 4 },
      { x: 2, y: 4 }, { x: 2, y: 5 }
    ])
  });

  it("returns bottom-left neighbors", () => {
    const actual = getNeighbors({ coords: { x: 5, y: 5 }, mines: 0 }, { x: 5, y: 1 });

    expect(actual).to.deep.equal([
      { x: 4, y: 1 }, { x: 4, y: 2 },
      { x: 5, y: 2 }
    ])
  });

  it("returns bottom-right neighbors", () => {
    const actual = getNeighbors({ coords: { x: 5, y: 5 }, mines: 0 }, { x: 5, y: 5 });

    expect(actual).to.deep.equal([
      { x: 4, y: 4 }, { x: 4, y: 5 },
      { x: 5, y: 4 }
    ])
  });
});

describe("A game", () => {
  describe("Begin a game", () => {
    it("Has cells", () => {
      const state = Map();

      const nextState = beginGame(state, {
        coords: { x: 1, y: 1 },
        mines: 0
      });
      expect(nextState).to.equal(fromJS({
        victory: null,
        config: {
          coords: { x: 1, y: 1 },
          mines: 0
        },
        cells: {
          "1,1": {
            has_mine: false,
            is_hidden: true,
            neibhoring_mines: 0
          }
        }
      }));
    });
  });

  describe("Add a mine", () => {
    it("Cell has changed", () => {
      const state = fromJS({
        victory: null,
        config: {
          coords: { x: 1, y: 2 },
          mines: 0
        },
        cells: {
          "1,1": {
            has_mine: false,
            is_hidden: true,
            neibhoring_mines: 0
          },
          "1,2": {
            has_mine: false,
            is_hidden: true,
            neibhoring_mines: 0
          }
        }
      });

      const nextState = addMine(state, { x: 1, y: 1 });
      expect(nextState).to.equal(fromJS({
        victory: null,
        cells: {
          "1,1": {
            has_mine: true,
            is_hidden: true,
            neibhoring_mines: 0
          },
          "1,2": {
            has_mine: false,
            is_hidden: true,
            neibhoring_mines: 1
          }
        }
      }));
    });
  });
});