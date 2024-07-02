import { Outlet } from "react-router-dom";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";

const Root = () => {
    return (
        <div>
            <Header></Header>

            <div>
                <Outlet></Outlet>
            </div>
            <div className="bg-[#77B0AA]">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;