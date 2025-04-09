import { useContext } from "react";
import { AuthContext } from "../providers/authProvider";
import { useTranslation } from "react-i18next";

export const useAuth = () => {
  const { t } = useTranslation();
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(t("auth.insideAuthProvider"));
  }
  return context;
};
