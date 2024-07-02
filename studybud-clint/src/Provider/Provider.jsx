import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider } from "firebase/auth";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import axios from "axios";

export const AllInfo = createContext(null);

const Provider = ({ children }) => {

    const googleprovider = new GoogleAuthProvider();

    // Staters
    const [user, setUser] = useState(null);
    // const [loder, setLoder] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const [loader, setLoader] = useState(true);

    // console.log(user);


    // create a user 
    const createUser = (email, password, name, image) => {
        setLoader(true)
        setUserName(name)
        setUserImage(image)
        return createUserWithEmailAndPassword(auth, email, password)

    }


    //   user Log in
    const singinUser = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    // google sing in
    const socialSingin = () => {
        return signInWithPopup(auth, googleprovider);

    }


    // handle sing out
    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {

            setUser(currentUser)
            setLoader(false)
           
        })
        return () => {
            unSubscribe()
        }
    }, [])




    const dataInfo = {
        user,
        setLoader,
        loader,
        userName,
        logOut,
        userImage,
        singinUser,
        createUser,
        socialSingin

    }


    return (
        <AllInfo.Provider value={dataInfo}>
            {children}
        </AllInfo.Provider>
    );
};

Provider.propTypes = {
    children: PropTypes.node
}

export default Provider;