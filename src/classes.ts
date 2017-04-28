export class Player {
    id: string;
    name: string;
    nuggets: number;
    photo: string;
    title: string;
    admin: boolean;
    banned: boolean;
    attacking: string;
    helping: string;
    [upgradeId: string]: any;
    constructor(id: string, name: string, nuggets: number, photo: string, title: string) {
        this.id = id;
        this.name = name;
        this.nuggets = nuggets;
        this.photo = photo;
        this.title = title;
    }

    public upgradeCount(upgrade: Upgrade): number {
        return this[upgrade.id] || 0;
    }

    public addUpgrade(upgrade: Upgrade): void {
        this[upgrade.id] = this.upgradeCount(upgrade) + 1;
        this.nuggets -= upgrade.cost(this);
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

    public cost(user: Player) {
        return Math.round(this.base_cost * Math.pow(this.scale_factor, user.upgradeCount(this)));
    }
}