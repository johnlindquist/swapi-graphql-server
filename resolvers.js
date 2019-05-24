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

function transports(parent, args, { models }) {
  return models
    .getData("/transport")
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
function person(parent, { id }, { models }) {
  return models.getData("/people").find(person => person.id === id)
}
function planet(parent, { id }, { models }) {
  return models.getData("/planets").find(planet => planet.id === id)
}
function film(parent, { id }, { models }) {
  return models.getData("/films").find(film => film.id === id)
}
function starship(parent, { id }, { models }) {
  return models.getData("/starships").find(starship => starship.id === id)
}
function transport(parent, { id }, { models }) {
  return models.getData("/transport").find(transport => transport.id === id)
}
function vehicle(parent, { id }, { models }) {
  return models.getData("/vehicles").find(vehicle => vehicle.id === id)
}

function searchPeopleByName(parent, { search }, { models }) {
  return models
    .getData("/people")
    .filter(person => new RegExp(search, "i").test(person.name))
}
function searchPlanetsByName(parent, { search }, { models }) {
  return models
    .getData("/planets")
    .filter(planet => new RegExp(search, "i").test(planet.name))
}
function searchFilmsByTitle(parent, { search }, { models }) {
  return models
    .getData("/films")
    .filter(film => new RegExp(search, "i").test(film.title))
}
function searchSpeciesByName(parent, { search }, { models }) {
  return models
    .getData("/species")
    .filter(species => new RegExp(search, "i").test(species.name))
}
function searchStarshipsByName(parent, { search }, { models }) {
  return models
    .getData("/starships")
    .filter(starship => new RegExp(search, "i").test(starship.name))
}
function searchVehiclesByName(parent, { search }, { models }) {
  return models
    .getData("/vehicles")
    .filter(vehicle => new RegExp(search, "i").test(vehicle.name))
}
function searchTransportsByName(parent, { search }, { models }) {
  return models
    .getData("/transport")
    .filter(transport => new RegExp(search, "i").test(transport.name))
}

const resolvers = {
  SearchResult: {
    __resolveType(parent, args, info) {
      console.log({ parent })
      return parent.__typename
    }
  },
  Query: {
    search(parent, { search }, { models }) {
      const result = [
        ...searchFilmsByTitle(parent, { search }, { models }).map(
          r => (r.__typename = "Film") && r
        ),
        ...searchPeopleByName(parent, { search }, { models }).map(
          r => (r.__typename = "Person") && r
        ),
        ...searchPlanetsByName(parent, { search }, { models }).map(
          r => (r.__typename = "Planet") && r
        ),
        ...searchSpeciesByName(parent, { search }, { models }).map(
          r => (r.__typename = "Species") && r
        ),
        ...searchStarshipsByName(parent, { search }, { models }).map(
          r => (r.__typename = "Starship") && r
        ),
        ...searchTransportsByName(parent, { search }, { models }).map(
          r => (r.__typename = "Transport") && r
        ),
        ...searchVehiclesByName(parent, { search }, { models }).map(
          r => (r.__typename = "Vehicle") && r
        )
      ]

      return result
    },

    person,
    planet,
    film,
    transport,
    starship,
    vehicle,
    searchPeopleByName,
    searchStarshipsByName,
    searchTransportsByName,
    searchSpeciesByName,
    searchVehiclesByName,
    searchPlanetsByName,
    searchFilmsByTitle,

    allStarships(parent, args, { models }) {
      return models.getData("/starships")
    },
    allFilms(parent, args, { models }) {
      return models.getData("/films")
    },
    allPeople(parent, args, { models }) {
      return models.getData("/people")
    },
    allPlanets(parent, args, { models }) {
      return models.getData("/planets")
    },
    allSpecies(parent, args, { models }) {
      return models.getData("/species")
    },
    allTransports(parent, args, { models }) {
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
