export const MS_IN_DAY = 86400000;
export const SPLINE_SCENE_URL = '/Spline/scene.splinecode';

export enum ThemeModes {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum Languages {
  EN = 'EN',
  RU = 'RU'
}

export enum Actions {
  CHANGE_STATUS = 'changeStatus',
  DELETE = 'delete',
  EDIT = 'edit'
}

export enum LocalStorageKeys {
  THEME = 'TODO_APP_THEME',
  TASKS = 'TODO_APP_TASKS',
  LANG = 'TODO_APP_LANG'
}

export enum NotificationTypes {
  SUC = 'SUCCESS',
  ERR = 'ERROR'
}

export enum PiesTypes {
  OUTER = 'outer',
  INNER = 'inner'
}

export enum Links {
  TASKS = '/tasks',
  DASH = '/dashboard'
}

export enum ButtonColors {
  BLUE = 'blue',
  GREEN = 'green',
  PURPLE = 'purple'
}

export enum InitializationStages {
  START,
  LOAD,
  READY
}
