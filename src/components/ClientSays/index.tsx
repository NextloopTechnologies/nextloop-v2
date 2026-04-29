import React, { FC, memo } from 'react';

import ClientSaysCard from './ClientSayCard';
import palette from '../../styles/pallette';



const ClientSays: FC = () => {
  return (
    <div className="bg-black flex justify-center items-center w-full h-[85vh] overflow-x-hidden flex-col md:pt-5">

      <header className="flex md:gap-10 lg:w-4/6 lg:px-10 text-center">
        <div className="w-full flex flex-col justify-center items-center gap-3 z-10 px-4">

          <h2
            className={`${palette.fontSize.heading2.mobile} md:text-4xl 2xl:text-4xl text-white  font-bold text-center`}
          >
            What Our <span className="text-orange-500">Clients Say</span> 
          </h2>

          <h3
            className={`${palette.fontSize.description.mobile} md:${palette.fontSize.description.desktop} text-white lg:px-20 text-center`}
          >
            Real reviews show how well we work together and how clear our communication is.
          </h3>

        </div>
      </header>

      <ClientSaysCard />

    </div>
  );
};

export default memo(ClientSays);