import {useNavigate} from "react-router-dom/dist";
import {
    Box,
    Button,
    Card,
    CardBody,
    Center,
    Flex, FormControl, FormLabel, Input,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {MdAccountTree, MdHome, MdOutlineManageAccounts, MdSupervisorAccount} from "react-icons/md";
import {AiFillCar} from "react-icons/ai";
import {useEffect, useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import {GET_CARS} from "../../hasura/queries/cars";
import {AddIcon} from "@chakra-ui/icons";
import {ZTable} from "../../shared/components/ZTable";
import {INSERT_CARS} from "../../hasura/mutations/cars";

export const Cars = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [carData, setCarData] = useState({
        id: "",
        country_bought: "",
        kilometre: "",
        make: "",
        model: "",
        name: "",
        previous_owner: "",
        vin_number: "",
        year: "",
        year_registered: "",
        last_update_by: ""
    });
    const [cars, setCars] = useState([]);
    const {loading, error, data} = useQuery(gql(GET_CARS));
    const [addCar] = useMutation(gql(INSERT_CARS));

    useEffect(() => {
        if (!loading) {
            if (!error){
                setCars([...cars, ...data.cars])
            }else{
                setCars([]);
            }
        }

    }, [loading,error,setCars])

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCarData({...carData, [name]: value});
        console.log(carData)
    };

    const createNewCar = () => {
        addCar({variables: {
                country_bought: carData.country_bought,
                kilometre: carData.kilometre,
                make: carData.make,
                model: carData.model,
                name: carData.name,
                previous_owner: carData.previous_owner,
                vin_number: carData.vin_number,
                year: carData.year,
                year_registered: carData.year_registered,
                last_update_by: carData.last_update_by
            }}).then(e => {
            setCars([...cars,...e.data.insert_cars.returning])
            console.log(cars)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        cars.push(carData);
        setCarData({
            id: "",
            country_bought: "",
            kilometre: "",
            make: "",
            model: "",
            name: "",
            previous_owner: "",
            vin_number: "",
            year: "",
            year_registered: "",
            last_update_by: ""
        });
    };

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
            <Box flex='1'>
                <Modal scrollBehavior='inside' isCentered blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <form onSubmit={handleSubmit} id='add-car-form'>
                                <FormControl>
                                    <FormLabel htmlFor="vin_number">
                                        VIN Number
                                    </FormLabel>
                                    <Input
                                        id="vin_number"
                                        name="vin_number"
                                        value={carData.vin_number}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="make">
                                        Make
                                    </FormLabel>
                                    <Input
                                        id="make"
                                        name="make"
                                        value={carData.make}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="model">
                                        Model
                                    </FormLabel>
                                    <Input
                                        id="model"
                                        name="model"
                                        value={carData.model}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="country_bought">
                                        Country Bought
                                    </FormLabel>
                                    <Input
                                        id="country_bought"
                                        name="country_bought"
                                        value={carData.country_bought}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="kilometre">
                                        Kilometre
                                    </FormLabel>
                                    <Input
                                        id="kilometre"
                                        name="kilometre"
                                        value={carData.kilometre}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="previous_owner">
                                        Preivous Owner
                                    </FormLabel>
                                    <Input
                                        id="previous_owner"
                                        name="previous_owner"
                                        value={carData.previous_owner}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="year_registered">
                                        Year Registered
                                    </FormLabel>
                                    <Input
                                        id="year_registered"
                                        name="year_registered"
                                        value={carData.year_registered}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="year">
                                        Year
                                    </FormLabel>
                                    <Input
                                        id="year"
                                        name="year"
                                        value={carData.year}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="last_update_by">
                                        Last Updated By
                                    </FormLabel>
                                    <Input
                                        id="last_update_by"
                                        name="last_update_by"
                                        value={carData.last_update_by}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => {
                                createNewCar();
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
                            Add Cars
                        </Button>
                    </Flex>
                    <ZTable caption='Car Data' body={cars}  message='No data available'></ZTable>
                </Flex>
            </Box>
        </Flex>
    )
}