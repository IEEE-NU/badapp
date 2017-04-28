export class Player {
    id: string;
    name: string;
    nuggets: number;
    photo: string;
    title: string;
    admin: boolean;
    banned: boolean;
    constructor(id: string, name: string, nuggets: number, photo: string, title: string) {
        this.id = id;
        this.name = name;
        this.nuggets = nuggets;
        this.photo = photo;
        this.title = title;
    }
}

export class Upgrade {
    id: string;
    type: string;
    name: string;
    description: string;
    picture: string;
    base_cost: number;
    scale_factor: number;
    stat: string;
    stat_change: number;
    max: number;
}

export class UpgradeObj {
    [id: string]: Upgrade
}