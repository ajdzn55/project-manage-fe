export interface MenuIconProps {
  color?: 'text-primary' | 'text-body';
}

export const ProjectIcon = ({ color = 'text-body' }: MenuIconProps) => {
  return (
    <svg
      className={color}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 8.75L10 3.5L16.5 8.75V16.5H12.5V12H7.5V16.5H3.5V8.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const TaskIcon = ({ color = 'text-body' }: MenuIconProps) => {
  return (
    <svg
      className={color}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 3.5H6C4.89543 3.5 4 4.39543 4 5.5V14.5C4 15.6046 4.89543 16.5 6 16.5H14C15.1046 16.5 16 15.6046 16 14.5V5.5C16 4.39543 15.1046 3.5 14 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 3.5V2.75C7.5 2.34 7.84 2 8.25 2H11.75C12.16 2 12.5 2.34 12.5 2.75V3.5M7 10L9 12L13 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CalendarIcon = ({ color = 'text-body' }: MenuIconProps) => {
  return (
    <svg
      className={color}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 4.5H5.5C4.39543 4.5 3.5 5.39543 3.5 6.5V14.5C3.5 15.6046 4.39543 16.5 5.5 16.5H14.5C15.6046 16.5 16.5 15.6046 16.5 14.5V6.5C16.5 5.39543 15.6046 4.5 14.5 4.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 2.75V6M13.5 2.75V6M3.5 8H16.5M7 11H7.01M10 11H10.01M13 11H13.01M7 14H7.01M10 14H10.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LogoutIcon = ({ color = 'text-body' }: MenuIconProps) => {
  return (
    <svg
      className={color}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 3.5H5.5C4.4 3.5 3.5 4.4 3.5 5.5V14.5C3.5 15.6 4.4 16.5 5.5 16.5H8.5M11.5 13.5L15 10L11.5 6.5M15 10H7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
