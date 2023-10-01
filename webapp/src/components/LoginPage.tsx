import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormGroup from "@mui/material/FormGroup";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ChangeEvent, FunctionComponent, useState } from "react";
import logo from "./NavBar/logo.png";

interface LoginPageProps {

}

const LoginPage: FunctionComponent<LoginPageProps> = (props): JSX.Element => {
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
                height: "20em",
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
                    <TextField
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <Typography color="text.secondary"
                        sx={{
                            "&:hover": {
                                textDecoration: "underline",
                                cursor: "pointer"
                            }
                        }}
                    >Forgot password?</Typography>
                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </FormGroup>
            </Paper>
        </div>
    );
}

export default LoginPage;