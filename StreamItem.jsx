function StreamItem({ item, onToggleComplete, onEdit, onDelete }) {
  const statusIcon = item.isCompleted ? "task_alt" : "radio_button_unchecked";

  return (
    <article className={item.isCompleted ? "streamItem completedItem" : "streamItem"}>
      <div className="itemMain">
        <button
          className="completeButton"
          type="button"
          onClick={() => onToggleComplete(item.id)}
        >
          <span className="material-symbols-outlined">{statusIcon}</span>
        </button>

        <div>
          <div className="itemTitleRow">
            <h3>{item.title}</h3>

            <span className={`priorityTag ${item.priority.toLowerCase()}`}>
              {item.priority}
            </span>
          </div>

          <p className="platformLine">
            <span className="material-symbols-outlined">live_tv</span>
            {item.platform}
          </p>

          {item.notes && <p className="notesLine">{item.notes}</p>}

          <p className="dateLine">Added, {item.createdAt}</p>
        </div>
      </div>

      <div className="itemActions">
        <button className="iconButton" type="button" onClick={() => onEdit(item)}>
          <span className="material-symbols-outlined">edit</span>
          Edit
        </button>

        <button
          className="iconButton dangerButton"
          type="button"
          onClick={() => onDelete(item.id)}
        >
          <span className="material-symbols-outlined">delete</span>
          Delete
        </button>
      </div>
    </article>
  );
}

export default StreamItem;