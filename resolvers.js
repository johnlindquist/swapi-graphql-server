function films(parent, args, { models }) {
  return models.getData("/films").filter(({ id }) => parent.films.includes(id))
}

function starships(parent, { id }, { models }) {
  return models
    .getData("/starships")
    .filter(({ id }) => parent.starships.includes(id))
}

function people(key) {
  return function(parent, args, { models }) {
    return models
      .getData("/people")
      .filter(({ id }) => parent[key].includes(id))
  }
}
function vehicles(parent, args, { models }) {
  return models
    .getData("/vehicles")
    .filter(({ id }) => parent.vehicles.includes(id))
}

function starships(parent, args, { models }) {
  return models
    .getData("/starships")
    .filter(({ id }) => parent.starships.includes(id))
}

function planets(parent, args, { models }) {
  return models
    .getData("/planets")
    .filter(({ id }) => parent.planets.includes(id))
}

function species(parent, args, { models }) {
  return models
    .getData("/species")
    .filter(({ id }) => parent.species.includes(id))
}
function homeworld(parent, args, { models }) {
  return models
    .getData("/planets")
    .find(planet => planet.id === parent.homeworld)
}

const resolvers = {
  Query: {
    allStarships(parent, { id }, { models }) {
      return models.getData("/starships")
    },
    allFilms(parent, { id }, { models }) {
      return models.getData("/films")
    },
    allPeople(parent, { id }, { models }) {
      return models.getData("/people")
    },
    allPlanets(parent, { id }, { models }) {
      return models.getData("/planets")
    },
    allSpecies(parent, { id }, { models }) {
      return models.getData("/species")
    },
    allTransports(parent, { id }, { models }) {
      return models.getData("/transport")
    }
  },
  Film: {
    starships,
    vehicles,
    planets,
    characters: people("characters"),
    species
  },
  Starship: {
    MGLT: starship => +starship.MGLT,
    hyperdrive_rating: starship => +starship.hyperdrive_rating,
    cargo_capacity: starship => +starship.cargo_capacity,
    passengers: starship => +starship.passengers,
    max_atmosphering_speed: starship => +starship.max_atmosphering_speed,
    length: starship => +starship.length,
    cost_in_credits: starship => +starship.cost_in_credits,
    pilots: people("pilots"),
    films
  },
  Person: {
    height: pilot => +pilot.height,
    mass: pilot => +pilot.mass,
    starships,
    homeworld
  },
  Vehicle: {
    cargo_capacity: vehicle => +vehicle.cargo_capacity,
    passengers: vehicle => +vehicle.passengers,
    max_atmosphering_speed: vehicle => +vehicle.max_atmosphering_speed,
    crew: vehicle => forceNumber(vehicle.crew),
    length: vehicle => +vehicle.length,
    cost_in_credits: vehicle => +vehicle.cost_in_credits,
    pilots: people("pilots")
  },
  Planet: {
    diameter: planet => +planet.diameter,
    rotation_period: planet => +planet.rotation_period,
    orbital_period: planet => +planet.orbital_period,
    population: planet => +planet.population,
    residents: people("residents"),
    films
  },
  Species: {
    average_lifespan: species => +species.average_lifespan,
    average_height: species => +species.average_height,
    homeworld,
    people: people("people")
  },
  Transport: {
    cargo_capacity: vehicle => +vehicle.cargo_capacity,
    passengers: vehicle => +vehicle.passengers,
    max_atmosphering_speed: vehicle => +vehicle.max_atmosphering_speed,
    crew: vehicle => forceNumber(vehicle.crew),
    length: vehicle => +vehicle.length,
    cost_in_credits: vehicle => +vehicle.cost_in_credits
  }
}

const forceNumber = i =>
  Number(
    i
      .split(",")
      .join("")
      .split("-")[0]
  ) || -1

module.exports = resolvers
