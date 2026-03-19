import SummaryCard from '../components/SummaryCard';
import ConceptGraphCard from '../components/ConceptGraphCard';
import ChatCard from '../components/ChatCard';

export default function Summary() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800">Summary</h1>
      <div className="mt-6 w-full max-w-4xl">
        <SummaryCard />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConceptGraphCard />
          <ChatCard />
        </div>
      </div>
    </div>
  );
}
