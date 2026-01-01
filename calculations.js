class Drink {
    constructor(alcohol, time, name) {
        this.alcohol = alcohol;
        this.time = time;
        this.name = name;
    }

    calculate_bac(drinker) {
        // return ((this.alcohol / (drinker.weight*453.6)) * drinker.r * 100);
        return ((this.alcohol / (drinker.r * drinker.weight *1000 / 2.2))*100);

    }

    // calculate_bac_at_time(drinker, time) {
    //     if (time < this.time) {
    //         return 0;
    //     }
    //     let bac = ((this.alcohol / (drinker.weight*453.6)) * drinker.r * 100);
    //     bac -= (.015) * (time - this.time) / (3600000);
    //     if (bac < 0)
    //         return 0;
    //     else
    //         return bac;
    // }

}

class BAC {
    constructor(time, bac) {
        this.bac = bac;
        this.time = time;
    }
}

class Drinker {
    constructor(weight, gender) {
        this.drinks = [];
        this.bac = [new BAC(Date.now(), 0)];
        this.last_bac = 0;
        this.weight = weight;
        if (gender == "male") {
            this.r = 0.68;
        } else {
            this.r = 0.55;
        }
    }

    add_drink(alcohol_amount, time, name) {
        this.drinks.push(new Drink(alcohol_amount, time, name));
    }

    add_drink_now(alcohol_amount, name) {
        let bac = this.last_bac;
        if (this.bac.length > 0) {
            let processed = (.015) * (Date.now() - this.bac.at(-1).time) / (3600000);
            console.log(`(.015) * (${Date.now()} - ${this.bac.at(-1).time}) / (3600000)`);
            console.log(processed);
            bac -= processed;
            bac = Math.max(bac, 0);
            console.log(`bac: ${bac}`);
            console.log(`Processed: ${this.last_bac - bac}`);
        }
        this.add_drink(alcohol_amount, Date.now(), name);
        // add the BAC contribution from the newly added drink
        const newDrink = this.drinks.at(-1);
        const drinkContribution = newDrink.calculate_bac(this);
        bac += drinkContribution;
        this.bac.push(new BAC(Date.now(), bac));
        this.last_bac = bac;
    }

    get_bac() {
        if (this.bac.length == 0) 
            return 0;
        let processed = (.015) * (Date.now() - this.bac.at(-1).time) / (3600000)
        return Math.max(this.last_bac - processed, 0)
    }

    recompute_bac() {
        // Rebuild the bac timeline from current drinks (sorted by time)
        this.drinks.sort((a,b)=>a.time - b.time);
        // start with a baseline entry at now with 0
        this.bac = [new BAC(Date.now(), 0)];
        let last_time = this.bac[0].time;
        let current_bac = 0;
        for (let i=0; i<this.drinks.length; i++) {
            const d = this.drinks[i];
            // apply metabolism from last_time to drink time (only if drink is later)
            if (d.time > last_time) {
                const processed = (.015) * (d.time - last_time) / (3600000);
                current_bac = Math.max(current_bac - processed, 0);
            }
            // add this drink's immediate contribution
            current_bac += d.calculate_bac(this);
            this.bac.push(new BAC(d.time, current_bac));
            last_time = d.time;
        }
        this.last_bac = current_bac;
    }

    // calculate_bac_at_time(time) {
    //     let total = 0;
    //     for (let i=0; i<this.drinks.length; i++) {
    //         total += this.drinks[i].calculate_bac(this, time);
    //     }

    //     total 
    //     return total;
    // }

}