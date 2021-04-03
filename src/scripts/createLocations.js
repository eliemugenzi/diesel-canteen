require("../database/config");
const { Location } = require("../database/models");

const createLocations = async () => {
  const firstLocation = {
    name: "Gishushu Canteen",
  };

  const secondLocation = {
    name: "Masoro Canteen",
  };

  await Location.create(firstLocation);
  await Location.create(secondLocation);
};

createLocations();

module.exports = createLocations;
