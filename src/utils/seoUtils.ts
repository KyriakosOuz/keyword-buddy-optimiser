
// Utility functions for SEO analysis and recommendations

/**
 * Analyzes text content and extracts potential keywords based on frequency and relevance
 */
export const extractKeywords = (content: string): string[] => {
  // This is a simplified implementation 
  // A real implementation would use NLP and keyword extraction algorithms
  if (!content) return [];
  
  const words = content.toLowerCase().match(/\b(\w{3,})\b/g) || [];
  const stopWords = new Set([
    'the', 'and', 'or', 'but', 'for', 'nor', 'yet', 'so', 'such', 'as', 'with', 
    'that', 'this', 'these', 'those', 'have', 'has', 'had', 'been', 'was', 'were',
    'would', 'should', 'could', 'can', 'may', 'might', 'must', 'shall', 'will', 'from'
  ]);
  
  // Count word frequency
  const wordFreq: Record<string, number> = {};
  words.forEach(word => {
    if (!stopWords.has(word)) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });
  
  // Convert to array and sort by frequency
  const sortedWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0])
    .slice(0, 20);
  
  return sortedWords;
};

/**
 * Generates related keywords based on a given seed keyword
 */
export const generateRelatedKeywords = (seedKeyword: string): string[] => {
  // In a real implementation, this would connect to a keyword research API
  // This is a mock implementation for demonstration
  const keywordMap: Record<string, string[]> = {
    'seo': ['search engine optimization', 'seo services', 'seo strategy', 'seo tools', 'local seo'],
    'marketing': ['digital marketing', 'content marketing', 'email marketing', 'social media marketing'],
    'content': ['content strategy', 'content creation', 'content writing', 'blog content'],
    'website': ['website design', 'website development', 'website builder', 'ecommerce website'],
    'business': ['small business', 'business strategy', 'online business', 'business plan'],
    'social': ['social media', 'social network', 'social platform', 'social engagement']
  };
  
  // Find matches in our keyword map
  for (const [key, values] of Object.entries(keywordMap)) {
    if (seedKeyword.toLowerCase().includes(key)) {
      return values;
    }
  }
  
  // Return some generic SEO terms if no match
  return [
    'how to improve ' + seedKeyword,
    'best ' + seedKeyword,
    seedKeyword + ' guide',
    seedKeyword + ' tutorial',
    seedKeyword + ' tips'
  ];
};

/**
 * Analyzes content and provides readability metrics
 */
export const analyzeReadability = (content: string) => {
  if (!content) {
    return {
      score: 0,
      wordCount: 0,
      sentenceCount: 0,
      avgWordsPerSentence: 0,
      paragraphCount: 0,
      readingTime: 0
    };
  }
  
  // Count words
  const words = content.match(/\b\w+\b/g) || [];
  const wordCount = words.length;
  
  // Count sentences (simple approximation)
  const sentences = content.split(/[.!?]+/).filter(Boolean);
  const sentenceCount = sentences.length;
  
  // Average words per sentence
  const avgWordsPerSentence = sentenceCount ? wordCount / sentenceCount : 0;
  
  // Count paragraphs
  const paragraphs = content.split(/\n\s*\n/).filter(Boolean);
  const paragraphCount = paragraphs.length;
  
  // Estimate reading time (average reading speed: 200-250 words per minute)
  const readingTime = Math.ceil(wordCount / 225);
  
  // Calculate readability score (simplified)
  // In a real app, use established formulas like Flesch-Kincaid
  let score = 100;
  
  // Penalize for very long sentences
  if (avgWordsPerSentence > 25) {
    score -= 20;
  } else if (avgWordsPerSentence > 20) {
    score -= 10;
  } else if (avgWordsPerSentence > 15) {
    score -= 5;
  }
  
  // Penalize for very short content
  if (wordCount < 300) {
    score -= 20;
  } else if (wordCount < 600) {
    score -= 10;
  }
  
  return {
    score: Math.max(0, Math.min(100, score)),
    wordCount,
    sentenceCount,
    avgWordsPerSentence,
    paragraphCount,
    readingTime
  };
};

/**
 * Generates meta tags based on content
 */
export const generateMetaTags = (title: string, content: string) => {
  if (!title || !content) {
    return {
      title: "",
      description: "",
      keywords: ""
    };
  }
  
  // Extract a description (first ~155 characters of content)
  const description = content
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 155)
    .trim() + '...';
  
  // Generate keywords from content
  const extractedKeywords = extractKeywords(content);
  const keywords = extractedKeywords.slice(0, 10).join(', ');
  
  return {
    title: title.length <= 60 ? title : title.substring(0, 57) + '...',
    description,
    keywords
  };
};

/**
 * Provides optimization suggestions based on content analysis
 */
export const getOptimizationTips = (
  content: string, 
  targetKeyword: string
): { id: number; tip: string; importance: 'high' | 'medium' | 'low' }[] => {
  if (!content || !targetKeyword) return [];
  
  const tips = [];
  const readability = analyzeReadability(content);
  const contentLower = content.toLowerCase();
  const keywordLower = targetKeyword.toLowerCase();
  
  // Check if target keyword is in the first paragraph
  const firstParagraph = content.split(/\n\s*\n/)[0] || '';
  if (!firstParagraph.toLowerCase().includes(keywordLower)) {
    tips.push({
      id: 1,
      tip: `Include your target keyword "${targetKeyword}" in the first paragraph.`,
      importance: 'high'
    });
  }
  
  // Check keyword density
  const keywordRegex = new RegExp(keywordLower, 'g');
  const keywordMatches = contentLower.match(keywordRegex) || [];
  const keywordDensity = keywordMatches.length / readability.wordCount;
  
  if (keywordDensity < 0.005) {
    tips.push({
      id: 2,
      tip: `Increase keyword density for "${targetKeyword}" (currently too low).`,
      importance: 'high'
    });
  } else if (keywordDensity > 0.025) {
    tips.push({
      id: 3,
      tip: `Decrease keyword density for "${targetKeyword}" to avoid keyword stuffing.`,
      importance: 'medium'
    });
  }
  
  // Check content length
  if (readability.wordCount < 300) {
    tips.push({
      id: 4,
      tip: 'Increase content length to at least 300 words for better SEO performance.',
      importance: 'high'
    });
  } else if (readability.wordCount < 600) {
    tips.push({
      id: 5,
      tip: 'Consider adding more content (aim for 600+ words) for comprehensive coverage.',
      importance: 'medium'
    });
  }
  
  // Check sentence length
  if (readability.avgWordsPerSentence > 25) {
    tips.push({
      id: 6,
      tip: 'Shorten your sentences to improve readability (aim for less than 20 words per sentence).',
      importance: 'medium'
    });
  }
  
  // Check paragraph structure
  if (readability.paragraphCount < 3 && readability.wordCount > 300) {
    tips.push({
      id: 7,
      tip: 'Break your content into more paragraphs to improve readability.',
      importance: 'medium'
    });
  }
  
  // Check for headings (simplified check)
  if (!content.match(/#{1,6}\s/m) && !content.match(/<h[1-6]/i)) {
    tips.push({
      id: 8,
      tip: 'Add headings (H2, H3) to structure your content and improve SEO.',
      importance: 'high'
    });
  }
  
  // Suggest adding multimedia
  if (!content.match(/!\[.*?\]\(.*?\)/) && !content.match(/<img/i)) {
    tips.push({
      id: 9,
      tip: 'Add images or other multimedia to enhance engagement and SEO value.',
      importance: 'low'
    });
  }
  
  // Suggest adding links
  if (!content.match(/\[.*?\]\(.*?\)/) && !content.match(/<a\s/i)) {
    tips.push({
      id: 10,
      tip: 'Add internal or external links to increase authority and user experience.',
      importance: 'medium'
    });
  }
  
  return tips;
};

/**
 * Calculates an overall SEO score based on various metrics
 */
export const calculateSeoScore = (
  content: string,
  targetKeyword: string,
  title: string
): { score: number; breakdown: Record<string, number> } => {
  if (!content || !targetKeyword) {
    return { 
      score: 0, 
      breakdown: {
        content: 0,
        keyword: 0,
        readability: 0,
        structure: 0,
        meta: 0
      } 
    };
  }
  
  const readability = analyzeReadability(content);
  const contentLower = content.toLowerCase();
  const keywordLower = targetKeyword.toLowerCase();
  
  // Content length score (max 20)
  let contentScore = 0;
  if (readability.wordCount >= 900) {
    contentScore = 20;
  } else if (readability.wordCount >= 600) {
    contentScore = 15;
  } else if (readability.wordCount >= 300) {
    contentScore = 10;
  } else {
    contentScore = Math.floor(readability.wordCount / 30);
  }
  
  // Keyword usage score (max 30)
  let keywordScore = 0;
  
  // Keyword in title
  if (title && title.toLowerCase().includes(keywordLower)) {
    keywordScore += 10;
  }
  
  // Keyword in first paragraph
  const firstParagraph = content.split(/\n\s*\n/)[0] || '';
  if (firstParagraph.toLowerCase().includes(keywordLower)) {
    keywordScore += 5;
  }
  
  // Keyword density
  const keywordRegex = new RegExp(keywordLower, 'g');
  const keywordMatches = contentLower.match(keywordRegex) || [];
  const keywordDensity = keywordMatches.length / readability.wordCount;
  
  if (keywordDensity >= 0.005 && keywordDensity <= 0.025) {
    keywordScore += 10;
  } else if (keywordDensity > 0 && keywordDensity < 0.005) {
    keywordScore += 5;
  } else if (keywordDensity > 0.025) {
    keywordScore += 2; // Penalize keyword stuffing
  }
  
  // Keyword in headings
  const headings = content.match(/#{1,6}\s.*?$|<h[1-6].*?>.*?<\/h[1-6]>/gmi) || [];
  if (headings.some(h => h.toLowerCase().includes(keywordLower))) {
    keywordScore += 5;
  }
  
  // Readability score (max 20)
  const readabilityScore = Math.min(20, Math.floor(readability.score / 5));
  
  // Structure score (max 15)
  let structureScore = 0;
  
  // Has headings
  if (headings.length > 0) {
    structureScore += 5;
  }
  
  // Has multiple paragraphs
  if (readability.paragraphCount >= 3) {
    structureScore += 5;
  }
  
  // Has links or images
  if (content.match(/\[.*?\]\(.*?\)|<a\s|!\[.*?\]\(.*?\)|<img/i)) {
    structureScore += 5;
  }
  
  // Meta information score (max 15)
  let metaScore = 0;
  
  if (title) {
    // Title length optimal (50-60 chars)
    if (title.length >= 50 && title.length <= 60) {
      metaScore += 7;
    } else if (title.length >= 30 && title.length < 50) {
      metaScore += 5;
    } else if (title.length > 60 && title.length <= 70) {
      metaScore += 3;
    }
    
    // Title includes keyword
    if (title.toLowerCase().includes(keywordLower)) {
      metaScore += 8;
    }
  }
  
  // Calculate total score
  const totalScore = contentScore + keywordScore + readabilityScore + structureScore + metaScore;
  
  return {
    score: Math.min(100, totalScore),
    breakdown: {
      content: contentScore,
      keyword: keywordScore,
      readability: readabilityScore,
      structure: structureScore,
      meta: metaScore
    }
  };
};
