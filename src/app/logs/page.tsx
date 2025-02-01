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
      <LogDisplay weeks={weeks} />
    </main>
  );
}