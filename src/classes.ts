export class Player {
    id: string;
    name: string;
    photo: string;
    // Use with caution
    admin: boolean;
    banned: boolean;
    superBanned: boolean;
    // Game info
    title: string = "Noob nugget";
    nuggets: number = 0;
    score: number = 0;
    attacking: string;
    helping: string;
    // Stats
    click_prod: number;
    sec_prod: number;
    attack: number;
    rel_attack: number;
    steal: number;
    abs_defense: number;
    rel_defense: number;
    click_help: number;
    self_click_help: number;
    [upgradeId: string]: any;
    constructor(id: string, name: string, photo: string) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.clearStats();
    }

    public get nuggetsPerClick(): number {
        return 1 + this.click_prod;
    }

    public get damagePerClick(): number {
        return 1 + Math.round(this.attack + this.attack * this.rel_attack);
    }

    public get helpPerClick(): number {
        return 1 + this.click_help;
    }

    public get selfHelpPerClick(): number {
        return Math.round(this.helpPerClick * this.self_click_help);
    }

    public upgradeCount(upgrade: Upgrade): number {
        return this[upgrade.id] || 0;
    }

    public addUpgrade(upgrade: Upgrade): void {
        this.nuggets -= upgrade.cost(this);
        this[upgrade.id] = this.upgradeCount(upgrade) + 1;
    }

    public clearStats(): void {
        this.click_prod = 0;
        this.sec_prod = 0;
        this.attack = 0;
        this.rel_attack = 0;
        this.steal = 0;
        this.abs_defense = 0;
        this.rel_defense = 0;
        this.click_help = 0;
        this.self_click_help = 0;
    }

    public calculateStats(upgrades: Upgrade[]): void {
        for (let i = 0, l = upgrades.length; i < l; i++) {
            let u = upgrades[i];
            let count = this.upgradeCount(u);
            if (count > 0) {
                this[u.stat] = u.stat_change * count;
            }
        }
    }

    public updateStats(upgrades: Upgrade[]): void {
        this.clearStats();
        this.calculateStats(upgrades);
    }

    public updateTitle() {

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
        if (user == null) return;
        return Math.round(this.base_cost * Math.pow(this.scale_factor, user.upgradeCount(this)));
    }
}