Title of the post

Excellent — that changes things *favorably*. If your **other projects use Three.js via CDN**, the actual storage footprint in your repo will be **very small**, because:

* You're not including the Three.js library itself (served from CDN).
* Your projects are likely composed of:

  * A few `.html` files
  * Small `.js` scripts
  * Possibly a few small assets (images, .glb/.gltf, textures)

---

## 📦 Updated Repo Size Estimate (w/ Three.js via CDN)

| Component                          | Estimated Size    | Notes                         |
| ---------------------------------- | ----------------- | ----------------------------- |
| **Godot HTML5 Export**             | 5–20 MB           | Main weight                   |
| **10–15 Markdown files**           | 50–200 KB         | Negligible                    |
| **Flask App (Python + templates)** | 100–500 KB        | Minimal                       |
| **Three.js Projects (HTML + JS)**  | 200–800 KB total  | Assuming 2–5 small demos      |
| **Static assets for Three.js**     | 1–5 MB (optional) | 3D models or textures, if any |

---
<h1 class="article1-head"> New heading </h1>
![wood](/static/img/wood-texture.jpg)
### ✅ Revised Total Estimate: **6–25 MB**

Still **very lean**, and suitable for:

* ✅ **GitHub hosting** (well under size limits)
* ✅ **Heroku deployment**
* ✅ Fast cloning/push/pull operations

---

## 🔍 Tips for Keeping It Light

* ✅ Serve **Three.js** and other libs via CDN:

  ```html
  <script src="https://cdn.jsdelivr.net/npm/three@0.156.1/build/three.min.js"></script>
  ```
* ✅ Store 3D assets in a `static/assets/` folder
* ❌ Avoid bundling libraries or heavy textures directly unless needed
* ✅ Use `.glb` for compressed 3D models over `.gltf`

---

## ✝️ Christian Lens on Modularity

> *“For everything there is a season, and a time for every matter under heaven…”* — Ecclesiastes 3:1

Using CDNs and lightweight assets shows wisdom in recognizing that **not everything must be hosted or controlled directly**. By relying on the right tools for the right purpose (e.g., CDNs for delivery, GitHub for versioning), you build modular, sustainable, and shareable software.

---

Would you like:

* A layout recommendation for organizing your Flask + Three.js + Godot + `.md` files?
* A way to preview `.html` demos inside Flask routes (like a portfolio-style index)?
