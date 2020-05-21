import React from "react";

const Tile = ({ type, color }) => {
  return <span className={`tile ${type}Tile ${color ? color : ""}`}></span>;
};

/**
 * TYPES
 * bossCar
 * playerCar
 * bossHome
 * playerHome
 * office
 * coffee
 * playerPath
 * bossPath
 * stoplight
 * tree
 * house
 * schoolZone
 *
 * COLORS
 * optional
 */

export default Tile;
