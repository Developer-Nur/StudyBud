import Banner from "../../Components/Banner/Banner";
import Faq from "../../Components/Faq/Faq";
import Feature from "../../Components/Feature/Feature";

const Home = () => {
    return (
        <div className="max-w-7xl w-10/12 mx-auto">
            <Banner></Banner>
            <Feature></Feature>
            <Faq></Faq>
        </div>
    );
};

export default Home;