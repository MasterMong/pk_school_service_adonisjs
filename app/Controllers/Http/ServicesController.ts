// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import HttpExceptionHandler from "@ioc:Adonis/Core/HttpExceptionHandler";
import View from "@ioc:Adonis/Core/View";

export default class ServicesController {
  public async fixGrade(ctx: HttpExceptionHandler) {
    return View.render('services.fix_grade')
  }
}
