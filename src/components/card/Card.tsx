import './Card.sass'
import Select from '../inputs/select/Select';

const Card = () => {
    return (
        <article className='card'>
            <section className='card__title'>
                <section className='title'>
                    <h2 className='title__name'>Name&nbsp;-&nbsp;</h2>
                    <p className='title__type'>Type</p>
                    <p className='title__color'>(Color)</p>
                </section>
                <img src={require('../../imgs/close-icon.png')} className='close-icon' />
            </section>
            <section className='card__id'>
                ID: ХХХХХХХХХХХХХ
            </section>
            <div className='statusPriceWrapper'>
                <section className='card__status'>
                    <Select label='status' />
                </section>
                <section className='card__price'>
                    00.00 UAH/hr.
                </section>
            </div>
        </article>
    )
}

export default Card;