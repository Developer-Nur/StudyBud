import { useLoaderData } from "react-router-dom";
import useInfo from "../../Hooks/useInfo";
import '../../index.css';
import Lottie from "lottie-react";
import LodingSpiner from '../../../public/lottie_animations/spinner.json';
import { useState, useRef, useEffect } from "react";
import '../../index.css';
import axios from "axios";
import Swal from "sweetalert2";

const AssignmentDetails = () => {
    const dataItems = useLoaderData();
    const { user, loader } = useInfo();
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    const { _id, marks, image, title, dueDate, description, difficulty } = dataItems;


    // modal handling
    useEffect(() => {
        if (isOpen) {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        }
    }, [isOpen]);


    if (loader) {
        return (
            <div className="flex justify-center items-center">
                <Lottie animationData={LodingSpiner} />
            </div>
        );
    }


    // handle submit assignment
    const takeAssignment = e => {
        e.preventDefault();
        const form = e.target;
        const examineeName = user.displayName;
        const note = form.note.value;
        const email = user.email;
        const document = form.document.value;
        const status = "pending";
        const obtainedMarks = "No Marks yet";
        const taskTitle = title;
        const assignmentMarks = marks;

        // console.log("assignmetn data is :", note, document, email, status);

        const data = { examineeName, note, document, email, status, obtainedMarks, taskTitle, assignmentMarks}

        axios.post("https://studybud-server.vercel.app/pending-assignments", data)
            .then(res => {
                if (res.data.acknowledged) {
                    form.reset()
                    setIsOpen(false)
                    Swal.fire({
                        title: 'Success!',
                        text: 'Submitted successfully',
                        icon: 'success',
                        confirmButtonText: 'Close'
                    })
                    
                }
                // console.log("data after api ", res)
            })
            .catch(error => Swal.fire("Can not post your data!"))

    }



    return (
        <>
            <div className="max-w-7xl w-11/12 md:w-10/12  mx-auto py-20">
                <div className="text-center pb-5">
                    <h3 className="text-4xl primary-color mb-3">Assignment Details</h3>
                    <p className="accent-color w-full md:w-3/4 mx-auto">
                        On our online group study platform, users can easily create and assign tasks tailored to their groups needs. With customizable options, clear instructions, and collaborative features, fostering interactive learning experiences is a breeze.
                    </p>
                </div>
                <div className="px-0  md:px-20 lg:px-60 mt-10">
                    <div className="theme-sec overflow-hidden  rounded-lg shadow-lg">
                        <img
                            className="object-cover w-full h-64"
                            src={image}
                            alt="Assignment Image"
                        />
                        <div className="p-6">
                            <div>
                                <span className="text-sm font-medium text-blue-600 uppercase ">Difficulty: {difficulty}</span>
                                <h2 className="primary-color mt-2 text-xl font-semibold">
                                    {title}
                                </h2>
                                <p className=" text-[#707078] py-6">
                                    {description}
                                </p>
                                <p className=" text-[#262628] mt-2">
                                    Due date: {dueDate}
                                </p>
                                <div className="flex justify-between items-center mt-5  ">
                                    <p className=" text-[#262628] mt-2">
                                        Total Marks: {marks}
                                    </p>
                                    <button onClick={() => setIsOpen(true)} className='py-1 px-2 lg:p-3 text-base  rounded-lg title-sec theme-bg font-poppins hover:text-[#E3FEF7] 
                                        hover:bg-[#135D66]'>
                                        Take Assignment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Assignment modal */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box p-10">
                    <button className="btn btn-sm py-1 px-2 rounded-lg primary-color text-white text-xl font-semibold btn-circle absolute right-2 top-2" onClick={() => setIsOpen(false)}>X</button>
                    <form onSubmit={takeAssignment} method="dialog"  >
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="primary-color">Assignment URL</span>
                            </label>
                            <input name="document" type="text" placeholder="PDF/DOC URL" className="selected" required />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className=" primary-color">Description</span>
                            </label>

                            <textarea name="note" type="text" className="resize-none selected">
                            </textarea>
                        </div>

                        <input  type="submit" value="Submit" className='py-1 px-2 lg:p-3 text-base lg:text-[18px] rounded-lg title-sec theme-bg font-poppins hover:text-[#ffffff] hover:bg-[#135D66]' />
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default AssignmentDetails;
