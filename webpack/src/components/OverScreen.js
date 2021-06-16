export default class OverScreen {
    constructor(wygral, czas) {
        this.wygral = wygral;

        czas = eval(czas)
        let min = new Date(czas).getMinutes();
        if (min < 10)
            min = "0" + min;
        let sec = new Date(czas).getSeconds();
        if (sec < 10)
            sec = "0" + sec
        let mil = new Date(czas).getMilliseconds();
        if (mil < 100) {
            if (mil < 10) {
                mil = "0" + mil;
            }
            mil = "0" + mil;
        }

        this.Wczas = `${min}:${sec}:${mil}`;
        this.overlay = document.createElement("div");
        this.overlay.classList.add("overlay")
        document.body.appendChild(this.overlay);
        this.init();
    }
    init() {
        let main = document.createElement("div");
        main.classList.add('endMain')

        let KoniecText = document.createElement("div");
        KoniecText.innerText = "KONIEC GRY!";
        KoniecText.classList.add("text")
        KoniecText.style.fontSize = "4em"
        KoniecText.style.marginTop = "1em"
        let container = document.createElement("div");
        let KtoWygral = document.createElement("div");
        KtoWygral.innerText = `Wygrał gracz o numerze: ${this.wygral} \n z czasem: ${this.Wczas}.\n Brawo!`;
        KtoWygral.classList.add("text")
        container.append(KtoWygral)
        main.append(KoniecText, container)
        this.overlay.appendChild(main)
    }

}