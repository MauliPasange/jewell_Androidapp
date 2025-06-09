import { useState } from 'react';

const ItemNameMaster = () => {
  const [itemName, setItemName] = useState('');

  const handleSave = () => {
    if (itemName.trim() === '') {
      alert('Please enter an item name.');
      return;
    }

    // Simulate save logic
    alert(`Item "${itemName}" saved!`);
    setItemName('');
  };

  return (
    <div className="Addcustom-container">
      <h4><i class="bi bi-plus-circle"></i>Item Name Master</h4>
      <hr />

      <div className="mb-3">
        <label htmlFor="itemName" className="form-label">Item Name</label>
        <input
          type="text"
          className="form-control"
          id="itemName"
          placeholder="Enter item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default ItemNameMaster;
