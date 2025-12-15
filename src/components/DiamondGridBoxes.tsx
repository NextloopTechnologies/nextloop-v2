import palette from '../styles/pallette';

export type StepProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
};

const DiamondBox: React.FC<StepProps> = ({
  icon,
  title,
  description,
  color,
}) => {
  return (
    <div
      className={`relative w-44 h-44 flex items-center justify-center transform rotate-45 bg-white ${color} border-2 rounded-xl`}
    >
      <div className='absolute transform -rotate-45 flex flex-col items-center text-center w-40 h-36 rounded-xl'>
        {icon}
        <h3 className='mt-2 font-semibold text-sm mb-2'>{title}</h3>
        <p className='text-xs text-gray-600 px-4'>{description}</p>
      </div>
    </div>
  );
};

const DiamondGridBoxes: React.FC<{
  topSteps: StepProps[];
  bottomSteps: StepProps[];
  coloredText?: string;
  heading?: string;
}> = ({ topSteps, bottomSteps, coloredText, heading }) => {
  return (
    <div className='bg-white flex flex-col items-center text-center min-h-screen py-32'>
      <h3
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold mb-28 uppercase`}
      >
        <span className='text-orange-500'>{coloredText}</span>
        {heading}
      </h3>

      <div className='flex flex-col md:flex-row md:justify-center md:gap-20 gap-16'>
        {topSteps?.map((step, index) => (
          <DiamondBox key={index} {...step} />
        ))}
      </div>

      <div className='flex flex-col md:flex-row md:justify-center md:gap-20 gap-16 md:-mt-10 mt-16'>
        {bottomSteps?.map((step, index) => (
          <DiamondBox key={index} {...step} />
        ))}
      </div>
    </div>
  );
};

export default DiamondGridBoxes;
