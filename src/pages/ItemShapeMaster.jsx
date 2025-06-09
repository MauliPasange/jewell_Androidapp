import { useState } from 'react';

const ItemShapeMaster = () => {
  const [itemShape, setItemShape] = useState('');

  const handleSave = () => {
    if (itemShape.trim() === '') {
      alert('Please enter the shape of the item.');
      return;
    }

    // Simulate save logic
    alert(`Item "${itemShape}" saved!`);
    setItemShape('');
  };

  return (
    <div className="Addcustom-container">
      <h4><i class="bi bi-plus-circle"></i>Item Shape Master</h4>
        <hr />
      <div className="mb-3">
        <label htmlFor="itemShape" className="form-label">Item Shape</label>
        <input
          type="text"
          className="form-control"
          id="itemShape"
          placeholder="Enter item shape"
          value={itemShape}
          onChange={(e) => setItemShape(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default ItemShapeMaster;
