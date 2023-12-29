import "./AdminPanel.sass";
import { useState } from "react";
import CardForm from "../../components/card-form/Card-form";
import Statistics from "../../components/statistics/Statistics";
import { createNewBicycle, getAllBicycles, removeBicycle, updateBicycleStatus } from "../../store/slices/bicycles";
import { useEffect } from "react";
import Cards from "../../components/cards/Cards";
import Spinner from "../../components/spinner/Spinner";
import ErrorAlert from "../../components/error-alert/ErrorAlert";
import { IBicycle } from "../../store/slices/models/bicycle";
import { useAppDispatch } from "../../store/hooks";
import { useAppSelector } from "../../store/hooks";

const AdminPanel = () => {
    const dispatch = useAppDispatch();
    const bicycles = useAppSelector(store => store.bicycles.bicycles);
    const getAllBicyclesLoading = useAppSelector(store => store.bicycles.getAllBicyclesLoading);
    const getAllBicyclesError = useAppSelector(store => store.bicycles.getAllBicyclesError);
    const createNewBicycleLoading = useAppSelector(store => store.bicycles.createNewBicycleLoading);
    const createNewBicycleError = useAppSelector(store => store.bicycles.createNewBicycleError);
    const createNewBicycleErrorMsg = useAppSelector(store => store.bicycles.createNewBicycleErrorMsg);
    const removeBicycleError = useAppSelector(store => store.bicycles.removeBicycleError);
    const updateBicycleStatusError = useAppSelector(store => store.bicycles.updateBicycleStatusError);
    const [statsData, setStatsData] = useState([
        { title: "Total Bikes", value: 0 },
        { title: "Available Bikes", value: 0 },
        { title: "Booked Bikes", value: 0 },
        { title: "Average bike cost", value: 0, mark: "UAH/hr." }
    ])

    useEffect(() => {
        dispatch(getAllBicycles());
    }, []);

    useEffect(() => {
        const total = bicycles.length;
        const availableBikes = bicycles.filter((bike: IBicycle) => bike.status === 'available').length;
        const bookedBikes = bicycles.filter((bike: IBicycle) => bike.status === 'busy').length;
        const averageBikeCost = calculateAverageBikeCost(bicycles);
    
        const newStatsData: any = [
            { title: "Total Bikes", value: total },
            { title: "Available Bikes", value: availableBikes },
            { title: "Booked Bikes", value: bookedBikes },
            { title: "Average bike cost", value: averageBikeCost, mark: "UAH/hr." }
        ];
    
        setStatsData(newStatsData);
    }, [bicycles]);

    const calculateAverageBikeCost = (bicycles: IBicycle[]) => {
        const totalBikes = bicycles.length;
    
        if (totalBikes === 0) {
            return "00.00";
        }
    
        const totalCost = bicycles.reduce((sum, bike) => sum + bike.price, 0);
        const averageCost = totalCost / totalBikes;

        const formattedAverageCost = averageCost.toFixed(2);
    
        return formattedAverageCost;
    };
    
    const onSubmit = (bicycleData: IBicycle) => {
        dispatch(createNewBicycle(bicycleData));
    };

    const onRemoveCard = (id: number) => {
        dispatch(removeBicycle(id));
    };

    type BicycleStatus = "available" | "busy" | "unavailable";
    const onUpdateCardStatus = (id: number, status: BicycleStatus) => {
        dispatch(updateBicycleStatus({ id, status }));
    };

    return (
        <section className='adminPanel'>
            <div className='adminPanel__cards'>
                {getAllBicyclesLoading ? (
                    <Spinner />
                ) : (
                    <Cards cards={bicycles} onRemoveCard={onRemoveCard} onUpdateCard={onUpdateCardStatus} />
                )}
            </div>
            <div className='adminPanel__form'>
                <CardForm
                    onSubmit={onSubmit}
                    loading={createNewBicycleLoading}
                    error={createNewBicycleError}
                    errorMsg={createNewBicycleErrorMsg}
                />
                <Statistics data={statsData} />
            </div>
            {getAllBicyclesError || removeBicycleError || updateBicycleStatusError ? (
                <div className='error-wrapper'>
                    <ErrorAlert />
                </div>
            ) : null}
        </section>
    );
};

export default AdminPanel;
