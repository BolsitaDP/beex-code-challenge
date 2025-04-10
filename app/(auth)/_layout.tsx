import { Slot, Redirect } from "expo-router";
import { useAuth } from "../../hooks/useAuth";

export default function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) return <Redirect href="/(app)/(tabs)" />;

  return <Slot />;
}
