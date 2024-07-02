
import { useEffect, useState } from "react";
import axios from "axios";
import useInfo from "../../Hooks/useInfo";
import Lottie from "lottie-react";
import LodingSpiner from '../../../public/lottie_animations/spinner.json';
import AssignmentCards from "../../Components/AssignmentCards/AssignmentCards";
import { useLoaderData } from "react-router-dom";
// import { useLoaderData } from "react-router-dom";

const Assignments = () => {

    const { loader, setLoader } = useInfo()
    const allData = useLoaderData();
    const [assignmentDatas, setAssignmentDatas] = useState(allData);
    const [filter, setFilter] = useState('');

    // console.log("loded data is: ", assignmentDatas);

    // all assignment data from the DB
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://studybud-server.vercel.app/allassignmens');
                // setLoader(true)
                setAssignmentDatas(response.data);
                setLoader(false)
                // console.log("resposded data", response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [setLoader]);


    // filtered assignment data form DB
    useEffect(() => {
        if (filter) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`https://studybud-server.vercel.app/allassignment-filter?filter=${filter}`);
                    setLoader(false)
                    setAssignmentDatas(response.data);
                    // console.log("Filterde response", response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [filter, setLoader]);

    // spinner
    if (loader) {
        return <div className="flex justify-center items-center">
            <Lottie animationData={LodingSpiner} />
        </div>
    }

    return (
        <div className="max-w-7xl w-11/12 md:w-10/12  mx-auto py-20">

            <div className="text-center pb-5">
                <h3 className="text-4xl primary-color mb-3">All Assignment</h3>
                <p className="accent-color w-full md:w-3/4 mx-auto">

                    Get ready for collaborative learning at its finest! Dive into engaging assignments designed to spark curiosity and foster teamwork. From problem-solving challenges to creative projects, our platform offers a variety of assignments tailored to your learning needs. Make learning fun and effective!
                </p>
            </div>

            {/* filter assignment */}
            <div className="pt-6 w-full text-center">
                <select onChange={e => setFilter(e.target.value)} className="selected" name="difficulty" id="" defaultValue="" required>
                    <option className="primary-color" value="" disabled hidden>Filter by Difficulty Level</option>
                    <option className="primary-color" value="Hard">Hard</option>
                    <option className="primary-color" value="Medium">Medium</option>
                    <option className="primary-color" value="Easy">Easy</option>
                </select>
            </div>




            {/* all assignment cards */}
            <div className=" mt-16 grid md:grid-cols-2 lg:grid-cols-3 items-start gap-10">
                {
                    assignmentDatas && assignmentDatas.map((data, index) => <AssignmentCards
                        key={index}
                        data={data}
                        assignmentDatas={assignmentDatas}
                        setAssignmentDatas={setAssignmentDatas}
                    >
                    </AssignmentCards>)
                }

            </div>


        </div>
    );
};

export default Assignments;