export enum ProjectStatusEnum {
  Planned = 'PLANNED', // 계획
  InProgress = 'IN_PROGRESS', // 진행
  Completed = 'COMPLETED', // 완료
}

export enum TaskStatusEnum {
  Todo = 'TODO', // 대기
  InProgress = 'IN_PROGRESS', // 진행
  Done = 'DONE', // 완료
}

export enum TaskPriorityEnum {
  Low = 'LOW', // 낮음
  Medium = 'MEDIUM', // 중간
  High = 'HIGH', // 높음
}

export enum ProjectMemberRoleEnum {
  Owner = 'OWNER',
  Member = 'MEMBER',
}
