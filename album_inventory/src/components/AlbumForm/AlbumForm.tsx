import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseName,
    choosePrice,

    chooseDescription,

    chooseCamera,

    chooseDimension,

    chooseFlight,

    chooseProdCost,

    chooseSeries,

    chooseSpeed,

    chooseWeight } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface AlbumFormProps {
    id?:string;
    data?:{}
}

interface AlbumState {
    name: string;
    price: string;
}

export const AlbumForm = (props:AlbumFormProps) => {

    const dispatch = useDispatch();
    let { albumData, getData } = useGetData();
    const store = useStore()
    
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))

            dispatch(choosePrice(data.price))

            dispatch(chooseCamera(data.camera_quality))

            dispatch(chooseDescription(data.description))

            dispatch(chooseProdCost(data.cost_of_production))

            dispatch(chooseDimension(data.dimensions))

            dispatch(chooseWeight(data.weight))

            dispatch(chooseFlight(data.flight_time))

            dispatch(chooseSeries(data.series))

            dispatch(chooseSpeed(data.max_speed))

            console.log(store.getState())

            await serverCalls.create(store.getState())

            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Drone Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <Input {...register('price')} name="price" placeholder="Price"/>
                </div>
                <div>
                    <label htmlFor="camera_quality">Camera Quality</label>
                    <Input {...register('camera_quality')} name="camera_quality" placeholder="Camera Quality"/>
                </div>
                <div>
                    <label htmlFor="flight_time">Flight Time</label>
                    <Input {...register('flight_time')} name="flight_time" placeholder="Flight Time"/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Description"/>
                </div>
                <div>
                    <label htmlFor="dimensions">Dimensions</label>
                    <Input {...register('dimensions')} name="dimensions" placeholder="Dimensions"/>
                </div>
                <div>
                    <label htmlFor="max_speed">Max Speed</label>
                    <Input {...register('max_speed')} name="max_speed" placeholder="Max Speed"/>
                </div>
                <div>
                    <label htmlFor="weight">Weight</label>
                    <Input {...register('weight')} name="weight" placeholder="Weight"/>
                </div>
                <div>
                    <label htmlFor="cost_of_production">Cost Of Production</label>
                    <Input {...register('cost_of_production')} name="cost_of_production" placeholder="Cost Of Production"/>
                </div>
                <div>
                    <label htmlFor="series">Series</label>
                    <Input {...register('series')} name="series" placeholder="Series"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}