import { CgSpinner } from 'react-icons/cg';

const LoadingPill: React.FC = () => (
  <div className="flex items-center justify-center py-1 pl-1 pr-4 space-x-2 text-sm font-semibold bg-blue-500 rounded-full shadow-lg">
    <CgSpinner className="inline-block text-3xl text-blue-400 animate-spin" />
    <span className="text-blue-100">Updating</span>
  </div>
);

export default LoadingPill;
