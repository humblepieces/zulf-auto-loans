export const GET_CARS = `
    query GetCars {
  cars {
    vin_number
    make
    model
    name
    country_bought
    kilometre
    previous_owner
    year_registered
    year
    id
    last_update_by
  }
}`;