export const generateHotelSchema = (hotelData = {}) => {
  const defaultData = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Ring Ruby Hotel Eso",
    description:
      "Luxury hotel accommodation at Ikeja GRA, Lagos. Experience comfort and excellent service at Ring Ruby Hotel Eso.",
    url: "https://ringrubyeso.fivecloverhotels.com",
    logo: "https://ringrubyeso.fivecloverhotels.com/ring%20ruby%20logo.webp",
    priceRange: "$$",
    starRating: {
      "@type": "Rating",
      ratingValue: "4.5",
      bestRating: "5",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "4b, Eso Close, Oduduwa Crescent, Ikeja GRA",
      addressLocality: "Lagos",
      postalCode: "100001",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "6.574213898959575",
      longitude: "3.3538888865090737",
    },
    telephone: "+2347012931037",
    email: "info@ringrubyhotelesoikejagra.com",
    sameAs: [
      "https://www.facebook.com/RingrubyHotel?_rdc=1&_rdr#",
      "https://www.instagram.com/ringruby_hotel/",
      "https://twitter.com/fivecloverhotel",
      "https://www.tiktok.com/@ringrubyhotels",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };

  return JSON.stringify({ ...defaultData, ...hotelData });
};

export const generateBreadcrumbSchema = (items = []) => {
  const defaultItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://ringrubyeso.fivecloverhotels.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Rooms",
      item: "https://ringrubyeso.fivecloverhotels.com/rooms",
    },
  ];

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.length > 0 ? items : defaultItems,
  };

  return JSON.stringify(breadcrumbList);
};
