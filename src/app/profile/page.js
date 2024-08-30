import { NoUser } from "@/app/components/NoUser";
import { ProfileForm } from "@/app/components/ProfileForm";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    return <NoUser />;
  }

  const response = await db.query(
    `SELECT * FROM profiles WHERE clerk_id = $1`,
    [user.id]
  );

  if (response.rowCount === 0) {
    return <ProfileForm />;
  }

  const profile = response.rows[0];

  return (
    <div>
      <h2>{profile.username}</h2>
      <p>{profile.bio}</p>
    </div>
  );
}
