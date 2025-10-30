"use client";

import Navbar from "@/components/layout/Navbar";
import SurveyCard from "@/components/ui/SurveyPageCard";
import FilterBar from "../ui/FilterBar";
import { getSurveys } from "@/lib/supabaseQueries";
import { useEffect, useState } from "react";
import Link from "next/link";

//Catalogue -> Katalog survey

type Survey = {
  title: string;
  slug: string;
  infographic_link: string;
  survey_type: string;
  created_at: string;
};

export default function CataloguePage() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const filteredSurveys = surveys.filter((survey) =>
    survey.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function fetchSurveys() {
      const data = await getSurveys({
        filterType,
        sortBy: "created_at",
        order: sortOrder,
        search,
      });
      setSurveys(data);
    }
    fetchSurveys();
  }, [filterType, sortOrder, search]);

  return (
    <main>
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1530533718754-001d2668365a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170')",
          }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0D1117] to-transparent"></div>
        </div>
        <Navbar />
        <div className="absolute bottom-16 md:left-44 px-2 max-w-2xl text-start">
          <h1 className="text-5xl font-bold text-white uppercase tracking-wider">
            Bunga Rampai
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-300">
            Bunga Rampai menyajikan hasil riset dan survei Kementerian Riset dan
            Data selama satu periode. Informasi disajikan dalam bentuk desain
            infografis dan artikel yang akan memudahkan pembaca untuk memahami
            data secara cepat dan jelas.
          </p>
        </div>
      </header>

      {/* Catalog Section */}
      <section className="bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-8">Katalog Survei</h2>

          <FilterBar
            surveys={surveys}
            search={search}
            setSearch={setSearch}
            filterType={filterType}
            setFilterType={setFilterType}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSurveys.map((survey) => (
              <div
                key={survey.slug}
                className="transition-transform duration-300 ease-in-out hover:scale-105"
              >
                <Link href={`/article/${survey.slug}`} passHref>
                  <SurveyCard
                    title={survey.title}
                    image={survey.infographic_link}
                    altText={`Infografis ${survey.title}`}
                    slug={survey.slug}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
