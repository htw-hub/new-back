import { Inject, Controller, Get, Query, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Post('/check_user')
  async checkUser(@Body() form: {
    username: string;
    password: string;
  }) {
    const user = await this.userService.checkUser(form);
    return { success: true, message: 'OK', data: user };
  }
  @Post('/forget_user')
  async forgetUser(@Body() form: {
    username: string;
    email: string;
  }) {
    const user = await this.userService.forgetUser(form);
    return { success: true, message: 'OK', data: user };
  }
  @Post('/signup_user')
  async signupUser(@Body() form: {
    username: string;
    email: string;
    password: string;
  }) {
    const user = await this.userService.signupUser(form);
    return { success: true, message: 'OK', data: user };
  }

  @Get('/get_Project')
  async getProject(@Query('uid') uid) {
    const projectList = await this.userService.getProject(uid);
    return { success: true, message: 'OK', data: projectList };
  }

  @Post('/save_Project')
  async projectUser(@Body() form: {
    projectTitle: string;
    projectTheme: string;
    projectDate: string;
    uid: string;
  }) {
    const user = await this.userService.saveProject(form);
    return { success: true, message: 'OK', data: user };
  }



  @Get('/get_Task')
  async getTask(@Query('pid') pid) {
    const taskList = await this.userService.getTask(pid);
    return { success: true, message: 'OK', data: taskList };
  }

  @Post('/save_Task')
  async taskUser(@Body() form: {
    type:string;
    taskTheme: string;
    taskPerson: string;
    taskDate: string;
    pid: string;
  }) {
    const user = await this.userService.saveTask(form);
    return { success: true, message: 'OK', data: user };
  }
  @Get('/get_Detail')
  async getDetail(@Query('tid') tid) {
    const detailList = await this.userService.getDetail(tid);
    return { success: true, message: 'OK', data: detailList };
  }

  @Post('/save_Detail')
  async detailUser(@Body() form: {
    taskText:string;
    comment:string;
    tid: string;
  }) {
    const user = await this.userService.saveDetail(form);
    return { success: true, message: 'OK', data: user };
  }
}
