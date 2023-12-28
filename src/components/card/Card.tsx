import './Card.sass'
import Select from '../inputs/select/Select';

interface ICard {
    name: string,
    type: string,
    color: string,
    id: number,
    price: number,
    status: string,
}

interface ICardProps extends ICard {
    onRemoveCard: (id: number) => void
}

const Card: React.FC<ICardProps> = ({name, type, color, id, price, onRemoveCard}) => {
    return (
        <article className='card'>
            <section className='card__title'>
                <section className='title'>
                    <h2 className='title__name'>{name}&nbsp;-&nbsp;</h2>
                    <p className='title__type'>{type}</p>
                    <p className='title__color'>({color})</p>
                </section>
                <img src={require('../../imgs/close-icon.png')} className='close-icon' onClick={() => onRemoveCard(id)} />
            </section>
            <section className='card__id'>
                ID: {id}
            </section>
            <div className='statusPriceWrapper'>
                <section className='card__status'>
                    <Select label='status' options={['Available', 'Busy', 'Unavailable']} />
                </section>
                <section className='card__price'>
                    {price} UAH/hr.
                </section>
            </div>
        </article>
    )
}

export default Card;