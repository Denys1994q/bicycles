import "./AdminPanel.sass";
import Card from "../../components/card/Card";
import CardForm from "../../components/card-form/Card-form";
import Statistics from "../../components/statistics/Statistics";

const AdminPanel = () => {

    const statsData = [
        {title: 'Total Bikes', value: 0},
        {title: 'Available Bikes', value: 0},
        {title: 'Booked Bikes', value: 0},
        {title: 'Average bike cost', value: 0, mark: 'UAH/hr.'},
    ]

    return (
        <section className='adminPanel'>
            <ul className='adminPanel__cards'>
                <li>
                    <Card />
                </li>
            </ul>
            <div className='adminPanel__form'>
                <CardForm />
                <Statistics data={statsData} />
            </div>
        </section>
    );
};

export default AdminPanel;
