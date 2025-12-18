import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

// 扩展dayjs插件
dayjs.extend(utc);
dayjs.extend(tz);

export interface TimezoneOption {
  value: string;
  label: string;
  offset: string;
}

export interface TimezonePair {
  sourceTimezone: string;
  targetTimezone: string;
}

// 常用时区列表
const COMMON_TIMEZONES = [
  // 亚洲
  'Asia/Shanghai', 'Asia/Tokyo', 'Asia/Hong_Kong', 'Asia/Singapore', 'Asia/Dubai',
  'Asia/Kolkata', 'Asia/Bangkok', 'Asia/Seoul', 'Asia/Jakarta', 'Asia/Manila',
  // 欧洲
  'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Madrid', 'Europe/Rome',
  'Europe/Moscow', 'Europe/Amsterdam', 'Europe/Vienna', 'Europe/Stockholm', 'Europe/Budapest',
  // 美洲
  'America/New_York', 'America/Los_Angeles', 'America/Chicago', 'America/Toronto', 'America/Vancouver',
  'America/Mexico_City', 'America/Sao_Paulo', 'America/Buenos_Aires', 'America/Caracas', 'America/Detroit',
  // 大洋洲
  'Australia/Sydney', 'Australia/Melbourne', 'Australia/Brisbane', 'Australia/Perth', 'New_Zealand/Auckland',
  // 非洲
  'Africa/Cairo', 'Africa/Johannesburg', 'Africa/Lagos', 'Africa/Nairobi', 'Africa/Casablanca',
  // 其他
  'Pacific/Honolulu', 'Pacific/Fiji', 'Atlantic/Lisbon', 'Arctic/Longyearbyen', 'Antarctica/McMurdo'
];

// 获取时区列表
export function getTimezoneList(): TimezoneOption[] {
  // 映射为选项格式
  return COMMON_TIMEZONES.map(timezone => {
    const now = dayjs();
    const offset = now.tz(timezone).format('Z');
    const offsetFormatted = `UTC${offset}`;
    
    // 提取城市名
    let cityName = timezone.split('/').pop() || timezone;
    cityName = cityName.replace('_', ' ');
    
    return {
      value: timezone,
      label: `${cityName} (${offsetFormatted})`,
      offset: offsetFormatted
    };
  }).sort((a, b) => {
    // 按偏移量排序
    const offsetA = parseInt(a.offset.replace(/UTC([+-]\d+).*/, '$1'), 10);
    const offsetB = parseInt(b.offset.replace(/UTC([+-]\d+).*/, '$1'), 10);
    return offsetA - offsetB;
  });
}

// 获取用户本地时区
export function getUserLocalTimezone(): string {
  return dayjs.tz.guess();
}

// 格式化当前时间为HH:MM
export function getCurrentTimeFormatted(timezone: string): string {
  return dayjs().tz(timezone).format('HH:mm');
}

// 转换时间
export function convertTime(
  sourceTimezone: string,
  targetTimezone: string,
  sourceTime: string
): {
  time: string;
  date: string;
  isNextDay: boolean;
  offset: string;
} {
  // 解析输入时间
  const [hours, minutes] = sourceTime.split(':').map(Number);
  
  // 获取源时区的当前日期和时间
  const now = dayjs();
  const sourceDateTime = dayjs.tz(now.format('YYYY-MM-DD'), sourceTimezone)
    .hour(hours)
    .minute(minutes);
  
  // 转换到目标时区
  const targetDateTime = sourceDateTime.tz(targetTimezone);
  
  // 检查是否跨日
  const sourceDate = sourceDateTime.format('YYYY-MM-DD');
  const targetDate = targetDateTime.format('YYYY-MM-DD');
  const isNextDay = dayjs(targetDate).diff(dayjs(sourceDate), 'day') > 0;
  
  // 计算时差
  const sourceOffset = sourceDateTime.utcOffset();
  const targetOffset = targetDateTime.utcOffset();
  const offsetDiff = targetOffset - sourceOffset;
  const hoursDiff = Math.floor(offsetDiff / 60);
  const minutesDiff = offsetDiff % 60;
  const offsetString = minutesDiff === 0 
    ? `${hoursDiff > 0 ? '+' : ''}${hoursDiff} 小时`
    : `${hoursDiff > 0 ? '+' : ''}${hoursDiff}小时${minutesDiff > 0 ? '+' : ''}${minutesDiff}分钟`;
  
  return {
    time: targetDateTime.format('HH:mm'),
    date: targetDateTime.format('YYYY-MM-DD'),
    isNextDay,
    offset: offsetString
  };
}

// 常用时区组合
export const COMMON_TIMEZONE_PAIRS: TimezonePair[] = [
  { sourceTimezone: 'Asia/Shanghai', targetTimezone: 'America/New_York' },
  { sourceTimezone: 'Europe/London', targetTimezone: 'Asia/Tokyo' },
  { sourceTimezone: 'America/Los_Angeles', targetTimezone: 'Europe/Paris' },
  { sourceTimezone: 'Australia/Sydney', targetTimezone: 'America/Chicago' },
  { sourceTimezone: 'Asia/Tokyo', targetTimezone: 'Europe/Berlin' },
  { sourceTimezone: 'Europe/Moscow', targetTimezone: 'Asia/Dubai' },
  { sourceTimezone: 'America/Toronto', targetTimezone: 'Asia/Hong_Kong' },
  { sourceTimezone: 'Africa/Johannesburg', targetTimezone: 'Pacific/Auckland' }
];

// 收藏管理
export function getFavorites(): TimezonePair[] {
  try {
    const stored = localStorage.getItem('timeSyncFavorites');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: TimezonePair[]): void {
  try {
    localStorage.setItem('timeSyncFavorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('保存收藏失败:', error);
  }
}

export function addFavorite(pair: TimezonePair): void {
  const favorites = getFavorites();
  // 检查是否已存在
  const exists = favorites.some(
    f => f.sourceTimezone === pair.sourceTimezone && f.targetTimezone === pair.targetTimezone
  );
  if (!exists) {
    favorites.unshift(pair);
    // 限制最多保存10个
    if (favorites.length > 10) {
      favorites.pop();
    }
    saveFavorites(favorites);
  }
}

export function removeFavorite(pair: TimezonePair): void {
  const favorites = getFavorites();
  const filtered = favorites.filter(
    f => !(f.sourceTimezone === pair.sourceTimezone && f.targetTimezone === pair.targetTimezone)
  );
  saveFavorites(filtered);
}

export function isFavorite(pair: TimezonePair): boolean {
  const favorites = getFavorites();
  return favorites.some(
    f => f.sourceTimezone === pair.sourceTimezone && f.targetTimezone === pair.targetTimezone
  );
}

// 获取时区的城市名
export function getTimezoneCityName(timezone: string): string {
  const cityName = timezone.split('/').pop() || timezone;
  return cityName.replace('_', ' ');
}