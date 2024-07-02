import '../../index.css'


const Faq = () => {
    return (
        <div className="my-16">

            <div className="text-center pb-5">
                <h3 className="text-4xl primary-color mb-3">Accordion </h3>
                <p className="accent-color w-full md:w-3/4 mx-auto">
                    Explore our online group study accordion, Connect, collaborate, succeed. Join like-minded peers, share resources, and achieve academic success together.
                </p>
            </div>



            <div className="mt-10 grid md:grid-cols-2 items-center md:gap-5 lg:gap-16 w-full">

                <div className='mb-10 md:mb-0'>
                    <div className="mt-10 md:mt-0 relative w-full h-[350px] faqimg">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#135c665e] to-[#e3fef751] rounded-2xl">
                        </div>
                    </div>
                </div>

                {/* accordion  */}
                <div >
                    <div className="faqbgg mb-5 collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title text-xl primary-title">
                            How can I join a group study session online?
                        </div>
                        <div className="collapse-content">
                            <p className='accent-color'>
                                To join a group study session, simply navigate to our website and browse the available study groups. Once you find a group that matches your interests or subject area, click on the join button to become a member. You will then gain access to the groups schedule and resources.
                            </p>
                        </div>
                    </div>

                    <div className="faqbgg mb-5 collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl primary-title">
                            What tools are available for collaboration during online group study sessions?
                        </div>
                        <div className="collapse-content">
                            <p className='accent-color'>
                                Our platform provides a range of collaboration tools to enhance your study experience. You can engage in real-time discussions using chat features, share documents and notes, collaborate on virtual whiteboards, and even participate in video conferencing for face-to-face interaction with fellow group members.
                            </p>
                        </div>
                    </div>

                    <div className="faqbgg mb-5 collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl primary-title">
                            How do I create my own study group on the website?
                        </div>
                        <div className="collapse-content">
                            <p className='accent-color'>
                                Creating a study group is easy! Simply log in to your account, navigate to the Create Group section, and fill out the necessary details such as group name, subject, description, and meeting schedule. Once your group is created, you can invite friends or classmates to join, and start collaborating right away.
                            </p>
                        </div>
                    </div>



                </div>
            </div>

        </div>
    );
};

export default Faq;