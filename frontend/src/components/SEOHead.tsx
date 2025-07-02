import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  metaTitle,
  metaDescription,
  metaKeywords,
  defaultTitle,
  defaultDescription,
  defaultKeywords = ''
}) => {
  const finalTitle = metaTitle || title || defaultTitle;
  const finalDescription = metaDescription || defaultDescription;
  const finalKeywords = metaKeywords || defaultKeywords;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
    </Helmet>
  );
};

export default SEOHead;