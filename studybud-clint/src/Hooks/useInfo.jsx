import { useContext } from "react";
import { AllInfo } from "../Provider/Provider";

const useInfo = () => {


    const { user, setLoader, loader, userName, logOut, userImage, singinUser, createUser, socialSingin } = useContext(AllInfo)


    return {
        user, setLoader, loader, userName, logOut, userImage, singinUser, createUser, socialSingin
    };
};

export default useInfo;