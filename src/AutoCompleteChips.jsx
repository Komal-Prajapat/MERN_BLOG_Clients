import React, { useState } from "react";

const AutoCompleteChips = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([
    {
      imgUrl:
        "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg",
      name: "avenue-marien",
      id: Math.random(),
    },
    {
      imgUrl:
        "https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_1280.jpg",
      name: "sunrise-east",
      id: Math.random(),
    },
    {
      imgUrl:
        "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_640.jpg",
      name: "astronomy-scene",
      id: Math.random(),
    },
    {
      imgUrl:
        "https://cdn.pixabay.com/photo/2015/07/09/22/45/tree-838667_640.jpg",
      name: "tree-beauty",
      id: Math.random(),
    },
    {
      imgUrl:
        "https://cdn.pixabay.com/photo/2016/11/14/04/36/boy-1822614_1280.jpg",
      name: "boy-nature",
      id: Math.random(),
    },
  ]);
  const [selectedChips, setSelectedChips] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedChips([...selectedChips, item]);
    setItems(items.filter((i) => i !== item));
    setInputValue("");
  };

  const handleChipRemove = (chip) => {
    setSelectedChips(
      selectedChips.filter((selectedChip) => selectedChip !== chip)
    );
    setItems([...items, chip]);
  };

  return (
    <div className="auto-com">
      <div className="selected-item">
        <div>
          {selectedChips.map((chip) => (
            <div key={chip.id} className="chip">
              <div className="flex">
                <div className="img">
                  <img src={chip.imgUrl} alt="" />
                </div>
                <h4>{chip.name}</h4>
              </div>
              <span
                className="chip-remove"
                onClick={() => handleChipRemove(chip)}
              >
                <h1>X </h1>
              </span>
            </div>
          ))}
        </div>
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
      />
      <div>
        {items
          .filter((item) =>
            item.name.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map((item) => (
            <div
              key={item}
              className="flex"
              onClick={() => handleItemClick(item)}
            >
              <div className="img">
                <img src={item.imgUrl} alt="" />
              </div>
              <h4>{item.name}</h4>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AutoCompleteChips;
