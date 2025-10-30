import React from "react";

export default function OurSurveyCard({
  imageSrc,
}: {
  imageSrc: string;
}) {
  return (
    <div
      className="
        relative 
        overflow-hidden 
        shadow-2xl 
        rounded-[20px]
        aspect-[2828/4000]
        w-[22vw]
        max-w-[800px]
        flex
        items-center
        justify-center
      "
    >
      <img
        src={imageSrc}
        alt="survey"
        className="
          w-full 
          h-full 
          object-contain
          object-center 
          rounded-[20px]
        "
      />
    </div>
  );
}
