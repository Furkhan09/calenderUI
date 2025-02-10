import PropTypes from "prop-types";

const Header = ({ onToggleDarkMode }) => {
  return (
    <div className="flex justify-between items-center w-full p-4 shadow-md bg-gradient-to-r from-blue-500 to-purple-500 dark:from-gray-800 dark:to-gray-900 text-white transition-colors duration-500 rounded-lg">
      <h1 className="text-2xl font-bold">Calendar</h1>
      <button
        onClick={onToggleDarkMode}
        className="px-4 py-2 rounded-lg transition-all duration-300 
        bg-white text-gray-800 hover:bg-gray-200 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-500"
      >
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          Switch
        </span>
      </button>
    </div>
  );
};

Header.propTypes = {
  onToggleDarkMode: PropTypes.func.isRequired,
};

export default Header;
