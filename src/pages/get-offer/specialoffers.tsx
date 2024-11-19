import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Layout from '../../components/Layout/Layout';
import { Modal } from '../../components/Modal/Modal';
import { OfferCard } from '../../components/OfferCard/OfferCard';
import { offers as localOffers } from '../../data/offers';
import { DBOffer } from '../../types';
import { getAllOffers, updateOffer } from '../../utils/db';

const SpecialOffers: React.FC = () => {
  const router = useRouter();

  const { application_detail } = router.query;

  const [offers, setOffers] = useState<DBOffer[]>([]);

  const [selectedOffer, setSelectedOffer] = useState<DBOffer | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady && application_detail) {
      const fetchOffers = async () => {
        try {
          setLoading(true);

          const response = await getAllOffers();

          if (response.success && response.data) {
            const offersWithIcons = response.data.map((offer: DBOffer) => {
              const localOffer = localOffers.find(
                (local) => local.title === offer.title
              );
              return {
                ...offer,
                icon: localOffer?.icon || { src: '' },
                tc_details:offer?.["t&c_point"]
              };
            });
            setOffers(offersWithIcons);
          } else {
            setError('Failed to fetch offers');
          }
        } catch (err) {
          setError('An error occurred while fetching offers');
        } finally {
          setLoading(false);
        }
      };

      fetchOffers();
    } else if (router.isReady && !application_detail) {
      router.push('/get-offer');
    }
  }, [router, application_detail]);

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

  if (loading && !offers.length) {
    return (
      <Layout headerColor='bg-[#022435] text-white' showFooter={false}>
        <div className='min-h-screen flex items-center justify-center'>
          <p>Loading offers...</p>
        </div>
      </Layout>
    );
  }

  if (error && !offers.length) {
    return (
      <Layout headerColor='bg-[#022435] text-white' showFooter={false}>
        <div className='min-h-screen flex items-center justify-center'>
          <p className='text-red-500'>{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout headerColor='bg-[#022435] text-white' showFooter={false}>
      <div className='min-h-screen w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 sm:pt-24 lg:pt-22'>
        <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-2 lg:mb-3 text-gray-800'>
          SPECIAL OFFERS
        </h1>

        <div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2 lg:gap-4 

          px-6 sm:px-4 lg:px-8 mb-10 max-w-sm sm:max-w-none mx-auto'
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
