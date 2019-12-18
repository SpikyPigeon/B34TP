import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ComponentsModule} from "./components/components.module";
import {RouterModule} from "@angular/router";
import {ToastrModule} from "ngx-toastr";
import {AdminLayoutComponent} from "./layouts/admin-layout/admin-layout.component";
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";
import {TreeTopService} from "./service";
import {NgbdModalContent} from './pages/trees/tree.modal';

@NgModule({
	imports: [
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		ComponentsModule,
		NgbModule,
		RouterModule,
		AppRoutingModule,
		ToastrModule.forRoot()
	],
	declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, NgbdModalContent],
	entryComponents:[NgbdModalContent],
	providers: [
		TreeTopService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
