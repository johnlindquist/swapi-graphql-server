const { gql } = require("apollo-server")

module.exports = gql`
  type Query {
    person(id: Int!): Person
    planet(id: Int!): Planet
    film(id: Int!): Film
    transport(id: Int!): Transport
    starship(id: Int!): Starship
    vehicle(id: Int!): Vehicle

    searchPeopleByName(search: String!): [Person]
    searchStarshipsByName(search: String!): [Starship]
    searchTransportsByName(search: String!): [Transport]
    searchSpeciesByName(search: String!): [Species]
    searchVehiclesByName(search: String!): [Vehicle]
    searchPlanetsByName(search: String!): [Planet]
    searchFilmsByTitle(search: String!): [Film]

    allFilms: [Film]
    allStarships: [Starship]
    allPeople: [Person]
    allPlanets: [Planet]
    allSpecies: [Species]
    allTransports: [Transport]
  }

  type Film {
    title: String!
    starships: [Starship]
    edited: String
    vehicles: [Vehicle]
    planets: [Planet]
    producer: String
    created: String
    episode_id: Int
    director: String
    release_date: String
    opening_crawl: String
    characters: [Person]
    species: [Species]
    id: Int
  }

  type Vehicle {
    id: Int
    name: String
    vehicle_class: String
    pilots: [Person]
    edited: String
    consumables: String
    created: String
    model: String
    manufacturer: String
    image: String
    cargo_capacity: Int
    passengers: Int
    max_atmosphering_speed: Int
    crew: Int
    length: Float
    cost_in_credits: Int
  }

  type Person {
    id: Int
    edited: String
    name: String
    created: String
    gender: String
    skin_color: String
    hair_color: String
    height: Int
    eye_color: String
    mass: Int
    homeworld: Planet
    birth_year: String
    image: String
    vehicles: [Vehicle]
    starships: [Starship]
    films: [Film]
  }

  type Starship {
    id: Int

    films: [Film]
    pilots: [Person]

    MGLT: Int
    starship_class: String
    hyperdrive_rating: Float
    edited: String
    consumables: String
    name: String
    created: String
    cargo_capacity: Int
    passengers: Int
    max_atmosphering_speed: Int
    crew: String
    length: Int
    model: String
    cost_in_credits: Int
    manufacturer: String
    image: String
  }

  type Planet {
    id: Int
    edited: String
    climate: String
    surface_water: String
    name: String
    diameter: Int
    rotation_period: Int
    created: String
    terrain: String
    gravity: String
    orbital_period: Int
    population: Int
    residents: [Person]
    films: [Film]
  }

  type Species {
    edited: String
    classification: String
    name: String
    designation: String
    created: String
    eye_colors: String
    people: [Person]
    skin_colors: String
    language: String
    hair_colors: String
    homeworld: Planet
    average_lifespan: Int
    average_height: Int
    id: Int
  }

  type Transport {
    edited: String
    consumables: String
    name: String
    created: String
    cargo_capacity: Int
    passengers: Int
    max_atmosphering_speed: Int
    crew: String
    length: Int
    model: String
    cost_in_credits: Int
    manufacturer: String
    image: String
    id: Int
  }
`
