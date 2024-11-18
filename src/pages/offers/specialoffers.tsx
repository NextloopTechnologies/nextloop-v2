import { useRouter } from 'next/router';
import React, { useEffect,useState } from 'react';

import Layout from '../../components/Layout/Layout';
import { Modal } from '../../components/Modal/Modal';
import { OfferCard } from '../../components/OfferCard/OfferCard';
import { DBOffer, OfferApplicationType } from '../../types';
import {
  createOfferApplications,
  getAllOffers,
  updateOffer,
} from '../../utils/db';

const SpecialOffers: React.FC = () => {
  const router = useRouter();
  const { application_id } = router.query;

  const [offers, setOffers] = useState<DBOffer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<DBOffer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady && !application_id) {
      router.push('/contact-us');
      return;
    }

    const fetchOffers = async () => {
      try {
        setLoading(true);
        const response = await getAllOffers();
        if (response.success && response.data) {
          setOffers(response.data as DBOffer[]);
        } else {
          setError('Failed to fetch offers');
        }
      } catch (err) {
        setError('An error occurred while fetching offers');
      } finally {
        setLoading(false);
      }
    };

    if (application_id) {
      fetchOffers();
    }
  }, [router, application_id]);

  const handleCloseModal = () => {
    setSelectedOffer(null);
  };

  const handleSelectOffer = async () => {
    if (!selectedOffer || !application_id) {
      setError('Missing required information');
      return;
    }

    try {
      setLoading(true);

      const applicationData: OfferApplicationType = {
        offer_id: selectedOffer.id,
        name: '',
        email: '',
        mobile: '',
      };

      const createResponse = await createOfferApplications(applicationData);

      if (createResponse.success && createResponse.data?.[0]?.id) {
        await updateOffer(createResponse.data[0].id, {
          ...applicationData,
          offer_id: selectedOffer.id,
        });

        handleCloseModal();
        router.push(`/success?application_id=${createResponse.data[0].id}`);
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
      <div className='min-h-screen w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-20 sm:pt-24 lg:pt-28'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-10 text-gray-800'>
          SPECIAL OFFERS
        </h1>
        <div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 
          px-6 sm:px-4 lg:px-8 mb-10 max-w-sm sm:max-w-none mx-auto'
        >
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              icon={offer.icon}
              title={offer.title}
              description={offer.description}
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
      />
    </Layout>
  );
};

export default SpecialOffers;
