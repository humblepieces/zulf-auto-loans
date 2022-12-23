import {
    Button,
    ButtonGroup,
    Card, chakra, FormControl, FormErrorMessage, FormLabel, IconButton,
    Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr, useDisclosure, useToast
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";


const style = chakra(FormLabel, {
    baseStyle: {

    }
});

export const ZTable = ({...props}) => {
    const noDataMessage = props.message;
    const caption = props.caption;
    const updateHandler = props.updateHandler;
    // const deleteHandler = props.deleteHandler;
    const [data, setData] = useState([]); // initial data for the table
    const [editData, setEditData] = useState({});
    const [filteredData, setFilteredData] = useState([...data]); // filtered data for the table
    const [filterValues, setFilterValues] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const closeModal = () => {
      setEditData({});
      onClose();
    };

    const copyKeys = async (obj, newObj) => {
        Object.assign(newObj, Object.keys(obj).reduce((result, key) => {
            if(key !=='__typename'){
                result[key] = "";
                return result;
            }else{
                return result;
            }
        }, {}));
    }
    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        setFilterValues({
            ...filterValues,
            [name]: value,
        });
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

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setEditData((prevState) => {
            return({
                ...prevState,
                [name]: value
            })
        });
        console.log(editData)
    };

    const editRow = (rowData) => {
        setEditData(rowData);
        onOpen();
    };

    const deleteRow = (id) => {
        console.log(id)
        // deleteHandler({
        //     variables: {
        //         id: id
        //     }
        // }).then(e => {
        //     setData(prevState => {
        //         prevState = prevState.filter((row) => {
        //             return row.id !== id;
        //         })
        //         return prevState;
        //     })
        //     toast({
        //         title: 'Client deleted.',
        //         description: "Client data successfully deleted.",
        //         status: 'success',
        //         duration: 2000,
        //         isClosable: true,
        //     })
        // })
    };

    const updateClient = () => {
        updateHandler({
            variables: {
                _eq: editData.id,
                current_living_address: editData.current_living_address,
                date_of_birth: editData.date_of_birth,
                fathers_name: editData.fathers_name,
                first_name: editData.first_name,
                id_number: editData.id_number,
                last_name: editData.last_name,
                last_updated_by: editData.last_updated_by,
                occupation: editData.occupation,
                personal_phone_number: editData.personal_phone_number,
                other_phone_number: editData.other_phone_number,
                salary: editData.salary,
                work_address: editData.work_address
            }}).then(e => {
            setData(e.data.update_clients.returning)
            toast({
                title: 'Client updated.',
                description: "Client data updated successfully.",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        })
    }

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
    },[setFilterValues, setData, data, props.body,editData,editData])


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
                            <Th>
                                Actions
                            </Th>
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
                                                <ButtonGroup justifyContent='center' padding='5px'>
                                                    <IconButton aria-label='Edit' icon={<EditIcon />}  onClick={() => editRow(bodyContent)}/>
                                                    <IconButton aria-label='Delete' icon={<DeleteIcon />} onClick={() => {deleteRow(bodyContent.id)}}/>
                                                </ButtonGroup>
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
                                                <ButtonGroup justifyContent='center' padding='5px'>
                                                    <IconButton aria-label='Edit' icon={<EditIcon />}  onClick={() => editRow(bodyContent)}/>
                                                    <IconButton aria-label='Delete' icon={<DeleteIcon />} />
                                                </ButtonGroup>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                )
                        )}
                    <Tfoot>
                    </Tfoot>
                </Table>
            </TableContainer>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={handleSubmit} id='edit-row-form'>
                            {editData === {} ?
                                data.map((bodyContent) => (
                                    <div key={bodyContent.id}>
                                        {Object.entries(bodyContent).map(([key, value]) => (
                                            ((key !== 'id' && key !== '__typename')  &&
                                                <FormControl variant="floating" isRequired>
                                                    <FormLabel htmlFor={key} _firstletter={{textTransform: ''}}>
                                                        {key.replaceAll('_', ' ')}
                                                    </FormLabel>
                                                    <Input
                                                        id={key}
                                                        name={key}
                                                        placeholder={key}
                                                        value={value}
                                                        onChange={handleChange}
                                                    />
                                                    <FormErrorMessage>Your input is invalid</FormErrorMessage>
                                                </FormControl>
                                            )
                                        ))}
                                    </div>
                                ))
                            :
                                Object.entries(editData).map(([key, value]) => (
                                            ((key !== 'id' && key !== '__typename')  &&
                                                <FormControl variant="floating" isRequired>
                                                    <FormLabel htmlFor={key} _firstletter={{textTransform: 'uppercase'}}>
                                                        {key.replaceAll('_', ' ')}
                                                    </FormLabel>
                                                    <Input
                                                        id={key}
                                                        name={key}
                                                        placeholder={key}
                                                        value={value}
                                                        onChange={handleChange}
                                                    />
                                                    <FormErrorMessage>Your input is invalid</FormErrorMessage>
                                                </FormControl>
                                            )
                                ))
                            }
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={updateClient}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Card>
    )
}