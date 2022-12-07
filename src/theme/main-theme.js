import {extendTheme, useColorMode} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'

const colors = {
    "black": "#121417",
    "gray": {
        "50": "#f9fafa",
        "100": "#f1f1f2",
        "200": "#e7e7e8",
        "300": "#d3d4d5",
        "400": "#abadaf",
        "500": "#7d7f83",
        "600": "#52555a",
        "700": "#33373d",
        "800": "#1d2025",
        "900": "#171a1d"
    },
    "red": {
        "50": "#f9f7f6",
        "100": "#e9dedc",
        "200": "#d6c1be",
        "300": "#be9f9a",
        "400": "#b18b86",
        "500": "#a0716b",
        "600": "#915b54",
        "700": "#81433b",
        "800": "#76322a",
        "900": "#64170d"
    },
    "yellow": {
        "50": "#fefefe",
        "100": "#f9f9f6",
        "200": "#efede6",
        "300": "#e2dfd3",
        "400": "#d1ccb8",
        "500": "#b1a886",
        "600": "#938656",
        "700": "#78682c",
        "800": "#5f4c06",
        "900": "#4f3f05"
    },
    "teal": {
        "50": "#f8fafa",
        "100": "#e0eaeb",
        "200": "#c6d8da",
        "300": "#a7c3c6",
        "400": "#80a8ad",
        "500": "#5e9198",
        "600": "#397880",
        "700": "#145f68",
        "800": "#064f59",
        "900": "#054149"
    },
    "cyan": {
        "50": "#f8fafb",
        "100": "#e3eaed",
        "200": "#d7e1e5",
        "300": "#c9d7dc",
        "400": "#a0b9c2",
        "500": "#8dabb6",
        "600": "#789ba8",
        "700": "#568293",
        "800": "#396c80",
        "900": "#19546b"
    },
    "purple": {
        "50": "#f8f6f9",
        "100": "#e2dde9",
        "200": "#cdc3d9",
        "300": "#af9fc1",
        "400": "#9a86b2",
        "500": "#7f679d",
        "600": "#6e5290",
        "700": "#5d3e83",
        "800": "#4f2e79",
        "900": "#3e196b"
    },
    "primary": {
        "50": "#f8f7fa",
        "100": "#e5dee9",
        "200": "#cfc1d7",
        "300": "#b49ec1",
        "400": "#a58bb4",
        "500": "#9171a4",
        "600": "#805b95",
        "700": "#6d4386",
        "800": "#61337c",
        "900": "#4d196b"
    }
}

const theme = extendTheme({
    components: {
      Card: {
          defaultProps: {
              colorScheme: 'white'
          }
      }
    },
    styles:{
        global:({
            body: {
                background: mode('black', 'black'),
            },
            // div: {
            //     color: mode('purple.500','purple.500')
            // },
        })
    },
    colors
})

export default theme