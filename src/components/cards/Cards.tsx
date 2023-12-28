import Card from "../card/Card";

const Cards = ({ cards, onRemoveCard, onUpdateCard }: any) => {
    return (
        <>
            {cards && cards.length > 0 ? (
                <ul>
                    {cards.map((card: any) => (
                        <li key={card.id}>
                            <Card {...card} onRemoveCard={onRemoveCard} onUpdateCard={onUpdateCard} />
                        </li>
                    ))}
                </ul>
            ) : (
                <h4>No cards yet</h4>
            )}
        </>
    );
};

export default Cards;
