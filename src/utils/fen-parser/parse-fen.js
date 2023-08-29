import fenUtils from "../chess-utils/fen-utils";
import { parseFenPiecePlacement } from "./parse-piece-placement";

export const parseFen = fen => {
  // TODO halfmove clock, fullmove number
  const [ piecePlacement, color, castlingRights, epSquare ] = fen.split(' ');

  const board = parseFenPiecePlacement(piecePlacement);

  if (!fenUtils.isColorToken(color)) {
    // TODO
  }

  return { board, color };
};
