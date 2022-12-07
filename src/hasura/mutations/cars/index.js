export const INSERT_CARS = `
mutation insertCar($model: String , $country_bought: String , $kilometre: String , $make: String, $last_update_by: String, $name: String, $previous_owner: String , $vin_number: String, $year: Int, $year_registered: Int) {
  insert_cars(objects: {country_bought: $country_bought, kilometre: $kilometre, model: $model, vin_number: $vin_number, year_registered: $year_registered, year: $year, make: $make, last_update_by: $last_update_by, previous_owner: $previous_owner, name: $name}) {
    returning {
      country_bought
      id
      kilometre
      last_update_by
      make
      model
      name
      previous_owner
      vin_number
      year
      year_registered
    }
  }
}
`;