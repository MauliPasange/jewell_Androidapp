import { useState } from 'react';

const ItemColorMaster = () => {
  const [itemColor, setItemColor] = useState('');

  const handleSave = () => {
    if (itemColor.trim() === '') {
      alert('Please enter the color of the item.');
      return;
    }

    // Simulate save logic
    alert(`Item "${itemColor}" saved!`);
    setItemColor('');
  };

  return (
    <div className="Addcustom-container">
      <h4><i class="bi bi-plus-circle"></i>Item Color Master</h4>
        <hr />
      <div className="mb-3">
        <label htmlFor="itemColor" className="form-label">Item Color</label>
        <input
          type="text"
          className="form-control"
          id="itemColor"
          placeholder="Enter item color"
          value={itemColor}
          onChange={(e) => setItemColor(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default ItemColorMaster;
