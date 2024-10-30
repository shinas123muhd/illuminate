import React from 'react'
import banner1 from '../assets/topleft.jpg'
import banner2 from '../assets/topright.jpg'
import nerdzminds  from  '../assets/Nerdz Minds.png'
import qrcode from '../assets/qrcode.png'

const TopPart = () => {
    return (
        <div>
            <div className='grid grid-cols-2 font-montserrat'>
                <div className="h-full  relative">
                    <img src={banner1} alt="banner1" className='h-full object-cover'/>
                    <div className='absolute z-20 inset-0 '>
                        <div className='flex  justify-between absolute top-10 w-full px-1'>
                            <div>
                                <img src={nerdzminds} alt="" className='h-24 w-40 object-contain' />
                            </div>
                            <div>
                                <img src={nerdzminds} alt="" className='h-24 w-40 object-contain'/>
                            </div>
                        </div>
                        <div className='absolute flex flex-col items-end text-white w-full top-44 px-5 font-semibold'>
                            <h1>09/11/2024</h1>
                            <h1>SATURDAY</h1>
                        </div>
                        <div className=' absolute inset-0 flex flex-col gap-10 justify-center text-white items-center w-full '>
                        <div>
                            <img src={qrcode} alt="QR Code" className="h-40 w-40" />
                        </div>

                        </div>
                        <div className="absolute inset-0 top-2/4 flex flex-col mt-2 gap-10 text-white justify-center items-center text-center w-full" >
                            <h1 className="text-5xl font-bold">NIMNA</h1>
                            <div className="w-3/5 text-3xl font-semibold ">
                                DEVELOPER COMPANY NAME
                            </div>
                            <h1 className="text-7xl font-bold ">Guest</h1>
                        </div>
                        
                    </div>
                </div>
                <div>
                <div className="h-full ">
                <img src={banner2} alt="banner1" className='h-full w-full object-cover'/>
                </div>
                </div>
            </div>
            </div>
    )
}

export default TopPart