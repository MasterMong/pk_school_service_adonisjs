// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/users";

class AuthController {
  async redirectToProvider({ ally, params }) {
    await ally.use(params.provider).redirect();
    // return ally.use('github').redirect()
  }

  async handleProviderCallback({ params, ally, auth, response }) {
    const provider = params.provider;

    const socialAuth = await ally.use(provider);
    // return google;
    /**
     * User has explicitly denied the login request
     */
    if (socialAuth.accessDenied()) {
      return "Access was denied";
    }

    /**
     * Unable to verify the CSRF state
     */
    if (socialAuth.stateMisMatch()) {
      return "Request expired. Retry again";
    }

    /**
     * There was an unknown error during the redirect
     */
    if (socialAuth.hasError()) {
      return socialAuth.getError();
    }

    /**
     * Finally, access the user
     */
    const userData = await socialAuth.user();
    const user = await User.firstOrCreate(
      {
        email: userData.email,
      },
      {
        name: userData.name,
        avatar: userData.avatarUrl,
        username: userData.email,
        email: userData.email,
        provider: provider,
      }
    );
    await auth.use("web").login(user);
    console.log("Login success!");
    response.redirect().toRoute('service.fixGrade')
  }

  async logout({ auth, response }) {
    await auth.logout();
    response.redirect("/");
  }

  async login({ response }) {
    response.redirect("/auth/google");
  }
}
module.exports = AuthController;
