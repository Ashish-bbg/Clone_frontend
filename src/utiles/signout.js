import { logout } from "../api/registerApi";
import { queryClient } from "../queries/queryClient";

export const performLogout = async () => {
  await logout();
  queryClient.removeQueries(["authUser"]);
  return "Logged out successfully";
};
