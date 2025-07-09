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
  const finalTitle = page?.meta_title || page?.title || settings?.site_title || 'Leonard Soda Blasting';
  const finalDescription = page?.meta_description || settings?.site_description || '';

  // Debug logging to verify title selection
  useEffect(() => {
    console.log(`[DEBUG] PageTitle for ${pageSlug}:`, {
      pageLoading,
      settingsLoading,
      meta_title: page?.meta_title,
      page_title: page?.title,
      site_title: settings?.site_title,
      finalTitle: finalTitle
    });
    
    // Also update the browser title directly as a fallback
    if (finalTitle && !pageLoading && !settingsLoading) {
      document.title = finalTitle;
      console.log(`[DEBUG] Set document.title to: ${finalTitle}`);
    }
  }, [pageSlug, pageLoading, settingsLoading, page?.meta_title, page?.title, settings?.site_title, finalTitle]);

  // Always render the Helmet component, but use fallback title if needed
  return (
    <Helmet>
      <title>{finalTitle}</title>
      {finalDescription && <meta name="description" content={finalDescription} />}
    </Helmet>
  );
};

export default PageTitle;