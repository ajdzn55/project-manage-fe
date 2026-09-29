'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { DailyCompletedCount } from '@/features/project/types/task.type';
import { format } from 'date-fns';

// 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const DailyCompletionChart = ({ data }: { data: DailyCompletedCount[] }) => {
  const getLast7Days = () => {
    const results: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const today = new Date();
      today.setDate(today.getDate() - i);
      const formatted = format(today, 'yyyy-MM-dd');
      results.push(formatted);
    }
    return results;
  };

  // 최근 일주일 데이터
  const last7Days = getLast7Days();
  const mappedData = last7Days.map((day) => {
    const found = data.find((v) => v.date === day);
    return found ? found.count : 0;
  });

  const chartData = {
    labels: last7Days,
    datasets: [
      {
        label: '건수',
        data: mappedData,
        backgroundColor: 'rgb(37 99 235)',
        borderColor: 'rgb(29 78 216)',
        borderWidth: 1,
        barThickness: 20,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true, // Y축을 0부터 시작
        ticks: {
          stepSize: 1, // 건수 데이터이므로 정수 단위 표기
        },
      },
    },
  };

  return (
    <div className="mx-auto h-40 w-full max-w-200">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default DailyCompletionChart;
