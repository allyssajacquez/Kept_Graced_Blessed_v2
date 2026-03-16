import { useState, useEffect, useRef } from "react";

// ─── THEMES ──────────────────────────────────────────────────────────────────
const LIGHT = {
  bg: "#fdf0f3", surface: "#fff5f7", card: "#ffffff",
  pink1: "#f4b8c8", pink2: "#e8839e", pink3: "#d45c7a", accent: "#c24a68",
  cherry: "#781323", cherryLight: "#a01830",
  text: "#3a1a24", textMid: "#6b3347", textLight: "#a06680",
  border: "#f0c8d4", grid: "rgba(212,92,122,0.10)",
  highlight: "rgba(232,131,158,0.28)",
};
const DARK = {
  bg: "#120608", surface: "#1e0b10", card: "#2a1018",
  pink1: "#8c3d55", pink2: "#c24a68", pink3: "#e8839e", accent: "#f4b8c8",
  cherry: "#8b1a2a", cherryLight: "#a82035",
  text: "#fde8ee", textMid: "#f0b8c8", textLight: "#c47a90",
  border: "#3d1520", grid: "rgba(244,184,200,0.06)",
  highlight: "rgba(194,74,104,0.30)",
};

// ─── BOOKS ───────────────────────────────────────────────────────────────────
const BOOKS = [
  { id:1,  name:"Genesis",         chapters:50,  testament:"OT" },
  { id:2,  name:"Exodus",          chapters:40,  testament:"OT" },
  { id:3,  name:"Leviticus",       chapters:27,  testament:"OT" },
  { id:4,  name:"Numbers",         chapters:36,  testament:"OT" },
  { id:5,  name:"Deuteronomy",     chapters:34,  testament:"OT" },
  { id:6,  name:"Joshua",          chapters:24,  testament:"OT" },
  { id:7,  name:"Judges",          chapters:21,  testament:"OT" },
  { id:8,  name:"Ruth",            chapters:4,   testament:"OT" },
  { id:9,  name:"1 Samuel",        chapters:31,  testament:"OT" },
  { id:10, name:"2 Samuel",        chapters:24,  testament:"OT" },
  { id:11, name:"1 Kings",         chapters:22,  testament:"OT" },
  { id:12, name:"2 Kings",         chapters:25,  testament:"OT" },
  { id:13, name:"1 Chronicles",    chapters:29,  testament:"OT" },
  { id:14, name:"2 Chronicles",    chapters:36,  testament:"OT" },
  { id:15, name:"Ezra",            chapters:10,  testament:"OT" },
  { id:16, name:"Nehemiah",        chapters:13,  testament:"OT" },
  { id:17, name:"Esther",          chapters:10,  testament:"OT" },
  { id:18, name:"Job",             chapters:42,  testament:"OT" },
  { id:19, name:"Psalms",          chapters:150, testament:"OT" },
  { id:20, name:"Proverbs",        chapters:31,  testament:"OT" },
  { id:21, name:"Ecclesiastes",    chapters:12,  testament:"OT" },
  { id:22, name:"Song of Solomon", chapters:8,   testament:"OT" },
  { id:23, name:"Isaiah",          chapters:66,  testament:"OT" },
  { id:24, name:"Jeremiah",        chapters:52,  testament:"OT" },
  { id:25, name:"Lamentations",    chapters:5,   testament:"OT" },
  { id:26, name:"Ezekiel",         chapters:48,  testament:"OT" },
  { id:27, name:"Daniel",          chapters:12,  testament:"OT" },
  { id:28, name:"Hosea",           chapters:14,  testament:"OT" },
  { id:29, name:"Joel",            chapters:3,   testament:"OT" },
  { id:30, name:"Amos",            chapters:9,   testament:"OT" },
  { id:31, name:"Obadiah",         chapters:1,   testament:"OT" },
  { id:32, name:"Jonah",           chapters:4,   testament:"OT" },
  { id:33, name:"Micah",           chapters:7,   testament:"OT" },
  { id:34, name:"Nahum",           chapters:3,   testament:"OT" },
  { id:35, name:"Habakkuk",        chapters:3,   testament:"OT" },
  { id:36, name:"Zephaniah",       chapters:3,   testament:"OT" },
  { id:37, name:"Haggai",          chapters:2,   testament:"OT" },
  { id:38, name:"Zechariah",       chapters:14,  testament:"OT" },
  { id:39, name:"Malachi",         chapters:4,   testament:"OT" },
  { id:40, name:"Matthew",         chapters:28,  testament:"NT" },
  { id:41, name:"Mark",            chapters:16,  testament:"NT" },
  { id:42, name:"Luke",            chapters:24,  testament:"NT" },
  { id:43, name:"John",            chapters:21,  testament:"NT" },
  { id:44, name:"Acts",            chapters:28,  testament:"NT" },
  { id:45, name:"Romans",          chapters:16,  testament:"NT" },
  { id:46, name:"1 Corinthians",   chapters:16,  testament:"NT" },
  { id:47, name:"2 Corinthians",   chapters:13,  testament:"NT" },
  { id:48, name:"Galatians",       chapters:6,   testament:"NT" },
  { id:49, name:"Ephesians",       chapters:6,   testament:"NT" },
  { id:50, name:"Philippians",     chapters:4,   testament:"NT" },
  { id:51, name:"Colossians",      chapters:4,   testament:"NT" },
  { id:52, name:"1 Thessalonians", chapters:5,   testament:"NT" },
  { id:53, name:"2 Thessalonians", chapters:3,   testament:"NT" },
  { id:54, name:"1 Timothy",       chapters:6,   testament:"NT" },
  { id:55, name:"2 Timothy",       chapters:4,   testament:"NT" },
  { id:56, name:"Titus",           chapters:3,   testament:"NT" },
  { id:57, name:"Philemon",        chapters:1,   testament:"NT" },
  { id:58, name:"Hebrews",         chapters:13,  testament:"NT" },
  { id:59, name:"James",           chapters:5,   testament:"NT" },
  { id:60, name:"1 Peter",         chapters:5,   testament:"NT" },
  { id:61, name:"2 Peter",         chapters:3,   testament:"NT" },
  { id:62, name:"1 John",          chapters:5,   testament:"NT" },
  { id:63, name:"2 John",          chapters:1,   testament:"NT" },
  { id:64, name:"3 John",          chapters:1,   testament:"NT" },
  { id:65, name:"Jude",            chapters:1,   testament:"NT" },
  { id:66, name:"Revelation",      chapters:22,  testament:"NT" },
];

// ─── READING PLANS ───────────────────────────────────────────────────────────
const READING_PLANS = [
  {
    id: "new-believer-7",
    name: "New Believer",
    duration: "7 Days",
    description: "Start here. These 7 passages lay the foundation of everything.",
    days: [
      { day:1, ref:"John 1",       bookId:43, chapter:1,  title:"In the Beginning Was the Word" },
      { day:2, ref:"John 3",       bookId:43, chapter:3,  title:"God So Loved the World" },
      { day:3, ref:"Romans 3",     bookId:45, chapter:3,  title:"All Have Sinned" },
      { day:4, ref:"Romans 5",     bookId:45, chapter:5,  title:"Justified by Faith" },
      { day:5, ref:"Romans 8",     bookId:45, chapter:8,  title:"No Condemnation" },
      { day:6, ref:"Ephesians 2",  bookId:49, chapter:2,  title:"Saved by Grace" },
      { day:7, ref:"Psalm 23",     bookId:19, chapter:23, title:"The Lord Is My Shepherd" },
    ]
  },
  {
    id: "anxiety-7",
    name: "When You're Anxious",
    duration: "7 Days",
    description: "Seven days of scripture specifically for the overwhelmed heart.",
    days: [
      { day:1, ref:"Psalm 46",        bookId:19, chapter:46, title:"God Is Our Refuge" },
      { day:2, ref:"Philippians 4",   bookId:50, chapter:4,  title:"The Peace That Passes Understanding" },
      { day:3, ref:"Isaiah 41",       bookId:23, chapter:41, title:"Do Not Fear" },
      { day:4, ref:"Matthew 6",       bookId:40, chapter:6,  title:"Do Not Worry" },
      { day:5, ref:"Psalm 34",        bookId:19, chapter:34, title:"The Lord Hears" },
      { day:6, ref:"2 Timothy 1",     bookId:55, chapter:1,  title:"A Spirit of Power" },
      { day:7, ref:"John 14",         bookId:43, chapter:14, title:"Let Not Your Heart Be Troubled" },
    ]
  },
  {
    id: "identity-7",
    name: "Who You Are in Christ",
    duration: "7 Days",
    description: "A week of scripture on identity — for when you need to remember who you are.",
    days: [
      { day:1, ref:"Genesis 1",    bookId:1,  chapter:1,  title:"Made in His Image" },
      { day:2, ref:"Psalm 139",    bookId:19, chapter:139,title:"Fearfully & Wonderfully Made" },
      { day:3, ref:"Ephesians 1",  bookId:49, chapter:1,  title:"Chosen Before the Foundation" },
      { day:4, ref:"Romans 8",     bookId:45, chapter:8,  title:"Children of God" },
      { day:5, ref:"1 Peter 2",    bookId:60, chapter:2,  title:"A Royal Priesthood" },
      { day:6, ref:"Colossians 3", bookId:51, chapter:3,  title:"Hidden with Christ" },
      { day:7, ref:"John 15",      bookId:43, chapter:15, title:"You Are My Friend" },
    ]
  },
  {
    id: "psalms-30",
    name: "Psalms in 30 Days",
    duration: "30 Days",
    description: "Move through the heart of the Psalms — joy, lament, praise, and everything between.",
    days: Array.from({length:30}, (_,i) => {
      const psalmNums = [1,8,15,19,22,23,24,27,29,31,34,37,40,42,46,51,62,63,73,84,90,91,100,103,107,116,121,130,139,145];
      return { day:i+1, ref:`Psalm ${psalmNums[i]}`, bookId:19, chapter:psalmNums[i], title:`Psalm ${psalmNums[i]}` };
    })
  },
];

// ─── CONTENT ─────────────────────────────────────────────────────────────────
const CONTENT = {
  "Genesis": {
    tags:["Creation","Identity","Promise","Redemption"],
    deepDive:`Genesis opens the entire biblical story with two foundational questions: *Who made all of this?* and *Who are we?* In the NKJV, God "created" (bara) is a word used only with God as subject — no human craftsman can "bara" anything. This isn't poetry about process; it's a declaration of absolute sovereignty.\n\nThe patriarchal narratives — Abraham, Isaac, Jacob, Joseph — form the backbone of chapters 12–50. Each story wrestles with doubt, failure, and the unbreakable nature of God's covenant. Joseph's arc (chs. 37–50) is one of the most psychologically rich narratives in ancient literature: betrayal, prison, power, and ultimately — forgiveness.`,
    devotional:`Genesis 50:20 might be the most powerful verse in the entire book: "But as for you, you meant evil against me; but God meant it for good." Joseph says this to the brothers who sold him into slavery. Not from denial — he wept openly — but from a perspective only possible after years of watching God work.\n\nWhatever situation feels like betrayal or wasted time right now — God has a Joseph perspective on it. He sees the whole arc. You're living inside a chapter. He's already read the ending.`,
    modern:`Picture your older siblings selling you to strangers because they're jealous. You end up falsely accused, spending years in prison for something you didn't do. Most of us would give up or get bitter. Joseph just kept being excellent wherever he was placed.\n\nThat's the energy Genesis invites you into. Not toxic positivity. But a grounded, almost defiant trust that God doesn't waste suffering — He curates it.`
  },
  "Psalms": {
    tags:["Worship","Lament","Trust","Emotion"],
    deepDive:`The Psalms are the most emotionally honest literature in the Bible. Psalm 22 opens with "My God, My God, why have You forsaken Me?" — the very words Jesus quoted from the cross. The Psalms give language to experiences most people don't know how to voice.\n\nWritten across roughly 900 years by multiple authors including David, Asaph, and the Sons of Korah, the Psalter functions as both hymnal and prayer book. Scholars identify five books within Psalms, each ending with a doxology. The full range — from Psalm 150's pure praise to Psalm 88's unresolved darkness — tells us God can handle everything we bring.`,
    devotional:`Psalm 34:18 — "The LORD is near to those who have a broken heart, and saves such as have a contrite spirit." That word *contrite* means crushed, humbled, not pretending to be okay. This isn't a verse for people who have it together. It's specifically addressed to people who are falling apart.\n\nGod doesn't need you cleaned up before He shows up. He moves toward the broken. If that's you today — the nearness isn't coming. It's already here.`,
    modern:`Imagine if your journal entries got turned into worship songs sung for 3,000 years. That's what happened to David. He wrote about anxiety, betrayal, genuine joy, political enemies, sleepless nights — and the church still sings them today.\n\nThe Psalms normalize the full range of human emotion *in prayer*. You don't have to perform peace. Bring your actual feelings — messy, raw, contradictory — and trust that He can handle all of it.`
  },
  "Proverbs": {
    tags:["Wisdom","Relationships","Character","Decisions"],
    deepDive:`Proverbs isn't a promise book — it's a pattern book. "Wisdom" (hokmah) in Hebrew isn't IQ or information, it's practical skill for living. The wise person isn't just smart; they're good at being human.\n\nSolomon assembled this collection as formation material — meant to be memorized, internalized, and lived. Chapters 1–9 set the theological framework: wisdom begins with the fear of the LORD. Chapters 10–31 are where it gets practical: work, speech, money, friend selection, integrity under pressure.`,
    devotional:`Proverbs 4:23 — "Keep your heart with all diligence, for out of it spring the issues of life." The word "issues" translates the Hebrew totsaot — literally the outflows, the exits. Everything that comes out of your life flows from what's happening inside your heart.\n\nIn a generation that optimizes everything externally — aesthetics, output, social presence — Proverbs says the real work is internal. Guard what you let in. Steward what you're becoming.`,
    modern:`Proverbs is a 3,000-year-old mentorship program. Solomon is saying: *I've seen what happens when people make these decisions. Let me save you some pain.*\n\nIt's shockingly relevant — chapters on not co-signing debt, the danger of flattery, how your friend group shapes who you become, the connection between work ethic and dignity. This isn't religious self-help. It's distilled wisdom from someone who had everything and figured out what actually mattered.`
  },
  "Isaiah": {
    tags:["Prophecy","Hope","Salvation","Comfort"],
    deepDive:`Isaiah is often called "the fifth gospel" because of how directly it points to Jesus. Written 700 years before Christ, chapters 52–53 describe a Suffering Servant with such precision that early Christians saw it as written after the fact.\n\nThe book divides naturally around chapter 39: the first half deals primarily with judgment; the second half opens with "Comfort, yes, comfort My people" (40:1) and sustains that tone of redemptive hope through chapter 66. Isaiah holds both God's severity and His tenderness simultaneously — and refuses to let you separate them.`,
    devotional:`Isaiah 43:1 — "Fear not, for I have redeemed you; I have called you by your name; you are Mine." Notice the sequence: *I created you. I formed you. I redeemed you. I named you. You are Mine.*\n\nGod doesn't call you to belong to Him because you figured yourself out. He calls you by name first. Your identity isn't something you construct — it's something you receive.`,
    modern:`Isaiah writes into a culture that's falling apart. Political instability, corrupt leadership, people who call themselves God's people but act nothing like it. Sound familiar?\n\nChapter 40 alone is worth the entire book: the everlasting God neither faints nor grows weary. When everything around you is chaotic, Isaiah grabs you by the shoulders and says — *look at who you're dealing with.* That doesn't fix the chaos. But it changes how you stand in it.`
  },
  "Jeremiah": {
    tags:["Calling","Suffering","Faithfulness","Hope"],
    deepDive:`Jeremiah is called the "weeping prophet" — not because he was weak, but because he felt everything deeply and said it anyway. He preached for over 40 years with almost no visible results, watching his nation collapse around him. And yet he kept going.\n\nThe famous verse Jeremiah 29:11 is often quoted out of context — it was written to people in *exile*, not comfort. "Plans to prosper you" was a 70-year promise to a generation that would never see it fulfilled. That changes what trust actually looks like.`,
    devotional:`Jeremiah 29:13 — "And you will seek Me and find Me, when you search for Me with all your heart." This promise sits inside a letter written to exiles. To people who felt abandoned, displaced, far from home.\n\nThe promise isn't contingent on your circumstances being resolved. It's contingent on you seeking. In exile. In the waiting. In the season that looks nothing like what you hoped for — He is findable.`,
    modern:`Jeremiah is basically a prophet who went viral for all the wrong reasons. Nobody liked his message, his own family plotted against him, the king literally burned his scroll. But he wrote it again.\n\nHis story normalizes what it feels like to be called to something hard. Not every season of obedience feels successful. Sometimes faithfulness looks like writing the scroll again after someone destroys it.`
  },
  "John": {
    tags:["Love","Identity","Belief","Eternal Life"],
    deepDive:`John's gospel is distinct from the synoptics. Written last — likely in the 90s AD — John assumes his reader has some familiarity with the Jesus story and goes deeper. The prologue (1:1-18) echoes Genesis 1:1 intentionally: "In the beginning was the Word."\n\nSeven "I AM" statements form the spine of Jesus' self-revelation: bread of life, light of the world, door, good shepherd, resurrection and life, the way/truth/life, true vine. Each is a theological claim and a personal invitation simultaneously.`,
    devotional:`John 10:10 — "I have come that they may have life, and that they may have it more abundantly." That word *abundantly* — perissos in Greek — means exceeding, overflowing, beyond the expected measure.\n\nJesus isn't offering survival. He's not offering merely manageable. He's offering *abundance*. In seasons where you're just getting by, let that reframe what you're actually aiming for. You weren't made for barely enough.`,
    modern:`John writes like someone who spent decades thinking about one thing and finally sat down to explain it. He opens with the most cosmic claim possible — Jesus was there at creation, Jesus *is* God — and then spends the rest of the book showing that same cosmic Jesus at a wedding, crying at a tomb, making breakfast on a beach for exhausted fishermen.\n\nThe God of the universe noticed you were out of wine. He showed up to the grief and wept anyway. He's not distant. He's here.`
  },
  "Romans": {
    tags:["Grace","Faith","Freedom","Identity"],
    deepDive:`Romans is the most systematic theological letter in the New Testament. Paul writes to a church he hasn't founded yet, laying out his understanding of the gospel from first principles.\n\nChapters 1–3 establish the universal human problem: all have sinned. Chapters 4–5: justification by faith, not works. Chapters 6–8: what the transformed life looks like. Chapter 8 especially — "no condemnation," the Spirit, suffering, and the unbreakable love of God — is arguably the most important chapter in the entire Bible.`,
    devotional:`Romans 8:38-39 — "Neither death nor life, nor angels nor principalities nor powers, nor things present nor things to come, nor height nor depth, nor any other created thing, shall be able to separate us from the love of God which is in Christ Jesus our Lord."\n\nPaul doesn't say nothing will try. He says nothing will *succeed*. The things that feel like they're separating you from God — your failures, your doubts, your distance — none of them have the power they appear to have. You are held.`,
    modern:`Romans is Paul writing the thesis he never got to defend in person. His main argument: the only way to be right with God has nothing to do with how good you are. It's entirely based on trust.\n\nFor a generation evaluated constantly — GPA, followers, performance — Romans is genuinely countercultural. Your worth isn't a score. Your standing before God isn't a grade you maintain. It's a gift you receive. Chapter 8 reads like permission to finally exhale.`
  },
  "Ephesians": {
    tags:["Identity","Unity","Purpose","Spiritual Life"],
    deepDive:`Ephesians moves from cosmic truth (who you are in Christ) to practical instruction (how to live that out). Paul's central thesis: you were chosen before the foundation of the world, adopted, redeemed, sealed — and now you live *from* that reality, not *toward* it.\n\nThe famous "armor of God" passage (6:10-20) only makes sense in context of spiritual warfare that comes with standing in this identity. The armor isn't for attack — every piece is defensive. The posture is one of standing firm in what's already true.`,
    devotional:`Ephesians 2:10 — "For we are His workmanship, created in Christ Jesus for good works, which God prepared beforehand that we should walk in them." The Greek word for workmanship is *poiema* — from which we get "poem." You are God's poem. Not His rough draft. His crafted, intentional work.\n\nThe works were prepared *beforehand.* Your purpose isn't something you manufacture — it's something you step into. That changes the pressure significantly.`,
    modern:`If you've ever felt like you don't know who you are or what you're supposed to do, Ephesians is a direct answer. Paul spends three full chapters establishing *who you are* before he ever gets to what you should do. Identity before behavior. Belonging before performance.\n\nChapter 1 alone: chosen, adopted, redeemed, forgiven, sealed, purposeful. Paul wanted those words so internalized that how you live just naturally flows from them.`
  },
  "Philippians": {
    tags:["Joy","Contentment","Peace","Gratitude"],
    deepDive:`Philippians is Paul's most personally warm letter — written from prison, to a church that had repeatedly supported him. Despite its circumstances, it's the most joy-saturated letter in the New Testament.\n\nThe "Christ Hymn" in chapter 2 (vv. 5-11) is one of the earliest pieces of Christian poetry — describing Jesus' voluntary descent from glory into humanity. Scholars believe Paul is quoting an already-existing hymn, suggesting Christians were worshipping Jesus as divine within decades of His resurrection.`,
    devotional:`Philippians 4:6-7 — "Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God; and the peace of God, which surpasses all understanding, will guard your hearts and minds."\n\nThis isn't "don't feel anxious." Paul felt it too. It's a redirect: take what's making you anxious and *bring it.* The peace that follows isn't explained by circumstances changing. It surpasses understanding. It guards you before the situation resolves.`,
    modern:`Paul writes the most joyful letter in the Bible while under house arrest awaiting a verdict that could mean execution. He's not performing happiness — he says he *learned* contentment (4:11). It was a process, not a personality trait.\n\nFor anyone who'll be okay *once* [insert the thing] happens — Philippians is a challenge. Contentment isn't a destination after your circumstances improve. It's a practice you develop while they're still hard.`
  },
  "James": {
    tags:["Faith","Action","Wisdom","Community"],
    deepDive:`James is the most practical letter in the New Testament — and one of the earliest written, possibly before Paul's letters. James, the brother of Jesus, writes like someone who watched the faith community up close and had strong opinions about the gap between what people said and how they lived.\n\nHis famous line "faith without works is dead" isn't contradicting Paul on grace — it's addressing a different problem: people who claimed belief but showed no evidence of transformation. James is the book that asks: *okay, but what does it look like on a Tuesday?*`,
    devotional:`James 1:2-3 — "Count it all joy when you fall into various trials, knowing that the testing of your faith produces patience." That word *produces* matters. Trials aren't random inconveniences — they're the mechanism through which endurance is built.\n\nYou can't develop patience without something to be patient through. You can't develop resilience without resistance. James isn't minimizing the hard thing. He's reframing what it's doing in you.`,
    modern:`James is basically the friend who calls you on your stuff. The whole letter has this energy of — I love you too much to let you stay comfortable in the gap between what you believe and how you live.\n\nHe covers the tongue, favoritism, prayer, money, community — and in every section the question is the same: *is your faith actually showing up anywhere?* Not to earn anything. Just because real faith can't stay invisible.`
  },
  "Colossians": {
    tags:["Christ","Sufficiency","Freedom","New Life"],
    deepDive:`Colossians was written to a church being pulled toward religious add-ons — the idea that Jesus was good but not quite enough, that you needed additional rituals, philosophies, or spiritual experiences to complete your standing before God.\n\nPaul's response is one of the most concentrated declarations of Christ's supremacy in the entire Bible. Chapter 1:15-20 — the "Christ Hymn" — describes Jesus as the image of the invisible God, the firstborn over all creation, the one in whom all things hold together. The answer to every "but what about" is: Christ is enough.`,
    devotional:`Colossians 3:3 — "For you died, and your life is hidden with Christ in God." Hidden. Protected. Secured not by your performance but by your position. Your life — your real life, your eternal life — is kept somewhere no circumstance can reach it.\n\nOn days when everything feels unstable, this is the anchor. What's most true about you is hidden in the safest place in the universe.`,
    modern:`Colossians was written for people who kept getting told Jesus plus something else equals enough. The Colossian church had people adding philosophy, dietary rules, angel worship, spiritual experiences — always one more thing to complete what Christ supposedly left incomplete.\n\nPaul's response cuts through all of it: He is before all things, and in Him all things consist. That's not a small claim. Everything holds together in Jesus. You don't need a supplement to something that's already whole.`
  },
};

// ─── VOTD ─────────────────────────────────────────────────────────────────────
const VOTD_LIST = [
  { ref:"Jeremiah 29:11", bookId:24, ch:29, v:11 },
  { ref:"Romans 8:28",    bookId:45, ch:8,  v:28 },
  { ref:"Psalm 46:10",    bookId:19, ch:46, v:10 },
  { ref:"Isaiah 40:31",   bookId:23, ch:40, v:31 },
  { ref:"John 10:10",     bookId:43, ch:10, v:10 },
  { ref:"Philippians 4:7",bookId:50, ch:4,  v:7  },
  { ref:"Psalm 23:1",     bookId:19, ch:23, v:1  },
];
const todayVotd = VOTD_LIST[new Date().getDay() % VOTD_LIST.length];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function stripHtml(html) {
  return (html||"").replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").trim();
}
async function fetchChapter(bookId, chapter) {
  const res = await fetch(`/api/bible?book=${bookId}&chapter=${chapter}`);
  if (!res.ok) throw new Error("fetch failed");
  return res.json();
}
async function fetchVerse(bookId, chapter, verse) {
  const res = await fetch(`/api/bible?book=${bookId}&chapter=${chapter}&verse=${verse}`);
  if (!res.ok) throw new Error("fetch failed");
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}
function useStorage(key, def) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : def; }
    catch { return def; }
  });
  const set = (v) => {
    const next = typeof v === "function" ? v(val) : v;
    setVal(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  };
  return [val, set];
}

// ─── GINGHAM ──────────────────────────────────────────────────────────────────
function Gingham({ dark }) {
  const c = dark ? DARK : LIGHT;
  return (
    <svg style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0,opacity:dark?0.5:0.6}}>
      <defs>
        <pattern id="g" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <rect width="32" height="32" fill="none"/>
          <rect x="0" y="0" width="16" height="16" fill={c.grid}/>
          <rect x="16" y="16" width="16" height="16" fill={c.grid}/>
          <line x1="0" y1="0" x2="32" y2="0" stroke={c.grid} strokeWidth="0.5"/>
          <line x1="0" y1="16" x2="32" y2="16" stroke={c.grid} strokeWidth="0.5"/>
          <line x1="0" y1="32" x2="32" y2="32" stroke={c.grid} strokeWidth="0.5"/>
          <line x1="0" y1="0" x2="0" y2="32" stroke={c.grid} strokeWidth="0.5"/>
          <line x1="16" y1="0" x2="16" y2="32" stroke={c.grid} strokeWidth="0.5"/>
          <line x1="32" y1="0" x2="32" y2="32" stroke={c.grid} strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>
  );
}

function Heart({ size=18, color, style={} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{display:"inline-block",verticalAlign:"middle",...style}}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useStorage("dark", false);
  const [page, setPage] = useState("home");
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [readingTab, setReadingTab] = useState("read");
  const [verses, setVerses] = useState([]);
  const [loadingVerses, setLoadingVerses] = useState(false);
  const [verseError, setVerseError] = useState(false);
  const [votdVerse, setVotdVerse] = useState(null);
  const [testament, setTestament] = useState("NT");
  const [searchQ, setSearchQ] = useState("");

  // Persistent state
  const [notes, setNotes] = useStorage("notes_v2", {});
  const [bookmarks, setBookmarks] = useStorage("bookmarks_v2", []);
  const [highlights, setHighlights] = useStorage("highlights_v2", {});
  const [planProgress, setPlanProgress] = useStorage("plan_progress", {});
  const [activePlan, setActivePlan] = useStorage("active_plan", null);
  const [streak, setStreak] = useStorage("streak", { count:0, lastDate:"" });
  const [journal, setJournal] = useStorage("journal_v2", []);

  const [noteInput, setNoteInput] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const [journalInput, setJournalInput] = useState("");
  const [journalMood, setJournalMood] = useState("grateful");
  const [journalSaved, setJournalSaved] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [notifGranted, setNotifGranted] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [mounted, setMounted] = useState(false);

  const c = dark ? DARK : LIGHT;

  useEffect(() => {
    setMounted(true);
    // Update streak
    const today = new Date().toDateString();
    if (streak.lastDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newCount = streak.lastDate === yesterday ? streak.count + 1 : 1;
      setStreak({ count: newCount, lastDate: today });
    }
    // Check notification permission
    if ("Notification" in window) {
      setNotifGranted(Notification.permission === "granted");
    }
  }, []);

  // Fetch VOTD
  useEffect(() => {
    fetchVerse(todayVotd.bookId, todayVotd.ch, todayVotd.v)
      .then(v => setVotdVerse(v)).catch(() => {});
  }, []);

  // Fetch chapter
  useEffect(() => {
    if (page !== "reading" || !selectedBook) return;
    setLoadingVerses(true); setVerseError(false); setVerses([]);
    fetchChapter(selectedBook.id, selectedChapter)
      .then(d => { setVerses(d); setLoadingVerses(false); })
      .catch(() => { setVerseError(true); setLoadingVerses(false); });
  }, [page, selectedBook, selectedChapter]);

  // Sync note input
  const noteKey = selectedBook ? `${selectedBook.name}-${selectedChapter}` : null;
  useEffect(() => {
    if (!noteKey) return;
    setNoteInput(notes[noteKey] || ""); setNoteSaved(false);
  }, [noteKey]);

  const saveNote = () => {
    if (!noteKey) return;
    setNotes(p => ({ ...p, [noteKey]: noteInput }));
    setNoteSaved(true); setTimeout(() => setNoteSaved(false), 2000);
  };

  const openBook = (book, ch=1) => {
    setSelectedBook(book); setSelectedChapter(ch);
    setReadingTab("read"); setPage("reading");
  };

  const toggleBookmark = (bookName, chapter, verse, text) => {
    const id = `${bookName}-${chapter}-${verse}`;
    setBookmarks(prev => {
      const exists = prev.find(b => b.id === id);
      if (exists) return prev.filter(b => b.id !== id);
      return [...prev, { id, bookName, chapter, verse, text: stripHtml(text), date: new Date().toLocaleDateString() }];
    });
  };

  const isBookmarked = (bookName, chapter, verse) =>
    bookmarks.some(b => b.id === `${bookName}-${chapter}-${verse}`);

  const toggleHighlight = (bookName, chapter, verse) => {
    const key = `${bookName}-${chapter}-${verse}`;
    setHighlights(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isHighlighted = (bookName, chapter, verse) =>
    highlights[`${bookName}-${chapter}-${verse}`];

  const markPlanDay = (planId, day) => {
    setPlanProgress(prev => {
      const current = prev[planId] || [];
      const updated = current.includes(day)
        ? current.filter(d => d !== day)
        : [...current, day];
      return { ...prev, [planId]: updated };
    });
  };

  const requestNotifications = async () => {
    if (!("Notification" in window)) return;
    const perm = await Notification.requestPermission();
    setNotifGranted(perm === "granted");
    if (perm === "granted") {
      new Notification("kept. graced. blessed. 🤍", {
        body: "Daily verse notifications are on! See you tomorrow morning.",
        icon: "/apple-touch-icon.png"
      });
    }
  };

  const contentData = selectedBook ? CONTENT[selectedBook.name] : null;

  // ── STYLES ──────────────────────────────────────────────────────────────────
  const fadeIn = mounted ? { opacity:1, transform:"translateY(0)" } : { opacity:0, transform:"translateY(12px)" };
  const S = {
    app: { minHeight:"100vh", background:c.bg, color:c.text,
      fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif",
      position:"relative", overflowX:"hidden", WebkitFontSmoothing:"antialiased",
      transition:"background 0.3s, color 0.3s" },
    z: { position:"relative", zIndex:1 },
    header: {
      background: dark ? `${c.surface}ee` : `#fff8fae0`,
      borderBottom:`2px solid ${c.border}`,
      position:"sticky", top:0, zIndex:100,
      backdropFilter:"blur(14px)",
      boxShadow: dark ? `0 2px 20px rgba(0,0,0,0.4)` : `0 2px 20px rgba(120,19,35,0.08)`,
    },
    headerInner: { maxWidth:480, margin:"0 auto", padding:"13px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" },
    title: {
      fontFamily:"'Palatino Linotype',Palatino,serif",
      fontSize:17, fontWeight:"bold",
      background:`linear-gradient(135deg,${c.cherry},${c.pink2})`,
      WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
    },
    darkBtn: { background:dark?c.card:c.surface, border:`1.5px solid ${c.border}`, borderRadius:20, padding:"5px 11px", cursor:"pointer", fontSize:13, display:"flex", alignItems:"center", gap:5, color:c.textMid, transition:"all 0.2s" },
    main: { maxWidth:480, margin:"0 auto", paddingBottom:100 },
    // cards
    card: { margin:"8px 14px", background:c.card, border:`1.5px solid ${c.border}`, borderRadius:16, padding:"18px 18px", boxShadow:dark?`0 2px 12px rgba(0,0,0,0.25)`:`0 2px 14px rgba(120,19,35,0.06)`, transition:"all 0.2s cubic-bezier(0.34,1.56,0.64,1)" },
    votdCard: { margin:"16px 14px", background:dark?`linear-gradient(135deg,${c.card},${c.surface})`:`linear-gradient(135deg,#fff5f7,#fde8f0)`, border:`2px solid ${c.border}`, borderRadius:20, padding:"22px 20px", position:"relative", overflow:"hidden", boxShadow:dark?`0 6px 28px rgba(0,0,0,0.3)`:`0 6px 28px rgba(120,19,35,0.09)` },
    label: { fontSize:10, letterSpacing:"0.17em", textTransform:"uppercase", color:c.pink2, marginBottom:10, display:"flex", alignItems:"center", gap:6 },
    sectionLabel: { fontSize:10, letterSpacing:"0.17em", textTransform:"uppercase", color:c.textLight, padding:"16px 18px 6px" },
    bookTitle: { fontSize:26, fontWeight:"bold", color:c.text, lineHeight:1.2, marginBottom:6 },
    tabBar: { display:"flex", gap:0, margin:"14px 14px 0", background:c.surface, borderRadius:12, padding:3, border:`1.5px solid ${c.border}`, overflowX:"auto" },
    tab: (a) => ({ flex:1, padding:"8px 6px", borderRadius:9, border:"none", cursor:"pointer", fontSize:11, letterSpacing:"0.02em", whiteSpace:"nowrap", fontFamily:"Georgia,serif", transition:"all 0.18s", background:a?c.cherry:"transparent", color:a?"#fff":c.textLight, fontWeight:a?"bold":"normal" }),
    contentBox: { margin:"12px 14px 0", background:c.card, border:`1.5px solid ${c.border}`, borderRadius:14, padding:"20px 18px", boxShadow:dark?`0 2px 14px rgba(0,0,0,0.2)`:`0 2px 14px rgba(120,19,35,0.05)` },
    contentLabel: { fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:c.pink2, marginBottom:12 },
    contentBody: { fontSize:15, lineHeight:1.88, color:c.textMid, whiteSpace:"pre-line" },
    chGrid: { display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:6 },
    chBtn: (a) => ({ padding:"9px 0", borderRadius:8, border:`1.5px solid ${a?c.cherry:c.border}`, background:a?c.cherry:c.card, color:a?"#fff":c.textMid, fontSize:12, cursor:"pointer", fontFamily:"Georgia,serif", transition:"all 0.13s", fontWeight:a?"bold":"normal" }),
    pill: { display:"inline-block", background:dark?c.surface:"#fde4ec", border:`1px solid ${c.border}`, borderRadius:20, padding:"2px 9px", fontSize:10, color:c.accent, margin:"2px 2px 0 0" },
    verseRow: { display:"flex", alignItems:"flex-start", gap:10, marginBottom:10, paddingBottom:10, borderBottom:`1px solid ${c.border}`, borderRadius:8, padding:"8px 6px", transition:"background 0.15s" },
    verseNum: { fontSize:10, color:c.pink2, fontWeight:"bold", minWidth:18, paddingTop:3 },
    noteArea: { width:"100%", minHeight:130, background:dark?c.surface:"#fffbfc", border:`1.5px solid ${c.border}`, borderRadius:10, padding:"12px 14px", fontSize:14, fontFamily:"'Palatino Linotype',Georgia,serif", color:c.text, lineHeight:1.75, resize:"vertical", outline:"none", boxSizing:"border-box", marginTop:10 },
    cherryBtn: { padding:"10px 20px", background:c.cherry, color:"#fff", border:"none", borderRadius:10, cursor:"pointer", fontSize:13, fontFamily:"Georgia,serif", letterSpacing:"0.03em", transition:"all 0.15s" },
    outlineBtn: { padding:"9px 16px", background:"transparent", color:c.cherry, border:`1.5px solid ${c.cherry}`, borderRadius:10, cursor:"pointer", fontSize:12, fontFamily:"Georgia,serif", transition:"all 0.15s" },
    nav: { position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:dark?`${c.surface}f2`:`#fff5f7f5`, borderTop:`2px solid ${c.border}`, display:"flex", justifyContent:"space-around", padding:"8px 0 max(8px,env(safe-area-inset-bottom))", zIndex:200, backdropFilter:"blur(14px)" },
    navBtn: (a) => ({ display:"flex", flexDirection:"column", alignItems:"center", gap:2, background:"none", border:"none", cursor:"pointer", padding:"4px 10px", color:a?c.cherry:c.textLight, fontSize:9, letterSpacing:"0.06em", fontFamily:"Georgia,serif", transition:"color 0.14s" }),
    streakBadge: { display:"inline-flex", alignItems:"center", gap:5, background:dark?c.surface:"#fff0ec", border:`1.5px solid ${dark?c.border:"#f0c8c0"}`, borderRadius:20, padding:"5px 12px", fontSize:12, color:dark?"#f4b8c8":"#a03020", fontFamily:"Georgia,serif" },
  };

  // ── HOME ────────────────────────────────────────────────────────────────────
  const renderHome = () => (
    <div style={{ ...fadeIn, transition:"opacity 0.4s, transform 0.4s" }}>
      <div style={{ padding:"24px 18px 6px", textAlign:"center" }}>
        <Heart size={28} color={dark?"rgba(255,255,255,0.75)":"rgba(255,255,255,0.9)"} />
        <div style={{ ...S.bookTitle, textAlign:"center", marginTop:8, fontSize:23 }}>kept. graced. blessed.</div>
        <div style={{ fontSize:12, color:c.textLight, fontStyle:"italic", marginTop:3 }}>Your space to read, reflect & grow</div>
        <div style={{ display:"flex", justifyContent:"center", marginTop:12 }}>
          <div style={S.streakBadge}>🔥 {streak.count} day{streak.count !== 1 ? "s" : ""} streak</div>
        </div>
      </div>

      {/* VOTD */}
      <div style={S.votdCard}>
        <div style={{ position:"absolute", top:14, right:16, opacity:0.1 }}><Heart size={44} color={c.cherry}/></div>
        <div style={S.label}><Heart size={12} color={c.pink2}/> Verse of the Day</div>
        {votdVerse
          ? <><div style={{ fontSize:17, lineHeight:1.75, color:c.text, fontStyle:"italic", marginBottom:8 }}>"{stripHtml(votdVerse.text)}"</div><div style={{ fontSize:13, color:c.cherry, fontWeight:"bold" }}>— {todayVotd.ref} · NKJV</div></>
          : <div style={{ color:c.textLight, fontStyle:"italic", fontSize:14 }}>Loading…</div>
        }
      </div>

      {/* Active plan */}
      {activePlan && (() => {
        const plan = READING_PLANS.find(p => p.id === activePlan);
        const done = (planProgress[activePlan] || []).length;
        const pct = Math.round((done / plan.days.length) * 100);
        return (
          <div style={{ ...S.card, cursor:"pointer" }} onClick={() => { setSelectedPlan(plan); setPage("plan"); }}>
            <div style={S.contentLabel}>📖 Active Reading Plan</div>
            <div style={{ fontSize:16, fontWeight:"bold", color:c.text, marginBottom:6 }}>{plan.name}</div>
            <div style={{ background:c.surface, borderRadius:20, height:8, overflow:"hidden", marginBottom:6 }}>
              <div style={{ background:`linear-gradient(90deg,${c.cherry},${c.pink2})`, height:"100%", width:`${pct}%`, borderRadius:20, transition:"width 0.4s" }}/>
            </div>
            <div style={{ fontSize:12, color:c.textLight }}>{done}/{plan.days.length} days · {pct}% complete</div>
          </div>
        );
      })()}

      {/* Quick start books */}
      <div style={S.sectionLabel}>♡ Start Reading</div>
      {["John","Romans","Psalms","Philippians","Ephesians"].map(name => {
        const b = BOOKS.find(x => x.name === name);
        return (
          <div key={name} style={{ ...S.card, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between" }}
            onClick={() => openBook(b)}
            onMouseEnter={e => { e.currentTarget.style.transform="scale(1.01)"; e.currentTarget.style.boxShadow=`0 8px 28px rgba(120,19,35,0.14)`; }}
            onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow=dark?`0 2px 12px rgba(0,0,0,0.25)`:`0 2px 14px rgba(120,19,35,0.06)`; }}
          >
            <div>
              <div style={{ fontSize:17, fontWeight:"bold", color:c.text, marginBottom:3 }}>{name}</div>
              <div style={{ fontSize:11, color:c.textLight, marginBottom:5 }}>{b.chapters} chapters · NKJV</div>
              {CONTENT[name]?.tags.map(t => <span key={t} style={S.pill}>{t}</span>)}
            </div>
            <div style={{ fontSize:20, color:c.pink1 }}>›</div>
          </div>
        );
      })}
      <div style={{ ...S.sectionLabel, cursor:"pointer" }} onClick={() => setPage("library")}>♡ Full Bible <span style={{ color:c.cherry }}>→</span></div>
    </div>
  );

  // ── LIBRARY ─────────────────────────────────────────────────────────────────
  const renderLibrary = () => {
    const filtered = BOOKS.filter(b => b.testament === testament && b.name.toLowerCase().includes(searchQ.toLowerCase()));
    return (
      <div>
        <div style={{ padding:"20px 18px 8px" }}>
          <div style={{ ...S.bookTitle, fontSize:22 }}>Full Bible · NKJV</div>
          <input style={{ width:"100%", marginTop:10, padding:"10px 14px", borderRadius:10, border:`1.5px solid ${c.border}`, background:c.surface, color:c.text, fontSize:14, fontFamily:"Georgia,serif", outline:"none", boxSizing:"border-box" }} placeholder="Search books…" value={searchQ} onChange={e => setSearchQ(e.target.value)}/>
          <div style={{ display:"flex", gap:8, marginTop:10 }}>
            {["OT","NT"].map(t => (
              <button key={t} onClick={() => setTestament(t)} style={{ flex:1, padding:"9px", borderRadius:10, border:`1.5px solid ${testament===t?c.cherry:c.border}`, background:testament===t?c.cherry:c.card, color:testament===t?"#fff":c.textMid, cursor:"pointer", fontSize:12, fontFamily:"Georgia,serif", transition:"all 0.15s" }}>
                {t==="OT"?"Old Testament":"New Testament"}
              </button>
            ))}
          </div>
        </div>
        {filtered.map(b => (
          <div key={b.id} style={{ ...S.card, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between" }}
            onClick={() => openBook(b)}
            onMouseEnter={e => e.currentTarget.style.transform="scale(1.01)"}
            onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
          >
            <div>
              <div style={{ fontSize:17, fontWeight:"bold", color:c.text, marginBottom:3 }}>{b.name}</div>
              <div style={{ fontSize:11, color:c.pink2 }}>{b.chapters} chapters</div>
              {CONTENT[b.name]?.tags.map(t => <span key={t} style={S.pill}>{t}</span>)}
            </div>
            <div style={{ fontSize:20, color:c.pink1 }}>›</div>
          </div>
        ))}
      </div>
    );
  };

  // ── READING ──────────────────────────────────────────────────────────────────
  const renderReading = () => {
    if (!selectedBook) return null;
    const hasCnt = !!contentData;
    const tabs = hasCnt ? ["Read","Deep Dive","Devotional","Modern","Notes"] : ["Read","Notes"];
    return (
      <div>
        <div style={{ padding:"16px 18px 0" }}>
          <button style={{ background:"none", border:"none", cursor:"pointer", color:c.cherry, fontSize:13, display:"flex", alignItems:"center", gap:4, padding:"4px 0", fontFamily:"Georgia,serif" }} onClick={() => setPage("library")}>← Back</button>
          <div style={S.bookTitle}>{selectedBook.name}</div>
          <div style={{ fontSize:11, color:c.textLight, fontStyle:"italic" }}>New King James Version</div>
        </div>

        {/* Chapter paginator — Google-style */}
        {(() => {
          const total = selectedBook.chapters;
          const cur = selectedChapter;
          const getPages = () => {
            if (total <= 7) return Array.from({length:total},(_,i)=>i+1);
            const pages = [];
            pages.push(1);
            if (cur > 4) pages.push("…");
            const start = Math.max(2, cur - 2);
            const end   = Math.min(total - 1, cur + 2);
            for (let i = start; i <= end; i++) pages.push(i);
            if (cur < total - 3) pages.push("…");
            if (total > 1) pages.push(total);
            return pages;
          };
          const pBtnBase = { minWidth:34, height:34, borderRadius:8, border:`1.5px solid ${c.border}`, background:c.card, color:c.textMid, cursor:"pointer", fontSize:13, fontFamily:"Georgia,serif", transition:"all 0.13s", display:"flex", alignItems:"center", justifyContent:"center" };
          return (
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4, padding:"14px 18px 0", flexWrap:"wrap" }}>
              {/* Prev */}
              <button disabled={cur===1} onClick={() => { setSelectedChapter(cur-1); setReadingTab("read"); window.scrollTo(0,0); }}
                style={{ ...pBtnBase, opacity:cur===1?0.35:1, fontSize:16, paddingBottom:1 }}>‹</button>
              {getPages().map((p, i) =>
                p === "…"
                  ? <span key={`ellipsis-${i}`} style={{ color:c.textLight, fontSize:13, padding:"0 2px" }}>…</span>
                  : <button key={p} onClick={() => { setSelectedChapter(p); setReadingTab("read"); window.scrollTo(0,0); }}
                      style={{ ...pBtnBase, background:cur===p?c.cherry:c.card, color:cur===p?"#fff":c.textMid, border:`1.5px solid ${cur===p?c.cherry:c.border}`, fontWeight:cur===p?"bold":"normal" }}>{p}</button>
              )}
              {/* Next */}
              <button disabled={cur===total} onClick={() => { setSelectedChapter(cur+1); setReadingTab("read"); window.scrollTo(0,0); }}
                style={{ ...pBtnBase, opacity:cur===total?0.35:1, fontSize:16, paddingBottom:1 }}>›</button>
            </div>
          );
        })()}

        <div style={S.tabBar}>
          {tabs.map(t => <button key={t} style={S.tab(readingTab===t.toLowerCase())} onClick={() => setReadingTab(t.toLowerCase())}>{t}</button>)}
        </div>

        {/* READ */}
        {readingTab==="read" && (
          <div style={S.contentBox}>
            <div style={{ ...S.contentLabel, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span><Heart size={11} color={c.pink2}/> {selectedBook.name} {selectedChapter} · NKJV</span>
              <span style={{ fontSize:10, color:c.textLight }}>tap verse to bookmark ♡</span>
            </div>
            {loadingVerses && <div style={{ textAlign:"center", padding:"30px 0", color:c.textLight, fontStyle:"italic" }}>Loading scripture…</div>}
            {verseError && <div style={{ textAlign:"center", padding:"28px 0", color:c.textLight, fontStyle:"italic" }}>Couldn't load. Check your connection.</div>}
            {!loadingVerses && !verseError && verses.map(v => {
              const bkd = isBookmarked(selectedBook.name, selectedChapter, v.verse);
              const hld = isHighlighted(selectedBook.name, selectedChapter, v.verse);
              return (
                <div key={v.verse} style={{ ...S.verseRow, background:hld?c.highlight:"transparent", borderRadius:8 }}>
                  <span style={S.verseNum}>{v.verse}</span>
                  <span style={{ flex:1, fontSize:16, lineHeight:1.85, color:c.text }}>{stripHtml(v.text)}</span>
                  <div style={{ display:"flex", flexDirection:"column", gap:4, marginLeft:4 }}>
                    <button onClick={() => toggleBookmark(selectedBook.name, selectedChapter, v.verse, v.text)}
                      style={{ background:"none", border:"none", cursor:"pointer", padding:2, fontSize:14 }} title="Bookmark">
                      {bkd ? "🔖" : "🏷️"}
                    </button>
                    <button onClick={() => toggleHighlight(selectedBook.name, selectedChapter, v.verse)}
                      style={{ background:"none", border:"none", cursor:"pointer", padding:2, fontSize:13 }} title="Highlight">
                      {hld ? "✦" : "✧"}
                    </button>
                  </div>
                </div>
              );
            })}
            {/* Next / Prev chapter navigation at bottom of reading */}
            {!loadingVerses && !verseError && verses.length > 0 && (
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:20, paddingTop:16, borderTop:`1px solid ${c.border}` }}>
                <button
                  disabled={selectedChapter === 1}
                  onClick={() => { setSelectedChapter(ch => ch - 1); window.scrollTo(0,0); }}
                  style={{ padding:"10px 18px", borderRadius:10, border:`1.5px solid ${c.border}`, background:c.surface, color:selectedChapter===1?c.textLight:c.cherry, cursor:selectedChapter===1?"default":"pointer", fontSize:13, fontFamily:"Georgia,serif", opacity:selectedChapter===1?0.4:1, transition:"all 0.15s" }}>
                  ← Ch. {selectedChapter - 1}
                </button>
                <span style={{ fontSize:11, color:c.textLight, fontStyle:"italic" }}>
                  {selectedBook.name} {selectedChapter}
                </span>
                <button
                  disabled={selectedChapter === selectedBook.chapters}
                  onClick={() => { setSelectedChapter(ch => ch + 1); window.scrollTo(0,0); }}
                  style={{ padding:"10px 18px", borderRadius:10, border:`1.5px solid ${selectedChapter===selectedBook.chapters?c.border:c.cherry}`, background:selectedChapter===selectedBook.chapters?c.surface:c.cherry, color:selectedChapter===selectedBook.chapters?c.textLight:"#fff", cursor:selectedChapter===selectedBook.chapters?"default":"pointer", fontSize:13, fontFamily:"Georgia,serif", opacity:selectedChapter===selectedBook.chapters?0.4:1, transition:"all 0.15s" }}>
                  Ch. {selectedChapter + 1} →
                </button>
              </div>
            )}
          </div>
        )}

        {readingTab==="deep dive" && contentData && (
          <div style={S.contentBox}><div style={S.contentLabel}>📖 Deep Dive</div><div style={S.contentBody}>{contentData.deepDive}</div></div>
        )}
        {readingTab==="devotional" && contentData && (
          <div style={S.contentBox}><div style={S.contentLabel}>🙏 Devotional</div><div style={S.contentBody}>{contentData.devotional}</div></div>
        )}
        {readingTab==="modern" && contentData && (
          <div style={S.contentBox}><div style={S.contentLabel}>✨ Modern Retelling</div><div style={S.contentBody}>{contentData.modern}</div></div>
        )}
        {readingTab==="notes" && (
          <div style={S.contentBox}>
            <div style={S.contentLabel}><Heart size={11} color={c.pink2}/> My Notes · {selectedBook.name} {selectedChapter}</div>
            <textarea style={S.noteArea} placeholder={`What is God speaking to you through ${selectedBook.name} ${selectedChapter}? Write freely…`} value={noteInput} onChange={e => setNoteInput(e.target.value)}/>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:10 }}>
              <button style={S.cherryBtn} onClick={saveNote}>Save Note</button>
              {noteSaved && <span style={{ fontSize:13, color:c.pink2, fontStyle:"italic" }}>✓ Saved</span>}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── TODAY ────────────────────────────────────────────────────────────────────
  const renderToday = () => (
    <div>
      <div style={{ padding:"22px 18px 8px" }}>
        <div style={{ ...S.bookTitle, fontSize:22 }}>Today</div>
        <div style={{ fontSize:12, color:c.textLight, fontStyle:"italic" }}>A word for you, right now</div>
      </div>
      <div style={S.votdCard}>
        <div style={{ position:"absolute", top:14, right:16, opacity:0.1 }}><Heart size={44} color={c.cherry}/></div>
        <div style={S.label}><Heart size={12} color={c.pink2}/> Verse of the Day</div>
        {votdVerse
          ? <><div style={{ fontSize:17, lineHeight:1.75, color:c.text, fontStyle:"italic", marginBottom:8 }}>"{stripHtml(votdVerse.text)}"</div><div style={{ fontSize:13, color:c.cherry, fontWeight:"bold" }}>— {todayVotd.ref} · NKJV</div></>
          : <div style={{ color:c.textLight, fontStyle:"italic" }}>Loading…</div>
        }
      </div>
      {/* Notifications */}
      <div style={{ ...S.card }}>
        <div style={S.contentLabel}>🔔 Daily Reminders</div>
        {notifGranted
          ? <div style={{ fontSize:14, color:c.pink2, fontStyle:"italic" }}>✓ Daily verse notifications are on</div>
          : <><div style={{ fontSize:14, color:c.textMid, lineHeight:1.7, marginBottom:12 }}>Get your verse of the day delivered as a notification every morning.</div>
              <button style={S.cherryBtn} onClick={requestNotifications}>Turn On Notifications</button></>
        }
      </div>
      {/* Streak */}
      <div style={{ ...S.card }}>
        <div style={S.contentLabel}>🔥 Reading Streak</div>
        <div style={{ fontSize:32, fontWeight:"bold", color:c.cherry, marginBottom:4 }}>{streak.count}</div>
        <div style={{ fontSize:13, color:c.textLight }}>day{streak.count !== 1 ? "s" : ""} in a row · keep going 🤍</div>
      </div>
    </div>
  );

  // ── PLANS ────────────────────────────────────────────────────────────────────
  const renderPlans = () => {
    if (selectedPlan) {
      const progress = planProgress[selectedPlan.id] || [];
      return (
        <div>
          <div style={{ padding:"16px 18px 0" }}>
            <button style={{ background:"none", border:"none", cursor:"pointer", color:c.cherry, fontSize:13, display:"flex", alignItems:"center", gap:4, padding:"4px 0", fontFamily:"Georgia,serif" }} onClick={() => setSelectedPlan(null)}>← Plans</button>
            <div style={{ ...S.bookTitle, fontSize:22, marginTop:6 }}>{selectedPlan.name}</div>
            <div style={{ fontSize:13, color:c.textLight, fontStyle:"italic", lineHeight:1.6 }}>{selectedPlan.description}</div>
            <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
              <button style={S.cherryBtn} onClick={() => { setActivePlan(selectedPlan.id); }}>
                {activePlan === selectedPlan.id ? "✓ Active Plan" : "Set as Active Plan"}
              </button>
              <button style={S.outlineBtn} onClick={() => { setPlanProgress(p => ({ ...p, [selectedPlan.id]: [] })); }}>Reset</button>
            </div>
          </div>
          {selectedPlan.days.map(day => {
            const done = progress.includes(day.day);
            const book = BOOKS.find(b => b.id === day.bookId);
            return (
              <div key={day.day} style={{ ...S.card, display:"flex", alignItems:"center", gap:12, opacity:done?0.7:1 }}>
                <button onClick={() => markPlanDay(selectedPlan.id, day.day)}
                  style={{ width:28, height:28, borderRadius:"50%", border:`2px solid ${done?c.cherry:c.border}`, background:done?c.cherry:"transparent", cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13 }}>
                  {done ? "✓" : ""}
                </button>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:11, color:c.textLight, marginBottom:2 }}>Day {day.day}</div>
                  <div style={{ fontSize:15, fontWeight:"bold", color:c.text }}>{day.ref}</div>
                  <div style={{ fontSize:12, color:c.textLight, fontStyle:"italic" }}>{day.title}</div>
                </div>
                {book && <button style={S.outlineBtn} onClick={() => openBook(book, day.chapter)}>Read →</button>}
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <div>
        <div style={{ padding:"20px 18px 8px" }}>
          <div style={{ ...S.bookTitle, fontSize:22 }}>Reading Plans</div>
          <div style={{ fontSize:13, color:c.textLight, fontStyle:"italic" }}>Guided journeys through Scripture</div>
        </div>
        {READING_PLANS.map(plan => {
          const done = (planProgress[plan.id] || []).length;
          const pct = Math.round((done / plan.days.length) * 100);
          return (
            <div key={plan.id} style={{ ...S.card, cursor:"pointer" }}
              onClick={() => setSelectedPlan(plan)}
              onMouseEnter={e => e.currentTarget.style.transform="scale(1.01)"}
              onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
            >
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                <div style={{ fontSize:17, fontWeight:"bold", color:c.text }}>{plan.name}</div>
                <span style={{ ...S.pill, background:activePlan===plan.id?c.cherry:"transparent", color:activePlan===plan.id?"#fff":c.accent, border:`1px solid ${activePlan===plan.id?c.cherry:c.border}` }}>{activePlan===plan.id?"Active":plan.duration}</span>
              </div>
              <div style={{ fontSize:13, color:c.textLight, lineHeight:1.6, marginBottom:10 }}>{plan.description}</div>
              <div style={{ background:c.surface, borderRadius:20, height:6, overflow:"hidden" }}>
                <div style={{ background:`linear-gradient(90deg,${c.cherry},${c.pink2})`, height:"100%", width:`${pct}%`, borderRadius:20, transition:"width 0.4s" }}/>
              </div>
              <div style={{ fontSize:11, color:c.textLight, marginTop:5 }}>{done}/{plan.days.length} days · {pct}%</div>
            </div>
          );
        })}
      </div>
    );
  };

  // ── JOURNAL ──────────────────────────────────────────────────────────────────
  const MOODS = ["grateful","hopeful","struggling","peaceful","seeking","joyful","uncertain"];
  const renderJournal = () => (
    <div>
      <div style={{ padding:"20px 18px 8px" }}>
        <div style={{ ...S.bookTitle, fontSize:22 }}>Prayer Journal</div>
        <div style={{ fontSize:13, color:c.textLight, fontStyle:"italic" }}>Your honest conversation with God</div>
      </div>
      {/* New entry */}
      <div style={S.contentBox}>
        <div style={S.contentLabel}>✦ New Entry</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
          {MOODS.map(m => (
            <button key={m} onClick={() => setJournalMood(m)}
              style={{ padding:"5px 12px", borderRadius:20, border:`1.5px solid ${journalMood===m?c.cherry:c.border}`, background:journalMood===m?c.cherry:"transparent", color:journalMood===m?"#fff":c.textMid, cursor:"pointer", fontSize:11, fontFamily:"Georgia,serif", transition:"all 0.15s" }}>
              {m}
            </button>
          ))}
        </div>
        <textarea style={S.noteArea} placeholder="Write your prayer, reflection, or whatever's on your heart…" value={journalInput} onChange={e => setJournalInput(e.target.value)}/>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:10 }}>
          <button style={S.cherryBtn} onClick={() => {
            if (!journalInput.trim()) return;
            setJournal(prev => [{ id:Date.now(), text:journalInput, mood:journalMood, date:new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}) }, ...prev]);
            setJournalInput(""); setJournalSaved(true);
            setTimeout(() => setJournalSaved(false), 2000);
          }}>Save Entry</button>
          {journalSaved && <span style={{ fontSize:13, color:c.pink2, fontStyle:"italic" }}>✓ Saved</span>}
        </div>
      </div>
      {/* Past entries */}
      {journal.length > 0 && <div style={S.sectionLabel}>♡ Past Entries</div>}
      {journal.map(entry => (
        <div key={entry.id} style={{ ...S.card, position:"relative" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <span style={{ ...S.pill, background:dark?c.surface:"#fde4ec" }}>{entry.mood}</span>
            <span style={{ fontSize:11, color:c.textLight }}>{entry.date}</span>
          </div>
          <div style={{ fontSize:14, lineHeight:1.8, color:c.textMid, fontStyle:"italic" }}>{entry.text}</div>
          <button onClick={() => setJournal(prev => prev.filter(e => e.id !== entry.id))}
            style={{ position:"absolute", top:12, right:12, background:"none", border:"none", cursor:"pointer", fontSize:14, color:c.textLight }}>×</button>
        </div>
      ))}
      {/* Scripture Notes section */}
      {Object.entries(notes).filter(([,v]) => v.trim()).length > 0 && (
        <>
          <div style={{ ...S.sectionLabel, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <span>📖 Scripture Notes</span>
          </div>
          {Object.entries(notes).filter(([,v]) => v.trim()).map(([key, note]) => {
            const parts = key.split("-");
            const ch = parseInt(parts.pop());
            const bookName = parts.join("-");
            const book = BOOKS.find(b => b.name === bookName);
            return (
              <div key={key} style={{ ...S.card, position:"relative" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <span style={{ fontSize:13, color:c.cherry, fontWeight:"bold" }}>{bookName} · Ch. {ch}</span>
                  {book && (
                    <button
                      onClick={() => { openBook(book, ch); setReadingTab("read"); }}
                      style={{ padding:"4px 12px", borderRadius:20, border:`1.5px solid ${c.cherry}`, background:"transparent", color:c.cherry, cursor:"pointer", fontSize:11, fontFamily:"Georgia,serif", display:"flex", alignItems:"center", gap:4 }}>
                      Go to verse →
                    </button>
                  )}
                </div>
                <div style={{ fontSize:14, lineHeight:1.8, color:c.textMid, fontStyle:"italic" }}>{note}</div>
              </div>
            );
          })}
        </>
      )}
      {/* Bookmarks section */}
      {bookmarks.length > 0 && (
        <>
          <div style={{ ...S.sectionLabel, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between" }}
            onClick={() => setShowBookmarks(p => !p)}>
            <span>🔖 Bookmarked Verses</span>
            <span style={{ color:c.cherry }}>{showBookmarks?"▲":"▼"}</span>
          </div>
          {showBookmarks && bookmarks.map(b => (
            <div key={b.id} style={S.card}>
              <div style={{ fontSize:12, color:c.cherry, fontWeight:"bold", marginBottom:4 }}>{b.bookName} {b.chapter}:{b.verse}</div>
              <div style={{ fontSize:14, color:c.textMid, fontStyle:"italic", lineHeight:1.7 }}>{b.text}</div>
              <div style={{ fontSize:11, color:c.textLight, marginTop:6 }}>Saved {b.date}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );

  // ── RENDER ───────────────────────────────────────────────────────────────────
  return (
    <div style={S.app}>
      <Gingham dark={dark}/>
      <div style={S.z}>
        <div style={S.header}>
          <div style={S.headerInner}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={S.title}>kept. graced. blessed.</div>
            </div>
            <button style={S.darkBtn} onClick={() => setDark(d => !d)}>
              {dark?"☀️":"🌙"} <span style={{ fontSize:10 }}>{dark?"Light":"Dark"}</span>
            </button>
          </div>
        </div>

        <div style={S.main}>
          {page==="home"    && renderHome()}
          {page==="library" && renderLibrary()}
          {page==="reading" && renderReading()}
          {page==="today"   && renderToday()}
          {page==="plans"   && renderPlans()}
          {page==="journal" && renderJournal()}
        </div>
      </div>

      <div style={S.nav}>
        {[
          { id:"home",    icon:"🏠", label:"Home"   },
          { id:"library", icon:"📖", label:"Bible"  },
          { id:"plans",   icon:"✦",  label:"Plans"  },
          { id:"journal", icon:"📝", label:"Journal"},
          { id:"today",   icon:"♡",  label:"Today"  },
        ].map(n => (
          <button key={n.id} style={S.navBtn(page===n.id)}
            onClick={() => { setSelectedPlan(null); setPage(n.id); }}>
            <span style={{ fontSize:18 }}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </div>
    </div>
  );
}
