import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ChangeEvent, FunctionComponent, useState } from "react";
import logo from "./NavBar/logo.png";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

interface RegisterPageProps {

}

const RegisterPage: FunctionComponent<RegisterPageProps> = (props): JSX.Element => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

    };

    return (
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Paper elevation={6} sx={{
                height: "28em",
                width: "28em",
                padding: "2em"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1em"
                }}>
                    <a href="#">
                        <img src={logo} height={52} />
                    </a>
                </div>
                <FormGroup onSubmit={handleSubmit} sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1
                }}>
                    <Box className="frsbc" style={{ gap: "1em" }}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                label="First name"
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                required
                                label="Last name"
                                variant="outlined"
                            />
                        </FormControl>
                    </Box>
                    <FormControl fullWidth>
                        <TextField
                            label="Address"
                            variant="outlined"
                        />
                    </FormControl>
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <Box className="frsbc" style={{ gap: "1em" }}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                label="Username"
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                required
                                label="Email"
                                variant="outlined"
                            />
                        </FormControl>
                    </Box>
                    <Box className="frsbc" style={{ gap: "1em" }}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                label="Password"
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                required
                                label="Confirm password"
                                variant="outlined"
                            />
                        </FormControl>
                    </Box>
                    <Button sx={{mt: 3}} type="submit" variant="contained" color="primary">
                        Register
                    </Button>
                </FormGroup>
            </Paper>
        </div>
    );
}

export default RegisterPage;