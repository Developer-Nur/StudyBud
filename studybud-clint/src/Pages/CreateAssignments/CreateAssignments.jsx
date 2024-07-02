import { useState } from "react";
import useInfo from "../../Hooks/useInfo";
import '../../index.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from 'react-icons/fa';
import Swal from "sweetalert2";
import axios from "axios";
import { parseISO, format } from 'date-fns';

const CreateAssignments = () => {

    const { user } = useInfo();

    // State to manage selected date
    const [date, setDate] = useState(new Date());

    const handleDateChange = (date) => {
        setDate(date);
    };


    // assignment form handling
    const assignmentData = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const image = form.image.value;
        const marks = form.marks.value;
        const difficulty = form.difficulty.value;
        const description = form.description.value;
        const dueDate = format(date, 'dd-MM-yyyy');
        const name = user.displayName;
        const email = user.email


        // Validate image URL
        if (!image.includes("http")) {
            Swal.fire({
                title: 'Error!',
                text: 'Must be a valid URL, including "http"',
                icon: 'error',
                confirmButtonText: 'Close'
            });
            return;
        }


        const allData = { name, email, title, dueDate, difficulty, description, marks, image };
        // console.log(allData);




        axios.post("https://studybud-server.vercel.app/addassignment", allData)
            .then(res => {
                if (res.data.acknowledged) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Added successfully',
                        icon: 'success',
                        confirmButtonText: 'Close'
                    })
                    form.reset()
                }
                // console.log("data after api ", res)
            })
            .catch(error => Swal.fire("Can not post your Assignment!"))
    }


    return (
        <div className="max-w-7xl w-11/12 md:w-10/12  mx-auto py-20">

            <div className="text-center pb-5">
                <h3 className="text-4xl primary-color mb-3">Create Assignment</h3>
                <p className="accent-color w-full md:w-3/4 mx-auto">
                    On our online group study platform, users can easily create and assign tasks tailored to their groups needs. With customizable options, clear instructions, and collaborative features, fostering interactive learning experiences is a breeze.
                </p>
            </div>

            {/* create assignment section */}


            <div className="p-10  fornbg">

                <div className="my-3">
                    <h2 className="primary-color text-[18]">
                        Hi, <strong>{user.displayName}</strong>,<br />
                        You can Create an assignment here.
                    </h2>
                    <hr className="w-1/4 theme-bg h-[2px] mt-2" />
                </div>

                {/* adding assignment form */}
                <div className="rounded-lg shadow-2xl lg:px-10 bg-white">
                    <form onSubmit={assignmentData} className="card-body font-poppins">

                        {/* form grid container */}
                        <div className="grid lg:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text primary-color">Title</span>
                                </label>
                                <input name="title" type="text" placeholder="Your Name" className="selected" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text primary-color">Image URL</span>
                                </label>
                                <input name="image" type="text" placeholder="Thumbnail Image URL" className="selected" required />
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text primary-color">Marks</span>
                                </label>
                                <input name="marks" type="number" placeholder="Marks" className="selected" required />
                            </div>

                            <div className=" form-control relative">
                                <label className="label">
                                    <span className="label-text primary-color">Due Date</span>
                                </label>
                                <DatePicker
                                    selected={date}
                                    onChange={handleDateChange}
                                    className="selected w-full"
                                    dateFormat="dd-MM-yyyy"
                                    required
                                />
                                <span className="absolute bottom-4  right-6">
                                    <FaCalendarAlt size={20} className="text-[#135D66]" />
                                </span>
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text primary-color">Difficulty level</span>
                                </label>

                                <select className="selected" name="difficulty" id="">
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

                            <textarea name="description" type="text" className="resize-none selected">

                            </textarea>
                        </div>



                        <div className="form-control mt-3">
                            <button className='p-2 lg:p-3 text-base lg:text-[18px] rounded-lg title-sec theme-bg font-poppins hover:text-[#ffffff] hover:bg-[#135D66]'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default CreateAssignments;