import React, { FC, memo } from 'react';

import ClientSaysCard from './ClientSayCard';
import palette from '../../styles/pallette';



const ClientSays: FC = () => {
  return (
    <div className="bg-black flex justify-center items-center w-full h-[85vh] overflow-x-hidden flex-col md:pt-5">

      <header className="flex md:gap-10 lg:w-4/6 lg:px-10 text-center">
        <div className="w-full flex flex-col justify-center items-center z-10 px-4">

          <h2
            className={`${palette.fontSize.heading2.mobile} md:text-4xl 2xl:text-4xl text-white uppercase font-bold text-center`}
          >
            What OUR <span className="text-orange-500">Clients</span> Say
          </h2>

          <h3
            className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} text-white lg:px-20 text-center`}
          >
            Proven success stories from businesses that chose Nextloop for digital transformation
          </h3>

        </div>
      </header>

      <ClientSaysCard />

    </div>
  );
};

export default memo(ClientSays);