import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CodeToCountryPipe } from './pipe/code-to-country/code-to-country.pipe'

import { ReportAdRevenueComponent } from './report-ad-revenue/report-ad-revenue.component'
import { ReportAlexaRankComponent } from './report-alexa-rank/report-alexa-rank.component'
import { ReportContributingSubdomainsComponent } from './report-contributing-subdomains/report-contributing-subdomains.component'
import { ReportExplainComponent } from './report-explain/report-explain.component'
import { ReportRankByCountryComponent } from './report-rank-by-country/report-rank-by-country.component'
import { ReportUpdaterComponent } from './report-updater/report-updater.component'

//
import { ReportComponent } from './report.component'

// DEP
import { SharedModule } from '../../shared/shared.module'
import { SearchModule } from '../../feature/search/search.module'

@NgModule({
    declarations: [
        CodeToCountryPipe,
        ReportRankByCountryComponent,
        ReportUpdaterComponent,
        ReportRankByCountryComponent,
        ReportExplainComponent,
        ReportAlexaRankComponent,
        ReportAdRevenueComponent,
        ReportContributingSubdomainsComponent,
        ReportComponent,
    ],
    exports: [ReportComponent],
    imports: [CommonModule, SearchModule, SharedModule],
})
export class ReportModule {}
