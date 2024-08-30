import Link from "next/link";

export default function Nav() {
  return (
    <>
      <Link href="/">Home</Link>
      &nbsp;&nbsp;
      <Link href="./profile">Your Profile</Link>
      &nbsp;&nbsp;
    </>
  );
}
