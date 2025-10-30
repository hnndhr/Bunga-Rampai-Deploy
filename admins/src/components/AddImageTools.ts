// components/editor-tools/ImageCaptionTool.ts
// EditorJS tool: Image + Caption (preview-style)
// No external deps.

type ToolData = {
  image?: string;
  caption?: string;
};

function convertGoogleDriveLink(input: string): string {
  if (!input) return input;
  const m = input.match(/(?:\/d\/|id=)([\w-]+)/);
  const id = m ? m[1] : null;
  if (!id) return input;
  return `https://drive.google.com/uc?export=view&id=${id}`;
}

export default class AddImageTools {
  api: any;
  node: HTMLDivElement;
  inputUrl!: HTMLInputElement;
  inputCaption!: HTMLTextAreaElement;
  previewEl!: HTMLImageElement | null;

  static get toolbox() {
    return {
      title: "Image + Caption",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
    };
  }

  constructor({ data, api, config }: any) {
    this.api = api;
    this.node = document.createElement("div");
    this.node.classList.add("image-caption-tool", "w-full");

    // mount UI
    const wrapper = document.createElement("div");
    wrapper.className = "flex flex-col gap-2";

    // url input
    const urlInput = document.createElement("input");
    urlInput.type = "text";
    urlInput.placeholder = "Paste image URL or Google Drive link...";
    urlInput.className =
      "border p-2 rounded w-full text-sm bg-white text-black";
    urlInput.value = (data && data.image) || "";
    this.inputUrl = urlInput;

    // preview container
    const preview = document.createElement("div");
    preview.className = "preview w-full flex items-center justify-center";
    this.previewEl = null;

    // caption textarea
    const caption = document.createElement("textarea");
    caption.placeholder = "Caption (optional)";
    caption.className = "border p-2 rounded w-full text-sm";
    caption.rows = 2;
    caption.value = (data && data.caption) || "";
    this.inputCaption = caption;

    // helper small text
    const helper = document.createElement("div");
    helper.className = "text-xs text-slate-500 pt-1";
    helper.innerText = "Supports Google Drive links — paste any Drive URL.";

    // wire events
    urlInput.addEventListener("input", () => {
      const converted = convertGoogleDriveLink(urlInput.value.trim());
      // set preview src if valid-ish
      if (converted) {
        if (!this.previewEl) {
          const img = document.createElement("img");
          img.className = "max-w-full rounded-md shadow-sm";
          img.style.maxHeight = "360px";
          preview.innerHTML = "";
          preview.appendChild(img);
          this.previewEl = img;
        }
        this.previewEl.src = converted;
      } else {
        preview.innerHTML = "";
        this.previewEl = null;
      }
    });

    // if there's initial data show preview
    if (data && data.image) {
      const initialSrc = convertGoogleDriveLink(data.image);
      const img = document.createElement("img");
      img.className = "max-w-full rounded-md shadow-sm";
      img.style.maxHeight = "360px";
      img.src = initialSrc;
      preview.appendChild(img);
      this.previewEl = img;
    }

    wrapper.appendChild(urlInput);
    wrapper.appendChild(preview);
    wrapper.appendChild(caption);
    wrapper.appendChild(helper);

    this.node.appendChild(wrapper);
  }

  render() {
    return this.node;
  }

  save(blockContent: HTMLElement) {
    const imgVal = this.inputUrl.value?.trim() || "";
    const captionVal = this.inputCaption.value?.trim() || "";
    const image = convertGoogleDriveLink(imgVal);
    return {
      image,
      caption: captionVal,
    } as ToolData;
  }

  // Optional: validate when saving
  validate(savedData: ToolData) {
    // allow empty (block can be allowed empty but better to require image)
    if (!savedData || !savedData.image) return false;
    return true;
  }
}
