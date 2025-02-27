
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
  
  // Check for headings
  if (headings.length > 0) {
    structureScore += 5;
  }
  
  // Check for paragraphs
  if (readability.paragraphCount >= 5) {
    structureScore += 5;
  } else if (readability.paragraphCount >= 3) {
    structureScore += 3;
  }
  
  // Check for lists and formatting
  const hasList = content.match(/<ul|<ol|<li|^\s*[-*+]\s|\n\s*[-*+]\s/mi);
  if (hasList) {
    structureScore += 2;
  }
  
  // Check for emphasis (bold, italic)
  const hasEmphasis = content.match(/\*\*|\*|__|_|<strong|<em|<b>|<i>/i);
  if (hasEmphasis) {
    structureScore += 3;
  }
  
  // Meta tags score (max 15)
  let metaScore = 0;
  
  // Title has optimal length
  if (title) {
    if (title.length <= 60 && title.length >= 30) {
      metaScore += 5;
    } else if (title.length < 30) {
      metaScore += 2;
    }
  }
  
  // Meta description from content (first paragraph)
  const potentialDescription = firstParagraph.substring(0, 155);
  if (potentialDescription.length >= 120) {
    metaScore += 5;
  } else if (potentialDescription.length >= 70) {
    metaScore += 3;
  }
  
  // Meta description contains keyword
  if (potentialDescription.toLowerCase().includes(keywordLower)) {
    metaScore += 5;
  }
  
  // Calculate total score
  const totalScore = contentScore + keywordScore + readabilityScore + structureScore + metaScore;
  
  // Calculate normalized score (0-100)
  const normalizedScore = Math.min(100, Math.round(totalScore));
  
  return {
    score: normalizedScore,
    breakdown: {
      content: contentScore,
      keyword: keywordScore,
      readability: readabilityScore,
      structure: structureScore,
      meta: metaScore
    }
  };
};

/**
 * Generate content improvement suggestions
 */
export const getContentImprovementSuggestions = (
  content: string,
  title: string,
  targetKeyword: string
) => {
  if (!content) return [];
  
  const suggestions = [];
  const readability = analyzeReadability(content);
  
  // Find potential passive voice sentences (simplified)
  const sentences = content.split(/[.!?]+/).filter(Boolean);
  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i].trim();
    // Simple passive voice detection (not comprehensive)
    if (/\b(?:is|are|was|were|be|been|being)\s+\w+ed\b/i.test(sentence)) {
      suggestions.push({
        id: suggestions.length + 1,
        type: 'passive-voice' as const,
        original: sentence,
        improved: sentence.replace(/\b(is|are|was|were|be|been|being)\s+(\w+ed)\b/i, 'actively $2'),
        explanation: 'Use active voice instead of passive voice for stronger, clearer writing.',
        context: i > 0 ? sentences[i-1] + '. ' + sentence : sentence
      });
    }
  }
  
  // Find long, complex sentences
  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i].trim();
    const words = sentence.split(/\s+/);
    if (words.length > 25) {
      const halfPoint = Math.floor(words.length / 2);
      const firstHalf = words.slice(0, halfPoint).join(' ');
      const secondHalf = words.slice(halfPoint).join(' ');
      
      suggestions.push({
        id: suggestions.length + 1,
        type: 'readability' as const,
        original: sentence,
        improved: `${firstHalf}. ${secondHalf}`,
        explanation: 'Break long sentences into shorter ones to improve readability.',
        context: sentence
      });
    }
  }
  
  // Suggest keyword variations if target keyword is used
  if (targetKeyword) {
    const lowercaseContent = content.toLowerCase();
    const keywordCount = (lowercaseContent.match(new RegExp(targetKeyword.toLowerCase(), 'g')) || []).length;
    
    if (keywordCount > 2) {
      // Generate variations
      const variations = [
        targetKeyword,
        `about ${targetKeyword}`,
        `${targetKeyword} tips`,
        `best ${targetKeyword}`,
        `how to optimize ${targetKeyword}`
      ];
      
      suggestions.push({
        id: suggestions.length + 1,
        type: 'keyword-variation' as const,
        original: `Using "${targetKeyword}" ${keywordCount} times`,
        improved: `Try these variations: "${variations.join('", "')}"`,
        explanation: 'Use keyword variations to avoid keyword stuffing while maintaining SEO relevance.',
      });
    }
  }
  
  // Suggest adding a call to action if none is found
  if (!content.match(/\b(?:click|sign up|subscribe|download|learn more|contact|call|email|buy|purchase|order|try|get started|visit)\b/i)) {
    suggestions.push({
      id: suggestions.length + 1,
      type: 'cta' as const,
      original: "Your content lacks a clear call-to-action.",
      improved: "Consider adding a sentence like: \"Sign up for our newsletter to learn more about optimizing your SEO strategy.\"",
      explanation: 'Adding a call-to-action improves engagement and conversion rates.',
    });
  }
  
  return suggestions;
};

/**
 * Generate schema markup based on type and fields
 */
export const generateSchemaMarkup = (
  schemaType: string,
  fields: Record<string, string>
): string => {
  let schema: Record<string, any> = {
    "@context": "https://schema.org",
  };
  
  switch (schemaType) {
    case 'article':
      schema["@type"] = "Article";
      schema["headline"] = fields.headline || "";
      schema["author"] = {
        "@type": "Person",
        "name": fields.author || ""
      };
      schema["publisher"] = {
        "@type": "Organization",
        "name": fields.publisher || ""
      };
      schema["datePublished"] = fields.publishDate || "";
      schema["description"] = fields.description || "";
      break;
      
    case 'product':
      schema["@type"] = "Product";
      schema["name"] = fields.name || "";
      schema["description"] = fields.description || "";
      schema["offers"] = {
        "@type": "Offer",
        "price": fields.price || "",
        "priceCurrency": fields.currency || "USD",
        "availability": `https://schema.org/${fields.availability || "InStock"}`
      };
      if (fields.brand) {
        schema["brand"] = {
          "@type": "Brand",
          "name": fields.brand
        };
      }
      break;
      
    case 'faq':
      schema["@type"] = "FAQPage";
      schema["mainEntity"] = [];
      
      // Add FAQ items
      for (let i = 1; i <= 3; i++) {
        if (fields[`question${i}`] && fields[`answer${i}`]) {
          schema["mainEntity"].push({
            "@type": "Question",
            "name": fields[`question${i}`],
            "acceptedAnswer": {
              "@type": "Answer",
              "text": fields[`answer${i}`]
            }
          });
        }
      }
      break;
      
    case 'review':
      schema["@type"] = "Review";
      schema["itemReviewed"] = {
        "@type": "Thing",
        "name": fields.itemReviewed || ""
      };
      schema["reviewRating"] = {
        "@type": "Rating",
        "ratingValue": fields.reviewRating || "5",
        "bestRating": fields.bestRating || "5"
      };
      schema["author"] = {
        "@type": "Person",
        "name": fields.author || ""
      };
      schema["reviewBody"] = fields.reviewBody || "";
      break;
      
    case 'event':
      schema["@type"] = "Event";
      schema["name"] = fields.name || "";
      schema["startDate"] = fields.startDate || "";
      schema["endDate"] = fields.endDate || "";
      schema["description"] = fields.description || "";
      schema["location"] = {
        "@type": "Place",
        "name": fields.location || ""
      };
      if (fields.organizer) {
        schema["organizer"] = {
          "@type": "Organization",
          "name": fields.organizer
        };
      }
      break;
  }
  
  return JSON.stringify(schema, null, 2);
};

/**
 * Generate internal linking suggestions between pages
 */
export const generateInternalLinkingSuggestions = (
  content: string,
  title: string,
  targetKeyword: string,
  additionalPages: Array<{title: string, url: string, content: string}>
): Array<{
  id: number;
  text: string;
  context: string;
  targetPage: string;
  targetUrl: string;
  type: 'inbound' | 'outbound';
  anchors: Array<{
    text: string;
    isSelected: boolean;
  }>;
}> => {
  if (!content || additionalPages.length === 0) return [];
  
  const suggestions = [];
  const contentLower = content.toLowerCase();
  const keywordLower = targetKeyword.toLowerCase();
  let suggestionId = 1;
  
  // Extract important phrases from content (simplified)
  const extractPhrases = (text: string) => {
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const phrases = [];
    
    for (const sentence of sentences) {
      // Simple phrase extraction
      const words = sentence.split(/\s+/).filter(w => w.length > 3);
      for (let i = 0; i < words.length - 2; i++) {
        const phrase = words.slice(i, i + 3).join(' ');
        if (phrase.length > 10 && phrase.length < 50) {
          phrases.push(phrase);
        }
      }
    }
    
    return phrases;
  };
  
  // Get important phrases from current content
  const currentPhrases = extractPhrases(content);
  
  // Look for inbound linking opportunities
  for (const page of additionalPages) {
    const pagePhrases = extractPhrases(page.content);
    const pageContentLower = page.content.toLowerCase();
    
    // Check if the additional page mentions our target keyword or title
    if (pageContentLower.includes(keywordLower) || 
        pageContentLower.includes(title.toLowerCase())) {
      
      // Find the context for this mention
      const sentences = page.content.split(/[.!?]+/).filter(Boolean);
      for (const sentence of sentences) {
        const sentenceLower = sentence.toLowerCase();
        
        if (sentenceLower.includes(keywordLower) || sentenceLower.includes(title.toLowerCase())) {
          // This sentence in the other page mentions our keyword or title
          
          // Generate some anchor text options
          const anchorOptions = [
            targetKeyword,
            title,
            `${targetKeyword} guide`,
            `learn about ${targetKeyword}`
          ].filter(Boolean);
          
          suggestions.push({
            id: suggestionId++,
            text: `${page.title} mentions "${targetKeyword}" and could link to this page`,
            context: sentence.trim(),
            targetPage: page.title,
            targetUrl: '', // For inbound links, the target is the current page
            type: 'inbound',
            anchors: anchorOptions.map((text, index) => ({
              text,
              isSelected: index === 0
            }))
          });
          
          break; // One suggestion per page is enough
        }
      }
    }
    
    // Look for outbound linking opportunities
    for (const phrase of pagePhrases) {
      if (contentLower.includes(phrase.toLowerCase())) {
        // Our content mentions a phrase from the other page
        
        // Find the context for this mention
        const sentences = content.split(/[.!?]+/).filter(Boolean);
        for (const sentence of sentences) {
          const sentenceLower = sentence.toLowerCase();
          
          if (sentenceLower.includes(phrase.toLowerCase())) {
            // This sentence in our content mentions a phrase from the other page
            
            // Generate some anchor text options
            const anchorOptions = [
              phrase,
              page.title,
              `more about ${page.title.toLowerCase()}`,
              `${page.title} guide`
            ].filter(Boolean);
            
            suggestions.push({
              id: suggestionId++,
              text: `This page mentions content related to "${page.title}" and could link to it`,
              context: sentence.trim(),
              targetPage: page.title,
              targetUrl: page.url,
              type: 'outbound',
              anchors: anchorOptions.map((text, index) => ({
                text,
                isSelected: index === 0
              }))
            });
            
            break; // One suggestion per phrase is enough
          }
        }
      }
    }
  }
  
  return suggestions;
};

/**
 * Generate content ideas based on a target keyword
 */
export const generateContentIdeas = (targetKeyword: string): Array<{
  title: string;
  description: string;
  difficulty: string;
  potential: string;
}> => {
  if (!targetKeyword) return [];
  
  // In a real implementation, this would connect to an AI content suggestion API
  // This is a mock implementation for demonstration
  const keywordLower = targetKeyword.toLowerCase();
  
  const contentTemplates = [
    {
      title: `Ultimate Guide to ${targetKeyword}`,
      description: `A comprehensive guide covering everything about ${targetKeyword}, from basics to advanced strategies.`,
      difficulty: 'Medium',
      potential: 'High'
    },
    {
      title: `10 Best ${targetKeyword} Practices in 2023`,
      description: `Explore the top strategies and practices for ${targetKeyword} that professionals are using this year.`,
      difficulty: 'Easy',
      potential: 'High'
    },
    {
      title: `How to Improve Your ${targetKeyword} Strategy Today`,
      description: `Practical tips and actionable advice to enhance your ${targetKeyword} approach immediately.`,
      difficulty: 'Easy',
      potential: 'Medium'
    },
    {
      title: `${targetKeyword} vs Traditional Methods: A Comparison`,
      description: `An in-depth analysis comparing ${targetKeyword} with conventional approaches, highlighting pros and cons of each.`,
      difficulty: 'Medium',
      potential: 'Medium'
    },
    {
      title: `Case Study: How Brand X Increased ROI by 200% Using ${targetKeyword}`,
      description: `A detailed case study showing real-world results achieved through effective ${targetKeyword} implementation.`,
      difficulty: 'Hard',
      potential: 'High'
    },
    {
      title: `Beginner's Guide to ${targetKeyword}`,
      description: `An easy-to-follow introduction to ${targetKeyword} for those just getting started.`,
      difficulty: 'Easy',
      potential: 'Medium'
    },
    {
      title: `Advanced ${targetKeyword} Techniques for Professionals`,
      description: `Cutting-edge strategies and techniques for experienced practitioners of ${targetKeyword}.`,
      difficulty: 'Hard',
      potential: 'Medium'
    },
    {
      title: `Common ${targetKeyword} Mistakes and How to Avoid Them`,
      description: `Identify and overcome frequent pitfalls in ${targetKeyword} implementation.`,
      difficulty: 'Medium',
      potential: 'High'
    }
  ];
  
  // Generate additional industry-specific ideas if keyword matches certain patterns
  if (keywordLower.includes('seo') || keywordLower.includes('search')) {
    contentTemplates.push(
      {
        title: `${targetKeyword} After Google's Latest Algorithm Update`,
        description: `How the latest Google algorithm changes impact your ${targetKeyword} strategy and what to do about it.`,
        difficulty: 'Medium',
        potential: 'High'
      },
      {
        title: `Local ${targetKeyword}: Strategies for Small Businesses`,
        description: `Tailored ${targetKeyword} approaches specifically designed for local and small business success.`,
        difficulty: 'Medium',
        potential: 'Medium'
      }
    );
  } else if (keywordLower.includes('content') || keywordLower.includes('writing')) {
    contentTemplates.push(
      {
        title: `Using AI Tools to Enhance Your ${targetKeyword}`,
        description: `How artificial intelligence and automation can improve your ${targetKeyword} process and outcomes.`,
        difficulty: 'Medium',
        potential: 'High'
      },
      {
        title: `${targetKeyword} Optimization: From Draft to Publication`,
        description: `The complete workflow for creating and optimizing ${targetKeyword} for maximum impact.`,
        difficulty: 'Medium',
        potential: 'Medium'
      }
    );
  } else if (keywordLower.includes('market') || keywordLower.includes('business')) {
    contentTemplates.push(
      {
        title: `${targetKeyword} Trends to Watch in 2023`,
        description: `Emerging trends, patterns, and innovations in ${targetKeyword} to keep an eye on this year.`,
        difficulty: 'Medium',
        potential: 'High'
      },
      {
        title: `ROI Measurement for Your ${targetKeyword} Efforts`,
        description: `Frameworks and methodologies to accurately track and measure the return on investment from your ${targetKeyword} strategy.`,
        difficulty: 'Hard',
        potential: 'Medium'
      }
    );
  }
  
  return contentTemplates;
};

/**
 * Suggest optimal posting times for content based on keyword
 */
export const suggestPostingTimes = (targetKeyword: string): Array<{
  day: string;
  time: string;
  reason: string;
}> => {
  if (!targetKeyword) return [];
  
  // In a real implementation, this would use analytics data and industry benchmarks
  // This is a mock implementation for demonstration
  const keywordLower = targetKeyword.toLowerCase();
  
  const defaultTimes = [
    {
      day: 'Tuesday',
      time: '10:00 AM',
      reason: 'High engagement rate for business content early in the work week.'
    },
    {
      day: 'Wednesday',
      time: '2:00 PM',
      reason: 'Mid-week, mid-day sweet spot for professional audience engagement.'
    },
    {
      day: 'Thursday',
      time: '8:00 AM',
      reason: 'Early morning readers catching up before end of work week.'
    },
    {
      day: 'Weekend (Saturday)',
      time: '11:00 AM',
      reason: 'Casual browsing time for non-work related content.'
    }
  ];
  
  // Add industry-specific recommendations based on keyword
  if (keywordLower.includes('tech') || keywordLower.includes('software') || keywordLower.includes('coding')) {
    return [
      {
        day: 'Monday',
        time: '8:00 AM',
        reason: 'Tech professionals often check industry news at the start of the work week.'
      },
      {
        day: 'Wednesday',
        time: '1:00 PM',
        reason: 'Mid-week lunch break is popular for technical content consumption.'
      },
      {
        day: 'Thursday',
        time: '4:00 PM',
        reason: 'Late afternoon is when developers often take breaks to read tech articles.'
      },
      {
        day: 'Sunday',
        time: '7:00 PM',
        reason: 'Many developers prepare for the week ahead with technical reading.'
      }
    ];
  } else if (keywordLower.includes('finance') || keywordLower.includes('money') || keywordLower.includes('invest')) {
    return [
      {
        day: 'Monday',
        time: '6:00 AM',
        reason: 'Financial professionals check markets and news before trading opens.'
      },
      {
        day: 'Tuesday',
        time: '7:00 PM',
        reason: 'Evening research time after market close and daily analysis.'
      },
      {
        day: 'Wednesday',
        time: '12:00 PM',
        reason: 'Midday market check during lunch breaks.'
      },
      {
        day: 'Friday',
        time: '4:30 PM',
        reason: 'End of trading week review and planning for next week.'
      }
    ];
  } else if (keywordLower.includes('health') || keywordLower.includes('fitness') || keywordLower.includes('wellness')) {
    return [
      {
        day: 'Monday',
        time: '7:00 AM',
        reason: 'Beginning of week motivation for health and fitness goals.'
      },
      {
        day: 'Wednesday',
        time: '6:00 PM',
        reason: 'Post-work hours when people are likely to exercise.'
      },
      {
        day: 'Friday',
        time: '3:00 PM',
        reason: 'Planning for weekend health activities and meal prep.'
      },
      {
        day: 'Sunday',
        time: '9:00 AM',
        reason: 'Weekend morning when health-conscious readers plan their week.'
      }
    ];
  }
  
  return defaultTimes;
};

/**
 * Identify content gaps based on keyword and existing content
 */
export const identifyContentGaps = (
  targetKeyword: string,
  existingContent: string
): Array<{
  topic: string;
  relevance: string;
  competitionLevel: string;
}> => {
  if (!targetKeyword) return [];
  
  // In a real implementation, this would analyze competitor content and search intent
  // This is a mock implementation for demonstration
  const keywordLower = targetKeyword.toLowerCase();
  const contentLower = existingContent ? existingContent.toLowerCase() : '';
  
  // Define potential topic gaps based on the target keyword
  const potentialGaps = [
    {
      topic: `${targetKeyword} for Beginners`,
      relevance: 'High',
      competitionLevel: 'Medium'
    },
    {
      topic: `Advanced ${targetKeyword} Strategies`,
      relevance: 'High',
      competitionLevel: 'High'
    },
    {
      topic: `${targetKeyword} Case Studies`,
      relevance: 'Medium',
      competitionLevel: 'Low'
    },
    {
      topic: `${targetKeyword} Tools and Resources`,
      relevance: 'High',
      competitionLevel: 'Medium'
    },
    {
      topic: `${targetKeyword} Industry Trends`,
      relevance: 'Medium',
      competitionLevel: 'Medium'
    },
    {
      topic: `${targetKeyword} vs Alternative Approaches`,
      relevance: 'High',
      competitionLevel: 'Low'
    }
  ];
  
  // Filter out topics that might already be covered in the existing content
  return potentialGaps.filter(gap => {
    const gapTopicLower = gap.topic.toLowerCase();
    // Skip if similar content already exists
    return !contentLower.includes(gapTopicLower) && 
          !contentLower.includes(gapTopicLower.replace(`${keywordLower}`, '').trim());
  });
};

/**
 * Analyze content trends based on target keyword
 */
export const analyzeContentTrends = (
  targetKeyword: string
): Array<{
  keyword: string;
  volume: number;
  growth: string;
}> => {
  if (!targetKeyword) return [];
  
  // In a real implementation, this would connect to search trend APIs
  // This is a mock implementation for demonstration
  const keywordLower = targetKeyword.toLowerCase();
  
  // Generate trending topics related to the keyword with random but plausible data
  const generateTrend = (baseKeyword: string, suffix: string, minVolume: number, maxVolume: number) => {
    const volume = Math.floor(Math.random() * (maxVolume - minVolume + 1)) + minVolume;
    const growthOptions = ['Stable', 'Rising', 'Surging', 'Falling', 'Moderate growth'];
    const growth = growthOptions[Math.floor(Math.random() * 3)]; // Biased toward positive growth
    
    return {
      keyword: `${baseKeyword} ${suffix}`.trim(),
      volume,
      growth
    };
  };
  
  // Base set of trending topics
  const baseKeyword = targetKeyword;
  const trends = [
    generateTrend(baseKeyword, 'best practices', 1500, 5000),
    generateTrend(baseKeyword, 'examples', 2000, 7000),
    generateTrend(baseKeyword, 'tools', 1000, 4000),
    generateTrend(baseKeyword, 'statistics', 800, 3000),
    generateTrend(baseKeyword, 'trends', 1200, 4500),
    generateTrend('how to use', baseKeyword, 3000, 8000),
    generateTrend(baseKeyword, 'for beginners', 2500, 6000)
  ];
  
  // Add industry-specific trends based on the keyword
  if (keywordLower.includes('seo') || keywordLower.includes('search') || keywordLower.includes('content')) {
    trends.push(
      generateTrend(baseKeyword, 'algorithm updates', 1500, 4500),
      generateTrend(baseKeyword, 'ranking factors', 2500, 6000),
      generateTrend(baseKeyword, 'optimization', 3000, 7500)
    );
  } else if (keywordLower.includes('social') || keywordLower.includes('media')) {
    trends.push(
      generateTrend(baseKeyword, 'viral content', 3500, 8000),
      generateTrend(baseKeyword, 'engagement tactics', 2000, 5500),
      generateTrend(baseKeyword, 'influencer strategy', 4000, 9000)
    );
  } else if (keywordLower.includes('business') || keywordLower.includes('marketing')) {
    trends.push(
      generateTrend(baseKeyword, 'ROI', 2000, 5000),
      generateTrend(baseKeyword, 'strategy template', 1500, 4500),
      generateTrend(baseKeyword, 'case studies', 1800, 5000)
    );
  }
  
  // Sort by volume (descending)
  return trends.sort((a, b) => b.volume - a.volume);
};
