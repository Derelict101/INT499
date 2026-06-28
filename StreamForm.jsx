import { useState } from "react";

const startingFormData = {
  title: "",
  platform: "",
  priority: "Medium",
  notes: "",
};

function StreamForm() {
  const [formData, setFormData] = useState(startingFormData);
  const [latestItem, setLatestItem] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => {
      return {
        ...currentData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const streamItem = {
      id: crypto.randomUUID(),
      title: formData.title.trim(),
      platform: formData.platform.trim(),
      priority: formData.priority,
      notes: formData.notes.trim(),
      createdAt: new Date().toLocaleString(),
    };

    if (!streamItem.title || !streamItem.platform) {
      alert("Please enter a title and streaming platform.");
      return;
    }

    console.log("StreamList item submitted:", streamItem);

    setLatestItem(streamItem);
    setFormData(startingFormData);
  }

  return (
    <section className="formCard">
      <div className="sectionHeader">
        <span className="material-symbols-outlined">add_circle</span>
        <div>
          <h2>Add a movie or program</h2>
          <p>Enter something you want to watch later.</p>
        </div>
      </div>

      <form className="streamForm" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="title">Movie or program title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Example, The Mandalorian"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="platform">Streaming platform</label>
          <input
            id="platform"
            name="platform"
            type="text"
            value={formData.platform}
            onChange={handleChange}
            placeholder="Example, Disney Plus"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="priority">Watch priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="formGroup">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Example, Watch this weekend"
            rows="4"
          />
        </div>

        <button className="primaryButton" type="submit">
          <span className="material-symbols-outlined">send</span>
          Add to StreamList
        </button>
      </form>

      {latestItem && (
        <div className="consolePreview">
          <h3>Latest console submission</h3>
          <p>
            The item below was sent to the browser console. Open DevTools to
            view the actual console output.
          </p>

          <pre>{JSON.stringify(latestItem, null, 2)}</pre>
        </div>
      )}
    </section>
  );
}

export default StreamForm;
