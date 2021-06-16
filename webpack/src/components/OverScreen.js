export default class OverScreen {
    constructor(wygral, czas, tablicaWynikow, wygrales) {
        this.wygral = wygral;
        this.wygralesTy = wygrales
        this.czas = czas
        this.tablicaWynikow = tablicaWynikow;
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
        KtoWygral.innerText = `Wygrał gracz o numerze: ${this.wygral} \n z czasem: ${this.Wczas}!`;
        if (!this.wygralesTy) {
            KtoWygral.innerText += `\nPowodzenia następnym razem!`
        } else {
            KtoWygral.innerText += `\nBrawo ty!`
        }
        KtoWygral.classList.add("text")
        let TablicaWynikow = document.createElement("div")
        TablicaWynikow.classList.add("tablica")
        TablicaWynikow.innerHTML = "<h4>TOP 10</h4>\n"
        TablicaWynikow.style.color = "green"
        this.tablicaWynikow.sort((a, b) => a.czas - b.czas)
        this.tablicaWynikow.splice(9, this.tablicaWynikow.length - 1)
        this.tablicaWynikow.forEach(el => {
            let d = document.createElement("div");
            d.style.color = "white";
            d.style.margin = "5px"
            let min = new Date(el.czas).getMinutes();
            if (min < 10)
                min = "0" + min;
            let sec = new Date(el.czas).getSeconds();
            if (sec < 10)
                sec = "0" + sec
            let mil = new Date(el.czas).getMilliseconds();
            if (mil < 100) {
                if (mil < 10) {
                    mil = "0" + mil;
                }
                mil = "0" + mil;
            }

            d.innerHTML = `<div style="display:inline-block; width:100px; margin-right:10px;">${el.nick}</div> ${min}:${sec}:${mil}`
            if (el.nick == this.wygral && el.czas == this.czas && this.wygralesTy) {
                d.style.color = "orange"
            }
            TablicaWynikow.appendChild(d)
        });

        container.append(KtoWygral)
        main.append(KoniecText, container)
        this.overlay.appendChild(main)
        this.overlay.appendChild(TablicaWynikow)
    }

}