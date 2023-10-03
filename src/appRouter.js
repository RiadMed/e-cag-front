import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./security/page/login";
import {
    Organisations,
    OrganisationType,
    Planifications,
    SessionCAG,
    Status,
    Users,
    Validations,
    Invitations
} from "./pages";
import {Errors} from "./error";
import Home from "./pages/home/home";
import ProtectedRoute from "./routes/protectedRoute";
import {useSelector} from "react-redux";
import Error404 from "./error/error404";
import {ROLES_KEYS} from "./const/staticKeys";
import {checkRolesUser} from "./redux/services/securityAction";
import FirstLogin from "./security/page/firstLogin";

const AppRouter = () => {

    const {isLogin, user} = useSelector((state) => state.security);

    const checkRoles = (roles) => {
        return isLogin ? checkRolesUser(user.rolesList.map(x => x.label), roles) : false;
    }

    return (
        <Routes>
            {/*Default Route*/}
            <Route path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/resetPassword" element={<FirstLogin/>}/>
            <Route exact path="/home" element={
                <ProtectedRoute isAllowed={isLogin} redirectPath="/login">
                    <Home/>
                </ProtectedRoute>}/>

            {/*Organisation*/}
            <Route path="/organisations" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_ADMIN, ROLES_KEYS.ROLE_SECRETAIRE])}
                                redirectPath="/error403">
                    <Organisations.ListOrganisation/>
                </ProtectedRoute>}/>
            <Route exact path="/organisations/add" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_ADMIN])} redirectPath="/error403">
                    <Organisations.AddOrganisation/>
                </ProtectedRoute>}/>
            <Route exact path="/organisations/edit/:id" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_ADMIN, ROLES_KEYS.ROLE_SECRETAIRE])}
                                redirectPath="/error403">
                    <Organisations.EditOrganisation/>
                </ProtectedRoute>}/>

            {/*Planifications*/}
            <Route exact path="/sessionCAGs/planifications/add" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_SECRETAIRE])}
                                redirectPath="/error403">
                    <Planifications.AddPlanification/>
                </ProtectedRoute>}/>
            <Route exact path="/sessionCAGs/planifications" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_SECRETAIRE])}
                                redirectPath="/error403">
                    <Planifications.ListPlanifications/>
                </ProtectedRoute>}/>
            <Route exact path="/sessionCAGs/planifications/edit/:id" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_SECRETAIRE])}
                                redirectPath="/error403">
                    <Planifications.EditPlanification/>
                </ProtectedRoute>}/>


            {/*Ajoute PV*/}
            <Route exact path="/sessionCAGs/addpv/:id" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_SECRETAIRE])}
                                redirectPath="/error403">
                    <SessionCAG.AjouterPv/>
                </ProtectedRoute>}/>

            {/*Resolutions*/}
            <Route exact path="/sessionCAGs/resolutions/:id" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_SECRETAIRE])}
                                redirectPath="/error403">
                    <SessionCAG.Resolutions/>
                </ProtectedRoute>}/>

            {/*Validations*/}
            <Route exact path="/sessionCAGs/aValider" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_ADMIN])}
                                redirectPath="/error403">
                    <Validations.SessionAValider/>
                </ProtectedRoute>}/>

            <Route exact path="/sessionCAGs/aValider/:id" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_ADMIN])}
                                redirectPath="/error403">
                    <Validations.ValiderDate/>
                </ProtectedRoute>}/>

            {/*Session CAG*/}
            <Route exact path="/sessionCAGs" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_SECRETAIRE, ROLES_KEYS.ROLE_MEMBRE])}
                                redirectPath="/error403">
                    <SessionCAG.ListSessionCAG/>
                </ProtectedRoute>}/>
            <Route exact path="/sessionCAGs/add/:id" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_SECRETAIRE])} redirectPath="/error403">
                    <SessionCAG.AddSessionCAG/>
                </ProtectedRoute>}/>
            <Route exact path="/sessionCAGs/add/step2/:id" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_SECRETAIRE])} redirectPath="/error403">
                    <SessionCAG.AddSessionCagStep2/>
                </ProtectedRoute>}/>
            <Route exact path="/sessionCAGs/add/step3/:id/:orgId" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_SECRETAIRE])} redirectPath="/error403">
                    <SessionCAG.AddSessionCagStep3/>
                </ProtectedRoute>}/>
            <Route exact path="/sessionCAGs/edit/:id" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_SECRETAIRE])} redirectPath="/error403">
                    <SessionCAG.EditSessionCAG/>
                </ProtectedRoute>}/>
            <Route exact path="/sessionCAGs/archiveView/:id" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_SECRETAIRE])} redirectPath="/error403">
                    <SessionCAG.SessionDone/>
                </ProtectedRoute>}/>
            <Route exact path="/sessionCAGs/view/:id" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_SECRETAIRE, ROLES_KEYS.ROLE_MEMBRE])}
                                redirectPath="/error403">
                    <SessionCAG.ViewSessionCag/>
                </ProtectedRoute>}/>
            <Route exact path="/sessionCAGs/demarrer/:id" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_SECRETAIRE])}
                                redirectPath="/error403">
                    <SessionCAG.DemarrerLaReunion/>
                </ProtectedRoute>}/>

            {/*Invitations*/}
            <Route exact path="/sessionCAGInvitations" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_MEMBRE])}
                                redirectPath="/error403">
                    <Invitations.ListInvitations/>
                </ProtectedRoute>}/>
            <Route exact path="/sessionCAGInvitations/view/:id" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_MEMBRE])}
                                redirectPath="/error403">
                    <Invitations.ViewInvitations/>
                </ProtectedRoute>}/>


            {/*Statut*/}
            <Route exact path="/status" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_ADMIN])} redirectPath="/error403">
                    <Status.ListStatus/>
                </ProtectedRoute>}/>
            <Route exact path="/status/add" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_ADMIN])} redirectPath="/error403">
                    <Status.AddStatus/>
                </ProtectedRoute>}/>
            <Route exact path="/status/edit/:id" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_ADMIN])} redirectPath="/error403">
                    <Status.EditStatus/>
                </ProtectedRoute>}/>

            {/*Utilisateur*/}
            <Route exact path="/users" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_ADMIN])} redirectPath="/error403">
                    <Users.ListUsers/>
                </ProtectedRoute>}/>
            <Route exact path="/users/add" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_ADMIN])} redirectPath="/error403">
                    <Users.AddUsers/>
                </ProtectedRoute>}/>
            <Route exact path="/users/edit/:id" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_ADMIN])} redirectPath="/error403">
                    <Users.EditUsers/>
                </ProtectedRoute>}/>

            {/*Type d'Organisation*/}
            <Route exact path="/organisationTypes" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_ADMIN])} redirectPath="/error403">
                    <OrganisationType.ListOrganisationType/>
                </ProtectedRoute>}/>
            <Route exact path="/organisationTypes/add" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_ADMIN])} redirectPath="/error403">
                    <OrganisationType.AddOrganisationType/>
                </ProtectedRoute>}/>
            <Route exact path="/organisationTypes/edit/:id" element={
                <ProtectedRoute isAllowed={checkRoles([ROLES_KEYS.ROLE_ADMIN])} redirectPath="/error403">
                    <OrganisationType.EditOrganisationType/>
                </ProtectedRoute>}/>

            {/*Error Pages*/}
            <Route exact path="/error403" element={<Errors.Error403/>}/>
            <Route exact path="/error404" element={<Errors.Error404/>}/>
            <Route exact path="/error500" element={<Errors.Error500/>}/>
            <Route exact path="/noConnect" element={<Errors.NoConnection/>}/>

            <Route path='*' element={<Error404/>}/>
        </Routes>
    );
}

export default AppRouter;
