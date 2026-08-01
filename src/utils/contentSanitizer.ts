/**
 * Content Sanitizer Utility
 * Sanitizes markdown content for user display:
 * 1. Completely strips raw SEO metadata blocks (PRIMARY KEYWORD, SECONDARY KEYWORDS, SEARCH INTENT, SEO META, SEO Title, Meta Description, OG tags, H1/INTRODUCTION banners)
 * 2. Removes "SECTION X:" prefixes from headings & TOC links, leaving clean humanized titles
 * 3. Removes section bottom border lines / horizontal rules
 * 4. Integrates links naturally without raw "Internal Link:" or "External Link:" labels or standalone link dumps
 * 5. Returns clean, humanized, beautifully printable markdown text
 */

export function cleanContentForDisplay(rawContent: string): string {
  if (!rawContent) return '';

  let text = rawContent;

  // 1. If content contains raw prompt metadata blocks, strip everything before the real article body
  if (text.includes('# PRIMARY KEYWORD') || text.includes('PRIMARY KEYWORD:') || text.includes('SEO Title:')) {
    // If there is an INTRODUCTION banner, slice right after it
    const introIndex = text.search(/={3,}\s*\n\s*INTRODUCTION\s*\n\s*={3,}/i);
    if (introIndex !== -1) {
      text = text.slice(introIndex).replace(/={3,}\s*\n\s*INTRODUCTION\s*\n\s*={3,}\s*/i, '');
    } else {
      // Check if there is an H1 banner
      const h1Index = text.search(/={3,}\s*\n\s*H1\s*\n\s*={3,}/i);
      if (h1Index !== -1) {
        text = text.slice(h1Index).replace(/={3,}\s*\n\s*H1\s*\n\s*={3,}\s*/i, '');
      } else {
        // Fall back to first occurrence of Table of Contents or first real section
        const tocIndex = text.search(/(?:TABLE OF CONTENTS|Table of Contents|#+ Table of Contents)/i);
        if (tocIndex !== -1) {
          text = text.slice(tocIndex);
        }
      }
    }
  }

  // 2. Global metadata lines cleanup pass (for safety across any position)
  text = text.replace(/#+\s*(?:PRIMARY KEYWORD|SECONDARY KEYWORDS|SEARCH INTENT|TARGET AUDIENCE|SEO META)[\s\S]*?(?=\n#|\n={3,}|\n[A-Z][a-z]+|\n\n[^\n#=]+|$)/gim, '');

  const metadataKeys = [
    'SEO Title:', 'Meta Description:', 'SEO URL:', 'Breadcrumb:', 'Canonical URL:',
    'OG Title:', 'OG Description:', 'OG Image:', 'Primary Keyword:', 'Secondary Keywords:',
    'Search Intent:', 'Target Audience:', 'Focus Keyword:', 'Primary Keyword Focus'
  ];
  metadataKeys.forEach(key => {
    const reg = new RegExp(`^(?:-\\s*)?(?:\\*\\*)?${key}(?:\\*\\*)?.*$`, 'gim');
    text = text.replace(reg, '');
  });

  // Strip intent checkboxes
  text = text.replace(/^[☑☐]\s*Informational.*$/gim, '');
  text = text.replace(/^[☑☐]\s*Commercial.*$/gim, '');
  text = text.replace(/^[☑☐]\s*Transactional.*$/gim, '');
  text = text.replace(/^[☑☐]\s*Navigational.*$/gim, '');

  // Strip separator lines & standalone banner titles
  text = text.replace(/^={3,}\s*$/gim, '');
  text = text.replace(/^-{3,}\s*$/gim, '');
  text = text.replace(/^#+\s*(?:H1|INTRODUCTION|SEO META)\s*$/gim, '');
  text = text.replace(/^(?:H1|INTRODUCTION|SEO META)\s*$/gim, '');

  // Strip duplicate H1 heading at top if present
  text = text.replace(/^#\s+[^\n]+\n+/m, '');

  // 3. Remove "SECTION X:" from Table of Contents links & markdown headings
  // e.g. [SECTION 1: Why Aged...](#why-aged) -> [Why Aged...](#why-aged)
  text = text.replace(/\[\s*SECTION\s*\d+\s*:\s*([^\]]+)\]/gi, '[$1]');
  // e.g. ## SECTION 1: Why Aged... -> ## Why Aged...
  text = text.replace(/(#+\s*)SECTION\s*\d+\s*:\s*/gi, '$1');
  text = text.replace(/^SECTION\s*\d+\s*:\s*/gim, '');

  // 4. Remove raw link label prefixes
  text = text.replace(/(?:\*\*|__)?Internal Link:\s*(?:\*\*|__)?/gi, '');
  text = text.replace(/(?:\*\*|__)?External Link:\s*(?:\*\*|__)?/gi, '');
  text = text.replace(/(?:\*\*|__)?Internal Resource:\s*(?:\*\*|__)?/gi, '');
  text = text.replace(/(?:\*\*|__)?External Resource:\s*(?:\*\*|__)?/gi, '');

  // 5. Remove standalone link dump sections at the end
  text = text.replace(/#+\s*(?:Related Internal Resources|External Authority Resources|Related Services|External Resources|Internal & External Links)[\s\S]*?(?=\n#+|$)/gi, '');

  // 6. Clean horizontal rules
  text = text.replace(/^\s*[-*_]{3,}\s*$/gim, '');

  // 7. Clean up multiple blank lines
  text = text.replace(/\n{3,}/g, '\n\n');

  return text.trim();
}
