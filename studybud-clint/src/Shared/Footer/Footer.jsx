import { FaPhone } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { SiMinutemailer } from "react-icons/si";
import { Link } from "react-router-dom";
import '../../index.css'


const navBar = <>
    <Link className='hover:text-[#003C43] text-white ' to={'/'}>Home</Link>
    <Link className='hover:text-[#003C43] text-white ' to={'/assignments'}>Assignments</Link>
    <Link className='hover:text-[#003C43] text-white ' to={'/createassignments'}>Create Assignments</Link>
    <Link className='hover:text-[#003C43] text-white ' to={'/pendingassignments'}>Pending Assignments</Link>
    <Link className='hover:text-[#003C43] text-white ' to={'/login'}>Login</Link>
    <Link className='hover:text-[#003C43] text-white S' to={'/register'}>Register</Link>
</>


const Footer = () => {
    return (
        <div>
            <div className="max-w-7xl w-11/12 md:w-10/12 mx-auto mt-5 py-10 text-white grid md:grid-cols-2 lg:grid-cols-3 justify-between items-start gap-4 font-poppins">
                <div className="space-y-3 ">
                    <Link to='/'> <img className="rounded-full" src={"/images/logo.png"} alt="" /> </Link>
                    <p className="w-full lg:w-3/4 text-left">
                        Your hub for collaborative learning. Connect, share, and thrive together. Join us for academic success and meaningful connections.
                    </p>
                </div>
                <div className="md:ml-7 lg:ml-0">
                    <h3 className="text-xl font-semibold">Links</h3>
                    <div className="flex flex-col space-y-2 mt-3">
                        {navBar}
                    </div>

                </div>
                <div className="space-y-2 pb-5">
                    <h3 className="text-xl font-semibold">Contact</h3>

                    <div className="flex items-center gap-2">
                        <FaPhone className="bg-white p-2 text-4xl primary-title rounded-full " />
                        <p className="text-white text-[18px]"> +880 846793738</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <SiMinutemailer className="bg-white p-2 text-4xl primary-title rounded-full " />
                        <p className="text-white text-[18px]">studybud@email.com</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <IoLocationSharp className="bg-white p-2 text-4xl primary-title rounded-full " />
                        <p className="text-white text-[18px]">1712 Main Street, Dhaka, Bangladesh</p>
                    </div>

                </div>
            </div>

            <div className="bg-[#E3FEF7] text-center p-3">
                <p className="text-[#818090]">&copy; StudyBud. All Rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;