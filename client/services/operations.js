export const sortBuildings = (buildings, option) => {
  switch (option) {
    case "Closest":
      return [...buildings].sort((a, b) => a.distance - b.distance);
    case "Furthest":
      return [...buildings].sort((a, b) => b.distance - a.distance);
    case "Highest Rated":
      return [...buildings].sort((a, b) => b.rating - a.rating);
    case "Name":
      return [...buildings].sort((a, b) => a.name.localeCompare(b.name));
    default:
      return buildings;
  }
};

export const filterBuildings = (buildings, option) => {
  switch (option) {
    case "Open":
      return buildings.filter((building) => building.status === "Open");
    case "Closed":
      return buildings.filter((building) => building.status === "Closed");
    default:
      return buildings;
  }
};