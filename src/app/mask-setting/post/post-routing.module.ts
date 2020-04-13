import { Routes, RouterModule } from '@angular/router';
import {PostComponent} from "./post.component";

export const PostRoutes: Routes = [{
    path: '',
    component: PostComponent
}];
export const PostRoutingModule = RouterModule.forChild(PostRoutes);
