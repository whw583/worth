import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './page/home/home.component'
import { AboutComponent } from './page/about/about.component'
import { ReportComponent } from './page/report/report.component'
import { NotFoundComponent } from './page/not-found/not-found.component'

// module
import { HomeModule } from './page/home/home.module'
import { AboutModule } from './page/about/about.module'
import { ReportModule } from './page/report/report.module'
import { NotFoundModule } from './page/not-found/not-found.module'



const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'report/:dataUrl', component: ReportComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', component: NotFoundComponent },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        HomeModule,
        AboutModule,
        ReportModule,
        NotFoundModule,
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
