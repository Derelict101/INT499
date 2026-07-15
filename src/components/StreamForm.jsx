function StreamForm({
  formData,
  editingId,
  onInputChange,
  onSubmit,
  onCancelEdit
}) {
  return (
    <section className="formCard">
      <div className="sectionHeader">
        <span className="material-symbols-outlined">
          {editingId ? "edit_note" : "add_circle"}
        </span>

        <div>
          <h2>{editingId ? "Edit StreamList Item" : "Add a Movie or Program"}</h2>
          <p>
            {editingId
              ? "Update the selected item and save the changes."
              : "Enter something you want to watch later."}
          </p>
        </div>
      </div>

      <form className="streamForm" onSubmit={onSubmit}>
        <div className="formGroup">
          <label htmlFor="title">Movie or Program Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={onInputChange}
            placeholder="Example, The Mandalorian"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="platform">Streaming Platform</label>
          <input
            id="platform"
            name="platform"
            type="text"
            value={formData.platform}
            onChange={onInputChange}
            placeholder="Example, Disney Plus"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="priority">Watch Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={onInputChange}
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
            onChange={onInputChange}
            placeholder="Example, Watch this weekend"
            rows="4"
          />
        </div>

        <div className="buttonRow">
          <button className="primaryButton" type="submit">
            <span className="material-symbols-outlined">
              {editingId ? "save" : "send"}
            </span>
            {editingId ? "Save Changes" : "Add to StreamList"}
          </button>

          {editingId && (
            <button
              className="secondaryButton"
              type="button"
              onClick={onCancelEdit}
            >
              <span className="material-symbols-outlined">close</span>
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default StreamForm;