import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
// import authService from "./authService";

// User from global storage
const user = JSON.parse(localStorage.getItem('user'));

const API_URL = 'https://test-api.sytbuilder.com/graphql'

const initialState = {
    // isLoggedIn: false,
    // isVerified: false,
    // user:"",
    // jwtToken: "",
    // expires_at: "",

    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message : ""
};

export const fetchUser =(email, password) => {
    let data = JSON.stringify({
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

    // return axios
    // .post('https://test-api.sytbuilder.com/graphql',
    //     data,
    //     options,
    // )
    // .then((res) => res.data)

    return fetch('https://test-api.sytbuilder.com/graphql', {
        method : "POST", 
    headers: {
        'Content-Type': 'application/json',
    },
    body: data,
    })
    .then((res) => res.json())
    .then((result) => result.data)
    .catch((error) => console.log(error));
};

 

// testing lorems
export const getLorems = createAsyncThunk(
    "getLorems",
    async (object, { getState, rejectWithValue }) => {
      console.log(getState());
      try {
        const { data } = await axios.get(
          "https://baconipsum.com/api/?type=meat-and-filler"
        );
        return data;
      } catch (error) {
        rejectWithValue(error.response);
      }
    }
  );


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
        // return response.data
      } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
        return thunkAPI.rejectWithValue(message)
      }
  })

  // login user
  export const login = createAsyncThunk('userAuth/login', async (userData, thunkAPI) => {

   
    const email = userData.email;
    const password = userData.password;

      let data = JSON.stringify({
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
        const response = await axios.post(API_URL, data, options)

        if(response.data){
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        // return response.data
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
        signupUser: (state, action) => {

            //process signing up new user
            
        },
        signinUser(state, action) {

            // console.log(action.payload.email);
            
            const email = action.payload.email;
            const password = action.payload.password
            
            // //sign in existing user
           const data = fetchUser(email, password);
                console.log(data);

                let jsonMap = JSON.stringify([...data.entries()]);
                let myMap = new Map(JSON.parse(jsonMap));
                console.log(myMap);
        //    state.data =JSON.perse(data);
        },
        reset: (state) => {
          state.isLoading = false
          state.isError = false
          state.isSuccess = false
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
          state.user = action.payload
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
          state.isSuccess = true
          state.user = action.payload
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading= false
          state.isError = true
          state.message = action.payload
          state.user = null
        })
    }
      
});

export const {reset} = userAuthSlice.actions;

export default userAuthSlice.reducer;