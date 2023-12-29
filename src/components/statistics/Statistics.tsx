import "./Statistics.sass";

interface IStatItem {
    title: string,
    value: number,
    mark?: string
}

interface IStatisticsProps {
    data: IStatItem[]
}

const Statistics = ({data}: IStatisticsProps) => { 
    return (
        <section className='stats'>
            <h2 className='stats__title'>statistics</h2>
            <ul>
                {data.map((item, index) => {
                   return (
                    <p key={index} className="stats__item">
                        {item.title}: {" "}
                        <span className="stats__number">{item.value}</span>
                        {" "} {item?.mark}
                    </p>
                  );
                })}
            </ul>
        </section>
    );
};

export default Statistics;
