import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

export const getAllBicycles: any = createAsyncThunk(
    "bicycles/getAllBicycles",
    async () => {
      const response = await fetch("http://localhost:4444/bicycles");
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData[0].msg || 'Failed to get bicycles');
      }
  
      const data = await response.json();
      return data;
    }
);

export const createNewBicycle: any = createAsyncThunk(
    "bicycles/createNewBicycle",
    async (bicycleData) => {
      const response = await fetch("http://localhost:4444/create-product", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bicycleData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData[0].msg || 'Failed to create a new bicycle');
      }
  
      const data = await response.json();
      return data;
    }
);

export const updateBicycleStatus = createAsyncThunk(
    'bicycles/updateStatus',
    async ({ id, status }: any) => {
      try {
        const response = await fetch(`http://localhost:4444/update-product-status/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData[0].msg || 'Failed to update bicycle status');
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    }
);
  
export const removeBicycle: any = createAsyncThunk(
    "bicycles/removeBicycle",
    async (bicycleId) => {
      const response = await fetch(`http://localhost:4444/remove-product/${bicycleId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData[0].msg || 'Failed to remove the bicycle');
      }
  
      const data = await response.json();
      return data;
    }
  );

const initialState = {
    bicycles: [],
    // 
    createNewBicycleLoading: false,
    createNewBicycleError: false,
    createNewBicycleErrorMsg: '',
    // 
    getAllBicyclesLoading: false,
    getAllBicyclesError: false,
    // 
    removeBicycleLoading: false,
    removeBicycleError: false,
    // 
    updateBicycleStatusLoading: false,
    updateBicycleStatusError: false,
};

const BicyclesSlice = createSlice({
    name: "bicycles",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder 
        // create bicycle
            .addCase(createNewBicycle.pending, state => {
                state.createNewBicycleLoading = true;
                state.createNewBicycleError = false;
            })
            .addCase(createNewBicycle.fulfilled, (state, action) => {
                state.bicycles = action.payload.bicycles;
                state.createNewBicycleLoading = false;
                state.createNewBicycleError = false;
            })
            .addCase(createNewBicycle.rejected, (state, action) => {
                if (action.error) {
                    state.createNewBicycleError = true;
                    state.createNewBicycleErrorMsg = action.error.message;
                    state.createNewBicycleLoading = false;
                } else {
                    state.createNewBicycleError = true;
                    state.createNewBicycleErrorMsg = 'An error occurred';
                    state.createNewBicycleLoading = false;
                }
            })
        // remove bicycle
            .addCase(removeBicycle.pending, (state) => {
                state.removeBicycleLoading = true;
                state.removeBicycleError = false;
            })
            .addCase(removeBicycle.fulfilled, (state, action) => {
                state.bicycles = action.payload.bicycles;
                state.removeBicycleLoading = false;
                state.removeBicycleError = false;
            })
            .addCase(removeBicycle.rejected, (state, action) => {
                state.removeBicycleError = true;
                state.removeBicycleLoading = false;
            })
        // update bicycle status
            .addCase(updateBicycleStatus.pending, (state) => {
                state.updateBicycleStatusLoading = true;
                state.updateBicycleStatusError = false;
            })
            .addCase(updateBicycleStatus.fulfilled, (state, action) => {
                state.bicycles = action.payload.bicycles;
                state.updateBicycleStatusLoading = false;
                state.updateBicycleStatusError = false;
            })
            .addCase(updateBicycleStatus.rejected, (state, action) => {
                state.updateBicycleStatusError = true;
                state.updateBicycleStatusLoading = false;
            })
        // get all bicycles 
            .addCase(getAllBicycles.pending, (state) => {
                state.getAllBicyclesLoading = true;
                state.getAllBicyclesError = false;
            })
            .addCase(getAllBicycles.fulfilled, (state, action) => {
                console.log(action.payload)
                state.bicycles = action.payload;
                state.getAllBicyclesLoading = false;
                state.getAllBicyclesError = false;
            })
            .addCase(getAllBicycles.rejected, (state, action) => {
                state.getAllBicyclesError = true
                state.getAllBicyclesLoading = false
            });
    }
  });

const { actions, reducer } = BicyclesSlice;

export default reducer;

export const {} = actions;