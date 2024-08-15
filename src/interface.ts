/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}
export interface IUserCheck {
  username:string;
  password:string;
}
export interface IUserForget {
  username:string;
  email:string;
}
export interface IUserSign {
  username:string;
  password:string;
  email:string;
}
export interface IUserProject {
  projectTitle:string;
  projectTheme:string;
  projectDate:string;
  uid :string;
}
export interface IUserTask {
  type:string;
  taskTheme:string;
  taskPerson:string;
  taskDate:string;
  pid:string;
}
export interface IUserDetail {
  taskText:string;
  comment:string;
  tid:string;
}