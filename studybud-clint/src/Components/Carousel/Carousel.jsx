// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Banner1 from '/images/banner1.png';
import Banner2 from '/images/banner2.png';
import Banner3 from '/images/banner3.png';
import '../../index.css'



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

export default function Carousel() {
    return (
        <div className='container p-0 md:p-5 lg:p-10'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='relative round'>
                        <img className='round w-full h-full' src={Banner1} alt="Banner Image" />
                        <div className='round absolute bg-gradient-to-r from-[#135c665e] to-[#e3fef751] inset-0 flex flex-col justify-center items-center space-y-2 md:space-y-4 lg:space-y-7 '>
                            <h2 className='text-xl md:text-3xl lg:text-6xl font-semibold title-sec'>Global Study Hub</h2>
                            <p className='px-10 lg:w-2/4 text-center title-sec text-base md:text-[18px] '>
                                Connect globally, study together. Collaborate, share resources, conquer challenges.
                            </p>
                            <Link to={'/assignments'}>
                                <button className='p-2 lg:p-3 text-base lg:text-[18px] rounded-lg title-sec theme-bg font-poppins hover:text-[#003C43]
                                hover:bg-[#E3FEF7]'>
                                    Collaborate
                                </button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div className='relative round'>
                        <img className='round w-full h-full' src={Banner2} alt="Banner Image" />
                        <div className='round absolute bg-gradient-to-r from-[#135c665e] to-[#e3fef751] inset-0 flex flex-col justify-center items-center space-y-2 md:space-y-4 lg:space-y-7'>
                            <h2 className='text-xl md:text-3xl lg:text-6xl font-semibold title-sec'>Study Rooms</h2>
                            <p className='px-10 lg:w-2/4 text-center title-sec text-base md:text-[18px] '>
                                Virtual study spaces tailored to subjects. Productivity and collaboration thrive.
                            </p>
                            <Link to={'/assignments'}>
                                <button className='p-2 lg:p-3 text-base lg:text-[18px] rounded-lg title-sec theme-bg font-poppins hover:text-[#003C43]
                                hover:bg-[#E3FEF7]'>
                                    Collaborate
                                </button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div className='relative round'>
                        <img className='round w-full h-full' src={Banner3} alt="Banner Image" />
                        <div className='round absolute bg-gradient-to-r from-[#135c665e] to-[#e3fef751] inset-0 flex flex-col justify-center items-center space-y-2 md:space-y-4 lg:space-y-7 '>
                            <h2 className='text-xl md:text-3xl lg:text-6xl font-semibold title-sec'>Expert Sessions</h2>
                            <p className='px-10 lg:w-2/4 text-center title-sec text-base md:text-[18px] '>
                                Learn from seasoned educators. Expert-led study sessions enhance your journey.
                            </p>
                            <Link to={'/assignments'}>
                                <button className='p-2 lg:p-3 text-base lg:text-[18px] rounded-lg title-sec theme-bg font-poppins hover:text-[#003C43]
                                hover:bg-[#E3FEF7]'>
                                    Collaborate
                                </button>
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}