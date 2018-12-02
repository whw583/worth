import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './page/home/home.component'
import { AboutComponent } from './page/about/about.component'
import { ReportComponent } from './page/report/report.component'
const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'report/:dataUrl', component: ReportComponent },
    { path: 'about', component: AboutComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
