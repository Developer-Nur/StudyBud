import { Link, NavLink } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from '/images/logo.png';
import { FaRegWindowClose } from "react-icons/fa";
import '../../index.css';
import { useState } from "react";
import useInfo from "../../Hooks/useInfo";
import Swal from "sweetalert2";
import useTheme from "../../Hooks/useTheme";



const Header = () => {

    // user data form custom hook 
    const { user, logOut } = useInfo()
    const [theme, toggleTheme] = useTheme();


    const [navMenu, setNavMenu] = useState(false)


    // handle user logout
    const handleLogout = () => {
        logOut()
            .then(() => Swal.fire('Sing out successfully'))
            .catch(error => Swal.fire("Sing out success!"))
    }


    return (
        <div className="primary-bg relative">


            <div className="max-w-7xl w-11/12 md:w-10/12  mx-auto navbar">
                <div className="flex-1 p-3">
                    <Link to={'/'}>
                        <img className="w-16 rounded-full" src={logo} alt="" />
                    </Link>
                </div>
                <div className="flex-none gap-2">

                    {/* nabmenu toggler */}
                    <div className="mr-5">
                        <button onClick={() => setNavMenu(true)} className="p-2 rounded-lg hover:bg-[#77B0AA] theme-sec border-none">
                            <GiHamburgerMenu size={19} className=" primary-title " />
                        </button>
                    </div>

                    {/* user avatar and sing out */}
                    <div className="dropdown dropdown-end">

                        <div tabIndex={0} role="button" className="mt-1 btn btn-ghost btn-circle avatar">
                            <div className="title-sec w-full rounded-full">

                                {/* if user login user image will show here */}

                                {
                                    user ? <img src={user.photoURL}></img> : <RxAvatar size={45} />
                                }
                            </div>
                        </div>

                        {/* avatar drop down */}
                        <ul tabIndex={0} className="mt-3 z-10 p-2 shadow menu menu-sm dropdown-content primary-bg rounded-box w-60">

                            <li>
                                <Link to={'/'}>
                                    <button className="py-2 -ml-1 title-sec text-base font-[500]">Attempted Assignments </button>
                                </Link>
                            </li>

                            <li>
                                <button onClick={handleLogout} className="p-2 title-sec text-base font-[500]">Logout</button>
                            </li>
                        </ul>
                    </div>

                    {/* login */}

                    {
                        !user && <Link to={'/login'}>
                            <button className="title-sec text-[18px]">Login</button>
                        </Link>
                    }



                    {/* theme control */}

                    <div>
                        <label className="swap swap-rotate">

                            {/* this hidden checkbox controls the state of theme */}
                            <input onChange={toggleTheme} checked={theme === "dark"} type="checkbox" className="theme-controller" value="synthwave" />

                            

                            {/* moon icon */}
                            <svg className="title-sec swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>


                            {/* sun icon */}
                            <svg className=" swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                        </label>
                    </div>
                </div>
            </div>

            {/* side bar menu */}

            <div className={navMenu ? '' : 'hidden'}>
                <aside className="z-10 fixed top-0 left-0 flex flex-col h-screen w-64 p-4 overflow-hidden theme-bg">
                    <div className="mr-5 w-full h-s text-right">
                        <button onClick={() => setNavMenu(false)} className="p-2 rounded-lg hover:bg-[#77B0AA] theme-sec border-none">
                            <FaRegWindowClose size={19} className=" primary-title " />
                        </button>
                    </div>
                    <div className=" font-poppins mt-4 ">

                        {/* side menu top */}
                        <div className="w-full flex flex-col items-center">
                            <div className="mt-2 w-2/5 mb-2">
                                <img className="ml-3 rounded-full w-16" src={logo} alt="avatar" />
                            </div>

                            <h2 className=" title-sec font-semibold text-2xl pb-4">StudyBud</h2>

                        </div>
                        <hr className="border-[#E3FEF7] border-b-2" />

                        <nav className="flex flex-col space-y-3 mt-7">
                            {/* {navBar} */}

                            <NavLink className='p-2 text-18px title-sec hover:bg-[#E3FEF7] hover:text-[#003C43] rounded-lg ' to={'/'}>Home</NavLink>
                            <NavLink className='p-2 text-18px title-sec hover:bg-[#E3FEF7] hover:text-[#003C43] rounded-lg ' to={'/assignments'}>Assignments</NavLink>
                            <NavLink className='p-2 text-18px title-sec hover:bg-[#E3FEF7] hover:text-[#003C43] rounded-lg ' to={'/createassignments'}>Create Assignments</NavLink>
                            
                            <NavLink className='p-2 text-18px title-sec hover:bg-[#E3FEF7] hover:text-[#003C43] rounded-lg ' to={'/mysubmitted'}>My Submitted</NavLink>

                            <NavLink className='p-2 text-18px title-sec hover:bg-[#E3FEF7] hover:text-[#003C43] rounded-lg ' to={'/pendingassignments'}>Pending Assignments</NavLink>


                            {/* conditional rendering, if a user logged in some link will be hidden and logout option will active  */}
                            {
                                user ? <button onClick={handleLogout} className='text-left p-2 text-18px title-sec hover:bg-[#E3FEF7] hover:text-[#003C43] rounded-lg '>Logout</button> : <><NavLink className='p-2 text-18px title-sec hover:bg-[#E3FEF7] hover:text-[#003C43] rounded-lg ' to={'/login'}>Login</NavLink>
                                    <NavLink className='p-2 text-18px title-sec hover:bg-[#E3FEF7] hover:text-[#003C43] rounded-lg S' to={'/register'}>Register</NavLink></>
                            }

                        </nav>
                    </div>
                </aside>
            </div>




        </div>
    );
};

export default Header;