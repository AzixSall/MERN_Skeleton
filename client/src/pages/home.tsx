import MainTitle from '../components/typography/MainTitle.js';
import SecondaryTitle from '../components/typography/secondaryTitle.js';
import Paragraphe from '../components/typography/paragraph.js';
import Card from '../components/ui/card.js';

const cardDetails = {
    title: 'Sample Card Title',
    description: 'This is a description for the card.',
    image: '../assets/download.png'
};


const Home = () => (
    <div>
        <MainTitle text="Skeleton MERN APP"></MainTitle>
        <hr></hr>
        <SecondaryTitle text="This app goal is to give a fondation for building your MERN application, it's done with Typescript, Vite and uses Sass for styling."></SecondaryTitle>
        <hr></hr>
        <Paragraphe text="This project displays the following properties"></Paragraphe>
        <Card details={cardDetails} />
        <div className="row">
            <div className="col-1-of-2">
                <Card details={cardDetails} />
            </div>
            <div className="col-1-of-2">
                <Card details={cardDetails} />
            </div>
        </div>

    </div>
);


export default Home;