/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";
// import PagesController from 'App/Controllers/Http/PagesController'
Route.get("/welcome", async ({ view }) => {
  return view.render("welcome");
});

// Route.get('/', async (ctx) => {
//   return new PagesController().index(ctx)
// })
Route.get("/", "PagesController.index").as("page.homepage");

Route.group(() => {
  Route.get("/fix-grade", "ServicesController.fixGrade").as("service.fixGrade");
}).prefix("/service");

Route.get('/logout', 'AuthController.logout').as('logout')
Route.get('/login', 'AuthController.login').as('login')
Route.get('/auth/:provider', 'AuthController.redirectToProvider').as('social.login')
Route.get('/authenticated/:provider', 'AuthController.handleProviderCallback').as('social.login.callback')
