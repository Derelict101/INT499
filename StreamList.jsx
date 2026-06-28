import StreamForm from "../components/StreamForm.jsx";

function StreamList() {
  return (
    <section className="pageGrid">
      <div className="heroCard">
        <p className="eyebrow">EZTechMovie IT Department</p>

        <h2>Organize what you want to stream next.</h2>

        <p>
          StreamList is a cloud based personal watch list concept that allows
          users to save movies and programs they want to watch later. This first
          version collects user input and displays the submitted data in the
          browser console.
        </p>

        <div className="heroStats">
          <div>
            <strong>4</strong>
            <span>Navigation pages</span>
          </div>

          <div>
            <strong>1</strong>
            <span>Working form</span>
          </div>

          <div>
            <strong>3</strong>
            <span>Future build pages</span>
          </div>
        </div>
      </div>

      <StreamForm />
    </section>
  );
}

export default StreamList;
