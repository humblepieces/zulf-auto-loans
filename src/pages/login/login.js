import PropTypes from "prop-types";
import {
    Avatar,
    Box, Button,
    Flex,
    Heading,
    Stack
} from "@chakra-ui/react";
import {useAuth0} from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom/dist';
import {useEffect} from "react";
// import React from "@types/react";

export const Login = ({ ...props }) => {
    const { loginWithRedirect, logout, isAuthenticated,isLoading } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
            if(isAuthenticated){
                navigate("/", { replace: true });
            }
        }
    },[isAuthenticated])


    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar bg="purple.500" />
                <Heading color="purple.400">Welcome Mr Zulfugarov</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                    <form>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="purple.500"
                            boxShadow="md"
                            borderRadius='25px'
                        >
                            <Button
                                borderRadius={0}
                                variant="solid"
                                colorScheme="purple"
                                width="full"
                                onClick={() => loginWithRedirect().then(token => {
                                })}
                            >
                                Login
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
};

Login.propTypes = {
    // /**
    //  * Is this the principal call to action on the page?
    //  */
    // primary: PropTypes.bool,
    // /**
    //  * What background color to use
    //  */
    // backgroundColor: PropTypes.string,
    // /**
    //  * How large should the button be?
    //  */
    // size: PropTypes.oneOf(['small', 'medium', 'large']),
    // /**
    //  * Button contents
    //  */
    // label: PropTypes.string.isRequired,
    // /**
    //  * Optional click handler
    //  */
    // onClick: PropTypes.func,
};

Login.defaultProps = {
    // backgroundColor: null,
    // primary: false,
    // size: 'medium',
    // onClick: undefined,
};