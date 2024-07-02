import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useInfo from "../../Hooks/useInfo";
import { FaCalendarAlt } from 'react-icons/fa';
import { useState } from "react";
import Lottie from "lottie-react";
import LodingSpiner from '../../../public/lottie_animations/spinner.json';
import { parseISO, format } from 'date-fns';


const UpdateAssignment = () => {
    const dataItems = useLoaderData();
    const { user, loader } = useInfo();
    const navigate = useNavigate();
    const { _id, marks, image, title, dueDate, description, difficulty } = dataItems;

    // Ensure dueDate is a valid date string
    const validDueDate = new Date(dueDate).toString() !== "Invalid Date" ? new Date(dueDate) : new Date();

    // State to manage selected date
    const [date, setDate] = useState(validDueDate);

    const handleDateChange = (date) => {
        setDate(date);
    };

    if (loader) {
        return (
            <div className="flex justify-center items-center">
                <Lottie animationData={LodingSpiner} />
            </div>
        );
    }

    // Update form handling
    const updateItem = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const image = form.image.value;
        const marks = form.marks.value;
        const difficulty = form.difficulty.value;
        const description = form.description.value;
        const dueDate = format(date, 'dd-MM-yyyy');

        const allData = { title, dueDate, difficulty, description, marks, image };

        fetch(`https://studybud-server.vercel.app/update-item/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(allData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {
                form.reset();
                navigate('/assignments');
                Swal.fire({
                    title: 'Success!',
                    text: 'Updated successfully',
                    icon: 'success',
                    confirmButtonText: 'Close'
                });
            }
        })
        .catch(error => console.log(error.message));
    }

    return (
        <div className="max-w-7xl w-11/12 md:w-10/12 mx-auto py-20">
            <div className="text-center pb-5">
                <h3 className="text-4xl primary-color mb-3">Update Assignment</h3>
                <p className="accent-color w-full md:w-3/4 mx-auto">
                    On our online group study platform, users can easily create and assign tasks tailored to their groups needs. With customizable options, clear instructions, and collaborative features, fostering interactive learning experiences is a breeze.
                </p>
            </div>

            {/* create assignment section */}
            <div className="p-10 fornbg">
                <div className="my-3">
                    <h2 className="primary-color text-[18]">
                        Hi, <strong>{user.displayName}</strong>,<br />
                        You can Update the assignment here.
                    </h2>
                    <hr className="w-1/4 theme-bg h-[2px] mt-2" />
                </div>

                {/* adding assignment form */}
                <div className="rounded-lg shadow-2xl lg:px-10 bg-white">
                    <form onSubmit={updateItem} className="card-body font-poppins">
                        {/* form grid container */}
                        <div className="grid lg:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text primary-color">Title</span>
                                </label>
                                <input defaultValue={title} name="title" type="text" placeholder="Your Name" className="selected" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text primary-color">Image URL</span>
                                </label>
                                <input defaultValue={image} name="image" type="text" placeholder="Thumbnail Image URL" className="selected" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text primary-color">Marks</span>
                                </label>
                                <input defaultValue={marks} name="marks" type="number" placeholder="Marks" className="selected" required />
                            </div>

                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text primary-color">Due Date</span>
                                </label>
                                <DatePicker
                                    selected={date}
                                    onChange={handleDateChange}
                                    className="selected w-full"
                                    dateFormat="dd-MM-yyyy"
                                    required />
                                <span className="absolute bottom-4 right-6">
                                    <FaCalendarAlt size={20} className="text-[#135D66]" />
                                </span>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text primary-color">Difficulty level</span>
                                </label>
                                <select defaultValue={difficulty} className="selected" name="difficulty" id="">
                                    <option value="Hard">Hard</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Easy">Easy</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text primary-color">Description</span>
                            </label>
                            <textarea defaultValue={description} name="description" type="text" className="resize-none selected">
                            </textarea>
                        </div>

                        <div className="form-control mt-3">
                            <button className='p-2 lg:p-3 text-base lg:text-[18px] rounded-lg title-sec theme-bg font-poppins hover:text-[#ffffff] hover:bg-[#135D66]'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateAssignment;
