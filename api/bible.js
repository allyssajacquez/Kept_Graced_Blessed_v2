export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { book, chapter, verse } = req.query;
  if (!book || !chapter) return res.status(400).json({ error: 'Missing params' });

  try {
    const response = await fetch(`https://bolls.life/get-text/NKJV/${book}/${chapter}/`, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error(`${response.status}`);
    const data = await response.json();
    if (verse) {
      const found = data.find(v => v.verse === parseInt(verse));
      return res.status(200).json(found ? [found] : [data[0]]);
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch scripture' });
  }
}
