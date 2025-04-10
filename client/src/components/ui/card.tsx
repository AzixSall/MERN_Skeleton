type CardProps = {
    title: string;
    description: string;
    image: string;
};

const Card = ({ details }: { details: CardProps }) => {
    const { title, description, image } = details;
    return (
        <div className="card">
            <img src={image} alt={title} className="card__image" />
            <h3 className="card__text">{title}</h3>
            <p className="card__paragraph">{description}</p>
        </div>
    );
};


export default Card;