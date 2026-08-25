import {
  BookOpen,
  BriefcaseBusiness,
  CalendarCheck,
  Clock,
  HeartPulse,
  Home,
  Users,
  Wallet,
} from 'lucide-react';

const perks = [
  { id: 1, title: 'Competitive Salary', icon: Wallet },
  { id: 2, title: 'Health Insurance', icon: HeartPulse },
  { id: 3, title: 'Work from Home', icon: Home },
  { id: 4, title: 'Learning & Development', icon: BookOpen },
  { id: 5, title: 'Flexible Hours', icon: Clock },
  { id: 6, title: 'Paid Time Off', icon: CalendarCheck },
  { id: 7, title: 'Team Events', icon: Users },
  { id: 8, title: '5 Days Working', icon: BriefcaseBusiness },
];

const PerksBenefitsSection = () => {
  return (
    <section className='w-full bg-white py-20 px-4'>
      <div className=' min-h-fit w-full md:max-w-6xl mx-auto text-center'>
        <h2 className='text-3xl text-black md:text-4xl font-bold '>
          Perks & <span className='text-orange-500'>Benefits</span>
        </h2>

        <p className='mt-4 text-gray-500 max-w-3xl mx-auto'>
          We believe in creating an environment where our team thrives. Here's
          what we offer to support your growth, wellness, and work-life balance.
        </p>

        <div className='mt-14  mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3'>
          {perks.map((perk) => {
            const Icon = perk.icon;

            return (
              <div
                key={perk.id}
                className='group flex items-center justify-between cursor-pointer rounded-xl border px-4 py-3 transition-all duration-200 shadow-sm  bg-white text-black hover:bg-black hover:text-white'
              >
                <div className='flex items-center gap-4'>
                  <div className='flex items-center justify-center w-9 h-9 rounded-full '>
                    <Icon className='w-5 h-5 black' />
                  </div>

                  <p className='text-sm md:text-base font-medium  hover text-left'>
                    {perk.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PerksBenefitsSection;
