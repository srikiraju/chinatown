'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Api$ReasonReactExamples = require("./Api.bs.js");
var Board$ReasonReactExamples = require("./Board.bs.js");
var Response$ReasonReactExamples = require("./Response.bs.js");
var AddPlayers$ReasonReactExamples = require("./AddPlayers.bs.js");
var WaitingOnOthers$ReasonReactExamples = require("./WaitingOnOthers.bs.js");

function shouldUpdateGameState(s, gs) {
  if (gs) {
    return gs[0].version < s.version;
  } else {
    return true;
  }
}

function gameTime(gs) {
  var match = gs.year;
  if (match !== 0) {
    return React.createElement(Board$ReasonReactExamples.make, {
                state: gs
              });
  } else {
    return React.createElement(WaitingOnOthers$ReasonReactExamples.make, { });
  }
}

function GameContainer(Props) {
  var match = React.useState((function () {
          return "";
        }));
  var setPlayerNumber = match[1];
  var match$1 = React.useState((function () {
          return "";
        }));
  var setPlayerName = match$1[1];
  var match$2 = React.useState((function () {
          return /* NoGameState */0;
        }));
  var setGameState = match$2[1];
  var gameState = match$2[0];
  React.useEffect((function () {
          var timerId = setInterval((function (param) {
                  Api$ReasonReactExamples.getState(/* () */0).then((function (s) {
                          if (shouldUpdateGameState(s, gameState)) {
                            Curry._1(setGameState, (function (param) {
                                    return /* GameState */[s];
                                  }));
                          }
                          return Promise.resolve(/* () */0);
                        }));
                  return /* () */0;
                }), 3000);
          return (function (param) {
                    clearInterval(timerId);
                    return /* () */0;
                  });
        }), ([]));
  var onNameSubmit = function (n) {
    Api$ReasonReactExamples.registerPlayer(n).then((function (s) {
            Curry._1(setPlayerName, (function (param) {
                    return n;
                  }));
            Curry._1(setPlayerNumber, (function (param) {
                    return Response$ReasonReactExamples.findPlayerNumber(s, n);
                  }));
            Curry._1(setGameState, (function (param) {
                    return /* GameState */[s];
                  }));
            return Promise.resolve(/* () */0);
          }));
    return /* () */0;
  };
  if (match[0] === "") {
    return React.createElement(AddPlayers$ReasonReactExamples.make, {
                onNameSubmit: onNameSubmit
              });
  } else if (gameState) {
    return gameTime(gameState[0]);
  } else {
    return React.createElement(AddPlayers$ReasonReactExamples.make, {
                onNameSubmit: onNameSubmit
              });
  }
}

var make = GameContainer;

exports.shouldUpdateGameState = shouldUpdateGameState;
exports.gameTime = gameTime;
exports.make = make;
/* react Not a pure module */
