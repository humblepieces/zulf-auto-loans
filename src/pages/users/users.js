import {Box, Button, Card, CardBody, Center, Flex, Text, VStack} from "@chakra-ui/react";
import {MdAccountTree, MdHome, MdOutlineManageAccounts, MdSupervisorAccount} from "react-icons/md";
import {AiFillCar} from "react-icons/ai";
import {useNavigate} from "react-router-dom/dist";

export const Users = () => {
    const navigate = useNavigate();
    return (
        <Flex color='white' style={{height: "inherit"}} gap='8'>
            <Center>
                <Card borderRadius={'var(--chakra-radii-3xl)'} bg='white' w='260px' h='calc(100vh - 32px)' style={{paddingInline: '20px', filter: 'drop-shadow(rgba(0, 0, 0, 0.05) 0px 5px 14px)', marginInlineStart: '16px'}}>
                    <CardBody paddingLeft={0} paddingRight={0}>
                        <VStack>
                            <Button width='100%' leftIcon={<MdHome/>} justifyContent='flex-start' onClick={() => navigate('/')}>
                                Dashboard
                            </Button>
                            <Button width='100%' leftIcon={<MdSupervisorAccount/>} justifyContent='flex-start' onClick={() => navigate('/clients')}>
                                Clients
                            </Button>
                            <Button width='100%' leftIcon={<AiFillCar/>} justifyContent='flex-start' onClick={() => navigate('/cars')}>
                                Cars
                            </Button>
                            <Text as='b' paddingTop={'12px'}>Admin Pages</Text>
                            <Button width='100%' leftIcon={<MdOutlineManageAccounts/>} justifyContent='flex-start' onClick={() => navigate('/profile')}>
                                Profile
                            </Button>
                            <Button width='100%' leftIcon={<MdAccountTree/>} justifyContent='flex-start' onClick={() => navigate('/users')}>
                                Create Users
                            </Button>
                        </VStack>
                    </CardBody>
                </Card>
            </Center>
            <Box flex='1'>
            </Box>
        </Flex>
    )
}