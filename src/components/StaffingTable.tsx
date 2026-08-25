import React from 'react';

import palette from '../styles/pallette';
import { ComparisonRow, ComparisonTableData } from '../types';

interface StaffingTableProps {
  data: ComparisonTableData;
}

const StaffingTable = ({ data }: StaffingTableProps) => {
  const { headingData, columns, rows } = data;

  return (
    <div className='flex flex-col items-center text-center w-full  px-6 md:px-16 lg:px-24 py-16'>
      <h2
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} font-bold text-gray-900`}
      >
        {headingData.heading}
        <span className='text-orange-500'>{headingData.coloredHeading}</span>
      </h2>
      <p className='text-gray-400 mt-4 mb-12'>{headingData.description}</p>

      <div className='w-[80%] flex justify-center'>
        <div className='w-full max-w-7xl overflow-hidden border border-gray-500 shadow-sm'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-orange-500'>
                <th className='w-[22%] py-3 px-4 text-white text-sm font-semibold text-center '>
                  {columns.metric}
                </th>
                <th className='w-[26%] py-3 px-4 text-white text-sm font-semibold text-center '>
                  {columns.traditional}
                </th>
                <th className='w-[26%] py-3 px-4 text-white text-sm font-semibold text-center '>
                  {columns.freelancers}
                </th>
                <th className='w-[26%] py-3 px-4 text-white text-sm font-semibold text-center'>
                  {columns.nextloop}
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row: ComparisonRow, i: number) => (
                <tr
                  key={i}
                  className='odd:bg-white even:bg-[#EFEFEF] border-t border-gray-400'
                >
                  <td className='py-3 px-4 text-sm font-bold text-gray-900 text-center '>
                    {row.metric}
                  </td>
                  <td className='py-3 px-4 text-sm text-gray-600 text-center '>
                    {row.traditional}
                  </td>
                  <td className='py-3 px-4 text-sm text-gray-600 text-center '>
                    {row.freelancers}
                  </td>
                  <td className='py-3 px-4 text-sm font-semibold text-gray-900 text-center whitespace-pre-line'>
                    {row.nextloop}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffingTable;
