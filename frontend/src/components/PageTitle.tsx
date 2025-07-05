import React from 'react';
import { Helmet } from 'react-helmet-async';
import { usePage } from '../hooks/useDirectus';

interface PageTitleProps {
  pageSlug: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ pageSlug }) => {
  const { page } = usePage(pageSlug);
  
  // Use meta_title first, then title, with no fallback
  const finalTitle = page?.meta_title || page?.title || '';
  const finalDescription = page?.meta_description || '';
  
  return (
    <Helmet>
      <title>{finalTitle}</title>
      {finalDescription && <meta name="description" content={finalDescription} />}
    </Helmet>
  );
};

export default PageTitle;