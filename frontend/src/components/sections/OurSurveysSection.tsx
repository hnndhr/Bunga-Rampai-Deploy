"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getSurveys } from "@/lib/supabaseQueries";
import SurveyCard from "@/components/ui/SurveyPageCard";

const CarrousselCustom = dynamic(() => import("../ui/CarrousselCustom"), {
  ssr: false,
});

type SurveyCard = {
  title: string;
  slug: string;
  infographic_link: string;
  survey_type: string;
  created_at: string;
};

//Home -> Our Survey (3 survei terbaru)
export default function OurSurveysSection() {
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    async function fetchSurveys() {
      const data = await getSurveys({ limit: 3, order: "desc" });
      const formatted = data.map((survey) => ({
        link: `/article/${survey.slug}`,
        key: survey.slug,
        content: (
          <SurveyCard
            image={survey.infographic_link}
            altText={`Infografis ${survey.title}`}
            slug={survey.slug}
            showTitle={false}
            title={""}
          />
        ),
      }));

      setCards(formatted);
    }
    fetchSurveys();
  }, []);

  return (
    <section className="w-full bg-gradient-to-t from-gray-900 to-slate-800 py-16 text-center text-white">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
        Our Surveys
      </h2>

      <div className="relative flex object-center justify-center px-4 object-fill ">
        <CarrousselCustom cards={cards} />
      </div>

      <p className="text-xs sm:text-sm text-gray-300 mt-4">
        Click to view article details
      </p>
    </section>
  );
}
