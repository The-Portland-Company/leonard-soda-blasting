interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export function updateSEOTags(seoData: SEOData) {
  // Only update title if provided (let Helmet handle it otherwise)
  if (seoData.title) {
    const title = seoData.title;
    document.title = title;
    
    // Also update the title meta tag if it exists
    let titleMeta = document.querySelector('meta[name="title"]') as HTMLMetaElement;
    if (!titleMeta) {
      titleMeta = document.createElement('meta');
      titleMeta.name = 'title';
      document.head.appendChild(titleMeta);
    }
    titleMeta.content = title;
  }

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
  if (metaDescription && seoData.description) {
    metaDescription.content = seoData.description;
  }

  // Update or create meta keywords
  if (seoData.keywords) {
    let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = seoData.keywords;
  }

  // Update or create Open Graph meta tags
  if (seoData.ogTitle) {
    let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = seoData.ogTitle;
  }

  if (seoData.ogDescription) {
    let ogDescription = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.content = seoData.ogDescription;
  }

  if (seoData.ogImage) {
    let ogImage = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.content = seoData.ogImage;
  }
}

export function createPageSEO(page: any, settings: any) {
  const title = page?.meta_title || settings?.site_title;
  const description = page?.meta_description || settings?.site_description;
  
  return {
    title,
    description,
    ogTitle: title,
    ogDescription: description
  };
}