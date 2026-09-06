'use client';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ProjectCalendar.css';
import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import Button from '@/components/Button';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { useTaskListQuery } from '@/features/project/hooks/useTask';
import type {
  ProjectTask,
  TaskSearchParams,
} from '@/features/project/types/task.type';

const ProjectCalendar = () => {
  const today = new Date();
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);
  const [targetMonth, setTargetMonth] = useState<string>(
    format(new Date(), 'yyyy-MM'),
  );
  const [searchParams, setSearchParams] = useState<TaskSearchParams>({
    projectId: '',
    month: targetMonth,
  });

  const { data: tasks } = useTaskListQuery(searchParams);

  const onClickToday = () => {
    setCalendarDate(today);
    setTargetMonth(format(today, 'yyyy-MM'));
  };

  const tasksByDate = useMemo(() => {
    const map = new Map<string, ProjectTask[]>();

    if (!tasks) return map;

    for (const task of tasks) {
      if (!task.dueDate) continue;

      const dateTasks = map.get(task.dueDate);

      if (dateTasks) {
        dateTasks.push(task);
      } else {
        map.set(task.dueDate, [task]);
      }
    }

    return map;
  }, [tasks]);

  return (
    <div className="flex h-full flex-col p-7">
      <div className="shrink-0">
        <h1 className="text-heading text-2xl font-bold">캘린더</h1>
        <p className="text-muted mt-1">작업 일정을 확인하세요.</p>
      </div>

      <div className="relative mx-3 mt-6 mb-3 min-h-0 flex-1">
        <div className="absolute top-2 left-4 z-10">
          <Button
            color="white"
            text="오늘"
            width="80px"
            height="30px"
            onClick={onClickToday}
          />
        </div>

        <Calendar
          calendarType="gregory"
          minDetail="month"
          prev2Label={null}
          next2Label={null}
          formatDay={(_, date) => String(date.getDate())}
          tileClassName={({ date, view }) => {
            if (view !== 'month') return;
            if (date.getDay() === 6) return 'project-calendar__saturday';
          }}
          tileContent={({ date, view }) => {
            if (view !== 'month') return;

            const res = tasksByDate.get(format(date, 'yyyy-MM-dd')) ?? [];

            return (
              <div className="text-xs leading-tight text-black">
                {res.map((v) => (
                  <div
                    key={v.id}
                    data-tooltip-id="project-calendar-task-tooltip"
                    data-tooltip-content={v.name}
                    style={{ backgroundColor: v.backgroundColor ?? 'white' }}
                    className="w-full truncate"
                  >
                    · {v.name}
                  </div>
                ))}
              </div>
            );
          }}
          activeStartDate={new Date(targetMonth)}
          onActiveStartDateChange={({ activeStartDate }) => {
            if (!activeStartDate) return;
            const activeYear = activeStartDate.getFullYear();
            const activeMonth = String(activeStartDate.getMonth() + 1).padStart(
              2,
              '0',
            );
            setTargetMonth(`${activeYear}-${activeMonth}`);
            setSearchParams({ month: targetMonth });
          }}
          value={calendarDate}
          onChange={(value) =>
            setCalendarDate(Array.isArray(value) ? value[0] : value)
          }
        />

        <Tooltip
          id="project-calendar-task-tooltip"
          place="top"
          offset={6}
          float
          style={{
            zIndex: 70,
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '8px',
          }}
          border="2px solid var(--color-primary-soft)"
        />
      </div>
    </div>
  );
};

export default ProjectCalendar;
