"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import EditorJS, { OutputData } from "@editorjs/editorjs";

// Impor semua tools EditorJS yang Anda gunakan
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Embed from "@editorjs/embed";
import Paragraph from "@editorjs/paragraph";
import AddImageTools from "./AddImageTools"; // Sesuaikan path jika perlu
import { convertGoogleDriveLink } from "./GoogleDriveConverter"; // Sesuaikan path jika perlu

// Tipe data untuk metadata artikel
type ArticleMeta = {
  id?: string;
  title?: string;
  slug: string;
  header_image?: string | null;
  period?: string | null;
  method?: string | null;
  survey_type?: string | null;
  report_link?: string | null;
  respondents?: number | null;
  infographic_link?: string | null;
};

// --- FUNGSI BANTU ---
/**
 * Mencoba mem-parsing string JSON. Jika gagal atau bukan string, kembalikan nilai aslinya.
 * Ini penting jika 'content' dari beberapa blok disimpan sebagai string di database.
 */
function tryParseJSON(value: any) {
  if (typeof value !== "string") {
    return value; // Kembalikan nilai asli jika bukan string
  }
  try {
    return JSON.parse(value);
  } catch {
    return value; // Kembalikan string asli jika parsing gagal
  }
}

export default function UpdatePageArticle({ slug }: { slug: string }) {
  const router = useRouter();
  const editorRef = useRef<EditorJS | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // State untuk data formulir (metadata)
  const [meta, setMeta] = useState<ArticleMeta>({ slug: "" });

  // State terpisah untuk deskripsi infografis
  const [infographicDesc, setInfographicDesc] = useState<string>("");

  // State khusus untuk menyimpan data yang akan dimasukkan ke EditorJS
  const [editorData, setEditorData] = useState<OutputData | null>(null);

  // --- EFEK 1: Mengambil dan MEMFORMAT data dari API ---
  useEffect(() => {
    if (!slug) return;

    const fetchAndPrepareData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/articles/${slug}`);
        if (!res.ok) throw new Error(`Gagal mengambil artikel: ${res.statusText}`);
        const data = await res.json();

        // Set state untuk metadata formulir
        setMeta({
          slug: data.slug,
          title: data.title,
          header_image: data.header_image ?? null,
          period: data.period ?? "",
          method: data.method ?? "",
          survey_type: data.survey_type ?? "",
          report_link: data.report_link ?? "",
          respondents: data.respondents ?? null,
          infographic_link: data.infographic_link ?? null,
        });
        
        const allBlocks = data.blocks || [];
        const infBlock = allBlocks.find((b: any) => b.block_type === "infographic_desc");
        setInfographicDesc(infBlock?.content || "");

        const normalBlocks = allBlocks.filter((b: any) => b.block_type !== "infographic_desc");

        // ✅ INTI PERBAIKAN: Konversi format DB ke format EditorJS
        const formattedBlocks = normalBlocks.map((dbBlock: any) => {
          const content = tryParseJSON(dbBlock.content);

          switch (dbBlock.block_type) {
            case "paragraph":
            case "quote":
              return { type: dbBlock.block_type, data: { text: content || "" } };
            case "headline":
            case "header":
              return { type: "header", data: { text: content || "", level: 2 } };
            case "list":
              return { type: "list", data: { items: Array.isArray(content) ? content : (content?.items || []), style: "unordered" } };
            case "embed":
              return { type: "embed", data: { service: content?.service, source: content?.source, embed: content?.embed, caption: content?.caption || "" } };
            case "image_caption":
               return { type: "image_caption", data: { image: content?.image || "", caption: content?.caption || "" } };
            default:
              return { type: "paragraph", data: { text: String(content || "") } };
          }
        });

        setEditorData({ blocks: formattedBlocks });

      } catch (error: any) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndPrepareData();
  }, [slug]);

  // --- EFEK 2: Inisialisasi EditorJS setelah data siap dan komponen render ---
  useEffect(() => {
    if (!loading && editorData) {
      editorRef.current?.destroy?.();
      
      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        data: editorData,
        tools: {
          header: Header,
          paragraph: Paragraph,
          list: List,
          quote: Quote,
          embed: Embed as any,
          image_caption: { class: AddImageTools, inlineToolbar: false },
        },
        placeholder: "Tulis artikel Anda di sini...",
      });
      editorRef.current = editor;
    }

    return () => {
      editorRef.current?.destroy?.();
      editorRef.current = null;
    };
  }, [loading, editorData]);

  // --- FUNGSI HANDLER ---
  const handleMetaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "infographic_link") {
      setMeta((prev) => ({ ...prev, infographic_link: convertGoogleDriveLink(value) }));
      return;
    }
    setMeta((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!editorRef.current) {
      setMessage("Editor belum siap untuk menyimpan.");
      return;
    }
    setSaving(true);
    try {
      const output = await editorRef.current.save();
      
      // Konversi balik dari format EditorJS ke format DB
      const mapToDbBlock = (editorBlock: any, order: number) => {
        const typeMap: Record<string, string> = {
          header: "headline",
          paragraph: "paragraph",
          list: "list",
          quote: "quote",
          embed: "embed",
          image_caption: "image_caption",
        };
        
        let content;
        switch(editorBlock.type) {
          case 'list':
            content = editorBlock.data.items;
            break;
          case 'header':
          case 'paragraph':
          case 'quote':
            content = editorBlock.data.text;
            break;
          default:
            content = editorBlock.data; // Untuk embed, image_caption, dll.
        }

        return {
          ordering: order,
          block_type: typeMap[editorBlock.type] || 'paragraph',
          content: content
        };
      };

      const payloadBlocks: any[] = [];
      let currentOrder = 1;

      if (infographicDesc.trim()) {
        payloadBlocks.push({
          ordering: currentOrder++,
          block_type: 'infographic_desc',
          content: infographicDesc.trim()
        });
      }

      output.blocks.forEach(block => {
        payloadBlocks.push(mapToDbBlock(block, currentOrder++));
      });

      const updatePayload = { ...meta, blocks: payloadBlocks };
      
      const res = await fetch(`/api/articles/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Gagal menyimpan artikel.");
      }

      setMessage("Artikel berhasil diupdate!");
      router.push("/");

    } catch (error: any) {
      console.error("Gagal menyimpan:", error);
      setMessage(error.message || "Terjadi kesalahan saat menyimpan.");
    } finally {
      setSaving(false);
    }
  };

  // --- TAMPILAN JSX ---
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0e0e12] text-white">
        Memuat editor dan artikel...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e12] text-white px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center tracking-wide">
          Edit Survey Article
        </h1>
        
        {/* Formulir Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input name="title" value={meta.title || ""} onChange={handleMetaChange} placeholder="Judul Survei" className="p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50" />
            <input name="slug" value={meta.slug || ""} onChange={handleMetaChange} placeholder="Nama Link (slug)" className="p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50" />
            <input name="header_image" value={meta.header_image || ""} onChange={handleMetaChange} placeholder="Link Image Header" className="p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50" />
            <input name="period" value={meta.period || ""} onChange={handleMetaChange} placeholder="Periode Survei" className="p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50" />
            <input name="method" value={meta.method || ""} onChange={handleMetaChange} placeholder="Metode Survei" className="p-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50" />
            <select name="survey_type" value={meta.survey_type || ""} onChange={handleMetaChange} className="p-3 rounded-xl bg-white/5 border border-white/20 text-white">
                <option value="">Pilih tipe survei</option>
                <option value="kolaborasi">Kolaborasi</option>
                <option value="mandiri">Mandiri</option>
            </select>
            <input name="report_link" value={meta.report_link || ""} onChange={handleMetaChange} placeholder="Link Laporan" className="p-3 rounded-xl bg-white/5 border border-white/20 text-white" />
            <input name="respondents" type="number" value={meta.respondents ?? ""} onChange={(e) => setMeta((p) => ({ ...p, respondents: Number(e.target.value) || null })) } placeholder="Jumlah Responden" className="p-3 rounded-xl bg-white/5 border border-white/20 text-white" />
            <input name="infographic_link" value={meta.infographic_link || ""} onChange={handleMetaChange} placeholder="Link Infografis (bisa link Google Drive)" className="p-3 rounded-xl bg-white/5 border border-white/20 text-white md:col-span-2" />
            <textarea value={infographicDesc} onChange={(e) => setInfographicDesc(e.target.value)} placeholder="Pengenalan survei (akan muncul di atas artikel)" className="p-3 rounded-xl bg-white/5 border border-white/20 text-white md:col-span-2 h-28 resize-none" />
        </div>

        {/* Kontainer untuk EditorJS */}
        <div id="editorjs" className="bg-white/5 border border-white/20 rounded-2xl min-h-[300px] p-4 mb-6"></div>
        
        {/* Tombol Aksi */}
        <div className="flex items-center gap-4 mt-6">
          <button onClick={handleSave} disabled={saving} className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${saving ? "bg-blue-400 text-white cursor-wait" : "bg-blue-600 hover:bg-blue-500 text-white"}`}>
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <button onClick={() => router.back()} className="px-6 py-2.5 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all">
            Batal
          </button>
          {message && <div className="ml-4 text-sm text-white/70 italic">{message}</div>}
        </div>
      </div>
    </div>
  );
}