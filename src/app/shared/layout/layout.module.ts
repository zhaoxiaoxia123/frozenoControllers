import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HeaderModule} from "./header/header.module";
import {FooterComponent} from "./footer/footer.component";
import {NavigationModule} from "./navigation/navigation.module";
import {RibbonComponent} from "./ribbon/ribbon.component";
import {LayoutSwitcherComponent} from "./layout-switcher.component";
import { MainLayoutComponent } from './app-layouts/main-layout.component';
import { EmptyLayoutComponent } from './app-layouts/empty-layout.component';
import { AuthLayoutComponent } from './app-layouts/auth-layout.component';
import { RouteBreadcrumbsComponent } from './ribbon/route-breadcrumbs.component';
import {UtilsModule} from "../utils/utils.module";
import {ShortcutComponent} from "./shortcut/shortcut.component";
import { BsDropdownModule} from "ngx-bootstrap/dropdown";
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    NavigationModule,
    FormsModule,
    RouterModule,
    UtilsModule,
    TooltipModule,
    BsDropdownModule,
  ],
  declarations: [
    FooterComponent,
    RibbonComponent,
    LayoutSwitcherComponent,
    MainLayoutComponent,
    EmptyLayoutComponent,
    AuthLayoutComponent,
    RouteBreadcrumbsComponent,
    ShortcutComponent
  ],
  exports:[
    HeaderModule,
    NavigationModule,
    FooterComponent,
    RibbonComponent,
    LayoutSwitcherComponent,
    ShortcutComponent,
  ]
})
export class I3otpLayoutModule{

}
