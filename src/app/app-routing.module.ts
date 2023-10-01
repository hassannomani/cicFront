import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './layouts/logout/logout.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { SingleEmployeeComponent } from './employee/single-employee/single-employee.component';
import { ApproveUsersComponent } from './user/approve-users/approve-users.component';
import { ApproveAssignUserComponent } from './user/approve-assign-user/approve-assign-user.component';
import { AddCaseDetailsComponent } from './case_details/add-case-details/add-case-details.component';
import { ListHouseComponent } from './houseAndlcstation/list-house/list-house.component';
import { ListStationComponent } from './houseAndlcstation/list-station/list-station.component';
import { AddFileTrackComponent } from './file_track/add-file-track/add-file-track.component';
import { ListFileTracksComponent } from './file_track/list-file-tracks/list-file-tracks.component';
import { ViewFileTrackComponent } from './file_track/view-file-track/view-file-track.component';
import { ListCaseDetailsComponent } from './case_details/list-case-details/list-case-details.component';
import { ViewCaseDetailsComponent } from './case_details/view-case-details/view-case-details.component';
import { ListInventoryComponent } from './inventory/list-inventory/list-inventory.component';
import { AddInventoryComponent } from './inventory/add-inventory/add-inventory.component';
import { EditFileTrackComponent } from './file_track/edit-file-track/edit-file-track.component';


const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "logout", component: LogoutComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "add-employee",component:AddEmployeeComponent},
  {path: "employees", component: ListEmployeeComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "add-user", component: AddUserComponent},
  {path: "users", component: ListUserComponent},
  {path: "approve-users", component: ApproveUsersComponent},
  {path: "approve-single", component: ApproveAssignUserComponent},
  {path: "add-case-details", component: AddCaseDetailsComponent},
  {path: "list-case-details", component: ListCaseDetailsComponent},
  {path: "view-case-detail", component: ViewCaseDetailsComponent},
  {path: "customs-houses", component: ListHouseComponent},
  {path: "lc-stations", component: ListStationComponent},
  {path: "add-file-tracks", component: AddFileTrackComponent},
  {path: "list-file-tracks", component: ListFileTracksComponent},
  {path: "view-file-track", component: ViewFileTrackComponent},
  {path: "edit-file-track", component: EditFileTrackComponent},
  {path: "list-inventory", component: ListInventoryComponent},
  {path: "add-inventory", component: AddInventoryComponent},
  // {path: "add-agent", component: AddAgentComponent},
  // {path: "add-representative", component: AddRepresentativeComponent},
  // {path: "list-agents", component: ListAgentComponent},
  // {path: "approve-representatives", component: ApproveRepresentativeComponent},
  // {path: "approve-representative-details", component: ApproveRepresentativeSingleComponent},
  // {path: "agent-representative", component: AgentRepresentativeComponent},
  // {path: "ledger-agent", component: AgentLedgerComponent},
  // {path: "ledger-admin", component: AdminLedgerComponent},
  // {path: "ledger-representative", component: RepresentativeLedgerComponent},
  // {path: "edit-agent", component: EditAgentComponent},
  // {path: "report-admin", component: ReportAdminComponent},
  // {path: "return-submit", component: ReturnSubmitComponent},
  // {path: "user-action", component: UserActionComponent},
  // {path: "message-list", component: ActionListComponent},
  // {path: "message", component: ActionSingleComponent},
  // {path: "blocked-users", component: ActionListBlockedComponent},
  // {path: "denied-users", component: ActionListDeniedComponent},
  // {path: "action-history", component: ActionHistoryComponent},
  // {path: "list-metrics", component: ListMetricsComponent},
  // {path: "add-metrics", component: AddMetricsComponent},
  // {path: "commission", component: CommissionComponent},
  // {path: "commission-single", component: CommissionDetailsComponent},
  // {path: "commission-trp", component: CommissionTrpComponent},
  // {path: "report-agent", component: ReportAgentComponent},
  // {path: "report-trp", component: ReportTrpComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
