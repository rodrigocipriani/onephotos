import appRoutes from "./modules/App/app.routes";
import commentRoutes from "./modules/Comment/comment.routes";

export default {
  appRoutes: {
    routes: appRoutes,
    children: [commentRoutes]
  }
};
