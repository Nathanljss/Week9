import { db } from "@/lib/db";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const result = await db.query(
    `SELECT posts.id, posts.content, profiles.username FROM posts LEFT JOIN profiles ON posts.clerk_id = profiles.clerk_id`
  );
  const posts = result.rows;

  async function handleAddPost(formData) {
    "use server";
    const post_content = formData.get("post_content");
    const user = await currentUser();

    await db.query(`INSERT INTO posts (clerk_id, content) VALUES ($1, $2)`, [
      user.id,
      post_content,
    ]);
    revalidatePath("/");
  }

  return (
    <>
      <h2>Home</h2>
      <form action={handleAddPost}>
        <textarea name="post_content" placeholder="Your Post Here"></textarea>
        <button>Send Post</button>
      </form>
      {posts.map(function (post) {
        return (
          <div key={post.id}>
            <h3>{post.username ? post.username : "Anonymous"}</h3>
            <div className="scrollingPosts">
              <p>{post.content}</p>
              <hr></hr>
            </div>
          </div>
        );
      })}
    </>
  );
}
