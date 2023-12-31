import './Card.sass'
import Select from '../inputs/select/Select';
import { IBicycle } from '../../store/slices/models/bicycle';

interface ICardProps extends IBicycle {
    onRemoveCard: (id: number) => void,
    onUpdateCard: (id: number, status: string) => void,
}

const Card: React.FC<ICardProps> = ({name, type, status, color, id, price, onUpdateCard, onRemoveCard}) => {

    const cardClass = `card status-${status}`;
    const fixedPrice = price.toFixed(2)

    return (
        <article className={cardClass}>
            <section className='card__title'>
                <section className='title'>
                    <h2 className='title__name'>{name}&nbsp;-&nbsp;</h2>
                    <p className='title__type'>{type}</p>
                    <p className='title__color'>({color})</p>
                </section>
                <img 
                    src={require('../../imgs/close-icon.png')} 
                    alt='close-icon'
                    className='close-icon' 
                    onClick={() => onRemoveCard(id)}  />
            </section>
            <section className='card__id'>
                ID: {id}
            </section>
            <div className='statusPriceWrapper'>
                <section className='card__status'>
                    <Select 
                        label='status' 
                        options={['available', 'busy', 'unavailable']} 
                        activeOption={status}  id={id} 
                        onSelect={onUpdateCard} />
                </section>
                <section className='card__price'>
                    {fixedPrice} UAH/hr.
                </section>
            </div>
        </article>
    )
}

export default Card;