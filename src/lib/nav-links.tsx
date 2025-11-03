import { NavLinks } from "./nav-links-client";
import { studentNavLinks, teacherNavLinks, adminNavLinks, godAdminNavLinks } from "./nav-links-data";

export function StudentNav() {
    return <NavLinks links={studentNavLinks} />;
}

export function TeacherNav() {
    return <NavLinks links={teacherNavLinks} />;
}

export function AdminNav() {
    return <NavLinks links={adminNavLinks} />;
}

export function GodAdminNav() {
    return <NavLinks links={godAdminNavLinks} />;
}
