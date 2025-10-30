// frontend/src/components/BlockRenderer.tsx
import React from "react";
import { convertGoogleDriveLink } from "./GoogleDriveConverter";
import Image from "next/image";

type Block = {
  id: string;
  ordering: number;
  block_type?: string;
  content: any;
  caption?: string;
  image_caption?: string;
};

// Fungsi untuk membersihkan HTML jika kontennya berupa string HTML
const createMarkup = (htmlContent: string) => {
  // Tambahkan validasi atau sanitasi di sini jika perlu (misal: menggunakan DOMPurify)
  return { __html: htmlContent };
};

export default function BlockRenderer({ block }: { block: Block }) {
  const type = block.block_type || "paragraph";
  const { content, caption } = block;

  switch (type) {
    case "headline":
      return <h2 className="!mt-12 !mb-4 !text-3xl">{content}</h2>;

    case "paragraph":
      return <p dangerouslySetInnerHTML={createMarkup(content)} />;

    case "image":
    case "image_caption": {
      const rawUrl = content?.image;
      const url = convertGoogleDriveLink(rawUrl);
      const cap = content?.caption;
      const [open, setOpen] = React.useState(false);

      React.useEffect(() => {
        if (open) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      }, [open]);

      return (
        <>
          {/* Gambar di dalam artikel */}
          <figure className="flex flex-col items-center justify-center !my-8 md:-mx-8">
            <Image
              src={url}
              alt={cap || ""}
              width={400}
              height={100}
              className="rounded-lg cursor-zoom-in"
              onClick={() => setOpen(true)}
            />
            {cap && (
              <figcaption className="text-center text-sm text-zinc-500 mt-2 font-sans">
                {cap}
              </figcaption>
            )}
          </figure>

          {/* Modal Zoom */}
          {open && (
            <div
              className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
              onClick={() => setOpen(false)} // klik overlay = close
            >
              <div onClick={(e) => e.stopPropagation()}>
                <Image
                  src={url}
                  alt={cap || ""}
                  width={1200}
                  height={800}
                  className="rounded-lg object-contain max-h-[90vh] w-auto cursor-zoom-out"
                  onClick={() => setOpen(false)} // klik gambar juga close
                />
              </div>
            </div>
          )}
        </>
      );
    }

    case "quote":
      return (
        <blockquote className="!border-l-[3px] !border-zinc-800 !pl-6 !italic !text-xl !my-10">
          {content}
        </blockquote>
      );

    case "list": // Menambahkan tipe blok baru: list
      return (
        <ul className="list-disc pl-5 my-6 space-y-2">
          {Array.isArray(content) &&
            content.map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={createMarkup(item)} />
            ))}
        </ul>
      );

    default:
      return <p dangerouslySetInnerHTML={createMarkup(content)} />;
  }
}
