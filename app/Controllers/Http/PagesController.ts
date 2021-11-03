import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View'

export default class PagesController {
  public async index(ctx: HttpContextContract) {
    return View.render('home')
  }
}
