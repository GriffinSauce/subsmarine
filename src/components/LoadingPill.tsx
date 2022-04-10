import { CgSpinner } from 'react-icons/cg';

const LoadingPill: React.FC = () => (
  <div className="flex items-center justify-center space-x-2 rounded-full bg-blue-500 py-1 pl-1 pr-4 text-sm font-semibold shadow-lg">
    <CgSpinner className="inline-block animate-spin text-3xl text-blue-400" />
    <span className="text-blue-100">Updating</span>
  </div>
);

export default LoadingPill;
