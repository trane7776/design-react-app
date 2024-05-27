import React, { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import {
  downloadCanvasToImage,
  reader,
  downloadCanvasToSVG,
} from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import AIPicker from './AIPicker';
import ColorPicker from './ColorPicker';
import FilePicker from './FilePicker';
import Tab from './Tab';

import SvgEditor from './SvgCustom';
const Customizer = ({ user }) => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState('');
  const [prompt1, setPrompt] = useState('');
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
            prompt={prompt1}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      case 'svgeditor':
        return <SvgEditor />;
      default:
        return null;
    }
  };
  const handleSubmit = async (type) => {
    if (!prompt1) return alert('Please enter a prompt');
    try {
      setGeneratingImg(true);
      const response = await fetch(
        'https://design-react-app.onrender.com/api/v1/dalle',
        {
          method: 'POST',
          body: JSON.stringify({
            prompt1,
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

  const handlePublish = async () => {
    const canvas = document.querySelector('canvas'); // assuming your canvas has an id 'canvas'

    const image = canvas.toDataURL();
    console.log(image);
    const name = prompt('Введите название дизайна:');
    const description = prompt('Введите описание дизайна:');
    const designData = {
      user: user.username,
      name,
      image,
      description,
      prompt1,
    };
    try {
      const response = await fetch(
        'https://design-react-app-production.up.railway.app/design',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(designData),
        }
      );
      if (response.ok) {
        alert('Design published successfully!');
      } else {
        alert('Failed to publish design.');
      }
    } catch (error) {
      console.error('Error publishing design:', error);
    }
  };

  return (
    <div className="">
      <div className="pb-40 flex items-center">
        <div className="editortabs-container ">
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
        <button className="bg-black" onClick={downloadCanvasToImage}>
          Скачать
        </button>
        <button className="bg-black" onClick={downloadCanvasToSVG}>
          Скачать в SVG
        </button>
        {user ? (
          <button className="bg-black" onClick={handlePublish}>
            Опубликовать на сайте
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Customizer;
