export class Player {
    id: string;
    name: string;
    nuggets: number;
    photo: string;
    title: string;
    constructor(id: string, name: string, nuggets: number, photo: string, title: string) {
        this.id = id;
        this.name = name;
        this.nuggets = nuggets;
        this.photo = photo;
        this.title = title;
    }
}