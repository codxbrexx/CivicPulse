import type { ReactNode } from "react";

type ProtectedRouteProps = { children: ReactNode };

const ProtectedRoute = ({ children }: ProtectedRouteProps) => <>{children}</>;

export default ProtectedRoute;
