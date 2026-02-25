import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getLogFiles, getLogData, organizeLogsByWeek } from '@/utils/logs';
import { LogDisplay } from '@/components/logs/LogDisplay';

export default function LogsPage() {
  // Get logs from the 2024 folder
  const year = '2024';
  const logFolders = getLogFiles(year);
  const logs = logFolders
    .map(folder => getLogData(year, folder))
    .sort((a, b) => a.day - b.day);

  const weeks = organizeLogsByWeek(logs);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
      <LogDisplay weeks={weeks} />
    </main>
  );
}