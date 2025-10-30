"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-20">
        {/* === KONTENER UTAMA: Menggunakan flex dan justify-between === */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-1 mx-3 mt-3 my-5">
          {/* KOLOM KIRI: Logo & Info (tidak berubah) */}
          <div className="space-y-4 md:w-1/3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center -translate-y-1">
                <Image
                  src="/images/rnd_logo.png"
                  alt="rnd logo"
                  width={40}
                  height={40}
                />
              </div>
              <span className="font-bold text-xl">Riset dan Data</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Exploring Facts, Building the Future
            </p>
            <div className="flex space-x-4 pt-2 pb-5">
              <Link
                href="https://www.instagram.com/datalks.uns/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram size={28} />
              </Link>
              <Link
                href="https://www.tiktok.com/@rndbemuns?_t=ZS-90afh0Q42Q1&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTiktok size={24} />
              </Link>
              <Link
                href="https://wa.me/6285713715834"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaWhatsapp size={28} />
              </Link>
            </div>
          </div>

          {/* === KELOMPOK KOLOM KANAN: Navigasi & Privasi dibungkus dalam satu div === */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            {/* Kolom Navigasi */}
            <div>
              <h3 className="font-bold text-lg mb-4">Navigation</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catalogue"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Catalogue
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kolom Support */}
            <div>
              <h3 className="font-bold text-lg mb-4">Legal and Support</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms and Condition
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bagian Copyright (tidak berubah) */}
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Kementerian Riset dan Data
              BEM UNS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
