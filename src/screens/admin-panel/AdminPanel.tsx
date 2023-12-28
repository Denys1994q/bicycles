import "./AdminPanel.sass";
import CardForm from "../../components/card-form/Card-form";
import Statistics from "../../components/statistics/Statistics";
import { useDispatch } from "react-redux";
import { createNewBicycle, getAllBicycles, removeBicycle, updateBicycleStatus } from "../../store/slices/bicycles";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Cards from "../../components/cards/Cards";
import Spinner from "../../components/spinner/Spinner";

const AdminPanel = () => {
    const dispatch = useDispatch();
    const bicycles = useSelector((store: any) => store.BicyclesSlice.bicycles);
    const getAllBicyclesLoading = useSelector((store: any) => store.BicyclesSlice.getAllBicyclesLoading);
    const getAllBicyclesError = useSelector((store: any) => store.BicyclesSlice.getAllBicyclesError);
    const createNewBicycleLoading = useSelector((store: any) => store.BicyclesSlice.createNewBicycleLoading);
    const createNewBicycleError = useSelector((store: any) => store.BicyclesSlice.createNewBicycleError);
    const createNewBicycleErrorMsg = useSelector((store: any) => store.BicyclesSlice.createNewBicycleErrorMsg);
    const removeBicycleError = useSelector((store: any) => store.BicyclesSlice.removeBicycleError);

    useEffect(() => {
        dispatch(getAllBicycles());
    }, []);

    const statsData = [
        { title: "Total Bikes", value: 0 },
        { title: "Available Bikes", value: 0 },
        { title: "Booked Bikes", value: 0 },
        { title: "Average bike cost", value: 0, mark: "UAH/hr." },
    ];

    const onSubmit = (bicycleData: any) => {
        dispatch(createNewBicycle(bicycleData));
    };

    const onRemoveCard = (id: number) => {
        dispatch(removeBicycle(id));
    };

    type BicycleStatus = "available" | "busy" | "unavailable";
    const onUpdateCardStatus = (id: number, status: BicycleStatus) => {
        dispatch(updateBicycleStatus({id, status}))
    }

    const errorOrCards = getAllBicyclesError || removeBicycleError ? 
        <h4>Error, something goes wrong...</h4> : 
        <Cards cards={bicycles} onRemoveCard={onRemoveCard} onUpdateCard={onUpdateCardStatus} />

    return (
        <section className='adminPanel'>
            <div className='adminPanel__cards'>
                {getAllBicyclesLoading ? <Spinner /> : <>{errorOrCards}</>}
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
        </section>
    );
};

export default AdminPanel;
