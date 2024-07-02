import '../index.css';
import LodingSpiner from '../../public/lottie_animations/spinner.json'
import Lottie from "lottie-react";
import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import useInfo from '../Hooks/useInfo';

const PrivetRoutes = ({ children }) => {

    const {user, loader} = useInfo()

    if (loader) {
        return <div className="flex justify-center items-center">
            <Lottie animationData={LodingSpiner} />
        </div>
    }

    if (user) {
        return children;
    }

    return <Navigate to='/login'></Navigate>;
};

PrivetRoutes.propTypes = {
    children: PropTypes.node
}

export default PrivetRoutes;