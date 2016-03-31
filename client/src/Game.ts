import {Map, fromJS} from "immutable";
import {ICell} from "./Cell";

export interface IGameConfiguration {
  coords: ICoordinates;
  mines: number;
}

export interface ICoordinates {
  x: number;
  y: number;
}

export interface IGame {
  victory?: boolean;
  config?: IGameConfiguration;
  cells?: Map<string, ICell>
}

export function beginGame(state: IGame, config: IGameConfiguration): IGame {
  var cells = {};
  for (var x = 1; x <= config.coords.x; x++) {
    for (var y = 1; y <= config.coords.y; y++) {
      const key = _getKey({ x: x, y: y });
      cells[key] = {
        has_mine: false,
        is_hidden: true,
        neibhoring_mines: 0
      }
    }
  }

  return fromJS({
    victory: null,
    config,
    cells: cells
  });
}

function _getKey(coords: ICoordinates) {
  return coords.x + "," + coords.y;
}

export function getNeighbors(config: IGameConfiguration, coords: ICoordinates): ICoordinates[] {

  const neighbors: ICoordinates[] = [
    { x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 },
    { x: 0, y: -1 }, { x: 0, y: 1 },
    { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }
  ];

  return neighbors.map(c => <ICoordinates>{ x: coords.x + c.x, y: coords.y + c.y })
    .filter(c => c.x >= 1 && c.x <= config.coords.x && c.y >= 1 && c.y <= config.coords.y);
}

export function addMine(state: IGame, coords: ICoordinates): IGame {
  var newState = (<Map<any, any>>state).updateIn(
    ["cells", _getKey(coords), "has_mine"],
    false,
    x => true);

      console.log(state.config, newState.get("config"));
  const neighbors = getNeighbors(state.config, coords);
  neighbors.forEach(n => {
    newState = newState.updateIn(
      ["cells", _getKey(n), "neibhoring_mines"],
      0,
      x => x + 1)
  });

  return newState;
}