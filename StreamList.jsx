import { useState } from "react";
import StreamForm from "../components/StreamForm.jsx";
import StreamItem from "../components/StreamItem.jsx";

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
            return {
              ...item,
              ...cleanedItem
            };
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

  return (
    <section className="streamListPage">
      <section className="introCard">
        <p className="smallLabel">EZTechMovie IT Department</p>

        <h2>StreamList</h2>

        <p>
          Add movies or programs you want to watch later. Once submitted, each
          item will display below as part of your personal watch list.
        </p>
      </section>

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
        </div>

        {streamItems.length > 0 ? (
          <div className="itemsList">
            {streamItems.map((item) => {
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
            <h3>No movies or programs added yet.</h3>
            <p>Add an item above and it will display here.</p>
          </div>
        )}
      </section>
    </section>
  );
}

export default StreamList;