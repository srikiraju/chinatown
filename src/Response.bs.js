'use strict';

var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

function findPlayerNumber(s, n) {
  var p = s.players;
  if (p.playerOne === n) {
    return "PlayerOne";
  } else if (p.playerTwo === n) {
    return "PlayerTwo";
  } else if (p.playerThree === n) {
    return "PlayerThree";
  } else if (p.playerFour === n) {
    return "PlayerFour";
  } else {
    return "";
  }
}

function playerNames(json) {
  return {
          playerOne: Json_decode.field("PlayerOne", Json_decode.string, json),
          playerTwo: Json_decode.field("PlayerTwo", Json_decode.string, json),
          playerThree: Json_decode.field("PlayerThree", Json_decode.string, json),
          playerFour: Json_decode.field("PlayerFour", Json_decode.string, json)
        };
}

function state(json) {
  return {
          players: Json_decode.field("Players", playerNames, json),
          version: Json_decode.field("Version", Json_decode.$$int, json),
          year: Json_decode.field("Year", Json_decode.$$int, json)
        };
}

var Decode = {
  playerNames: playerNames,
  state: state
};

exports.findPlayerNumber = findPlayerNumber;
exports.Decode = Decode;
/* No side effect */
