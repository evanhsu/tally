export const typeDefs = `
  scalar HexCode

  type Query {
    message: String
    headerText: String
    colors: [Color]
    color (colorId: ID): Color
    cars (carId: ID): [Car]
    car (carId: ID!): Car
  }

  type Mutation {
    appendCar (car: AppendCar): Car
    removeCar (id: ID!) : Car 
    appendColor (color: AppendColor): Color
    removeColor (id: ID!): Color
  }


  type Car {
    id: ID
    make: String
    model: String
    year: Int
    color: String
    price: Float
  }

  input AppendCar {
    make: String
    model: String
    year: Int
    color: String
    price: Float
  }


  type Color {
    id: ID
    name: String
    hexcode: HexCode
  }

  input AppendColor {
    name: String
    hexcode: HexCode
  }
`;
