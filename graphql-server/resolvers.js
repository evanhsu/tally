import fetch from "node-fetch";
import { GraphQLScalarType } from "graphql";

const hexCodePattern = RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
const hexCodeType = new GraphQLScalarType({
  name: "HexCode",
  description: "A 6-digit hexidecimal value",
  serialize(value) {
    if (typeof value === "string" && hexCodePattern.test(value)) {
      return value;
    }
    throw new Error(`Invalid hexcode: ${value}`);
  },
  parseValue(value) {
    if (typeof value === "string" && hexCodePattern.test(value)) {
      return value;
    }
    throw new Error(`Invalid hexcode: ${value}`);
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case "StringValue":
        return ast.value;
    }
  },
});

const fetchCars = async (root, args, { restURL }) => {
  const url = args.carId
    ? `${restURL}/cars/${encodeURIComponent(args.carId)}`
    : `${restURL}/cars`;

  const cars = await fetch(url)
    .then((res) => res.json())
    .then(
      (cars) => new Promise((resolve) => setTimeout(() => resolve(cars), 2000))
    );

  return Array.isArray(cars) ? cars : [cars];
};

const fetchColors = async (_1, _args, { restURL }) => {
  return fetch(`${restURL}/colors`).then((res) => res.json());
};

export const resolvers = {
  Query: {
    message: () => "Hello World!",
    headerText: () => "The Tools",
    colors: fetchColors,
    color: (_1, args, { restURL }) => {
      const colorId = encodeURIComponent(args.colorId);
      return fetch(`${restURL}/colors/${colorId}`).then((res) => res.json());
    },
    cars: fetchCars,
    car: (_1, { carId }, { restURL }) => {
      const url = `${restURL}/cars/${encodeURIComponent(carId)}`;
      return fetch(url).then((res) => res.json());
    },
  },
  Mutation: {
    appendCar: async (_1, args, context) => {
      const appendCarRes = await fetch(`${context.restURL}/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args.car),
      });

      const appendedCar = await appendCarRes.json(); // The newly-created car, from the REST API

      // Re-fetch the newly-created car ()
      const res = await fetch(
        `${context.restURL}/cars/${encodeURIComponent(appendedCar.id)}`
      );
      const car = await res.json();

      return car;
    },

    removeCar: async (_, args, context) => {
      const removeCarRes = await fetch(
        `${context.restURL}/cars/${encodeURIComponent(args.id)}`,
        {
          method: "DELETE",
        }
      );
      return { id: args.id };
    },

    appendColor: async (_1, args, context) => {
      const appendColorRes = await fetch(`${context.restURL}/colors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args.color),
      });

      const appendedColor = await appendColorRes.json(); // The newly-created car, from the REST API

      // Re-fetch the newly-created color ()
      const res = await fetch(
        `${context.restURL}/colors/${encodeURIComponent(appendedColor.id)}`
      );
      const color = await res.json();

      return color;
    },

    removeColor: async (_1, args, context) => {
      const colors = await fetchColors(null, { id: args.id }, context);

      const colorToRemove = colors.filter(
        (color) => String(color.id) === String(args.id)
      );

      if (colorToRemove.length == 0) {
        return null;
      }

      const removeColorRes = await fetch(
        `${context.restURL}/colors/${encodeURIComponent(args.id)}`,
        {
          method: "DELETE",
        }
      );

      return colorToRemove.pop();
    },
  },
  HexCode: hexCodeType,
};
