import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";


// User from global local storage
const user = JSON.parse(localStorage.getItem('user'));

const API_URL = 'https://test-api.sytbuilder.com/graphql'

const initialState = {
    isLoggedIn: false,
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message : ""
};


  // register user
  export const createAccount = createAsyncThunk('userAuth/createAccount', async (userData, thunkAPI) => {

    const first_name = userData.first_name;
    const last_name = userData.last_name;
    const email = userData.email;
    const password = userData.password;

    let data = JSON.stringify({
        query: `
        mutation {
            signup(first_name:"${first_name}", last_name:"${last_name}", email:"${email}", password:"${password}"){
             user{
                _id
                uuid
                first_name
                last_name
                email
                email_verified_at
            },
              token
            }
          }
        `,
        variables: {
        now: new Date().toISOString(),
        },
        });
    let options = {
        headers: {
        'Content-Type': 'application/json',
    }
    }
      try { 
        const response = await axios.post(API_URL, data, options)

        if(response.data){
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
        return thunkAPI.rejectWithValue(message)
      }
  })

  // login user
  export const login = createAsyncThunk('userAuth/login', async (userData, thunkAPI) => {

   
    const email = userData.email;
    const password = userData.password;

      let payload = JSON.stringify({
          query: `
          mutation{
            login(email:"${email}", password:"${password}"){
                user{
                uuid,
                first_name,
                last_name,
                email,
                email_verification_token,
                email_verified_at
                },
                token
            }
        }
          `,
          variables: {
          now: new Date().toISOString(),
          },
          });
      let options = {
          headers: {
          'Content-Type': 'application/json',
      }
      }
      try { 
        const response = await axios.post(API_URL, payload, options)

        if(response.data){
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
        return thunkAPI.rejectWithValue(message)
      }
  })

  // logout user
  export const logout = () => {
    localStorage.removeItem('user');
  }

export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        
        reset: (state) => {
          state.isLoading = false
          state.isError = false
          state.isSuccess = false
          state.isLoggedIn = false
          state.message = ''
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(createAccount.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createAccount.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload.data.signup
        })
        .addCase(createAccount.rejected, (state, action) => {
          state.isLoading= false
          state.isError = true
          state.message = action.payload
          state.user = null
        })
        .addCase(login.pending, (state) => {
          state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false
          // check for successful login token
          if(action.payload.data.login){
            state.isLoggedIn = true
            state.isSuccess = true
            state.user = action.payload.data.login
            localStorage.setItem('user', JSON.stringify(action.payload.data.login))
            state.message = "Login Success"
          }
          if(action.payload.errors){
            state.isSuccess = true
            state.message = action.payload.errors.message
          }
          
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading= false
          state.isError = true
          state.message = action.payload
          state.user = null
        })
        .addCase(logout, (state) => {
          state.user = null
        })
    }
      
});

export const {reset} = userAuthSlice.actions;

export default userAuthSlice.reducer;