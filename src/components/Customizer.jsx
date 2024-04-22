import React, { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import AIPicker from './AIPicker';
import ColorPicker from './ColorPicker';
import FilePicker from './FilePicker';
import Tab from './Tab';
import CustomButton from './CustomButton';
const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });
  // show tab content depending on the active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />;
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case 'aipicker':
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };
  const handleSubmit = async (type) => {
    if (!prompt) return alert('Please enter a prompt');
    try {
      setGeneratingImg(true);
      const response = await fetch(
        'https://threejs-shirtapp.onrender.com/api/v1/dalle',
        {
          method: 'POST',
          body: JSON.stringify({
            prompt,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      if (data.photo === undefined) {
        alert('Failed to generate image. Try again.');
      } else {
        handleDecals(type, `data:image/png;base64,${data.photo}`);
      }
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab('');
    }
  };
  const handleDecals = (type, result) => {
    // logo: {
    //   stateProperty: "logoDecal",
    //   filterTab: "logoShirt",
    // },
    // full: {
    //   stateProperty: "fullDecal",
    //   filterTab: "stylishShirt",
    // },
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isFullTexture = true;
        state.isLogoTexture = false;
        break;
    }
    // after setting the state, activeFilterTab is updated
    setActiveFilterTab((prevState) => {
      return { ...prevState, [tabName]: !prevState[tabName] };
    });
  };
  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab('');
    });
  };
  return (
    <div className="absolute top-0 left-0 z-10">
      <div className="flex items-center min-h-screen">
        <div className="editortabs-container tabs">
          {EditorTabs.map((tab) => (
            <Tab
              key={tab.name}
              tab={tab}
              handleClick={() => {
                activeEditorTab === tab.name
                  ? setActiveEditorTab('')
                  : setActiveEditorTab(tab.name);
              }}
            ></Tab>
          ))}
          {generateTabContent()}
        </div>
      </div>

      <div className="filtertabs-container">
        {FilterTabs.map((tab) => (
          <Tab
            key={tab.name}
            tab={tab}
            isFilterTab
            isActiveTab={activeFilterTab[tab.name]}
            handleClick={() => {
              handleActiveFilterTab(tab.name);
            }}
          ></Tab>
        ))}
        <button className="download-btn" onClick={downloadCanvasToImage}>
          <img
            src={download}
            alt="download_image"
            className="w-3/5 h-3/5 object-contain"
          />
        </button>
      </div>
    </div>
  );
};

export default Customizer;
