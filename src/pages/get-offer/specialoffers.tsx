import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Layout from '../../components/Layout/Layout';
import { Modal } from '../../components/Modal/Modal';
import { OfferCard } from '../../components/OfferCard/OfferCard';
import Seo from '../../components/Seo';
import { offers as localOffers } from '../../data/offers';
import { DBOffer } from '../../types';
import { getAllOffers, updateOffer } from '../../utils/db';

const OffersSeo: React.FC = () => (
  <Seo
    title='Your Offers | Nextloop Technologies'
    description='Offers selected for your enquiry.'
    noindex
  />
);

const SpecialOffers: React.FC<{ offers: DBOffer[]; loadError?: string }> = ({
  offers,
  loadError,
}) => {
  const router = useRouter();

  const { application_detail } = router.query;

  const [selectedOffer, setSelectedOffer] = useState<DBOffer | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(loadError ?? null);

  const handleCloseModal = () => {
    setSelectedOffer(null);
    setError(null);
    setSuccessMessage(null);
  };

  const handleSelectOffer = async () => {
    if (!selectedOffer || !application_detail) {
      setError('Missing required information');

      return;
    }

    try {
      setLoading(true);
      const parsedDetail = JSON?.parse(
        decodeURIComponent(application_detail as string)
      );
      const updateResponse = await updateOffer(Number(parsedDetail.id), {
        id: Number(parsedDetail.id),
        offer_id: selectedOffer.id,
        name: parsedDetail.name,
        email: parsedDetail.email,
        mobile: parsedDetail.mobile,
      });

      if (updateResponse.success) {
        setSuccessMessage('Offer selected successfully!');
      } else {
        setError('Failed to process offer selection');
      }
    } catch (err) {
      setError('An error occurred while processing your selection');
    } finally {
      setLoading(false);
    }
  };

  if (error && !offers.length) {
    return (
      <Layout headerColor='bg-[#022435] text-white' showFooter={false}>
        <OffersSeo />
        <div className='min-h-screen flex items-center justify-center'>
          <p className='text-red-500'>{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout headerColor='bg-[#022435] text-white' showFooter={false}>
      <OffersSeo />
      <div className='min-h-screen w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 sm:pt-24 lg:pt-22'>
        <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-2 lg:mb-3 text-gray-800'>
          SPECIAL OFFERS
        </h1>

        <div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2 lg:gap-4 

          px-6 sm:px-4 lg:px-8 mb-10 max-w-sm sm:max-w-none mx-auto '
        >
          {offers?.map((offer) => (
            <OfferCard
              key={offer.id}
              title={offer.title}
              description={offer.description}
              icon={offer?.icon}
              onClick={() => setSelectedOffer(offer)}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={!!selectedOffer}
        onClose={handleCloseModal}
        selectedOffer={selectedOffer}
        onSelectOffer={handleSelectOffer}
        loading={loading}
        error={error}
        successMessage={successMessage}
      />
    </Layout>
  );
};

export default SpecialOffers;

/**
 * The offers used to load in a `useEffect`, which meant the page shipped an
 * empty shell and then hit Supabase from the browser with the anon key — the
 * same key this cutover is trying to get out of the client. Fetched on the
 * server now, so the page arrives complete and the key stays server-side.
 *
 * The redirect for a missing `application_detail` also moves here: it used to
 * happen after mount, so a visitor briefly saw an empty offers page before
 * being bounced.
 */
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.application_detail) {
    return { redirect: { destination: '/get-offer/', permanent: false } };
  }

  try {
    const response = await getAllOffers();
    if (!response.success || !response.data) {
      return { props: { offers: [], loadError: 'Failed to fetch offers' } };
    }

    /**
     * Icons live in the repo and are joined to database rows by title. Several
     * offers share a title, and a title renamed in the admin matches nothing —
     * which used to yield `{ src: '' }` and a broken image across the card.
     * A miss now simply means no icon.
     */
    const iconByTitle = new Map(localOffers.map((o) => [o.title.trim().toLowerCase(), o.icon]));

    return {
      props: {
        offers: response.data.map((offer: DBOffer) => ({
          ...offer,
          icon: iconByTitle.get((offer.title ?? '').trim().toLowerCase()) ?? { src: '' },
        })),
      },
    };
  } catch {
    return { props: { offers: [], loadError: 'An error occurred while fetching offers' } };
  }
};
