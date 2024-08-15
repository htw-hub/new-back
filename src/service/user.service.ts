import { Provide } from '@midwayjs/core';
import { IUserCheck, IUserDetail, IUserForget, IUserOptions, IUserProject, IUserSign, IUserTask } from '../interface';

@Provide()
export class UserService {
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  async checkUser(options: IUserCheck) {
    var fs = require('fs');
    try {
      var data = fs.readFileSync('./data/shuju.json', { encoding: 'utf8', flag: 'r' });
      var arr = JSON.parse(data);
      var hasfind = false;
      var usid = 0;
      for (var i = 0; i < arr.length; i++) {
        if ((arr[i].username == options.username) && (arr[i].password == options.password)) {
          hasfind = true;
          usid = arr[i].userid;
          break;
        }
      }
      if (hasfind) {
        return {
          success: true,
          message: "登录成功",
          uid: usid,
        }
      } else {
        return {
          success: false,
          message: "用户名或密码错误",
          uid: 0,
        }

      }

    } catch (err) {
      return {
        success: false,
        message: "数据文件不存在或读取错误",
        uid: 0,
      }

    }
  }

  async forgetUser(options: IUserForget) {
    var fs = require('fs');
    try {
      var data = fs.readFileSync('./data/shuju.json', { encoding: 'utf8', flag: 'r' });
      var arr = JSON.parse(data);
      var hasfind = false;
      var usid = 0;
      var fpassword = '';
      for (var i = 0; i < arr.length; i++) {
        if ((arr[i].username == options.username) && (arr[i].email == options.email)) {
          hasfind = true;
          usid = arr[i].userid;
          fpassword = arr[i].password;
          break;
        }
      }
      if (hasfind) {
        return {
          success: true,
          message: "你的密码是" + fpassword,
          uid: usid,
        }
      } else {
        return {
          success: false,
          message: "未找到",
          uid: 0,
        }

      }

    } catch (err) {
      return {
        success: false,
        message: "数据文件不存在或读取错误",
        uid: 0,
      }

    }
  }

  async signupUser(options: IUserSign) {
    var fs = require('fs');
    try {
      var data = fs.readFileSync('./data/shuju.json', { encoding: 'utf8', flag: 'r' });
      var arr = JSON.parse(data);
      var hasfind = false;
      var usid = 0;
      for (var i = 0; i < arr.length; i++) {
        if ((arr[i].username == options.username)) {
          hasfind = true;
          usid = arr[i].userid;
          break;
        }
      }
      if (hasfind) {
        return {
          success: false,
          message: "用户已存在",
          uid: usid,
        }
      } else {
        var newuser = { "userid": arr.length, "username": options.username, "password": options.password, "email": options.email }
        arr.push(newuser);
        var newdata = JSON.stringify(arr);
        fs.writeFileSync('./data/shuju.json', newdata);
        return {
          success: true,
          message: "注册成功",
          uid: newuser.userid,
        }

      }

    } catch (err) {
      return {
        success: false,
        message: "数据文件不存在或读取错误",
        uid: 0,
      }

    }
  }

  async getProject(uid) {
    var fs = require('fs');
    try {
      var data = fs.readFileSync('./data/project.json', { encoding: 'utf8', flag: 'r' });
      var Arr = JSON.parse(data);

      let filteredArr = Arr.filter(function (item) {
        return item.uid == uid;
      });

      return {
        success: true,
        message: "项目获取成功",
        data: filteredArr,
      }
    } catch (err) {
      return {
        success: false,
        message: "数据文件不存在或读取错误",
      }

    }
  }

  async saveProject(options: IUserProject) {
    var fs = require('fs');
    try {
      var data = fs.readFileSync('./data/project.json', { encoding: 'utf8', flag: 'r' });
      var arr = JSON.parse(data);
      var newproject = { "pid": arr.length, "projectTitle": options.projectTitle, "projectTheme": options.projectTheme, "projectDate": options.projectDate, "uid": options.uid }
      arr.push(newproject);
      var newdata = JSON.stringify(arr);
      fs.writeFileSync('./data/project.json', newdata);
      return {
        success: true,
        message: "保存成功",
        newproject: newproject,
      }
    } catch (err) {
      return {
        success: false,
        message: "数据文件不存在或读取错误",
      }

    }
  }
  async getTask(pid) {
    var fs = require('fs');
    try {
      var data = fs.readFileSync('./data/task.json', { encoding: 'utf8', flag: 'r' });
      var Arr = JSON.parse(data);

      let filteredArr = Arr.filter(function (item) {
        return item.pid == pid;
      });

      return {
        success: true,
        message: "任务获取成功",
        data: filteredArr,
      }
    } catch (err) {
      return {
        success: false,
        message: "数据文件不存在或读取错误",
      }

    }
  }

  async saveTask(options: IUserTask) {
    var fs = require('fs');
    try {
      var data = fs.readFileSync('./data/task.json', { encoding: 'utf8', flag: 'r' });
      var arr = JSON.parse(data);
      var newtask = { "type": options.type, "tid": arr.length, "taskTheme": options.taskTheme, "taskPerson": options.taskPerson, "taskDate": options.taskDate, "pid": options.pid ,"taskText":"","comment":[]}
      arr.push(newtask);
      var newdata = JSON.stringify(arr);
      fs.writeFileSync('./data/task.json', newdata);
      return {
        success: true,
        message: "保存成功",
        tid: newtask.tid,
      }
    } catch (err) {
      return {
        success: false,
        message: "数据文件不存在或读取错误",
      }

    }




  }
  async getDetail(tid) {
    var fs = require('fs');
    try {
      var data = fs.readFileSync('./data/task.json', { encoding: 'utf8', flag: 'r' });
      var Arr = JSON.parse(data);
      console.log(Arr);
      let filteredArr = Arr.filter(function (item) {
        return item.tid == tid;
      });

      return {
        success: true,
        message: "项目获取成功",
        data: filteredArr,
      }
    } catch (err) {
      return {
        success: false,
        message: "数据文件不存在或读取错误",
      }

    }
  }

  async saveDetail(options: IUserDetail) {
    var fs = require('fs');
    try{
      var data = fs.readFileSync('./data/task.json', { encoding: 'utf8', flag: 'r' });
      var arr = JSON.parse(data);
      for(var i=0;i<arr.length;i++){
        if(arr[i].tid==options.tid){
          arr[i].taskText=options.taskText;
          arr[i].comment.push(options.comment);
          break;
        }
      }
      var newdata = JSON.stringify(arr);
      fs.writeFileSync('./data/task.json', newdata);


      return {
        success: true,
        message: "保存成功",
      }
    }catch (err) {
      return {
        success: false,
        message: "数据文件不存在或读取错误",
      }

    }
  }
}