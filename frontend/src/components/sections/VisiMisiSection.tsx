import React from 'react';
import { Cormorant, Montserrat } from 'next/font/google';
import { CormorantText, MontserratText } from '../ui/FontWrappers';

//About Us -> Visi Misi

export default function VisionMission() {
  return (
    <div className= "min-h-screen bg-white px-8 md:px-16 lg:px-24 pt-16">
      {/* Header Section */}
      <div>
        <CormorantText className= "text-gray-400 text-4xl md:text-5xl italic font-semibold">
          Driven by Research
        </CormorantText>
      </div>

      {/* Vision Section */}
      <div className="mb-5">
        {/* Vision Title - Large */}
        <CormorantText className="text-8xl text-end md:text-9xl lg:text-[12rem] font-bold text-gray-200 leading-none">
          Vision
        </CormorantText>
        
        {/* Vision Content - Text Left, Image Right */}
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          <div className="max-w-xl ml-auto text-right">
            <MontserratText className="text-lg md:text-xl font-normal text-gray-800 leading-relaxed text-end">
              Responsivitas riset dan data serta optimalisasi media dan branding.
            </MontserratText>
          </div>
          <div className="lg:w-5/12 ">
            <div className="w-full h-32 aspect-[6/3] overflow-hidden shadow-md">
              <img
                src="../images/vision.jpg"
                alt="Vision - Peak of the mountain"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div>
        {/* Mission Content - Text Right, Image Left */}
        <div className="flex flex-col lg:flex-row items-end gap-4">
          <div className="lg:w-5/12">
            <div className="w-full h-32 aspect-[6/3] overflow-hidden shadow-md">
              <img
                src="../images/mission2.jpeg"
                alt="Mission - Beach path"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <MontserratText className="text-lg md:text-xl font-normal text-gray-800 leading-relaxed">
              Menjadi mitra strategis dalam pelayanan informasi dan komunikasi dengan stakeholder kampus demi optimalisasi kesejahteraan.
            </MontserratText>
          </div>
        </div>
        
        {/* Mission Title - Large, Below Image */}
        <CormorantText className="text-8xl text-start md:text-9xl lg:text-[12rem] font-bold text-gray-200 leading-none">
          Mission
        </CormorantText>
      </div>
    </div>
  );
}