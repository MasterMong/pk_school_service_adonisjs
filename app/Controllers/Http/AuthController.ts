// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/users"

class AuthController {

  async redirectToProvider ({ally, params}) {
      await ally.use(params.provider).redirect()
      // return ally.use('github').redirect()

  }

  async handleProviderCallback ({params, ally, auth, response}) {
      const provider = params.provider

      const google = ally.use(provider);
      // return google;
      /**
       * User has explicitly denied the login request
       */
      if (google.accessDenied()) {
        return "Access was denied";
      }

      /**
       * Unable to verify the CSRF state
       */
      if (google.stateMisMatch()) {
        return "Request expired. Retry again";
      }

      /**
       * There was an unknown error during the redirect
       */
      if (google.hasError()) {
        return google.getError();
      }

      /**
       * Finally, access the user
       */
      const user = await google.user();
      return user;



      // return ally.use(params.provider).getUser()
      // try {
      //     const userData = await ally.use(params.provider).getUser()

      //     const authUser = await User.query().where({
      //         'provider': provider,
      //         'provider_id': userData.getId()
      //     }).first()
      //     if (!(authUser === null)) {
      //         await auth.loginViaId(authUser.id)
      //         return response.redirect('/')
      //     }

      //     const user = new User()
      //     // user.name = userData.getName()
      //     // user.username = userData.getNickname()
      //     user.email = userData.getEmail()
      //     // user.provider_id = userData.getId()
      //     // user.avatar = userData.getAvatar()
      //     // user.provider = provider

      //     await user.save()

      //     await auth.loginViaId(user.id)
      //     return response.redirect('/')
      // } catch (e) {
      //     console.log(e)
      //     return e;
      //     response.redirect('/auth/' + provider)
      // }
  }

  async logout ({auth, response}) {
      await auth.logout()
      response.redirect('/')

  }
}
module.exports = AuthController
