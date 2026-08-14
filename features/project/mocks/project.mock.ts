import type { Project } from '../types/project.type';
import {
  ProjectMemberRoleEnum,
  ProjectStatusEnum,
} from '@/features/project/types/enums';

export const members = [
  {
    id: '019ff4db-5c4d-75ff-a673-1643892203e2',
    userId: 'jhcho',
    name: '조준형',
    role: ProjectMemberRoleEnum.Owner,
  },
  {
    id: '019ff4db-5c4d-75ff-a673-12472102fbd5',
    userId: 'cmjeong',
    name: '정찬미',
    role: ProjectMemberRoleEnum.Member,
  },
  {
    id: '019ff4db-5c4d-75ff-a673-12472102fbd5',
    userId: 'jeonhm',
    name: '전해민',
    role: ProjectMemberRoleEnum.Member,
  },
];

export const mockProjects: Project[] = [
  {
    id: '019ff467-b5c8-766f-a984-8f5b334216d5',
    name: '웹사이트 리뉴얼',
    description: '회사 웹사이트 개편 프로젝트',
    status: ProjectStatusEnum.InProgress,
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    Members: members,
  },
  {
    id: '019ff467-b5c8-766f-a984-908537c0d21c',
    name: '모바일 앱 개발',
    description: null,
    status: ProjectStatusEnum.InProgress,
    startDate: '2026-05-15',
    endDate: '2026-10-30',
    Members: members,
  },
  {
    id: '019ff467-b5c8-766f-a984-9609eabc99b6',
    name: '마케팅 캠페인',
    description: null,
    status: ProjectStatusEnum.Planned,
    startDate: '2026-07-01',
    endDate: '2026-09-30',
    Members: members,
  },
  {
    id: '019ff467-b5c8-766f-a984-9a3ee5d8ef82',
    name: '사내 인트라넷 개선',
    description: null,
    status: ProjectStatusEnum.InProgress,
    startDate: '2026-04-01',
    endDate: '2026-07-15',
    Members: members,
  },
  {
    id: '019ff467-b5c8-766f-a984-9c7ff22a77eb',
    name: '제품 런칭 준비',
    description: null,
    status: ProjectStatusEnum.InProgress,
    startDate: '2026-06-10',
    endDate: '2026-09-10',
    Members: members,
  },
  {
    id: '019ff467-b5c8-766f-a984-a19d7f3bed9e',
    name: '고객 피드백 수집',
    description: null,
    status: ProjectStatusEnum.Completed,
    startDate: '2026-03-01',
    endDate: '2026-05-31',
    Members: members,
  },
];
