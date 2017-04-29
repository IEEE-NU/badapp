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
    king_killer: number = 0;
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

    public get nuggetsPerSecond(): number {
        return Math.ceil(this.nuggetsPerClick * this.sec_prod);
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

    public upgradeCost(upgrade: Upgrade): number {
        return Math.round(upgrade.base_cost
            * Math.pow(upgrade.scale_factor, this.upgradeCount(upgrade)));
    }

    public canBuy(upgrade: Upgrade): boolean {
        if (upgrade.max > 0 && this.upgradeCount(upgrade) >= upgrade.max) {
            return false;
        }
        return this.upgradeCost(upgrade) <= this.nuggets;
    }

    public changeNuggets(n: number): void {
        if (!n) return;
        if (this.nuggets + n < 0) {
            this.score -= this.nuggets;
            this.nuggets = 0;
        } else {
            this.nuggets += n;
            this.score += n;
        }
        this.updateTitle();
    }

    public updateTitle() {
        if (this.score <= 200) {
            this.title = "Noob nugget";
        } else if (this.score <= 1000) {
            this.title = "Raw nugget";
        } else if (this.score <= 5000) {
            this.title = "Saucy nugget";
        } else if (this.score <= 10000) {
            this.title = "Prince nugget";
        } else if (this.score <= 50000) {
            this.title = "King nugget";
        } else if (this.score <= 100000) {
            this.title = "Obssessed nugget";
        } else if (this.score <= 500000) {
            this.title = "Please take a break";
        } else if (this.score <= 1000000) {
            this.title = "Loser";
        } else {
            this.title = "HUGE loser";
        }
    }

    public addUpgrade(upgrade: Upgrade): void {
        const cost = this.upgradeCost(upgrade);
        this.changeNuggets(-cost);
        this[upgrade.id] = this.upgradeCount(upgrade) + 1;
        this.score += Math.round(cost / 2);
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
        this.king_killer = 0;
    }

    public calculateStats(upgrades: Upgrade[]): void {
        this.clearStats();
        for (let i = 0, l = upgrades.length; i < l; i++) {
            let u = upgrades[i];
            let count = this.upgradeCount(u);
            if (count > 0) {
                this[u.stat] += u.stat_change * count;
            }
        }
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

export class Nugget {
    type: number;
    x: number;
    y: number;
    rotation: number;
    xVelocity: number;
    yVelocity: number;
    constructor(type: number, x: number, y: number, xVelocity: number, yVelocity: number) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
    }
}