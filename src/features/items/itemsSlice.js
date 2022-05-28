import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";



const API_URL = 'https://test-api.sytbuilder.com/graphql'

const initialState = {
    item : [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message : ""
};

export const getItems = createAsyncThunk('items/all', async (thunkAPI)=> {

    try {
        // get list of all items

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
    name: "",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase('', (state, action) => {

        })
    }
})