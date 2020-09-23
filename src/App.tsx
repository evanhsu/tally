import * as React from "react";
import { useMutation, useQuery } from "react-apollo";
import gql from "graphql-tag";
import { Car, NewCar } from "./models/car";
import { CarForm } from "./components/CarForm";

const COLORS_QUERY = gql`
  query ColorsQuery {
    colors {
      id
      name
    }
  }
`;

const CARS_QUERY = gql`
  query CarsQuery {
    cars {
      id
      make
      model
      year
      color
      price
    }
  }
`;

const APPEND_CAR_MUTATION = gql`
  mutation AppendCar($car: AppendCar) {
    appendCar(car: $car) {
      id
      make
      model
      year
      color
      price
    }
  }
`;

const REMOVE_CAR_MUTATION = gql`
  mutation RemoveCar($carId: ID!) {
    removeCar(id: $carId) {
      id
    }
  }
`;

const APP_QUERY = gql`
  query AppQuery {
    headerText
  }
`;

export type Color = {
  id: string;
  name: string;
  hexcode: string;
};

export type AppQueryData = {
  // message: string,
  headerText: string;
  colors: Color[];
  cars: Car[];
};

export type CarsQueryData = {
  cars: Car[];
};

export type ColorsQueryData = {
  colors: Color[];
};

type CarTableRowProps = {
  car: Car;
  onDelete: (id: number) => void;
};
export const CarTableRow = (props: CarTableRowProps) => {
  const { car, onDelete } = props;

  return (
    <tr>
      <td>{car.id}</td>
      <td>{car.make}</td>
      <td>{car.model}</td>
      <td>{car.year}</td>
      <td>{car.color}</td>
      <td>{car.price}</td>
      <td>
        <button type="button" onClick={() => onDelete(car.id)}>
          X
        </button>
      </td>
    </tr>
  );
};

export const App = () => {
  const { loading: appLoading, data: appData, error: appError } = useQuery<
    AppQueryData
  >(APP_QUERY);
  const carsQuery = useQuery<CarsQueryData>(CARS_QUERY);
  const colorsQuery = useQuery<ColorsQueryData>(COLORS_QUERY);
  const [mutateAppendCar] = useMutation(APPEND_CAR_MUTATION);
  const [mutateRemoveCar] = useMutation(REMOVE_CAR_MUTATION);

  const appendCar = (car: NewCar) => {
    mutateAppendCar({
      variables: { car },
      // refetchQueries: [{ query: CARS_QUERY }],
      optimisticResponse: {
        appendCar: {
          ...car,
          id: -1,
          ___typename: 'Car',
        },
      },
      update(store, mutationResult) { // This function is executed when the mutation response is received
        const data = store.readQuery<CarsQueryData>({query: CARS_QUERY});
        data!.cars = data!.cars.concat(mutationResult?.data?.appendCar);
        store.writeQuery({query: CARS_QUERY, data});
      },
    });
  };

  const removeCar = (id: number) => {
    mutateRemoveCar({
      variables: { carId: id },
      refetchQueries: [{ query: CARS_QUERY }],
    });
  };

  const renderCarsSection = (cars: Car[]) => (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Make</th>
          <th>Model</th>
          <th>Year</th>
          <th>Color</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <CarTableRow car={car} onDelete={removeCar} />
        ))}
      </tbody>
    </table>
  );

  const renderColorsSection = (colors: Color[]) => (
    <ul>
      {colors.map((color) => (
        <li key={color.id}>{color.name}</li>
      ))}
    </ul>
  );

  if (appLoading) {
    return <div>Loading!</div>;
  }

  if (appError) {
    return <div>Error: {appError}</div>;
  }

  return (
    <>
      <h1>{appData!.headerText}</h1>
      <section>
        <h2>Colors</h2>
        {colorsQuery.loading ? (
          <div>Loading Colors</div>
        ) : (
          renderColorsSection(colorsQuery.data!.colors)
        )}
      </section>

      <section>
        <h2>Cars</h2>
        {carsQuery.loading ? (
          <div style={{ fontSize: "5em" }}>JUST WAIT</div>
        ) : (
          renderCarsSection(carsQuery.data!.cars)
        )}
      </section>
      <CarForm buttonText="Add Car" onSubmitCar={appendCar} />
    </>
  );
};
