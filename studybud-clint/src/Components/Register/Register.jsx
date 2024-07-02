import { Link, useNavigate } from "react-router-dom";
import '../../index.css'
import Singup from '../../../public/lottie_animations/register.json'
import Lottie from "lottie-react";
import useInfo from "../../Hooks/useInfo";
import { updateProfile } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import Swal from "sweetalert2";

const Register = () => {

    const { createUser } = useInfo();
    const navigate = useNavigate();

    //  handel create a user by firebase, 
    const creatingAUser = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const image = e.target.image.value;

        console.log("data from the form", name, image, password, email);

        // password validation
        if (password.length < 6
            || !/[a-z]/.test(password)
            || !/[A-Z]/.test(password)) {


            Swal.fire("Must contain 6 characters, uppercase, lowercase letter!");
            return;
        }

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

        // creating a user
        createUser(email, password, name, image)
            .then(() => {

                // update users profile name and image
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: image
                })
                    .then(() => {
                    })
                    .catch(error => {
                        Swal.fire("Can not update user profile!");
                    })


                e.target.reset()
                Swal.fire("User Created Successful!");
                navigate('/')
            })
            .catch(error => {
                Swal.fire("Registration Failed");
            })

    }



    return (
        <div>
            <div className="py-20 max-w-7xl w-10/12 mx-auto">

                <div className="text-center">
                    <h3 className="text-4xl primary-color mb-3">Please Register</h3>
                    <p className="accent-color w-full md:w-3/4 mx-auto">
                        To access our service and Collaborate with others.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 items-center gap-10 mt-20">
                    <div className="mt-4 lg:mt-0 w-full shadow-2xl rounded-lg p-4 faqbgg">
                        <form onSubmit={creatingAUser} className="card-body font-poppins">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text primary-color">Name</span>
                                </label>
                                <input name="name" type="text" placeholder="Your Name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text primary-color">Image URL</span>
                                </label>
                                <input name="image" type="text" placeholder="URL" className="input input-bordered" required />
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text primary-color">Email</span>
                                </label>
                                <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text primary-color">Password</span>
                                </label>
                                <input name="password" type="password" placeholder="Create a Password" className="input input-bordered" required />
                            </div>



                            <div className="form-control mt-3">
                                <button className='p-2 lg:p-3 text-base lg:text-[18px] rounded-lg title-sec theme-bg font-poppins hover:text-[#003C43] hover:bg-[#135D66]'>Register</button>
                            </div>
                        </form>

                        <p className="accent-color mt-3">Already have an account?<span className="underline  primary-color"> <Link to="/login">Login</Link></span></p>
                    </div>


                    <div className="w-3/4 mx-auto">
                        <Lottie animationData={Singup} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;