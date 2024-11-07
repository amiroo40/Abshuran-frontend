import React from 'react'
import { BsInstagram, BsTelegram } from 'react-icons/bs'

const Footer = () => {
    return (
        <div className='bg-gray-800 flex flex-col md:flex-row items-center justify-center sl:p-16 text-white p-3 mt-3 md:p-8 md:mt-6'>

            <div className='flex flex-col ml-4 justify-center items-center mb-4 min-w-40'>

                <h1 className= 'font-extrabold md:text-2xl text-xl text-white flex-1 text-center'>وبسایت خبری ماهنامه آبشوران</h1>

                <div className='flex flex-row gap-4 mt-3'>

                    <a title='اینستاگرام' href='/'>
                        <BsInstagram />
                    </a>

                    <a title='تلگرام' href='/'>
                        <BsTelegram />
                    </a>

                </div>

            </div>

            <p className='mt-4 text-sm hidden md:block'>ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد طراحی اساسا مورد استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگر</p>
            
        </div>
    )
}

export default Footer