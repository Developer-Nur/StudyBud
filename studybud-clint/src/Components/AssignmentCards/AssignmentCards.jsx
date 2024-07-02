import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import PropTypes from 'prop-types';
import useInfo from "../../Hooks/useInfo";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AssignmentCards = ({ data, setAssignmentDatas, assignmentDatas }) => {

    const { user } = useInfo()

    const { _id, marks, image, title } = data;

    // console.log(`user emailis ${user.email} and assignment email is ${data.email}`);

    // handle deleting an assignment 
    const handleDelete = _id => {
        console.log("delete button clicked wit the id:", _id);

        if (user?.email === data?.email) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#135D66",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://studybud-server.vercel.app/deleteassignment/${_id}`, {
                        method: "DELETE",
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {

                                Swal.fire(
                                    "Deleted!",
                                    "Your assignment has been deleted.",
                                    "success"
                                )

                                const remainingg = assignmentDatas.filter(item => item._id !== _id);
                                setAssignmentDatas(remainingg);
                                console.log("data fter delet one: ", remainingg)
                            }
                        }
                        )
                }
            });
        }
        else {
            Swal.fire("You Can not delete this assignment")
        }
    }

    return (
        <div className="md:h-[600px] lg:h-[450px] overflow-hidden theme-sec rounded-lg shadow-lg ">

            <div>
                <img className="w-full lg:h-52" src={image} alt="" />
            </div>

            <div className="flex flex-col p-4 md:p-4">
                <h1 className=" text-xl font-bold primary-color">
                    {title}
                </h1>

                <div className="mt-2 py-2 font-poppins flex justify-start gap-3 items-center">
                    <h3 className="text-blue-600 border-r-2 pr-3 border-[#003C43]" >Level: {data.difficulty}</h3>

                    <p className=" accent-color py-3">
                        Marks: {marks}
                    </p>
                </div>

                {/* <Link className="underline primary-color" to={'/'}>Take Assignment</Link> */}


                {/* card buttons */}
                <div className="flex justify-start py-4 items-end  gap-3">

                    <div className="flex space-x-2">
                        <button onClick={() => (handleDelete(_id))} className=" p-2 hover:text-[#F87171]  bg-red-400 font-b text-white rounded-lg hover:bg-[#003C43]">
                            <MdDeleteOutline size={20} />
                        </button>
                    </div>

                    <div className="flex space-x-2">
                        <Link to={`/updateassignment/${_id}`}>
                            <button
                                className="p-2 hover:text-[#4ADE80] bg-green-400 font-b text-white rounded-lg hover:bg-[#003C43]">
                                <CiEdit size={20} />
                            </button>
                        </Link>
                    </div>

                    <div className="flex space-x-2">
                        <Link to={`/assignmentdetails/${_id}`}>
                            <button className="p-2 bg-[#818090] hover:text-[#818090] font-b text-white rounded-lg hover:bg-[#003C43]">
                                <FaRegEye size={20} /></button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

AssignmentCards.propTypes = {
    data: PropTypes.object.isRequired,
    setAssignmentDatas: PropTypes.func.isRequired,
    assignmentDatas: PropTypes.array.isRequired
};

export default AssignmentCards;