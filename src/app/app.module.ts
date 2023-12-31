import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './uitools/button/button.component';
// import { AddAgentComponent } from './agent/add-agent/add-agent.component';
import { ToolbarComponent } from './layouts/toolbar/toolbar.component';
import { MenuComponent } from './layouts/menu/menu.component';
// import { ListAgentComponent } from './agent/list-agent/list-agent.component';
// import { ListRepresentativeComponent } from './representative/list-representative/list-representative.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ResetUserComponent } from './user/reset-user/reset-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { LogoutComponent } from './layouts/logout/logout.component';
import { AgentMenuComponent } from './layouts/agent-menu/agent-menu.component';
import { AdminMenuComponent } from './layouts/admin-menu/admin-menu.component';
import { RepresentativeMenuComponent } from './layouts/representative-menu/representative-menu.component';
import { ViewerMenuComponent } from './layouts/viewer-menu/viewer-menu.component';
// import { ApproveRepresentativeComponent } from './representative/approve-representative/approve-representative.component';
// import { ApproveRepresentativeSingleComponent } from './representative/approve-representative-single/approve-representative-single.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
// import { AgentRepresentativeComponent } from './agent/agent-representative/agent-representative.component';
//import { AgentLedgerComponent } from './ledger/agent-ledger/agent-ledger.component';
//import { AdminLedgerComponent } from './ledger/admin-ledger/admin-ledger.component';
//import { RepresentativeLedgerComponent } from './ledger/representative-ledger/representative-ledger.component';
//import { EditAgentComponent } from './agent/edit-agent/edit-agent.component';
import { UsernameNotFoundRedirectComponent } from './dialogs/username-not-found-redirect/username-not-found-redirect.component';
// import { ReportAdminComponent } from './report/report-admin/report-admin.component';
// import { ReportAdminOutputComponent } from './report/report-admin-output/report-admin-output.component';
// import { ReturnSubmitComponent } from './submission/return-submit/return-submit.component';
// import { ReturnAcknowledgementComponent } from './submission/return-acknowledgement/return-acknowledgement.component';
// import { UserActionComponent } from './user/user-action/user-action.component';
// import { ActionListComponent } from './action/action-list/action-list.component';
// import { ActionSingleComponent } from './action/action-single/action-single.component';
// import { ActionListBlockedComponent } from './action/action-list-blocked/action-list-blocked.component';
// import { ActionListDeniedComponent } from './action/action-list-denied/action-list-denied.component';
// import { ActionHistoryComponent } from './action/action-history/action-history.component';
// import { AddMetricsComponent } from './metrics/add-metrics/add-metrics.component';
// import { ListMetricsComponent } from './metrics/list-metrics/list-metrics.component';
import { ConfirmModalComponent } from './layouts/confirm-modal/confirm-modal.component';
import { DataSavedModalComponent } from './layouts/data-saved-modal/data-saved-modal.component';
// import { CommissionComponent } from './commission/commission/commission.component';
// import { CommissionDetailsComponent } from './commission/commission-details/commission-details.component';
// import { CommissionTrpComponent } from './commission/commission-trp/commission-trp.component';
// import { ReportAgentComponent } from './report/report-agent/report-agent.component';
// import { ReportTrpComponent } from './report/report-trp/report-trp.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { SingleEmployeeComponent } from './employee/single-employee/single-employee.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ApproveUsersComponent } from './user/approve-users/approve-users.component';
import { ApproveAssignUserComponent } from './user/approve-assign-user/approve-assign-user.component';
import { AddCaseDetailsComponent } from './case_details/add-case-details/add-case-details.component';
import { ViewCaseDetailsComponent } from './case_details/view-case-details/view-case-details.component';
import { AddFileTrackComponent } from './file_track/add-file-track/add-file-track.component';
import { ViewFileTrackComponent } from './file_track/view-file-track/view-file-track.component';
import { ListHouseComponent } from './houseAndlcstation/list-house/list-house.component';
import { ListStationComponent } from './houseAndlcstation/list-station/list-station.component';
import { ListFileTracksComponent } from './file_track/list-file-tracks/list-file-tracks.component';
import { ListCaseDetailsComponent } from './case_details/list-case-details/list-case-details.component';
import { AddInventoryComponent } from './inventory/add-inventory/add-inventory.component';
import { ListInventoryComponent } from './inventory/list-inventory/list-inventory.component';
import { EditFileTrackComponent } from './file_track/edit-file-track/edit-file-track.component';
import { EditInventoryComponent } from './inventory/edit-inventory/edit-inventory.component';
import { EditCaseDetailsComponent } from './case_details/edit-case-details/edit-case-details.component';
import { ListJurisdictionComponent } from './jurisdiction/list-jurisdiction/list-jurisdiction.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ButtonComponent,
    // AddAgentComponent,
    ToolbarComponent,
    MenuComponent,
    // ListAgentComponent,
    // ListRepresentativeComponent,
    AddUserComponent,
    ResetUserComponent,
    ListUserComponent,
    LogoutComponent,
    AgentMenuComponent,
    AdminMenuComponent,
    RepresentativeMenuComponent,
    ViewerMenuComponent,
    // ApproveRepresentativeComponent,
    // ApproveRepresentativeSingleComponent,
    DashboardComponent,
    // AgentRepresentativeComponent,
    // AgentLedgerComponent,
    // AdminLedgerComponent,
    // RepresentativeLedgerComponent,
    // EditAgentComponent,
    UsernameNotFoundRedirectComponent,
    // ReportAdminComponent,
    // ReportAdminOutputComponent,
    // ReturnSubmitComponent,
    // ReturnAcknowledgementComponent,
    // UserActionComponent,
    // ActionListComponent,
    // ActionSingleComponent,
    // ActionListBlockedComponent,
    // ActionListDeniedComponent,
    // ActionHistoryComponent,
    // AddMetricsComponent,
    // ListMetricsComponent,
    ConfirmModalComponent,
    DataSavedModalComponent,
    // CommissionComponent,
    // CommissionDetailsComp1onent,
    // CommissionTrpComponent,
    // ReportAgentComponent,
    // ReportTrpComponent,
    AddEmployeeComponent,
    ListEmployeeComponent,
    SingleEmployeeComponent,
    RegistrationComponent,
    ApproveUsersComponent,
    ApproveAssignUserComponent,
    AddCaseDetailsComponent,
    ViewCaseDetailsComponent,
    AddFileTrackComponent,
    ViewFileTrackComponent,
    ListHouseComponent,
    ListStationComponent,
    ListFileTracksComponent,
    ListCaseDetailsComponent,
    AddInventoryComponent,
    ListInventoryComponent,
    EditFileTrackComponent,
    EditInventoryComponent,
    EditCaseDetailsComponent,
    ListJurisdictionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
