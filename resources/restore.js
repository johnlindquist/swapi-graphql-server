const path = require("path")
const jsonFile = require("jsonfile")

const films = require(path.join(__dirname, "../fixtures/films.json"))
const people = require(path.join(__dirname, "../fixtures/people.json"))
const planets = require(path.join(__dirname, "../fixtures/planets.json"))
const species = require(path.join(__dirname, "../fixtures/species.json"))
const starships = require(path.join(__dirname, "../fixtures/starships.json"))
const transport = require(path.join(__dirname, "../fixtures/transport.json"))
const vehicles = require(path.join(__dirname, "../fixtures/vehicles.json"))

const db = {
  films,
  people,
  planets,
  species,
  starships,
  transport,
  vehicles
}

/**
 * Lifting the "fields" to the root of the object
 * Using the "pk" as the "id"
 */
const fdb = Object.keys(db).reduce((acc, current) => {
  acc[current] = db[current].map(item => {
    return Object.assign(item.fields, {
      id: item.pk
    })
  })

  return acc
}, {})

/**
 * Vehicles and Starships "extend" Transport...
 */

const xdb = Object.keys(fdb).reduce((acc, current) => {
  if (current === "starships" || current === "vehicles") {
    acc[current] = acc[current].map(item => {
      const transport = acc["transport"].find(elm => {
        return elm.id === item.id
      })

      if (transport) {
        return Object.assign(item, transport)
      }

      return item
    })
  }
  return acc
}, fdb)

/**
 * Relation definitions to match them with swapi.co
 */
const relations = [
  {
    name: "people",
    relation: [
      {
        alias: "vehicles",
        table: "vehicles",
        name: "pilots",
        type: Array
      },
      {
        alias: "starships",
        table: "starships",
        name: "pilots",
        type: Array
      },
      {
        alias: "films",
        table: "films",
        name: "characters",
        type: Array
      }
    ]
  },
  {
    name: "planets",
    relation: [
      {
        alias: "residents",
        table: "people",
        name: "homeworld",
        type: Number
      },
      {
        alias: "films",
        table: "films",
        name: "planets",
        type: Array
      }
    ]
  },
  {
    name: "starships",
    relation: [
      {
        alias: "films",
        table: "films",
        name: "starships",
        type: Array
      }
    ]
  }
]

function addRelation(db, host, relations) {
  return relations.reduce((acc, relation) => {
    const alias = relation.alias
    const table = relation.table
    const name = relation.name
    if (relation.type === Number) {
      acc[alias] = db[table]
        .filter(item => item[name] === host.id)
        .map(item => item.id)

      return acc
    }

    acc[alias] = db[table]
      .filter(item => item[name].indexOf(host.id) > -1)
      .map(item => item.id)

    return acc
  }, {})
}

const relationDb = relations.reduce((acc, current) => {
  acc[current.name] = acc[current.name].map(item => {
    return Object.assign(item, addRelation(acc, item, current.relation))
  })
  return acc
}, xdb)

jsonFile.writeFileSync(path.join(__dirname, "starwars.json"), relationDb)
