"""Builds out/video.srt, out/parts-list.md and script.md from out/info.json, narration.json and parts_meta.json.
Run after:  python render.py info   (timings come from the captions)."""
import json, os
H = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(H, "out")
info = json.load(open(os.path.join(OUT, "info.json"), encoding="utf-8"))
narr = json.load(open(os.path.join(H, "narration.json"), encoding="utf-8"))
meta = json.load(open(os.path.join(H, "parts_meta.json"), encoding="utf-8"))
BN = str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯")
LET = "কখগঘঙ"
def label(name):  # s05_p02 -> ৫খ
    return (str(int(name[1:3])) + LET[int(name[5:7]) - 1]).translate(BN)
def ts(t, sep=","):
    ms = int(round(t * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d}{sep}{ms:03d}"
def mmss(t): return f"{int(t // 60)}:{int(round(t % 60)):02d}"

# ---- srt (whole video) + one srt per part ----
srt, n, off, rows = [], 0, 0.0, []
for p in info:
    one = []
    for i, c in enumerate(p["caps"]):
        n += 1
        srt.append(f"{n}\n{ts(off + c['a'])} --> {ts(off + c['b'])}\n{c['c']}\n")
        one.append(f"{i + 1}\n{ts(c['a'])} --> {ts(c['b'])}\n{c['c']}\n")
    open(os.path.join(OUT, p["name"] + ".srt"), "w", encoding="utf-8").write("\n".join(one))
    rows.append((p["name"], off, p["dur"])); off += round(p["dur"] * 30) / 30      # clips are whole frames at 30 fps
open(os.path.join(OUT, "video.srt"), "w", encoding="utf-8").write("\n".join(srt))
total = off

# ---- parts list ----
L = ["# পর্বের তালিকা: ষষ্ঠ শ্রেণি | বিজ্ঞান | অধ্যায় ৯: আলোর ঘটনা | আলো কী ও কীভাবে চলে", "",
     f"মোট দৈর্ঘ্য: {mmss(total)} ({len(rows)}টি পর্ব)। সব ক্লিপ 1920x1080, 30 fps, H.264, শব্দ ছাড়া।", "",
     "| দৃশ্য | পর্ব | শুরু | দৈর্ঘ্য (সে) | কী দেখায় | ক্লিপ | ক্যাপশন |", "|---|---|---|---|---|---|---|"]
for name, st, d in rows:
    L.append(f"| {int(name[1:3])} | {label(name)} | {mmss(st)} | {d:.1f} | {meta['parts'][name][0]} | `{name}.mp4` | `{name}.srt` |")
open(os.path.join(OUT, "parts-list.md"), "w", encoding="utf-8").write("\n".join(L) + "\n")

# ---- script ----
words = sum(len(s.split()) for v in narr.values() for s in v)
S = [f"""# স্ক্রিপ্ট: ষষ্ঠ শ্রেণি | বিজ্ঞান | অধ্যায় ৯: আলোর ঘটনা | আলো কী ও কীভাবে চলে

## বিবরণ

| বিষয় | তথ্য |
|---|---|
| শিরোনাম | ষষ্ঠ শ্রেণি \\| বিজ্ঞান \\| অধ্যায় ৯: আলোর ঘটনা \\| আলো কী ও কীভাবে চলে |
| বইয়ের রেফারেন্স | বিজ্ঞান, ষষ্ঠ শ্রেণি (এনসিটিবি), অধ্যায় ৯: অধ্যায়ের প্রথম পাতা ও পাঠ ১-২, পৃ. ৭৩-৭৪ (PDF পৃ. ৭৮-৭৯) |
| দৈর্ঘ্য | {mmss(total)}; ৯টি দৃশ্য, {len(rows)}টি পর্ব; বর্ণনা {words} শব্দ |
| বর্ণনার ধরন | একজন বর্ণনাকারী, "তুমি" সম্বোধন, গল্প বলার ভঙ্গি, চলিত ভাষা |
| ভিজ্যুয়াল নিয়ম | কোনো পূর্ণ প্রাণী, মুখ বা গাছ নেই; শুধু আলাদা চোখ বা হাত। পরীক্ষা বইয়ের চিত্রের কোণ থেকে দেখানো। |
| বইয়ের বাইরের বিষয় | নতুন কোনো বৈজ্ঞানিক ধারণা নেই। উপমা হিসেবে আছে: কাগজের নল, স্কেল, সুতো। |

## বইয়ের চিত্র ও কাজ কোথায় অ্যানিমেট হয়েছে

| চিত্র / কাজ | কী দেখায় | কোন পর্বে |
|---|---|---|
| অধ্যায়ের শুরুর বর্ণনা (পৃ. ৭৩) | আলো এক প্রকার শক্তি; সেকেন্ডে প্রায় ৩ লক্ষ কিমি; পৃথিবীকে ৭ বারের বেশি ঘোরা; সকল আলোর উৎস সূর্য | ২ক, ২খ, ২গ, ২ঘ |
| পাঠ ১-২-এর কাজ ও চিত্র ৯.১ | তিনটি কার্ডের ছিদ্র ও মোমবাতির শিখা এক সরলরেখায়; একটি কার্ড সরালে শিখা দেখা যায় না; আলোকরশ্মি | ৫ক, ৫খ, ৫গ, ৫ঘ (মূল); ৬ক, ৬খ, ৬ঘ; ৮খ, ৮গ |
| চিত্র ৯.২ | আমরা কীভাবে দেখি (পাঠ ৩, পরের ভিডিওর বিষয়) | শুধু সাজানোটা ৯গ-এর ধাঁধায়; ব্যাখ্যা নেই |

চিত্র ৯.১-এর মেয়েটির জায়গায় শুধু একটি চোখ আঁকা হয়েছে; টেবিল, কার্ড, মোমবাতির সাজানো বইয়ের মতো।
"""]
cur = None
for name, st, d in rows:
    sc = str(int(name[1:3]))
    if sc != cur:
        cur = sc; S.append(f"\n---\n\n## দৃশ্য {sc.translate(BN)}: {meta['scenes'][sc]}\n")
    S.append(f"### {label(name)}: {meta['parts'][name][0]}  (`{name}`, শুরু {mmss(st)}, {d:.1f} সে)\n\n**On screen:** {meta['parts'][name][1]}\n\n**বর্ণনা:** {' '.join(narr[name])}\n")
S.append("""
---

## রেকর্ডিংয়ের নোট

- প্রতিটি পর্ব আলাদা করে রেকর্ড করুন। প্রতিটি পর্বের নিজস্ব `.srt` আছে (`out/sNN_pNN.srt`), সেটা দেখে সময় মেলাতে পারবেন।
- ভিডিওর সময় ক্যাপশন থেকে হিসাব করা (প্রায় ২.১ শব্দ প্রতি সেকেন্ড)। আপনার কণ্ঠের সাথে না মিললে আমাকে পর্বের নাম ও প্রকৃত সময় দিন; শুধু সেই পর্ব নতুন করে রেন্ডার হবে।
- প্রশ্নের পর একটু থামুন: ১খ-র শেষে, ৩গ-র "কেমন পথে এল?"-এর পর, ৭ঘ-র "একটু ভেবে নাও"-তে।
- ২গ-তে "এক, দুই ... সাত" সমান তালে গুনুন; পর্দায় বিন্দুটা সেই সময়ে সাত পাক ঘোরে।
- ১ক-তে "ফট!" ও "ফস!" শব্দ দুটো জোর দিয়ে বলুন; পর্দায় লেখা ওঠে।

## শব্দতালিকা

| বাংলা | ইংরেজি | প্রথম ব্যবহার (টার্ম-কার্ড) |
|---|---|---|
| শক্তি | Energy | ২ক |
| সরলরেখা | Straight line | ৬ক |
| আলোকরশ্মি | Ray of light | ৬গ |
""")
open(os.path.join(H, "script.md"), "w", encoding="utf-8").write("\n".join(S))
print("total", mmss(total), round(total, 1), "s;", len(rows), "parts;", words, "words;", n, "captions")
