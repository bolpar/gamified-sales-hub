import { format, isWeekend, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

// Feriados nacionais brasileiros para 2024 (pode ser expandido)
const brazilianHolidays = [
  new Date(2024, 0, 1),   // Ano Novo
  new Date(2024, 3, 21),  // Tiradentes
  new Date(2024, 4, 1),   // Dia do Trabalhador
  new Date(2024, 8, 7),   // Independência do Brasil
  new Date(2024, 9, 12),  // Nossa Senhora Aparecida
  new Date(2024, 10, 2),  // Finados
  new Date(2024, 10, 15), // Proclamação da República
  new Date(2024, 11, 25), // Natal
];

export function isBusinessDay(date: Date): boolean {
  // Verifica se não é fim de semana
  if (isWeekend(date)) {
    return false;
  }

  // Verifica se não é feriado nacional
  const isHoliday = brazilianHolidays.some(holiday => 
    isSameDay(date, holiday)
  );

  return !isHoliday;
}

export function getBusinessDaysInMonth(date: Date = new Date()): number {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const allDays = eachDayOfInterval({ start, end });
  
  return allDays.filter(day => isBusinessDay(day)).length;
}

export function getCurrentBusinessDay(date: Date = new Date()): number {
  const start = startOfMonth(date);
  const allDays = eachDayOfInterval({ start, end: date });
  
  return allDays.filter(day => isBusinessDay(day)).length;
}

export function calculateDailyTarget(monthlyTarget: number, date: Date = new Date()): number {
  const totalBusinessDays = getBusinessDaysInMonth(date);
  return monthlyTarget / totalBusinessDays;
}

export function calculateExpectedProgress(monthlyTarget: number, date: Date = new Date()): number {
  const currentBusinessDay = getCurrentBusinessDay(date);
  const dailyTarget = calculateDailyTarget(monthlyTarget, date);
  
  return currentBusinessDay * dailyTarget;
}

export function getWorkingHoursLeft(): number {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Expediente das 8h às 18h
  const workStartHour = 8;
  const workEndHour = 18;
  
  if (currentHour >= workEndHour) {
    return 0;
  }
  
  if (currentHour < workStartHour) {
    return workEndHour - workStartHour;
  }
  
  const remainingHours = workEndHour - currentHour;
  const remainingMinutes = (60 - currentMinute) / 60;
  
  return remainingHours - 1 + remainingMinutes;
}