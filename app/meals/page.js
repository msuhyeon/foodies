import Link from "next/link";

export default function Meals() {
  return (
    <>
      <h1>Hello This is Meals page</h1>{" "}
      <Link href="/meals/share">To Share page</Link>
      <Link href="/meals/community">To community page</Link>
    </>
  );
}
