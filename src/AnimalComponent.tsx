import React, {
  useRef,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import { Animal, AnimalCharacteristics } from "./Animal";
import { data } from "./data";
import { Layout } from "./Layout";

import "./AnimalComponent.scss";

interface ActiveAnimalContextType {
  activeAnimalId: string | null;
  setActiveAnimalId: (id: string | null) => void;
}

const ActiveAnimalContext = createContext<ActiveAnimalContextType | undefined>(
  undefined
);

export const Animals = () => {
  const [activeAnimalId, setActiveAnimalId] = useState<string | null>(null);

  const animals = data.map((curAnimal) => {
    let animal = null;

    try {
      animal = new Animal(curAnimal).create();
    } catch (e) {
      console.error(e, curAnimal.name);
    }

    return animal;
  });

  return (
    <ActiveAnimalContext.Provider value={{ activeAnimalId, setActiveAnimalId }}>
      <Layout>
        {animals.map((animal, index) => {
          if (animal) {
            return (
              <AnimalComponent key={animal.id} index={index} {...animal} />
            );
          }
          return null;
        })}
      </Layout>
    </ActiveAnimalContext.Provider>
  );
};

const vibrantColors = [
  "#FFB3BA",
  "#FFDFBA",
  "#FFFFBA",
  "#BAFFC9",
  "#BAE1FF",
  "#FFC3A0",
  "#FF677D",
  "#D4A5A5",
  "#392F5A",
  "#6A0572",
];

const AnimalComponent: React.FC<AnimalCharacteristics & { index: number }> = ({
  id,
  imagePath,
  songPath,
  index,
  name,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const context = useContext(ActiveAnimalContext);
  const [isActive, setIsActive] = useState<boolean>(false);

  if (!context) {
    throw new Error(
      "AnimalComponent must be used within an ActiveAnimalProvider"
    );
  }

  const { activeAnimalId, setActiveAnimalId } = context;

  const play = () => {
    setActiveAnimalId(id);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (activeAnimalId === id) {
      setIsActive(true);
    } else {
      setIsActive(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [activeAnimalId, id]);

  useEffect(() => {
    const handleEnded = () => {
      setIsActive(false);
    };

    const audioElement = audioRef.current;
    audioElement?.addEventListener("ended", handleEnded);

    return () => {
      audioElement?.removeEventListener("ended", handleEnded);
    };
  }, []);

  const backgroundColor = vibrantColors[index % vibrantColors.length];

  return (
    <div
      onClick={play}
      className={`animal ${isActive ? "active" : ""}`}
      style={{ backgroundColor }}
    >
      <div className="animal__content">
        <img src={imagePath} alt={id} />
      </div>

      <h4>{name["pt-br"]}</h4>

      <audio id={id} ref={audioRef} src={songPath} />
    </div>
  );
};
