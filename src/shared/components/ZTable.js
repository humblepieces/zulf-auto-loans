import {
    Card,
    Input,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import {useEffect, useState} from "react";


export const ZTable = ({...props}) => {
    const caption = props.caption;
    const [data, setData] = useState([]); // initial data for the table
    const [filteredData, setFilteredData] = useState([...data]); // filtered data for the table
    const noDataMessage = props.message;
    const [filterValues, setFilterValues] = useState({});
    const copyKeys = async (obj, newObj) => {
        Object.assign(newObj, Object.keys(obj).reduce((result, key) => {
            if(key !=='__typename'){
                result[key] = "";
                return result;
            }else{
                return result;
            }
            console.log(key)
        }, {}));
    }
    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        setFilterValues({
            ...filterValues,
            [name]: value,
        });

        console.log(name !== 'id' && name !== '__typename')

        // // Filter the data based on the filter values
        if(value === ""){
            setFilteredData(data)
        }else {
            const newFilteredData = data.filter((item) =>
                Object.keys(filterValues).every((key) => {
                    const filterValue = filterValues[key];
                    const itemValue = item[key];
                    return filterValue === "" || itemValue.toString().includes(filterValue.toString());
                })
            );
            setFilteredData(newFilteredData);
        }
    };

    useEffect(() => {
        const filterKeys = {};
        if(props.body.length > 0 && data.length === 0){
            setData([...props.body]);
        }
        if(data.length > 0){
            copyKeys(data[0],filterKeys).then(() => {
                setFilterValues(filterKeys);
            });
        }
        if(props.body.length > data.length){
            setData([...props.body]);
        }
    },[setFilterValues, setData, data, props.body])


    return (
        <Card bg='white'>
            <TableContainer overflowY='scroll' overflowX='scroll' scrollBehavior='smooth'>
                <Table variant='simple'>
                    <TableCaption>{caption}</TableCaption>
                    <Thead>
                        <Tr>
                            {(Object.keys(filterValues).length > 0) && (
                                (Object.entries(data[0]).map(([key, value]) => (
                                        ((key !== 'id' && key !== '__typename') &&
                                                <Th>
                                                    <Text>
                                                        {key}
                                                    </Text>
                                                    <Input
                                                        name={key}
                                                        value={filterValues[`${key}`]}
                                                        onChange={handleFilterChange}
                                                    />
                                                </Th>
                                        )
                                    )))
                            )}
                        </Tr>
                    </Thead>
                    {data.length === 0 ? (
                        <Tbody>
                            <Tr>
                                <Td style={{textAlign: 'center'}} colSpan="5">{noDataMessage}</Td>
                            </Tr>
                        </Tbody>
                    )
                        :
                        (filteredData.length > 0 ? (
                                    <Tbody>
                                        {filteredData.map((bodyContent) => (
                                            <Tr key={bodyContent.id}>
                                                {Object.entries(bodyContent).map(([key, value]) => (
                                                    ((key !== 'id' && key !== '__typename')  && <Td>{value.toString().trim()}</Td>)
                                                ))}
                                            </Tr>
                                        ))}
                                    </Tbody>
                                )
                                :
                                (
                                    <Tbody>
                                        {data.map((bodyContent) => (
                                            <Tr key={bodyContent.id}>
                                                {Object.entries(bodyContent).map(([key, value]) => (
                                                    ((key !== 'id' && key !== '__typename') && <Td>{value.toString().trim()}</Td>)
                                                ))}
                                            </Tr>
                                        ))}
                                    </Tbody>
                                )
                        )}
                    <Tfoot>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Card>
    )
}