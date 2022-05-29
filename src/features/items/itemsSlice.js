import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://test-api.sytbuilder.com/graphql";

const initialState = {
  items: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// create new item
export const createItem = createAsyncThunk(
  "item/create",
  async (itemData, thunkAPI) => {
    // prepare items for api call

    const payload = JSON.stringify({
      query: `
        mutation{
            createItem(name:"${itemData.name}", description:"${itemData.description}"){
              uuid
              name
              description
              created_at
              updated_at
            }
          }
        `,
    });
    const token = thunkAPI.getState().userAuth.user.token;
    const options = {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    try {
      // create new item here
      const response = await axios.post(API_URL, payload, options);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Read all items
export const getItems = createAsyncThunk("items/all", async (_, thunkAPI) => {
  // prepare paylaod for api
  const payload = JSON.stringify({
    query: `
        query {
            getItems(page:1 count:10){
              items{
                _id  
                uuid
                name
                description
                created_at
                updated_at
              }
            }
          }
        `,
  });
  const token = thunkAPI.getState().userAuth.user.token;

  const options = {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  try {
    // get list of all items
    const response = await axios.post(API_URL, payload, options);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update item
export const UpdateItem = createAsyncThunk(
  "item/update",
  async (itemData, thunkAPI) => {
    // prepare items for api call

    const payload = JSON.stringify({
      query: `
        mutation{
            updateItem(uuid: "${itemData.uuid}" name:"${itemData.name}" description:"${itemData.description}"){
              _id
              uuid
              name
              description
              created_at
              updated_at
            }
          }
        `,
    });
    const token = thunkAPI.getState().userAuth.user.token;
    const options = {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    try {
      // create new item here
      const response = await axios.post(API_URL, payload, options);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete Item
export const deleteItem = createAsyncThunk(
  "item/delete",
  async (item, thunkAPI) => {
    // payload
    const payload = JSON.stringify({
      query: `
        mutation {
            deleteItem(uuid:"${item}"){
                        uuid
            }
          }
        `,
    });
    const token = thunkAPI.getState().userAuth.user.token;
    const options = {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    try {
      // perform delete here
      const response = await axios.post(API_URL, payload, options);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    reset: initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createItem.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items.push(action.payload.data.createItem);
        state.message = "Item Created Sucessfully";
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload.data.getItems.items;
        state.message = "Loading Complete";
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(UpdateItem.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(UpdateItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const newData = action.payload.data.updateItem;
        state.items = state.items.filter((item) => item.uuid !== newData.uuid);
        state.items.push(newData);
        state.message = "Item Updated";
      })
      .addCase(UpdateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const id = action.payload.data.deleteItem.uuid;
        state.items = state.items.filter((item) => item.uuid !== id);
        state.message = "Item Deleted";
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = itemSlice.actions;
export default itemSlice.reducer;
