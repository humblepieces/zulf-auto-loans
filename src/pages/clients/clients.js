import {useNavigate} from "react-router-dom/dist";
import {
    Box,
    Button,
    Card,
    CardBody,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Input, InputGroup, InputLeftAddon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {MdAccountTree, MdHome, MdOutlineManageAccounts, MdSupervisorAccount} from "react-icons/md";
import {AiFillCar} from "react-icons/ai";
import {AddIcon} from "@chakra-ui/icons";
import {useEffect, useState} from "react";
import {useQuery, gql, useMutation} from "@apollo/client";
import {ZTable} from "../../shared/components/ZTable";
import {GET_CLIENTS} from '../../hasura/queries/client/index';
import {DELETE_CLIENT, INSERT_CLIENT, UPDATE_CLIENT} from "../../hasura/mutations/client";

export const Clients = () => {
    const navigate = useNavigate();
    const {isOpen, onClose, onOpen} = useDisclosure();
    const [clientData, setClientData] = useState({
        current_living_address: "",
        date_of_birth: "",
        fathers_name: "",
        first_name: "",
        id: "",
        id_number: "",
        last_name: "",
        last_updated_by: "",
        occupation: "",
        other_phone_number: "",
        personal_phone_number: "",
        salary: "",
        work_address: "",
    });
    const [clients, setClients] = useState([]);
    const {loading, error, data} = useQuery(gql(GET_CLIENTS));
    const [addClient] = useMutation(gql(INSERT_CLIENT));
    const [updateClient] = useMutation(gql(UPDATE_CLIENT));
    const [deleteClient] = useMutation(gql(DELETE_CLIENT));


    const handleChange = (event) => {
        const {name, value} = event.target;
        setClientData({...clientData, [name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        clients.push(clientData);
        setClientData({
            current_living_address: "",
            date_of_birth: "",
            fathers_name: "",
            first_name: "",
            id: "",
            id_number: "",
            last_name: "",
            last_updated_by: "",
            occupation: "",
            other_phone_number: "",
            personal_phone_number: "",
            salary: "",
            work_address: "",
        });
    };

    useEffect(() => {
        if (!loading) {
            if (!error){
                setClients([...clients, ...data.clients])
            }else{
                setClients([]);
            }
        }

    }, [loading, error, setClients])

    const createNewClient = () => {
        addClient({variables: {
                current_living_address: clientData.current_living_address,
                date_of_birth: clientData.date_of_birth,
                fathers_name: clientData.fathers_name,
                first_name: clientData.first_name,
                id_number: clientData.id_number,
                last_name: clientData.last_name,
                last_updated_by: clientData.last_updated_by,
                occupation: clientData.occupation,
                personal_phone_number: clientData.personal_phone_number,
                other_phone_number: clientData.other_phone_number,
                salary: clientData.salary,
                work_address: clientData.work_address
            }}).then(e => {
                setClients([...clients,...e.data.insert_clients.returning])
            console.log(clients)
        })
    }

    return (
        <Flex color='white' style={{height: "inherit"}} gap='8'>
            <Center>
                <Card borderRadius={'var(--chakra-radii-3xl)'} bg='white' w='260px' h='calc(100vh - 32px)' style={{
                    paddingInline: '20px',
                    filter: 'drop-shadow(rgba(0, 0, 0, 0.05) 0px 5px 14px)',
                    marginInlineStart: '16px'
                }}>
                    <CardBody paddingLeft={0} paddingRight={0}>
                        <VStack>
                            <Button width='100%' leftIcon={<MdHome/>} justifyContent='flex-start'
                                    onClick={() => navigate('/')}>
                                Dashboard
                            </Button>
                            <Button width='100%' leftIcon={<MdSupervisorAccount/>} justifyContent='flex-start'
                                    onClick={() => navigate('/clients')}>
                                Clients
                            </Button>
                            <Button width='100%' leftIcon={<AiFillCar/>} justifyContent='flex-start'
                                    onClick={() => navigate('/cars')}>
                                Cars
                            </Button>
                            <Text as='b' paddingTop={'12px'}>Admin Pages</Text>
                            <Button width='100%' leftIcon={<MdOutlineManageAccounts/>} justifyContent='flex-start'
                                    onClick={() => navigate('/profile')}>
                                Profile
                            </Button>
                            <Button width='100%' leftIcon={<MdAccountTree/>} justifyContent='flex-start'
                                    onClick={() => navigate('/users')}>
                                Create Users
                            </Button>
                        </VStack>
                    </CardBody>
                </Card>
            </Center>
            <Box flex='1' paddingRight='15px'>
                <Modal scrollBehavior='inside' isCentered blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <form onSubmit={handleSubmit} id='add-client-form'>
                                <FormControl>
                                    <FormLabel htmlFor="current_living_address">
                                        Current Living Address
                                    </FormLabel>
                                    <Input
                                        id="current_living_address"
                                        name="current_living_address"
                                        value={clientData.current_living_address}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="date_of_birth">
                                        Date of Birth
                                    </FormLabel>
                                    <Input
                                        id="date_of_birth"
                                        name="date_of_birth"
                                        type="datetime-local"
                                        placeholder="Select Date and Time"
                                        value={clientData.date_of_birth}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="fathers_name">
                                        Father's Name
                                    </FormLabel>
                                    <Input
                                        id="fathers_name"
                                        name="fathers_name"
                                        value={clientData.fathers_name}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="first_name">
                                        First Name
                                    </FormLabel>
                                    <Input
                                        id="first_name"
                                        name="first_name"
                                        value={clientData.first_name}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="last_name">
                                        Last Name
                                    </FormLabel>
                                    <Input
                                        id="last_name"
                                        name="last_name"
                                        value={clientData.last_name}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="id_number">
                                        Id Number
                                    </FormLabel>
                                    <Input
                                        id="id_number"
                                        name="id_number"
                                        value={clientData.id_number}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="last_updated_by">
                                        Last Updated By
                                    </FormLabel>
                                    <Input
                                        id="last_updated_by"
                                        name="last_updated_by"
                                        value={clientData.last_updated_by}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="occupation">
                                        Occupation
                                    </FormLabel>
                                    <Input
                                        id="occupation"
                                        name="occupation"
                                        value={clientData.occupation}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="personal_phone_number">
                                        Personal Phone Number
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon children='+994' />
                                        <Input
                                            id="personal_phone_number"
                                            name="personal_phone_number"
                                            type='tel'
                                            value={clientData.personal_phone_number}
                                            onChange={handleChange}
                                        />
                                    </InputGroup>

                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="other_phone_number">
                                        Other Phone Number
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon children='+994' />
                                    <Input
                                        id="other_phone_number"
                                        name="other_phone_number"
                                        value={clientData.other_phone_number}
                                        onChange={handleChange}
                                    />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="salary">
                                        Salary
                                    </FormLabel>
                                    <Input
                                        id="salary"
                                        name="salary"
                                        value={clientData.salary}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="work_address">
                                        Work Address
                                    </FormLabel>
                                    <Input
                                        id="work_address"
                                        name="work_address"
                                        value={clientData.work_address}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                {/* Add more form fields here */}
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => {
                                createNewClient();
                            }}>
                                Add
                            </Button>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Flex flexDirection='column' pt={{base: "120px", md: "0px"}} maxH='90vh' maxW='79vw'
                      justifyContent='space-around' gap={4}>
                    <Flex flexDirection='row' justifyContent='flex-end'>
                        <Button leftIcon={<AddIcon/>} bg='purple.500' onClick={onOpen}>
                            Add Client
                        </Button>
                    </Flex>
                    <ZTable caption='Client Data' body={clients}  message='No data available' updateHandler={updateClient} deleteHandler={deleteClient()}></ZTable>
                </Flex>
            </Box>
        </Flex>
    )
}