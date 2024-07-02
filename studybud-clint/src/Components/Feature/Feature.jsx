import { LiaBookSolid } from "react-icons/lia";
import { MdCastForEducation } from "react-icons/md";
import { GrUserExpert } from "react-icons/gr";
import '../../index.css';
import Features from '/images/features.jpg'


const Feature = () => {
    return (
        <div className="mt-7">

            <div className="text-center pb-5">
                <h3 className="text-4xl primary-color mb-3">Features</h3>
                <p className="accent-color w-full md:w-3/4 mx-auto">
                    Make your academic journey a collaborative adventure. Connect with like-minded peers, share knowledge and resources, and build meaningful connections. Together, we will unlock your full potential and empower you to achieve academic success.
                </p>
            </div>

            <div className="grid md:grid-cols-2 justify-between items-center md:gap-5 lg:gap-16 py-10">
                <ul className="timeline timeline-vertical">
                    <li>
                        <div className="timeline-middle rounded-full p-3 theme-sec">
                            <LiaBookSolid size={30} className="primary-color" />
                        </div>
                        <div className="ml-5 mb-4 p-5 border-color timeline-end timeline-box">
                            <h2 className='font-semibold primary-color text-xl mb-3'>Global Study Hub</h2>
                            <p className='accent-color'>
                                Connect globally, study together. Collaborate, share resources, conquer challenges.
                            </p>
                        </div>
                        <hr />
                    </li>

                    <li>
                        <hr />
                        <div className="timeline-middle rounded-full p-3 theme-sec">
                            <MdCastForEducation size={30} className="primary-color" />
                        </div>
                        <div className="ml-5 mb-4 p-5 border-color timeline-end timeline-box">
                            <h2 className='font-semibold primary-color text-xl mb-3'>Study Rooms</h2>
                            <p className='accent-color'>
                                Virtual study spaces tailored to subjects. Productivity and collaboration thrive.
                            </p>
                        </div>
                        <hr />
                    </li>

                    <li>
                        <hr />
                        <div className="timeline-middle rounded-full p-3 theme-sec">
                            <GrUserExpert size={30} className="primary-color" />
                        </div>
                        <div className="ml-5 mb-4 p-5 border-color timeline-end timeline-box">
                            <h2 className='font-semibold primary-color text-xl mb-3'>Expert Sessions</h2>
                            <p className='accent-color'>
                                Learn from seasoned educators. Expert-led study sessions enhance your journey.
                            </p>
                        </div>
                    </li>
                </ul>

                <div className="mt-10 md:mt-0 relative w-full h-[450px] freaturesimg">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#135c665e] to-[#e3fef751] rounded-2xl">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feature;