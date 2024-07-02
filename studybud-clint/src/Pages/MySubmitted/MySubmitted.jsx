import axios from "axios";
import { useEffect, useState } from "react";
import useInfo from "../../Hooks/useInfo";


const MySubmitted = () => {

    const [submittedData, setSubmittedData] = useState();

    const { user } = useInfo()
    const email = user?.email;


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://studybud-server.vercel.app/submit-assignments?email=${email}`);
                // console.log("Filterde response", response.data);
                setSubmittedData(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [email]);




    return (
        <div className="max-w-7xl w-11/12 md:w-10/12  mx-auto py-20">
            <div className="text-center pb-5">
                <h3 className="text-4xl primary-color mb-3">Submitted Assignment</h3>
                <p className="accent-color w-full md:w-3/4 mx-auto">
                    Get ready for collaborative learning at its finest! Dive into engaging assignments designed to spark curiosity and foster teamwork. From problem-solving challenges to creative projects, our platform offers a variety of assignments tailored to your learning needs. Make learning fun and effective!
                </p>
            </div>

            <div className="grid md:grid-cols-2 items-center gap-7">
                {
                    submittedData && submittedData.map(item => <>
                        <div className="flex flex-col p-4 md:p-4">
                            <h1 className="mb-3 text-xl font-bold primary-color">
                                {item.taskTitle}
                            </h1>
                            <p>Status: {item.status}</p>
                            <div className="mt-2 py-2 font-poppins">
                                <h3 className="text-blue-600" >Examiner Feedback: {item.feedback}</h3>
                            </div>
                            <div>
                                <p>
                                    Assignment Marks: {item.assignmentMarks}
                                </p>
                                <p>
                                    Obtained Marks : {item.obtainedMarks}
                                </p>
                            </div>
                        </div>
                    </>)
                }
            </div>

        </div>
    );
};

export default MySubmitted;