// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import HttpExceptionHandler from "@ioc:Adonis/Core/HttpExceptionHandler";
import View from "@ioc:Adonis/Core/View";

export default class ServicesController {
  public async fixGrade({ctx: HttpExceptionHandler, auth}) {
    let isUser = false;
    let currentUser = ""
    await auth.use('web').authenticate()
    if (auth.use('web').isLoggedIn) {
      isUser = true;
      currentUser = JSON.stringify(auth.user);
    }
    return View.render('services.fix_grade', {isUser, currentUser})
  }
}
