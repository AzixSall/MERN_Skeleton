import MainTitle from '../components/typography/MainTitle.js';
import SecondaryTitle from '../components/typography/secondaryTitle.js';
import Paragraphe from '../components/typography/paragraph.js';
import Card from '../components/ui/card.js';

const allCardDetails = [
    { title: 'Users Authentication', description: 'Signup / Login Your Users', image: '../../public/download.png' },
    { title: 'User Management', description: 'Edit /Delete your Users', image: '../../public/download.png' },
    { title: 'JWT Authentication', description: 'Secure authentication', image: '../../public/download.png' }
];


const Home = () => (
    <div>
        <MainTitle text="Skeleton MERN APP"></MainTitle>
        <hr></hr>
        <SecondaryTitle text="This app goal is to give a fondation for building your MERN application, it's done with Typescript, Vite and uses Sass for styling."></SecondaryTitle>
        <hr></hr>
        <Paragraphe text="This project displays the following properties"></Paragraphe>
        <div className="row">
            {allCardDetails.map((details, index) => (
                <div key={index} className="col-1-of-3">
                    <Card details={details} />
                </div>
            ))}
        </div>

    </div>
);


export default Home;