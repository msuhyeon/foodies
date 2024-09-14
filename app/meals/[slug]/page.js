export default function MealsDetail({ params }) {
  return (
    <>
      <h1>This is MealsDetail page</h1>
      <p>{params.slug}</p>
    </>
  );
}
