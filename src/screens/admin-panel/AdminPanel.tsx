import "./AdminPanel.sass";
import { useState } from "react";
import CardForm from "../../components/card-form/Card-form";
import Statistics from "../../components/statistics/Statistics";
import { useDispatch } from "react-redux";
import { createNewBicycle, getAllBicycles, removeBicycle, updateBicycleStatus } from "../../store/slices/bicycles";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Cards from "../../components/cards/Cards";
import Spinner from "../../components/spinner/Spinner";
import ErrorAlert from "../../components/error-alert/ErrorAlert";
import { IBicycle } from "../../store/slices/models/bicycle";

const AdminPanel = () => {
    const dispatch = useDispatch();
    const bicycles = useSelector((store: any) => store.BicyclesSlice.bicycles);
    const getAllBicyclesLoading = useSelector((store: any) => store.BicyclesSlice.getAllBicyclesLoading);
    const getAllBicyclesError = useSelector((store: any) => store.BicyclesSlice.getAllBicyclesError);
    const createNewBicycleLoading = useSelector((store: any) => store.BicyclesSlice.createNewBicycleLoading);
    const createNewBicycleError = useSelector((store: any) => store.BicyclesSlice.createNewBicycleError);
    const createNewBicycleErrorMsg = useSelector((store: any) => store.BicyclesSlice.createNewBicycleErrorMsg);
    const removeBicycleError = useSelector((store: any) => store.BicyclesSlice.removeBicycleError);
    const updateBicycleStatusError = useSelector((store: any) => store.BicyclesSlice.updateBicycleStatusError);
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
    
        // Форматування до двох десяткових знаків
        const formattedAverageCost = averageCost.toFixed(2);
    
        return formattedAverageCost;
    };
    
    

    // const statsData = [
    //     { title: "Total Bikes", value: 0 },
    //     { title: "Available Bikes", value: 0 },
    //     { title: "Booked Bikes", value: 0 },
    //     { title: "Average bike cost", value: 0, mark: "UAH/hr." },
    // ];

    const onSubmit = (bicycleData: any) => {
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
