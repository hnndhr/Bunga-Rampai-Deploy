"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Embed from "@editorjs/embed";
import Paragraph from "@editorjs/paragraph";
import AddImageTools from "./AddImageTools";
import { convertGoogleDriveLink } from "./GoogleDriveConverter";

type ArticleMeta = {
  title: string;
  slug: string;
  header_image?: string;
  period?: string;
  method?: string;
  survey_type?: string;
  report_link?: string;
  respondents?: number;
  infographic_link?: string;
};

export default function AdminArticleCreatePage() {
  const router = useRouter();
  const editorRef = useRef<EditorJS | null>(null);
  const [meta, setMeta] = useState<ArticleMeta>({ title: "", slug: "", header_image: "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" });
  const [infographicDesc, setInfographicDesc] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const initializeEditor = async () => {
      if (editorRef.current) return;

      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: {
          header: Header,
          paragraph: Paragraph,
          list: List,
          quote: Quote,
          embed: Embed as any,
          image_caption: {
            class: AddImageTools,
            inlineToolbar: false,
          },
        },
        placeholder: "Start writing your article...",
      });

      await editor.isReady;
      if (isMounted) editorRef.current = editor;
    };

    initializeEditor();

    return () => {
      isMounted = false;
      editorRef.current?.destroy?.();
      editorRef.current = null;
    };
  }, []);

  const handleMetaChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setMeta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function createArticleMeta(): Promise<boolean> {
    if (!meta.title || !meta.slug) {
      setMessage("Title and slug are required");
      return false;
    }
    try {
      const metaPayload: any = { ...meta };
      if ("infographic_desc" in metaPayload)
        delete metaPayload.infographic_desc;

      const res = await fetch("http://localhost:3001/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metaPayload),
      });

      if (!res.ok) {
        const txt = await res.text();
        setMessage(`Gagal membuat artikel: ${txt}`);
        return false;
      }

      setMessage("Article meta created");
      return true;
    } catch (err: any) {
      setMessage(err.message || "Error");
      return false;
    }
  }

  function mapEditorBlockToMyBlock(block: any, idx: number) {
    const typeMap: Record<string, string> = {
      header: "headline",
      paragraph: "paragraph",
      list: "list",
      quote: "quote",
      embed: "embed",
      infographic_desc: "infographic_desc",
      image_caption: "image_caption",
    };

    const myType = typeMap[block.type] || block.type || "paragraph";
    let content: any = null;

    switch (block.type) {
      case "header":
        content = block.data.text;
        break;
      case "paragraph":
        content =
          block.data?.text || block.data?.html || JSON.stringify(block.data);
        break;
      case "list":
        content = block.data?.items || block.data?.style || block.data;
        break;
      case "quote":
        content = block.data?.text || block.data;
        break;
      case "embed":
        content = {
          service: block.data.service,
          source: block.data.source,
          embed: block.data.embed,
        };
        break;
      case "infographic_desc":
        content = block.data?.text ?? block.data ?? block;
        break;
      case "image_caption":
        content = {
          image:
            block.data?.image ||
            (typeof block.data === "string" ? block.data : null),
          caption: block.data?.caption || "",
        };
        break;
      default:
        content = block.data || block;
    }

    return {
      ordering: idx + 1,
      block_type: myType,
      content,
    };
  }

  async function handleSave() {
    setMessage(null);
    setSaving(true);
    if (!meta.title || !meta.slug) {
      setMessage("Title dan slug wajib diisi");
      setSaving(false);
      return;
    }

    try {
      console.log("Meta yang akan dikirim:", meta);
      const metaCreated = await createArticleMeta();
      if (!metaCreated) {
        setSaving(false);
        return;
      }

      const output = await editorRef.current ?.save();
      const editorBlocks = (output?.blocks || []).map((b: any, i: number) =>
        mapEditorBlockToMyBlock(b, i + (infographicDesc ? 1 : 0))
      );

      let blocksPayload: any[] = editorBlocks;
      if (infographicDesc.trim() !== "") {
        const infographicBlock = {
          ordering: 1,
          block_type: "infographic_desc",
          content: infographicDesc.trim(),
        };
        blocksPayload = [
          infographicBlock,
          ...editorBlocks.map((b, idx) => ({ ...b, ordering: idx + 2 })),
        ];
      } else {
        blocksPayload = editorBlocks.map((b, i) => ({ ...b, ordering: i + 1 }));
      }

      if (blocksPayload.length === 0) {
        setMessage("Artikel berhasil dibuat (tanpa konten).");
        setSaving(false);
        return;
      }

      const resBlocks = await fetch(
        `http://localhost:3001/articles/${encodeURIComponent(
          meta.slug
        )}/blocks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blocksPayload),
        }
      );

      if (!resBlocks.ok) {
        const txt = await resBlocks.text();
        throw new Error(`Gagal menyimpan blok konten: ${txt}`);
      }

      setMessage(`Artikel dan ${blocksPayload.length} blok berhasil disimpan!`);
      router.push("/admin/admin-dashboard");
    } catch (err: any) {
      setMessage(err.message || "Terjadi error saat menyimpan");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0e0e12] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center tracking-wide">
          Create New Survey Article
        </h1>

        {/* Form Meta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[
            { name: "title", placeholder: "Judul Survei" },
            {
              name: "slug",
              placeholder: "Nama Link (Contoh: survey-kos-2025)",
            },
            { name: "header_image", placeholder: "Link Image Header" },
            { name: "period", placeholder: "Periode Survei" },
            { name: "method", placeholder: "Metode Survei" },
          ].map((input) => (
            <input
              key={input.name}
              name={input.name}
              value={
                input.name === "header_image"
                  ? (meta as any)[input.name] ||
                    "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                  : (meta as any)[input.name] || ""
              }
              onChange={handleMetaChange}
              placeholder={input.placeholder}
              className="p-3 rounded-xl bg-white/5 border border-white/20 focus:ring-2 focus:ring-white focus:outline-none text-white placeholder-white/50"
            />
          ))}

          <select
            name="survey_type"
            value={meta.survey_type || ""}
            onChange={handleMetaChange}
            className="
              p-3 rounded-xl 
              bg-white/5 border border-white/20 
              text-white
              focus:outline-none
              focus:ring-2 focus:ring-white/70
              focus:border-white/50
              transition-all
            "
          >
            <option value="" className="bg-black/80">
              Pilih tipe survei
            </option>
            <option value="kolaborasi" className="bg-black/80">
              Kolaborasi
            </option>
            <option value="mandiri" className="bg-black/80">
              Mandiri
            </option>
          </select>

          <input
            name="report_link"
            value={meta.report_link || ""}
            onChange={handleMetaChange}
            placeholder="Link Laporan"
            className="p-3 rounded-xl bg-white/5 border border-white/20 focus:ring-2 focus:ring-white text-white placeholder-white/50"
          />

          <input
            name="respondents"
            type="number"
            value={meta.respondents || ""}
            onChange={handleMetaChange}
            placeholder="Jumlah Responden"
            className="p-3 rounded-xl bg-white/5 border border-white/20 focus:ring-2 focus:ring-white text-white placeholder-white/50"
          />

          <input
            name="infographic_link"
            value={meta.infographic_link || ""}
            onChange={(e) =>
              setMeta({
                ...meta,
                infographic_link: convertGoogleDriveLink(e.target.value),
              })
            }
            placeholder="Link Infografis"
            className="p-3 rounded-xl bg-white/5 border border-white/20 focus:ring-2 focus:ring-white text-white placeholder-white/50 md:col-span-2"
          />

          <textarea
            name="infographic_desc_block"
            value={infographicDesc}
            onChange={(e) => setInfographicDesc(e.target.value)}
            placeholder="Pengenalan survei"
            className="p-3 rounded-xl bg-white/5 border border-white/20 focus:ring-2 focus:ring-white text-white placeholder-white/50 md:col-span-2 h-28 resize-none"
          />
        </div>

        {/* EditorJS Container */}
        <div
          id="editorjs"
          className="bg-white/5 border border-white/20 rounded-2xl min-h-[300px] p-4"
        ></div>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
              saving
                ? "bg-blue-400 text-white cursor-wait"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            {saving ? "Saving..." : "Save Article"}
          </button>

          <button
            onClick={() => {
              editorRef.current?.clear();
              setInfographicDesc("");
            }}
            className="px-6 py-2.5 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all"
          >
            Clear
          </button>

          {message && (
            <div className="ml-4 text-sm text-white/70 italic">{message}</div>
          )}
        </div>
      </div>
    </div>
  );
}
