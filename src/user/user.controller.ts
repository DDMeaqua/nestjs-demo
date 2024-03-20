import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Query,
  Headers,
  HttpCode,
  Req,
  Res, Session
} from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';
import session from "express-session";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // findAll(@Query() query) {
  //   console.log(query);
  //   return {
  //     code: 200,
  //     message: query.name,
  //   };
  // }

  // @Post()
  // create(@Request() req) {
  //   console.log(req.body);
  //   return {
  //     code: 200,
  //     message: req.body,
  //   };
  // }

  // @Post()
  // create(@Body('age') body) {
  //   console.log(body);
  //   return {
  //     code: 200,
  //   };
  // }
  // @Get(':id')
  // findId(@Request() req) {
  //   console.log(req.params);
  //   return {
  //     code: 200,
  //   };
  // }
  // @Get(':id') // 动态路由
  // @HttpCode(500) // 设置状态码
  // @Redirect('https://www.baidu.com', 301) // 重定向
  // findId(@Param('id') params, @Headers() headers) {
  //   console.log(headers);
  //   return {
  //     code: 200,
  //   };
  // }
  @Get('code')
  createCode(@Req() req, @Res() res, @Session() session) {
    const Captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    session.code = Captcha.text;
    res.type('image/svg+xml');
    res.send(Captcha.data);
  }
  @Post('create')
  createUser(@Req() req, @Body() body, @Session() session) {
    console.log(body, session);
    if (req.session.code.toLocaleString() === body?.code?.toLocaleString()) {
      return {
        code: 200,
        message: '验证码正确',
      };
    } else {
      return {
        code: 400,
        message: '验证码错误',
      };
    }
  }
}
