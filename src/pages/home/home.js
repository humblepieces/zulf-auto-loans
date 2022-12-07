import PropTypes from "prop-types";
import {
    Box,
    Button,
    Card,
    CardBody,
    Center,
    Container,
    Flex, Grid, Progress,
    SimpleGrid,
    Square,
    Stat, StatLabel, StatNumber, Table, Tbody, Td,
    Text, Th, Thead, Tr, useColorMode, useColorModeValue,
    VStack
} from "@chakra-ui/react";
import {useAuth0} from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom/dist';
import {useEffect} from "react";
import {MdAccountTree, MdHome, MdOutlineManageAccounts, MdSupervisorAccount} from "react-icons/md";
import {AiFillCar} from "react-icons/ai";
import IconBox from "./components/IconBox";
import {PhoneIcon} from "@chakra-ui/icons";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import {pageVisits, socialTraffic} from "../../variables/general";
import {barChartData, barChartOptions, lineChartData, lineChartOptions} from "../../variables/charts";
// import React from "@types/react";

export const Home = ({ ...props }) => {
    const { isAuthenticated,isLoading } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
            if(!isAuthenticated){
                navigate("/login", { replace: true });
            }
        }
    },[isLoading,isAuthenticated])

    const iconBlue = useColorModeValue("blue.500", "blue.500");
    const iconBoxInside = useColorModeValue("white", "white");
    const textColor = useColorModeValue("gray.700", "white");
    const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const textTableColor = useColorModeValue("gray.500", "white");

    const { colorMode } = useColorMode();


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
                <Box padding='3'  color='black' maxW='inherit' minHeight='calc(100vh)'>
                    <Flex flexDirection='column' pt={{ base: "120px", md: "5px" }}>
                        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px' mb='20px'>
                            <Card minH='125px' bg='white' padding='20px' justifyContent='center'>
                                <Flex direction='column'>
                                    <Flex
                                        firection='row'
                                        align='center'
                                        justify='center'
                                        w='100%'
                                        mb='25px'>
                                        <Stat me='auto'>
                                            <StatLabel
                                                fontSize='xs'
                                                color='gray.400'
                                                fontWeight='bold'
                                                textTransform='uppercase'>
                                                Today's Money
                                            </StatLabel>
                                            <Flex>
                                                <StatNumber fontSize='lg' fontWeight='bold'>
                                                    $53,897
                                                </StatNumber>
                                            </Flex>
                                        </Stat>
                                        <IconBox
                                            borderRadius='50%'
                                            as='box'
                                            h={"45px"}
                                            w={"45px"}
                                            bg={iconBlue}>
                                            <PhoneIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                                        </IconBox>
                                    </Flex>
                                    <Text color='gray.400' fontSize='sm'>
                                        <Text as='span' color='green.400' fontWeight='bold'>
                                            +3.48%{" "}
                                        </Text>
                                        Since last month
                                    </Text>
                                </Flex>
                            </Card>
                            <Card minH='125px' bg='white' padding='20px' justifyContent='center'>
                                <Flex direction='column'>
                                    <Flex
                                        flexDirection='row'
                                        align='center'
                                        justify='center'
                                        w='100%'
                                        mb='25px'>
                                        <Stat me='auto'>
                                            <StatLabel
                                                fontSize='xs'
                                                color='gray.400'
                                                fontWeight='bold'
                                                textTransform='uppercase'>
                                                Today's Users
                                            </StatLabel>
                                            <Flex>
                                                <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                                                    $3,200
                                                </StatNumber>
                                            </Flex>
                                        </Stat>
                                        <IconBox
                                            borderRadius='50%'
                                            as='box'
                                            h={"45px"}
                                            w={"45px"}
                                            bg={iconBlue}>
                                            <PhoneIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                                        </IconBox>
                                    </Flex>
                                    <Text color='gray.400' fontSize='sm'>
                                        <Text as='span' color='green.400' fontWeight='bold'>
                                            +5.2%{" "}
                                        </Text>
                                        Since last month
                                    </Text>
                                </Flex>
                            </Card>
                            <Card minH='125px' bg='white' padding='20px' justifyContent='center'>
                                <Flex direction='column'>
                                    <Flex
                                        flexDirection='row'
                                        align='center'
                                        justify='center'
                                        w='100%'
                                        mb='25px'>
                                        <Stat me='auto'>
                                            <StatLabel
                                                fontSize='xs'
                                                color='gray.400'
                                                fontWeight='bold'
                                                textTransform='uppercase'>
                                                New Clients
                                            </StatLabel>
                                            <Flex>
                                                <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                                                    +2,503
                                                </StatNumber>
                                            </Flex>
                                        </Stat>
                                        <IconBox
                                            borderRadius='50%'
                                            as='box'
                                            h={"45px"}
                                            w={"45px"}
                                            bg={iconBlue}>
                                            <PhoneIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                                        </IconBox>
                                    </Flex>
                                    <Text color='gray.400' fontSize='sm'>
                                        <Text as='span' color='red.500' fontWeight='bold'>
                                            -2.82%{" "}
                                        </Text>
                                        Since last month
                                    </Text>
                                </Flex>
                            </Card>
                            <Card minH='125px' bg='white' padding='20px' justifyContent='center'>
                                <Flex direction='column'>
                                    <Flex
                                        flexDirection='row'
                                        align='center'
                                        justify='center'
                                        w='100%'
                                        mb='25px'>
                                        <Stat me='auto'>
                                            <StatLabel
                                                fontSize='xs'
                                                color='gray.400'
                                                fontWeight='bold'
                                                textTransform='uppercase'>
                                                Total Sales
                                            </StatLabel>
                                            <Flex>
                                                <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                                                    $173,000
                                                </StatNumber>
                                            </Flex>
                                        </Stat>
                                        <IconBox
                                            borderRadius='50%'
                                            as='box'
                                            h={"45px"}
                                            w={"45px"}
                                            bg={iconBlue}>
                                            <PhoneIcon  h={"24px"} w={"24px"} color={iconBoxInside} />
                                        </IconBox>
                                    </Flex>
                                    <Text color='gray.400' fontSize='sm'>
                                        <Text as='span' color='green.400' fontWeight='bold'>
                                            +8.12%{" "}
                                        </Text>
                                        Since last month
                                    </Text>
                                </Flex>
                            </Card>
                        </SimpleGrid>
                        <Grid
                            templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
                            templateRows={{ lg: "repeat(2, auto)" }}
                            gap='20px'>
                            <Card
                                bg={
                                    colorMode === "dark"
                                        ? "navy.800"
                                        : "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                                }
                                p='0px'
                                maxW={{ sm: "320px", md: "100%" }}>
                                <Flex direction='column' mb='40px' p='28px 0px 0px 22px'>
                                    <Text color='#fff' fontSize='lg' fontWeight='bold' mb='6px'>
                                        Sales Overview
                                    </Text>
                                    <Text color='#fff' fontSize='sm'>
                                        <Text as='span' color='green.400' fontWeight='bold'>
                                            (+5) more{" "}
                                        </Text>
                                        in 2022
                                    </Text>
                                </Flex>
                                <Box minH='300px'>
                                    <LineChart
                                        chartData={lineChartData}
                                        chartOptions={lineChartOptions}
                                    />
                                </Box>
                            </Card>
                            <Card p='0px' maxW={{ sm: "320px", md: "100%" }} bg='white' padding='20px'>
                                <Flex direction='column' mb='40px' p='28px 0px 0px 22px'>
                                    <Text color='gray.400' fontSize='sm' fontWeight='bold' mb='6px'>
                                        PERFORMANCE
                                    </Text>
                                    <Text color={textColor} fontSize='lg' fontWeight='bold'>
                                        Total orders
                                    </Text>
                                </Flex>
                                <Box minH='300px'>
                                    <BarChart chartData={barChartData} chartOptions={barChartOptions} />
                                </Box>
                            </Card>
                            <Card p='0px' maxW={{ sm: "320px", md: "100%" }} bg='white' padding='20px' height='fit-content'>
                                <Flex direction='column'>
                                    <Flex align='center' justify='space-between' p='22px'>
                                        <Text fontSize='lg' color={textColor} fontWeight='bold' >
                                            Page visits
                                        </Text>
                                    </Flex>
                                    <Box overflow={{ sm: "scroll", lg: "hidden" }}>
                                        <Table>
                                            <Thead>
                                                <Tr bg={tableRowColor}>
                                                    <Th color='gray.400' borderColor={borderColor}>
                                                        Page name
                                                    </Th>
                                                    <Th color='gray.400' borderColor={borderColor}>
                                                        Visitors
                                                    </Th>
                                                    <Th color='gray.400' borderColor={borderColor}>
                                                        Unique users
                                                    </Th>
                                                    <Th color='gray.400' borderColor={borderColor}>
                                                        Bounce rate
                                                    </Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {pageVisits.map((el, index, arr) => {
                                                    if(index < 2)
                                                    return (
                                                        <Tr key={index}>
                                                            <Td
                                                                color={textTableColor}
                                                                fontSize='sm'
                                                                fontWeight='bold'
                                                                borderColor={borderColor}
                                                                border={index === arr.length - 1 ? "none" : null}>
                                                                {el.pageName}
                                                            </Td>
                                                            <Td
                                                                color={textTableColor}
                                                                fontSize='sm'
                                                                border={index === arr.length - 1 ? "none" : null}
                                                                borderColor={borderColor}>
                                                                {el.visitors}
                                                            </Td>
                                                            <Td
                                                                color={textTableColor}
                                                                fontSize='sm'
                                                                border={index === arr.length - 1 ? "none" : null}
                                                                borderColor={borderColor}>
                                                                {el.uniqueUsers}
                                                            </Td>
                                                            <Td
                                                                color={textTableColor}
                                                                fontSize='sm'
                                                                border={index === arr.length - 1 ? "none" : null}
                                                                borderColor={borderColor}>
                                                                {el.bounceRate}
                                                            </Td>
                                                        </Tr>
                                                    );
                                                })}
                                            </Tbody>
                                        </Table>
                                    </Box>
                                </Flex>
                            </Card>
                            <Card p='0px' maxW={{ sm: "320px", md: "100%" }} bg='white' padding='20px'>
                                <Flex direction='column'>
                                    <Flex align='center' justify='space-between' p='22px'>
                                        <Text fontSize='lg' color={textColor} fontWeight='bold'>
                                            Social traffic
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Box overflow={{ sm: "scroll", lg: "hidden" }}>
                                    <Table>
                                        <Thead>
                                            <Tr bg={tableRowColor}>
                                                <Th color='gray.400' borderColor={borderColor}>
                                                    Referral
                                                </Th>
                                                <Th color='gray.400' borderColor={borderColor}>
                                                    Visitors
                                                </Th>
                                                <Th color='gray.400' borderColor={borderColor}></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {socialTraffic.map((el, index, arr) => {
                                                if(index < 2)
                                                return (
                                                    <Tr key={index}>
                                                        <Td
                                                            color={textTableColor}
                                                            fontSize='sm'
                                                            fontWeight='bold'
                                                            borderColor={borderColor}
                                                            border={index === arr.length - 1 ? "none" : null}>
                                                            {el.referral}
                                                        </Td>
                                                        <Td
                                                            color={textTableColor}
                                                            fontSize='sm'
                                                            borderColor={borderColor}
                                                            border={index === arr.length - 1 ? "none" : null}>
                                                            {el.visitors}
                                                        </Td>
                                                        <Td
                                                            color={textTableColor}
                                                            fontSize='sm'
                                                            borderColor={borderColor}
                                                            border={index === arr.length - 1 ? "none" : null}>
                                                            <Flex align='center'>
                                                                <Text
                                                                    color={textTableColor}
                                                                    fontWeight='bold'
                                                                    fontSize='sm'
                                                                    me='12px'>{`${el.percentage}%`}</Text>
                                                                <Progress
                                                                    size='xs'
                                                                    colorScheme={el.color}
                                                                    value={el.percentage}
                                                                    minW='120px'
                                                                />
                                                            </Flex>
                                                        </Td>
                                                    </Tr>
                                                );
                                            })}
                                        </Tbody>
                                    </Table>
                                </Box>
                            </Card>
                        </Grid>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
};

Home.propTypes = {

};

Home.defaultProps = {

};