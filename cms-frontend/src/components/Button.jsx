export default function Button({ nameProp }) {
  return (
    <>
      <button
        className="btn btn-lg btn-primary rounded-pill w-100 p-2"
        type="submit"
      >
        {nameProp.split(" ")[0]}
      </button>
    </>
  );
}
