import { useLoaderData } from "react-router-dom";
import Lottie from 'lottie-react';
import LodingSpiner from '../../../public/lottie_animations/spinner.json';
import useInfo from "../../Hooks/useInfo";
import { useEffect, useRef, useState } from "react";
import '../../index.css'
import axios from "axios";
import Swal from "sweetalert2";


const PendingAssignments = () => {

    const allPendingData = useLoaderData()



    const { user, loader } = useInfo();
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);
    const [docUrl, setDocUrl] = useState();
    const [submiteNote, setSubmiteNote] = useState();
    const [id, setId] = useState();
    const [pendingAssignments, setPendingAssignments] = useState(allPendingData);






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




    // set document and note value to the modal
    const setValues = (document, note) => {
        setDocUrl(document)
        setSubmiteNote(note)
        setIsOpen(true);
    }


    // handle give marks
    const giveMarks = e => {
        e.preventDefault();
        const form = e.target;
        const obtainedMarks = form.obtainedMarks.value;
        const feedback = form.feedback.value;
        const examinerEmail = user.email;
        const status = "completed"

        const toUpdate = { obtainedMarks, feedback, status, examinerEmail }


        axios.put(`https://studybud-server.vercel.app/give-marks/${id}`, toUpdate)
            .then(res => {
                if (res.data.acknowledged) {
                    setIsOpen(false);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Assignment Complete',
                        icon: 'success',
                        confirmButtonText: 'Close'
                    })
                    form.reset()
                    setPendingAssignments(prevState => prevState.filter(assignment => assignment._id !== id));
                }
                // console.log("data after api ", res)
            })
            .catch(error => Swal.fire("Can not Give Mark"))

    }


    return (
        <div className="max-w-7xl w-11/12 md:w-10/12  mx-auto py-20">

            <div className="text-center pb-5">
                <h3 className="text-4xl primary-color mb-3">Assignment Details</h3>
                <p className="accent-color w-full md:w-3/4 mx-auto">
                    On our online group study platform, users can easily create and assign tasks tailored to their groups needs. With customizable options, clear instructions, and collaborative features, fostering interactive learning experiences is a breeze.
                </p>
            </div>

            {/* all pending data list */}
            <div className="p-5 table-container">
                <table className="table w-11/12">
                    {/* head */}
                    <thead>
                        <tr className='primary-color'>
                            <th>Status</th>
                            <th>Assignment Title</th>
                            <th>Examinee Name</th>
                            <th>Assignment Mark</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody className="gird grid-cols-4 justify-around">

                        {
                            pendingAssignments.map((data) => <>
                                <tr key={data._id}>
                                    <td className="">
                                        {data.status}
                                    </td>
                                    <td className=' primary-color font-semibold'>
                                        {data.taskTitle}
                                    </td>
                                    <td >
                                        {data.examineeName}
                                    </td>
                                    <td>
                                        {data.assignmentMarks}
                                    </td>
                                    <td>
                                        <button onClick={() => { setValues(data.document, data.note); setId(data._id) }} className='btn theme-sec'>
                                            Give Makr
                                        </button>
                                    </td>
                                </tr>
                            </>
                            )
                        }
                    </tbody>
                </table>
            </div>


            {/* Modal */}

            <dialog ref={modalRef} className="modal ">
                <div className="modal-box p-10  ">
                    <button className="btn btn-sm py-1 px-2 rounded-lg primary-color text-white text-xl font-semibold btn-circle absolute right-2 top-2" onClick={() => setIsOpen(false)}>X</button>


                    <div className="mt-4">
                        <iframe
                            src={docUrl}
                            title="Document Viewer"
                            width="100%"
                            height="400px"
                            style={{ border: 'none' }}
                        ></iframe>
                    </div>



                    <h2 className="my-3 text-xl primary-color">
                        Examinee Note: {submiteNote}
                    </h2>


                    <form onSubmit={(e) => giveMarks(e, id)} method="dialog">

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="primary-color">Give Mark</span>
                            </label>
                            <input name="obtainedMarks" type="number" placeholder="Give Mark" className="selected" required />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className=" primary-color">Feedback</span>
                            </label>

                            <input name="feedback" type="text" placeholder="Say something to the Examinee" className="selected" required />
                        </div>

                        <input type="submit" value="Submit" className='py-1 px-2 lg:p-3 text-base lg:text-[18px] rounded-lg title-sec theme-bg font-poppins hover:text-[#ffffff] hover:bg-[#135D66]' />
                    </form>
                </div>
            </dialog>

        </div>
    );
};

export default PendingAssignments;