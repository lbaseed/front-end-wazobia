import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";



const API_URL = 'https://test-api.sytbuilder.com/graphql'

const token = JSON.parse(localStorage.getItem('user'));

// console.log(token.token);

const initialState = {
    items : [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message : ""
};

export const getItems = createAsyncThunk('items/all', async (thunkAPI)=> {
    // prepare paylaod for api
    const payload = JSON.stringify({
        query: `
        query {
            getItems(page:1 count:5){
              items{
                _id  
                uuid
                name
                description
              }
            }
          }
        `
    });

    const options = {
        headers: {
            "content-type" : "application/json",
            "authorization": `Bearer ${token.token}`
        }
    }

    try {
        // get list of all items
        const response = await axios.post(API_URL, payload, options)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
        return thunkAPI.rejectWithValue(message)
    }
})

export const createItem = createAsyncThunk('item/create', async (itemData, thunkAPI)=> {
    // prepare items for api call

    const payload = JSON.stringify({
        query: `
        
        `
    })
    try {
        // create new item here
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() 
        return thunkAPI.rejectWithValue(message)
    }
})

export const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        reset: initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getItems.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getItems.fulfilled, (state, action) => {
            state.isLoading= false
            state.isSuccess = true
            state.items = action.payload.data.getItems.items
        })
        .addCase(getItems.rejected, (state, action) => {
            state.isLoading= false
            state.isError = true
            state.message = action.payload
        })
    }
})


export const {reset} = itemSlice.actions
export default itemSlice.reducer