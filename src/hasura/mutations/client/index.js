export const INSERT_CLIENT = `
    mutation insertClient($current_living_address: String , $date_of_birth: date, $fathers_name: String, $first_name: String , $id_number: String , $last_name: String , $last_updated_by: String , $occupation: String, $personal_phone_number: String, $other_phone_number: String , $salary: numeric , $work_address: String) {
        insert_clients(objects: {current_living_address: $current_living_address, date_of_birth: $date_of_birth, fathers_name: $fathers_name, first_name: $first_name, id_number: $id_number, last_name: $last_name, last_updated_by: $last_updated_by, occupation: $occupation, other_phone_number: $other_phone_number, personal_phone_number: $personal_phone_number, work_address: $work_address, salary: $salary}) {
            returning {
                current_living_address
                date_of_birth
                fathers_name
                first_name
                id
                id_number
                last_name
                last_updated_by
                occupation
                personal_phone_number
                other_phone_number
                salary
                work_address
            }
        }
    }
`;