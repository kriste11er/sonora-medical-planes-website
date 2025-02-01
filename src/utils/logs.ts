import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface LogEntry {
  id: string;
  day: number;
  date: string;
  author: string;
  preview: string;
  fullText: string;
  images: string[];
}

export interface WeekData {
  title: string;
  logs: LogEntry[];
}

export function getLogFiles(year: string): string[] {
  const logsPath = path.join(process.cwd(), 'public', 'logs', year);
  try {
    return fs.readdirSync(logsPath)
      .filter(file => fs.statSync(path.join(logsPath, file)).isDirectory());
  } catch (error) {
    console.error(`Error reading logs directory for year ${year}:`, error);
    return [];
  }
}

export function getLogData(year: string, dayFolder: string): LogEntry {
  const folderPath = path.join(process.cwd(), 'public', 'logs', year, dayFolder);
  const logPath = path.join(folderPath, 'log.md');
  const imagesPath = path.join(folderPath, 'images');
  
  // Read and parse markdown file
  const content = fs.readFileSync(logPath, 'utf-8');
  const { data, content: markdownContent } = matter(content);
  
  // Parse the day number from the folder name
  const dayMatch = dayFolder.match(/day(\d+)/i);
  const dayNumber = dayMatch ? parseInt(dayMatch[1]) : 0;
  
  // Format date from folder name (YYYYMMDD)
  const dateMatch = dayFolder.match(/(\d{8})/);
  const formattedDate = dateMatch 
    ? dateMatch[1].replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
    : 'Unknown Date';

  // Get list of images if the directory exists
  let images: string[] = [];
  try {
    if (fs.existsSync(imagesPath)) {
      images = fs.readdirSync(imagesPath)
        .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
        .map(file => `/logs/${year}/${dayFolder}/images/${file}`);
    }
  } catch (error) {
    console.error(`Error reading images for ${dayFolder}:`, error);
  }

  // Extract first bullet point for preview
  const bulletPoints = markdownContent.split('\n').filter(line => line.trim().startsWith('-'));
  const preview = bulletPoints[0]?.replace(/^-\s*/, '') || 'No preview available';

  return {
    id: dayFolder,
    day: dayNumber,
    date: formattedDate,
    author: data.author || 'Unknown Author',
    preview,
    fullText: markdownContent,
    images
  };
}

export function organizeLogsByWeek(logs: LogEntry[]): WeekData[] {
  const weekMap = new Map<number, LogEntry[]>();
  
  logs.forEach(log => {
    const weekNumber = Math.floor((log.day) / 7) + 1;
    if (!weekMap.has(weekNumber)) {
      weekMap.set(weekNumber, []);
    }
    weekMap.get(weekNumber)?.push(log);
  });
  
  return Array.from(weekMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([week, logs]) => ({
      title: `Week ${week}: Alamos Trip`,
      logs: logs.sort((a, b) => a.day - b.day)
    }));
}