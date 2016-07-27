# alice-chess

Yet another chess engine written in javascript.

Under construction.

## FEN parsing

**Forsyth–Edwards Notation (FEN)** is a standart notatiotion for describing a particular board position of a chess game.
[Learn more about FEN](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation).

For fen parsing used callback-oriented API. FenParser call callbacks which compose position object.
This very flexible approach allows to parse FEN entry into any format what you want.

### Code example
TODO

## Move genertion
TODO

## Move validation
TODO

## Move execution
TODO

## GUI
TODO

versions

* 0.0.x - in dev/test version not for release
* 0.1.0 - first releases with only simple UI without AI. Only move generation, execution and game end detecting
* 0.1.x - bugfix, performance improvement, refactoring, improve specs/docs, build system
* 0.2.x add more UI features (move logging, undo, etc)
* 0.3.x fen parsing\serialization on ui
* ...
* 1.0.0 - add AI on UI
* 1.x.x - may be add some chess variants