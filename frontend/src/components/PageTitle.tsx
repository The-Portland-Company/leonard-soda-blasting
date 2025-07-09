import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { usePage, useGlobalSettings } from '../hooks/useDirectus';

interface PageTitleProps {
  pageSlug: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ pageSlug }) => {
  const { page, loading: pageLoading } = usePage(pageSlug);
  const { settings, loading: settingsLoading } = useGlobalSettings();

  // Priority: page meta_title -> page title -> global site_title
  const finalTitle = page?.meta_title || page?.title || settings?.site_title || '';
  const finalDescription = page?.meta_description || settings?.site_description || '';

  // Do not render the Helmet component until a title is actually available.
  // This prevents a race condition where an empty title is rendered first.
  if (!finalTitle) {
    return null;
  }

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription || 'Professional eco-friendly soda blasting services for cleaning and restoration.'} />
    </Helmet>
  );
};

export default PageTitle;