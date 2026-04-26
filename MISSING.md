# Sweet & Joy — Missing Steps to Go Live

Everything still needed to make the site 100% functional.

---

## 🔴 Critical (site broken without these)

### 1. Hero Logo (broken image)

The hero section references `assets/logo-full.jpeg` — this file does not exist.

**Fix options:**
- Add the full logo file as `assets/logo-full.jpeg`
- Or tell Claude Code to use `assets/images/logo.png` instead (already uploaded)

**Impact:** The main hero image (the circular logo seal on the right side of the hero) is invisible.

---

### 2. Product Photos (all missing)

All product card images are missing. The site currently shows empty/broken image slots.

**Files needed** — place in `assets/images/`:

| Filename | What it should show |
|---|---|
| `founder.jpg` | Vanessa's portrait photo |
| `cake-custom-01.jpg` | Custom cake photo #1 |
| `cake-custom-02.jpg` | Custom cake photo #2 |
| `docinhos-01.jpg` | Docinhos / gourmet sweets photo #1 |
| `docinhos-02.jpg` | Docinhos / gourmet sweets photo #2 |

**Photo tips:**
- JPEG format, under 400 KB each (compress at [squoosh.app](https://squoosh.app))
- Minimum 800×800px for product photos
- Founder photo: portrait orientation, good lighting

**After adding:** Tell Claude Code to commit and push, or run:
```bash
git -C "/Volumes/SecondBrain/Claude/Sweet & Joy" add assets/images/ && git -C "/Volumes/SecondBrain/Claude/Sweet & Joy" commit -m "Add product photos" && git -C "/Volumes/SecondBrain/Claude/Sweet & Joy" push
```

---

## 🟡 Important (degrades experience without these)

### 3. Instagram Feed (Behold.so)

The Instagram section currently shows a placeholder box with no real photos.

**Steps:**
1. Go to [behold.so](https://behold.so) and create a free account
2. Connect the **@sweetjoync** Instagram account
3. Copy the embed snippet (looks like `<behold-widget feed-id="..."></behold-widget>`)
4. Tell Claude Code: *"Replace the Behold placeholder with this embed code: [paste code]"*

---

### 4. Google Maps — Specific Address

The map currently shows a generic "Kernersville, NC" pin with no specific address.

**Steps:**
1. Get the exact service address or confirm the map should show the city area only
2. If a specific address: go to Google Maps → find the address → click Share → Embed a map → copy the `src` URL
3. Tell Claude Code: *"Update the Google Maps embed src to: [paste URL]"*

> If Vanessa operates from home and doesn't want to show her address publicly, the current city-level map is fine as-is.

---

## 🟢 Nice to Have (post-launch polish)

### 5. Custom Domain

Currently live at: `sweet-joy.thalessouto.workers.dev`

**To get a real domain** (e.g. `sweetjoync.com`):
1. Buy domain at [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) or Namecheap
2. In Cloudflare dashboard → Workers & Pages → sweet-joy → Custom Domains → Add
3. Follow DNS instructions (automatic if domain is also at Cloudflare)
4. SSL is free and automatic

---

### 6. Google Business Profile

Puts the bakery on Google Maps search results for "bakery near me" / "custom cakes Kernersville."

**Steps:**
1. Go to [business.google.com](https://business.google.com) using Vanessa's Google account
2. Add business: **Sweet & Joy by Vanessa Sulevis** → Category: Bakery → Location: Kernersville, NC
3. Phone: (336) 989-1342
4. Website: the live URL (workers.dev or custom domain)
5. Verify ownership (Google mails a postcard or offers phone verification)
6. Upload photos and request first reviews from happy customers

---

### 7. Google Search Console

Tells Google the site exists and tracks search performance.

**Steps:**
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → URL prefix → enter the live URL
3. Verify via HTML tag (Claude Code can add the `<meta>` tag to `index.html`)
4. Submit URL for indexing

---

## Summary

| # | Item | Priority | Who |
|---|---|---|---|
| 1 | Hero logo (logo-full.jpeg) | 🔴 Critical | Thales + Claude Code |
| 2 | Product photos | 🔴 Critical | Vanessa provides → Thales uploads |
| 3 | Behold.so Instagram feed | 🟡 Important | Thales |
| 4 | Google Maps address | 🟡 Important | Vanessa confirms → Thales + Claude Code |
| 5 | Custom domain | 🟢 Nice to have | Thales |
| 6 | Google Business Profile | 🟢 Nice to have | Vanessa |
| 7 | Google Search Console | 🟢 Nice to have | Thales |
