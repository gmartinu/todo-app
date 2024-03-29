import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette:{
        primary: {
            main: "#65D2C2",
            contrastText: "#FFF"
        },
        secondary:{
            main: "#f012e9"
        }
    },
    overrides:{
        MuiButton:{
            root:{
                borderRadius: 5,
            },
            contained:{
                boxShadow: 'none'
            }
        }
    }
});
