function StreamStats({ totalItems, completedItems, pendingItems }) {
  return (
    <section className="statsGrid">
      <div className="statCard">
        <span className="material-symbols-outlined">format_list_bulleted</span>
        <strong>{totalItems}</strong>
        <p>Total Items</p>
      </div>

      <div className="statCard">
        <span className="material-symbols-outlined">pending_actions</span>
        <strong>{pendingItems}</strong>
        <p>Pending Items</p>
      </div>

      <div className="statCard">
        <span className="material-symbols-outlined">check_circle</span>
        <strong>{completedItems}</strong>
        <p>Completed Items</p>
      </div>
    </section>
  );
}

export default StreamStats;