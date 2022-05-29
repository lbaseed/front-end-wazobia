import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { CssBaseline, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Spinner from "../components/Spinner";
import validator from "validator";

// const style = {

// }

const AccountCard = styled("div")({
  display: "flex",
  textAlign: "center",
  flexDirection: "column",
  backgroundColor: "#FFFFFF",
  border: "1px solid #F0F0F0",
  width: "720px",
  minHeight: "auto",
  borderRadius: "8px",
  padding: "24px, 32px, 40px, 32px",
  paddingTop: 24,
  paddingLeft: 32,
  paddingRight: 32,
  paddingBottom: 40,
  marginTop: "100px",
  // gap:'40px'
});

const FormGroup = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

const FormInputs = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

const theme = createTheme({
  palette: {
    grey: {
      main: "#B7BCC3",
      contrastText: "#fff",
    },
  },
});

const LoginUser = () => {
  const [userState, setUserState] = useState({ email: "" });
  const [isEmail, setIsEmail] = useState(null);
  const [toggleShowPassword, setToggleShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(userState.email.length);

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
      toast.success(message);
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(userState));
  };

  const togglePassword = () => setToggleShowPassword(!toggleShowPassword);

  return (
    <>
      <CssBaseline />
      <div className="container">
        <AccountCard>
          <span className="pageHead">Log in</span>
          <span>
            If you have no account,{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Sign Up
            </Link>{" "}
          </span>

          {isLoading ? (
            <div style={{ margin: "auto" }}>
              <Spinner />
            </div>
          ) : (
            ""
          )}
          <form onSubmit={handleSubmit}>
            <FormInputs sx={{ marginTop: "22px" }}>
              <FormGroup>
                <label>Email</label>
                <TextField
                  type={"email"}
                  placeholder="Type your email address here"
                  required
                  id="outlined-basic"
                  sx={{ width: 656 }}
                  size="small"
                  autoComplete="off"
                  onChange={(e) => {
                    const email = e.target.value;
                    // TODO: Validation

                    // add content to local state
                    validator.isEmail(email)
                      ? setIsEmail(true)
                      : setIsEmail(false);

                    if (email.length > 0) setUserState({ ...userState, email });
                  }}
                />
                {userState.email.length > 0 ? (
                  <div>
                    {isEmail ? (
                      <span style={{ color: "#07982F", fontSize: "12px" }}>
                        correct email format
                      </span>
                    ) : (
                      <span style={{ color: "#F41E10", fontSize: "12px" }}>
                        wrong email format
                      </span>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </FormGroup>

              <FormGroup sx={{ marginTop: "22px" }}>
                <label>Password</label>
                <OutlinedInput
                  placeholder="Type your password here"
                  type={toggleShowPassword ? "text" : "password"}
                  id="outlined-basic"
                  sx={{ width: 656 }}
                  size="small"
                  autoComplete="off"
                  onChange={(e) => {
                    const password = e.target.value;
                    // TODO: Validation

                    // add content to local state
                    setUserState({ ...userState, password });
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                        style={{ color: "#999F9B" }}
                      >
                        {toggleShowPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormGroup>
            </FormInputs>

            <ThemeProvider theme={theme}>
              <Button
                type="submit"
                color="grey"
                style={{
                  marginTop: "35px",
                  height: 48,
                  width: 656,
                  fontWeight: 800,
                  textTransform: "initial",
                  fontSize: 16,
                }}
                variant="contained"
              >
                Log in
              </Button>
            </ThemeProvider>
          </form>
        </AccountCard>
      </div>
    </>
  );
};

export default LoginUser;
