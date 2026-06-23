// Summarization without any external API — pure NLP text extraction

function sentenceScore(sentence, wordFreq, totalWords) {
  const words = tokenize(sentence);
  if (!words.length) return 0;
  return words.reduce((sum, w) => sum + (wordFreq[w] || 0), 0) / words.length;
}

function tokenize(text) {
  return text.toLowerCase().match(/\b[a-záéíóúüñ]{4,}\b/g) || [];
}

const STOPWORDS = new Set([
  'para','como','pero','más','muy','todo','esta','este','esto','bien','cuando',
  'donde','tiene','hacer','puede','también','sobre','desde','hasta','entre',
  'that','with','this','have','from','they','will','been','were','what','your',
  'their','there','about','which','would','could','should','after','before',
]);

function summarize(title, content) {
  const sentences = content
    .replace(/\n+/g, ' ')
    .match(/[^.!?\n]+[.!?]*/g) || [];

  if (sentences.length <= 2) {
    return {
      summary:    content.slice(0, 200).trim(),
      key_points: sentences.slice(0, 3).map(s => s.trim()).filter(Boolean),
      tags:       extractTags(title + ' ' + content),
    };
  }

  const words = tokenize(content);
  const freq  = {};
  words.forEach(w => { if (!STOPWORDS.has(w)) freq[w] = (freq[w] || 0) + 1; });

  const scored = sentences.map((s, i) => ({
    text:  s.trim(),
    score: sentenceScore(s, freq, words.length),
    index: i,
  }));

  const top = [...scored]
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(3, Math.ceil(sentences.length * 0.3)));

  const summary    = top.sort((a, b) => a.index - b.index).map(s => s.text).join(' ');
  const key_points = top.slice(0, 3).map(s => s.text);

  return {
    summary:    summary || content.slice(0, 200),
    key_points,
    tags:       extractTags(title + ' ' + content),
  };
}

function extractTags(text) {
  const words = tokenize(text);
  const freq  = {};
  words.forEach(w => { if (!STOPWORDS.has(w) && w.length > 4) freq[w] = (freq[w] || 0) + 1; });
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([w]) => w);
}

module.exports = { summarize };
