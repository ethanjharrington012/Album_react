import { createSlice } from '@reduxjs/toolkit';

export interface DroneState {
    name: string;
    price: number;
    description: string;
    camera_quality: string;
    flight_time: string;
    max_speed: string;
    dimensions: string;
    weight: string;
    cost_of_production: number;
    series: string;
}

const initialState: DroneState = {
    name: 'Droney McDroneFace',
    price: 0,
    description: '',
    camera_quality: '',
    flight_time: '',
    max_speed: '',
    dimensions: '',
    weight: '',
    cost_of_production: 0,
    series: ''
}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseName: (state, action) => { state.name = action.payload },
        choosePrice: (state, action) => { state.price = action.payload },
        chooseDescription: (state, action) => { state.description = action.payload },
        chooseCamera: (state, action) => { state.camera_quality = action.payload },
        chooseFlight: (state, action) => { state.flight_time = action.payload },
        chooseSpeed: (state, action) => { state.max_speed = action.payload },
        chooseDimension: (state, action) => { state.dimensions = action.payload },
        chooseWeight: (state, action) => { state.weight = action.payload },
        chooseProdCost: (state, action) => { state.cost_of_production = action.payload },
        chooseSeries: (state, action) => { state.series = action.payload }
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const {
    chooseName,
    choosePrice,
    chooseDescription,
    chooseCamera,
    chooseFlight,
    chooseSpeed,
    chooseDimension,
    chooseWeight,
    chooseProdCost,
    chooseSeries
} = rootSlice.actions;