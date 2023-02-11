class Drink {
    constructor(alcohol, time) {
        self.alcohol = alcohol;
        self.time = time;
    }

    calculate_bac_at_time(drinker, time) {
        if (time < self.time) {
            return 0;
        }
        let bac = ((self.alcohol / drinker.weight) * drinker.r * 100);
        bac -= (.015) * (time - self.time) / (3600000);
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

    add_drink(alcohol_amount, time) {
        this.drinks.push(new Drink(alcohol_amount, time));
    }

    add_drink_now(alcohol_amount) {
        this.add_drink(alcohol_amount, Date.now());
    }

    calculate_bac_at_time(time) {
        total = 0;
        for (let i=0; i<this.drinks.length; i++) {
            total += this.drinks[i];
        }
        return total;
    }

}