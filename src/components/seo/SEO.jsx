import { Helmet } from "react-helmet";

const SEO = ({
  title = "Ringruby Hotel Bateye | Luxury Accommodation in Ikeja GRA, Lagos",
  description = "Ring Ruby Hotel Bateye offers upscale comfort in Ikeja GRA, just minutes from Murtala Muhammed Airport.",
  keywords = "hotel, lagos, accommodation, ringruby, bateye, ikeja gra, oduduwa crescent, luxury hotel, nigeria, business hotel, vacation",
  image = 'https://bateye.ringrubyhotel.com/ring-ruby-logo.webp',
  url = typeof window !== "undefined"
    ? window.location.href
    : "https://bateye.ringrubyhotel.com",
  type = "website",
  noindex = false,
}) => {
  const siteName = "Ringruby Hotel Bateye";
  const siteUrl = "https://bateye.ringrubyhotel.com";
  const twitterHandle = "@fivecloverhotel";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      {/* Viewport should only be in the root HTML */}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Favicon */}
      <link rel="icon" href="/ring-ruby-logo.webp" />
      <link rel="apple-touch-icon" href="/ring-ruby-logo.webp" />

      {/* Preconnect to important domains */}
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://maps.googleapis.com" />
    </Helmet>
  );
};

export default SEO;
