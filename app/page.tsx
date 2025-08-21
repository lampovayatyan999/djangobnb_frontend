import Categories from "./components/Categories";
import PropertyList from "./components/properties/PropertyList";

export default function Home() {
  return (
    <div className="">
      <main className="max-w-[1500px] mx-6 px-6">
        <Categories />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <PropertyList />
        </div>
      </main>
    </div>
  );
}
