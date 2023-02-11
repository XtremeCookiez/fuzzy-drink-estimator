class Drink {
    constructor(alcohol, time, name) {
        this.alcohol = alcohol;
        this.time = time;
        this.name = name;
    }

    calculate_bac_at_time(drinker, time) {
        if (time < this.time) {
            return 0;
        }
        let bac = ((this.alcohol / (drinker.weight*453.6)) * drinker.r * 100);
        bac -= (.015) * (time - this.time) / (3600000);
        if (bac < 0)
            return 0;
        else
            return bac;
    }

}

class Drinker {
    constructor(weight, gender) {
        this.drinks = [];
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
        this.add_drink(alcohol_amount, Date.now(), name);
    }

    calculate_bac_at_time(time) {
        let total = 0;
        for (let i=0; i<this.drinks.length; i++) {
            total += this.drinks[i].calculate_bac_at_time(this, time);
        }
        return total;
    }

}