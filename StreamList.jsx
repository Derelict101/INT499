import { useMemo, useState } from "react";
import StreamForm from "../components/StreamForm.jsx";
import StreamItem from "../components/StreamItem.jsx";
import StreamStats from "../components/StreamStats.jsx";

const emptyFormData = {
  title: "",
  platform: "",
  priority: "Medium",
  notes: ""
};

function createId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return String(Date.now());
}

function StreamList() {
  const [streamItems, setStreamItems] = useState([]);
  const [formData, setFormData] = useState(emptyFormData);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");

  const completedItems = streamItems.filter((item) => item.isCompleted).length;
  const pendingItems = streamItems.length - completedItems;

  const visibleItems = useMemo(() => {
    if (filter === "completed") {
      return streamItems.filter((item) => item.isCompleted);
    }

    if (filter === "pending") {
      return streamItems.filter((item) => !item.isCompleted);
    }

    return streamItems;
  }, [filter, streamItems]);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => {
      return {
        ...currentData,
        [name]: value
      };
    });
  }

  function resetForm() {
    setFormData(emptyFormData);
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedItem = {
      title: formData.title.trim(),
      platform: formData.platform.trim(),
      priority: formData.priority,
      notes: formData.notes.trim()
    };

    if (!cleanedItem.title || !cleanedItem.platform) {
      alert("Please enter a title and streaming platform.");
      return;
    }

    if (editingId) {
      setStreamItems((currentItems) => {
        return currentItems.map((item) => {
          if (item.id === editingId) {
            const updatedItem = {
              ...item,
              ...cleanedItem,
              updatedAt: new Date().toLocaleString()
            };

            console.log("StreamList item updated:", updatedItem);
            return updatedItem;
          }

          return item;
        });
      });
    } else {
      const newItem = {
        id: createId(),
        ...cleanedItem,
        isCompleted: false,
        createdAt: new Date().toLocaleString()
      };

      console.log("StreamList item submitted:", newItem);

      setStreamItems((currentItems) => {
        return [newItem, ...currentItems];
      });
    }

    resetForm();
  }

  function handleEditItem(item) {
    setEditingId(item.id);

    setFormData({
      title: item.title,
      platform: item.platform,
      priority: item.priority,
      notes: item.notes
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDeleteItem(itemId) {
    setStreamItems((currentItems) => {
      return currentItems.filter((item) => item.id !== itemId);
    });

    if (editingId === itemId) {
      resetForm();
    }
  }

  function handleToggleComplete(itemId) {
    setStreamItems((currentItems) => {
      return currentItems.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            isCompleted: !item.isCompleted
          };
        }

        return item;
      });
    });
  }

  function handleClearCompleted() {
    setStreamItems((currentItems) => {
      return currentItems.filter((item) => !item.isCompleted);
    });
  }

  return (
    <section className="streamListPage">
      <section className="introCard">
        <p className="smallLabel">EZTechMovie IT Department</p>

        <h2>StreamList</h2>

        <p>
          Add movies or programs you want to watch later. Your entries will
          display on the page, and you can edit, delete, or mark each item as
          complete.
        </p>
      </section>

      <StreamStats
        totalItems={streamItems.length}
        completedItems={completedItems}
        pendingItems={pendingItems}
      />

      <StreamForm
        formData={formData}
        editingId={editingId}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onCancelEdit={resetForm}
      />

      <section className="listPanel">
        <div className="listHeader">
          <div>
            <p className="smallLabel">Saved User Inputs</p>
            <h2>Your Watch List</h2>
          </div>

          <div className="listControls">
            <button
              className={filter === "all" ? "filterButton activeFilter" : "filterButton"}
              type="button"
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              className={filter === "pending" ? "filterButton activeFilter" : "filterButton"}
              type="button"
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>

            <button
              className={filter === "completed" ? "filterButton activeFilter" : "filterButton"}
              type="button"
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>

            <button
              className="clearButton"
              type="button"
              onClick={handleClearCompleted}
              disabled={completedItems === 0}
            >
              <span className="material-symbols-outlined">cleaning_services</span>
              Clear Completed
            </button>
          </div>
        </div>

        {visibleItems.length > 0 ? (
          <div className="itemsList">
            {visibleItems.map((item) => {
              return (
                <StreamItem
                  key={item.id}
                  item={item}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                />
              );
            })}
          </div>
        ) : (
          <div className="emptyState">
            <span className="material-symbols-outlined">playlist_add</span>
            <h3>No items added yet.</h3>
            <p>Add a movie or program above to begin your StreamList.</p>
          </div>
        )}
      </section>
    </section>
  );
}

export default StreamList;