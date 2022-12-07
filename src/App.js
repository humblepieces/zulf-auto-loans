import './App.scss';
import {Home} from "./pages/home/home";
import {Login} from "./pages/login/login";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom/dist";
import {Cars} from "./pages/cars/cars";
import {Clients} from "./pages/clients/clients";
import {Users} from "./pages/users/users";
import {Profile} from "./pages/profile/profile";
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/cars",
      element: <Cars/>
    },
    {
      path: "/clients",
      element: <Clients/>
    },
    {
      path: "/users",
      element: <Users/>
    },
    {
      path: "/profile",
      element: <Profile/>
    }
  ]);
  const { isAuthenticated, getAccessTokenSilently,isLoading } = useAuth0();
  const [accesstoken,setAccessToken] = useState('');


  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        const getUserMetadata = async () => {
          try {
            const accessToken = await getAccessTokenSilently();
            if(accessToken){
              setAccessToken(accessToken);
            }
          } catch (e) {
            console.log(e.message);
          }
        }
        getUserMetadata();
      }
    }
  },[isAuthenticated,isLoading,getAccessTokenSilently])

  const createApolloClient = (authToken) => {
    return new ApolloClient({
      link: new HttpLink({
        uri: process.env.REACT_APP_AUTH0_AUDIENCE,
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }),
      cache: new InMemoryCache(),
    });
  };

  return (
      <ApolloProvider client={createApolloClient(accesstoken)}>
        <RouterProvider router={router}/>
      </ApolloProvider>
  );
}

export default App;
