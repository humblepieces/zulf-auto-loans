export const GET_CLIENTS = `
    query getClients {
        clients {
            current_living_address
            date_of_birth
            fathers_name
            first_name
            id_number
            id
            last_name
            last_updated_by
            occupation
            other_phone_number
            personal_phone_number
            salary
            work_address
        }
    }`;