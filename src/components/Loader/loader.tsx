const LoaderSvg = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    }}
  >
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 300 150'
      width='180'
      height='180'
    >
      <defs>
        <linearGradient id='gradientStroke' x1='0%' y1='0%' x2='100%' y2='100%'>
          {/* #194063 , #37A5A2 blue */}
          {/* #D54E3A , #FFA61D orange gradient */}
          <stop offset='0%' stopColor='#D54E3A' />
          <stop offset='100%' stopColor='#FFA61D' />
        </linearGradient>
      </defs>
      <path
        fill='none'
        stroke='url(#gradientStroke)'
        strokeWidth='15'
        strokeLinecap='round'
        strokeDasharray='300 385'
        strokeDashoffset='0'
        d='M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z'
      >
        <animate
          attributeName='stroke-dashoffset'
          calcMode='spline'
          dur='2'
          values='685;-685'
          keySplines='0 0 1 1'
          repeatCount='indefinite'
        />
      </path>
    </svg>
  </div>
);

export default LoaderSvg;
