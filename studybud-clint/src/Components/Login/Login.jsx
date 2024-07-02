import { Link, useNavigate } from "react-router-dom";
import '../../index.css'
import login from '../../../public/lottie_animations/login.json'
import Lottie from "lottie-react";
import useInfo from "../../Hooks/useInfo";
import Swal from "sweetalert2";

const Login = () => {

    const { socialSingin, singinUser } = useInfo()
    const navigate = useNavigate()


    // handle login form submit 
    const handleUserLogin = e => {
        e.preventDefault();
        const password = e.target.password.value;
        const email = e.target.email.value;

        singinUser(email, password)
            .then(() => {
                e.target.reset()
                navigate("/");
            })
            .catch(error => {
                Swal.fire("Email or Password did not match");
            })


    }

    //handle social sing in 
    const handleGoogleLogin = () => {
        socialSingin()
            .then(result => {
                const user = result.user;
                navigate("/");
            })
            .catch(error =>  Swal.fire("Access Denied"))
    }


    return (
        <div className="py-20 max-w-7xl w-10/12 mx-auto">

            <div className="text-center pb-10">
                <h3 className="text-4xl primary-color mb-3">Please Login</h3>
                <p className="accent-color w-full md:w-3/4 mx-auto">
                    To access our service and Collaborate with others.
                </p>
            </div>

            <div className="container grid  lg:grid-cols-2 items-center gap-10 ">
                <div className="w-full shadow-2xl rounded-lg p-4 faqbgg">
                    <form onSubmit={handleUserLogin} className="card-body font-poppins">
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
                            <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                        </div>

                        <div className="form-control mt-6">
                            <button className='p-2 lg:p-3 text-base lg:text-[18px] rounded-lg title-sec theme-bg font-poppins hover:text-[#003C43] hover:bg-[#135D66]'>Login</button>
                        </div>
                    </form>
                    <div className="text-center">
                        <div className="divider">OR</div>
                        <section className="space-x-6">
                            <button onClick={handleGoogleLogin} className="shadow-xl btn btn-ghost p-2 text-18px primary-color theme-sec hover:text-[#E3FEF7] hover:bg-[#003C43] rounded-lg ">Login with Google</button>
                        </section>
                    </div>
                    <p className="accent-color mt-6">Do not have an account?
                        <span className="underline  primary-color">
                            <Link to="/register"> Register</Link>
                        </span>
                    </p>
                </div>


                <div className="w-full">
                    <Lottie animationData={login} />
                </div>
            </div>
        </div>
    );
};

export default Login;