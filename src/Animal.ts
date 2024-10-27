type Name = {
  [key in string]: string;
};

export type AnimalProps = {
  id: string;
  name: Name;
};

export interface AnimalCharacteristics extends AnimalProps {
  imagePath: string;
  songPath: string;
}

export class Animal {
  id: string;
  name: Name;

  constructor({ id, name }: AnimalProps) {
    this.id = id;
    this.name = name;
  }

  create() {
    return {
      id: this.id,
      name: this.name,
      imagePath: `/assets/images/${this.id}.png`,
      songPath: `/assets/songs/${this.id}.mp3`,
    };
  }
}
