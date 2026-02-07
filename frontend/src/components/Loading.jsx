const LoadingSpinner = () => (
  <div className="h-[calc(100vh-4rem)] flex justify-center items-center z-50">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      stroke="#4f46e5"
      className="animate-spin">
      <g fill="none" fillRule="evenodd">
        <g transform="translate(2 2)" strokeWidth="4">
          <circle strokeOpacity=".25" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  </div>
);

export default LoadingSpinner;
