import { Metadata } from "next";
import ProfileView from "./profile-view";

export const metadata: Metadata = {
  title: "Profile - LYKKA BIO",
};

export default function ProfilePage() {
  return <ProfileView />;
}