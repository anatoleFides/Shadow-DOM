class Element extends HTMLElement {
    constructor () {
        super ()
        this.shadow = this.attachShadow({ mode: 'open' })
        this.angle = 0
        this.image = Object.assign(this.addElem('img'),{
            src: 'https://static9.depositphotos.com/1101919/1136/i/600/depositphotos_11363870-stock-photo-jungfraujoch-alps-mountain-landscape.jpg',
            style: `
              width: 450px;
              transition: all .5s;
            `
        })
        this.button = Object.assign(this.addElem('button'), {
            innerText: 'rotate',
            onclick: function (event) {
                this.angle += 90
                this.image.style.transform = `rotate(${this.angle}deg)`
            }.bind(this)
        })
    }

    addElem (tagName) {
        return this.shadow.appendChild(document.createElement(tagName))
    }
}

customElements.define('new-element', Element)

const newElement = document.body.appendChild(document.createElement('new-element'))